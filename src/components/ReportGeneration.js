import React from "react";
import { Button, Box } from "@mui/material";

const ReportGeneration = ({ isPremiumUser, userInfo }) => {
  const storeToDB = async (reportUrl) => {
    // db related api calls
    try {
      const response = await fetch(
        `http://localhost:5000/api/downloads/${userInfo.id}`,
        { method: "POST", body: { user_id: userInfo.id, file_link: reportUrl } }
      );
      const data = await response.json();
      console.log({ data });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    const userId = userInfo.id;
    try {
      const response = await fetch(
        `http://localhost:5000/api/reports/${userId}`
      );
      const data = await response.json();
      const reportUrl = data.report_url;
      // await storeToDB(reportUrl);
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
