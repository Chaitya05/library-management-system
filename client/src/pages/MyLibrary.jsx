import React, { useEffect, useState } from "react";
import axios from "axios";

function MyLibrary() {
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/borrowed_books/1") // static user ID = 1
      .then((res) => setBorrowed(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Library</h2>
      {borrowed.map((b) => {
        const progress = (b.pages_read / b.total_pages) * 100;

        return (
          <div
            key={b.id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>{b.title}</h3>
            <p>Author: {b.author}</p>
            <p>
              Pages Read: {b.pages_read} / {b.total_pages}
            </p>
            <div
              style={{
                background: "#eee",
                borderRadius: "5px",
                overflow: "hidden",
                height: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  background: progress >= 100 ? "green" : "#007bff",
                  height: "10px",
                }}
              />
            </div>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              {progress.toFixed(1)}% completed
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default MyLibrary;
