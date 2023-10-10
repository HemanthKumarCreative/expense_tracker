import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const [formData, setFormData] = useState({
    email: email,
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reset-password", {
        email,
        newPassword,
      });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {`Reset Password for ${email}`}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordForm;
