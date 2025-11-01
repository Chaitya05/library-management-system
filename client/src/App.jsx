// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

// Pages & Components
import Library from "./pages/Library";
import MyLibrary from "./pages/MyLibrary";
import Membership from "./pages/Membership";
import BookOfTheDay from "./components/BookOfTheDay";
import AuthorOfTheDay from "./components/AuthorOfTheDay";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Handle logout
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Hi {user ? user.name || "Reader" : "Guest"}</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Library</Link>
        <Link to="/book-of-the-day" style={{ marginRight: "10px" }}>Book of the Day</Link>
        <Link to="/author-of-the-day" style={{ marginRight: "10px" }}>Author of the Day</Link>

        {/* Protected links visible only after login */}
        {user && (
          <>
            <Link to="/my-library" style={{ marginRight: "10px" }}>My Library</Link>
            <Link to="/membership" style={{ marginRight: "10px" }}>Membership</Link>
          </>
        )}

        {/* Auth links */}
        {!user ? (
          <>
            <Link to="/signin" style={{ marginRight: "10px", color: "green" }}>Sign In</Link>
            <Link to="/signup" style={{ color: "blue" }}>Sign Up</Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            style={{
              color: "white",
              backgroundColor: "red",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        )}
      </nav>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Library />} />
        <Route path="/book-of-the-day" element={<BookOfTheDay />} />
        <Route path="/author-of-the-day" element={<AuthorOfTheDay />} />

        {/* Auth routes */}
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />

        {/* Protected routes */}
        <Route
          path="/my-library"
          element={
            <ProtectedRoute>
              <MyLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />

        <Route path="/sign-out" element={<h2>Signed Out</h2>} />
      </Routes>
    </div>
  );
}

export default App;
