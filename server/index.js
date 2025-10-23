// server/index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- MySQL connection ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database:", process.env.DB_NAME);
  }
});

// --- ROUTES ---

// Test route
app.get("/", (req, res) => {
  res.send("Library Management System Backend Running");
});

// 1️⃣ Get borrowed books by user ID
app.get("/api/borrowed_books/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT bb.id, b.title, b.author, bb.pages_read, b.total_pages, bb.date_borrowed, bb.date_to_return
    FROM borrowed_books bb
    JOIN books b ON bb.book_id = b.id
    WHERE bb.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2️⃣ Get all books in library
app.get("/api/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3️⃣ Book of the day (random)
app.get("/api/book_of_the_day", (req, res) => {
  const query = "SELECT * FROM books ORDER BY RAND() LIMIT 1";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// 4️⃣ Author of the day (random)
app.get("/api/author_of_the_day", (req, res) => {
  const query = "SELECT DISTINCT author FROM books ORDER BY RAND() LIMIT 1";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// 5️⃣ Get all users
app.get("/api/users", (req, res) => {
  const query = "SELECT id, username, role FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 6️⃣ User login simulation
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT id, username, role FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
    res.json(results[0]);
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
