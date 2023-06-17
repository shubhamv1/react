import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


function Navbar() {
  const navigate = useNavigate();

const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.accessToken) {
      navigate("/");
    } else {
      toast.info("You are already in your profile page", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
      });
    }
  };

  return (
    <nav>
      <div className="logo">Header</div>
      <ul>
        <li>
          <Link to="/">Signup</Link>
        </li>
        <li>
          <Link to="/profile" onClick={handleProfileClick}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;