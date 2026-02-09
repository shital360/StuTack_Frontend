import { useEffect, useState } from "react";

export default function MyResults() {
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
      <h2>📊 My Results</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(student.results || {}).map(([subject, marks]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td>{marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}