// src/pages/AdminPage.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminPage: React.FC = () => {
  // State untuk Homepage
  const [homeContent, setHomeContent] = useState<any>(null);
  // State untuk About
  const [aboutContent, setAboutContent] = useState<any>(null);
  // State untuk How It Works
  const [howItWorksContent, setHowItWorksContent] = useState<any>(null);
  // State untuk Positions
  const [positionsContent, setPositionsContent] = useState<any>(null);
  // State untuk Benefits
  const [benefitsContent, setBenefitsContent] = useState<any>(null);
  // State untuk Testimonials
  const [testimonialsContent, setTestimonialsContent] = useState<any>(null);
  // State untuk Registration
  const [registrationContent, setRegistrationContent] = useState<any>(null);
  // State untuk FAQ
  const [faqContent, setFaqContent] = useState<any>(null);
  // State untuk Closing CTA
  const [closingCtaContent, setClosingCtaContent] = useState<any>(null);
  // State untuk Footer
  const [footerContent, setFooterContent] = useState<any>(null);

  // Data pendaftar
  const [applicationsData, setApplicationsData] = useState<any[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');


  // ==========================================
  // FETCH DATA PENDAFTAR
  // ==========================================
  const fetchApplicationsData = async () => {
    setApplicationsLoading(true);
    try {
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setApplicationsData(data || []);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      setMessage(`Gagal memuat data pendaftar: ${error.message}`);
    } finally {
      setApplicationsLoading(false);
    }
  };


  // ==========================================
  // FETCH SEMUA CONTENT WEBSITE
  // ==========================================
  const fetchAllContent = async () => {
    setLoading(true);
    setMessage('');

    try {
      // HOMEPAGE
      const { data: homeData, error: homeError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'homepage_content')
        .single();
      if (homeError) throw homeError;

      const fixedHome = {
        stats: homeData.content?.stats ?? [
          { label: '', number: '' },
          { label: '', number: '' },
          { label: '', number: '' },
          { label: '', number: '' },
        ],
        subTitle: homeData.content?.subTitle ?? '',
        badgeText: homeData.content?.badgeText ?? '',
        mainTitle: homeData.content?.mainTitle ?? '',
        buttonText: homeData.content?.buttonText ?? '',
        secondaryButtonText: homeData.content?.secondaryButtonText ?? '',
        longDescription: homeData.content?.longDescription ?? '',
      };

      setHomeContent(fixedHome);

      // ABOUT
      const { data: aboutData, error: aboutError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'about_content')
        .single();
      if (aboutError) throw aboutError;
      setAboutContent(aboutData.content);

      // HOW IT WORKS
      const { data: howItWorksData, error: howItWorksError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'how_it_works_content')
        .single();
      if (howItWorksError) throw howItWorksError;
      setHowItWorksContent(howItWorksData.content);

      // POSITIONS
      const { data: positionsData, error: positionsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'positions_content')
        .single();
      if (positionsError) throw positionsError;
      setPositionsContent(positionsData.content);

      // BENEFITS
      const { data: benefitsData, error: benefitsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'benefits_content')
        .single();
      if (benefitsError) throw benefitsError;
      setBenefitsContent(benefitsData.content);

      // TESTIMONIALS
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'testimonials_content')
        .single();
      if (testimonialsError) throw testimonialsError;
      setTestimonialsContent(testimonialsData.content);

      // REGISTRATION
      const { data: registrationData, error: registrationError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'registration_content')
        .single();
      if (registrationError) throw registrationError;
      setRegistrationContent(registrationData.content);

      // FAQ
      const { data: faqData, error: faqError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'faq_content')
        .single();
      if (faqError) throw faqError;
      setFaqContent(faqData.content);

      // CLOSING CTA
      const { data: closingCtaData, error: closingCtaError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'closing_cta_content')
        .single();
      if (closingCtaError) throw closingCtaError;
      setClosingCtaContent(closingCtaData.content);

      // FOOTER
      const { data: footerData, error: footerError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'footer_content')
        .single();
      if (footerError) throw footerError;
      setFooterContent(footerData.content);

    } catch (error: any) {
      console.error('Error fetching content:', error);
      setMessage(`Gagal memuat data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAllContent();
    fetchApplicationsData();
  }, []);


  // ==========================================
  // HANDLE SAVE
  // ==========================================
  const handleSave = async (section: string, content: any) => {
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('site_content')
        .update({
          content: content,
          updated_at: new Date().toISOString(),
        })
        .eq('section', section);

      if (error) throw error;

      // Update state lokal
      switch (section) {
        case 'homepage_content': setHomeContent(content); break;
        case 'about_content': setAboutContent(content); break;
        case 'how_it_works_content': setHowItWorksContent(content); break;
        case 'positions_content': setPositionsContent(content); break;
        case 'benefits_content': setBenefitsContent(content); break;
        case 'testimonials_content': setTestimonialsContent(content); break;
        case 'registration_content': setRegistrationContent(content); break;
        case 'faq_content': setFaqContent(content); break;
        case 'closing_cta_content': setClosingCtaContent(content); break;
        case 'footer_content': setFooterContent(content); break;
      }

      setMessage('Perubahan berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);

    } catch (error: any) {
      console.error('Error saving:', error);
      setMessage(`Gagal menyimpan: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // LOADING SCREEN
  // ============================
  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        Memuat data...
      </div>
    );
  }

  const currentYear = new Date().getFullYear();


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* --- DATA PENDAFTAR --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Data Pendaftar Magang</h2>
        {applicationsLoading ? (
          <div className="text-center py-4">Memuat data pendaftar...</div>
        ) : applicationsData.length === 0 ? (
          <div className="text-center py-4">Belum ada data pendaftar</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicationsData.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.email}
                    </td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- EDIT HOMEPAGE (LENGKAP) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Utama</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={homeContent?.mainTitle || ''}
              onChange={(e) => setHomeContent({ ...homeContent, mainTitle: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Judul</label>
            <textarea
              value={homeContent?.subTitle || ''}
              onChange={(e) => setHomeContent({ ...homeContent, subTitle: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Tombol (Daftar)</label>
            <input
              type="text"
              value={homeContent?.buttonText || ''}
              onChange={(e) => setHomeContent({ ...homeContent, buttonText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Tombol (Lihat Posisi)</label>
            <input
              type="text"
              value={homeContent?.secondaryButtonText || ''}
              onChange={(e) => setHomeContent({ ...homeContent, secondaryButtonText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge (Atas)</label>
            <input
              type="text"
              value={homeContent?.badgeText || ''}
              onChange={(e) => setHomeContent({ ...homeContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Panjang</label>
            <textarea
              value={homeContent?.longDescription || ''}
              onChange={(e) => setHomeContent({ ...homeContent, longDescription: e.target.value })}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <hr className="my-6" />
          <h3 className="text-xl font-semibold mb-4">Edit Kotak Statistik</h3>
          <div className="space-y-3">
            {homeContent?.stats?.map((stat: any, index: number) => (
              <div key={index} className="flex gap-4 items-center p-4 border border-gray-200 rounded-md">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Angka</label>
                  <input
                    type="text"
                    value={stat.number || ''}
                    onChange={(e) => {
                      const newStats = [...homeContent.stats];
                      newStats[index] = { ...newStats[index], number: e.target.value };
                      setHomeContent({ ...homeContent, stats: newStats });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Label</label>
                  <input
                    type="text"
                    value={stat.label || ''}
                    onChange={(e) => {
                      const newStats = [...homeContent.stats];
                      newStats[index] = { ...newStats[index], label: e.target.value };
                      setHomeContent({ ...homeContent, stats: newStats });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleSave('homepage_content', homeContent)} disabled={saving} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Homepage'}
        </button>
      </div>

      {/* --- EDIT ABOUT (LENGKAP) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Tentang Kami</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={aboutContent?.badgeText || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={aboutContent?.title || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={aboutContent?.description || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Persyaratan</h3>
        <div className="space-y-3">
          {aboutContent?.requirements?.map((req: string, index: number) => (
            <input
              key={index}
              type="text"
              value={req}
              onChange={(e) => {
                const newReqs = [...aboutContent.requirements];
                newReqs[index] = e.target.value;
                setAboutContent({ ...aboutContent, requirements: newReqs });
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Fitur</h3>
        <div className="space-y-3">
          {aboutContent?.features?.map((feature: any, index: number) => (
            <div key={index} className="flex gap-4 items-center p-4 border border-gray-200 rounded-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Emoji</label>
                <input
                  type="text"
                  value={feature.emoji || ''}
                  onChange={(e) => {
                    const newFeatures = [...aboutContent.features];
                    newFeatures[index] = { ...newFeatures[index], emoji: e.target.value };
                    setAboutContent({ ...aboutContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Judul</label>
                <input
                  type="text"
                  value={feature.title || ''}
                  onChange={(e) => {
                    const newFeatures = [...aboutContent.features];
                    newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                    setAboutContent({ ...aboutContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <input
                  type="text"
                  value={feature.description || ''}
                  onChange={(e) => {
                    const newFeatures = [...aboutContent.features];
                    newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                    setAboutContent({ ...aboutContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => handleSave('about_content', aboutContent)} disabled={saving} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan About'}
        </button>
      </div>

      {/* --- EDIT HOW IT WORKS --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Cara Kerja</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={howItWorksContent?.title || ''}
              onChange={(e) => setHowItWorksContent({ ...howItWorksContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Judul</label>
            <textarea
              value={howItWorksContent?.subtitle || ''}
              onChange={(e) => setHowItWorksContent({ ...howItWorksContent, subtitle: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Langkah-langkah</h3>
        <div className="space-y-6">
          {howItWorksContent?.steps?.map((step: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Langkah {index + 1}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Icon</label>
                  <select
                    value={step.icon_name || ''}
                    onChange={(e) => {
                      const newSteps = [...howItWorksContent.steps];
                      newSteps[index] = { ...newSteps[index], icon_name: e.target.value };
                      setHowItWorksContent({ ...howItWorksContent, steps: newSteps });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="ClipboardList">ClipboardList</option>
                    <option value="GraduationCap">GraduationCap</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomor</label>
                  <input
                    type="text"
                    value={step.number || ''}
                    onChange={(e) => {
                      const newSteps = [...howItWorksContent.steps];
                      newSteps[index] = { ...newSteps[index], number: e.target.value };
                      setHowItWorksContent({ ...howItWorksContent, steps: newSteps });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Judul Langkah</label>
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => {
                    const newSteps = [...howItWorksContent.steps];
                    newSteps[index] = { ...newSteps[index], title: e.target.value };
                    setHowItWorksContent({ ...howItWorksContent, steps: newSteps });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Deskripsi Langkah</label>
                <textarea
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...howItWorksContent.steps];
                    newSteps[index] = { ...newSteps[index], description: e.target.value };
                    setHowItWorksContent({ ...howItWorksContent, steps: newSteps });
                  }}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kelas Warna (contoh: from-emerald-500 to-emerald-600)</label>
                <input
                  type="text"
                  value={step.color_class || ''}
                  onChange={(e) => {
                    const newSteps = [...howItWorksContent.steps];
                    newSteps[index] = { ...newSteps[index], color_class: e.target.value };
                    setHowItWorksContent({ ...howItWorksContent, steps: newSteps });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Callout (Bagian Bawah)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Callout</label>
            <input
              type="text"
              value={howItWorksContent?.callout?.text || ''}
              onChange={(e) => setHowItWorksContent({ ...howItWorksContent, callout: { ...howItWorksContent.callout, text: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button onClick={() => handleSave('how_it_works_content', howItWorksContent)} disabled={saving} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Cara Kerja'}
        </button>
      </div>

      {/* --- EDIT POSISI (LENGKAP) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Posisi</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={positionsContent?.badgeText || ''}
              onChange={(e) => setPositionsContent({ ...positionsContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={positionsContent?.title || ''}
              onChange={(e) => setPositionsContent({ ...positionsContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={positionsContent?.description || ''}
              onChange={(e) => setPositionsContent({ ...positionsContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Daftar Posisi</h3>
        <div className="space-y-6">
          {positionsContent?.positions?.map((position: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Posisi {index + 1}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Icon</label>
                  <input
                    type="text"
                    value={position.iconName || ''}
                    onChange={(e) => {
                      const newPositions = [...positionsContent.positions];
                      newPositions[index] = { ...newPositions[index], iconName: e.target.value };
                      setPositionsContent({ ...positionsContent, positions: newPositions });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Warna Gradient</label>
                  <input
                    type="text"
                    value={position.color || ''}
                    onChange={(e) => {
                      const newPositions = [...positionsContent.positions];
                      newPositions[index] = { ...newPositions[index], color: e.target.value };
                      setPositionsContent({ ...positionsContent, positions: newPositions });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Judul Posisi</label>
                <input
                  type="text"
                  value={position.title || ''}
                  onChange={(e) => {
                    const newPositions = [...positionsContent.positions];
                    newPositions[index] = { ...newPositions[index], title: e.target.value };
                    setPositionsContent({ ...positionsContent, positions: newPositions });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Deskripsi Posisi</label>
                <textarea
                  value={position.description || ''}
                  onChange={(e) => {
                    const newPositions = [...positionsContent.positions];
                    newPositions[index] = { ...newPositions[index], description: e.target.value };
                    setPositionsContent({ ...positionsContent, positions: newPositions });
                  }}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={position.requirements?.join(', ') || ''}
                  onChange={(e) => {
                    const newPositions = [...positionsContent.positions];
                    newPositions[index] = { ...newPositions[index], requirements: e.target.value.split(',').map(req => req.trim()) };
                    setPositionsContent({ ...positionsContent, positions: newPositions });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Callout (Bagian Bawah)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Callout</label>
            <input
              type="text"
              value={positionsContent?.calloutTitle || ''}
              onChange={(e) => setPositionsContent({ ...positionsContent, calloutTitle: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Callout</label>
            <input
              type="text"
              value={positionsContent?.calloutDescription || ''}
              onChange={(e) => setPositionsContent({ ...positionsContent, calloutDescription: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button onClick={() => handleSave('positions_content', positionsContent)} disabled={saving} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Posisi'}
        </button>
      </div>

      {/* --- EDIT BENEFITS (LENGKAP) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Benefits</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={benefitsContent?.badgeText || ''}
              onChange={(e) => setBenefitsContent({ ...benefitsContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={benefitsContent?.title || ''}
              onChange={(e) => setBenefitsContent({ ...benefitsContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={benefitsContent?.description || ''}
              onChange={(e) => setBenefitsContent({ ...benefitsContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Daftar Benefit</h3>
        <div className="space-y-6">
          {benefitsContent?.benefits?.map((benefit: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Benefit {index + 1}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Icon</label>
                  <input
                    type="text"
                    value={benefit.iconName || ''}
                    onChange={(e) => {
                      const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], iconName: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emoji</label>
                  <input
                    type="text"
                    value={benefit.emoji || ''}
                    onChange={(e) => {
                      const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], emoji: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Judul Benefit</label>
                <input
                  type="text"
                  value={benefit.title || ''}
                  onChange={(e) => {
                    const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], title: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Deskripsi Benefit</label>
                <textarea
                  value={benefit.description || ''}
                  onChange={(e) => {
                    const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], description: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                  }}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Warna Icon</label>
                  <input
                    type="text"
                    value={benefit.color || ''}
                    onChange={(e) => {
                      const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], color: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bg Color</label>
                  <input
                    type="text"
                    value={benefit.bgColor || ''}
                    onChange={(e) => {
                      const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], bgColor: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Border Color</label>
                  <input
                    type="text"
                    value={benefit.borderColor || ''}
                    onChange={(e) => {
                      const newBenefits = [...benefitsContent.benefits];
                      newBenefits[index] = { ...newBenefits[index], borderColor: e.target.value };
                      setBenefitsContent({ ...benefitsContent, benefits: newBenefits });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Callout (Bagian Bawah)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Callout</label>
            <input
              type="text"
              value={benefitsContent?.callout?.title || ''}
              onChange={(e) => setBenefitsContent({ ...benefitsContent, callout: { ...benefitsContent.callout, title: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Callout</label>
            <input
              type="text"
              value={benefitsContent?.callout?.description || ''}
              onChange={(e) => setBenefitsContent({ ...benefitsContent, callout: { ...benefitsContent.callout, description: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <h4 className="font-semibold mt-4">Edit Statistik di Callout</h4>
          <div className="grid grid-cols-3 gap-4">
            {benefitsContent?.callout?.stats?.map((stat: any, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={stat.number || ''}
                  onChange={(e) => {
                    const newStats = [...benefitsContent.callout.stats];
                    newStats[index] = { ...newStats[index], number: e.target.value };
                    setBenefitsContent({ ...benefitsContent, callout: { ...benefitsContent.callout, stats: newStats } });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Angka"
                />
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => {
                    const newStats = [...benefitsContent.callout.stats];
                    newStats[index] = { ...newStats[index], label: e.target.value };
                    setBenefitsContent({ ...benefitsContent, callout: { ...benefitsContent.callout, stats: newStats } });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleSave('benefits_content', benefitsContent)} disabled={saving} className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Benefits'}
        </button>
      </div>

      {/* --- EDIT TESTIMONIALS (YANG DITAMBAHKAN) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Testimonials</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={testimonialsContent?.badgeText || ''}
              onChange={(e) => setTestimonialsContent({ ...testimonialsContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={testimonialsContent?.title || ''}
              onChange={(e) => setTestimonialsContent({ ...testimonialsContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={testimonialsContent?.description || ''}
              onChange={(e) => setTestimonialsContent({ ...testimonialsContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Daftar Testimoni</h3>
        <div className="space-y-6">
          {testimonialsContent?.testimonials?.map((testimonial: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Testimoni {index + 1}</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    value={testimonial.name || ''}
                    onChange={(e) => {
                      const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], name: e.target.value };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => {
                      const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], role: e.target.value };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                <input
                  type="text"
                  value={testimonial.image || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], image: e.target.value };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Quote</label>
                <textarea
                  value={testimonial.quote || ''}
                  onChange={(e) => {
                    const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], quote: e.target.value };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating || ''}
                    onChange={(e) => {
                      const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], rating: parseInt(e.target.value) };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Achievement</label>
                  <input
                    type="text"
                    value={testimonial.achievement || ''}
                    onChange={(e) => {
                      const newTestimonials = [...testimonialsContent.testimonials];
                      newTestimonials[index] = { ...newTestimonials[index], achievement: e.target.value };
                      setTestimonialsContent({ ...testimonialsContent, testimonials: newTestimonials });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Callout (Bagian Bawah)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Callout</label>
            <input
              type="text"
              value={testimonialsContent?.callout?.text || ''}
              onChange={(e) => setTestimonialsContent({ ...testimonialsContent, callout: { ...testimonialsContent.callout, text: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button onClick={() => handleSave('testimonials_content', testimonialsContent)} disabled={saving} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Testimonials'}
        </button>
      </div>

      {/* --- EDIT REGISTRATION (YANG DITAMBAHKAN) --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman Pendaftaran</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={registrationContent?.title || ''}
              onChange={(e) => setRegistrationContent({ ...registrationContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={registrationContent?.description || ''}
              onChange={(e) => setRegistrationContent({ ...registrationContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Pesan Sukses</label>
            <input
              type="text"
              value={registrationContent?.successTitle || ''}
              onChange={(e) => setRegistrationContent({ ...registrationContent, successTitle: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pesan Sukses</label>
            <textarea
              value={registrationContent?.successMessage || ''}
              onChange={(e) => setRegistrationContent({ ...registrationContent, successMessage: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Field Formulir</h3>
        <div className="space-y-6">
          {registrationContent?.fields?.map((field: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Field {index + 1} (Name: {field.name})</h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Label</label>
                  <input
                    type="text"
                    value={field.label || ''}
                    onChange={(e) => {
                      const newFields = [...registrationContent.fields];
                      newFields[index] = { ...newFields[index], label: e.target.value };
                      setRegistrationContent({ ...registrationContent, fields: newFields });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Placeholder</label>
                  <input
                    type="text"
                    value={field.placeholder || ''}
                    onChange={(e) => {
                      const newFields = [...registrationContent.fields];
                      newFields[index] = { ...newFields[index], placeholder: e.target.value };
                      setRegistrationContent({ ...registrationContent, fields: newFields });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipe</label>
                  <select
                    value={field.type || 'text'}
                    onChange={(e) => {
                      const newFields = [...registrationContent.fields];
                      newFields[index] = { ...newFields[index], type: e.target.value };
                      setRegistrationContent({ ...registrationContent, fields: newFields });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Nomor Telepon</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required || false}
                    onChange={(e) => {
                      const newFields = [...registrationContent.fields];
                      newFields[index] = { ...newFields[index], required: e.target.checked };
                      setRegistrationContent({ ...registrationContent, fields: newFields });
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Wajib Diisi</label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Opsi Posisi</h3>
        <div className="space-y-3">
          {registrationContent?.positionOptions?.map((option: string, index: number) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...registrationContent.positionOptions];
                newOptions[index] = e.target.value;
                setRegistrationContent({ ...registrationContent, positionOptions: newOptions });
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          ))}
          <button
            onClick={() => {
              const newOptions = [...(registrationContent.positionOptions || []), ''];
              setRegistrationContent({ ...registrationContent, positionOptions: newOptions });
            }}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Tambah Opsi Posisi Baru
          </button>
        </div>
        <button onClick={() => handleSave('registration_content', registrationContent)} disabled={saving} className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Pendaftaran'}
        </button>
      </div>

      {/* --- EDIT FAQ --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Halaman FAQ</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={faqContent?.badgeText || ''}
              onChange={(e) => setFaqContent({ ...faqContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={faqContent?.title || ''}
              onChange={(e) => setFaqContent({ ...faqContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={faqContent?.description || ''}
              onChange={(e) => setFaqContent({ ...faqContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Daftar FAQ</h3>
        <div className="space-y-6">
          {faqContent?.faqs?.map((faq: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">FAQ {index + 1}</h4>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Pertanyaan</label>
                <textarea
                  value={faq.question || ''}
                  onChange={(e) => {
                    const newFaqs = [...faqContent.faqs];
                    newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                    setFaqContent({ ...faqContent, faqs: newFaqs });
                  }}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Jawaban</label>
                <textarea
                  value={faq.answer || ''}
                  onChange={(e) => {
                    const newFaqs = [...faqContent.faqs];
                    newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                    setFaqContent({ ...faqContent, faqs: newFaqs });
                  }}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Callout (Bagian Bawah)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Callout</label>
            <input
              type="text"
              value={faqContent?.callout?.title || ''}
              onChange={(e) => setFaqContent({ ...faqContent, callout: { ...faqContent.callout, title: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Callout</label>
            <input
              type="text"
              value={faqContent?.callout?.description || ''}
              onChange={(e) => setFaqContent({ ...faqContent, callout: { ...faqContent.callout, description: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Tombol</label>
            <input
              type="text"
              value={faqContent?.callout?.buttonText || ''}
              onChange={(e) => setFaqContent({ ...faqContent, callout: { ...faqContent.callout, buttonText: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link Tombol</label>
            <input
              type="text"
              value={faqContent?.callout?.buttonLink || ''}
              onChange={(e) => setFaqContent({ ...faqContent, callout: { ...faqContent.callout, buttonLink: e.target.value } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button onClick={() => handleSave('faq_content', faqContent)} disabled={saving} className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan FAQ'}
        </button>
      </div>

      {/* --- EDIT CLOSING CTA --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Penutup (Closing CTA)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
            <input
              type="text"
              value={closingCtaContent?.badgeText || ''}
              onChange={(e) => setClosingCtaContent({ ...closingCtaContent, badgeText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
            <input
              type="text"
              value={closingCtaContent?.title || ''}
              onChange={(e) => setClosingCtaContent({ ...closingCtaContent, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={closingCtaContent?.description || ''}
              onChange={(e) => setClosingCtaContent({ ...closingCtaContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Fitur (3 Kotak)</h3>
        <div className="space-y-6">
          {closingCtaContent?.features?.map((feature: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Fitur {index + 1}</h4>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emoji</label>
                  <input
                    type="text"
                    value={feature.emoji || ''}
                    onChange={(e) => {
                      const newFeatures = [...closingCtaContent.features];
                      newFeatures[index] = { ...newFeatures[index], emoji: e.target.value };
                      setClosingCtaContent({ ...closingCtaContent, features: newFeatures });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Judul</label>
                  <input
                    type="text"
                    value={feature.title || ''}
                    onChange={(e) => {
                      const newFeatures = [...closingCtaContent.features];
                      newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                      setClosingCtaContent({ ...closingCtaContent, features: newFeatures });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teks</label>
                  <input
                    type="text"
                    value={feature.text || ''}
                    onChange={(e) => {
                      const newFeatures = [...closingCtaContent.features];
                      newFeatures[index] = { ...newFeatures[index], text: e.target.value };
                      setClosingCtaContent({ ...closingCtaContent, features: newFeatures });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-6" />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Tombol</label>
            <input
              type="text"
              value={closingCtaContent?.buttonText || ''}
              onChange={(e) => setClosingCtaContent({ ...closingCtaContent, buttonText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Footer (Di bawah tombol)</label>
            <input
              type="text"
              value={closingCtaContent?.footerText || ''}
              onChange={(e) => setClosingCtaContent({ ...closingCtaContent, footerText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Statistik (Paling Bawah)</h3>
        <div className="space-y-3">
          {closingCtaContent?.stats?.map((stat: any, index: number) => (
            <input
              key={index}
              type="text"
              value={stat.label || ''}
              onChange={(e) => {
                const newStats = [...closingCtaContent.stats];
                newStats[index] = { ...newStats[index], label: e.target.value };
                setClosingCtaContent({ ...closingCtaContent, stats: newStats });
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          ))}
        </div>
        <button onClick={() => handleSave('closing_cta_content', closingCtaContent)} disabled={saving} className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Closing CTA'}
        </button>
      </div>

      {/* --- EDIT FOOTER --- */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Konten Footer</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Perusahaan</label>
            <textarea
              value={footerContent?.description || ''}
              onChange={(e) => setFooterContent({ ...footerContent, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Menu</h3>
        <div className="space-y-3">
          {footerContent?.menu?.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-center p-4 border border-gray-200 rounded-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Teks</label>
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => {
                    const newMenu = [...footerContent.menu];
                    newMenu[index] = { ...newMenu[index], text: e.target.value };
                    setFooterContent({ ...footerContent, menu: newMenu });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={item.href || ''}
                  onChange={(e) => {
                    const newMenu = [...footerContent.menu];
                    newMenu[index] = { ...newMenu[index], href: e.target.value };
                    setFooterContent({ ...footerContent, menu: newMenu });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const newMenu = [...(footerContent.menu || []), { text: '', href: '#' }];
            setFooterContent({ ...footerContent, menu: newMenu });
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Tambah Menu Baru
        </button>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Kebijakan</h3>
        <div className="space-y-3">
          {footerContent?.policy?.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-center p-4 border border-gray-200 rounded-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Teks</label>
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => {
                    const newPolicy = [...footerContent.policy];
                    newPolicy[index] = { ...newPolicy[index], text: e.target.value };
                    setFooterContent({ ...footerContent, policy: newPolicy });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={item.href || ''}
                  onChange={(e) => {
                    const newPolicy = [...footerContent.policy];
                    newPolicy[index] = { ...newPolicy[index], href: e.target.value };
                    setFooterContent({ ...footerContent, policy: newPolicy });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const newPolicy = [...(footerContent.policy || []), { text: '', href: '#' }];
            setFooterContent({ ...footerContent, policy: newPolicy });
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Tambah Kebijakan Baru
        </button>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Informasi Kontak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <input
              type="text"
              value={footerContent?.contact?.whatsapp || ''}
              onChange={(e) => {
                const newContact = { ...footerContent.contact };
                newContact.whatsapp = e.target.value;
                setFooterContent({ ...footerContent, contact: newContact });
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link WhatsApp</label>
            <input
              type="text"
              value={footerContent?.contact?.whatsappLink || ''}
              onChange={(e) => {
                const newContact = { ...footerContent.contact };
                newContact.whatsappLink = e.target.value;
                setFooterContent({ ...footerContent, contact: newContact });
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={footerContent?.contact?.email || ''}
              onChange={(e) => {
                const newContact = { ...footerContent.contact };
                newContact.email = e.target.value;
                setFooterContent({ ...footerContent, contact: newContact });
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lokasi</label>
            <input
              type="text"
              value={footerContent?.contact?.location || ''}
              onChange={(e) => {
                const newContact = { ...footerContent.contact };
                newContact.location = e.target.value;
                setFooterContent({ ...footerContent, contact: newContact });
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Media Sosial</h3>
        <div className="space-y-3">
          {footerContent?.socialMedia?.map((social: any, index: number) => (
            <div key={index} className="flex gap-4 items-center p-4 border border-gray-200 rounded-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Nama Ikon</label>
                <select
                  value={social.iconName || ''}
                  onChange={(e) => {
                    const newSocialMedia = [...footerContent.socialMedia];
                    newSocialMedia[index] = { ...newSocialMedia[index], iconName: e.target.value };
                    setFooterContent({ ...footerContent, socialMedia: newSocialMedia });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="MessageCircle">MessageCircle</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Mail">Mail</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  value={social.href || ''}
                  onChange={(e) => {
                    const newSocialMedia = [...footerContent.socialMedia];
                    newSocialMedia[index] = { ...newSocialMedia[index], href: e.target.value };
                    setFooterContent({ ...footerContent, socialMedia: newSocialMedia });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const newSocialMedia = [...(footerContent.socialMedia || []), { iconName: 'MessageCircle', href: '#' }];
            setFooterContent({ ...footerContent, socialMedia: newSocialMedia });
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Tambah Media Sosial Baru
        </button>
        <hr className="my-6" />
        <h3 className="text-xl font-semibold mb-4">Edit Teks Hak Cipta & Bawah</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Hak Cipta (gunakan {currentYear} untuk tahun saat ini)</label>
            <input
              type="text"
              value={footerContent?.copyrightText || ''}
              onChange={(e) => setFooterContent({ ...footerContent, copyrightText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teks Bawah</label>
            <input
              type="text"
              value={footerContent?.bottomText || ''}
              onChange={(e) => setFooterContent({ ...footerContent, bottomText: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button onClick={() => handleSave('footer_content', footerContent)} disabled={saving} className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Footer'}
        </button>
      </div>

      {message && (
        <div className={`mt-6 p-4 rounded-md ${message.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminPage;