import { useState } from "react";
import "../Style/Landing.css";

const initialData = [
  // (timro initialData same rakhne – change garna pardaina)
];

export default function StudentResults() {
  const [students, setStudents] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [editRoll, setEditRoll] = useState(null);
  const [editData, setEditData] = useState({});

  const classes = ["ALL", ...new Set(initialData.map(s => s.class))];

  const filteredStudents = students
    .filter(s => statusFilter === "ALL" || s.status === statusFilter)
    .filter(s => classFilter === "ALL" || s.class === classFilter);

  const handleEdit = (s) => {
    setEditRoll(s.roll);
    setEditData({ ...s });
  };

  const handleSave = (roll) => {
    setStudents(students.map((s) => s.roll === roll ? { ...s, ...editData } : s));
    setEditRoll(null);
  };

  const handleCancel = () => setEditRoll(null);

  return (
    <div className="results-container">

      <h2 className="results-title">Student Results</h2>
      <p className="results-subtitle">
        View and manage all student examination results
      </p>

      {/* Filters */}
      <div className="filter-row">

        <div className="status-tabs">
          {["ALL", "Pass", "Fail"].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`tab-btn ${statusFilter === f ? "active-tab" : ""}`}
            >
              {f === "ALL" ? "All Students" : f === "Pass" ? "Passed" : "Failed"}
            </button>
          ))}
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="class-filter"
        >
          {classes.map(c => (
            <option key={c} value={c}>
              {c === "ALL" ? "All Classes" : `Class ${c}`}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {["Roll No.", "Student Name", "Class", "Total", "Obtained", "Percentage", "Grade", "Status", "Actions"]
                .map((h) => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => {
              const isEditing = editRoll === s.roll;
              return (
                <tr key={s.roll}>
                  <td>{s.roll}</td>

                  <td>
                    {isEditing
                      ? <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                      : s.name}
                  </td>

                  <td>
                    {isEditing
                      ? <input value={editData.class} onChange={(e) => setEditData({ ...editData, class: e.target.value })} />
                      : s.class}
                  </td>

                  <td>{s.total}</td>

                  <td>
                    {isEditing
                      ? <input value={editData.obtained} onChange={(e) => setEditData({ ...editData, obtained: e.target.value })} />
                      : s.obtained}
                  </td>

                  <td>{s.percentage}%</td>

                  <td>
                    {isEditing
                      ? (
                        <select value={editData.grade}
                          onChange={(e) => setEditData({ ...editData, grade: e.target.value })}>
                          {["A+", "A", "B+", "B", "C", "D", "F"].map((g) =>
                            <option key={g}>{g}</option>
                          )}
                        </select>
                      )
                      : s.grade}
                  </td>

                  <td>
                    <span className={s.status === "Pass" ? "status-pass" : "status-fail"}>
                      {s.status}
                    </span>
                  </td>

                  <td>
                    {isEditing ? (
                      <>
                        <button className="save-btn" onClick={() => handleSave(s.roll)}>Save</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}