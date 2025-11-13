import { Rocket, Star, Users } from 'lucide-react';

interface ClosingCTAProps {
  onDaftarClick: () => void;
}

export default function ClosingCTA({ onDaftarClick }: ClosingCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-500 to-lime-500 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 animate-bounce">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-black text-white">Bergabunglah dengan 50+ Peserta Magang</span>
        </div>

        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight drop-shadow-lg">
          Siap Mulai Magang?
        </h2>

        <p className="text-xl sm:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-bold">
          Wujudkan impianmu di dunia kerja profesional. Dapatkan pengalaman nyata, mentoring dari expert, dan sertifikat resmi!
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-14">
          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-3xl p-8 transform hover:scale-110 transition-transform">
            <div className="text-5xl mb-4">⚡</div>
            <div className="text-3xl font-black mb-2">Gratis</div>
            <div className="text-white/90 font-bold">Tanpa Biaya Apapun</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-3xl p-8 transform hover:scale-110 transition-transform">
            <div className="text-5xl mb-4">🎓</div>
            <div className="text-3xl font-black mb-2">3-6 Bulan</div>
            <div className="text-white/90 font-bold">Program Berkualitas</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-3xl p-8 transform hover:scale-110 transition-transform">
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-3xl font-black mb-2">100% Sertifikat</div>
            <div className="text-white/90 font-bold">Setelah Program</div>
          </div>
        </div>

        <button
          onClick={onDaftarClick}
          className="group bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-2xl px-14 py-7 rounded-full transition-all duration-300 shadow-3xl hover:shadow-yellow-400/60 hover:scale-110 transform inline-flex items-center gap-4 mb-8"
        >
          Daftar Sekarang!
          <Rocket className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
        </button>

        <p className="text-white/90 text-lg font-bold">
          Pendaftaran hanya 5 menit. Tim kami akan menghubungi kamu secepatnya!
        </p>

        <div className="mt-14 pt-10 border-t-2 border-white/20">
          <div className="flex flex-wrap justify-center gap-8 text-white/95">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              <span className="font-bold text-lg">50+ Peserta Magang</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              <span className="font-bold text-lg">8+ Posisi Tersedia</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              <span className="font-bold text-lg">Rating 4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
