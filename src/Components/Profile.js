import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.accessToken) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
   
    navigate("/");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="body">
      <div className="container2">
        <h2 className="heading2">Profile</h2>
        <div className="data">
          <b>
            Name: <span className="na"> {user.name}</span>
          </b>
          <br />
          <b>
            Email: <span className="em"> {user.email}</span>
          </b>
          <br />
          <b>
            Password: <span className="pa"> {user.password}</span>
          </b>
          <br />
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;