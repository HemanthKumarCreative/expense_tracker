import React, { useState } from "react";
import { CssBaseline, Container, Button, Box, Grid } from "@mui/material";
import Login from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import Expenses from "./components/Expenses";
import PaymentRequest from "./components/PaymentRequest";
const axios = require("axios");

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const getPremiumStatus = () => {
    const userId = JSON.parse(localStorage.getItem("token"))?.id;
    console.log({ userId });
  };

  const [isPremiumUser, setIsPremiumUser] = useState(getPremiumStatus);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={4}>
        {authenticated ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                  fullWidth
                >
                  Logout
                </Button>
              </Grid>
              <Grid item xs={6}>
                {!isPremiumUser && (
                  <PaymentRequest setIsPremiumUser={setIsPremiumUser} />
                )}
              </Grid>
            </Grid>
            <Box mt={2}>
              <Expenses />
            </Box>
          </>
        ) : isLoginPage ? (
          <Login
            setAuthenticated={setAuthenticated}
            setIsLoginPage={setIsLoginPage}
            setIsPremiumUser={setIsPremiumUser}
          />
        ) : (
          <SignUp
            setAuthenticated={setAuthenticated}
            setIsLoginPage={setIsLoginPage}
            setIsPremiumUser={setIsPremiumUser}
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
