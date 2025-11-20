// src/components/RegistrationForm.tsx

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Definisikan tipe untuk props yang diterima komponen
interface RegistrationFormProps {
  registrationContent: any; // Bisa diperbaiki dengan tipe yang lebih spesifik
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ registrationContent }) => {
  // State untuk menyimpan data inputan form, diinisialisasi sebagai objek kosong
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk menangani perubahan input di form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Ganti 'internship_applications' dengan nama tabel yang Anda gunakan di Supabase
      const { error } = await supabase
        .from('internship_applications') 
        .insert([formData]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('Email sudah terdaftar. Silakan gunakan email lain.');
        } else {
          setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
        }
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        // Kosongkan form setelah berhasil
        setFormData({});
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jika form berhasil dikirim, tampilkan pesan sukses
  if (submitStatus === 'success') {
    return (
      <section id="register" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-3xl p-8 md:p-12 border-2 border-emerald-200 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {/* Gunakan konten dinamis untuk pesan sukses */}
            <h3 className="text-3xl font-black text-slate-900 mb-4">
              {registrationContent?.successTitle || 'Pendaftaran Berhasil!'}
            </h3>
            <p className="text-slate-700 font-medium text-lg mb-8">
              {registrationContent?.successMessage || 'Terima kasih telah mendaftar! Tim kami akan segera menghubungi kamu.'}
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-black px-10 py-4 rounded-full transition-all duration-300 shadow-xl"
            >
              Daftar Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Tampilkan form utama
  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gunakan konten dinamis untuk judul dan deskripsi */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {registrationContent?.title || 'Daftar Magang Sekarang!'}
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            {registrationContent?.description || 'Isi formulir di bawah ini dan tim kami akan menghubungi kamu untuk proses selanjutnya'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-3xl p-8 md:p-12 border-2 border-emerald-200 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Buat field form secara dinamis dari registrationContent.fields */}
            {registrationContent?.fields?.map((field: any, index: number) => (
              <div key={index}>
                <label htmlFor={field.name} className="block text-sm font-bold text-slate-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  // Jika tipe field adalah 'select', render dropdown
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                  >
                    <option value="">Pilih Posisi</option>
                    {/* Opsi diambil dari registrationContent.positionOptions */}
                    {registrationContent.positionOptions?.map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Jika tipe field lainnya (text, email, tel), render input biasa
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 disabled:from-slate-400 disabled:to-slate-400 text-white font-black text-lg px-8 py-5 rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  Daftar Magang Sekarang
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-sm text-slate-600 text-center font-medium">
              Dengan mendaftar, kamu menyetujui syarat dan ketentuan program magang kami
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;