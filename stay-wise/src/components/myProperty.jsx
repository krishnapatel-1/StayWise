import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./myProperty.css";

function MyProperty() {
  const [properties, setProperties] = useState([]);
  const [loading,setLoading]=useState(true);
  const navigate = useNavigate();
  const [one, setOne] = useState(false);
  const ownerId = localStorage.getItem("ownerId");

  // console.log(`📤 Fetching from: http://localhost:4000/api/properties/owner/${ownerId}`);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/owner/${ownerId}`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching properties:", err.message);
        setProperties([]);
      }
    };

    if (ownerId) fetchProperties();
  }, [ownerId]);

  const gotoprof = () => navigate("/ownprof");
  const gotohome = () => navigate("/owner");

  const getFrontImageUrl = (property) => {
    const front = property.photos?.find(p => p.label === "Property Front View");
    return front?.base64 || null;
  };

  const availableRealRooms = properties.filter(p => p.toLet=='Yes');
  const inactiveRooms = properties.filter(p => p.toLet=='No');

  // console.log("✅ Fetched Properties:", properties);
  // console.log("🟢 Showing:", availableRealRooms);

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
        <p>Your Properties (Real & Dummy)</p>
      </div>

      <div className="prop-container">
        {/* Active Real Properties */}
        <div className="prop-box1">
          <h2 className="tx">Your Active Properties:</h2>
          {loading?(
            <div className="loader-container"><div className="loader"></div></div>
          ) : (
            <div className="prop-collection">
              {availableRealRooms.length==0?(
                <div className="loader">
                  No Active Property Currently!
                </div>
              ):(availableRealRooms.map((room, index) => (
                <div className="room-nbox" key={room._id || index}>
                  <h2>Property {index + 1}</h2>
                  {getFrontImageUrl(room) ? (
                    <img src={getFrontImageUrl(room)} alt="Front View" className="photo" />
                  ) : (
                    <div className="photo placeholder">No Image</div>
                  )}
                  <p><strong>Location:</strong> {room.location?.city}</p>
                  <p><strong>Total Area:</strong> {room.totalArea}</p>
                  <p><strong>Type:</strong> {room.propertyType}</p>
                  <p><strong>Rental Status:</strong> {room.toLet === "Yes" ? "✅ To-Let" : "❌ Not To-Let"}</p>

                  <button onClick={() => navigate(`/property/${room._id}`)}>View</button>
                </div>
              )))}
            </div>
          )}
        </div>

        {/* All Real Properties */}
        <div className="prop-box1">
          <h2 className="tx">Inactive Properties:</h2>
          {loading?(
            <div className="loader-container"><div className="loader"></div></div>
          ) : (
            <div className="prop-collection">
              {inactiveRooms.length==0?(
                <div className="load">
                  No Property Created...
                </div>
              ):(inactiveRooms.map((room, index) => (
                <div className="room-nbox" key={room._id || index}>
                  <h2>Property {index + 1}</h2>
                  {getFrontImageUrl(room) ? (
                    <img src={getFrontImageUrl(room)} alt="Front View" className="photo" />
                  ) : (
                    <div className="photo placeholder">No Image</div>
                  )}
                  <p><strong>Location:</strong> {room.location?.city}</p>
                  <p><strong>Total Area:</strong> {room.totalArea}</p>
                  <p><strong>Type:</strong> {room.propertyType}</p>
                  <p><strong>Rental Status:</strong> {room.toLet === "Yes" ? "✅ To-Let" : "❌ Not To-Let"}</p>

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
