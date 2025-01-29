import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      navigate("/users");
      // Navigate to the users page
    } else {
      if (!username) {
        setFormMessage("Username is required");
      }
      if (!password) {
        setFormMessage("Password is required");
      }
      if (username === "wronguser" && password === "wrongpass") {
        setFormMessage("Invalid credentials");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Login Page</h1>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {formMessage && <p>{formMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            style={{ marginBottom: "10px" , height:"20px" , padding:"5px" }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: "10px"  , height:"20px" , padding:"5px"}}
          />
          <button type="submit"
          style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}
          >Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
