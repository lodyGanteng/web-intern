import Hero from './components/Hero';
import About from './components/About';
import Positions from './components/Positions';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import RegistrationForm from './components/RegistrationForm';
import FAQ from './components/FAQ';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

function App() {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPositions = () => {
    const element = document.getElementById('positions');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onDaftarClick={scrollToRegister} onPelajariClick={scrollToPositions} />
      <About />
      <Positions />
      <Benefits />
      <Testimonials />
      <RegistrationForm />
      <FAQ />
      <ClosingCTA onDaftarClick={scrollToRegister} />
      <Footer />
    </div>
  );
}

export default App;
