import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Signup Form
      </Typography>
      <SignupForm />
      <Typography variant="h4" component="div" gutterBottom>
        Login Form
      </Typography>
      <LoginForm />
    </Container>
  );
}

export default App;
