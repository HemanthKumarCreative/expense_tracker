import React from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const ReportHistoryTable = ({ downloads }) => {
  return (
    <TableContainer component={Paper}>
      <h2>Expense Reports Generation History</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {downloads.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.time}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  href={report.fileLink}
                  download={true}
                >
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportHistoryTable;
