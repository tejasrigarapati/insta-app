import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import './Login.css'; // Import the CSS file

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setToken } = useContext(UserContext);

  function updateUser(e) {
    let key = e.target.name;
    setUser({ ...user, [key]: e.target.value });
  }

  // Validations

  async function implementLogin(e) {
    e.preventDefault();
    if (!user.email || !user.password) {
      setMessage("Please fill all the details");
      return;
    }

    // Login API: https://instagram-express-app.vercel.app/api/auth/login
    try {
      const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      setMessage(response.data.message);
      setToken(response.data.data.token);
      setUser({ email: "", password: "" });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="login-container">
      <div className="cover-page"></div> {/* Add cover page */}
      <div className="login-form">
        <h1>Login</h1>
        {message && <h2>{message}</h2>}
        <form onSubmit={implementLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={updateUser}
            value={user.email}
          /><br/><br/>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateUser}
            value={user.password}
          /><br/><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;