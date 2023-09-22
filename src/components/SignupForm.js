import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";

const SignupForm = ({
  setAuthenticated,
  setIsLoginPage,
  setIsPremiumUser,
  setUserInfo,
}) => {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        setAuthenticated(true);
        setIsPremiumUser(data.isPremiumUser);
        setUserInfo(data);
        console.log("User created:", data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageSwitch = () => {
    setIsLoginPage(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handlePageSwitch}
            >
              Login
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Box>
      </form>
    </Container>
  );
};

export default SignupForm;
