import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
function Header() {
    const { auth, setAuth } = useAuth();  // Get auth state
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("UserName");
        localStorage.removeItem("Usertoken");
        localStorage.removeItem("User");
        setAuth({ user: null, token: null });  // Clear auth state
        toast.success("User LogOut Success");
        navigate("/Login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={Logo} style={{ height: "12vh" }} alt="Logo" />
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-link active">About</Link>
                        </li>
                        {auth.user && (
                            <li className="nav-item">
                                <Link to="/Shop" className="nav-link active">Shop</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link to="/Service" className="nav-link active">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Contact" className="nav-link active">Contact</Link>
                        </li>

                        {auth.user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/Dashboard" className="nav-link active">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Cart" className="nav-link active">Cart ({cart.length})</Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link active fw-bold">Welcome, {auth.user}</span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger btn-sm ms-2">Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link to="/Login" className="nav-link active">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
