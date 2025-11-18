import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import { Link } from 'react-router-dom'; // <--- BARU: Untuk navigasi
import { FileEdit } from 'lucide-react'; // <--- BARU: Untuk ikon

interface Application {
    id: number;
    full_name: string;
    email: string;
    whatsapp: string;
    school_university: string;
    position: string;
    created_at: string;
}

const AdminDashboard: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // [Fungsi untuk Mengambil Data Pendaftar]
    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError(null);
            
            const { data, error } = await supabase
                .from('internship_applications')
                .select('*') 
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching applications:', error);
                setError(`Gagal mengambil data: ${error.message}. Pastikan RLS Policy SELECT sudah benar.`);
            } else {
                setApplications(data as Application[]);
            }
            setLoading(false);
        };
        fetchApplications();
    }, []);

    // [Fungsi Logout]
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            // Karena tidak ada global context di sini, kita reload untuk simulasi signout
            window.location.reload(); 
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-700">Memuat data pendaftar...</div>;
    if (error) return <div className="p-10 text-center text-red-600 font-semibold">{error}</div>;

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 md:mb-0">
                    Data Pendaftaran ({applications.length})
                </h2>
                <div className="flex space-x-4">
                    
                    {/* BARU: Tombol Edit Konten menggunakan Link */}
                    <Link 
                        to="/admin/edit-content" 
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-150 font-semibold text-sm"
                    >
                        <FileEdit size={18} />
                        <span>Edit Konten</span>
                    </Link>

                    {/* Tombol Logout yang Sudah Ada */}
                    <button 
                        onClick={handleLogout} 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150 font-semibold text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Tabel Data Pendaftar */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah/Univ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.full_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold">{app.position}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.school_university}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;