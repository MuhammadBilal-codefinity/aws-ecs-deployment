import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate()

  const onSubmit = async(event) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      navigate('/users')
      // Navigate to the users page
    } else {
      if(!username){
        setFormMessage("Username is required");
      }
      if(!password){
        setFormMessage("Password is required");
      }
      if(username === 'wronguser' && password === 'wrongpass'){
        setFormMessage("Invalid credentials");
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={onSubmit}>
        {formMessage && <p>{formMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
