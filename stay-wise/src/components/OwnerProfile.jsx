import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Profile.css';

function OwnProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [req, setReq] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedReq = localStorage.getItem("req");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    if (storedReq) {
      setReq(JSON.parse(storedReq));
    } else {
      console.log("No requirements made");
    }
  }, [navigate]);

  const handleHome = () => {
    navigate("/owner");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h1>Owner Profile</h1>

        <div className="profile-info">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Mobile Number:</strong> {user.mobile}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="button-group">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );

}

export default OwnProfile;