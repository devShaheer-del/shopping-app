import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home';
import Category from './views/Category';
import Products from './views/Products';
import Admin from './views/Admin';
import SideBar from './Components/SideBar';
import Login from './views/Login';
import Protector from './Components/Protector';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/'; // Hide sidebar on login page

  return (
    <div className="d-flex">
      {!hideSidebar && <SideBar />}
      <div className="content flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Protector Component={Home} />} />
          <Route path="/category" element={<Protector Component={Category} />} />
          <Route path="/products" element={<Protector Component={Products} />} />
          <Route path="/admin" element={<Protector Component={Admin} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
