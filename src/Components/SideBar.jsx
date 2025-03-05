import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ adminName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [admin, setadmin] = useState("");
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {

    const AdminName = localStorage.getItem("AdminName");

    if (!adminName) {
      console.log('admin was not avalible')
    }

    setadmin(AdminName);

  }, [])


  const handleLogout = async () => {
    const logoutAdmin = localStorage.removeItem("AdminName");

    navigate('/');

  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 d-flex flex-column justify-content-between ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
        style={{ minHeight: "100vh" }}
      >
        <div>
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-white">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/category" className="nav-link text-white">
                📂 Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link text-white">
                🛒 Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-white">
                👨‍💼 Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Info & Logout */}
        <div className="admin-footer text-center p-2 bg-secondary rounded">
          <p className="mb-1 fw-bold">{`Welcome  ${admin}`}</p>
          <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
