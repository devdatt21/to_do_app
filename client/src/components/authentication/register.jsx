import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

//   const API_URL = `${import.meta.env.VITE_API_URL}/api/users/login`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("Sending registration request:", formData);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Registration response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 4,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" color="primary" align="center">
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
