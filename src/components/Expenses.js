import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

import React, { useState, useEffect } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses");
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
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </>
  );
}

export default Expenses;
