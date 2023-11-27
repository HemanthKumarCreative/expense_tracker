import React from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";

const ReportGeneration = ({
  isPremiumUser,
  userInfo,
  getAllDownloads,
  expenses,
}) => {
  const storeToDB = async (reportUrl) => {
    const downloadRecord = {
      userId: userInfo.id,
      fileLink: reportUrl,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/download`,
        downloadRecord
      );
      const data = await response.data;
      if (data) {
        getAllDownloads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    const userId = userInfo.id;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/report/${userId}`
      );
      console.log({ response });
      const data = await response.data.body;
      const reportUrl = data?.report_url;
      if (reportUrl !== undefined) {
        await storeToDB(reportUrl);
        window.open(reportUrl, "_blank");
      }
      // Open the URL in a new tab
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownload}
        disabled={!isPremiumUser || expenses?.length === 0}
      >
        Download Expenses
      </Button>
    </Box>
  );
};

export default ReportGeneration;
