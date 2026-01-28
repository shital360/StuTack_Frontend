import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Landing from "./Components/Pages/Landing";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Dashboard from "./Components/Pages/Dashboard";
import Students from "./Components/Pages/Students";
import Results from "./Components/Pages/Results";
import Courses from "./Components/Pages/Courses";
import AddCourse from "./Components/Pages/AddCourse";
import EditCourse from "./Components/Pages/EditCourse";
import CourseDetails from "./Components/Pages/CourseDetails";
import Attendance from "./Components/Pages/Attendance";  // ✅ YO LINE ADD GARNUS

function App() {
  // 🔹 COURSES STATE HERE
  const [courses, setCourses] = useState([
    {
      code: "C101",
      name: "Mathematics",
      className: "10",
      credit: 5,
      teacher: "Mr. Sharma",
      status: "Active",
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/attendance" element={<Attendance />} />  {/* ✅ YO ROUTE ADD GARNUS */}
        <Route path="/results" element={<Results />} />

        {/* 🔹 COURSES ROUTES WITH PROPS */}
        <Route
          path="/courses"
          element={<Courses courses={courses} setCourses={setCourses} />}
        />
        <Route
          path="/courses/add"
          element={<AddCourse courses={courses} setCourses={setCourses} />}
        />
        <Route
          path="/courses/edit/:code"
          element={<EditCourse courses={courses} setCourses={setCourses} />}
        />
        <Route
          path="/courses/details/:code"
          element={<CourseDetails courses={courses} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;