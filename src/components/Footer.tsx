import { Briefcase, Mail, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Magang</span>
            </div>
            <p className="text-base text-slate-400 leading-relaxed font-medium">
              Program magang profesional untuk siswa SMK dan mahasiswa. Dapatkan pengalaman kerja nyata, mentoring, dan sertifikat resmi.
            </p>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Menu</h3>
            <ul className="space-y-3 text-base">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors font-medium">Home</a>
              </li>
              <li>
                <a href="#positions" className="hover:text-emerald-400 transition-colors font-medium">Posisi Magang</a>
              </li>
              <li>
                <a href="#register" className="hover:text-emerald-400 transition-colors font-medium">Daftar Sekarang</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors font-medium">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Kebijakan</h3>
            <ul className="space-y-3 text-base">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors font-medium">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors font-medium">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors font-medium">Panduan Peserta</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors font-medium">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4 text-base">
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">WhatsApp</p>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-bold">
                    +62 812-3456-7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">Email</p>
                  <a href="mailto:magang@digitalpro.com" className="hover:text-emerald-400 transition-colors font-bold break-all">
                    magang@digitalpro.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">Lokasi</p>
                  <p className="font-bold">Yogyakarta, Indonesia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500 font-medium">
              &copy; {currentYear} DigitalPro Magang. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 hover:shadow-lg hover:shadow-emerald-500/50 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://instagram.com/digitalpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 hover:shadow-lg hover:shadow-emerald-500/50 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a
                href="mailto:magang@digitalpro.com"
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 hover:shadow-lg hover:shadow-emerald-500/50 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            <p>Made with passion for student development</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
