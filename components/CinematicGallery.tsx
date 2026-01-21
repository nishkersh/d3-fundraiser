"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MediaItem {
    id: number;
    type: 'video' | 'image';
    src: string;
    alt: string;
}

const mediaItems: MediaItem[] = [
    { id: 1, type: 'image', src: "/assets/charity-impact-1.webp", alt: "Charity Impact 1" },
    { id: 2, type: 'video', src: "/assets/event-video-1.webm", alt: "Event Video 1" },
    { id: 3, type: 'image', src: "/assets/charity-impact-2.webp", alt: "Charity Impact 2" },
    { id: 4, type: 'video', src: "/assets/event-video-2.webm", alt: "Event Video 2" },
    { id: 5, type: 'image', src: '/assets/event-img-1.webp', alt: 'Past Event Highlight 1' },
    { id: 6, type: 'image', src: '/assets/event-img-2.webp', alt: 'Past Event Highlight 2' },
    { id: 7, type: 'image', src: '/assets/event-img-3.webp', alt: 'Past Event Highlight 3' },
];

export function CinematicGallery() {
    const cardStackRef = useRef<HTMLDivElement>(null);
    const isSwiping = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);
    const animationFrameId = useRef<number | null>(null);

    // Responsive dimensions
    const [dimensions, setDimensions] = useState({ width: 300, height: 450 });

    useEffect(() => {
        // Set dimensions based on screen width
        const updateDimensions = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setDimensions({ width: 400, height: 600 });
            } else {
                setDimensions({ width: 300, height: 450 });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const [cardOrder, setCardOrder] = useState<number[]>(() =>
        Array.from({ length: mediaItems.length }, (_, i) => i)
    );

    const getDurationFromCSS = useCallback((
        variableName: string,
        element?: HTMLElement | null
    ): number => {
        const targetElement = element || document.documentElement;
        if (typeof window === 'undefined') return 0;
        const value = getComputedStyle(targetElement).getPropertyValue(variableName)?.trim();
        if (!value) return 0;
        if (value.endsWith("ms")) return parseFloat(value);
        if (value.endsWith("s")) return parseFloat(value) * 1000;
        return parseFloat(value) || 0;
    }, []);

    const getCards = useCallback((): HTMLElement[] => {
        if (!cardStackRef.current) return [];
        return [...cardStackRef.current.querySelectorAll('.gallery-card')] as HTMLElement[];
    }, []);

    const getActiveCard = useCallback((): HTMLElement | null => {
        const cards = getCards();
        return cards[0] || null;
    }, [getCards]);

    const updatePositions = useCallback(() => {
        const cards = getCards();
        cards.forEach((card, i) => {
            card.style.setProperty('--i', (i + 1).toString());
            card.style.setProperty('--swipe-x', '0px');
            card.style.setProperty('--swipe-rotate', '0deg');
            card.style.opacity = '1';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease';
        });
    }, [getCards]);

    const applySwipeStyles = useCallback((deltaX: number) => {
        const card = getActiveCard();
        if (!card) return;
        card.style.setProperty('--swipe-x', `${deltaX}px`);
        card.style.setProperty('--swipe-rotate', `${deltaX * 0.1}deg`);
        // Fade out slightly as you swipe away
        card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.5).toString();
    }, [getActiveCard]);

    const handleStart = useCallback((clientX: number) => {
        if (isSwiping.current) return;
        isSwiping.current = true;
        startX.current = clientX;
        currentX.current = clientX;
        const card = getActiveCard();
        if (card) card.style.transition = 'none';
    }, [getActiveCard]);

    const handleEnd = useCallback(() => {
        if (!isSwiping.current) return;
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }

        const deltaX = currentX.current - startX.current;
        const threshold = 50;
        const duration = getDurationFromCSS('--card-swap-duration', cardStackRef.current) || 300;
        const card = getActiveCard();

        if (card) {
            card.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}ms ease`;

            if (Math.abs(deltaX) > threshold) {
                const direction = Math.sign(deltaX);
                // Swipe away completely
                card.style.setProperty('--swipe-x', `${direction * 500}px`);
                card.style.setProperty('--swipe-rotate', `${direction * 30}deg`);
                card.style.opacity = '0';

                // Move to back after animation
                setTimeout(() => {
                    setCardOrder(prev => {
                        if (prev.length === 0) return [];
                        return [...prev.slice(1), prev[0]];
                    });
                }, duration);
            } else {
                // Reset to center
                applySwipeStyles(0);
                card.style.opacity = '1';
            }
        }

        isSwiping.current = false;
        startX.current = 0;
        currentX.current = 0;
    }, [getActiveCard, applySwipeStyles, getDurationFromCSS]);

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
            // Only handle primary button (left click or touch)
            if (e.isPrimary) handleStart(e.clientX);
        };
        const handlePointerMove = (e: PointerEvent) => {
            if (e.isPrimary) handleMove(e.clientX);
        };
        const handlePointerUp = (e: PointerEvent) => {
            if (e.isPrimary) handleEnd();
        };

        // Touch events for mobile specifically if needed, but Pointer events usually cover both.
        // However, we want 'pan-y' CSS to handle vertical scroll, so we must be careful not to preventDefault on vertical moves.
        // The browser handles pan-y, we just need to track horizontal.

        cardStackElement.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove); // Listen on window for smooth drag out
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
        <div className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-black py-20">
            <section
                className="relative grid place-content-center select-none"
                ref={cardStackRef}
                style={{
                    width: dimensions.width + 32,
                    height: dimensions.height + 32,
                    touchAction: 'pan-y', // CRITICAL: Allows vertical scroll while swiping
                    transformStyle: 'preserve-3d',
                    '--card-perspective': '1000px',
                    '--card-z-offset': '15px',
                    '--card-y-offset': '10px',
                    '--card-max-z-index': mediaItems.length.toString(),
                    '--card-swap-duration': '300ms',
                } as React.CSSProperties}
            >
                {cardOrder.map((originalIndex, displayIndex) => {
                    const item = mediaItems[originalIndex];
                    return (
                        <article
                            key={`${item.id}-${originalIndex}`}
                            className="gallery-card absolute cursor-grab active:cursor-grabbing
                                     place-self-center overflow-hidden will-change-transform
                                     rounded-2xl bg-[#2a0202] border border-[#D4AF37]/40
                                     shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)]"
                            style={{
                                '--i': (displayIndex + 1).toString(),
                                zIndex: mediaItems.length - displayIndex,
                                width: dimensions.width,
                                height: dimensions.height,
                                transform: `perspective(var(--card-perspective))
                                           translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                                           translateY(calc(var(--card-y-offset) * var(--i)))
                                           translateX(var(--swipe-x, 0px))
                                           rotateY(var(--swipe-rotate, 0deg))`
                            } as React.CSSProperties}
                        >
                            {/* Inner Content */}
                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                    draggable={false}
                                />
                            )}

                            {/* Overlay Gradient for consistency */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </article>
                    );
                })}
            </section>
        </div>
    );
}
