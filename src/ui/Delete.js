import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onClick, id }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      size="small"
      id={id}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
