import { useEffect, useState } from "react";
import { getAttendance, markAttendance, updateAttendance, deleteAttendance } from "../apis/attendanceService";
import { getEmployees } from "../apis/employeeService";
import { toast } from "react-toastify";

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({ employee: "", date: "", status: "Present" });

    const fetchAttendance = async () => {
        try {
            const res = await getAttendance({ employee: employeeId });
            setAttendance(res.data);
        } catch (err) {
            toast.error("Failed to fetch attendance logs");
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) {
            toast.error("Failed to fetch employees list");
        }
    };

    useEffect(() => {
        fetchAttendance();
        fetchEmployees();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentRecord.id) {
                await updateAttendance(currentRecord.id, currentRecord);
                toast.success("Record updated");
            } else {
                await markAttendance(currentRecord);
                toast.success("Attendance marked");
            }
            setIsEditing(false);
            setCurrentRecord({ employee: "", date: "", status: "Present" });
            fetchAttendance();
        } catch (err) {
            toast.error("Error saving record");
        }
    };

    const handleEdit = (record) => {
        setCurrentRecord(record);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this log?")) {
            try {
                await deleteAttendance(id);
                toast.success("Log deleted");
                fetchAttendance();
            } catch (err) {
                toast.error("Error deleting log");
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentRecord({ employee: "", date: "", status: "Present" });
    };

    return (
        <div>
            <div className="flex-between mb-3">
                <h2>Attendance Tracking</h2>
                {!isEditing && (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Mark Attendance</button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSave} className="mb-3" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px' }}>
                    <h3>{currentRecord.id ? "Edit Log" : "Mark Attendance"}</h3>
                    <div className="mb-3">
                        <label>Employee</label>
                        <select
                            className="form-control"
                            value={currentRecord.employee}
                            onChange={(e) => setCurrentRecord({ ...currentRecord, employee: e.target.value })}
                            required
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.full_name} (ID: {emp.employee_id})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={currentRecord.date}
                            onChange={(e) => setCurrentRecord({ ...currentRecord, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Status</label>
                        <select
                            className="form-control"
                            value={currentRecord.status}
                            onChange={(e) => setCurrentRecord({ ...currentRecord, status: e.target.value })}
                            required
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <>
                    <div className="mb-3" style={{ display: 'flex', gap: '10px' }}>
                        <select
                            className="form-control"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        >
                            <option value="">-- View All or Select Employee --</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.full_name} (ID: {emp.employee_id})
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary" onClick={fetchAttendance}>View Attendance</button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((att, idx) => (
                                <tr key={att.id || idx}>
                                    <td>{att.employee}</td>
                                    <td>{att.full_name}</td>
                                    <td>{new Date(att.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-${att.status?.toLowerCase()}`}>
                                            {att.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary mr-2" onClick={() => handleEdit(att)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(att.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {attendance.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No attendance records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Attendance;
