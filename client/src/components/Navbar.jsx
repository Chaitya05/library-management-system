import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
          Library Management
        </Link>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        {user ? (
          <>
            <Link to="/mylibrary" style={{ color: "white", textDecoration: "none" }}>
              My Library
            </Link>
            <Link to="/membership" style={{ color: "white", textDecoration: "none" }}>
              Membership
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ color: "white", textDecoration: "none" }}>
              Sign In
            </Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
