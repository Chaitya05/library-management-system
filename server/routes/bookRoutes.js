import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ✅ Get all books
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// ✅ Borrow a book (prevent duplicate borrow)
router.post("/borrow", (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id)
    return res.status(400).json({ message: "Missing data" });

  db.query(
    "SELECT * FROM borrowed_books WHERE user_id = ? AND book_id = ?",
    [user_id, book_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "You already borrowed this book!" });
      }

      // ✅ Fixed column names according to your database
      db.query(
        `INSERT INTO borrowed_books 
         (user_id, book_id, date_borrowed, date_to_return, progress, returned)
         VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), 0, 0)`,
        [user_id, book_id],
        (err2) => {
          if (err2) {
            console.error("Borrow Error:", err2);
            return res.status(500).json({ message: "Database error" });
          }
          res.json({ success: true, message: "Book borrowed successfully!" });
        }
      );
    }
  );
});

// ✅ Return a book
router.post("/return", (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id)
    return res.status(400).json({ message: "Missing data" });

  db.query(
    "DELETE FROM borrowed_books WHERE user_id = ? AND book_id = ?",
    [user_id, book_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "You haven't borrowed this book." });
      }

      res.json({ success: true, message: "Book returned successfully!" });
    }
  );
});

// ✅ Get borrowed books for a user
router.get("/borrowed_books/:user_id", (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT b.book_id, b.title, b.author 
     FROM borrowed_books bb 
     JOIN books b ON bb.book_id = b.book_id 
     WHERE bb.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
});

// ✅ Get random "Book of the Day"
router.get("/bookOfTheDay", (req, res) => {
  db.query("SELECT * FROM books ORDER BY RAND() LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "No books found" });
    res.json(results[0]);
  });
});

// ✅ Get random "Author of the Day"
router.get("/authorOfTheDay", (req, res) => {
  db.query(
    "SELECT DISTINCT author FROM books ORDER BY RAND() LIMIT 1",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "No authors found" });
      res.json({ author: results[0].author });
    }
  );
});

export default router;
