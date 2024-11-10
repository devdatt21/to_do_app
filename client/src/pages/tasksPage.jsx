import React, { useContext } from "react";
import TaskList from "../components/task/taskList";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
};

export default Tasks;
