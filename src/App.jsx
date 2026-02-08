import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Landing from "./Components/Pages/Landing";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Dashboard from "./Components/Pages/Dashboard";
import Students from "./Components/Pages/Students";
// import Results from "./Components/Pages/Results";
import Courses from "./Components/Pages/Courses";
import AddCourse from "./Components/Pages/AddCourse";
import EditCourse from "./Components/Pages/EditCourse";
import Attendance from "./Components/Pages/Attendance";
import Profile from "./Components/Pages/Profile";
import ProtectedResults from "./Components/Protected/ProtectedResults";


function App() {
  const [courses, setCourses] = useState([
    { code: "C101", name: "English", className: "10", teacher: "Mr. Sharma" },
    { code: "C102", name: "Nepali", className: "10", teacher: "Mrs. Koirala" },
    { code: "C103", name: "Science", className: "10", teacher: "Mr. Thapa" },
    { code: "C104", name: "Social", className: "10", teacher: "Ms. Shrestha" },
    { code: "C105", name: "Mathematics", className: "10", teacher: "Mr. Sharma" },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/attendance" element={<Attendance />} />
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/profile" element={<Profile />} />

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
         {/* ✅ Protected Results route */}
        <Route path="/results" element={<ProtectedResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;