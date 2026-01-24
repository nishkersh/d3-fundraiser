'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Board } from '@/components/Board';
import { EventDetails } from '@/components/EventDetails';
import { Sponsors } from '@/components/Sponsors';
import { Footer } from '@/components/Footer';
import { RegistrationModal } from '@/components/RegistrationModal';
import { IntroPortal } from '@/components/IntroPortal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    // FIXED: Added bg-[#1a0505] to the main container
    <main className="relative min-h-screen bg-[#1a0505] selection:bg-gold selection:text-burgundy">
      
      {showIntro && <IntroPortal onEnter={() => setShowIntro(false)} />}
      
      <div className={showIntro ? 'hidden' : 'block'}>
        <Navbar onRegisterClick={() => setIsModalOpen(true)} />
        <Hero onRegisterClick={() => setIsModalOpen(true)} />
        <About />
        <Gallery />
        <Sponsors />
        <Board />
        <EventDetails />
        <Footer />
        {isModalOpen && <RegistrationModal onClose={() => setIsModalOpen(false)} />}
      </div>

    </main>
  );
}