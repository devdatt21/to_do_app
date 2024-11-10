import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sortedTasks = sortTasks(response.data);
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data?.message || error.message);
      alert("Failed to fetch tasks");
    }
  };

  const sortTasks = (tasks) => {
    // Sort tasks: high priority first, then low priority, and move completed tasks to the bottom
    return tasks
      .sort((a, b) => {
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
    <div>
      <TaskForm fetchTasks={fetchTasks} />
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />)
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;