import { useState } from "react";
// import "./AddCourse.css";

function AddCourse() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [credit, setCredit] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState("Active");

  const saveCourse = () => {
    if (!code || !name) {
      alert("Please fill required fields");
      return;
    }

    const course = {
      code,
      name,
      className,
      credit,
      teacher,
      status,
    };

    console.log(course); // 👈 yaha add bhayo
    alert("Course Added Successfully ✅");

    // reset
    setCode("");
    setName("");
    setClassName("");
    setCredit("");
    setTeacher("");
    setStatus("Active");
  };

  return (
    <div className="add-course-page">
      <div className="add-course-card">
        <h2>Add Course</h2>

        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Credit"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teacher Name"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button onClick={saveCourse}>Save Course</button>
      </div>
    </div>
  );
}

export default AddCourse;
