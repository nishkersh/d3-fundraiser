'use client';

import React from "react";
import Image from 'next/image';
import { ContainerScroll } from "./ui/ContainerScroll";

export function About() {
  return (
    <section id="about" className="relative z-10 bg-[#1a0505]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gold mb-2 tracking-widest uppercase">
              A Legacy of Service
            </h1>
            <p className="text-white/60 text-xs md:text-xl font-lato tracking-[0.3em] mb-8 uppercase">
              Rotaract Club Of Chandigarh | Established 1972
            </p>
          </>
        }
      >
        <div className="flex flex-col justify-center h-full px-6 py-4 text-center space-y-6 relative overflow-hidden">
          
          {/* Section 1: History */}
          <div className="relative z-10">
            <h3 className="text-gold font-playfair text-xl md:text-2xl mb-2">
              The Pioneer Club
            </h3>
            <p className="text-cream/80 text-sm md:text-base font-lato leading-relaxed max-w-2xl mx-auto">
              As the oldest club in District 3080, we are a pioneering youth organization affiliated with Rotary International. For over 50 years, we have empowered young adults to lead, serve, and grow.
            </p>
          </div>

          {/* Golden Divider */}
          <div className="relative z-10 w-16 h-[1px] bg-gold/50 mx-auto" />

          {/* Section 2: Philosophy (The Highlight) */}
          <div className="relative z-10">
            <p className="text-cream/90 text-sm md:text-lg font-playfair italic">
              Driven by the principle of
            </p>
            <span className="text-gold text-2xl md:text-4xl font-playfair font-bold mt-2 block">
              "Service Above Self"
            </span>
          </div>

          {/* Golden Divider */}
          <div className="relative z-10 w-16 h-[1px] bg-gold/50 mx-auto" />

          {/* Section 3: Mission */}
          <div className="relative z-10">
            <h3 className="text-gold font-playfair text-xl md:text-2xl mb-2">
              Our Mission
            </h3>
            <p className="text-cream/80 text-sm md:text-base font-lato leading-relaxed max-w-2xl mx-auto">
              Creating socially responsible citizens by addressing real-world issues—from education and health to environment and social justice.
            </p>
          </div>

          {/* Watermark Logo (Kept from your deployed code) */}
          <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-10 pointer-events-none">
             <Image
                src="/assets/logo-main.webp" // Ensure this matches your file (png or webp)
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