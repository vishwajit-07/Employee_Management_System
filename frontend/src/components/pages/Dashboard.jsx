import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import EmployeeTable from "../EmployeeTable";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/add-employee"); // Navigate to EmployeeForm route
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      
      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 10, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Employee
        </Button>
      </Box>

      {/* Employee Details Heading */}
      <Typography 
        variant="h5" 
        align="center" 
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Employee's Details
      </Typography>
      <EmployeeTable/>

      {/* Employee Table
      <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Last Company</strong></TableCell>
              <TableCell><strong>Joining Date</strong></TableCell>
              <TableCell><strong>Resignation Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.lastCompany}</TableCell>
                <TableCell>{employee.joiningDate}</TableCell>
                <TableCell>{employee.resignationDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Container>
  );
};

export default Dashboard;
