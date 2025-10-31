import React from "react";
import { Routes, Route, Link } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Hi {user ? user.name || "Reader" : "Guest"}</h1>

      <nav
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Always visible links */}
        <Link to="/">Library</Link>
        <Link to="/book-of-the-day">Book of the Day</Link>
        <Link to="/author-of-the-day">Author of the Day</Link>

        {/* Visible only after login */}
        {user && (
          <>
            <Link to="/my-library">My Library</Link>
            <Link to="/membership">Membership</Link>
          </>
        )}

        {/* Auth Links */}
        {!user ? (
          <>
            <Link to="/signin" style={{ color: "green" }}>
              Sign In
            </Link>
            <Link to="/signup" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            style={{
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

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
