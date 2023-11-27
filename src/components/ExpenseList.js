import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import DeleteButton from "../ui/Delete";
import axios from "axios";

const ExpenseList = ({
  expenses,
  currentPage,
  setPage,
  totalPages,
  fetchExpenses,
  userInfo,
}) => {
  const getTotalExpense = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/${userInfo.id}`
      );
      const totalExpense = await response.data.body.totalExpenses;
      return totalExpense;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTotalExpense = async (expense) => {
    try {
      const totalExpense = await getTotalExpense();
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/${userInfo.id}`,
        { totalExpenses: parseInt(totalExpense) - parseInt(expense) }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (expense) => {
    const expenseId = expense.id;
    const expenseAmount = expense.amount;
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/expense/${expenseId}`
      );

      if (response.statusText === "OK") {
        await response.data;
        updateTotalExpense(expenseAmount);
        fetchExpenses();

        if (expenses?.length === 1 && currentPage > 1) {
          setPage(currentPage - 1);
        }
      } else {
        const errorData = await response.data;
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const incrementPage = () => {
    setPage(parseInt(currentPage) + 1);
  };
  const decrementPage = () => {
    setPage(parseInt(currentPage) - 1);
  };
  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: 4, marginBottom: 4, height: "20rem" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Expense List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"Amount ( $ )"}</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ height: "13rem" }}>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>
                <DeleteButton
                  id={expense.id}
                  onClick={() => handleDelete(expense)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentPage > 1 && (
        <Button onClick={() => decrementPage()}>Previous</Button>
      )}
      {currentPage < totalPages && (
        <Button onClick={() => incrementPage()}>Next</Button>
      )}
    </Container>
  );
};

export default ExpenseList;
