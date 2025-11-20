// src/components/Positions.tsx

import { Code, Palette, Megaphone, FileText, Video, Users, Settings, TrendingUp } from 'lucide-react';

// --- PETA ICON UNTUK MENGUBAH STRING MENJADI KOMPONEN ---
const iconMap = {
  Settings,
  Palette,
  Code,
  Megaphone,
  FileText,
  Video,
  Users,
  TrendingUp,
};

interface PositionsProps {
  positionsContent: any;
}

export default function Positions({ positionsContent }: PositionsProps) {
  return (
    <section id="positions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-6 py-3 mb-6">
            <Users className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-black text-emerald-600">{positionsContent?.badgeText || 'POSISI MAGANG'}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {positionsContent?.title || 'Pilih Posisi yang Sesuai Passionmu!'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            {positionsContent?.description || 'Berbagai posisi magang tersedia...'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {positionsContent?.positions?.map((position: any, index: number) => {
            // --- AMBIL KOMPONEN ICON BERDASARKAN NAMA ---
            const IconComponent = iconMap[position.iconName as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border-2 border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${position.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {position.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {position.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Skill yang Dibutuhkan:</p>
                  {position.requirements.map((req: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-slate-700 font-medium">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-emerald-50 to-lime-50 border-2 border-emerald-200 rounded-2xl px-8 py-6">
            <div className="text-4xl">🎯</div>
            <div className="text-left">
              <p className="font-black text-slate-900 text-lg mb-1">{positionsContent?.calloutTitle || 'Tidak menemukan posisi yang cocok?'}</p>
              <p className="text-slate-600 font-medium">{positionsContent?.calloutDescription || 'Hubungi kami...'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}