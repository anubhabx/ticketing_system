// src/components/Navigation.js
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav>
      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/login" className={isActive("/login")}>
              Login
            </Link>
            <Link to="/register" className={isActive("/register")}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
