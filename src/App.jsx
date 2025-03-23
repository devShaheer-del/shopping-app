import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home';
import Category from './views/Category';
import Admin from './views/Admin';
import SideBar from './Components/SideBar';
import Login from './views/Login';
import Protector from './Components/Protector';
import AllCategories from './Components/AllCategories';
import CreateProducts from './Components/CreateProducts';
import UpdateCategory from './Components/UpdateCategory';
import Products from './Components/Products';
import ManageAdmin from './Components/MangeAdmin';

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
          <Route path="/showProducts" element={<Protector Component={Products} />} />
          <Route path="/admin" element={<Protector Component={Admin} />} />
          <Route path='/manageAdmins' element={<Protector Component={ManageAdmin} />} />
          <Route path='/allCategory' element={<Protector Component={AllCategories} />} />
          <Route path='/UpdateCatgory/:id' element={<Protector Component={UpdateCategory} />} />
          <Route path="/addProduct" element={<Protector Component={CreateProducts} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
