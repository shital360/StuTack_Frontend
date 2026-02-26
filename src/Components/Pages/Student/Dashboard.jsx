import { useEffect, useState } from "react";

const students = [
  { rollNo: "1", name: "Sita Thapa", totalCourses: "5", attendance: "80%", gpa: "3.8", status: "Passed" },
  { rollNo: "2", name: "Ram Sharma", totalCourses: "5", attendance: "75%", gpa: "3.5", status: "Passed" },
  { rollNo: "3", name: "Hari Karki", totalCourses: "5", attendance: "65%", gpa: "3.2", status: "Passed" },
  { rollNo: "4", name: "Gita Rai", totalCourses: "5", attendance: "90%", gpa: "3.9", status: "Passed" },
  { rollNo: "5", name: "Manish Gurung", totalCourses: "5", attendance: "50%", gpa: "2.8", status: "Failed" },
];

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const rollNo = localStorage.getItem("rollNo");
    
    const foundStudent = students.find((s) => s.rollNo == rollNo);
    setStudent(foundStudent);
  }, []);

  if (!student) return <h2>Loading...</h2>;

  const cards = [
    { label: "Total Courses", value: student.totalCourses },
    { label: "Attendance", value: student.attendance },
    { label: "GPA", value: student.gpa },
    { label: "Result Status", value: student.status },
  ];

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ fontSize: "28px", color: "#2c3e50", marginBottom: "5px" }}>
        Welcome, {student.name}
      </h1>

      <p style={{ color: "#7f8c8d", marginBottom: "30px", fontSize: "14px" }}>
        Manage your academic information.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}>
        {cards.map((c) => (
          <div key={c.label} style={{
            background: "white",
            padding: "25px 20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}>
            <h3 style={{ color: "#7f8c8d", fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>
              {c.label}
            </h3>
            <p style={{ fontSize: "36px", fontWeight: "bold", color: "#3498db", margin: 0 }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentDashboard;