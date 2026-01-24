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
            

            {/* Static Grid Layout (No moving animation) */}
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {sponsors.map((sponsor, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center gap-4 group cursor-pointer active:scale-95 transition-transform duration-200"
                        >
                            <div className="relative w-32 h-16 md:w-40 md:h-20">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain 
                                               opacity-80 
                                               filter grayscale brightness-200 
                                               transition-all duration-300 
                                               active:filter-none active:opacity-100 active:scale-110
                                               hover:filter-none hover:opacity-100 hover:scale-110"
                                />
                            </div>
                            
                            <p className="text-gold/40 text-[10px] md:text-xs font-serif uppercase tracking-widest 
                                          transition-colors duration-300 
                                          group-hover:text-gold group-active:text-gold">
                                {sponsor.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}