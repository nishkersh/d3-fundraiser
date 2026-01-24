"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. ASSETS
const mediaItems = [
    { id: 1, type: 'image', src: "/assets/gallery1.webp", alt: "Event Highlight 1" },
    { id: 2, type: 'image', src: "/assets/gallery2.webp", alt: "Event Highlight 2" },
    { id: 3, type: 'image', src: "/assets/gallery3.webp", alt: "Event Highlight 3" },
    { id: 4, type: 'image', src: "/assets/gallery4.webp", alt: "Event Highlight 4" },
    { id: 5, type: 'image', src: "/assets/gallery5.webp", alt: "Event Highlight 5" },
    { id: 6, type: 'video', src: "/assets/event-video-1.webm", alt: "Bachata Dance 1" },
    { id: 7, type: 'video', src: "/assets/event-video-2.webm", alt: "Bachata Dance 2" },
];

export function CinematicGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Calculate the next index for the "Back" of the card
    const nextIndex = (currentIndex + 1) % mediaItems.length;

    const currentItem = mediaItems[currentIndex];
    const nextItem = mediaItems[nextIndex];

    const handleFlip = () => {
        if (isAnimating) return; // Prevent spam clicking
        setIsAnimating(true);
        setIsFlipped(true); // Trigger the CSS flip

        // Wait for the flip animation (600ms), then reset state invisibly
        setTimeout(() => {
            // Move to next slide
            setCurrentIndex(nextIndex);
            // Reset flip state instantly (without animation) so it looks like a fresh card
            setIsFlipped(false);
            setIsAnimating(false);
        }, 600);
    };

    return (
        <section className="py-20 w-full bg-[#1a0505] flex flex-col items-center justify-center min-h-[90vh]">
            
            {/* Header */}
            <div className="text-center mb-10 px-4">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold to-white/50 mb-4">
                    MOMENTS IN MOTION
                </h2>
                <div className="h-0.5 w-24 bg-gold/50 mx-auto mb-4" />
                <p className="text-cream/50 text-xs uppercase tracking-[0.3em] animate-pulse">
                    Tap Card to Reveal Next
                </p>
            </div>

            {/* THE INFINITE FLIP CARD */}
            <div 
                className="relative group w-[320px] md:w-[500px] h-[500px] md:h-[700px] cursor-pointer perspective-1000"
                onClick={handleFlip}
            >
                <div 
                    className="relative w-full h-full duration-700 preserve-3d"
                    style={{ 
                        transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        transition: isFlipped ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' 
                        // When isFlipped becomes false (in timeout), transition is 'none' -> Instant reset
                    }}
                >
                    {/* === FRONT FACE (Current Item) === */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl border-2 border-gold/30 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] bg-black overflow-hidden">
                        {currentItem.type === 'video' ? (
                            <video
                                src={currentItem.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={currentItem.src}
                                alt={currentItem.alt}
                                className="w-full h-full object-cover"
                            />
                        )}
                        
                        {/* Overlay Info */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-gold font-playfair text-xl">{currentIndex + 1} <span className="text-sm text-white/50">/ {mediaItems.length}</span></p>
                        </div>
                    </div>

                    {/* === BACK FACE (Next Item) === */}
                    <div 
                        className="absolute inset-0 backface-hidden rounded-3xl border-2 border-gold/30 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] bg-black overflow-hidden"
                        style={{ transform: 'rotateY(180deg)' }} // Pre-rotated so it looks correct when parent flips
                    >
                        {nextItem.type === 'video' ? (
                            <video
                                src={nextItem.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={nextItem.src}
                                alt={nextItem.alt}
                                className="w-full h-full object-cover"
                            />
                        )}
                         {/* Overlay Info */}
                         <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-gold font-playfair text-xl">{nextIndex + 1} <span className="text-sm text-white/50">/ {mediaItems.length}</span></p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}