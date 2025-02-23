import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const obj = Object.fromEntries(formData.entries());

            console.log("Form Data:", obj);

            const url = "http://localhost:8080/user/userLogin";

            const response = await axios.post(url, obj);

            if (response.status === 200 || response.status === 201) {
                const { token, UserName } = response.data;

                localStorage.setItem('Usertoken', token);
                localStorage.setItem('UserName', UserName);

                toast.success("Login Successfully");

                setTimeout(() => {
                    window.location.href = "/"
                }, 3000);
                // No need for setTimeout
            } else {
                toast.error("Invalid Email and Password");
            }
        } catch (error) {
            console.error("Login Error:", error);

            if (error.response) {
                toast.error(error.response.data.message || "Login Failed");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter your email"
                            name="email"
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="d-grid gap-2">
                        <Link to="/SignupPage" className="text-center text-decoration-none mt-4">
                            I don't have an Account ?
                        </Link>
                    </div>
                    <div className="text-center mt-3">
                        <a href="#forgot-password" className="text-decoration-none">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
