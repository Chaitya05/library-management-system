import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookOfTheDay() {
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/book_of_the_day")
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>Book of the Day</h2>
      <p>{book.title} by {book.author} ({book.total_pages} pages)</p>
    </div>
  );
}
