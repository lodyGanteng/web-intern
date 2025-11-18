import React from 'react';
import { Link } from 'react-router-dom';
import { FileEdit, ArrowLeft } from 'lucide-react';

const ContentEditorPage: React.FC = () => {
    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border-l-4 border-purple-500 max-w-4xl mx-auto">
                
                <h1 className="text-3xl font-extrabold text-purple-800 mb-6 flex items-center space-x-3 border-b pb-3">
                    <FileEdit size={30} /> 
                    <span>Pengelolaan Konten Lowongan</span>
                </h1>
                
                <p className="text-gray-700 mb-8 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                    **SUCCESS!** Anda berhasil mengakses rute turunan! Di sinilah Anda dapat membuat *form* untuk menambah, mengedit, atau menghapus data lowongan.
                </p>

                {/* Placeholder Form/Area Kerja */}
                <div className="p-10 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg text-center text-gray-600">
                    <p className="font-semibold mb-4 text-lg">Area Form Editor Konten</p>
                    <p className="text-sm">Anda telah berhasil menavigasi ke rute: <code>/admin/edit-content</code></p>
                </div>
                
                <Link 
                    to="/admin" 
                    className="mt-8 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                >
                    <ArrowLeft size={18} />
                    <span>Kembali ke Data Pendaftaran (Dashboard)</span>
                </Link>
            </div>
        </div>
    );
};

export default ContentEditorPage;