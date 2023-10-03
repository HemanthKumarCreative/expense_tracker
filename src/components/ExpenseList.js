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

const ExpenseList = ({
  expenses,
  setExpenses,
  currentPage,
  setPage,
  totalPages,
  fetchExpenses,
}) => {
  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Expense Deleted:", data);
        fetchExpenses();

        // Check if the last expense on the current page was deleted
        if (expenses.length === 1 && currentPage > 1) {
          setPage(currentPage - 1); // Go back a page if possible
        }
      } else {
        const errorData = await response.json();
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
