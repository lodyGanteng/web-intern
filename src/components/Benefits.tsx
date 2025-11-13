import { Award, GraduationCap, Users, Wifi, Coffee, BookOpen } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Mentorship & Training',
      description: 'Bimbingan langsung dari profesional berpengalaman di bidangnya. Dapatkan insight dan guidance untuk perkembangan karirmu.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      emoji: '👨‍🏫'
    },
    {
      icon: Award,
      title: 'Sertifikat Resmi',
      description: 'Sertifikat magang yang diakui dan dapat digunakan untuk melengkapi portfolio dan CV kamu.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      emoji: '🏆'
    },
    {
      icon: BookOpen,
      title: 'Pengalaman Nyata',
      description: 'Terlibat langsung dalam proyek real company. Belajar praktik kerja profesional di dunia industri.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      emoji: '💼'
    },
    {
      icon: Users,
      title: 'Networking Luas',
      description: 'Bangun koneksi dengan profesional dan sesama peserta magang. Perluas jaringan untuk peluang karir masa depan.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      emoji: '🤝'
    },
    {
      icon: Wifi,
      title: 'Internet Gratis',
      description: 'Akses WiFi super cepat dan unlimited untuk mendukung pekerjaan dan pembelajaran kamu selama magang.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      emoji: '📡'
    },
    {
      icon: Coffee,
      title: 'Lingkungan Nyaman',
      description: 'Workspace modern dan nyaman dengan fasilitas lengkap. Suasana kerja yang mendukung produktivitas dan kreativitas.',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      emoji: '☕'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-slate-900" />
            <span className="text-sm font-black text-slate-900">BENEFIT MAGANG</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            Apa yang Kamu Dapatkan?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Bukan hanya pengalaman kerja! Dapatkan berbagai benefit eksklusif yang akan mendukung perkembangan karirmu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group ${benefit.bgColor} rounded-3xl p-8 border-2 ${benefit.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl">{benefit.emoji}</div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-lime-500 rounded-3xl p-10 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Siap Memulai Perjalanan Karirmu?
          </h3>
          <p className="text-white/95 text-xl mb-8 max-w-2xl mx-auto font-bold">
            Bergabunglah dengan puluhan peserta magang yang telah mendapatkan pengalaman berharga!
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-2">
                50+
              </div>
              <div className="text-white font-bold text-lg">Alumni Magang</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-2">
                3-6
              </div>
              <div className="text-white font-bold text-lg">Bulan Program</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-2">
                100%
              </div>
              <div className="text-white font-bold text-lg">Dapat Sertifikat</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
