import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Matched() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fixed, setFixed] = useState(-1);
  const [req, setReq] = useState(null);

  const navigate = useNavigate();

  const getFrontImageUrl = (property) => {
    const front = property.photos?.find(p => p.label === "Property Front View");
    return front?.base64 || null;
  };

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('http://localhost:4000/api/properties/all');
        const data = await res.json();

        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error("Expected array but got:", data);
          setProperties([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error Occurred", error);
      }
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    const userReq = localStorage.getItem('req');
    if (userReq) {
      setReq(JSON.parse(userReq));
    } else {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (fixed !== -1) {
      navigate("/selected", { state: { index: fixed } });
    }
  }, [fixed]);

  const matchedLoc = properties.filter(
    room => room.location?.city?.toLowerCase().includes(req.location?.toLowerCase())
  );
  console.log("Filtered Matched Rooms:", matchedLoc);
  localStorage.setItem('matched', JSON.stringify(matchedLoc));

  const gotoprof = () => navigate('/profile');
  const handleHome = () => navigate('/home');
  const showrooms = () => navigate('/rooms');

  const handleClick = (e, index) => {
    e.preventDefault();
    setFixed(index);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={handleHome}>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <div>
          <button className="profile-btn" onClick={showrooms}>All Rooms</button>
          <button className="profile-btn" onClick={gotoprof}>Profile</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Rooms that matched your Desired Location</p>
      </div>

      <div className="cont">
      {loading?(
        <div className="manage-room">
          <div className="room-box">
                <div className="loader-container"><div className="loader"></div></div>
          </div>
        </div>
      ):(<div className="manage-room">
        <div>
          {matchedLoc.length > 0 && selectedIndex !== null && matchedLoc[selectedIndex] && (
            <div className="room">
              <h2>Rooms {selectedIndex + 1} Details :</h2>
              {getFrontImageUrl(matchedLoc[selectedIndex]) ? (
                <img
                  src={getFrontImageUrl(matchedLoc[selectedIndex])}
                  alt="Room"
                  className="photo"
                />
              ) : (
                <div className="photo placeholder">No Image</div>
              )}
              <p><strong>Location:</strong> {matchedLoc[selectedIndex].location?.city}</p>
              <p><strong>Price:</strong> ₹{matchedLoc[selectedIndex].monthlyRent}</p>
              <p><strong>Type:</strong> {matchedLoc[selectedIndex].propertyType}</p>
              <p><strong>Facing:</strong> {matchedLoc[selectedIndex].facing}</p>
            </div>
          )}
        </div>

        <div className="room-box">
          {matchedLoc.length > 0 ? matchedLoc.map((room, index) => (
            <div
              onClick={(e) => handleClick(e, index)}
              onMouseEnter={() => setSelectedIndex(index)}
              className="room-box-ele"
              key={index}
            >
              <p><strong>Room {index + 1}</strong></p>
              <p><strong>City:</strong> {room.location?.city}</p>
              <p><strong>Price:</strong> ₹{room?.monthlyRent}</p>
              <p><strong>Type:</strong> {room.propertyType}</p>
            </div>
          )) : (
            <p>No Rooms Available</p>
          )}
        </div>
      </div>)}
      </div>
    </div>
  );
}

export default Matched;
