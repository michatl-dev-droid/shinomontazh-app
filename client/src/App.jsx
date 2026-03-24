import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PriceList from './pages/PriceList';
import ServicePoints from './pages/ServicePoints';
import Map from './pages/Map';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminServicePoints from './pages/admin/AdminServicePoints';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<PriceList />} />
            <Route path="/" element={<Home />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/service-points" element={<ServicePoints />} />
            <Route path="/map" element={<Map />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Маршруты админки */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
            <Route path="/admin/service-points" element={<AdminRoute><AdminServicePoints /></AdminRoute>} />
            <Route path="/admin/appointments" element={<AdminRoute><AdminAppointments /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
// test auto-deploy
export default App;
