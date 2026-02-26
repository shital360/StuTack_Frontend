import { useState } from "react";

const initialStudents = [
  { id: "001", name: "Aarav Sharma",  className: "10-A" },
  { id: "002", name: "Priya Patel",   className: "10-A" },
  { id: "003", name: "Rohan Kumar",   className: "8" },
  { id: "004", name: "Ananya Singh",  className: "10-A" },
  { id: "005", name: "Vikram Reddy",  className: "9" },
  { id: "006", name: "Sneha Gupta",   className: "9" },
  { id: "007", name: "Arjun Mehta",   className: "8" },
  { id: "008", name: "Ishita Verma",  className: "9" },
];

function Students() {
  const [students, setStudents]   = useState(initialStudents);
  const [showForm, setShowForm]   = useState(false);
  const [isEdit, setIsEdit]       = useState(false);
  const [form, setForm]           = useState({ id: "", name: "", className: "" });

  const handleChange  = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = () => {
    if (!form.id || !form.name || !form.className) { alert("All fields required"); return; }
    if (students.find(s => s.id === form.id)) { alert("ID already exists!"); return; }
    setStudents([...students, form]);
    resetForm();
  };

  const editStudent   = (s) => { setForm(s); setShowForm(true); setIsEdit(true); };
  const updateStudent = () => { setStudents(students.map((s) => s.id === form.id ? form : s)); resetForm(); };
  const deleteStudent = (id) => { if (window.confirm("Delete this student?")) setStudents(students.filter((s) => s.id !== id)); };
  const resetForm     = () => { setForm({ id: "", name: "", className: "" }); setShowForm(false); setIsEdit(false); };

  const tdStyle    = { padding: "14px 16px", borderBottom: "1px solid #e5e7eb", fontSize: "14px", color: "#374151" };
  const inputStyle = { padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ padding: "30px", background: "#f9fafb", minHeight: "100vh" }}>

      {/* Header */}
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#111827", marginBottom: "6px" }}>Students</h2>
      <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px" }}>Manage all student records</p>

      {/* Add Student Button */}
      <button
        onClick={() => { setShowForm(true); setIsEdit(false); setForm({ id: "", name: "", className: "" }); }}
        style={{
          padding: "10px 20px", background: "#2c3e50", color: "white",
          border: "none", borderRadius: "8px", cursor: "pointer",
          fontSize: "15px", marginBottom: "20px",
        }}
      >
        + Add Student
      </button>

      {/* Form */}
      {showForm && (
        <div style={{
          background: "white", borderRadius: "12px", padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.07)", marginBottom: "24px",
          maxWidth: "500px",
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#111827" }}>
            {isEdit ? "Edit Student" : "Add New Student"}
          </h3>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>ID</label>
            <input name="id" value={form.id} onChange={handleChange} placeholder="e.g. 007" disabled={isEdit} style={{ ...inputStyle, marginTop: "4px", background: isEdit ? "#f3f4f6" : "white" }} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Bikash" style={{ ...inputStyle, marginTop: "4px" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>Class</label>
            <select name="className" value={form.className} onChange={handleChange} style={{ ...inputStyle, marginTop: "4px" }}>
              <option value="">Select Class</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10-A">Class 10-A</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={isEdit ? updateStudent : addStudent}
              style={{ padding: "10px 24px", background: "#16a34a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" }}
            >
              {isEdit ? "Update" : "Save"}
            </button>
            <button
              onClick={resetForm}
              style={{ padding: "10px 24px", background: "#e5e7eb", color: "#333", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2c3e50" }}>
              {["ID", "Name", "Class", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "white", fontSize: "14px", fontWeight: "600" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 0 ? "#f9fafb" : "white" }}>
                <td style={tdStyle}>{s.id}</td>
                <td style={tdStyle}>{s.name}</td>
                <td style={tdStyle}>{s.className}</td>
                <td style={{ ...tdStyle, display: "flex", gap: "8px" }}>
                  <button onClick={() => editStudent(s)} style={{
                    padding: "6px 14px", background: "#3b82f6", color: "white",
                    border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
                  }}>✏️ Edit</button>
                  <button onClick={() => deleteStudent(s.id)} style={{
                    padding: "6px 14px", background: "#dc2626", color: "white",
                    border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
                  }}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;