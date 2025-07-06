import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Property(){
    const rooms =[
      {
        location: "Gole ka mandir",
        duration:500,
        range:8000,
        category:'single',
        active: true
      },
      {
        location: "Gole ka mandir",
        duration:100,
        range:4000,
        category:'single',
        active: false
      },
      {
        location: "Gole ka mandir",
        duration:1000,
        range:8000000,
        category:'house',
        active: true
      },
      {
        location: "Pragati Vihar",
        duration:500,
        range:10000,
        category: 'double',
        active: false
      },
      {
        location: "City Center",
        duration:100,
        range:15000,
        category: '3bhk',
        active: true
      }
    ]

    const [one,setOne]=useState(false);
    const [curr,setCurr]=useState(0);
    const navigate=useNavigate();
    const availableRooms = rooms.filter(room=>room.active)

    const handleEvent=(curr)=>{
        setCurr(curr);
        setOne(!one);
    }

    const gotoprof=()=>{
        navigate('/ownprof')
    }

    const handleClick = (e,index)=>{
        alert("Request Sent")
      navigate('/owner');
    }

    const gotohome=()=>{
        navigate('/owner');
    }

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
        <p>All the available Rooms</p>
      </div>
     
     <div className="prop-container">
     <div className="prop-box1">
        <h2 className="tx">Your Active Rooms:</h2>
        {!one && <div className="prop-collection">
            {availableRooms.map((room,index)=>
                <div className="room-nbox">
                    <h2>Room no. {index+1}</h2>
                    <div className="photo"></div>
                    <p><strong>Location : </strong>{room.location}</p>
                    <p><strong>Duration : </strong>{room.duration}</p>
                    <p><strong>Range : </strong>{room.range}</p>
                    <p><strong>Category : </strong>{room.category}</p>
                </div>
            )}
        </div>}
    </div>

    <div className="prop-box1">
        <h2 className="tx">All Rooms:</h2>
        {!one && <div className="prop-collection">
            {rooms.map((room,index)=>
                <div className="room-nbox">
                    <h2>Room no. {index+1}</h2>
                    <div className="photo"></div>
                    <p><strong>Location : </strong>{room.location}</p>
                    <p><strong>Duration : </strong>{room.duration}</p>
                    <p><strong>Range : </strong>{room.range}</p>
                    <p><strong>Category : </strong>{room.category}</p>
                </div>
            )}
        </div>}
    </div>
    </div>
    </div>
  );
}

export default Property;