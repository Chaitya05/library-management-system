import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Library</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} by {b.author} ({b.total_pages} pages)</li>
        ))}
      </ul>
    </div>
  );
}
