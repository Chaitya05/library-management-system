import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Library() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/books/borrowed_books/${user.user_id}`)
        .then((res) => setBorrowedBooks(res.data.map((b) => b.book_id)))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleBorrow = async (book_id) => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    if (borrowedBooks.includes(book_id)) {
      toast.warning("You already borrowed this book!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/books/borrow", {
        user_id: user.user_id,
        book_id,
      });
      toast.success(res.data.message || "Book borrowed successfully!");
      setBorrowedBooks([...borrowedBooks, book_id]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to borrow book");
    }
  };

  // Map titles to their cover images
  const coverImages = {
    "Atomic Habits": "/images/covers/atomic_habits.jpg",
    "The Alchemist": "/images/covers/the_alchemist.jpg",
    "Ikigai": "/images/covers/ikigai.jpg",
    "Wings of Fire": "/images/covers/wings_of_fire.jpg",
    "Rich Dad Poor Dad": "/images/covers/rich_dad_poor_dad.jpg",
    "The Psychology of Money": "/images/covers/psychology_of_money.jpg",
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Library</h2>
      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {books.map((book) => (
            <div
              key={book.book_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 12,
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              {/* Book cover */}
              <img
                src={coverImages[book.title] || "/images/covers/default.jpg"}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
              <h4>{book.title}</h4>
              <p><b>Author:</b> {book.author}</p>

              <button
                onClick={() => handleBorrow(book.book_id)}
                disabled={borrowedBooks.includes(book.book_id)}
                style={{
                  background: borrowedBooks.includes(book.book_id)
                    ? "#999"
                    : "#2ecc71",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 4,
                  cursor: borrowedBooks.includes(book.book_id)
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {borrowedBooks.includes(book.book_id)
                  ? "Already Borrowed"
                  : "Borrow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
