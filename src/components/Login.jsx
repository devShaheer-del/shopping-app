import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";  // Import useAuth

function Login() {
    const { setAuth } = useAuth();  // Use context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const obj = Object.fromEntries(formData.entries());

            const url = "http://localhost:8080/user/userLogin";
            const response = await axios.post(url, obj);

            if (response.status === 200 || response.status === 201) {
                const { token, UserName, user, userId } = response.data;

                // Store in localStorage
                localStorage.setItem("Usertoken", token);
                localStorage.setItem("UserName", UserName);
                localStorage.setItem("User", JSON.stringify(user));
                localStorage.setItem("id", userId);

                // Update global state
                setAuth({ user: UserName, token });

                toast.success("Login Successfully");
                navigate("/");  // No need for window.location.reload()
            } else {
                toast.error("Invalid Email and Password");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="text-center mt-3">
                        <Link to="/SignupPage">I don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
