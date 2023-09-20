import React, { useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ExpenseForm from "./components/ExpenseForm";
// import ExpenseList from "./components/ExpenseList";

import { Container, Typography } from "@mui/material";

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };
  return (
    <Container>
      {authenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <ExpenseForm />
        </>
      ) : (
        <>
          <Typography variant="h4" component="div" gutterBottom>
            Signup Form
          </Typography>
          <SignupForm />
          <Typography variant="h4" component="div" gutterBottom>
            Login Form
          </Typography>
          <LoginForm />
        </>
      )}
    </Container>
  );
}

export default App;
