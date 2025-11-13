import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Halaman Anda
import HomePage from './pages/HomePage'; 
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Berada di src/components

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rute 1: Halaman Utama. Tampil di URL: / */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* Rute 2: Login Admin. Tampil di URL: /login-admin */}
        <Route path="/login-admin" element={<AdminLogin />} />

        {/* Rute 3: Dashboard Admin yang Dilindungi. Tampil di URL: /admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Rute 4: Halaman 404 */}
        <Route path="*" element={<div>404 Halaman Tidak Ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
