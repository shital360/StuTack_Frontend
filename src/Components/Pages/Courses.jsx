import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, GraduationCap, Check, X } from "lucide-react";

export default function Courses({ courses = [], setCourses = () => {} }) {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editingCode, setEditingCode] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredCourses = selectedCourse
    ? courses.filter((c) => c.code === selectedCourse)
    : courses;

  const handleEditClick = (c) => {
    setEditingCode(c.code);
    setEditForm({ ...c });
  };

  const handleSave = () => {
    setCourses(courses.map(c => c.code === editingCode ? { ...editForm } : c));
    setEditingCode(null);
  };

  const handleCancel = () => {
    setEditingCode(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center gap-3 mb-6" style={{ padding: "20px 0" }}>
        <div className="p-2 rounded-xl bg-blue-600 text-white">
          <GraduationCap size={32} />
        </div>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Student Information Management System</h1>
          <p className="text-sm text-gray-500" style={{ marginTop: "6px" }}>Manage courses and enrollments</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-72">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {courses.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("/admin/courses/add")} // ✅ FIXED
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700"
          >
            <Plus size={16} /> Add Course
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Code</th>
                <th>Name</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((c) => (
                <tr key={c.code} className="border-b last:border-none hover:bg-gray-50">
                  {editingCode === c.code ? (
                    <>
                      <td className="py-3">
                        <input
                          value={editForm.code}
                          onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                          style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "4px 8px", width: "80px" }}
                        />
                      </td>
                      <td>
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "4px 8px", width: "150px" }}
                        />
                      </td>
                      <td>
                        <input
                          value={editForm.teacher}
                          onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
                          style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "4px 8px", width: "150px" }}
                        />
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={handleSave}
                            style={{ background: "#22c55e", color: "white", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Check size={14} /> Save
                          </button>
                          <button
                            onClick={handleCancel}
                            style={{ background: "#6b7280", color: "white", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                            <X size={14} /> Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 font-medium">{c.code}</td>
                      <td>{c.name}</td>
                      <td>{c.teacher}</td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "8px" }}>
                          <button
                            onClick={() => handleEditClick(c)}
                            style={{ background: "#2563eb", color: "white", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button
                            onClick={() => setCourses(courses.filter(co => co.code !== c.code))}
                            style={{ background: "#ef4444", color: "white", padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No course found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}