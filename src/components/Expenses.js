import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

import React, { useState, useEffect } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      const expenseId = JSON.parse(localStorage.getItem("token")).id;
      try {
        const response = await fetch(
          `http://localhost:5000/api/expenses/${expenseId}`
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
      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
      {expenses.length ? (
        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Expenses;
