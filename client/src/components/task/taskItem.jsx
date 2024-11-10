import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${task._id}`, {
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
        `http://localhost:4000/api/tasks/${task._id}`,
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
        `http://localhost:4000/api/tasks/${task._id}`,
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
    <div className={`task-item ${task.completed ? "completed" : ""}`} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
      {isEditing ? (
        <>
          <input
            name="title"
            placeholder="Title"
            value={updatedTask.title}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={updatedTask.description}
            onChange={handleChange}
          />
          <select name="priority" value={updatedTask.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
          <input
            name="dueDate"
            type="date"
            value={updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString().split("T")[0] : ""}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3 style={{ fontWeight: "bold" }}>{task.title}</h3>
          <p><strong>Description:</strong> {task.description || "No description"}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleToggleComplete}>
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;