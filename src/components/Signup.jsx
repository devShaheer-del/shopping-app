import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Signup() {

    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData(e.target);
            const obj = Object.fromEntries(formData.entries());



            const url = "http://localhost:8080/user/userCreate";
            const response = await axios.post(url, obj, {
                method: 'POST'
            })

            if (response.status === 201 || response.status === 200) {
                toast.success(response.data.message);
                navigate('/Login')
            }
            else {
                toast.success(response.data.error);
                navigate('/SignupPage')

            }

        } catch (error) {

            toast.error(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', border: 'none', borderRadius: '15px' }}>
                <h2 className="card-title text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your full name"
                            style={{ borderRadius: '10px' }}
                            name='name'
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            style={{ borderRadius: '10px' }}
                            name='email'
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            style={{ borderRadius: '10px' }}
                            name='password'
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ borderRadius: '10px', fontWeight: 'bold' }}
                            onSubmit={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-3">
                        <Link to="/Login" className="text-decoration-none" style={{ color: '#007bff' }}>
                            I already have an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;