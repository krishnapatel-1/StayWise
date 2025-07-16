import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [req, setReq] = useState({
    location: '',
    duration: '',
    range: '',
    category: 'single',
  });

  const navigate = useNavigate();

  const gotoprof = () => {
    navigate('/profile');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReq(prev => ({ ...prev, [name]: value }));
  };

  const handleProceed = (e) => {
    e.preventDefault();
    localStorage.setItem('req', JSON.stringify(req));
    navigate('/matched');
  };

  const showrooms = () => {
    navigate('/rooms');
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={() => navigate("/home")}>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <div>
          <button className="profile-btn" onClick={showrooms}>All Rooms</button>
          <button className="profile-btn" onClick={gotoprof}>Profile</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Find the Room at Desired Location</p>
      </div>

      <div className="cust-form">
        <div className="cap1">
          <h2>Location :</h2>
          <input
            name="location"
            onChange={handleChange}
            value={req.location}
            placeholder="Where do you want Room"
          />
        </div>

        <div className="cap1">
          <h2>Duration :</h2>
          <input
            name="duration"
            onChange={handleChange}
            value={req.duration}
            placeholder="Duration of your stay (Days)"
          />
        </div>

        <div className="cap1">
          <h2>Range :</h2>
          <input
            name="range"
            value={req.range}
            onChange={handleChange}
            placeholder="Your approx budget"
          />
        </div>

        <div className="cap1">
          <h2>Category :</h2>
          <select value={req.category} onChange={handleChange} name="category">
            <option disabled>Select an option</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="2bhk">2BHK Flat</option>
            <option value="3bhk">3BHK Flat</option>
            <option value="house">House</option>
          </select>
        </div>

        <button onClick={handleProceed}>Click to Proceed</button>
      </div>
    </div>
  );
}

export default Home;
