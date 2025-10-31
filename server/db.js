import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // default for XAMPP
  password: "",        // leave empty unless you set one
  database: "library_db", // your DB name
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");
  }
});

export default db;
