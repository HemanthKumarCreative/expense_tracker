import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Cookies from "js-cookie"; // Import js-cookie
import ForgotPasswordForm from "./ForgetPassword";
const LoginForm = ({ setAuthenticated, setIsLoginPage, setUserInfo }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isForgetPasswordPage, setIsForgetPasswordPage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Store userInfo in cookies
        Cookies.set("userInfo", JSON.stringify(data.user));
        Cookies.set("token", JSON.stringify(data.token));
        setAuthenticated(true);
        setUserInfo(data.user);
        console.log("Login successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageSwitch = () => {
    setIsLoginPage(false);
  };

  const handleForgetPassword = () => {
    setIsForgetPasswordPage(true);
  };

  return (
    <Container>
      {!isForgetPasswordPage ? (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handlePageSwitch}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleForgetPassword}
              >
                Forget Password
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <ForgotPasswordForm
            setIsForgetPasswordPage={setIsForgetPasswordPage}
          />
        </>
      )}
    </Container>
  );
};

export default LoginForm;
