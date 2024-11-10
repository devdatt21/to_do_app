import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { Box, Typography, List, CircularProgress } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sortedTasks = sortTasks(response.data);
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data?.message || error.message);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = (tasks) => {
    // Sort tasks: high priority first, then low priority, and move completed tasks to the bottom
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Move completed tasks to the bottom
      }
      return a.priority === "high" && b.priority === "low" ? -1 : 1; // Sort by priority
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      {/* <Typography variant="h4" align="center" color="primary" gutterBottom>
        Task Manager
      </Typography> */}
      <TaskForm fetchTasks={fetchTasks} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        
        <List sx={{ mt: 2 }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                Your Tasks
            </Typography> 
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
          ))}
        </List>
      ) : (
        <Typography align="center" color="textSecondary" mt={2}>
          No tasks found.
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
