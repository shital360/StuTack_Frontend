import { useEffect, useState } from "react";

export default function Profile() {
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
      <h2>👤 My Profile</h2>
      <p><b>Name:</b> {student.name}</p>
      <p><b>Roll No:</b> {student.rollNo}</p>
      <p><b>Class:</b> {student.className}</p>
      <p><b>Email:</b> {student.email || "N/A"}</p>
    </div>
  );
}