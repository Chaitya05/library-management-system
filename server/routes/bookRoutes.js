import express from "express";
const router = express.Router();

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", available: true },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", available: false }
];

router.get("/", (req, res) => res.json(books));

export default router;
