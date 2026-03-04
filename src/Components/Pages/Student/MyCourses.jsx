import { useState } from "react";

const initialCourses = [
  { 
    code: "C101",
    name: "English",
    teacher: "Anita Sharma",
    schedule: "Mon, Wed, Fri 10–11 AM",
    grade: "A",
    credits: "3 Credits",
    desc: "Fundamentals of programming and computational thinking using Python."
  },
  { 
    code: "C102",
    name: "Nepali",
    teacher: "Gita Koirala",
    schedule: "Tue, Thu 1–3 PM",
    grade: "A+",
    credits: "4 Credits",
    desc: "Integral calculus, sequences, series and their applications."
  },
  { 
    code: "C103",
    name: "Science",
    teacher: "Sita Thapa",
    schedule: "Mon, Wed, Fri 2–3 PM",
    grade: "B+",
    credits: "3 Credits",
    desc: "Developing academic writing skills for research and analysis."
  },
  { 
    code: "C104",
    name: "Social",
    teacher: "Hari.Shrestha",
    schedule: "Tue, Thu 9–11 AM",
    grade: "B",
    credits: "4 Credits",
    desc: "Mechanics, kinematics, Newton's laws and energy systems."
  },
  { 
    code: "C105",
    name: "Mathematics",
    teacher: "Ramesh Sharma",
    schedule: "Mon, Fri 11–12 PM",
    grade: "A",
    credits: "3 Credits",
    desc: "Overview of scientific principles across biology, chemistry and earth science."
  },
];

export default function MyCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [popup, setPopup] = useState(null);
  const [editingCode, setEditingCode] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [toast, setToast] = useState(false);

  const openPopup = (course) => setPopup(course);
  const closePopup = () => setPopup(null);

  const startEdit = (e, course) => {
    e.stopPropagation();
    setEditingCode(course.code);
    setEditVal(course.schedule);
  };

  const saveSchedule = (code) => {
    setCourses(prev =>
      prev.map(c =>
        c.code === code ? { ...c, schedule: editVal || c.schedule } : c
      )
    );
    setEditingCode(null);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'DM Sans', sans-serif", background: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>
        My Courses
      </h1>
      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>
        All courses enrolled this semester
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "30px" }}>
        {[
          { label: "Total Courses", value: courses.length, color: "#3498db" },
          { label: "Active", value: courses.length, color: "#1abc9c" },
          { label: "Classes", value: "Courses", color: "#9b59b6" },
        ].map((c) => (
          <div key={c.label} style={{ background: "white", padding: "25px 20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", marginBottom: "12px" }}>
              {c.label}
            </h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: c.color, margin: 0 }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 2px 5px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "18px", color: "#2c3e50", marginBottom: "20px" }}>
          Enrolled Courses
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2c3e50" }}>
              {["Code", "Course Name", "Teacher", "Schedule"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontSize: "14px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                <td style={tdStyle}><strong>{c.code}</strong></td>

                <td style={tdStyle}>
                  <span
                    onClick={() => openPopup(c)}
                    style={{ cursor: "pointer", color: "#2980b9", fontWeight: "500" }}
                  >
                    {c.name}
                  </span>
                </td>

                <td style={tdStyle}>{c.teacher}</td>

                <td style={tdStyle}>
                  {editingCode === c.code ? (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        autoFocus
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveSchedule(c.code);
                          if (e.key === "Escape") setEditingCode(null);
                        }}
                        style={{ border: "1px solid #3498db", borderRadius: "6px", padding: "5px 10px" }}
                      />
                      <button onClick={() => saveSchedule(c.code)}>Save</button>
                    </div>
                  ) : (
                    <span
                      onClick={(e) => startEdit(e, c)}
                      style={{ cursor: "pointer" }}
                    >
                      {c.schedule} ✏️
                    </span>
                  )}
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
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "500px",
              padding: "25px",
            }}
          >
            <h2>{popup.name}</h2>
            <p><strong>Code:</strong> {popup.code}</p>
            <p><strong>Teacher:</strong> {popup.teacher}</p>
            <p><strong>Schedule:</strong> {popup.schedule}</p>
            <p><strong>Credits:</strong> {popup.credits}</p>
            <p>{popup.desc}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#1e2a3a",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          ✅ Schedule saved!
        </div>
      )}
    </div>
  );
}

const tdStyle = {
  padding: "12px 16px",
  fontSize: "14px",
  borderBottom: "1px solid #ecf0f1",
};