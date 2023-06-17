import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Error: All the fields are mandatory");
      setSuccessMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Error: Passwords do not match");

      setSuccessMessage("");
      return;
    }

    const generateAccessToken = () => {
      const characters =
        "@#%$&^*()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const length = 16;
      let accessToken = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        accessToken += characters.charAt(randomIndex);
      }

      return accessToken;
    };

    const accessToken = generateAccessToken();

    const user = {
      name,
      email,
      password,
      accessToken,
    };

    localStorage.setItem("user", JSON.stringify(user));

    setSuccessMessage("Signup successful! Redirecting to profile page...");
   
    setErrorMessage("");

    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="container">
      <h2 className="heading">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="nameDiv">
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="emailDiv">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="passwordDiv">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirmPasswordDiv">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {successMessage && <p className="msgSuccess">{successMessage}</p>}
        {errorMessage && <p className="msgError">{errorMessage}</p>}

        <button className="submitBtn" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;