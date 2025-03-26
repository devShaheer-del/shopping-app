import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "" // ✅ Password field empty by default
    });

    useEffect(() => {
        const data = localStorage.getItem("User");

        if (data) {
            const userData = JSON.parse(data);
            setUserData({
                name: userData.name || "",
                email: userData.email || "",
                password: "" // ✅ Don't show hashed password
            });
        }
    }, []);


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const id = localStorage.getItem('id');
            const response = await fetch(`http://localhost:8080/user/userUpdate/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (response.ok) {
                toast("Profile updated successfully!");
            } else {
                toast(result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container">
            <div className="row m-5">
                {/* ✅ Sidebar */}
                <div className="col-md-3">
                    <div className="navigates p-3 bg-light border rounded">
                        <ul className="list-unstyled">
                            <li
                                className={`p-2 ${activeTab === "profile" ? "bg-primary text-white" : ""}`}
                                onClick={() => setActiveTab("profile")}
                                style={{ cursor: "pointer" }}
                            >
                                User Profile
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ✅ Main Content */}
                <div className="col-md-6">
                    {activeTab === "profile" && (
                        <div className="p-4 bg-white border rounded">
                            <h3>Update Profile</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Update your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Update your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter new password (leave empty to keep old one)"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
