import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Students", path: "/admin/students" },
  { label: "Courses", path: "/admin/courses" },
  { label: "Attendance", path: "/admin/attendance" },
  { label: "Results", path: "/admin/results" },
  { label: "Profile", path: "/admin/profile" },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "260px",
          height: "100vh",
          background: "#2c3e50",
          display: "flex",
          flexDirection: "column",
          padding: "30px 25px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          SIMS
        </div>

        <div style={{ flex: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <div key={item.path} style={{ marginBottom: "10px" }}>
                <Link
                  to={item.path}
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "white",
                    background: active ? "#34495e" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

        <div
          onClick={() => navigate("/")}
          style={{
            padding: "16px 20px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#ecf0f1",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;