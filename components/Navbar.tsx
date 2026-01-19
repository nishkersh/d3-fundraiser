'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


interface NavbarProps {
    onRegisterClick: () => void;
}

export function Navbar({ onRegisterClick }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-vanta/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/assets/logo-main.png" alt="D3 Logo" className="h-20 w-auto object-contain" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-cream/80 hover:text-gold transition-colors text-sm uppercase tracking-widest block p-2">About</a>
                    <a href="#gallery" className="text-cream/80 hover:text-gold transition-colors text-sm uppercase tracking-widest block p-2">Gallery</a>
                    <a href="#team" className="text-cream/80 hover:text-gold transition-colors text-sm uppercase tracking-widest block p-2">Team</a>

                    <button
                        onClick={onRegisterClick}
                        className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-vanta transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                    >
                        Register
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-cream" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-vanta border-b border-white/10"
                >
                    <div className="flex flex-col p-6 gap-4">
                        <a href="#about" className="text-cream/80 hover:text-gold uppercase tracking-widest">About</a>
                        <a href="#gallery" className="text-cream/80 hover:text-gold uppercase tracking-widest">Gallery</a>
                        <a href="#team" className="text-cream/80 hover:text-gold uppercase tracking-widest">Team</a>
                        <button
                            onClick={() => {
                                onRegisterClick();
                                setIsOpen(false);
                            }}
                            className="mt-4 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-vanta transition-all uppercase tracking-widest text-xs font-bold w-full"
                        >
                            Register
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
