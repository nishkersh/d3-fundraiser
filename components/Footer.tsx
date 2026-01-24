'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
} from 'lucide-react';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
    label: string;
    links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function Footer({ className, ...props }: StickyFooterProps) {
    return (
        <footer
            className={cn('relative h-[800px] w-full', className)}
            id="contact"
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
            {...props}
        >
            <div className="fixed bottom-0 h-[800px] w-full">
                <div className="sticky top-[calc(100vh-800px)] h-full overflow-y-auto no-scrollbar">
                    <div className="relative flex size-full flex-col justify-between gap-5 border-t border-white/10 bg-[#1a0505] px-4 py-8 md:px-12">
                        {/* Background Gradients */}
                        <div
                            aria-hidden
                            className="absolute inset-0 isolate z-0 overflow-hidden pointer-events-none"
                        >
                            <div className="absolute top-0 left-0 h-[30rem] w-[30rem] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gold/5 blur-[100px]" />
                            <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] translate-x-[50%] translate-y-[50%] rounded-full bg-burgundy/20 blur-[100px]" />
                        </div>

                        {/* Partner Panel Image - Placed strictly at the top */}
                        <div className="relative z-10 w-full mb-8">
                            <img
                                src="/assets/footer-panel.webp"
                                alt="Partner Panel"
                                className="w-full h-auto object-contain max-h-[120px] sm:max-h-[150px] mx-auto"
                            />
                        </div>

                        <div className="relative z-10 mt-4 flex flex-col gap-8 md:flex-row xl:mt-0 justify-between">
                            {/* Brand Column */}
                            <AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
                                <div className="flex items-center gap-4">
                                    <img src="/assets/logo-main.webp" alt="Rotaract Logo" className="h-16 w-auto object-contain" />
                                </div>
                                <h3 className="text-xl font-playfair font-bold text-gold">
                                    Rotaract Club Chandigarh
                                    <span className="block text-sm font-sans font-normal text-cream/80 mt-1">District 3080</span>
                                </h3>
                                <p className="text-cream/60 mt-4 text-sm leading-relaxed">
                                    Empowering youth, serving community. Join us in making a difference through Donate Dosti Dance.
                                </p>
                                <div className="flex gap-2 mt-6">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.title}
                                            href={link.href}
                                            className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-vanta transition-all duration-300"
                                        >
                                            {link.icon && <link.icon className="size-4" />}
                                        </a>
                                    ))}
                                </div>
                            </AnimatedContainer>

                            {/* Links Columns */}
                            <div className="flex flex-wrap gap-12 md:gap-24">
                                {footerLinkGroups.map((group, index) => (
                                    <AnimatedContainer
                                        key={group.label}
                                        delay={0.1 + index * 0.1}
                                        className="w-full sm:w-auto"
                                    >
                                        <div className="mb-10 md:mb-0">
                                            <h3 className="text-sm uppercase tracking-widest text-gold font-bold">{group.label}</h3>
                                            <ul className="text-cream/60 mt-4 space-y-3 text-sm">
                                                {group.links.map((link) => (
                                                    <li key={link.title}>
                                                        <a
                                                            href={link.href}
                                                            className="hover:text-gold inline-flex items-center transition-all duration-300 transform hover:translate-x-1"
                                                        >
                                                            {link.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </AnimatedContainer>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="relative z-10 text-cream/40 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs md:flex-row uppercase tracking-widest">
                            <p>© 2026 Rotaract Club Chandigarh. All rights reserved.</p>
                            <div className="flex gap-8">
                                <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const socialLinks = [
    { title: 'Instagram', href: 'https://www.instagram.com/rotaractclubchandigarh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: Instagram },
];

const footerLinkGroups: FooterLinkGroup[] = [
    {
        label: 'Navigation',
        links: [
            { title: 'About', href: '#about' },
            { title: 'Gallery', href: '#gallery' },
            { title: 'Team', href: '#team' },
            { title: 'Contact', href: '#contact' },
        ],
    },
    {
        label: 'Contact',
        links: [
            { title: 'rotaract.chd@gmail.com', href: 'mailto:rotaract.chd@gmail.com' },
            { title: '+91 9056847611', href: 'tel:+919056847611' },
            { title: '+91 9877169427', href: 'tel:+919877169427' },
            { title: '#107A, Sector 18A, Chandigarh', href: '#' },
        ],
    }
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
    children?: React.ReactNode;
    delay?: number;
};

function AnimatedContainer({
    delay = 0.1,
    children,
    ...props
}: AnimatedContainerProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
