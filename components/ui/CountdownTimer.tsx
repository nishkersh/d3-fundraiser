'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer() {
    const calculateTimeLeft = (): TimeLeft => {
        // Target Date: January 31, 2025
        // Target Date: January 31, 2025, 18:00:00
        const difference = +new Date('2026-01-31T18:00:00') - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!hasMounted) return null;

    return (
        <div className="flex gap-4 sm:gap-8 justify-center items-center mt-12">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-gold text-2xl font-light mb-6">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-gold text-2xl font-light mb-6">:</div>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="text-gold text-2xl font-light mb-6">:</div>
            <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    // Pad single digits with zero
    const formattedValue = value < 10 ? `0${value}` : value;

    return (
        <div className="flex flex-col items-center">
            <div className="relative overflow-hidden h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={formattedValue}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute text-3xl sm:text-4xl font-playfair font-bold text-gold"
                    >
                        {formattedValue}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-cream/60 mt-2 font-lato">
                {label}
            </span>
        </div>
    );
}
