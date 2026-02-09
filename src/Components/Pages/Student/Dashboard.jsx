import { useEffect, useState } from "react";

export default function StudentDashboard() {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {student.name} 👋</h2>
      <p><b>Roll No:</b> {student.rollNo}</p>
      <p><b>Class:</b> {student.className}</p>
      <hr />
      <h3>Quick Info</h3>
      <p>📚 Total Subjects: {Object.keys(student.results || {}).length}</p>
      <p>📊 Attendance: {student.attendance}</p>
    </div>
  );
}