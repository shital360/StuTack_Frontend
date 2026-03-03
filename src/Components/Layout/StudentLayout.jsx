import { Outlet, useNavigate, useLocation } from "react-router-dom";

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const getLinkStyle = (path) =>
    isActive(path) ? activeLinkStyle : linkStyle;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div>
          <h2 style={logoStyle}>SIMS</h2>

          <div style={menuContainerStyle}>
            {/* Dashboard */}
            <p
              style={getLinkStyle("/student")}
              onClick={() => navigate("/student")}
            >
              Dashboard
            </p>

            {/* Attendance */}
            <p
              style={getLinkStyle("/student/attendance")}
              onClick={() => navigate("/student/attendance")}
            >
              My Attendance
            </p>

            {/* Courses */}
            <p
              style={getLinkStyle("/student/courses")}
              onClick={() => navigate("/student/courses")}
            >
              My Courses
            </p>

            {/* Results (Moved Below Courses) */}
            <p
              style={getLinkStyle("/student/results")}
              onClick={() => navigate("/student/results")}
            >
              My Results
            </p>

            {/* Profile */}
            <p
              style={getLinkStyle("/student/profile")}
              onClick={() => navigate("/student/profile")}
            >
              Profile
            </p>
          </div>
        </div>

        {/* Logout Bottom */}
        <div style={logoutContainerStyle}>
          <p style={logoutStyle} onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const sidebarStyle = {
  width: "240px",
  height: "100vh",
  backgroundColor: "#34495e",
  color: "white",
  padding: "25px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logoStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "25px",
};

const menuContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const linkStyle = {
  cursor: "pointer",
  fontSize: "15px",
  padding: "8px 12px",
  borderRadius: "6px",
};

const activeLinkStyle = {
  cursor: "pointer",
  fontSize: "15px",
  padding: "8px 12px",
  backgroundColor: "#3f5870",
  borderRadius: "6px",
};

const logoutContainerStyle = {
  marginBottom: "15px",
};

const logoutStyle = {
  cursor: "pointer",
  fontSize: "15px",
};

const contentStyle = {
  flex: 1,
  backgroundColor: "#f4f6f9",
  padding: "40px",
};

export default StudentLayout;