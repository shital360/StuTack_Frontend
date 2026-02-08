import { Navigate } from "react-router-dom";
import Results from "../Pages/Results";

export default function ProtectedResults() {
  const role = localStorage.getItem("role");

  // If not logged in, redirect
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return <Results />;
}
