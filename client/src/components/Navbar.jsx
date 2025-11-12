import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          📚 Library Management
        </Link>
        {user && (
          <span className="navbar-greeting">Hi, {user.name || user.username || "User"}</span>

        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/mylibrary" className="navbar-link">
              My Library
            </Link>
            <Link to="/membership" className="navbar-link">
              Membership
            </Link>
            <button onClick={handleLogout} className="signout-btn">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="navbar-link auth">
              Sign In
            </Link>
            <Link to="/signup" className="navbar-link auth">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
