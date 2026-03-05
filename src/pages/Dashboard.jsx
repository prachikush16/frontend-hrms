import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>HRMS Dashboard</h1>
            <p>Welcome to the basic Human Resource Management System.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px' }}>
                    <h3>Employee Management</h3>
                    <p>Create, view, update and delete employee records.</p>
                    <Link to="/employees" className="btn btn-primary">Go to Employees</Link>
                </div>

                <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px' }}>
                    <h3>Attendance Tracking</h3>
                    <p>Monitor and manage employee attendance logs.</p>
                    <Link to="/attendance" className="btn btn-primary">Go to Attendance</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
