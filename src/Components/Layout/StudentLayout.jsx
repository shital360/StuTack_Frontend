import { Outlet, NavLink } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#2c3e50",
        color: "white",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexShrink: 0,
      }}>
        <h2 style={{ color: "white", fontSize: "22px", fontWeight: "bold", marginBottom: "24px" }}>SIMS</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            { to: "/student", label: "Dashboard", end: true },
            { to: "/student/results", label: "My Results" },
            { to: "/student/attendance", label: "My Attendance" },
            { to: "/student/courses", label: "My Courses" },
            { to: "/student/profile", label: "Profile" },
            { to: "/login", label: "Logout" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                padding: "10px 14px",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                background: isActive ? "#3498db" : "transparent",
                fontSize: "14px",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f5f6f8", overflowY: "auto" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default StudentLayout;