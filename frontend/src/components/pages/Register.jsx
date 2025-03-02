import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", input, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        setError(res.data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration failed", error.res.data || error.message);
      setError(error.res.data?.message || "Registration failed. Please try again.");
    }
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <TextField
            label="Full Name"
            name="fullname"
            type="text"
            variant="outlined"
            fullWidth
            value={input.fullname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={input.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={input.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component="button" variant="body2" onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
