import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "" // Password is blank by default
    });
    const [orders, setOrders] = useState([]); // To store order history

    useEffect(() => {
        const data = localStorage.getItem("User");

        if (data) {
            const userData = JSON.parse(data);
            setUserData({
                name: userData.name || "",
                email: userData.email || "",
                password: "" // never show saved password
            });

            // Fetch the user's orders (assuming an API endpoint for order history)
            const userId = userData._id;
            if (userId) {
                fetch(`http://localhost:8080/orders/user/${userId}`)
                    .then((res) => res.json())
                    .then((data) => setOrders(data.orders || []))
                    .catch((error) => console.error("Error fetching orders:", error));
            }
        }
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let userId = null;
            const loggedUser = localStorage.getItem("User");

            if (loggedUser) {
                const userObj = JSON.parse(loggedUser);
                userId = userObj._id;
            }

            if (!userId) {
                toast.error("User ID not found.");
                return;
            }

            const response = await fetch(`http://localhost:8080/user/userUpdate/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Profile updated successfully!");
                localStorage.setItem("User", JSON.stringify(result.updatedUser));
                setUserData((prev) => ({ ...prev, password: "" }));
            } else {
                toast.error(result.message || "Update failed");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="container">
            <div className="row m-5">
                {/* Sidebar */}
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
                            <li
                                className={`p-2 ${activeTab === "orders" ? "bg-primary text-white" : ""}`}
                                onClick={() => setActiveTab("orders")}
                                style={{ cursor: "pointer" }}
                            >
                                Order History
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
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
                                        value={userData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter new password (leave empty to keep old one)"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="p-4 bg-white border rounded">
                            <h3>Order History</h3>
                            {orders.length === 0 ? (
                                <p>No orders found.</p>
                            ) : (
                                <ul className="list-group">
                                    {orders.map((order) => (
                                        <li key={order._id} className="list-group-item">
                                            <h5>Order #{order.orderNumber}</h5>
                                            <p>Status: {order.status}</p>
                                            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
