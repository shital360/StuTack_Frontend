import { useState } from "react";

const initialResults = [
  // Class 8
  { roll: "2024001", name: "Aarav Sharma",   class: "8",    total: 100, obtained: 93 },
  { roll: "2024002", name: "Priya Patel",    class: "8",    total: 100, obtained: 78 },
  { roll: "2024003", name: "Ananya Singh",   class: "8",    total: 100, obtained: 65 },
  { roll: "2024004", name: "Rohan Joshi",    class: "8",    total: 100, obtained: 48 },
  { roll: "2024005", name: "Sneha Agarwal",  class: "8",    total: 100, obtained: 35 },

  // Class 9
  { roll: "2024006", name: "Vikram Reddy",   class: "9",    total: 100, obtained: 91 },
  { roll: "2024007", name: "Ishita Verma",   class: "9",    total: 100, obtained: 76 },
  { roll: "2024008", name: "Rahul Gupta",    class: "9",    total: 100, obtained: 62 },
  { roll: "2024009", name: "Meera Nair",     class: "9",    total: 100, obtained: 44 },
  { roll: "2024010", name: "Tushar Pandey",  class: "9",    total: 100, obtained: 30 },

  // Class 10-A
  { roll: "2024011", name: "Sneha Gupta",    class: "10-A", total: 100, obtained: 88 },
  { roll: "2024012", name: "Arjun Mehta",    class: "10-A", total: 100, obtained: 73 },
  { roll: "2024013", name: "Divya Sharma",   class: "10-A", total: 100, obtained: 59 },
  { roll: "2024014", name: "Mohit Sinha",    class: "10-A", total: 100, obtained: 42 },
  { roll: "2024015", name: "Anjali Mishra",  class: "10-A", total: 100, obtained: 27 },
];

const getGrade = (pct) => {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  return "F";
};

export default function Results() {
  const [data, setData]               = useState(initialResults);
  const [filter, setFilter]           = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingRoll, setEditingRoll] = useState(null);
  const [editForm, setEditForm]       = useState({});

  const results = data.map((r) => {
    const pct = Math.round((r.obtained / r.total) * 100);
    return { ...r, percentage: pct, grade: getGrade(pct), status: pct >= 40 ? "Pass" : "Fail" };
  });

  const classes = ["all", ...new Set(data.map((r) => r.class))];

  const filtered = results.filter((r) => {
    const statusMatch = filter === "all" || (filter === "passed" ? r.status === "Pass" : r.status === "Fail");
    const classMatch  = classFilter === "all" || r.class === classFilter;
    return statusMatch && classMatch;
  });

  const handleEditOpen = (r) => {
    setEditingRoll(r.roll);
    setEditForm({ name: r.name, class: r.class, obtained: r.obtained });
  };

  const handleEditSave = (roll) => {
    if (editForm.obtained < 0 || editForm.obtained > 100) {
      alert("Obtained marks must be between 0 and 100!");
      return;
    }
    setData(data.map((r) =>
      r.roll === roll
        ? { ...r, name: editForm.name, class: editForm.class, obtained: Number(editForm.obtained) }
        : r
    ));
    setEditingRoll(null);
  };

  const downloadCSV = () => {
    const headers = ["Roll No.", "Student Name", "Class", "Total Marks", "Obtained", "Percentage", "Grade", "Status"];
    const rows = filtered.map((r) => [r.roll, r.name, r.class, r.total, r.obtained, r.percentage + "%", r.grade, r.status]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const thStyle = {
    padding: "14px 16px", background: "#2563eb", color: "white",
    fontWeight: "600", fontSize: "14px", textAlign: "left",
  };
  const tdStyle = {
    padding: "10px 16px", fontSize: "14px", color: "#333", borderBottom: "1px solid #f0f0f0",
  };
  const inlineInput = {
    padding: "5px 8px", border: "1px solid #93c5fd", borderRadius: "5px",
    fontSize: "13px", width: "100%", boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ padding: "30px", background: "#f5f6f8", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "4px" }}>
        Student Results
      </h1>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
        View and manage all student examination results
      </p>

      {/* Filters Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
            {[
              { key: "all",    label: "All Students" },
              { key: "passed", label: "Passed" },
              { key: "failed", label: "Failed" },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setFilter(tab.key)}
                style={{
                  padding: "8px 18px", fontSize: "13px", border: "none", cursor: "pointer",
                  background: filter === tab.key ? "#2563eb" : "white",
                  color: filter === tab.key ? "white" : "#333",
                  fontWeight: filter === tab.key ? "600" : "400",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
            style={{ padding: "8px 16px", fontSize: "13px", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer", background: "white", color: "#333", outline: "none" }}
          >
            {classes.map((c) => (
              <option key={c} value={c}>{c === "all" ? "All Classes" : `Class ${c}`}</option>
            ))}
          </select>
        </div>

        <button onClick={downloadCSV}
          style={{ padding: "8px 18px", fontSize: "13px", border: "none", borderRadius: "6px", cursor: "pointer", background: "#16a34a", color: "white", fontWeight: "600" }}
        >
          ⬇ Download CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Roll No.</th>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Class</th>
              <th style={thStyle}>Total Marks</th>
              <th style={thStyle}>Obtained</th>
              <th style={thStyle}>Percentage</th>
              <th style={thStyle}>Grade</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>No results found</td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={r.roll} style={{ background: editingRoll === r.roll ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={tdStyle}>{r.roll}</td>

                  {/* ✅ Inline edit cells */}
                  <td style={tdStyle}>
                    {editingRoll === r.roll ? (
                      <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} style={{ ...inlineInput, width: "130px" }} />
                    ) : r.name}
                  </td>

                  <td style={tdStyle}>
                    {editingRoll === r.roll ? (
                      <select value={editForm.class} onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                        style={{ ...inlineInput, width: "80px" }}>
                        {["8", "9", "10-A"].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : r.class}
                  </td>

                  <td style={tdStyle}>{r.total}</td>

                  <td style={tdStyle}>
                    {editingRoll === r.roll ? (
                      <input type="number" min="0" max="100" value={editForm.obtained}
                        onChange={(e) => setEditForm({ ...editForm, obtained: e.target.value })}
                        style={{ ...inlineInput, width: "65px" }} />
                    ) : r.obtained}
                  </td>

                  <td style={tdStyle}>{r.percentage}%</td>
                  <td style={tdStyle}>{r.grade}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
                      background: r.status === "Pass" ? "#dcfce7" : "#fee2e2",
                      color: r.status === "Pass" ? "#16a34a" : "#dc2626",
                    }}>
                      {r.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {editingRoll === r.roll ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => handleEditSave(r.roll)}
                          style={{ background: "#16a34a", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                          ✓
                        </button>
                        <button onClick={() => setEditingRoll(null)}
                          style={{ background: "#6b7280", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer", fontSize: "12px" }}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => setSelectedStudent(r)}
                          style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "13px" }}>
                          ℹ
                        </button>
                        <button onClick={() => handleEditOpen(r)}
                          style={{ background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                          ✏
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Detail Modal */}
      {selectedStudent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "30px", minWidth: "360px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Student Detail</h2>
            {Object.entries({
              "Roll No.":    selectedStudent.roll,
              "Name":        selectedStudent.name,
              "Class":       selectedStudent.class,
              "Total Marks": selectedStudent.total,
              "Obtained":    selectedStudent.obtained,
              "Percentage":  selectedStudent.percentage + "%",
              "Grade":       selectedStudent.grade,
              "Status":      selectedStudent.status,
            }).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>{k}</span>
                <span style={{ fontWeight: "600" }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setSelectedStudent(null)}
              style={{ marginTop: "20px", width: "100%", padding: "10px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}