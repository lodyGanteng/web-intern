import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- FIX: IMPORT SEMUA KOMPONEN DARI FOLDER PAGES ---
// NOTE: Jika nama file Anda berbeda (misalnya, AdminLogin.tsx bukan LoginPage.tsx), sesuaikan di sini!
import AdminLoginPage from './pages/AdminLogin'; 
import AdminDashboard from './pages/AdminDashboard';
import ContentEditorPage from './pages/ContentEditor'; 

// ===============================================
// 1. AUTH CONTEXT PLACEHOLDER
// (Gunakan kode Auth Context Anda yang sudah berfungsi di sini)
// ...
// Kami asumsikan Anda memiliki AuthProvider, useAuth, dan ProtectedRoute yang berfungsi.
// ...
// KODE PLACEHOLDER UNTUK DEMO:
interface AuthContextType { isAuthenticated: boolean; isLoading: boolean; }
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const useAuth = () => { const context = useContext(AuthContext); if (!context) throw new Error('Error!'); return context; };
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { return (<AuthContext.Provider value={{ isAuthenticated: true, isLoading: false }}>{children}</AuthContext.Provider>); };
// END PLACEHOLDER
// ===============================================


// ===============================================
// 2. PROTECTED ROUTE
// (Gunakan kode ProtectedRoute Anda yang sudah berfungsi di sini)
// Kami asumsikan ProtectedRoute diimpor atau didefinisikan secara global.
// KODE PLACEHOLDER UNTUK DEMO:
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Di proyek nyata, ini akan memeriksa status Supabase Auth
    const isAuthenticated = true; 
    
    if (!isAuthenticated) {
        return <Navigate to="/login-admin" replace />;
    }
    return <>{children}</>;
};
// END PLACEHOLDER
// ===============================================


// 3. PAGE PLACEHOLDERS (Untuk rute non-admin)
const HomePage = () => (<div className="min-h-screen flex items-center justify-center bg-blue-50"><h1>Halaman Utama (Publik)</h1></div>);
const NotFoundPage = () => (<div className="min-h-screen flex items-center justify-center bg-red-50"><h1>404 - Halaman Tidak Ditemukan</h1></div>);


// ===============================================
// 4. KOMPONEN UTAMA APLIKASI DAN ROUTING
// ===============================================
const App: React.FC = () => {
  return (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                
                {/* Rute Halaman Publik */}
                <Route path="/" element={<HomePage />} />
                
                {/* Rute Login Admin */}
                <Route path="/login-admin" element={<AdminLoginPage />} /> 
                
                {/* Rute Admin Dashboard yang Dilindungi */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Rute Content Editor BARU yang Dilindungi */}
                <Route 
                    path="/admin/edit-content" 
                    element={
                        <ProtectedRoute>
                            <ContentEditorPage /> 
                        </ProtectedRoute>
                    } 
                />
                
                {/* Rute Catch-all (404) */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default App;