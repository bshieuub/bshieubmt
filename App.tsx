
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import KnowledgeSection from './components/KnowledgeSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    knowledge: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sections) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-light font-sans text-dark">
      <Header onNavigate={scrollToSection} onOpenModal={openModal} />
      <main>
          <>
            <div ref={sections.home}>
              <Hero onOpenModal={openModal} />
            </div>
            <div ref={sections.about}>
              <AboutSection />
            </div>
            <div ref={sections.services}>
              <ServicesSection />
            </div>
            <div ref={sections.knowledge}>
              <KnowledgeSection />
            </div>
            <div ref={sections.testimonials}>
              <TestimonialsSection />
            </div>
            <div ref={sections.contact}>
              <ContactSection />
            </div>
          </>
      </main>
      <Footer />
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;