const resultsData = [
  { subject: "Mathematics",   total: 100, obtained: 93, grade: "A+", status: "Pass" },
  { subject: "Science",       total: 100, obtained: 87, grade: "A",  status: "Pass" },
  { subject: "English",       total: 100, obtained: 79, grade: "B+", status: "Pass" },
  { subject: "Computer Sci.", total: 100, obtained: 91, grade: "A",  status: "Pass" },
  { subject: "Physics",       total: 100, obtained: 75, grade: "B",  status: "Pass" },
];

const gradeColor = (g) => {
  if (g === "A+" || g === "A") return "#1abc9c";
  if (g === "B+" || g === "B") return "#3498db";
  return "#e74c3c";
};

const MyResults = () => {
  const totalObtained = resultsData.reduce((s, r) => s + r.obtained, 0);
  const totalMarks    = resultsData.reduce((s, r) => s + r.total, 0);
  const percentage    = ((totalObtained / totalMarks) * 100).toFixed(1);
  const passed        = resultsData.filter(r => r.status === "Pass").length;

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>My Results</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>Your exam results for Spring 2026</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginBottom: "30px" }}>
        {[
          { label: "Total Marks",     value: totalMarks,               color: "#3498db" },
          { label: "Obtained",        value: totalObtained,            color: "#1abc9c" },
          { label: "Percentage",      value: `${percentage}%`,         color: "#9b59b6" },
          { label: "Subjects Passed", value: `${passed}/${resultsData.length}`, color: "#e67e22" },
        ].map((c) => (
          <div key={c.label} style={{
            background: "white", padding: "25px 20px", borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)", textAlign: "center",
          }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>{c.label}</h3>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: c.color, margin: 0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "18px", color: "#2c3e50", marginBottom: "20px" }}>Subject-wise Results</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2c3e50" }}>
              {["#", "Subject", "Total", "Obtained", "Percentage", "Grade", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontSize: "14px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultsData.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{i + 1}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{r.subject}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{r.total}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{r.obtained}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: "#34495e", borderBottom: "1px solid #ecf0f1" }}>{((r.obtained / r.total) * 100).toFixed(0)}%</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #ecf0f1" }}>
                  <span style={{ background: gradeColor(r.grade), color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>{r.grade}</span>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #ecf0f1" }}>
                  <span style={{ background: r.status === "Pass" ? "#1abc9c" : "#e74c3c", color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyResults;