import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Matched(){
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

    const [selectedIndex,setSelectedIndex]=useState(0);
    const [fixed,setFixed]=useState(0);
    const [req,setReq]=useState(null);

    const navigate=useNavigate();
    
    useEffect(()=>{
        const userReq=localStorage.getItem('req');
        if(userReq){
        setReq(JSON.parse(userReq));
        }else{
            navigate("/home");
        }
    },[]);

    if (!req) return <div>Loading...</div>;

    const matchedLoc=req?(rooms.filter(room=>room.location.toLowerCase().includes(req.location.toLowerCase()))):[];
    localStorage.setItem('matched',JSON.stringify(matchedLoc));
    
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

    const handleClick = (e,index)=>{
      e.preventDefault();
      setFixed(index);
      localStorage.setItem('fixed',JSON.stringify(fixed));
      navigate('/selected')
    }

    const showrooms=()=>{
      navigate('/rooms')
    }

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
        
        <div className="manage-room">
            <div>
              {selectedIndex!=null && 
                (<div className="room">
                  <h2>Rooms {selectedIndex+1} Details :</h2>
                  <span className="photo">PHOTO</span>
                  <p><strong>Location:</strong>{matchedLoc[selectedIndex].location}</p>
                  <p><strong>Duration:</strong>{matchedLoc[selectedIndex].duration}</p>
                  <p><strong>Price:</strong>{matchedLoc[selectedIndex].range}</p>
                  <p><strong>Category:</strong>{matchedLoc[selectedIndex].category}</p>
                </div>
              )}
             </div>

              <div className="room-box">
              {matchedLoc.length>0?(matchedLoc.map((room,index)=>
                <div 
                    onClick={(e)=>handleClick(e,index)}
                    onMouseEnter={()=>setSelectedIndex(index)} className="room-box-ele" key={index}>
                  <p><strong>Room {index+1} Details: </strong></p>
                  <p><strong>Price:</strong>{room.range}</p>
                  <p><strong>Category:</strong>{room.category}</p>
                </div> )):(
                  <p>No Rooms Available</p>
                )}
                </div>
            </div>
    </div>
  );
}

export default Matched;