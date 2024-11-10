import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {

    console.log("home");
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return (
    <div className="home-page">

      <h1>Welcome to the Fullstack To-Do App</h1>
      <p>Manage your tasks efficiently with our simple and intuitive interface.</p>

      <div className="home-buttons">
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;