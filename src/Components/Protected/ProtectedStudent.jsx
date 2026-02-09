// src/Components/Protected/ProtectedStudent.jsx
import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedStudent({ children }) {
  const role = localStorage.getItem("role"); // get role from localStorage

  // If not logged in, redirect to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not a student, redirect to unauthorized page or home
  if (role !== "student") {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything is fine, render the child component
  return children;
}
