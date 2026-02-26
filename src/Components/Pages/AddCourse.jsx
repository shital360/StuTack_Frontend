import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse({ courses, setCourses }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code:     "",
    name:     "",
    teacher:  "",
    
    full:     false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.code || !form.name || !form.className || !form.teacher) {
      alert("Please fill in all required fields!");
      return;
    }

    const exists = courses.find(c => c.code === form.code);
    if (exists) {
      alert("Course code already exists!");
      return;
    }

    setCourses([...courses, { ...form, class: form.className }]);
    alert("Course added successfully!");
    navigate("/courses");
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: "1px solid #ddd",
    borderRadius: "6px", fontSize: "14px", boxSizing: "border-box",
    marginTop: "5px",
  };

  const labelStyle = {
    fontSize: "13px", fontWeight: "600", color: "#555",
  };

  const fields = [
    { label: "Course Code *", name: "code",      placeholder: "e.g. C101"              },
    { label: "Course Name *", name: "name",      placeholder: "e.g. computer science" },
    { label: "Teacher *",     name: "teacher",   placeholder: "e.g.  Sarah Johnson"  },

  ];

  return (
    <div style={{ padding: "30px", background: "#f5f6f8", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "26px", color: "#2c3e50", marginBottom: "5px" }}>Add Course</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "24px", fontSize: "14px" }}>
        Fill in the details to add a new course
      </p>

      <div style={{
        background: "white", borderRadius: "12px", padding: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", maxWidth: "600px",
      }}>
        {fields.map((f) => (
          <div key={f.name} style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>{f.label}</label>
            <input
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 28px", background: "#2563eb", color: "white",
              border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px",
            }}
          >
            + Add Course
          </button>
          <button
            onClick={() => navigate("/courses")}
            style={{
              padding: "12px 28px", background: "#e5e7eb", color: "#333",
              border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}