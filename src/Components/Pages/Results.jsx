import { useState } from "react";
// import "../Style/Result.css";

const studentsData = [
  {
    roll: "2024001",
    name: "Aarav Sharma",
    class: "10-A",
    total: 500,
    obtained: 465,
    percentage: 93,
    grade: "A+",
    status: "Pass",
  },
  {
    roll: "2024002",
    name: "Priya Patel",
    class: "10-A",
    total: 500,
    obtained: 445,
    percentage: 89,
    grade: "A",
    status: "Pass",
  },
  {
    roll: "2024003",
    name: "Rohan Kumar",
    class: "10-B",
    total: 500,
    obtained: 420,
    percentage: 84,
    grade: "A",
    status: "Pass",
  },
  {
    roll: "2024004",
    name: "Ananya Singh",
    class: "10-A",
    total: 500,
    obtained: 395,
    percentage: 79,
    grade: "B+",
    status: "Pass",
  },
  {
    roll: "2024005",
    name: "Vikram Reddy",
    class: "10-B",
    total: 500,
    obtained: 360,
    percentage: 72,
    grade: "B",
    status: "Pass",
  },
  {
    roll: "2024006",
    name: "Sneha Gupta",
    class: "10-C",
    total: 500,
    obtained: 335,
    percentage: 67,
    grade: "B",
    status: "Pass",
  },
  {
    roll: "2024007",
    name: "Arjun Mehta",
    class: "10-C",
    total: 500,
    obtained: 295,
    percentage: 59,
    grade: "C",
    status: "Pass",
  },
  {
    roll: "2024008",
    name: "Ishita Verma",
    class: "10-B",
    total: 500,
    obtained: 180,
    percentage: 36,
    grade: "F",
    status: "Fail",
  },
];

export default function StudentResults() {
  const [filter, setFilter] = useState("ALL");

  const filteredStudents =
    filter === "ALL"
      ? studentsData
      : studentsData.filter((s) => s.status === filter);

  return (
    <div className="results-page">
      <h2>Student Results</h2>
      <p className="subtitle">
        View and manage all student examination results
      </p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          All Students
        </button>
        <button
          className={filter === "Pass" ? "active" : ""}
          onClick={() => setFilter("Pass")}
        >
          Passed
        </button>
        <button
          className={filter === "Fail" ? "active" : ""}
          onClick={() => setFilter("Fail")}
        >
          Failed
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Marks</th>
              <th>Obtained</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.roll}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.total}</td>
                <td>{s.obtained}</td>
                <td>{s.percentage}%</td>
                <td>
                  <span className={`grade ${s.grade}`}>
                    {s.grade}
                  </span>
                </td>
                <td>
                  <span
                    className={`status ${
                      s.status === "Pass" ? "pass" : "fail"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="actions">
                  👁️ ⬇️
          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
