import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Matched() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fixed, setFixed] = useState(-1);
  const [req, setReq] = useState(null);
  const [navbarSearch, setNavbarSearch] = useState('');
  const [navbarSuggestions, setNavbarSuggestions] = useState([]);
  
  const gotohome=()=>{
        navigate('/home');
  }

  const navigate = useNavigate();

  const getFrontImageUrl = (property) => {
    const front = property.photos?.find(p => p.label === "Property Front View");
    return front?.base64 || null;
  };

  const handleNavbarSuggestionClick = (location) => {
      setNavbarSearch(location);
      setNavbarSuggestions([]);
      navigate(`/search?location=${encodeURIComponent(location)}`);
    };

  useEffect(() => {
      const fetchNavbarSuggestions = async () => {
      if (navbarSearch.trim() === '') {
        setNavbarSuggestions([]);
        return;
      }
      
      try {
        const res = await fetch(`http://localhost:4000/api/locations?q=${navbarSearch}`);
        const data = await res.json();
        console.log("🔍 Location suggestions from backend:", data);
        setNavbarSuggestions(data);
      } catch (err) {
        console.error('Error fetching navbar locations:', err);
      }
      };
      
      const timeoutId = setTimeout(fetchNavbarSuggestions, 300); // debounce
      return () => clearTimeout(timeoutId);
  }, [navbarSearch]);


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
        <h2 className="staywise" onClick={handleHome}>StayWise</h2>
        <div style={{ position: 'relative', width: '250px' }}>
              <input
                type="text"
                placeholder="Search location..."
                value={navbarSearch}
                onChange={(e) => setNavbarSearch(e.target.value)}
                className="search-input"
                autoComplete="off"
              />

              {navbarSuggestions.length > 0 && (
                  <ul style={{
                    position: "absolute",
                    background: "white",
                    border: "1px solid #ccc",
                    zIndex: 20,
                    width: "100%",
                    maxHeight: "150px",
                    overflowY: "auto",
                    padding: 0,
                    margin: 0,
                    listStyle: "none"
                  }}>
                    {navbarSuggestions.map((loc, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleNavbarSuggestionClick(loc)}
                        style={{ color:'#012525', padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
        <div>
          <button className="profile-btn" onClick={showrooms}>All Rooms</button>
          <button className="profile-btn" onClick={gotoprof}>Profile</button>
        </div>
      </nav>

      <div style={{display: "flex",placeItems: 'center',justifyContent: 'center',padding: "20px",marginTop:"25px",color:"#475569",fontSize:'larger'}} >
        <p>Rooms that matched your Desired Location</p>
      </div>
     
      {<div className="prop-container">
        <div className="prop-box1">
          <h2 className="tx">{`Properties at ${req?.location}`}</h2>
          {loading?(
            <div className="loader-container"><div className="loader"></div></div>
          ) : (
            <div className="prop-collection">
              {matchedLoc.length==0?(
                <div className="load">
                  {`No Property available at ${req?.location}`}
                </div>
              ):(matchedLoc.map((room, index) => (
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
      </div>}
      <div>
     </div>
    </div>
  );
}

export default Matched;
