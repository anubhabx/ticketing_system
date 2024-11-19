/* eslint-disable react/prop-types */
// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If there is a token, render the protected component
  return children;
};

export default PrivateRoute;
