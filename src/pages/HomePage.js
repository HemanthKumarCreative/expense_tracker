import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React, { useState, useEffect } from "react";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import ReportGeneration from "../components/ReportGeneration";
import PaymentRequest from "../components/PaymentRequest";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ReportHistoryTable from "../components/ReportsDownloads";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import UserList from "../components/UserList";
import NoExpensesMessage from "../ui/NoExpenseMessage";
import axios from "axios";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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

axios.defaults.headers.common["Authorization"] = Cookies.get("token");
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel2");
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const [isLeaderBoardShown, setIsLeaderBoardShown] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllDownloads = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/download/${userInfo.id}`
      );
      let data = await response.data.body;
      data = data.map((download) => {
        const updatedDownload = {};
        updatedDownload.id = download.id;
        const dateTimeObject = formatTimestamp(download.createdAt);
        updatedDownload.date = dateTimeObject.date;
        updatedDownload.time = dateTimeObject.time;
        updatedDownload.fileLink = download.fileLink;
        return updatedDownload;
      });
      setDownloads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenses = async () => {
    const userId = userInfo.id;
    const page = currentPage || 1;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/expense/${userId}`
      );
      console.log(`Response from get all expenses`, response);
      const data = (await response.data.body) || [];
      setExpenses(data);

      if (data.totalPages !== undefined) {
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    navigate("/");
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    fetchExpenses();
    if (userInfo?.isPremiumUser) {
      getAllDownloads();
    }
  }, [currentPage]);

  return (
    <div>
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
              expenses={expenses}
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
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>ExpenseForm</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExpenseForm
              expenses={expenses}
              setExpenses={setExpenses}
              userInfo={userInfo}
              fetchExpenses={fetchExpenses}
              setExpanded={setExpanded}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              {!isLeaderBoardShown ? "Expense List" : "Leader Board"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!isLeaderBoardShown &&
              (expenses?.length ? (
                <ExpenseList
                  expenses={expenses}
                  setExpenses={setExpenses}
                  userInfo={userInfo}
                  currentPage={currentPage}
                  setPage={setPage}
                  totalPages={totalPages}
                  fetchExpenses={fetchExpenses}
                />
              ) : (
                <NoExpensesMessage />
              ))}
            {isLeaderBoardShown && <UserList />}
          </AccordionDetails>
        </Accordion>
        {userInfo?.isPremiumUser && (
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Reports Download History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {downloads?.length ? (
                <ReportHistoryTable downloads={downloads} />
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </Container>
    </div>
  );
}
