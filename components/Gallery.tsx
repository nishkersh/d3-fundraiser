'use client';

import { motion } from 'framer-motion';
import { CinematicGallery } from '@/components/CinematicGallery';

export function Gallery() {
    return (
        // FIXED: Replaced py-20 with pt-20 and added the background color
        <section id="gallery" className="relative pt-20 w-full bg-[#1a0505] text-center">
            <div className="container mx-auto px-4">
                {/* Header is now inside CinematicGallery, so we remove it from here to prevent duplication */}
                <CinematicGallery />
            </div>
        </section>
    );
}