import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// 🔑 JWT secret (you can move this to .env)
const JWT_SECRET = "your_jwt_secret";

// 🟩 SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { name, email, password, membership_type } = req.body;
  console.log("🟢 Signup attempt:", { name, email });

  try {
    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        console.error("❌ DB SELECT error:", err);
        return res.status(500).json({ message: "Database error (SELECT)" });
      }

      if (result.length > 0)
        return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const sql = `
        INSERT INTO users (name, email, password, membership_type, join_date)
        VALUES (?, ?, ?, ?, NOW())
      `;
      const values = [name, email, hashedPassword, membership_type || "Basic"];

      db.query(sql, values, (err2, result2) => {
        if (err2) {
          console.error("❌ DB INSERT error:", err2);
          return res.status(500).json({ message: "Database error (INSERT)" });
        }

        console.log("✅ User registered:", result2);
        return res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    console.error("❌ Signup catch error:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🟦 SIGNIN ROUTE
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("❌ DB SELECT error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        membership_type: user.membership_type,
      },
    });
  });
});

export default router;
