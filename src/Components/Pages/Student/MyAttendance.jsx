import { useEffect, useState } from "react";

export default function MyAttendance() {
  const [attendance, setAttendance] = useState("");
  const rollNo = localStorage.getItem("rollNo");

  useEffect(() => {
    if (!rollNo) return;

    fetch(`http://localhost:5000/students/${rollNo}`)
      .then((res) => res.json())
      .then((data) => setAttendance(data.attendance))
      .catch((err) => console.error(err));
  }, [rollNo]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 My Attendance</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {attendance || "Loading..."}
      </p>
    </div>
  );
}