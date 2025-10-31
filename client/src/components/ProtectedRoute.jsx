import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If user not found, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;
