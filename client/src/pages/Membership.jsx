import React from "react";

const Membership = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Borrow up to 2 books/month",
        "Access to e-books",
        "Email support",
      ],
      color: "#dbeafe",
    },
    {
      name: "Premium",
      price: "₹199/month",
      features: [
        "Borrow up to 10 books/month",
        "Access to audiobooks",
        "Priority support",
        "Early access to new arrivals",
      ],
      color: "#fef9c3",
    },
    {
      name: "Platinum",
      price: "₹399/month",
      features: [
        "Unlimited borrowing",
        "Exclusive author sessions",
        "Personal recommendations",
        "Lifetime access to archives",
      ],
      color: "#dcfce7",
    },
  ];

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Library Membership Plans</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              backgroundColor: plan.color,
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{plan.name}</h3>
            <h4>{plan.price}</h4>
            <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => alert(`You selected the ${plan.name} plan!`)}
            >
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
