import { useEffect, useState } from "react";

export default function MyCourses() {
  const [student, setStudent] = useState(null);
  const rollNo = localStorage.getItem("rollNo");

  useEffect(() => {
    if (!rollNo) return;

    fetch(`http://localhost:5000/students/${rollNo}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error(err));
  }, [rollNo]);

  if (!student) return <p>Loading...</p>;

  const subjects = Object.keys(student.results || {});

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 My Courses</h2>
      <p><b>Class:</b> {student.className}</p>
      
      <h3>Subjects:</h3>
      <ul>
        {subjects.map((subject) => (
          <li key={subject}>{subject}</li>
        ))}
      </ul>
    </div>
  );
}