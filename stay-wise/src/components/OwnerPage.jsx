import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Owner(){
    const navigate=useNavigate();

    const gotoprof=()=>{
        navigate('/ownprof')
    }

    const handleHome =()=>{
      navigate('/owner')
    }

    const handleCreate=()=>{
        navigate('/add-property')
    }

    const handleView=()=>{
        navigate('/my-property')
    }

    return (
    <div className="home-page">
      <nav className="navbar">
        <h2 onClick={handleHome}>StayWise</h2>
        <input type="text" placeholder="Search..." className="search-input" />
        <div>
        <button className="profile-btn" onClick={gotoprof}>Profile</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to StayWise</h1>
        <p>Get Tenants without any effort</p>
      </div>
        
        <div className="prop-box">
              <div className="own-box">
                <div className="btn-own">
                    <button onClick={handleCreate}>Create Property</button>
                    <button onClick={handleView}>View Your Property</button>
                </div>
                <div className="owner-dash">
                    <h2 className="text-gray-900 dark:text-white font-bold text-3xl mt-4 text-center">DashBoard</h2>
                </div>
              </div>
        </div>
    </div>
  );
}

export default Owner;