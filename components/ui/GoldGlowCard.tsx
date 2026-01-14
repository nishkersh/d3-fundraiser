'use client';


import Image from 'next/image';

interface GoldGlowCardProps {
    image: string;
    name: string;
    role: string;
}

export function GoldGlowCard({ image, name, role }: GoldGlowCardProps) {
    return (
        <div className="relative group w-[280px] h-[380px] sm:w-[300px] sm:h-[420px] transition-all duration-300">
            {/* Container wrapper for "inset" scale effect */}
            <div
                className="w-full h-full rounded-[20px] transition-all duration-300 group-hover:scale-[0.98]"
            >
                {/* The Card Itself */}
                <div
                    className="
            relative w-full h-full 
            bg-gradient-to-b from-[#1a0505] to-burgundy 
            rounded-[20px] 
            border border-gold/40 
            overflow-hidden 
            flex flex-col items-center justify-center 
            transition-all duration-300
            group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
            group-hover:border-gold
          "
                >
                    {/* Background Glare Effect (Subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Profile Image */}
                    <div className="relative w-full flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/50 mb-4">
                        {/* Image */}
                        {/* Changed to object-contain to ensure full asset visibility as requested */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center px-4 relative z-10">
                        <h3 className="text-2xl font-playfair font-bold text-gold mb-2 group-hover:translate-y-[-2px] transition-transform duration-300">
                            {name}
                        </h3>
                        <p className="text-sm font-lato uppercase tracking-[0.2em] text-cream/70 group-hover:text-cream transition-colors duration-300">
                            {role}
                        </p>
                    </div>

                    {/* Decorative Corner Elements (Cyber-style adaptation) */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-gold/20 group-hover:border-gold/60 transition-colors" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-gold/20 group-hover:border-gold/60 transition-colors" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-gold/20 group-hover:border-gold/60 transition-colors" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-gold/20 group-hover:border-gold/60 transition-colors" />
                </div>
            </div>
        </div>
    );
}
