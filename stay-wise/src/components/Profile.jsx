import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
      return <p>Loading user data...</p>;
  }

  const handleHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h1>Profile</h1>

        <div className="profile-info">
          <p><strong>Full Name:</strong> {user.name}</p>
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

export default Profile;
