import React, { useState } from "react";
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Expenses from "../components/Expenses";
import ReportGeneration from "../components/ReportGeneration";
import PaymentRequest from "../components/PaymentRequest";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const [isLeaderBoardShown, setIsLeaderBoardShown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${userInfo.name}, you are the ${
              userInfo.isPremiumUser ? "Premium" : "basic"
            } user of Expense Tracker`}
          </Typography>
          <ReportGeneration
            userInfo={userInfo}
            isPremiumUser={userInfo.isPremiumUser}
          />
          <PaymentRequest
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            isLeaderBoardShown={isLeaderBoardShown}
            setIsLeaderBoardShown={setIsLeaderBoardShown}
          />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 14 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Expenses
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isLeaderBoardShown={isLeaderBoardShown}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
