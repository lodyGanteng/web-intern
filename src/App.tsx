import React, { 
    // FUNGSI REACT HOOKS: MEMPERBAIKI ERROR 2304
    useState, 
    useContext, 
    createContext, 
    useEffect, 
} from 'react';
import {
    // REACT ROUTER DOM
    BrowserRouter as Router, // Menggunakan BrowserRouter
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Outlet,
    Navigate, // MEMPERBAIKI ERROR 'Cannot find name Navigate'
} from 'react-router-dom';
import { LogOut, Home, Lock, User, Menu } from 'lucide-react';

// ===============================================
// 1. AUTH CONTEXT (Management State)
// ===============================================

// Definisi Tipe untuk Konteks
interface AuthContextType {
    user: string | null;
    signIn: (newUser: string, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}

// Inisialisasi Konteks
const AuthContext = createContext<AuthContextType>(null!);

// Hook kustom untuk mengakses status otentikasi
function useAuth() {
    return useContext(AuthContext);
}

// Provider untuk membungkus seluruh aplikasi
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    // Efek untuk memeriksa status login dari localStorage saat dimuat
    useEffect(() => {
        const storedUser = localStorage.getItem('appUser');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const signIn = (newUser: string, callback: VoidFunction) => {
        setUser(newUser);
        localStorage.setItem('appUser', newUser);
        callback();
    };

    const signOut = (callback: VoidFunction) => {
        setUser(null);
        localStorage.removeItem('appUser');
        callback();
    };

    const value = { user, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ===============================================
// 2. PROTECTED ROUTE (Komponen Wrapper)
// ===============================================

// Komponen yang melindungi rute
function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        // Arahkan ke halaman login jika belum login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

// ===============================================
// 3. LAYOUT & NAVIGATION
// ===============================================

const AppLayout = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        auth.signOut(() => navigate('/'));
    };
    
    // Kelas Tailwind untuk tombol
    const baseButtonClass = "flex items-center space-x-2 p-2 rounded-lg transition duration-200 hover:bg-white/10";
    const navItemClass = "w-full text-left " + baseButtonClass;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar (Desktop) */}
            <nav className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4 shadow-xl">
                <div className="text-3xl font-bold mb-8 text-indigo-400">
                    MAGANG KUY!
                </div>
                <div className="flex-grow space-y-2">
                    <Link to="/" className={navItemClass}><Home size={18} /><span>Beranda</span></Link>
                    {auth.user && (
                        <Link to="/admin" className={navItemClass}><Lock size={18} /><span>Kelola Konten</span></Link>
                    )}
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                    {auth.user ? (
                        <>
                            <div className="mb-2 p-2 flex items-center space-x-2 text-sm text-gray-400">
                                <User size={18} />
                                <span>{auth.user}</span>
                            </div>
                            <button onClick={handleSignOut} className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                                <LogOut size={18} className="mr-2" /> Keluar
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="w-full justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 block text-center">
                            Masuk
                        </Link>
                    )}
                </div>
            </nav>

            {/* Konten Utama */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar (Mobile) */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
                    <div className="text-xl font-bold text-indigo-600">MAGANG KUY!</div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-800">
                        <Menu size={24} />
                    </button>
                </header>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="bg-white p-4 border-b md:hidden space-y-2">
                        <Link to="/" className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg">Beranda</Link>
                        {auth.user && (
                            <Link to="/admin" className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg">Kelola Konten</Link>
                        )}
                        {auth.user ? (
                            <>
                                <div className="p-2 text-sm text-gray-500 border-t mt-2">Masuk sebagai: {auth.user}</div>
                                <button onClick={handleSignOut} className="w-full bg-indigo-600 text-white py-2 rounded-lg">Keluar</button>
                            </>
                        ) : (
                            <Link to="/login" className="w-full bg-green-600 text-white py-2 rounded-lg block text-center">Masuk</Link>
                        )}
                    </div>
                )}

                {/* Konten Halaman */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// ===============================================
// 4. PAGES
// ===============================================

const HomePage = () => {
    return (
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 border-b pb-2">
                Selamat Datang di Portal Magang Kuy!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                Temukan peluang magang terbaik dan kelola konten aplikasi Anda dengan mudah.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-2">Peluang Terbaru</h2>
                    <p className="text-gray-600">Tersedia 150+ lowongan dari berbagai industri. Daftarkan diri Anda sekarang!</p>
                </div>
                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">Siap Kelola?</h2>
                    <p className="text-gray-600">Akses panel admin untuk menambah, mengedit, dan menghapus data magang.</p>
                </div>
            </div>
        </div>
    );
};

const AdminPage = () => {
    const auth = useAuth();
    return (
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-indigo-600 mb-4">
                Panel Administrasi
            </h1>
            <p className="text-gray-700 mb-6">
                Selamat datang, **{auth.user}**! Di sini Anda dapat mengelola semua konten aplikasi.
            </p>
            
            <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                    <h3 className="font-bold text-lg text-yellow-800">Manajemen Lowongan</h3>
                    <p className="text-sm text-gray-600">Tambah lowongan baru atau edit detail lowongan yang sudah ada.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-300">
                    <h3 className="font-bold text-lg text-purple-800">Analisis Pengguna</h3>
                    <p className="text-sm text-gray-600">Lihat statistik pendaftar dan lowongan paling diminati.</p>
                </div>
            </div>
        </div>
    );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulasi Otentikasi
    // Gunakan username: admin dan password: 123
    if (username === 'admin' && password === '123') {
      auth.signIn(username, () => {
        // Navigasi ke rute asal atau default
        navigate(from, { replace: true });
      });
    } else {
      setError('Username atau password salah. Coba: admin / 123');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border-t-4 border-indigo-600">
        <div className="text-center">
          <Lock size={32} className="mx-auto text-indigo-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Masuk ke Magang Kuy!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gunakan akun administrator Anda.
          </p>
        </div>
        
        {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm" role="alert">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

const NotFoundPage = () => {
    return (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <h1 className="text-6xl font-extrabold text-red-500">404</h1>
            <p className="text-2xl text-gray-700 mt-4">Halaman Tidak Ditemukan</p>
            <p className="text-gray-500 mt-2">Maaf, kami tidak dapat menemukan halaman yang Anda cari.</p>
            <Link to="/" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Kembali ke Beranda
            </Link>
        </div>
    );
};

// ===============================================
// 5. KOMPONEN UTAMA
// ===============================================
export default function App() {
  return (
    <Router>
        <AuthProvider>
            <Routes>
                {/* Rute Login & 404 tanpa Layout (Full Screen) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} /> 

                {/* Rute dengan Layout (Sidebar + Navbar) */}
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } 
                    />
                </Route>
            </Routes>
        </AuthProvider>
    </Router>
  );
}