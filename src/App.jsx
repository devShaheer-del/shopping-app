import React from 'react'
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Shop from './pages/Shop';
import Protected from './components/Protected';
function App() {
  return (
    <>
      <Router>

        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<Protected Component={About} />} />
            <Route path='/Service' element={<Service />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/SignupPage' element={<SignupPage />} />
            <Route path='/Shop' element={<Protected Component={Shop} />} />

          </Routes>
        </Layout>

      </Router>

    </>
  )
}

export default App
