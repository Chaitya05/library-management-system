import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ user }) => {
  const [bookOfTheDay, setBookOfTheDay] = useState(null);
  const [authorOfTheDay, setAuthorOfTheDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, authorRes] = await Promise.all([
          axios.get("http://localhost:5000/api/books/bookOfTheDay"),
          axios.get("http://localhost:5000/api/books/authorOfTheDay"),
        ]);
        setBookOfTheDay(bookRes.data);
        setAuthorOfTheDay(authorRes.data);
      } catch (err) {
        console.error("Error fetching daily content:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", textAlign: "center" }}>
      <h2>Welcome{user ? `, ${user.name}` : ""} 👋</h2>
      <p>Your personalized digital library awaits.</p>

      {/* --- Book of the Day --- */}
      <section style={{ marginTop: 40 }}>
        <h3>📚 Book of the Day</h3>
        {bookOfTheDay ? (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 20,
              marginTop: 12,
            }}
          >
            <h4>{bookOfTheDay.title}</h4>
            <p><strong>Author:</strong> {bookOfTheDay.author}</p>
            <p><strong>Genre:</strong> {bookOfTheDay.genre}</p>
            <p>{bookOfTheDay.description}</p>
          </div>
        ) : (
          <p>Loading Book of the Day...</p>
        )}
      </section>

      {/* --- Author of the Day --- */}
      <section style={{ marginTop: 40 }}>
        <h3>✍️ Author of the Day</h3>
        {authorOfTheDay ? (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 20,
              marginTop: 12,
            }}
          >
            <h4>{authorOfTheDay.author}</h4>
          </div>
        ) : (
          <p>Loading Author of the Day...</p>
        )}
      </section>
    </div>
  );
};

export default Home;
