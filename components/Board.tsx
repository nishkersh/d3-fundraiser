'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { GoldGlowCard } from '@/components/ui/GoldGlowCard';
import { boardMembers } from '@/data/boardMembers';

export function Board() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: Parallax or fade effects can be added using useScroll here if needed

    return (
        <section id="team" className="py-20 lg:py-32 w-full bg-vanta relative overflow-hidden z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-playfair font-bold text-cream mb-4"
                >
                    THE TEAM BEHIND THE <span className="text-gold italic">MOTION</span>
                </motion.h2>
            </div>

            {/* Scroll Container */}
            <div
                ref={containerRef}
                className="
                flex overflow-x-auto gap-8 px-4 pb-12
                snap-x snap-mandatory 
                no-scrollbar 
                md:place-content-center md:flex-wrap md:overflow-visible
            "
            >
                {boardMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="snap-center shrink-0"
                    >
                        <GoldGlowCard
                            name={member.name}
                            role={member.role}
                            image={member.image}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
