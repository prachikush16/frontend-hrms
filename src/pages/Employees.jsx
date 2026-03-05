import { useEffect, useState } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../apis/employeeService";
import { toast } from "react-toastify";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ full_name: "", email: "", department: "" });

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees({ search });
      setEmployees(res.data);
    } catch (err) {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentEmployee.id) {
        await updateEmployee(currentEmployee.id, currentEmployee);
        toast.success("Employee updated");
      } else {
        await createEmployee(currentEmployee);
        toast.success("Employee created");
      }
      setIsEditing(false);
      setCurrentEmployee({ full_name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      toast.error("Error saving employee");
    }
  };

  const handleEdit = (emp) => {
    setCurrentEmployee(emp);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      try {
        await deleteEmployee(id);
        toast.success("Employee deleted");
        fetchEmployees();
      } catch (err) {
        toast.error("Error deleting employee");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEmployee({ full_name: "", email: "", department: "" });
  };

  return (
    <div>
      <div className="flex-between mb-3">
        <h2>Employee Management</h2>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Add Employee</button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="mb-3" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px' }}>
          <h3>{currentEmployee.id ? "Edit Employee" : "New Employee"}</h3>
          <div className="mb-3">
            <label>Employee ID</label>
            <input
              type="text"
              className="form-control"
              value={currentEmployee.employee_id}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, employee_id: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={currentEmployee.full_name}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, full_name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={currentEmployee.email}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={currentEmployee.department}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mr-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="mb-3" style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchEmployees}>Search</button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                    <td>{emp.id}</td>
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button className="btn btn-secondary mr-2" onClick={() => handleEdit(emp)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Employees;