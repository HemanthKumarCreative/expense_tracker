import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Cookies from "js-cookie"; // Import js-cookie

import React, { useState, useEffect } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const userInfo = JSON.parse(Cookies.get("userInfo"));

  useEffect(() => {
    // Fetch expenses from the backend

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
    <>
      <ExpenseForm
        expenses={expenses}
        setExpenses={setExpenses}
        userInfo={userInfo}
      />
      {expenses.length ? (
        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
          userInfo={userInfo}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Expenses;
