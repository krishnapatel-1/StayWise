import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function Home(){
    const rooms =[
      {
        location: "Gole ka mandir",
        duration:500,
        range:8000,
        category:'single'
      },
      {
        location: "Gole ka mandir",
        duration:100,
        range:4000,
        category:'single'
      },
      {
        location: "Gole ka mandir",
        duration:1000,
        range:8000000,
        category:'house'
      },
      {
        location: "Pragati Vihar",
        duration:500,
        range:10000,
        category: 'double'
      },
      {
        location: "City Center",
        duration:100,
        range:15000,
        category: '3bhk'
      }
    ]

    const [req,setReq]=useState({
      location: '',
      duration: '',
      range: '',
      category: 'single'
    });

    const [show,setShow]=useState(true);
    const [selectedIndex,setselectedIndex]=useState(0);

    const navigate=useNavigate();

    const matchedRooms=rooms.filter(room=>room.location.toLowerCase().includes(req.location.toLowerCase()));
    const gotoprof=()=>{
        navigate('/profile')
    }

    const handleChange = (e)=>{
      const {name,value}=e.target;

      setReq(prev=>({...prev,[name]: value}));
    }

    const handleProceed = (e)=>{
      e.preventDefault();
      localStorage.setItem('req',JSON.stringify(req));
      setShow((flag)=>{
        setShow(!flag);
      });
      
    }

    return (
    <div className="home-page">
      <nav className="navbar">
        <h2>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="profile-btn" onClick={gotoprof}>Profile</button>
      </nav>

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Find the Room at Desired Location</p>
      </div>

      {show && <div className="cust-form">
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
       </div>}

        {!show && <div className="manage-room">
              <div>
              {selectedIndex!=null && 
                (<div className="room">
                  <h2>Rooms {selectedIndex+1} Details :</h2>
                  <span className="photo">PHOTO</span>
                  <p><strong>Location:</strong>{matchedRooms[selectedIndex].location}</p>
                  <p><strong>Duration:</strong>{matchedRooms[selectedIndex].duration}</p>
                  <p><strong>Price:</strong>{matchedRooms[selectedIndex].range}</p>
                  <p><strong>Category:</strong>{matchedRooms[selectedIndex].category}</p>
                </div>
              )}
              </div>
              <div className="room-box">
              {matchedRooms.length>0?(matchedRooms.map((room,index)=>
                <div onMouseEnter={()=>setselectedIndex(index)} className="room-box-ele" key={index}>
                  <p><strong>Room {index+1} Details: </strong></p>
                  <p><strong>Price:</strong>{room.range}</p>
                  <p><strong>Category:</strong>{room.category}</p>
                </div> )):(
                  <p>No Rooms Available</p>
                )}
              </div>
        </div>}
    </div>
  );
}

export default Home;