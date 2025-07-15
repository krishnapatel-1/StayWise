import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Home(){
    const [req,setReq]=useState({
      location: '',
      duration: '',
      range: '',
      category: 'single'
    });
    
    const [suggestions, setSuggestions] = useState([]);
    const [navbarSearch, setNavbarSearch] = useState('');
    const [navbarSuggestions, setNavbarSuggestions] = useState([]);
    const navigate=useNavigate();

    const gotoprof=()=>{
        navigate('/profile')
    }

    const handleChange = (e)=>{
      const {name,value}=e.target;
      setReq(prev=>({...prev,[name]: value}));
    }

    const handleHome =()=>{
      navigate('/home')
    }

    const handleProceed = (e)=>{
      e.preventDefault();
      localStorage.setItem('req',JSON.stringify(req));
      navigate('/matched');  
    }

    const handleNavbarSuggestionClick = (location) => {
      setNavbarSearch(location);
      setNavbarSuggestions([]);
      navigate(`/search?location=${encodeURIComponent(location)}`);
    };

    const showrooms=()=>{
      navigate('/rooms')
    }

    useEffect(() => {
      const fetchNavbarSuggestions = async () => {
        if (navbarSearch.trim() === '') {
          setNavbarSuggestions([]);
          return;
        }

        try {
          const res = await fetch(`http://localhost:4000/api/locations?q=${navbarSearch}`);
          const data = await res.json();
          setNavbarSuggestions(data);
        } catch (err) {
          console.error('Error fetching navbar locations:', err);
        }
      };

      const timeoutId = setTimeout(fetchNavbarSuggestions, 300); // debounce
      return () => clearTimeout(timeoutId);
    }, [navbarSearch]);


    return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={handleHome}>StayWise</h2>
          {/*<input type="text" placeholder="Search..." className="search-input" />*/}
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

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Find the Room at Desired Location</p>
      </div>

      <div className="cust-form">
        <div className="cap1">
          <h2>Location :</h2>
          <input name="location" 
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
              placeholder="Duration of your stay(Days)"
          />
        </div>
        <div className="cap1">
          <h2>Range :</h2>
          <input name="range" 
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