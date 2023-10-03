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
    <TableContainer
      component={Paper}
      style={{ padding: "20px", margin: "20px", width: "80%" }}
    >
      <h2 style={{ marginBottom: "10px" }}>
        Expense Reports Generation History
      </h2>
      <Table style={{ width: "65%" }}>
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
                  style={{ margin: "5px" }}
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
