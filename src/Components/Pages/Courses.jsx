import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
} from "lucide-react";

export default function Courses() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      class: "Computer Science",
      teacher: "Dr. Sarah Johnson",
      schedule: "Mon, Wed, Fri 10:00–11:00 AM",
      enrolled: "28/30",
      semester: "Spring 2026",
      full: false,
    },
    {
      code: "MATH201",
      name: "Calculus II",
      class: "Mathematics",
      teacher: "Prof. Michael Chen",
      schedule: "Tue, Thu 1:00–3:00 PM",
      enrolled: "22/35",
      semester: "Spring 2026",
      full: false,
    },
    {
      code: "ENG150",
      name: "Academic Writing",
      class: "English",
      teacher: "Dr. Emily Brown",
      schedule: "Mon, Wed, Fri 2:00–3:00 PM",
      enrolled: "25/25",
      semester: "Spring 2026",
      full: true,
    },
    {
      code: "PHYS101",
      name: "Physics I",
      class: "Physics",
      teacher: "Prof. David Lee",
      schedule: "Tue, Thu 9:00–11:00 AM",
      enrolled: "35/40",
      semester: "Spring 2026",
      full: false,
    },
  ];

  // Filter Logic
  const filteredCourses = selectedCourse
    ? courses.filter((c) => c.code === selectedCourse)
    : courses;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-600 text-white">
          <GraduationCap />
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            Student Information Management System
          </h1>
          <p className="text-sm text-gray-500">
            Manage courses and enrollments
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow p-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Dropdown */}
          <div className="w-72">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {courses.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Course Button */}
          <button
            onClick={() => navigate("/courses/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700"
          >
            <Plus size={16} /> Add Course
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Code</th>
                <th>Name</th>
                <th>Class</th>
                <th>Teacher</th>
                <th>Schedule</th>
                <th>Enrolled</th>
                <th>Semester</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((c) => (
                <tr
                  key={c.code}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="py-3 font-medium">{c.code}</td>
                  <td>{c.name}</td>
                  <td>{c.class}</td>
                  <td>{c.teacher}</td>
                  <td>{c.schedule}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.full
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-900 text-white"
                      }`}
                    >
                      {c.enrolled}
                    </span>
                  </td>
                  <td>{c.semester}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-gray-600 hover:text-blue-600">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
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
