import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Rooms(){
    const [rooms,setRooms]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
      async function fetchProperties(){
        try{
          const res=await fetch('http://localhost:4000/api/properties/all');
          const data=await res.json();

          if (Array.isArray(data)) {
            setRooms(data);
          } else {
            console.error("Expected array but got:", data);
            setRooms([]);
          }
          setLoading(false);
        }catch(error){
          console.error("Error Occured",error);
        }
      }
      fetchProperties();
    },[])

    const activeRooms=rooms.filter((room)=>room.toLet==='Yes')
    const [one,setOne]=useState(false);
    const [curr,setCurr]=useState(0);
    const navigate=useNavigate();

    const getFrontImageUrl = (property) => {
      const front = property.photos?.find(p => p.label === "Property Front View");
      return front?.base64 || null;
    };
    
    const handleEvent=(curr)=>{
        setCurr(curr);
        setOne(!one);
    }

    const gotoprof=()=>{
        navigate('/profile')
    }

    const handleClick = (e,index)=>{
        alert("Request Sent")
      navigate('/home');
    }

    const handleHome =()=>{
      navigate('/home')
    }

    const gotohome=()=>{
        navigate('/home');
    }

    return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={handleHome}>StayWise</h2>
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
     
      {!one && <div className="prop-container">
        <div className="prop-box1">
          <h2 className="tx">All Properties:</h2>
          {loading?(
            <div className="load">
              Loading Please Wait...
            </div>
          ) : (
            <div className="prop-collection">
              {activeRooms.length==0?(
                <div className="load">
                  No Property Created...
                </div>
              ):(activeRooms.map((room, index) => (
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
        
      {one && activeRooms.length>0?(
            <div>
                <h1>ROOM SELECTED HERE {curr+1}</h1>
                <div className="decision-box">Room no. {curr+1}</div>
                <div className="details">
                    <h2>Details about the selected room</h2>
                    <h2><strong>Location :</strong>{activeRooms[curr].location}</h2>
                    <p><strong>Range :</strong>{activeRooms[curr].range}</p>
                    <p><strong>Duration :</strong>{activeRooms[curr].duration}</p>
                    <p><strong>Category :</strong>{activeRooms[curr].category}</p>
                    <button onClick={handleClick}>Send Message</button>
                </div>
            </div>):(<p></p>)}
        </div>
    </div>
  );
}

export default Rooms;