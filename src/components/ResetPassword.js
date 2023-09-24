import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const ResetPasswordForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword === formData.confirmPassword) {
      handleSubmit(formData.newPassword);
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordForm;
