import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const { setToken } = useContext(UserContext);

  function updateUser(e) {
    let key = e.target.name;
    setUser({ ...user, [key]: e.target.value });
  }

  // Validations

  async function implementSignup(e) {
    e.preventDefault();
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setMessage("Please fill all the details");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setMessage("Password and confirm Password do not match");
      return;
    }

    // Signup API: https://instagram-express-app.vercel.app/api/auth/signup
    try {
      const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {
        name: user.name,
        email: user.email,
        password: user.password
      });
      setMessage(response.data.message);
      setToken(response.data.data.token);
      setUser({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="signup-container"> {/* Add the className */}
      <div className="cover-page"></div> {/* Add cover page */}
      <div className="signup-form">
        <h1>Signup</h1>
        {message && <h2>{message}</h2>}
        <form onSubmit={implementSignup}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={updateUser}
            value={user.name}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={updateUser}
            value={user.email}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateUser}
            value={user.password}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={updateUser}
            value={user.confirmPassword}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;