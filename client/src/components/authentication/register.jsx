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

  // API URL using environment variable
  const API_URL = `${import.meta.env.VITE_API_URL}/api/users/register`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("Sending registration request:", formData);
      const response = await axios.post(API_URL, formData, {
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
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#1c3a57", fontWeight: "bold" }} 
          align="center"
        >
          Register
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ backgroundColor: "#f8d7da", color: "#721c24" }} 
          >
            {error}
          </Alert>
        )}

        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1c3a57", 
              },
              "&:hover fieldset": {
                borderColor: "#2e5a84", 
              },
            },
          }}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1c3a57", 
              },
              "&:hover fieldset": {
                borderColor: "#2e5a84", 
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1c3a57", 
            "&:hover": {
              backgroundColor: "#2e5a84", 
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
