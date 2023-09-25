import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Cookies from "js-cookie";
import UserList from "../components/UserList";
import NoExpensesMessage from "../ui/NoExpenseMessage";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

function Expenses({ isLeaderBoardShown }) {
  const [expenses, setExpenses] = useState([]);
  const userInfo = JSON.parse(Cookies.get("userInfo"));

  useEffect(() => {
    const fetchExpenses = async () => {
      const userId = userInfo.id;
      try {
        const response = await fetch(
          `http://localhost:5000/api/expenses/${userId}`
        );
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          userInfo={userInfo}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isLeaderBoardShown &&
          (expenses.length ? (
            <ExpenseList
              expenses={expenses}
              setExpenses={setExpenses}
              userInfo={userInfo}
            />
          ) : (
            <NoExpensesMessage />
          ))}
        {isLeaderBoardShown && <UserList />}
      </Grid>
    </Grid>
  );
}

export default Expenses;
