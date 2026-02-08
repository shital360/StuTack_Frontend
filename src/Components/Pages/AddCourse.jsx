import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse({ courses, setCourses }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ code: "", name: "", courseClass: "", teacher: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addCourse = () => {
    if (!form.code || !form.name || !form.courseClass || !form.teacher)
      return alert("All fields required");

    setCourses([...courses, form]);
    navigate("/courses"); // go back to courses page
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Course</h2>
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={form.code}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="courseClass"
        placeholder="Class"
        value={form.courseClass}
        onChange={handleChange}
      />
      <input
        type="text"
        name="teacher"
        placeholder="Teacher"
        value={form.teacher}
        onChange={handleChange}
      />
      <button onClick={addCourse}>Save</button>
    </div>
  );
}

export default AddCourse;
