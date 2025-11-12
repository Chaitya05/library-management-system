import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./MyLibrary.css";

function MyLibrary() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("title");
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

  const handleReturn = async (book_id, title) => {
    if (!window.confirm(`Return "${title}"?`)) return;

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

  // Helper: Generate local cover image path from title
  const getCoverImage = (title) => {
    const formatted = title
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll("'", "")
      .replaceAll(":", "");
    return `/images/covers/${formatted}.jpg`;
  };

  const filteredBooks =
    filter === "all"
      ? borrowedBooks
      : borrowedBooks.filter((b) => b.category === filter);

  const sortedBooks = [...filteredBooks].sort((a, b) =>
    sort === "title"
      ? a.title.localeCompare(b.title)
      : new Date(a.borrow_date) - new Date(b.borrow_date)
  );

  return (
    <div className="mylibrary-container">
      <h2>📚 My Library</h2>

      <div className="mylibrary-controls">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="History">History</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Borrow Date</option>
        </select>
      </div>

      {sortedBooks.length === 0 ? (
        <p className="empty-msg">No borrowed books yet.</p>
      ) : (
        <div className="book-grid">
          {sortedBooks.map((book) => (
            <div key={book.book_id} className="book-card">
              <img
                src={getCoverImage(book.title)}
                alt={book.title}
                className="book-cover"
                onError={(e) => (e.target.src = "/default-book.png")} // fallback
              />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
                {book.category && (
                  <p className="category">Category: {book.category}</p>
                )}
                {book.borrow_date && (
                  <p className="date">
                    Borrowed:{" "}
                    {new Date(book.borrow_date).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={() => handleReturn(book.book_id, book.title)}
                  className="return-btn"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
