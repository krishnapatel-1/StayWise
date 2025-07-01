import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Selected(){
    const [fixed,setFixed]=useState(0);
    const [index,setIndex]=useState(0);
    const [matched,setMatched]=useState(null);
    const [rooms,setRooms]=useState(null);
    const navigate=useNavigate();
    
    useEffect(()=>{
        const storedMatch=localStorage.getItem('matched');
        const storeFixed=localStorage.getItem('fixed');
        const storedIndex=localStorage.getItem('index');
        const storedRooms=localStorage.getItem('rooms');

        if(storedMatch){
        setMatched(JSON.parse(storedMatch));
        }else{
            navigate("/rooms");
        }

        if(storedRooms){
        setRooms(JSON.parse(storedRooms));
        }else{
            navigate("/rooms");
        }

        if(storeFixed){
        setFixed(JSON.parse(storeFixed));
        }else{
            navigate("/rooms");
        }

        if(storedIndex){
            setIndex(JSON.parse(storedIndex));
        }else{
            navigate('/rooms');
        }
    },[]);

    if (!matched||!rooms) return <div>Loading...</div>;

    const gotoprof=()=>{
        navigate('/profile')
    }

    const handleHome =()=>{
      navigate('/home')
    }

    const handleClick = (e,index)=>{
        alert("Request Sent")
      navigate('/home');
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

        <div>
            <h1>ROOM SELECTED HERE {index+1}</h1>
            

            {!index && matched?.length>0?(
            <div>
                <div className="decision-box">Room no. {fixed+1}</div>
                <div className="details">
                    <h2>Details about the selected room</h2>
                    <h2><strong>Location :</strong>{matched[fixed].location}</h2>
                    <p><strong>Range :</strong>{matched[fixed].range}</p>
                    <p><strong>Duration :</strong>{matched[fixed].duration}</p>
                    <p><strong>Category :</strong>{matched[fixed].category}</p>
                    <button onClick={handleClick}>Send Message</button>
                </div>
            </div>):(<p></p>)}
        </div>
    </div>
  );
}

export default Selected;