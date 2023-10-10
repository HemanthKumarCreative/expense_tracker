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
}) => {
  const handleDelete = async (expenseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${expenseId}`
      );

      if (response.statusText === "OK") {
        await response.data;
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
                  onClick={() => handleDelete(expense.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentPage > 1 && (
        <Button onClick={() => setPage(currentPage - 1)}>Previous</Button>
      )}
      {currentPage < totalPages && (
        <Button onClick={() => setPage(currentPage + 1)}>Next</Button>
      )}
    </Container>
  );
};

export default ExpenseList;
