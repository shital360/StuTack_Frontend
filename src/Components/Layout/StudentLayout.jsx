import { Link, Outlet, useNavigate } from "react-router-dom";

export default function StudentLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "220px", padding: "20px", background: "#eee" }}>
        <h3>Student Panel</h3>

        <Link to="">Dashboard</Link><br />
        <Link to="results">My Results</Link><br />
        <Link to="attendance">My Attendance</Link><br />
        <Link to="courses">My Courses</Link><br />
        <Link to="profile">Profile</Link><br /><br />

        <button onClick={logout}>Logout</button>
      </aside>

      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
