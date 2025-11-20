// src/components/Benefits.tsx

import { Award, GraduationCap, Users, Wifi, Coffee, BookOpen } from 'lucide-react';

// --- PETA ICON UNTUK MENGUBAH STRING MENJADI KOMPONEN ---
const iconMap = {
  Award,
  GraduationCap,
  Users,
  Wifi,
  Coffee,
  BookOpen,
};

// --- INI ADALAH BAGIAN YANG PALING PENTING ---
// Kita mendefinisikan "daftar nama" props yang bisa diterima
interface BenefitsProps {
  benefitsContent: any;
}

// --- KOMPONEN MENGGUNAKAN INTERFACE YANG SUDAH DIDEFINISIKAN ---
export default function Benefits({ benefitsContent }: BenefitsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-slate-900" />
            <span className="text-sm font-black text-slate-900">{benefitsContent?.badgeText || 'BENEFIT MAGANG'}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {benefitsContent?.title || 'Apa yang Kamu Dapatkan?'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            {benefitsContent?.description || 'Bukan hanya pengalaman kerja! Dapatkan berbagai benefit eksklusif...'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsContent?.benefits?.map((benefit: any, index: number) => {
            // --- AMBIL KOMPONEN ICON BERDASARKAN NAMA ---
            const IconComponent = iconMap[benefit.iconName as keyof typeof iconMap];
            return (
              <div
                key={index}
                className={`group ${benefit.bgColor} rounded-3xl p-8 border-2 ${benefit.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
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
            {benefitsContent?.callout?.title || 'Siap Memulai Perjalanan Karirmu?'}
          </h3>
          <p className="text-white/95 text-xl mb-8 max-w-2xl mx-auto font-bold">
            {benefitsContent?.callout?.description || 'Bergabunglah dengan puluhan peserta magang...'}
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {benefitsContent?.callout?.stats?.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-bold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}