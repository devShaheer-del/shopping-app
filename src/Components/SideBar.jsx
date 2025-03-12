import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ adminName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [admin, setAdmin] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleProduct = () => setIsProductOpen(!isProductOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const AdminName = localStorage.getItem("AdminName");
    if (!adminName) {
      console.log("admin was not available");
    }
    setAdmin(AdminName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("AdminName");
    navigate("/");
  };

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
              <Link to="/home" className="nav-link text-white">🏠 Home</Link>
            </li>
            
            {/* Category Dropdown */}
            <li className="nav-item">
              <button className="nav-link text-white bg-transparent border-0 w-100 text-start" onClick={toggleCategory}>
                📂 Categories {isCategoryOpen ? "▼" : "▶"}
              </button>
              {isCategoryOpen && (
                <ul className="nav flex-column ps-3">
                  <li className="nav-item">
                    <Link to="/category" className="nav-link text-white">📁 Add Category</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/allCategory" className="nav-link text-white">📑 All Categories</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Product Dropdown */}
            <li className="nav-item">
              <button className="nav-link text-white bg-transparent border-0 w-100 text-start" onClick={toggleProduct}>
                🛒 Products {isProductOpen ? "▼" : "▶"}
              </button>
              {isProductOpen && (
                <ul className="nav flex-column ps-3">
                  <li className="nav-item">
                    <Link to="/addProduct" className="nav-link text-white">➕ Add Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/showProducts" className="nav-link text-white">📋 Show Products</Link>
                  </li>
                </ul>
              )}
            </li>
            
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-white">👨‍💼 Admin</Link>
            </li>
          </ul>
        </div>

        {/* Admin Info & Logout */}
        <div className="admin-footer text-center p-2 bg-secondary rounded">
          <p className="mb-1 fw-bold">{`Welcome ${admin}`}</p>
          <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;