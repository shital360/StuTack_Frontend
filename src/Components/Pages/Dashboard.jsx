function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>
        Welcome, Admin
      </h1>
      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>
        Manage student information efficiently.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}>
        {[
          { label: "Total Students",    value: "350" },
          { label: "Total Classes",     value: "25"  },
          { label: "New Students Month",value: "8"   },
          { label: "Active Courses",    value: "12"  },
        ].map((c) => (
          <div key={c.label} style={{
            background: "white", padding: "25px 20px",
            borderRadius: "10px", textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
          }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>
              {c.label}
            </h3>
            <p style={{ fontSize: "36px", fontWeight: "bold", color: "#3498db", margin: 0 }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;