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

function formatTimestamp(timestamp) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(timestamp).toLocaleDateString(undefined, options);
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: date,
    time: time,
  };
}

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const [isLeaderBoardShown, setIsLeaderBoardShown] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const navigate = useNavigate();

  const getAllDownloads = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/downloads/${userInfo.id}`
      );
      let data = await response.json();
      data = data.map((download) => {
        const updatedDownload = {};
        updatedDownload.id = download.id;
        const dateTimeObject = formatTimestamp(download.createdAt);
        updatedDownload.date = dateTimeObject.date;
        updatedDownload.time = dateTimeObject.time;
        updatedDownload.fileLink = download.file_link;
        return updatedDownload;
      });
      setDownloads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllDownloads();
  }, []);

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
              getAllDownloads={getAllDownloads}
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
          {downloads.length ? (
            <Grid item xs={12} md={6}>
              <ReportHistoryTable downloads={downloads} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
