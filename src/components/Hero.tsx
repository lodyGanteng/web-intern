import { Rocket, Sparkles } from 'lucide-react';

interface HeroProps {
  onDaftarClick: () => void;
  onPelajariClick: () => void;
}

export default function Hero({ onDaftarClick, onPelajariClick }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-emerald-600 via-green-500 to-lime-500 text-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 animate-bounce">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-bold text-white">Program Magang 2025</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight drop-shadow-2xl">
            MAGANG KUY!
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Kesempatan Magang untuk Siswa SMK & Mahasiswa
          </p>

          <p className="text-lg sm:text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Dapatkan pengalaman kerja profesional, bimbingan mentor, pelatihan skill,
            dan sertifikat resmi. Wujudkan impianmu di dunia kerja bersama kami!
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <button
              onClick={onDaftarClick}
              className="group bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xl px-12 py-6 rounded-full transition-all duration-300 shadow-2xl hover:shadow-yellow-400/60 hover:scale-110 transform"
            >
              <span className="flex items-center justify-center gap-3">
                Daftar Sekarang
                <Rocket className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>

            <button
              onClick={onPelajariClick}
              className="bg-white hover:bg-white/90 text-emerald-600 font-black text-xl px-12 py-6 rounded-full transition-all duration-300 shadow-2xl hover:scale-105 transform"
            >
              Lihat Posisi Magang
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-yellow-300 mb-2">50+</div>
              <div className="text-sm font-bold text-white">Peserta Magang</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-yellow-300 mb-2">10+</div>
              <div className="text-sm font-bold text-white">Posisi Tersedia</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-yellow-300 mb-2">3-6</div>
              <div className="text-sm font-bold text-white">Bulan Program</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-yellow-300 mb-2">100%</div>
              <div className="text-sm font-bold text-white">Dapat Sertifikat</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
