import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token"); // Clear token if stored in localStorage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: "primary.main",
        width: "100%"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Dashboard Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
        >
          Employee Management Dashboard
        </Typography>

        {/* Logout Button */}
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{ display: { xs: "none", sm: "block" } }} // Hide on small screens
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
