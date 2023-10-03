import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie"; // Import js-cookie
import { useNavigate } from "react-router-dom";
import base_url from "../utils/url";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set("userInfo", JSON.stringify(data.user));
        Cookies.set("token", JSON.stringify(data.token));
        navigate("/Home");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
