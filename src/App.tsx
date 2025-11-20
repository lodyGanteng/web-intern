// src/App.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase'; // Sesuaikan path jika perlu

// Import semua komponen Anda
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Positions from './components/Positions';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import RegistrationForm from './components/RegistrationForm';
import FAQ from './components/FAQ';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

function App() {
  // State untuk Homepage
  const [heroContent, setHeroContent] = useState<any>(null);
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
  // --- TAMBAHKAN STATE UNTUK FOOTER ---
  const [footerContent, setFooterContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- FUNGSI UNTUK MENGAMBIL SEMUA KONTEN ---
  const fetchAllContent = async () => {
    setLoading(true);

    try {
      // Ambil data homepage
      const { data: homeData, error: homeError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'homepage_content')
        .single();
      if (homeError) throw homeError;
      setHeroContent(homeData.content);

      // Ambil data about
      const { data: aboutData, error: aboutError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'about_content')
        .single();
      if (aboutError) throw aboutError;
      setAboutContent(aboutData.content);

      // Ambil data How It Works
      const { data: howItWorksData, error: howItWorksError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'how_it_works_content')
        .single();
      if (howItWorksError) throw howItWorksError;
      setHowItWorksContent(howItWorksData.content);

      // Ambil data positions
      const { data: positionsData, error: positionsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'positions_content')
        .single();
      if (positionsError) throw positionsError;
      setPositionsContent(positionsData.content);

      // Ambil data benefits
      const { data: benefitsData, error: benefitsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'benefits_content')
        .single();
      if (benefitsError) throw benefitsError;
      setBenefitsContent(benefitsData.content);

      // Ambil data testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'testimonials_content')
        .single();
      if (testimonialsError) throw testimonialsError;
      setTestimonialsContent(testimonialsData.content);

      // Ambil data registration
      const { data: registrationData, error: registrationError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'registration_content')
        .single();
      if (registrationError) throw registrationError;
      setRegistrationContent(registrationData.content);

      // Ambil data FAQ
      const { data: faqData, error: faqError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'faq_content')
        .single();
      if (faqError) throw faqError;
      setFaqContent(faqData.content);

      // Ambil data Closing CTA
      const { data: closingCtaData, error: closingCtaError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'closing_cta_content')
        .single();
      if (closingCtaError) throw closingCtaError;
      setClosingCtaContent(closingCtaData.content);

      // --- AMBIL DATA FOOTER ---
      const { data: footerData, error: footerError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', 'footer_content')
        .single();
      if (footerError) throw footerError;
      setFooterContent(footerData.content);

    } catch (error: any) {
      console.error('Error fetching content:', error.message);
      // Anda bisa menambahkan logika untuk menampilkan pesan error ke user di sini
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const scrollToRegister = () => {
    const element = document.getElementById('register');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPositions = () => {
    const element = document.getElementById('positions');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Tampilkan loading sementara
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat halaman...</div>;
  }

  return (
    <div className="min-h-screen">
      <Hero 
        heroContent={heroContent} 
        onDaftarClick={scrollToRegister} 
        onPelajariClick={scrollToPositions} 
      />
      
      <About aboutContent={aboutContent} />
      
      <HowItWorks howItWorksContent={howItWorksContent} />
      
      <Positions positionsContent={positionsContent} />
      
      <Benefits benefitsContent={benefitsContent} />
      
      <Testimonials testimonialsContent={testimonialsContent} />
      
      <RegistrationForm registrationContent={registrationContent} />
      
      <FAQ faqContent={faqContent} />
      
      <ClosingCTA closingCtaContent={closingCtaContent} onDaftarClick={scrollToRegister} />
      
      {/* --- RENDER KOMPONEN FOOTER DENGAN PROPS --- */}
      <Footer footerContent={footerContent} />
    </div>
  );
}

export default App;