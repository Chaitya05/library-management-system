import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AuthorOfTheDay() {
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books/authorOfTheDay")
      .then((res) => setAuthor(res.data.author))
      .catch((err) => {
        console.error("AuthorOfTheDay error:", err);
        setError("Could not fetch author of the day.");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!author) return <p>Loading Author of the Day...</p>;

  return (
    <div>
      <h2>✍️ Author of the Day</h2>
      <p>{author}</p>
    </div>
  );
}
