import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./myProperty.css";

function MyProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ownerId = localStorage.getItem("ownerId");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // ✅ Use the existing endpoint to fix the 404 error
        const res = await fetch(`http://localhost:4000/api/properties/owner/${ownerId}`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching properties:", err.message);
        setProperties([]);
        setLoading(false); // Also set loading to false on error
      }
    };

    if (ownerId) {
      fetchProperties();
    } else {
      setLoading(false); // If no ownerId, stop loading
    }
  }, [ownerId]);

  const gotoprof = () => navigate("/ownprof");
  const gotohome = () => navigate("/owner");

  const getFrontImageUrl = (property) => {
    const front = property.photos?.find(p => p.label === "Property Front View");
    return front?.base64 || null;
  };

  const availableRealRooms = properties.filter(p => p.toLet === 'Yes');
  const inactiveRooms = properties.filter(p => p.toLet === 'No');

  return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={gotohome}>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <div>
          <button className="profile-btn" onClick={gotohome}>Home</button>
          <button className="profile-btn" onClick={gotoprof}>Profile</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Your Properties</p>
      </div>

      <div className="prop-container">
        {/* Active Real Properties */}
        <div className="prop-box1">
          <h2 className="tx">Your Active Properties:</h2>
          {loading ? (
            <div className="loader-container"><div className="loader"></div></div>
          ) : (
            <div className="prop-collection">
              {availableRealRooms.length === 0 ? (
                <div className="loader">
                  No Active Properties!
                </div>
              ) : (availableRealRooms.map((room, index) => (
                <div className="room-nbox" key={room._id || index}>
                  <h2>Property {index + 1}</h2>
                  {getFrontImageUrl(room) ? (
                    <img src={getFrontImageUrl(room)} alt="Front View" className="photo" />
                  ) : (
                    <div className="photo placeholder">No Image</div>
                  )}
                  <p><strong>Location:</strong> {room.location?.city}</p>
                  <p><strong>Type:</strong> {room.propertyType}</p>
                  <p><strong>Status:</strong> <span className="status-active">✅ Available</span></p>
                  <button onClick={() => navigate(`/property/${room._id}`)}>View</button>
                </div>
              )))}
            </div>
          )}
        </div>

        {/* Inactive Properties */}
        <div className="prop-box1">
          <h2 className="tx">Inactive / Booked Properties:</h2>
          {loading ? (
            <div className="loader-container"><div className="loader"></div></div>
          ) : (
            <div className="prop-collection">
              {inactiveRooms.length === 0 ? (
                <div className="load">
                  No Inactive Properties.
                </div>
              ) : (inactiveRooms.map((room, index) => (
                <div className="room-nbox" key={room._id || index}>
                  <h2>Property {index + 1}</h2>
                  {getFrontImageUrl(room) ? (
                    <img src={getFrontImageUrl(room)} alt="Front View" className="photo" />
                  ) : (
                    <div className="photo placeholder">No Image</div>
                  )}
                  <p><strong>Location:</strong> {room.location?.city}</p>
                  <p><strong>Type:</strong> {room.propertyType}</p>
                  <p><strong>Status:</strong> <span className="status-inactive">❌ Booked</span></p>

                  {/* ✅ Display booking information if it exists */}
                  {room.bookedBy ? (
                    <div className="booked-by-info">
                      <p><strong>Booked By:</strong> {room.bookedBy.name}</p>
                      <p><strong>Contact:</strong> {room.bookedBy.email}</p>
                    </div>
                  ) : (
                    <p><strong>Booked By:</strong> Info Unavailable</p>
                  )}

                  <button onClick={() => navigate(`/property/${room._id}`)}>View</button>
                </div>
              )))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProperty;
