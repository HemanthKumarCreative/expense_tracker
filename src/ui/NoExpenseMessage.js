import React from "react";
import { Box, Typography } from "@mui/material";

const NoExpensesMessage = () => {
  return (
    <Box mt={2} textAlign="center">
      <Typography variant="subtitle1">No Expenses Added</Typography>
    </Box>
  );
};

export default NoExpensesMessage;
