// src/components/Testimonials.tsx

import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonialsContent: any;
}

export default function Testimonials({ testimonialsContent }: TestimonialsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkgzNnptMC0yNGgxMnYxMkgzNnptMC0yNGgxMnYxMkgzNnptLTI0IDBoMTJ2MTJIMzZ6bTAtMjRoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJIMzZ6bTAtMjRoMTJ2MTJIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 rounded-full px-6 py-3 mb-6">
            <Quote className="w-5 h-5 text-slate-900" />
            <span className="text-sm font-black text-slate-900">{testimonialsContent?.badgeText || 'CERITA SUKSES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {testimonialsContent?.title || 'Cerita Sukses Reseller Kami'}
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {testimonialsContent?.description || 'Dengarkan pengalaman mereka yang telah bergabung...'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsContent?.testimonials?.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-blue-500 mb-3 opacity-50" />

              <p className="text-slate-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="pt-4 border-t border-slate-700">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-semibold text-blue-300">
                    {testimonial.achievement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              {testimonialsContent?.testimonials?.slice(0, 3).map((t: any, i: number) => (
                <img
                  key={i}
                  src={t.image}
                  alt="Reseller"
                  className="w-10 h-10 rounded-full border-2 border-slate-800"
                />
              ))}
            </div>
            <p className="text-slate-300">
              <span className="font-bold text-white">{testimonialsContent?.callout?.text || '100+ Reseller'}</span> telah bergabung dan meraih kesuksesan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}