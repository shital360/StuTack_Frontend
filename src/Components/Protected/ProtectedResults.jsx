import { Navigate } from "react-router-dom";

export default function ProtectedStudent({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
