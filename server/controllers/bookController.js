import db from "../db.js";

// Get all books
export const getAllBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, rows) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(rows);
  });
};

// Book of the day (random)
export const getBookOfTheDay = (req, res) => {
  db.query("SELECT * FROM books ORDER BY RAND() LIMIT 1", (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows[0] || null);
  });
};

// Author of the day (random author)
export const getAuthorOfTheDay = (req, res) => {
  db.query("SELECT DISTINCT author FROM books ORDER BY RAND() LIMIT 1", (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows[0] || null);
  });
};

// Borrow a book
export const borrowBook = (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) return res.status(400).json({ message: "Missing user_id or book_id" });

  const checkSql = "SELECT * FROM borrowed_books WHERE user_id = ? AND book_id = ? AND status = 'Borrowed'";
  db.query(checkSql, [user_id, book_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) return res.status(400).json({ message: "Book already borrowed" });

    const borrowedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowedDate.getDate() + 14);

    const insertSql = "INSERT INTO borrowed_books (user_id, book_id, borrow_date, due_date, status) VALUES (?, ?, ?, ?, 'Borrowed')";
    db.query(insertSql, [user_id, book_id, borrowedDate, dueDate], (err2) => {
      if (err2) {
        console.error("Error inserting borrow:", err2);
        return res.status(500).json({ message: "Failed to borrow book" });
      }
      res.json({ message: "Book borrowed successfully" });
    });
  });
};

// Return a book
export const returnBook = (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) return res.status(400).json({ message: "Missing user_id or book_id" });

  const sql = "UPDATE borrowed_books SET status = 'Returned', return_date = NOW() WHERE user_id = ? AND book_id = ? AND status = 'Borrowed'";
  db.query(sql, [user_id, book_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) return res.status(400).json({ message: "Book not found or already returned" });
    res.json({ message: "Book returned successfully" });
  });
};

// Get borrowed books for a user (only active borrowed)
export const getBorrowedBooksByUser = (req, res) => {
  const { user_id } = req.params;
  const sql = `
    SELECT b.book_id, b.title, b.author, b.genre, bb.borrow_date, bb.due_date, bb.progress
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.book_id
    WHERE bb.user_id = ? AND bb.status = 'Borrowed'
  `;
  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
};
