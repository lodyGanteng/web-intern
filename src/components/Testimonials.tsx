import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Andi Pratama',
      role: 'Reseller Aktif',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Awalnya saya cuma coba-coba. Tapi dalam 1 bulan saya sudah dapat 5 klien dan komisi jutaan! Tim support-nya juga sangat membantu.',
      rating: 5,
      achievement: '5 Klien dalam 1 Bulan'
    },
    {
      name: 'Rina Kartika',
      role: 'Freelance Marketer',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Gak perlu ngerti coding, semua udah disiapin. Tinggal promosi aja! Materi promosinya juga profesional banget.',
      rating: 5,
      achievement: 'Rp 8jt+ Komisi'
    },
    {
      name: 'Budi Santoso',
      role: 'Digital Entrepreneur',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Program reseller terbaik yang pernah saya ikuti. Komisinya real, prosesnya transparan, dan tim-nya sangat profesional.',
      rating: 5,
      achievement: '12 Proyek Selesai'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkgzNnptMC0yNGgxMnYxMkgzNnptMCAyNGgxMnYxMkgzNnptLTI0IDBoMTJ2MTJIMzZ6bTAtMjRoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJIMzZ6bTAtMjRoMTJ2MTJIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Cerita Sukses Reseller Kami
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Dengarkan pengalaman mereka yang telah bergabung dan meraih kesuksesan bersama kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="Reseller"
                className="w-10 h-10 rounded-full border-2 border-slate-800"
              />
              <img
                src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="Reseller"
                className="w-10 h-10 rounded-full border-2 border-slate-800"
              />
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="Reseller"
                className="w-10 h-10 rounded-full border-2 border-slate-800"
              />
            </div>
            <p className="text-slate-300">
              <span className="font-bold text-white">100+ Reseller</span> telah bergabung dan meraih kesuksesan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
