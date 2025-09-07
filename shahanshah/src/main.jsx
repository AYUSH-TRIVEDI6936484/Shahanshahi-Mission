// import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
import Contact from "./components/pages/Contact.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
)