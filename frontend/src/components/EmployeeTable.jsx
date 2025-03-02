import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchEmployees from "../hooks/useFetchAllEmployees.jsx"; // Custom hook
import { toast } from "sonner"; // Import toast for notifications
import { setEmployees } from "../redux/employeeSlice.js";

const EmployeeTable = () => {
  useFetchEmployees(); // Fetch employees when component mounts
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employees = [], error } = useSelector((store) => store.employees);
  const [filterEmployees, setFilterEmployees] = useState([]);

  useEffect(() => {
    setFilterEmployees(employees);
  }, [employees]); // Update filtered employees when employees change

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleView = () => {
    if (selectedEmployee) navigate(`/employee/${selectedEmployee._id}`);
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (selectedEmployee) navigate(`/employee/update/${selectedEmployee._id}`);
    handleMenuClose();
  };

  const handleDelete = async (empId) => {
    if (!selectedEmployee) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/employee/delete/${empId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const updatedEmployees = filterEmployees.filter(
          (employee) => employee._id !== empId
        );
        setFilterEmployees(updatedEmployees);
        dispatch(setEmployees(updatedEmployees));
        toast.success("Employee deleted successfully!");
      } else {
        toast.error("Server problem");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee.");
    }

    handleMenuClose();
  };

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error}</Alert>}
      {!error && filterEmployees.length === 0 && (
        <Alert severity="info">No employees found</Alert>
      )}
      {!error && filterEmployees.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Previous/Current Company</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Resign Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterEmployees.map((emp, index) => (
              <TableRow key={emp._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.address}</TableCell>
                <TableCell>{emp.experience || "Fresher"}</TableCell>
                <TableCell>{emp.lastCompany}</TableCell>
                <TableCell>
                  {new Date(emp.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(emp.resignationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, emp)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleView}>View history</MenuItem>
                    <MenuItem onClick={handleUpdate}>Update</MenuItem>
                    <MenuItem onClick={handleDelete}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default EmployeeTable;
