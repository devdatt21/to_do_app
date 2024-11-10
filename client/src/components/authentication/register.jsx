import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {
      console.log("Sending registration request:", formData);
      const response = await axios.post("http://localhost:4000/api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registration response:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;