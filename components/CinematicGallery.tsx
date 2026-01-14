"use client"

import { useState, useCallback, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import Image from "next/image"

interface MediaItem {
    id: number;
    type: 'video' | 'image';
    src: string;
    alt: string;
}

const mediaItems: MediaItem[] = [
    { id: 1, type: 'image', src: "/assets/charity-impact-1.png", alt: "Charity Impact 1" },
    { id: 2, type: 'video', src: "/assets/event-video-1.webm", alt: "Event Video 1" },
    { id: 3, type: 'image', src: "/assets/charity-impact-2.png", alt: "Charity Impact 2" },
    { id: 4, type: 'video', src: "/assets/event-video-2.webm", alt: "Event Video 2" },
    { id: 5, type: 'image', src: '/assets/event-img-1.webp', alt: 'Past Event Highlight 1' },
    { id: 6, type: 'image', src: '/assets/event-img-2.webp', alt: 'Past Event Highlight 2' },
    { id: 7, type: 'image', src: '/assets/event-img-3.webp', alt: 'Past Event Highlight 3' },
]

export function CinematicGallery() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const lastNavigationTime = useRef(0)
    const navigationCooldown = 400

    const navigate = useCallback((newDirection: number) => {
        const now = Date.now()
        if (now - lastNavigationTime.current < navigationCooldown) return
        lastNavigationTime.current = now

        setCurrentIndex((prev) => {
            if (newDirection > 0) {
                return prev === mediaItems.length - 1 ? 0 : prev + 1
            }
            return prev === 0 ? mediaItems.length - 1 : prev - 1
        })
    }, [])

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50
        if (info.offset.y < -threshold) {
            navigate(1)
        } else if (info.offset.y > threshold) {
            navigate(-1)
        }
    }

    const getCardStyle = (index: number) => {
        const total = mediaItems.length
        let diff = index - currentIndex
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total

        if (diff === 0) {
            return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
        } else if (diff === -1) {
            return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
        } else if (diff === -2) {
            return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
        } else if (diff === 1) {
            return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
        } else if (diff === 2) {
            return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
        } else {
            return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
        }
    }

    const isVisible = (index: number) => {
        const total = mediaItems.length
        let diff = index - currentIndex
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total
        return Math.abs(diff) <= 2
    }

    return (
        <div className="relative flex h-[100vh] md:h-[800px] w-full items-center justify-center overflow-hidden">
            {/* Card Stack */}
            <div className="relative flex h-[60vh] w-[85vw] md:h-[550px] md:w-[350px] items-center justify-center" style={{ perspective: "1200px" }}>
                {mediaItems.map((item, index) => {
                    if (!isVisible(index)) return null
                    const style = getCardStyle(index)
                    const isCurrent = index === currentIndex

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute cursor-grab active:cursor-grabbing"
                            animate={{
                                y: style.y,
                                scale: style.scale,
                                opacity: style.opacity,
                                rotateX: style.rotateX,
                                zIndex: style.zIndex,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 1,
                            }}
                            drag={isCurrent ? "y" : false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            style={{
                                transformStyle: "preserve-3d",
                                zIndex: style.zIndex,
                            }}
                        >
                            <div
                                className="relative h-[60vh] w-[85vw] md:h-[550px] md:w-[350px] overflow-hidden rounded-3xl bg-[#2a0202] border border-[#D4AF37]/30"
                                style={{
                                    boxShadow: isCurrent
                                        ? "0 10px 40px -10px rgba(212,175,55,0.3)"
                                        : "0 10px 30px -10px rgba(0,0,0,0.5)",
                                }}
                            >
                                {item.type === 'video' ? (
                                    <video
                                        src={item.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover"
                                            draggable={false}
                                            priority={isCurrent}
                                        />
                                    </div>
                                )}

                                {/* Overlay Gradient for Depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Navigation Dots / Counter */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
                <div className="text-4xl font-serif text-[#D4AF37] font-bold">
                    0{currentIndex + 1}
                </div>
                <div className="h-16 w-[1px] bg-white/20"></div>
                <div className="text-sm font-sans text-white/40">
                    0{mediaItems.length}
                </div>
            </div>
        </div>
    )
}
