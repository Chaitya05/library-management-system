import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"; // <-- new CSS file for navbar, spacing, etc.

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

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="navbar">
        <h1 className="navbar-title">📚 Library Management System</h1>
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Library</Link>
          <Link to="/book-of-the-day" className="nav-link">Book of the Day</Link>
          <Link to="/author-of-the-day" className="nav-link">Author of the Day</Link>

          {user && (
            <>
              <Link to="/my-library" className="nav-link">My Library</Link>
              <Link to="/membership" className="nav-link">Membership</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/signin" className="btn btn-signin">Sign In</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </>
          ) : (
            <div className="user-section">
              <span className="welcome-text">Hi, {user.name} 👋</span>
              <button onClick={handleSignOut} className="btn btn-signout">
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/book-of-the-day" element={<BookOfTheDay />} />
          <Route path="/author-of-the-day" element={<AuthorOfTheDay />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
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
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Library Management System. All Rights Reserved.
      </footer>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
