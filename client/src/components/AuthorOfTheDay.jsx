import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AuthorOfTheDay() {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/authorOfTheDay")
      .then(res => setAuthor(res.data.author))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Author of the Day</h2>
      <p>{author}</p>
    </div>
  );
}
