import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const url = "http://localhost:8080/admin/adminLogin";
      const response = await axios.post(url, { name, password });

      // Extract data from response
      const { success, message, Admin } = response.data;

      if (success) {
        // Store Admin name in localStorage
        localStorage.setItem("AdminName", Admin);
        toast.success("Admin Login Successfully");

        setTimeout(() => {
          navigate('/home')
        }, 3000);

      } else {
        toast.error(message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="text-center mb-4">Admin Panel</h2>
        <form className="admin-form" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              name="name" // ✅ Fixed
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
