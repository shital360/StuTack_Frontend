const attendanceData = [
  { date: "2026-02-01", subject: "Mathematics",  status: "Present" },
  { date: "2026-02-01", subject: "Science",       status: "Present" },
  { date: "2026-02-03", subject: "English",       status: "Absent"  },
  { date: "2026-02-04", subject: "Physics",       status: "Present" },
  { date: "2026-02-05", subject: "Computer Sci.", status: "Present" },
  { date: "2026-02-07", subject: "Mathematics",  status: "Absent"  },
  { date: "2026-02-08", subject: "Science",       status: "Present" },
  { date: "2026-02-10", subject: "English",       status: "Present" },
  { date: "2026-02-12", subject: "Physics",       status: "Present" },
  { date: "2026-02-14", subject: "Computer Sci.", status: "Absent"  },
];

const MyAttendance = () => {
  const total   = attendanceData.length;
  const present = attendanceData.filter(a => a.status === "Present").length;
  const absent  = total - present;
  const percent = ((present / total) * 100).toFixed(1);

  const statCards = [
    { label: "Total Classes", value: total,         color: "#3498db" },
    { label: "Present",       value: present,       color: "#1abc9c" },
    { label: "Absent",        value: absent,        color: "#e74c3c" },
    { label: "Attendance %",  value: `${percent}%`, color: "#9b59b6" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>My Attendance</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>Your attendance record for this semester</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginBottom: "30px" }}>
        {statCards.map((c) => (
          <div key={c.label} style={{
            background: "white", padding: "25px 20px", borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)", textAlign: "center",
          }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>{c.label}</h3>
            <p style={{ fontSize: "36px", fontWeight: "bold", color: c.color, margin: 0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "18px", color: "#2c3e50", marginBottom: "20px" }}>Attendance Details</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2c3e50" }}>
              {["#", "Date", "Subject", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontSize: "14px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{i + 1}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{row.date}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{row.subject}</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #ecf0f1" }}>
                  <span style={{
                    background: row.status === "Present" ? "#1abc9c" : "#e74c3c",
                    color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
                  }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAttendance;