"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

// 1. ASSET CONFIGURATION
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
    const cardStackRef = useRef<HTMLDivElement>(null);
    const isSwiping = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);
    const animationFrameId = useRef<number | null>(null);

    // Responsive dimensions (Mobile vs Desktop)
    const [dimensions, setDimensions] = useState({ width: 300, height: 450 });

    useEffect(() => {
        const updateDimensions = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setDimensions({ width: 400, height: 600 });
            } else {
                setDimensions({ width: 320, height: 480 });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // State to manage the stack order
    const [cardOrder, setCardOrder] = useState<number[]>(() =>
        Array.from({ length: mediaItems.length }, (_, i) => i)
    );

    const getCards = useCallback((): HTMLElement[] => {
        if (!cardStackRef.current) return [];
        return [...cardStackRef.current.querySelectorAll('.gallery-card')] as HTMLElement[];
    }, []);

    const getActiveCard = useCallback((): HTMLElement | null => {
        const cards = getCards();
        // The last element in the DOM is visually on top due to z-index logic below
        return cards[cards.length - 1] || null;
    }, [getCards]);

    const updatePositions = useCallback(() => {
        const cards = getCards();
        // We render cards in reverse order of array, but visual stack logic:
        cards.forEach((card, i) => {
            // i=0 is back, i=length-1 is front
            const reverseIndex = cards.length - 1 - i; 
            
            card.style.setProperty('--i', reverseIndex.toString());
            card.style.setProperty('--swipe-x', '0px');
            card.style.setProperty('--swipe-rotate', '0deg');
            card.style.opacity = '1';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease';
            card.style.zIndex = i.toString(); // Ensure proper stacking
        });
    }, [getCards]);

    const applySwipeStyles = useCallback((deltaX: number) => {
        const card = getActiveCard();
        if (!card) return;
        
        card.style.transition = 'none'; // Remove transition for instant drag
        card.style.setProperty('--swipe-x', `${deltaX}px`);
        card.style.setProperty('--swipe-rotate', `${deltaX * 0.1}deg`);
    }, [getActiveCard]);

    const handleStart = useCallback((clientX: number) => {
        isSwiping.current = true;
        startX.current = clientX;
        currentX.current = clientX;
    }, []);

    const handleEnd = useCallback(() => {
        if (!isSwiping.current) return;
        
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }

        const deltaX = currentX.current - startX.current;
        const threshold = 100; // Swipe threshold
        const card = getActiveCard();

        if (card) {
            card.style.transition = `transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease`;

            if (Math.abs(deltaX) > threshold) {
                const direction = Math.sign(deltaX);
                // Swipe away
                card.style.setProperty('--swipe-x', `${direction * 1000}px`);
                card.style.setProperty('--swipe-rotate', `${direction * 45}deg`);
                card.style.opacity = '0';

                // Move to back of array after animation
                setTimeout(() => {
                    setCardOrder(prev => {
                        const newOrder = [...prev];
                        const topCard = newOrder.pop(); // Remove top
                        if (topCard !== undefined) newOrder.unshift(topCard); // Put at bottom
                        return newOrder;
                    });
                }, 300);
            } else {
                // Reset to center
                card.style.setProperty('--swipe-x', '0px');
                card.style.setProperty('--swipe-rotate', '0deg');
            }
        }

        isSwiping.current = false;
        startX.current = 0;
        currentX.current = 0;
    }, [getActiveCard]);

    const handleMove = useCallback((clientX: number) => {
        if (!isSwiping.current) return;
        
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        
        animationFrameId.current = requestAnimationFrame(() => {
            currentX.current = clientX;
            const deltaX = currentX.current - startX.current;
            applySwipeStyles(deltaX);
        });
    }, [applySwipeStyles]);

    useEffect(() => {
        const cardStackElement = cardStackRef.current;
        if (!cardStackElement) return;

        const handlePointerDown = (e: PointerEvent) => {
            if (e.isPrimary) handleStart(e.clientX);
        };
        const handlePointerMove = (e: PointerEvent) => {
            if (e.isPrimary) handleMove(e.clientX);
        };
        const handlePointerUp = (e: PointerEvent) => {
            if (e.isPrimary) handleEnd();
        };

        cardStackElement.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            cardStackElement.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [handleStart, handleMove, handleEnd]);

    useEffect(() => {
        updatePositions();
    }, [cardOrder, updatePositions]);

    return (
        <div className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#1a0505] py-20">
            
            {/* Header / Instructions */}
            <div className="absolute top-10 text-center z-10">
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold to-white/50 mb-2">
                    MOMENTS IN MOTION
                </h2>
                <p className="text-gold/50 text-xs uppercase tracking-[0.3em] animate-pulse">
                    Swipe Cards Left or Right
                </p>
            </div>

            {/* THE STACK */}
            <section
                className="relative grid place-content-center select-none"
                ref={cardStackRef}
                style={{
                    width: dimensions.width + 40,
                    height: dimensions.height + 40,
                    touchAction: 'pan-y', // CRITICAL: Allows vertical scroll while swiping
                    perspective: '1000px',
                }}
            >
                {cardOrder.map((originalIndex) => {
                    const item = mediaItems[originalIndex];
                    return (
                        <article
                            key={item.id}
                            className="gallery-card absolute cursor-grab active:cursor-grabbing
                                     place-self-center overflow-hidden
                                     rounded-3xl bg-black border-2 border-gold/30
                                     shadow-[0_10px_50px_-10px_rgba(212,175,55,0.2)]"
                            style={{
                                width: dimensions.width,
                                height: dimensions.height,
                                // CSS Variables updated by JS
                                transform: `translate3d(var(--swipe-x, 0px), calc(15px * var(--i)), calc(-20px * var(--i))) 
                                            rotate(var(--swipe-rotate, 0deg))`,
                                // 'scale(calc(1 - 0.05 * var(--i)))' // Optional scaling effect
                            }}
                        >
                            {/* Inner Content */}
                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                    draggable={false}
                                />
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </article>
                    );
                })}
            </section>
        </div>
    );
}