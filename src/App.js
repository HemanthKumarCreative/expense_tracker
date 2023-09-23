import React, { useState, useEffect } from "react";
import { CssBaseline, Container, Button, Box, Grid } from "@mui/material";
import Login from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import Expenses from "./components/Expenses";
import PaymentRequest from "./components/PaymentRequest";
import Cookies from "js-cookie"; // Import js-cookie

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    Cookies.get("token") ? true : false
  );

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isLeaderBoardShown, setIsLeaderBoardShown] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    setAuthenticated(false);
  };

  return (
    <Container component="main" maxWidth="sm">
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
                <PaymentRequest
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  isLeaderBoardShown={isLeaderBoardShown}
                  setIsLeaderBoardShown={setIsLeaderBoardShown}
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Expenses
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLeaderBoardShown={isLeaderBoardShown}
              />
            </Box>
          </>
        ) : isLoginPage ? (
          <Login
            setAuthenticated={setAuthenticated}
            setIsLoginPage={setIsLoginPage}
            setUserInfo={setUserInfo}
          />
        ) : (
          <SignUp
            setAuthenticated={setAuthenticated}
            setIsLoginPage={setIsLoginPage}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
