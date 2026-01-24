'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoldGlowCard } from '@/components/ui/GoldGlowCard';
import { boardMembers } from '@/data/boardMembers';

export function Board() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number | string>(boardMembers[0]?.id || 1);

    // Logic to detect which card is in the center of the screen
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
            
            // Find which child is closest to the center
            const cards = Array.from(container.children) as HTMLElement[];
            let closestCardId = activeId;
            let minDistance = Infinity;

            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const distance = Math.abs(containerCenter - cardCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    const id = card.getAttribute('data-id');
                    if (id) closestCardId = id;
                }
            });

            if (closestCardId !== activeId) {
                setActiveId(closestCardId);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeId]);

    return (
        <section id="team" className="py-20 lg:py-32 w-full bg-[#1a0505] relative z-20">
            
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

            {/* Static Snap Scroll Container (No Infinite Loop) */}
            <div
                ref={containerRef}
                className="
                    flex overflow-x-auto gap-6 px-8 pb-12 w-full
                    snap-x snap-mandatory 
                    no-scrollbar 
                    items-center
                "
            >
                {boardMembers.map((member) => (
                    <div
                        key={member.id}
                        data-id={member.id}
                        className="snap-center shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[450px]"
                    >
                        <GoldGlowCard
                            name={member.name}
                            role={member.role}
                            image={member.image}
                            isActive={activeId.toString() === member.id.toString()}
                        />
                    </div>
                ))}
                
                {/* Spacer to allow last item to center */}
                <div className="shrink-0 w-4" />
            </div>
        </section>
    );
}