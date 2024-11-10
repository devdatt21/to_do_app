
import React, { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:4000/api/tasks", formData, {
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
    <form onSubmit={handleSubmit}>
      
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>
      
      <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
      
      <button type="submit">Add Task</button>
    
    </form>
  );
};

export default TaskForm;