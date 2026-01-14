'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { setStickyElement } = useCursor();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;

        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply magnetic pull to the element itself
        setPosition({ x: middleX, y: middleY });
    };

    const handleMouseEnter = () => {
        // @ts-ignore
        setStickyElement(ref);
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 });
        setStickyElement(null);
    };

    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
