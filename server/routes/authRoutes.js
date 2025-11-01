// server/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // Use .env later

// ✅ SIGNUP + Auto Login
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("🟢 Signup attempt:", { name, email });

  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Please fill all fields" });

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        console.error("❌ DB SELECT error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      if (result.length > 0)
        return res.status(400).json({ success: false, message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err2, result2) => {
          if (err2) {
            console.error("❌ DB INSERT error:", err2);
            return res.status(500).json({ success: false, message: "Signup failed" });
          }

          // Auto login token creation
          const user_id = result2.insertId;
          const token = jwt.sign({ user_id, email }, JWT_SECRET, { expiresIn: "2h" });

          console.log("✅ User registered & auto-logged in:", email);

          res.status(201).json({
            success: true,
            message: "User registered and logged in",
            token,
            user: { user_id, name, email },
          });
        }
      );
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});



// ✅ SIGNIN
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log("🟢 Signin attempt:", { email });

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Please fill all fields" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("❌ DB SELECT error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    console.log("✅ Login successful:", user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

export default router;
