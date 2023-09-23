import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const ForgotPasswordForm = ({ setIsForgetPasswordPage }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        {
          email,
        }
      );

      setMessage(response.data.message);
      setIsForgetPasswordPage(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color="textSecondary" align="center">
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default ForgotPasswordForm;
