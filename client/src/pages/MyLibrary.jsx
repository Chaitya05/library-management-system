import React, { useEffect, useState } from "react";
import axios from "axios";

function MyLibrary() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        // demo: assuming user_id = 1
        const response = await axios.get("http://localhost:5000/borrowed_books/1");
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        📚 My Borrowed Books
      </h2>

      {borrowedBooks.length === 0 ? (
        <p className="text-center text-gray-600">No borrowed books yet!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {borrowedBooks.map((book) => (
            <div
              key={book.borrow_id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-1">
                {book.title}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Borrowed:</span>{" "}
                {book.date_borrowed}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Return by:</span>{" "}
                {book.date_to_return}
              </p>

              {/* progress bar */}
              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                    book.progress >= 100
                      ? "bg-green-500"
                      : book.progress >= 70
                      ? "bg-blue-500"
                      : "bg-yellow-400"
                  }`}
                  style={{ width: `${book.progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Progress</span>
                <span>{book.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
