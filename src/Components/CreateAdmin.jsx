import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast'
function CreateAdmin() {
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin", // Default role is 'admin'
    });

    // Handle Input Change
    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();


        const url = "http://localhost:8080/admin/create";
        const response = await axios.post(url, adminData);


        if (response.data) {
            toast.success("Admin Created Successfully");
        }

        console.log("Admin Created:", adminData);
        // API CALL yahan implement karni hai
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Create Admin</h2>

            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                {/* Admin Name */}
                <div className="mb-3">
                    <label className="form-label">Admin Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={adminData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Admin Email */}
                <div className="mb-3">
                    <label className="form-label">Admin Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={adminData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Admin Password */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={adminData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Select Role</label>
                    <select
                        className="form-select"
                        name="role"
                        value={adminData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Create Admin
                </button>
            </form>
        </div>
    );
}

export default CreateAdmin;
