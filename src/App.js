import React, { useState } from "react";
import { CssBaseline, Container } from "@mui/material";
import Login from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import Expenses from "./components/Expenses";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        {authenticated ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Expenses />
          </>
        ) : (
          <Login setAuthenticated={setAuthenticated} />
        )}
      </div>
    </Container>
  );
};

export default App;
