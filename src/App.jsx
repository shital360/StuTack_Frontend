import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// PUBLIC
import Landing from "./Components/Pages/Landing";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";

// ADMIN
import AdminLayout from "./Components/Layout/AdminLayout";
import Dashboard from "./Components/Pages/Dashboard";
import Students from "./Components/Pages/Students";
import Courses from "./Components/Pages/Courses";
import AddCourse from "./Components/Pages/AddCourse";
import EditCourse from "./Components/Pages/EditCourse";
import Attendance from "./Components/Pages/Attendance";
import Profile from "./Components/Pages/Profile";
import Results from "./Components/Pages/Results";

// STUDENT
import StudentLayout from "./Components/Layout/StudentLayout";
import ProtectedStudent from "./Components/Protected/ProtectedStudent";
import StudentDashboard from "./Components/Pages/Student/Dashboard";
import MyResults from "./Components/Pages/Student/MyResults";
import MyAttendance from "./Components/Pages/Student/MyAttendance";
import MyCourses from "./Components/Pages/Student/MyCourses";
import StudentProfile from "./Components/Pages/Student/Profile";

function App() {
  const [courses, setCourses] = useState([
    { code: "C101", name: "English", teacher: "Mr. Sharma" },
    { code: "C102", name: "Nepali", teacher: "Mrs. Koirala" },
    { code: "C103", name: "Science", teacher: "Mr. Thapa" },
    { code: "C104", name: "Social", teacher: "Ms. Shrestha" },
    { code: "C105", name: "Mathematics", teacher: "Mr. Sharma" },
  ]);

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
          <Route path="results" element={<Results />} />

          <Route
            path="courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />
          <Route
            path="courses/add"
            element={<AddCourse courses={courses} setCourses={setCourses} />}
          />
          <Route
            path="courses/edit/:code"
            element={<EditCourse courses={courses} setCourses={setCourses} />}
          />
        </Route>

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedStudent>
              <StudentLayout />
            </ProtectedStudent>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="results" element={<MyResults />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;