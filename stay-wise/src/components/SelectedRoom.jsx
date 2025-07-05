import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect} from "react";

function Selected(){
    const [index,setIndex]=useState(0);
    const [matched,setMatched]=useState(null);
    const navigate=useNavigate();
    const lcn=useLocation();

    useEffect(() => {
      
      const fixed = lcn.state?.index;
      setIndex(fixed);
    }, [location.state,index]);

    useEffect(()=>{
        const storedMatch=localStorage.getItem('matched');

        if(storedMatch){
        setMatched(JSON.parse(storedMatch));
        }else{
            navigate("/rooms");
        }
    },[matched]);

    if (!matched) return <div>Loading...</div>;

    const gotoprof=()=>{
        navigate('/profile')
    }

    const handleHome =()=>{
      navigate('/home')
    }

    const handleClick = ()=>{
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
            
            {matched?.length>0?(
            <div>
                <div className="decision-box">Room no. {index+1}</div>
                <div className="details">
                    <h2>Details about the selected room</h2>
                    <h2><strong>Location :</strong>{matched[index].location}</h2>
                    <p><strong>Range :</strong>{matched[index].range}</p>
                    <p><strong>Duration :</strong>{matched[index].duration}</p>
                    <p><strong>Category :</strong>{matched[index].category}</p>
                    <button onClick={handleClick}>Send Message</button>
                </div>
            </div>):(<p></p>)}
        </div>
    </div>
  );
}

export default Selected;