import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import toast from 'react-hot-toast';

function Header() {
    const [userName, setUserName] = useState(null);
    const [token, Settoken] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedUser = localStorage.getItem('UserName');
        const storedToken = localStorage.getItem('Usertoken');
        if (storedUser) {
            setUserName(storedUser);
            Settoken(storedToken)
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('UserName');
        localStorage.removeItem('Usertoken');
        localStorage.removeItem('User')
        setUserName(null);
        Settoken(null);
        navigate('/Login');
        toast.success("User LogOut Success")
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={Logo} style={{ height: '12vh' }} alt="Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-link active">About</Link>
                        </li>

                        {
                            userName ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/Shop" className="nav-link active">Shop</Link>
                                    </li>

                                </>
                            ) : (
                                <>

                                </>
                            )
                        }
                        <li className="nav-item">
                            <Link to="/Service" className="nav-link active">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Contact" className="nav-link active">Contact</Link>
                        </li>
                        {userName ? (
                            <>

                                <li className="nav-item">
                                    <Link to="/Dashboard" className="nav-link active">DashBoard</Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link active fw-bold">Welcome, {userName}</span>
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
