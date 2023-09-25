import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login Page
      </Typography>
      <LoginForm />
      <Typography variant="body1" align="center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
      <Typography variant="body1" align="center">
        Forgot your password? <Link to="/forget-password">Click here</Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
