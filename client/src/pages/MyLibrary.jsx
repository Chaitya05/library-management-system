import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyLibrary({ userId }) {
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/borrowed_books/${userId}`)
      .then((res) => setBorrowed(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div>
      <h2>My Library</h2>
      {borrowed.length === 0 ? <p>No borrowed books</p> :
        borrowed.map((b) => {
          const progress = (b.pages_read / b.total_pages) * 100;

          return (
            <div key={b.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
              <h3>{b.title}</h3>
              <p>Author: {b.author}</p>
              <p>Borrowed: {new Date(b.date_borrowed).toLocaleDateString()} | Return: {new Date(b.date_to_return).toLocaleDateString()}</p>
              <div style={{ background: "#eee", borderRadius: "5px", overflow: "hidden", height: "10px" }}>
                <div style={{ width: `${progress}%`, background: progress >= 100 ? "green" : "#007bff", height: "10px" }} />
              </div>
              <p style={{ fontSize: "0.9em", color: "#555" }}>{progress.toFixed(1)}% completed</p>
            </div>
          );
        })
      }
    </div>
  );
}
