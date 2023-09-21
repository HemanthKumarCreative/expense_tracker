import React, { useState } from "react";
import { CssBaseline, Container, Button, Box, Grid } from "@mui/material";
import Login from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import Expenses from "./components/Expenses";
import PaymentRequest from "./components/PaymentRequest";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

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
                <PaymentRequest />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Expenses />
            </Box>
          </>
        ) : (
          <Login setAuthenticated={setAuthenticated} />
        )}
      </Box>
    </Container>
  );
};

export default App;
