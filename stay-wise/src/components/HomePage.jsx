import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './HomePage.css';

function Home() {
  const [req, setReq] = useState({
    location: '',
    duration: '',
    range: '',
    category: 'single',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReq((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = (e) => {
    e.preventDefault();
    localStorage.setItem('req', JSON.stringify(req));
    navigate('/matched');
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1 className="logo" onClick={() => navigate('/home')}>StayWise</h1>
        <div className="nav-actions">
          <button onClick={() => navigate('/rooms')}>Rooms</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </nav>

      {/* Hero + Form Section */}
      <section className="form-section">
        <h2>Find Your Perfect Stay</h2>
        <form className="form-container" onSubmit={handleProceed}>
          <div className="form-row">
            <div className="form-group">
              <label>📍 Location</label>
              <input
                name="location"
                value={req.location}
                onChange={handleChange}
                placeholder="Enter city or locality"
                required
              />
            </div>
            <div className="form-group">
              <label>📆 Duration (Days)</label>
              <input
                name="duration"
                value={req.duration}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 5"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>💰 Budget (₹)</label>
              <input
                name="range"
                value={req.range}
                onChange={handleChange}
                type="number"
                placeholder="Your max budget"
                required
              />
            </div>
            <div className="form-group">
              <label>🏠 Room Type</label>
              <select name="category" value={req.category} onChange={handleChange}>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="2bhk">2BHK Flat</option>
                <option value="3bhk">3BHK Flat</option>
                <option value="house">House</option>
              </select>
            </div>
          </div>

          <button type="submit" className="proceed-btn">Search Rooms</button>
        </form>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Why Choose StayWise?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>✅ Verified Listings</h3>
            <p>All rooms and apartments are verified by our team for security and authenticity.</p>
          </div>
          <div className="feature-card">
            <h3>💸 Budget Friendly</h3>
            <p>Choose from a wide range of options that match your financial comfort.</p>
          </div>
          <div className="feature-card">
            <h3>🤖 Smart AI Match</h3>
            <p>Let our AI recommend stays based on your preferences and past behavior.</p>
          </div>
          <div className="feature-card">
            <h3>🛠 24/7 Support</h3>
            <p>Need help? Our support team is always available to assist you.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>What Our Users Say</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=32" alt="user1" />
            <h4>Riya Sharma</h4>
            <p>"StayWise made it so easy to find a room near my internship. Super smooth process!"</p>
          </div>
          <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=45" alt="user2" />
            <h4>Akash Verma</h4>
            <p>"Loved the clean UI and options. Found a verified 2BHK in less than 10 minutes!"</p>
          </div>
          <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=27" alt="user3" />
            <h4>Sneha Mehta</h4>
            <p>"Their AI suggestion system is actually helpful. I skipped the search completely!"</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 StayWise. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
