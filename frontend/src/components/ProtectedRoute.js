import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚪 Not logged in
  if (!token || !user) {
    alert("You must log in first!");
    return <Navigate to="/login" />;
  }

  // 🚫 Role mismatch (e.g., renter trying to access owner-only route)
  if (role && user.role !== role) {
    alert("Access denied! You don’t have permission for this page.");
    return <Navigate to="/" />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
