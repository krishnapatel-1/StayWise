import React from "react";
import { useNavigate } from "react-router-dom";
import "./ownerpage.css";

export default function Owner() {
  const navigate = useNavigate();

  const gotoprof = () => navigate("/ownprof");
  const handleHome = () => navigate("/owner");
  const handleCreate = () => navigate("/add-property");
  const handleView = () => navigate("/my-property");

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <h2 onClick={handleHome}>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <div>
          <button className="profile-btn" onClick={gotoprof}>
            Profile
          </button>
        </div>
      </nav>

      {/* Welcome Header and Buttons */}
      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Get Tenants without any effort</p>
      </div>

      <div className="prop-box">
        <div className="own-box">
          <div className="btn-own">
            <button onClick={handleCreate}>Create Property</button>
            <button onClick={handleView}>View Your Property</button>
          </div>
          <div className="owner-dash">
            <h2>DashBoard</h2>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose-us owner-section">
        <h2>Why Choose StayWise as an Owner?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔑</div>
            <h3>Effortless Tenant Search</h3>
            <p>List your properties and connect with verified tenants quickly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>Easy Property Management</h3>
            <p>Manage all your listings in one place with our simple dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Secure Rent Collection</h3>
            <p>Safe and timely payment options with transparent transaction history.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Our team is always ready to assist you with any questions or issues.</p>
          </div>
        </div>
      </section>

      {/* Owner Reviews Section */}
      <section className="owner-reviews owner-section">
        <h2>What Our Owners Say</h2>
        <div className="review-cards">
          {[
            {
              text:
                "Listing my properties on StayWise was simple and effective. The platform helped me find great tenants fast!",
              author: "Rajesh K.",
            },
            {
              text:
                "The dashboard makes managing my rentals a breeze. Highly recommended for any property owner.",
              author: "Anjali S.",
            },
            {
              text:
                "Excellent support and trustworthy tenants. StayWise really takes the stress out of renting.",
              author: "Vikram P.",
            },
          ].map(({ text, author }, i) => (
            <div key={i} className="review-card">
              <p>“{text}”</p>
              <span>- {author}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
