import React from "react";
import { Box, Typography } from "@mui/material";

const NoExpensesMessage = () => {
  return (
    <Box
      mt={2}
      textAlign="center"
      p={2}
      bgcolor="#f5f5f5"
      borderRadius={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="subtitle1" color="#333333">
        No Expenses Added
      </Typography>
    </Box>
  );
};

export default NoExpensesMessage;
