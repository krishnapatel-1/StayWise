import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const home = () => {
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Mobile Number:</strong> {user.mobile}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={home}>Home</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default Profile;
