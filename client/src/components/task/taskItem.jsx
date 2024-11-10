import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = async () => {
    try {
        
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data?.message || error.message);
      alert("Failed to delete task");
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data?.message || error.message);
      alert("Failed to update task");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        updatedTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Task updated successfully!");
      fetchTasks();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error.response?.data?.message || error.message);
      alert("Failed to update task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        {isEditing ? (
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              value={updatedTask.title}
              onChange={handleChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              value={updatedTask.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={updatedTask.priority}
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
              value={updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {task.description || "No description"}
            </Typography>
            <Typography variant="body2">
              <strong>Priority:</strong> {task.priority}
            </Typography>
            <Typography variant="body2">
              <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant="contained"
                color={task.completed ? "warning" : "success"}
                onClick={handleToggleComplete}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
