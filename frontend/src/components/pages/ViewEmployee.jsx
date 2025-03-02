import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import Navbar from "./Navbar";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/view/${id}`, { withCredentials: true });
      console.log("Employee Data:", res.data); // Debugging
      setEmployee(res.data.employee);
      setHistory(res.data.employee.history || []); // Assuming `history` exists in API response
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (value) => {
    if (!value) return "N/A"; // If no value, return "N/A"

    // Check if value is a date string (ISO format)
    if (typeof value === "string" && value.includes("T")) {
      return value.split("T")[0].split("-").reverse().join("/"); // Convert to dd/mm/yyyy
    }

    // Check if value is a Date object
    if (value instanceof Date) {
      return value.toLocaleDateString("en-GB"); // Convert Date object to dd/mm/yyyy
    }

    return value; // Return value as-is if it's not a date
  };


  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Employee Details
          </Typography>
          <Typography sx={{ mb: 1 }}><strong>Name:</strong> {employee?.name}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Email:</strong> {employee?.email}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Experience:</strong> {employee?.experience || "Fresher"} years</Typography>
          <Typography sx={{ mb: 1 }}><strong>Address:</strong> {employee?.address}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Last Company:</strong> {employee?.lastCompany || "N/A"}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Joining Date:</strong> {new Date(employee?.joiningDate).toLocaleDateString()}</Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Resignation Date:</strong> {employee?.resignationDate
              ? new Date(employee.resignationDate).toLocaleDateString()
              : "Still Working"}
          </Typography>

          {/* Employee History Section */}
          <Typography variant="h6" sx={{ mt: 4 }}>Change History</Typography>
          {history.length > 0 ? (
            <List sx={{ mt: 1 }}>
              {history.map((record, index) => (
                <div key={index}>
                  <ListItem>
                    <Typography variant="body2">
                      <strong>
                        {record.date
                          ? record.date.split("T")[0].split("-").reverse().join("/")
                          : "N/A"}
                      </strong> -
                      <strong> {record.field.charAt(0).toUpperCase() + record.field.slice(1)}:</strong>
                      changed from
                      <strong> {formatDate(record.oldValue)}</strong> to
                      <strong> {formatDate(record.newValue)}</strong>
                    </Typography>
                  </ListItem>
                  {index < history.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
              No changes recorded.
            </Typography>
          )}


          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewEmployee;
