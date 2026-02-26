import { Link, Outlet } from "react-router-dom";
import "../../style/Dashboard.css";

const StudentLayout = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">SIMS</h2>
        <ul>
          <li><Link to="/student">Dashboard</Link></li>
          <li><Link to="/student/results">My Results</Link></li>
          <li><Link to="/student/attendance">My Attendance</Link></li>
          <li><Link to="/student/courses">My Courses</Link></li>
          <li><Link to="/student/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;