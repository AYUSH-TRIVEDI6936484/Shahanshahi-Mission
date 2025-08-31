// import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
)