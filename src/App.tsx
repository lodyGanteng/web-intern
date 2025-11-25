// src/App.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Import semua komponen
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
  const [heroContent, setHeroContent] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [howItWorksContent, setHowItWorksContent] = useState<any>(null);
  const [positionsContent, setPositionsContent] = useState<any>(null);
  const [benefitsContent, setBenefitsContent] = useState<any>(null);
  const [testimonialsContent, setTestimonialsContent] = useState<any>(null);
  const [registrationContent, setRegistrationContent] = useState<any>(null);
  const [faqContent, setFaqContent] = useState<any>(null);
  const [closingCtaContent, setClosingCtaContent] = useState<any>(null);
  const [footerContent, setFooterContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAllContent = async () => {
    setLoading(true);

    try {
      const fetchSection = async (section: string) => {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('section', section)
          .single();
        if (error) throw error;
        return data.content;
      };

      setHeroContent(await fetchSection('homepage_content'));
      setAboutContent(await fetchSection('about_content'));
      setHowItWorksContent(await fetchSection('how_it_works_content'));
      setPositionsContent(await fetchSection('positions_content'));
      setBenefitsContent(await fetchSection('benefits_content'));
      setTestimonialsContent(await fetchSection('testimonials_content'));
      setRegistrationContent(await fetchSection('registration_content'));
      setFaqContent(await fetchSection('faq_content'));
      setClosingCtaContent(await fetchSection('closing_cta_content'));
      setFooterContent(await fetchSection('footer_content'));

    } catch (error: any) {
      console.error('Error fetching content:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPositions = () => {
    document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat halaman...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* HERO — sudah mengirim heroContent agar hero tidak berantakan */}
        <Hero  
          homepage_content={heroContent}
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
      <Footer footerContent={footerContent} />
    </div>
  );
}

export default App;
