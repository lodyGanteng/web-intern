// src/components/FAQ.tsx

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Definisikan tipe untuk props yang diterima komponen
interface FAQProps {
  faqContent: any; // Bisa diperbaiki dengan tipe yang lebih spesifik
}

const FAQ: React.FC<FAQProps> = ({ faqContent }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 rounded-full px-6 py-3 mb-6">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            {/* Gunakan konten dinamis untuk teks badge */}
            <span className="text-sm font-black text-slate-900">{faqContent?.badgeText || 'PERTANYAAN & JAWABAN'}</span>
          </div>
          {/* Gunakan konten dinamis untuk judul dan deskripsi utama */}
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            {faqContent?.title || 'Pertanyaan yang Sering Diajukan'}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            {faqContent?.description || 'Temukan jawaban untuk pertanyaan tentang program magang kami'}
          </p>
        </div>

        <div className="space-y-4">
          {/* Buat daftar FAQ secara dinamis dari faqContent.faqs */}
          {faqContent?.faqs?.map((faq: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-400 shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-emerald-50 transition-colors"
              >
                <span className="font-black text-slate-900 pr-4 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-slate-700 leading-relaxed border-t-2 border-slate-100 pt-6 font-medium text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gunakan konten dinamis untuk bagian callout */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-3xl p-10 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            {faqContent?.callout?.title || 'Masih Ada Pertanyaan?'}
          </h3>
          <p className="text-white/95 text-xl mb-8 max-w-2xl mx-auto font-bold">
            {faqContent?.callout?.description || 'Jangan ragu untuk menghubungi tim kami. Kami siap membantu menjawab semua pertanyaanmu!'}
          </p>
          <a
            href={faqContent?.callout?.buttonLink || 'https://wa.me/6281234567890'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-emerald-600 font-black text-lg px-10 py-5 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:scale-105 transform"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {faqContent?.callout?.buttonText || 'Hubungi via WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;