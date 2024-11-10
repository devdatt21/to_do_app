import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTasks();
      setFormData({ title: "", description: "", priority: "low", dueDate: "" });
    } catch (error) {
      console.error("Error adding task:", error.response?.data?.message || error.message);
      alert("Failed to add task");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" color="primary" align="center">
        Add New Task
      </Typography>

      <TextField
        name="title"
        label="Title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        variant="outlined"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
      />

      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="dueDate"
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
