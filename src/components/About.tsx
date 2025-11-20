// src/components/About.tsx
import { Check, Target } from 'lucide-react';

interface AboutProps {
  aboutContent: any;
}

export default function About({ aboutContent }: AboutProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-6 py-3 mb-6">
            <Target className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-black text-emerald-600">{aboutContent?.badgeText || 'PERSYARATAN MAGANG'}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {aboutContent?.title || 'Siapa yang Bisa Ikut?'}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
              {aboutContent?.description || 'Program magang kami terbuka untuk...'}
            </p>

            <div className="space-y-4">
              {aboutContent?.requirements?.map((req: string, index: number) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-800 font-bold group-hover:text-emerald-600 transition-colors text-lg">
                    {req}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* ... (bagian kanan tetap sama, tapi kita ganti kartunya) */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-lime-50 p-8 rounded-3xl border-2 border-emerald-200 shadow-2xl">
              <div className="space-y-6">
                {aboutContent?.features?.map((feature: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-200">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{feature.emoji}</div>
                      <h3 className="font-black text-slate-900 text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 font-medium">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}