'use client';

import { ContainerScroll } from '@/components/ui/ContainerScroll';
import Image from 'next/image';

export function About() {
    return (
        <section id="about" className="bg-black relative overflow-hidden">
            {/* Background Texture/Gradient if needed, keeping it simple for now as the ContainerScroll has its own BG */}

            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gold tracking-widest uppercase mb-4">
                            A Decade of Impact
                        </h1>
                    </>
                }
            >
                <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 md:px-8">
                    {/* Content */}
                    <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white mb-2">
                        Rotaract Club Chandigarh (Est. 1972)
                    </h2>

                    <div className="h-[1px] w-24 bg-gold mx-auto my-6" />

                    <p className="text-lg md:text-2xl font-lato text-cream/90 max-w-3xl leading-relaxed">
                        For over 50 years, we have been the heartbeat of youth leadership.
                        <span className="text-gold font-bold mx-2">D3</span>
                        is our flagship fundraiser, blending passion with purpose to help TB patients breathe easier.
                    </p>

                    {/* Optional: Add a subtle decorative element or image if desired inside the card */}
                    <div className="mt-8 relative w-24 h-24 opacity-20 animate-spin-slow">
                        <Image
                            src="/assets/logo-main.webp"
                            alt="Watermark"
                            fill
                            className="object-contain grayscale"
                        />
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
}
