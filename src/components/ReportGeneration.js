import React from "react";
import { Button, Box } from "@mui/material";
import base_url from "../utils/url";
const ReportGeneration = ({ isPremiumUser, userInfo, getAllDownloads }) => {
  const storeToDB = async (reportUrl) => {
    // db related api calls
    const downloadRecord = {
      user_id: userInfo.id,
      file_link: reportUrl,
    };
    console.log({ downloadRecord });
    try {
      const response = await fetch(`${base_url}/api/downloads/${userInfo.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadRecord),
      });
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
    try {
      const response = await fetch(`${base_url}/api/reports/${userId}`);
      const data = await response.json();
      const reportUrl = data.report_url;
      await storeToDB(reportUrl);
      // Open the URL in a new tab
      window.open(reportUrl, "_blank");
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
        disabled={!isPremiumUser}
      >
        Download Expenses
      </Button>
    </Box>
  );
};

export default ReportGeneration;
