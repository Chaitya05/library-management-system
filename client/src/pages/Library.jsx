import React, { useEffect, useState } from "react";
import axios from "axios";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">Library Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.book_id} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-500">Genre: {book.genre}</p>
            <p className="text-gray-500">Published: {book.published_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
