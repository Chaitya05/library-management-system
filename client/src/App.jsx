import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Hi {user ? user.name : "Guest"}</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: 10 }}>Library</Link>
        <Link to="/book-of-the-day" style={{ marginRight: 10 }}>Book of the Day</Link>
        <Link to="/author-of-the-day" style={{ marginRight: 10 }}>Author of the Day</Link>
        {user && <Link to="/my-library" style={{ marginRight: 10 }}>My Library</Link>}
        {user && <Link to="/membership" style={{ marginRight: 10 }}>Membership</Link>}

        {!user ? (
          <>
            <Link to="/signin" style={{ marginRight: 10, color: "green" }}>Sign In</Link>
            <Link to="/signup" style={{ color: "blue" }}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleSignOut} style={{ marginLeft: 10, background: "red", color: "white" }}>
            Sign Out
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/book-of-the-day" element={<BookOfTheDay />} />
        <Route path="/author-of-the-day" element={<AuthorOfTheDay />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/my-library" element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />
        <Route path="/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
