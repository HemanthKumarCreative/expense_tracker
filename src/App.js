import React from "react";
import SignupForm from "./components/SignupForm";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Signup Form
      </Typography>
      <SignupForm />
    </Container>
  );
}

export default App;
