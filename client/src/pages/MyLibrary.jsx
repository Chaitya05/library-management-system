import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MyLibrary() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    axios
      .get(`http://localhost:5000/api/books/borrowed_books/${user.user_id}`)
      .then((res) => setBorrowedBooks(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleReturn = async (book_id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/books/return", {
        user_id: user.user_id,
        book_id,
      });
      toast.success(res.data.message || "Book returned successfully!");
      setBorrowedBooks(borrowedBooks.filter((b) => b.book_id !== book_id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to return book");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Library</h2>
      {borrowedBooks.length === 0 ? (
        <p>No borrowed books yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {borrowedBooks.map((book) => (
            <li
              key={book.book_id}
              style={{
                marginBottom: 12,
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <b>{book.title}</b> <br />
                <small>by {book.author}</small>
              </div>
              <button
                onClick={() => handleReturn(book.book_id)}
                style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyLibrary;
