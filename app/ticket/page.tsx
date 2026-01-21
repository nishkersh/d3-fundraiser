'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

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
            <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-8 px-4 text-center">

                {/* 1. TOP LOGO PANEL (Using your correct .webp extension) */}
                <div className="w-full max-w-lg mb-2 opacity-90">
                    <Image 
                        src="/assets/footer-panel.webp" 
                        alt="Partners" 
                        width={600} 
                        height={100} 
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                {/* ADMIT ONE Header */}
                <div className="w-full mb-2">
                    <p className="text-gold/80 text-[10px] sm:text-xs font-bold leading-normal tracking-[0.4em] uppercase pb-2">
                        ADMIT PASS
                    </p>
                    <div className="mx-auto w-8 h-[1px] bg-gold/30"></div>
                </div>

                {/* 3. CIRCULAR LOGO (Slightly smaller to fit text) */}
                <div className="relative w-32 h-32 my-2 drop-shadow-2xl">
                    <Image 
                        src="/assets/logo-main.webp" 
                        alt="Official Seal" 
                        fill 
                        className="object-contain"
                    />
                </div>

                {/* 2. MAIN ORGANIZERS (New Text Added) */}
                <div className="space-y-1 mb-2">
                    <p className="text-white/90 text-xs sm:text-sm font-lato uppercase tracking-wider font-bold">
                        Rotaract Club of Chandigarh
                    </p>
                    <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest">
                        & Scope Entertainment 
                    </p>
                </div>


                {/* 4. MAIN EVENT DETAILS */}
                <div className="flex flex-col items-center max-w-xl w-full">
                    
                    {/* Guest Name */}
                    <p className="text-gold text-xl sm:text-2xl font-playfair italic mb-2">
                        Welcomes: {guestName}
                    </p>

                    <p className="text-gold text-xl sm:text-2xl font-playfair italic mb-2">
                        FOR
                    </p>

                    {/* Title */}
                    <h1 className="text-white font-playfair italic tracking-tight text-5xl sm:text-6xl font-medium leading-tight px-2 pb-2">
                        D3
                    </h1>
                    <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4">
                        Donate Dosti Dance
                    </p>

                    {/* Association (New Text Added) */}
                    <div className="mb-4">
                        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">
                            In Association With
                        </p>
                        <p className="text-gold font-playfair text-lg sm:text-xl">
                            Groove You Dance Studio
                        </p>
                        <p className="text-gold/80 text-xs font-lato">
                            by Pankaj Thakur
                        </p>
                    </div>

                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mb-4"></div>

                    {/* Description & Venue (New Text Added) */}
                    <div className="text-white/80 text-xs sm:text-sm font-lato space-y-1 uppercase tracking-wide">
                        <p className="font-bold">2-Days Exclusive Bachata Workshop</p>
                        <p className="text-[10px] text-white/60 mb-2">A Fundraiser Event</p>
                        
                        <p className="mt-2 text-white">Jan 31 - Feb 1, 2026 | 11:00 AM Onwards</p>
                        <p className="text-gold font-bold">Rotary House, #107A, Sec-18A, Chandigarh</p>
                    </div>

                    {/* Ticket ID */}
                    <p className="text-white/30 text-[10px] mt-6 tracking-widest uppercase font-mono">
                        Ticket ID: {ticketId}
                    </p>
                </div>

                {/* Download Button */}
                <div className="flex px-4 py-6 justify-center w-full">
                    <button
                        onClick={handlePrint}
                        className="print:hidden group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 border border-gold/40 bg-black/40 backdrop-blur-sm text-gold text-xs font-bold leading-normal tracking-[0.2em] uppercase transition-all hover:bg-gold hover:text-black hover:border-gold hover:scale-105 active:scale-95 duration-300"
                    >
                        <span className="truncate relative z-10">Download Ticket</span>
                    </button>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/20 z-20"></div>
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/20 z-20"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/20 z-20"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/20 z-20"></div>
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