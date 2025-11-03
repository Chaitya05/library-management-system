import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookOfTheDay() {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books/bookOfTheDay")
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error("BookOfTheDay error:", err);
        setError("Could not fetch book of the day.");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Loading Book of the Day...</p>;

  return (
    <div>
      <h2>📘 Book of the Day</h2>
      <p>
        <strong>{book.title}</strong> by <em>{book.author}</em> ({book.total_pages} pages)
      </p>
    </div>
  );
}
