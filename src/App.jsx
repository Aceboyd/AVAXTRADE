import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import KYCUpload from './pages/KYCUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kyc-upload" element={<KYCUpload />} />
        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<div className="text-center p-4">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;