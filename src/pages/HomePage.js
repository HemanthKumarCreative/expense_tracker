import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import Expenses from "../components/Expenses";
import ReportGeneration from "../components/ReportGeneration";
import PaymentRequest from "../components/PaymentRequest";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ReportHistoryTable from "../components/ReportsDownloads";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const [isLeaderBoardShown, setIsLeaderBoardShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllDownloads = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/downloads/${userInfo.id}`
        );
        const data = await response.json();
        console.log({ data });
      } catch (err) {
        console.error(err);
      }
    };
    getAllDownloads();
  }, []);

  const reportData = [
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
    {
      date: "22/10/2023",
      time: "5:30 AM",
      fileLink:
        "https://expensetracker250923.s3.amazonaws.com/expense_report6ed575f9-210b-4302-8f2c-324fc0ee32279%3A08%3A38+am.xlsx",
    },
  ];

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
          {userInfo.isPremiumUser ? (
            <ReportGeneration
              userInfo={userInfo}
              isPremiumUser={userInfo.isPremiumUser}
            />
          ) : (
            <></>
          )}
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
          <Grid item xs={12} md={6}>
            <ReportHistoryTable reportData={reportData} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
