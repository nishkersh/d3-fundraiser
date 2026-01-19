'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; // Import Image component

function TicketContent() {
    const searchParams = useSearchParams();
    const guestName = searchParams.get('name') || 'Valued Guest';
    const ticketId = searchParams.get('id') || 'SAMPLE-TICKET';

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0A0708]">
            {/* Background Texture Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJDsoCLAAS0z8Zgs_o5ukOwGMCuzi1lbuvufhkZWvVjeUQC0o5751bBvtuNi8fnA7-jLDM7B2FsxjeNkoeebnq49A_C1MOv1IpEMx7AKOck4N-X7PnXOUaO-ufYCjyqo79B2sXtxkJKxUyoMcO1e7AKmBoke3ZfgVf5cppPDn31GgzrXRJ0sMdHvqZxyBquf5fTj2kHkjhhcc55K5CnBlwSw9kzyLgRf8m0tSk28ES7fq62-SFzuSvMd2cgZod8vaQKYvdl7puZnM")' }}
                />
                <div className="absolute inset-0 gold-dust"></div>
                <div className="absolute inset-0 vignette-overlay"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-8 px-6">

                {/* 1. TOP LOGO PANEL (Added) */}
                <div className="w-full max-w-lg mb-4 opacity-90">
                    <Image 
                        src="/assets/footer-panel.png" 
                        alt="Partners" 
                        width={600} 
                        height={100} 
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                {/* Top Branding Text */}
                <div className="w-full text-center">
                    <p className="text-gold/80 text-[10px] sm:text-xs font-bold leading-normal tracking-[0.4em] uppercase pb-3 pt-1 px-4">
                        ADMIT ONE
                    </p>
                    <div className="mx-auto w-8 h-[1px] bg-gold/30"></div>
                </div>

                {/* 2. CIRCULAR LOGO (Added) */}
                <div className="relative w-38 h-38 my-6 drop-shadow-2xl">
                    <Image 
                        src="/assets/logo-main.png" 
                        alt="Official Seal" 
                        fill 
                        className="object-contain"
                    />
                </div>

                {/* Typography & Ticket Details */}
                <div className="flex flex-col items-center max-w-xl w-full text-center">

                    {/* Guest Name */}
                    <p className="text-gold text-lg sm:text-2xl font-playfair italic mb-6">
                        Guest: {guestName}
                    </p>

                    <h1 className="text-white font-playfair italic tracking-tight text-5xl sm:text-7xl font-medium leading-tight px-4 pb-4">
                        D3 - Donate Dosti Dance
                    </h1>

                    <div className="h-1 w-12 bg-gold rounded-full mb-6"></div>

                    <p className="text-gold/90 text-sm sm:text-base font-light leading-normal tracking-[0.1em] px-4 uppercase font-lato">
                        Jan 31, 2025 | Rotaract Club Chandigarh
                    </p>

                    <p className="text-white/40 text-xs mt-4 tracking-widest uppercase font-mono">
                        Ticket ID: {ticketId}
                    </p>
                </div>

                {/* Button */}
                <div className="flex px-4 py-3 justify-center w-full">
                    <button
                        onClick={handlePrint}
                        className="print:hidden group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 border border-gold/40 bg-black/40 backdrop-blur-sm text-gold text-sm font-bold leading-normal tracking-[0.2em] uppercase transition-all hover:bg-gold hover:text-black hover:border-gold hover:scale-105 active:scale-95 duration-300"
                    >
                        <span className="truncate relative z-10">Download Ticket</span>
                    </button>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gold/20 z-20"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-gold/20 z-20"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-gold/20 z-20"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gold/20 z-20"></div>
        </div>
    );
}

export default function TicketPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-gold">Loading Ticket...</div>}>
            <TicketContent />
        </Suspense>
    );
}