// src/components/ProtectedRoute.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // <-- PASTIKAN PATH INI BENAR!
import { Navigate } from 'react-router-dom';

// Definisikan tipe untuk props
interface ProtectedRouteProps {
  children: React.ReactNode; 
}

// Gunakan tipe any atau langsung definisikan state tanpa impor Session
// Menggunakan 'any' untuk mengatasi masalah typing sementara jika Session tidak dikenali
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Gunakan tipe 'any' atau 'object | null' jika 'Session' tidak dapat diimpor
  const [session, setSession] = useState<any | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    checkSession(); 

    return () => {
      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <div>Memeriksa sesi...</div>;
  }

  if (!session) {
    return <Navigate to="/login-admin" replace />;
  }

  return children;
};

export default ProtectedRoute;