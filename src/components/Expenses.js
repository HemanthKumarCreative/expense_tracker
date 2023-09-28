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
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchExpenses = async () => {
    const userId = userInfo.id;
    const page = currentPage || 1; // Get the current page from state, default to 1

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${userId}?page=${page}`
      );

      const data = await response.json();
      setExpenses(data.expenses);

      // Update total pages if available in the response
      if (data.totalPages !== undefined) {
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} style={{ marginTop: "2rem" }}>
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          userInfo={userInfo}
          fetchExpenses={fetchExpenses}
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
              currentPage={currentPage}
              setPage={setPage}
              totalPages={totalPages}
              fetchExpenses={fetchExpenses}
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
