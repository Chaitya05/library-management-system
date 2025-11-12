import React from "react";
import "./Membership.css";

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
      colorClass: "basic",
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
      colorClass: "premium",
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
      colorClass: "platinum",
    },
  ];

  const handleSelect = (plan) => {
    alert(`You selected the ${plan.name} plan!`);
  };

  return (
    <div className="membership-container">
      <h2 className="membership-title">💎 Library Membership Plans</h2>
      <p className="membership-subtitle">
        Unlock more reading power with our flexible membership options.
      </p>

      <div className="membership-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`membership-card ${plan.colorClass}`}>
            <h3 className="plan-name">{plan.name}</h3>
            <h4 className="plan-price">{plan.price}</h4>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>

            <button
              className="join-btn"
              onClick={() => handleSelect(plan)}
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
