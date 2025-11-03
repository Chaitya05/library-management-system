import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";



const router = express.Router();

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const [existingUser] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert new user — default membership_type and join_date
    const [result] = await db.promise().query(
      "INSERT INTO users (name, email, password, membership_type, join_date) VALUES (?, ?, ?, ?, NOW())",
      [name, email, hashedPassword, "standard"]
    );

    // 5️⃣ Generate JWT
    const token = jwt.sign({ id: result.insertId, email }, "secretkey", { expiresIn: "1d" });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { user_id: result.insertId, name, email, membership_type: "standard" },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// -------------------- SIGNIN --------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, email: user.email },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        membership_type: user.membership_type,
      },
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
