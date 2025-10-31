import React from "react";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>
        {user ? `Hi, ${user.name}! 👋` : "Welcome to the Library Management System"}
      </h1>
      <p style={{ marginTop: "10px" }}>
        {user
          ? "Explore your personal library, manage memberships, and read your favorite books."
          : "Sign in to access your personalized dashboard and library."}
      </p>
    </div>
  );
}

export default Home;
