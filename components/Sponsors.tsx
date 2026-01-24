'use client';

import Image from 'next/image';

const sponsors = [
    { name: "Scope Entertainment", logo: "/assets/sponsor1.webp" },
    { name: "Nanhe Kadam", logo: "/assets/sponsor2.webp" },
    { name: "Financially Fearless", logo: "/assets/sponsor3.webp" },
];

export function Sponsors() {
    return (
        <section className="py-16 bg-[#1a0505] border-y border-gold/10 relative overflow-hidden z-20">
            
            <div className="text-center mb-12">
                <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-lato">
                    Our Sponsors
                </p>
            </div>

            {/* Static Grid Layout */}
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {sponsors.map((sponsor, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="relative w-32 h-16 md:w-40 md:h-20">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    // FIXED: Removed grayscale/opacity. Always full color.
                                    className="object-contain"
                                />
                            </div>
                            
                            <p className="text-gold text-[10px] md:text-xs font-serif uppercase tracking-widest text-center">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}