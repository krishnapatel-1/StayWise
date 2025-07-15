import React,{useState,useEffect} from "react";
import './middlebar.css';

function Middle_bar() {
    const [navbarSearch, setNavbarSearch] = useState('');
    const [navbarSuggestions, setNavbarSuggestions] = useState([]);

    const handleChange = (e)=>{
        const {name,value}=e.target;
        setReq(prev=>({...prev,[name]: value}));
    }

    const handleNavbarSuggestionClick = (location) => {
        setNavbarSearch(location);
        setNavbarSuggestions([]);
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

    return (
        <>
            <div id="middle_bar">
                <div id="search_bar">
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

                    <button>search</button>
                </div>
            </div>

            
        </>
    );
}

export default Middle_bar;
