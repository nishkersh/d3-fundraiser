'use client';

import { motion } from 'framer-motion';
import { CinematicGallery } from '@/components/CinematicGallery';

export function Gallery() {
    return (
        <section id="gallery" className="relative py-20 w-full bg-[#0a0202] text-center">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-playfair font-bold text-transparent mb-12 select-none"
                    style={{
                        WebkitTextStroke: '1px #D4AF37',
                    }}
                >
                </motion.h2>

                <CinematicGallery />

                <p className="text-cream/40 mt-8 text-sm uppercase tracking-widest animate-pulse">
                    Swipe Left Or Right to Explore
                </p>
            </div>
        </section>
    );
}

