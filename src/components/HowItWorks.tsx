// src/components/HowItWorks.tsx

import { ClipboardList, GraduationCap, Briefcase, Award } from 'lucide-react';

// 1. Buat tipe untuk props yang akan diterima komponen
type HowItWorksProps = {
  howItWorksContent: {
    title: string;
    subtitle: string;
    steps: {
      icon_name: string;
      title: string;
      description: string;
      color_class: string;
      number: string;
    }[];
    callout: {
      text: string;
    };
  };
};

// 2. Buat pemetaan (map) dari nama string ke komponen ikon
const iconMap: { [key: string]: React.ComponentType<any> } = {
  ClipboardList,
  GraduationCap,
  Briefcase,
  Award,
};

// 3. Terima props di komponen
export default function HowItWorks({ howItWorksContent }: HowItWorksProps) {
  // 4. Hapus array `steps` yang di-hardcode, karena sekarang datanya dari props

  // Tampilkan loading atau pesan jika data belum ada
  if (!howItWorksContent) {
    return <div className="py-20 text-center">Memuat konten...</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5. Gunakan data dari props untuk judul dan deskripsi */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {howItWorksContent.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            {howItWorksContent.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-300 via-lime-300 to-yellow-300 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 6. Looping melalui `steps` dari props */}
            {howItWorksContent.steps.map((step, index) => {
              // 7. Ambil komponen ikon yang sesuai dari `iconMap`
              const Icon = iconMap[step.icon_name];
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="flex flex-col items-center text-center">
                      {/* 8. Gunakan `color_class` dari props */}
                      <div className={`w-24 h-24 bg-gradient-to-br ${step.color_class} rounded-3xl flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                        {/* Tampilkan ikon hanya jika ditemukan */}
                        {Icon && <Icon className="w-12 h-12 text-white" />}
                      </div>

                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-black text-3xl shadow-lg border-4 border-white">
                        {step.number}
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 9. Gunakan data dari props untuk callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-lime-100 border-2 border-emerald-300 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-black text-emerald-900">
              {howItWorksContent.callout.text}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}