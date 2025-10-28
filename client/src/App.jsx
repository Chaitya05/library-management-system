import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// ✅ Corrected imports
import Library from "./pages/Library";
import MyLibrary from "./pages/MyLibrary";
import Membership from "./pages/Membership";
import BookOfTheDay from "./components/BookOfTheDay";
import AuthorOfTheDay from "./components/AuthorOfTheDay";

function App() {
  const username = "user1";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Hi {username}</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Library</Link>
        <Link to="/my-library" style={{ marginRight: "10px" }}>My Library</Link>
        <Link to="/book-of-the-day" style={{ marginRight: "10px" }}>Book of the Day</Link>
        <Link to="/author-of-the-day" style={{ marginRight: "10px" }}>Author of the Day</Link>
        <Link to="/membership" style={{ marginRight: "10px" }}>Membership</Link>
        <Link to="/sign-out" style={{ color: "red" }}>Sign Out</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/book-of-the-day" element={<BookOfTheDay />} />
        <Route path="/author-of-the-day" element={<AuthorOfTheDay />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/sign-out" element={<h2>Signed Out</h2>} />
      </Routes>
    </div>
  );
}

export default App;
