import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { saveAs } from "file-saver";

const ReportGeneration = ({ isPremiumUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch expenses and incomes data from the backend
    // Update the 'data' state with the fetched data
  }, []);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    saveAs(blob, "expenses.json");
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
