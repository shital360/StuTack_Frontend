import { useState } from "react";
import "../Style/Attendance.css";

const studentsData = [
{ id: 1, name: "Aarav Sharma", class: "10-A" },
  { id: 2, name: "Priya Patel", class: "10-A" },
  { id: 3, name: "Ananya Singh", class: "10-A" },
  { id: 4, name: "Rahul Verma", class: "10-A" },
  { id: 5, name: "Sanya Kapoor", class: "10-A" },
  { id: 6, name: "Karan Malhotra", class: "10-A" },
  { id: 7, name: "Diya Sharma", class: "10-A" },
  { id: 8, name: "Aditya Joshi", class: "10-A" },
  { id: 9, name: "Rohan Mehta", class: "10-A" },
  { id: 10, name: "Sneha Desai", class: "10-A" },

  // Class 9 (10 Students)
  { id: 11, name: "Neha Gupta", class: "9" },
  { id: 12, name: "Gita Thapa", class: "9" },
  { id: 13, name: "Shyam Shrestha", class: "9" },
  { id: 14, name: "Ramesh Thapa", class: "9" },
  { id: 15, name: "Suman Rai", class: "9" },
  { id: 16, name: "Anita Karki", class: "9" },
  { id: 17, name: "Bikash Adhikari", class: "9" },
  { id: 18, name: "Nisha Poudel", class: "9" },
  { id: 19, name: "Manish Gurung", class: "9" },
  { id: 20, name: "Kriti Bhandari", class: "9" },

  // Class 8 (10 Students)
  { id: 21, name: "Riya Singh", class: "8" },
  { id: 22, name: "Vikram Joshi", class: "8" },
  { id: 23, name: "Hari Singh", class: "8" },
  { id: 24, name: "Sita Karki", class: "8" },
  { id: 25, name: "Aakash Rana", class: "8" },
  { id: 26, name: "Pooja Shah", class: "8" },
  { id: 27, name: "Nabin KC", class: "8" },
  { id: 28, name: "Maya Gurung", class: "8" },
  { id: 29, name: "Roshan Thapa", class: "8" },
  { id: 30, name: "Laxmi Subedi", class: "8" },
];

export default function Attendance() {
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filter by class + search
  const filteredStudents = studentsData.filter(
    (student) =>
      student.class === selectedClass &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = filteredStudents.length;

  const presentCount = Object.entries(attendance).filter(
    ([id, status]) =>
      status === "Present" &&
      filteredStudents.some((s) => s.id === parseInt(id))
  ).length;

  const absentCount = Object.entries(attendance).filter(
    ([id, status]) =>
      status === "Absent" &&
      filteredStudents.some((s) => s.id === parseInt(id))
  ).length;

  const percentage =
    totalStudents === 0
      ? 0
      : ((presentCount / totalStudents) * 100).toFixed(1);

  const markAttendance = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSaveAttendance = () => {
    console.log("Attendance saved:", attendance);
    alert("Attendance saved successfully!");
  };

  return (
    <div className="attendance-page">
      {/* Header */}
      <div className="top-bar">
        <h2>Student Information System</h2>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Title */}
      <div className="page-title">
        <h3>Attendance Management</h3>
        <p>Track and manage student attendance</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <button className="export-btn">Export</button>
        <input type="date" />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10-A">10-A</option>
          <option value="9">9</option>
          <option value="8">8</option>
        </select>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="card">
          <span>Total Students</span>
          <h3>{totalStudents}</h3>
        </div>
        <div className="card">
          <span>Present</span>
          <h3 className="green">{presentCount}</h3>
        </div>
        <div className="card">
          <span>Absent</span>
          <h3 className="red">{absentCount}</h3>
        </div>
        <div className="card">
          <span>Attendance %</span>
          <h3 className="blue">{percentage}%</h3>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{attendance[student.id] || "-"}</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={attendance[student.id] === "Present"}
                        onChange={() =>
                          markAttendance(student.id, "Present")
                        }
                      />
                      Present
                    </label>
                    <label className="absent">
                      <input
                        type="checkbox"
                        checked={attendance[student.id] === "Absent"}
                        onChange={() =>
                          markAttendance(student.id, "Absent")
                        }
                      />
                      Absent
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="bottom-actions">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn" onClick={handleSaveAttendance}>
          Save Attendance
        </button>
      </div>
    </div>
  );
}
