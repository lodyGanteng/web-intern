import { Briefcase, Mail, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';

// 1. Buat tipe untuk props yang akan diterima komponen
interface FooterProps {
  footerContent: {
    description: string;
    menu: { text: string; href: string; }[];
    policy: { text: string; href: string; }[];
    contact: {
      whatsapp: string;
      whatsappLink: string;
      email: string;
      location: string;
    };
    socialMedia: { iconName: string; href: string; }[];
    copyrightText: string;
    bottomText: string;
  };
}

// 2. Buat pemetaan (map) dari nama string ke komponen ikon
const iconMap: { [key: string]: React.ComponentType<any> } = {
  MessageCircle,
  Instagram,
  Mail,
};

export default function Footer({ footerContent }: FooterProps) {
  // 3. Tampilkan loading atau pesan jika data belum ada
  if (!footerContent) {
    return null; // Atau tampilkan loading skeleton
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Magang</span>
            </div>
            {/* 4. Gunakan data dari props */}
            <p className="text-base text-slate-400 leading-relaxed font-medium">
              {footerContent.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Menu</h3>
            <ul className="space-y-3 text-base">
              {/* 5. Gunakan .map() untuk merender menu secara dinamis */}
              {footerContent.menu.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-emerald-400 transition-colors font-medium">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Kebijakan</h3>
            <ul className="space-y-3 text-base">
              {/* 6. Gunakan .map() untuk merender kebijakan secara dinamis */}
              {footerContent.policy.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-emerald-400 transition-colors font-medium">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4 text-base">
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">WhatsApp</p>
                  <a href={footerContent.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-bold">
                    {footerContent.contact.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">Email</p>
                  <a href={`mailto:${footerContent.contact.email}`} className="hover:text-emerald-400 transition-colors font-bold break-all">
                    {footerContent.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-slate-400 text-sm font-medium">Lokasi</p>
                  <p className="font-bold">{footerContent.contact.location}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* 7. Gunakan data dari props, ganti {currentYear} dengan template literal */}
            <p className="text-sm text-slate-500 font-medium">
              {footerContent.copyrightText.replace('{currentYear}', currentYear.toString())}
            </p>
            <div className="flex items-center gap-4">
              {/* 8. Gunakan .map() untuk merender social media secara dinamis */}
              {footerContent.socialMedia.map((social, index) => {
                const Icon = iconMap[social.iconName];
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 hover:shadow-lg hover:shadow-emerald-500/50 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                  >
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            {/* 9. Gunakan data dari props */}
            <p>{footerContent.bottomText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}