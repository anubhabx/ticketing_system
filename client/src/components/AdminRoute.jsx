/* eslint-disable react/prop-types */
// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { checkAdmin } from "../utils/checkAdmin";

const AdminRoute = ({ children }) => {
  if (!checkAdmin()) {
    return (
      <div className="admin-restricted">
        <div className="icon">🔒</div>
        <h2>Admin Access Required</h2>
        <p>You need administrator privileges to access this section.</p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  return <div className="admin-section">{children}</div>;
};

export default AdminRoute;
