import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Library from "./components/Library";
import MyLibrary from "./components/Mylibrary";
import BookOfTheDay from "./components/BookOfTheDay";
import AuthorOfTheDay from "./components/AuthorOfTheDay";
import Membership from "./components/Membership";
import "./App.css";
function App() {
  const [user, setUser] = useState({ id: 1, username: "Alice" });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Hi {user.username}</h1>

      {/* Top navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Library</Link>
        <Link to="/my-library" style={{ marginRight: "15px" }}>My Library</Link>
        <Link to="/book-of-the-day" style={{ marginRight: "15px" }}>Book of the Day</Link>
        <Link to="/author-of-the-day" style={{ marginRight: "15px" }}>Author of the Day</Link>
        <Link to="/membership" style={{ marginRight: "15px" }}>Membership</Link>
        <Link to="/sign-out" style={{ color: "red" }}>Sign Out</Link>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/my-library" element={<MyLibrary userId={user.id} />} />
        <Route path="/book-of-the-day" element={<BookOfTheDay />} />
        <Route path="/author-of-the-day" element={<AuthorOfTheDay />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/sign-out" element={<h2>Signed Out</h2>} />
      </Routes>
    </div>
  );
}

export default App;
