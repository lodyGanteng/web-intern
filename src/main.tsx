// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import halaman-halaman
import App from './App'; 
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage'; // <-- Diimpor dari /pages

// Import komponen utilitas
import ProtectedRoute from './guards/ProtectedRoute'; // <-- Tetap di /components

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ROUTE PUBLIK: Halaman utama */}
        <Route path="/" element={<App />} />
        
        {/* ROUTE LOGIN: Halaman login */}
        <Route path="/login" element={<LoginPage />} />

        {/* ROUTE ADMIN YANG DILINDUNGI */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);