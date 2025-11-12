import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = ({ user, onSignOut }) => {
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

  // Helper to match book cover filename
  const getCoverImage = (title) => {
    if (!title) return "/images/covers/default.jpg";
    const formatted = title
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll("'", "")
      .replaceAll(":", "");
    return `/images/covers/${formatted}.jpg`;
  };

  return (
    <div className="home-bg">
      <div className="home-container">
        {/* --- Header with Welcome + Sign Out --- */}
        <div className="home-header">
          <h2 className="home-welcome">
            Welcome{user ? `, ${user.name}` : ""} 👋
          </h2>
          {user && (
            <button className="signout-btn" onClick={onSignOut}>
              Sign Out
            </button>
          )}
        </div>

        <p className="home-subtext">Your personalized digital library awaits.</p>

        {/* --- Book of the Day --- */}
        <section className="home-section">
          <h3 className="section-title">📚 Book of the Day</h3>
          {bookOfTheDay ? (
            <div className="card book-card">
              <img
                src={getCoverImage(bookOfTheDay.title)}
                alt={bookOfTheDay.title}
                className="book-cover"
              />
              <div className="book-info">
                <h4 className="card-title">{bookOfTheDay.title}</h4>
                <p>
                  <strong>Author:</strong> {bookOfTheDay.author}
                </p>
                <p>
                  <strong>Genre:</strong> {bookOfTheDay.genre}
                </p>
                <p className="card-desc">{bookOfTheDay.description}</p>
              </div>
            </div>
          ) : (
            <p className="loading-text">Loading Book of the Day...</p>
          )}
        </section>

        {/* --- Author of the Day --- */}
        <section className="home-section">
          <h3 className="section-title">✍️ Author of the Day</h3>
          {authorOfTheDay ? (
            <div className="card">
              <h4 className="card-title">{authorOfTheDay.author}</h4>
            </div>
          ) : (
            <p className="loading-text">Loading Author of the Day...</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
