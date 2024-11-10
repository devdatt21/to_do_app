import React, { useContext } from "react";
import TaskList from "../components/task/taskList";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const Tasks = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" color="primary">
          To-Do App
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <TaskList />
    </Container>
  );
};

export default Tasks;
