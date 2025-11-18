import React, { useState, useContext, createContext } from 'react';
import {
  BrowserRouter as Router, // Ganti: Menggunakan BrowserRouter untuk URL Bersih
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { LayoutDashboard, Home, Edit, LogOut, Lock } from 'lucide-react';

// === 1. MOCK AUTH CONTEXT ===
interface AuthContextType {
  user: string | null;
  signIn: (username: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
const AuthContext = createContext<AuthContextType>(null!);
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const signIn = (username: string, callback: VoidFunction) => { setUser(username); callback(); };
  const signOut = (callback: VoidFunction) => { setUser(null); callback(); };
  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
function useAuth() { return useContext(AuthContext); }

// === 2. REQUIRE AUTH COMPONENT ===
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    // Perhatikan: Karena kita menggunakan BrowserRouter, kita tidak perlu membersihkan URL '#/' lagi
    return <LoginPage from={location.pathname} />; 
  }
  return children;
}

// === 3. HALAMAN KOMPONEN ===
const LoginPage = ({ from }: { from: string }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      auth.signIn(username.trim(), () => {
        // Navigasi ke rute yang diminta setelah login
        navigate(from || '/admin', { replace: true });
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-gray-900">Login Administrator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Nama Pengguna" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Masuk</button>
        </form>
      </div>
    </div>
  );
};
const HomePage = () => (
  <div className="p-8 bg-white rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold">Selamat Datang di Portal Kami!</h1>
    <Link to="/admin" className="mt-4 inline-flex px-4 py-2 bg-green-600 text-white rounded-lg">Pergi ke Dashboard Admin</Link>
  </div>
);
const AdminDashboardPage = () => {
  const auth = useAuth();
  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-extrabold text-indigo-800">Dashboard Administrator</h1>
      <p className="text-lg text-gray-600">Halo, **{auth.user}**.</p>
      <Link to="/admin/edit-content" className="mt-4 block p-4 bg-indigo-100 rounded-lg">Ke Editor Konten</Link>
    </div>
  );
};
const ContentEditorPage = () => (
  <div className="p-6 bg-white rounded-xl shadow-2xl">
    <h1 className="text-3xl font-extrabold text-teal-700">Editor Konten Website</h1>
    <p className="text-lg text-gray-600">Rute yang sekarang harusnya tanpa tanda pagar (#).</p>
  </div>
);
const NotFoundPage = () => (
  <div className="p-8 text-center bg-red-50">
    <h1 className="text-5xl font-bold">404</h1>
    <Link to="/" className="text-indigo-600">Kembali ke Beranda</Link>
  </div>
);

// === 4. TATA LETAK UTAMA ===
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => { auth.signOut(() => { navigate('/', { replace: true }); }); };
  const location = useLocation();

  // Hapus logika HashRouter; sekarang kita hanya membandingkan pathname
  const isRouteActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4 flex justify-between">
        <Link to="/" className="text-2xl font-extrabold">App</Link>
        <div className="flex space-x-4">
          <Link to="/" className={isRouteActive('/') ? "text-indigo-700" : "text-gray-600"}>Beranda</Link>
          {auth.user && (
            <>
              {/* Gunakan location.pathname.startsWith('/admin') untuk highlight di sini jika perlu */}
              <Link to="/admin" className={location.pathname.startsWith('/admin') ? "text-indigo-700" : "text-gray-600"}>Dashboard</Link>
              <Link to="/admin/edit-content" className={isRouteActive('/admin/edit-content') ? "text-indigo-700" : "text-gray-600"}>Editor</Link>
              <button onClick={handleSignOut} className="text-red-600">Keluar ({auth.user})</button>
            </>
          )}
          {!auth.user && <Link to="/login" className={isRouteActive('/login') ? "text-indigo-700" : "text-gray-600"}>Login</Link>}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
};


// === 5. KOMPONEN UTAMA APLIKASI ===
export default function App() {
  return (
    <AuthProvider>
      <Router> {/* Ganti: Menggunakan Router (BrowserRouter) */}
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage from="/admin" />} />
            
            <Route path="/admin" element={<RequireAuth><AdminDashboardPage /></RequireAuth>} />
            <Route path="/admin/edit-content" element={<RequireAuth><ContentEditorPage /></RequireAuth>} /> 

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}