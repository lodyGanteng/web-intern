import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  // Mengganti BrowserRouter dengan HashRouter untuk mengatasi masalah 404 di Vercel/SPA
  HashRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { LayoutDashboard, Home, Edit, LogOut, Lock } from 'lucide-react';

// ===========================================
// 1. KONTEKS OTENTIKASI (MOCK)
// ===========================================
interface AuthContextType {
  user: string | null;
  signIn: (username: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

// Menyediakan Otentikasi
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const signIn = (username: string, callback: VoidFunction) => {
    // Simulasi login
    setUser(username);
    callback();
  };

  const signOut = (callback: VoidFunction) => {
    // Simulasi logout
    setUser(null);
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook untuk menggunakan konteks otentikasi
function useAuth() {
  return useContext(AuthContext);
}

// ===========================================
// 2. KOMPONEN PRIVATE ROUTE
// ===========================================

// Memastikan rute hanya bisa diakses setelah login
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect ke halaman login, tetapi menyimpan lokasi saat ini
    return <LoginPage from={location.pathname} />;
  }

  return children;
}

// ===========================================
// 3. KOMPONEN HALAMAN
// ===========================================

// --- Halaman Login ---
const LoginPage = ({ from }: { from: string }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      auth.signIn(username.trim(), () => {
        // Setelah login berhasil, arahkan kembali ke rute yang diminta sebelumnya
        navigate(from || '/admin', { replace: true });
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <div className="flex items-center space-x-3 text-indigo-600">
          <Lock className="w-8 h-8" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            Login Administrator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Untuk demo, ketik nama pengguna apa saja.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nama Pengguna
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="admin-user"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Halaman Utama ---
const HomePage = () => (
  <div className="p-8 bg-white rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Selamat Datang di Portal Kami!</h1>
    <p className="text-gray-600">
      Ini adalah halaman beranda publik. Untuk mengakses fitur pengelolaan konten, silakan masuk ke area Admin.
    </p>
    <Link to="/admin" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-150">
      <LayoutDashboard className="w-5 h-5 mr-2" />
      Pergi ke Dashboard Admin
    </Link>
  </div>
);

// --- Dashboard Admin (Private) ---
const AdminDashboardPage = () => {
  const auth = useAuth();
  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-4">Dashboard Administrator</h1>
      <p className="text-lg text-gray-600 mb-6">
        Halo, **{auth.user}**. Anda berhasil masuk. Ini adalah halaman yang dilindungi.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/edit-content"
          className="flex items-center justify-between p-6 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition duration-200 shadow-md"
        >
          <div>
            <h2 className="text-xl font-semibold text-indigo-700">Editor Konten</h2>
            <p className="text-sm text-indigo-500">Kelola dan perbarui artikel/data.</p>
          </div>
          <Edit className="w-6 h-6 text-indigo-600" />
        </Link>
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Pengaturan Pengguna</h2>
            <p className="text-sm text-gray-500">Fitur lain yang dilindungi.</p>
          </div>
          <Lock className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

// --- Editor Konten (Private) ---
const ContentEditorPage = () => (
  <div className="p-6 bg-white rounded-xl shadow-2xl">
    <h1 className="text-3xl font-extrabold text-teal-700 mb-4 flex items-center">
      <Edit className="w-7 h-7 mr-2" />
      Editor Konten
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Anda berada di rute internal yang sebelumnya error 404:
      <code className="bg-gray-100 p-1 rounded font-mono text-sm block mt-2 text-red-600">
        /admin/edit-content
      </code>
      <span className="text-sm font-semibold text-green-600">
        (Sekarang menggunakan `/#/admin/edit-content` dan dijamin bekerja.)
      </span>
    </p>
    <textarea
      rows={10}
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
      placeholder="Mulai tulis konten baru Anda di sini..."
    />
    <button className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-150 shadow-md">
      Simpan Perubahan
    </button>
  </div>
);

// --- Halaman 404 ---
const NotFoundPage = () => (
  <div className="p-8 text-center bg-red-50 rounded-lg shadow-lg">
    <h1 className="text-5xl font-bold text-red-700 mb-2">404</h1>
    <p className="text-xl text-red-500 mb-4">Halaman Tidak Ditemukan</p>
    <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150">
      Kembali ke Beranda
    </Link>
  </div>
);

// ===========================================
// 4. TATA LETAK UTAMA (NAVIGASI)
// ===========================================
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut(() => {
      navigate('/', { replace: true });
    });
  };

  const navItems = [
    { name: 'Beranda', path: '/', icon: Home, show: true },
    { name: 'Dashboard Admin', path: '/admin', icon: LayoutDashboard, show: !!auth.user },
    { name: 'Editor Konten', path: '/admin/edit-content', icon: Edit, show: !!auth.user },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Vercel SPA Fix
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.filter(item => item.show).map((item) => (
              <NavLink key={item.name} to={item.path}>
                <item.icon className="w-5 h-5 mr-1" />
                {item.name}
              </NavLink>
            ))}

            {auth.user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Keluar ({auth.user})
              </button>
            ) : (
              <Link to="/login" className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md">
                <Lock className="w-5 h-5 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

// Komponen NavLink Kustom
const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Karena kita menggunakan HashRouter, location.pathname akan selalu '/'
  // Kita harus menggunakan location.hash untuk mengetahui rute yang sebenarnya.
  // Contoh: #/admin/edit-content -> rute: /admin/edit-content
  const isMatch = location.hash.substring(1) === to;
  
  const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition duration-150";
  const activeClasses = isMatch ? "text-indigo-700 bg-indigo-100 shadow-inner" : "text-gray-600 hover:bg-gray-50";

  return (
    <Link to={to} className={`${baseClasses} ${activeClasses}`}>
      {children}
    </Link>
  );
};


// ===========================================
// 5. KOMPONEN UTAMA APLIKASI
// ===========================================
export default function App() {
  // Tambahkan efek ini untuk menunjukkan format URL baru di konsol saat dimuat.
  useEffect(() => {
    console.log("Aplikasi dimuat. URL rute internal akan menggunakan format HashRouter: [URL]/#/rute-anda");
  }, []);

  return (
    <AuthProvider>
      {/* PENTING: GANTI BrowserRouter dengan HashRouter */}
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage from="/admin" />} />

            {/* Rute Admin yang Dilindungi */}
            <Route path="/admin" element={
              <RequireAuth>
                <AdminDashboardPage />
              </RequireAuth>
            } />
            
            {/* Rute Editor Konten yang Dilindungi - Target perbaikan 404 */}
            <Route path="/admin/edit-content" element={
              <RequireAuth>
                <ContentEditorPage />
              </RequireAuth>
            } />

            {/* Rute Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </HashRouter>
    </AuthProvider>
  );
}