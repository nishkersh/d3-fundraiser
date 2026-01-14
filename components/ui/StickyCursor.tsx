'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

export function StickyCursor() {
    const { stickyElement } = useCursor();
    const [isHovered, setIsHovered] = useState(false);

    // Sizes
    const cursorSize = isHovered ? 64 : 16;

    // Mouse Position Motion Values
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    // Smooth physics
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            if (stickyElement && stickyElement.current) {
                // Get sticky element details
                const { left, top, width, height } = stickyElement.current.getBoundingClientRect();

                // Center point
                const center = { x: left + width / 2, y: top + height / 2 };
                const distance = { x: clientX - center.x, y: clientY - center.y };

                // Magnetic pull math for cursor
                // We adjusting position to center on the element but with some drag
                mouse.x.set((center.x - cursorSize / 2) + (distance.x * 0.1));
                mouse.y.set((center.y - cursorSize / 2) + (distance.y * 0.1));

                setIsHovered(true);
            } else {
                // Normal follow
                mouse.x.set(clientX - cursorSize / 2);
                mouse.y.set(clientY - cursorSize / 2);
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove);
        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, [stickyElement, cursorSize, mouse.x, mouse.y]);

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            animate={{
                width: cursorSize,
                height: cursorSize,
            }}
            className={`fixed rounded-full pointer-events-none z-[9999] transition-colors duration-200 
                ${isHovered ? 'bg-transparent border border-gold mix-blend-difference' : 'bg-gold mix-blend-difference'}
            `}
        />
    );
}
