import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    (username === "user1" && password === "123456") ||
    (username === "author1" && password === "123456")
  ) {
    return res.json({ success: true, role: username === "user1" ? "user" : "author", username });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
