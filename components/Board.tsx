'use client';

import { motion } from 'framer-motion';
import { GoldGlowCard } from '@/components/ui/GoldGlowCard';
import { boardMembers } from '@/data/boardMembers';

export function Board() {
    // 1. Duplicate the data to create the seamless loop illusion
    // We concatenate the array with itself so the end connects to the start
    const infiniteMembers = [...boardMembers, ...boardMembers];

    return (
        <section id="team" className="py-20 lg:py-32 w-full bg-[#1a0505] relative overflow-hidden z-20">
            
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

            {/* 2. Infinite Marquee Track */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks to fade edges (Optional polish) */}
                <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-[#1a0505] to-transparent" />
                <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-[#1a0505] to-transparent" />

                <motion.div
                    className="flex gap-6 md:gap-10 w-max px-4"
                    // 3. The Animation: Move from 0 to -50% (halfway)
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40, // Speed: Higher number = Slower scroll
                    }}
                    // 4. Pause interaction
                    whileHover={{ animationPlayState: "paused" }} 
                    onMouseEnter={(e) => {
                        // Force pause via style for better browser support
                        e.currentTarget.style.animationPlayState = 'paused';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                    }}
                >
                    {infiniteMembers.map((member, index) => (
                        <div
                            // Use index in key because IDs are duplicated
                            key={`${member.id}-${index}`}
                            className="shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[450px]"
                        >
                            <GoldGlowCard
                                name={member.name}
                                role={member.role}
                                image={member.image}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}