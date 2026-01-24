'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroPortal } from '@/components/IntroPortal';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Board } from '@/components/Board';
import { EventDetails } from '@/components/EventDetails';
import { Footer } from '@/components/Footer';
import { RegistrationModal } from '@/components/RegistrationModal';
import { Sponsors } from '@/components/Sponsors';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnter = () => {
    setShowIntro(false);
  };

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-burgundy selection:bg-gold selection:text-burgundy">

      {/* 1. Intro Portal Layer (Z-Index 50) */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100]"
          >
            <IntroPortal onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Site Content (Hidden or behind Intro) */}
      <div className={`relative ${showIntro ? 'h-screen overflow-hidden' : 'min-h-screen w-full'}`}>

        {/* Navbar */}
        <Navbar onRegisterClick={handleRegisterClick} />

        {/* Hero Section */}
        <Hero onRegisterClick={handleRegisterClick} />

        {/* Content Sections */}
        <About />
        <Gallery />
        <Sponsors />
        <Board />
        <EventDetails />
        <Footer />

        {/* Registration Modal Overlay (Z-Index 100) */}
        <AnimatePresence>
          {isModalOpen && (
            <RegistrationModal onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
