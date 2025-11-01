import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // ✅ centralized DB connection
import authRoutes from "./routes/authRoutes.js"; // ✅ import auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Base route for quick check
app.get("/", (req, res) => {
  res.send("📚 Library Management System API is running...");
});

// ✅ AUTH ROUTES
app.use("/api/users", authRoutes);

// ✅ BOOK ROUTES

// Get all books
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching books" });
    res.json(result);
  });
});

// Get borrowed books for a specific user
app.get("/borrowed_books/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = `
    SELECT 
      b.title, 
      b.author, 
      bb.progress
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.book_id
    WHERE bb.user_id = ?;
  `;
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("❌ Error fetching borrowed books:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(result);
  });
});

// Get random "Book of the Day"
app.get("/book_of_the_day", (req, res) => {
  db.query("SELECT * FROM books ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching book of the day" });
    res.json(result[0]);
  });
});

// Get random "Author of the Day"
app.get("/author_of_the_day", (req, res) => {
  db.query("SELECT DISTINCT author FROM books ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching author of the day" });
    res.json(result[0]);
  });
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Connected to MySQL (library_db)`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
