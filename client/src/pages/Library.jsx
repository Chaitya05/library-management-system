import React, { useEffect, useState } from "react";
import axios from "axios";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Library</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} by {b.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
