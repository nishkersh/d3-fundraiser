'use client';

import { motion } from 'framer-motion';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Magnetic } from '@/components/ui/Magnetic';

interface HeroProps {
    onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dim overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/assets/hero-still.png"
                    className="w-full h-full object-cover"
                >
                    <source src="/assets/hero-bg.webm" type="video/webm" />
                    {/* Fallback can be the poster itself if needed */}
                </video>
                {/* Bottom Fade Gradient (Vanta Black) */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-vanta via-vanta/60 to-transparent z-20" />
            </div>

            {/* Content */}
            <div className="relative z-30 flex flex-col items-center text-center px-4">
                {/* Main Headline "D3" */}
                {/* Using CSS Text Stroke for Hollow Effect */}
                {/* Main Headline "D3" */}
                <div className="flex items-center justify-center relative">
                    <motion.h1
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        whileHover={{ scale: 1.1 }}
                        className="text-[8rem] sm:text-[16rem] leading-none font-playfair font-black select-none cursor-default"
                        style={{
                            color: 'rgba(212, 175, 55, 0.2)',
                            WebkitTextStroke: '2px #D4AF37',
                        }}
                    >
                        D
                    </motion.h1>
                    <motion.h1
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        whileHover={{ scale: 1.1 }}
                        className="text-[8rem] sm:text-[16rem] leading-none font-playfair font-black select-none cursor-default"
                        style={{
                            color: 'rgba(212, 175, 55, 0.2)',
                            WebkitTextStroke: '2px #D4AF37',
                        }}
                    >
                        3
                    </motion.h1>
                </div>

                {/* Subline */}

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                    className="text-white text-lg sm:text-2xl tracking-[0.5em] sm:tracking-[0.8em] font-bold uppercase mt-4 sm:mt-[-6rem] mb-12 relative z-50 mix-blend-difference"
                >
                    Donate Dosti Dance
                </motion.p>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                >
                    <CountdownTimer />
                </motion.div>

                {/* CTA */}
                <div className="mt-12">
                    <Magnetic>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                            onClick={onRegisterClick}
                            className="px-8 py-3 bg-gold text-vanta font-bold tracking-wider uppercase rounded-full hover:bg-white transition-all duration-300"
                        >
                            Register Now
                        </motion.button>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}
