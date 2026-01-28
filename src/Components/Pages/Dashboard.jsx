import { useNavigate } from "react-router-dom";
// import "../../style/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>SIMS</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/results")}>Results</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/")}>Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, Admin</h1>
        <p>Manage student information efficiently.</p>

        <div className="cards">
          <div className="card">
            <h3>Total Students</h3>
            <p>350</p>
          </div>
          <div className="card">
            <h3>Total Classes</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>New Students Month</h3>
            <p>8</p>
          </div>
          <div className="card">
            <h3>Active Courses</h3>
            <p>12</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;