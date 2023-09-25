import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up Page
      </Typography>
      <SignupForm />
      <Typography variant="body1" align="center">
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Container>
  );
};

export default SignupPage;
