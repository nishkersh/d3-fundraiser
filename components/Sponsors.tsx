'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const sponsors = [
    { name: "Scope Entertainment", logo: "/assets/sponsor1.webp" },
    { name: "Nanhe Kadam", logo: "/assets/sponsor2.webp" },
    { name: "Financially Fearless", logo: "/assets/sponsor3.webp" },
];

export function Sponsors() {
    // Duplicate list 4 times for a smooth seamless loop
    const infiniteSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

    return (
        <section className="py-16 bg-[#1a0505] border-y border-gold/10 relative overflow-hidden z-20">
            
            <div className="text-center mb-12">
                <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-lato">
                    Powered By
                </p>
            </div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden mask-linear-fade">
                <motion.div
                    className="flex gap-20 items-center px-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Slower speed so text is readable
                    }}
                >
                    {infiniteSponsors.map((sponsor, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center justify-center gap-4 flex-shrink-0 group cursor-pointer w-48"
                        >
                            {/* Logo Container */}
                            <div className="relative w-32 h-20 transition-transform duration-300 group-hover:scale-110">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain filter grayscale brightness-200 opacity-70 transition-all duration-300 group-hover:filter-none group-hover:opacity-100"
                                />
                            </div>
                            
                            {/* Sponsor Name */}
                            <p className="text-center text-xs md:text-sm font-playfair text-gold/60 uppercase tracking-widest transition-colors duration-300 group-hover:text-gold group-hover:font-bold">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}