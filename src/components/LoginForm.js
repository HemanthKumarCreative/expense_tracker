import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const LoginForm = ({ setAuthenticated, setIsLoginPage, setIsPremiumUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.user);
        localStorage.setItem("token", JSON.stringify(data.user));
        setAuthenticated(true);
        setIsPremiumUser(
          JSON.parse(localStorage.getItem("token"))?.isPremiumUser
        );
        console.log("Login successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageSwitch = () => {
    setIsLoginPage(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handlePageSwitch}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
