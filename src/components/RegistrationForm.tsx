import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface InternshipApplication {
  full_name: string;
  email: string;
  whatsapp: string;
  school_university: string;
  position: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    school_university: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const application: InternshipApplication = {
        full_name: formData.full_name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        school_university: formData.school_university,
        position: formData.position
      };

      const { error } = await supabase
        .from('internship_applications')
        .insert([application]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('Email sudah terdaftar. Silakan gunakan email lain.');
        } else {
          setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
        }
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          full_name: '',
          email: '',
          whatsapp: '',
          school_university: '',
          position: ''
        });
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            Daftar Magang Sekarang!
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            Isi formulir di bawah ini dan tim kami akan menghubungi kamu untuk proses selanjutnya
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-3xl p-8 md:p-12 border-2 border-emerald-200 shadow-2xl">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">
                Pendaftaran Berhasil!
              </h3>
              <p className="text-slate-700 font-medium text-lg mb-8">
                Terima kasih telah mendaftar! Tim kami akan segera menghubungi kamu melalui WhatsApp dalam 1x24 jam.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-black px-10 py-4 rounded-full transition-all duration-300 shadow-xl"
              >
                Daftar Lagi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-bold text-slate-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                  placeholder="Masukkan nama lengkap kamu"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-bold text-slate-700 mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                  placeholder="08123456789"
                />
              </div>

              <div>
                <label htmlFor="school_university" className="block text-sm font-bold text-slate-700 mb-2">
                  Sekolah / Universitas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="school_university"
                  name="school_university"
                  value={formData.school_university}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                  placeholder="SMK Negeri 1 Jakarta / Universitas Indonesia"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-bold text-slate-700 mb-2">
                  Posisi yang Diminati <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                >
                  <option value="">Pilih Posisi</option>
                  <option value="Administrasi">Administrasi</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Programming">Programming</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Digital Media">Digital Media</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Business Development">Business Development</option>
                </select>
              </div>

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
          )}
        </div>
      </div>
    </section>
  );
}
