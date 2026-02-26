import { useState } from "react";

const initialCourses = [
  { code: "CS101",   name: "Intro to Computer Science", teacher: "Dr. Sarah Johnson", schedule: "Mon, Wed, Fri 10–11 AM", grade: "A",  credits: "3 Credits", desc: "Fundamentals of programming and computational thinking using Python." },
  { code: "MATH201", name: "Calculus II",                teacher: "Prof. Michael Chen", schedule: "Tue, Thu 1–3 PM",       grade: "A+", credits: "4 Credits", desc: "Integral calculus, sequences, series and their applications." },
  { code: "ENG150",  name: "Academic Writing",           teacher: "Dr. Emily Brown",   schedule: "Mon, Wed, Fri 2–3 PM",  grade: "B+", credits: "3 Credits", desc: "Developing academic writing skills for research and analysis." },
  { code: "PHYS101", name: "Physics I",                  teacher: "Prof. David Lee",   schedule: "Tue, Thu 9–11 AM",      grade: "B",  credits: "4 Credits", desc: "Mechanics, kinematics, Newton's laws and energy systems." },
  { code: "SCI202",  name: "General Science",            teacher: "Dr. Anita Sharma",  schedule: "Mon, Fri 11–12 PM",     grade: "A",  credits: "3 Credits", desc: "Overview of scientific principles across biology, chemistry and earth science." },
];

const gradeColor = (g) => {
  if (g === "A+") return "#20c997";
  if (g === "A")  return "#38b2ac";
  if (g === "B+") return "#4299e1";
  if (g === "B")  return "#667eea";
  return "#e74c3c";
};

export default function MyCourses() {
  const [courses, setCourses]       = useState(initialCourses);
  const [popup, setPopup]           = useState(null);       // selected course for popup
  const [editingCode, setEditingCode] = useState(null);     // which row's schedule is being edited
  const [editVal, setEditVal]       = useState("");
  const [toast, setToast]           = useState(false);

  const openPopup = (course) => setPopup(course);
  const closePopup = () => setPopup(null);

  const startEdit = (e, course) => {
    e.stopPropagation();
    setEditingCode(course.code);
    setEditVal(course.schedule);
  };

  const saveSchedule = (code) => {
    setCourses(prev => prev.map(c => c.code === code ? { ...c, schedule: editVal || c.schedule } : c));
    setEditingCode(null);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'DM Sans', sans-serif", background: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>My Courses</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>All courses enrolled this semester</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "30px" }}>
        {[
          { label: "Total Courses", value: courses.length, color: "#3498db" },
          { label: "Active",        value: courses.length, color: "#1abc9c" },
          { label: "Semester",      value: "Spring 2026",  color: "#9b59b6" },
        ].map((c) => (
          <div key={c.label} style={{ background: "white", padding: "25px 20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>{c.label}</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: c.color, margin: 0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "18px", color: "#2c3e50", marginBottom: "20px" }}>Enrolled Courses</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2c3e50" }}>
              {["Code", "Course Name", "Teacher", "Schedule", "Grade"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontSize: "14px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                {/* Code */}
                <td style={tdStyle}><strong>{c.code}</strong></td>

                {/* Course Name — click for popup */}
                <td style={tdStyle}>
                  <span
                    onClick={() => openPopup(c)}
                    style={{ cursor: "pointer", color: "#2980b9", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "5px" }}
                    title="Click to view details"
                  >
                    {c.name}
                    <span style={{ fontSize: "11px", opacity: 0.7 }}>↗</span>
                  </span>
                </td>

                {/* Teacher */}
                <td style={tdStyle}>{c.teacher}</td>

                {/* Schedule — click to edit */}
                <td style={tdStyle}>
                  {editingCode === c.code ? (
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }} onClick={e => e.stopPropagation()}>
                      <input
                        autoFocus
                        value={editVal}
                        onChange={e => setEditVal(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") saveSchedule(c.code); if (e.key === "Escape") setEditingCode(null); }}
                        style={{ border: "1.5px solid #3498db", borderRadius: "6px", padding: "5px 10px", fontSize: "13px", outline: "none", width: "185px" }}
                      />
                      <button onClick={() => saveSchedule(c.code)} style={{ background: "#1abc9c", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Save</button>
                      <button onClick={() => setEditingCode(null)} style={{ background: "#ecf0f1", color: "#555", border: "none", borderRadius: "5px", padding: "5px 8px", fontSize: "12px", cursor: "pointer" }}>✕</button>
                    </div>
                  ) : (
                    <span
                      onClick={e => startEdit(e, c)}
                      title="Click to edit schedule"
                      style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "6px", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#eaf4fb"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {c.schedule}
                      <span style={{ fontSize: "12px", opacity: 0.5 }}>✏️</span>
                    </span>
                  )}
                </td>

                {/* Grade */}
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #ecf0f1" }}>
                  <span style={{ background: gradeColor(c.grade), color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>{c.grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {popup && (
        <div
          onClick={closePopup}
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "18px", width: "500px", maxWidth: "94vw", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg,#1e2a3a,#2d3e55)", padding: "26px 28px 20px", color: "#fff", position: "relative" }}>
              <div style={{ fontSize: "12px", color: "#20c997", fontFamily: "monospace", marginBottom: "5px", letterSpacing: "0.05em" }}>{popup.code}</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "4px" }}>{popup.name}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{popup.teacher}</div>
              <button onClick={closePopup} style={{ position: "absolute", top: "16px", right: "18px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "14px" }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
                {[
                  { label: "Schedule", value: popup.schedule },
                  { label: "Credits",  value: popup.credits  },
                ].map(f => (
                  <div key={f.label} style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "5px", fontWeight: "500" }}>{f.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>{f.value}</div>
                  </div>
                ))}
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px 16px", gridColumn: "1/-1" }}>
                  <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "5px", fontWeight: "500" }}>Description</div>
                  <div style={{ fontSize: "14px", color: "#4a5568", lineHeight: 1.6 }}>{popup.desc}</div>
                </div>
              </div>

              {/* Grade section */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "linear-gradient(135deg,#e6fffa,#ebf8ff)", borderRadius: "12px", padding: "16px 20px", border: "1px solid #b2f5ea" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: gradeColor(popup.grade), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.1rem", fontWeight: "700", flexShrink: 0, boxShadow: `0 4px 14px ${gradeColor(popup.grade)}66` }}>
                  {popup.grade}
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#234e52", fontSize: "15px" }}>Grade: {popup.grade}</div>
                  <div style={{ fontSize: "12px", color: "#4a5568", marginTop: "2px" }}>Current Grade · Class 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: "28px", right: "28px",
        background: "#1e2a3a", color: "#fff", padding: "12px 20px",
        borderRadius: "10px", fontSize: "14px", fontWeight: "500",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        transform: toast ? "translateY(0)" : "translateY(20px)",
        opacity: toast ? 1 : 0,
        transition: "all 0.3s",
        pointerEvents: "none",
        zIndex: 200,
      }}>
        ✅ Schedule saved!
      </div>
    </div>
  );
}

const tdStyle = {
  padding: "12px 16px",
  fontSize: "14px",
  color: "#34495e",
  borderBottom: "1px solid #ecf0f1",
};