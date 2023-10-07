import React from "react";
import { Button, Box } from "@mui/material";

const ReportGeneration = ({
  isPremiumUser,
  userInfo,
  getAllDownloads,
  expenses,
}) => {
  const storeToDB = async (reportUrl) => {
    // db related api calls
    const downloadRecord = {
      user_id: userInfo.id,
      file_link: reportUrl,
    };
    console.log({ downloadRecord });
    try {
      const response = await fetch(
        `http://localhost:5000/api/downloads/${userInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(downloadRecord),
        }
      );
      const data = await response.json();
      if (data) {
        getAllDownloads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    const userId = userInfo.id;
    console.log({ userId });
    try {
      const response = await fetch(
        `http://localhost:5000/api/reports/${userId}`
      );
      const data = await response.json();
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
        disabled={!isPremiumUser || expenses.length === 0}
      >
        Download Expenses
      </Button>
    </Box>
  );
};

export default ReportGeneration;
