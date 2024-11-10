import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect to tasks page if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to the Fullstack To-Do App
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Manage your tasks efficiently with our simple and intuitive interface.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3 }}>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" size="large">
            Register
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" size="large">
            Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
