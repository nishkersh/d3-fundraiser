'use client';

import { motion } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SHEET_DB_URL } from '@/lib/sheetConfig';
import { CLOUD_NAME, UPLOAD_PRESET } from '@/lib/uploadConfig';

interface RegistrationModalProps {
    onClose: () => void;
}

// Defined Time Slots
const WORKSHOP_SLOTS = [
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM"
];

export function RegistrationModal({ onClose }: RegistrationModalProps) {
    const router = useRouter();
    
    // State Management
    const [ticketType, setTicketType] = useState<string>('Single Entry (₹200)');
    const [amount, setAmount] = useState<number>(200);
    const [slot, setSlot] = useState<string>(WORKSHOP_SLOTS[0]); // Default to first slot
    const [soldBy, setSoldBy] = useState<string>(''); // For tracking sales
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '+91 ',
    });
    
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting' | 'success'>('idle');

    const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setTicketType(type);
        if (type === 'Single Entry (₹200)') setAmount(200);
        else if (type === 'Couple Pass (₹350)') setAmount(350);
        else setAmount(0);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPaymentProof(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentProof) {
            alert("Please select a screenshot first.");
            setStatus('idle');
            return;
        }

        setStatus('uploading');

        try {
            // 1. Upload to Cloudinary
            const imageFormData = new FormData();
            imageFormData.append('file', paymentProof);
            imageFormData.append('upload_preset', UPLOAD_PRESET);

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: imageFormData
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                console.error("Cloudinary Error:", uploadData);
                throw new Error(uploadData.error?.message || 'Upload failed');
            }

            const imageSecureUrl = uploadData.secure_url;

            setStatus('submitting');

            // 2. Submit to SheetDB
            const uniqueId = crypto.randomUUID().slice(0, 8).toUpperCase();
            
            const payload = {
                data: {
                    id: uniqueId,
                    name: formData.name,
                    phone: "'" + formData.phone,
                    ticket_type: ticketType,
                    amount: amount,
                    slot: slot,           // <--- NEW FIELD
                    sold_by: soldBy,      // <--- NEW FIELD
                    screenshot_url: imageSecureUrl,
                    date: new Date().toLocaleString()
                }
            };

            const sheetRes = await fetch(SHEET_DB_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (sheetRes.ok) {
                setStatus('success');
                setTimeout(() => {
                    const params = new URLSearchParams({
                        name: formData.name,
                        id: uniqueId,
                        type: ticketType,
                        slot: slot // Pass slot to ticket (optional, if you want to display it)
                    });
                    
                    router.push(`/ticket?${params.toString()}`);
                    
                    onClose();
                    setFormData({ name: '', phone: '+91 ' });
                    setPaymentProof(null);
                    setPreviewUrl(null);
                    setSoldBy('');
                    setStatus('idle');
                }, 1500);
            } else {
                throw new Error('Sheet submission failed');
            }

        } catch (error) {
            console.error("Submission Error:", error);
            alert("An error occurred. Check console for details.");
            setStatus('idle');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="relative w-full max-w-4xl max-h-[85dvh] overflow-y-auto overscroll-contain no-scrollbar bg-gradient-to-br from-[#1a0505] to-burgundy border border-gold/20 rounded-2xl shadow-2xl flex flex-col md:flex-row my-auto"
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-20 text-cream/50 hover:text-gold transition-colors"><X /></button>

                {/* Left Column: QR Code */}
                <div className="w-full md:w-1/3 bg-black/40 p-5 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 text-center">
                    <h3 className="text-lg md:text-xl font-playfair text-gold mb-6">Scan to Pay</h3>
                    <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white p-2 rounded-lg mb-4">
                        <div className="relative w-full h-full">
                            <Image src="/assets/payment-qr.jpeg" alt="Payment QR" fill className="object-contain" sizes="(max-width: 768px) 100vw, 33vw" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-cream mb-2">₹{amount}</p>
                    <p className="text-xs text-cream/60 uppercase tracking-widest">{ticketType}</p>
                </div>

                {/* Right Column: Form */}
                <div className="w-full md:w-2/3 p-5 md:p-8 relative">
                    {status === 'success' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-burgundy/95 z-30 transition-all">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-4 text-vanta"><Check size={40} strokeWidth={4} /></motion.div>
                            <h3 className="text-2xl font-playfair text-gold mb-2">Registration Complete!</h3>
                            <p className="text-cream/80">Opening your ticket...</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">Get Your Pass</h2>
                        <p className="text-cream/60 text-sm">Select your slot and fill details.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Ticket Type */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Ticket Type</label>
                                <select value={ticketType} onChange={handleTicketChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 cursor-pointer text-sm">
                                    <option>Single Entry (₹200)</option>
                                    <option>Couple Pass (₹350)</option>
                                    <option>Open Donation (Any Amount)</option>
                                </select>
                            </div>

                            {/* Workshop Slot (NEW) */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Workshop Slot</label>
                                <select 
                                    value={slot} 
                                    onChange={(e) => setSlot(e.target.value)} 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 cursor-pointer text-sm"
                                >
                                    {WORKSHOP_SLOTS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {ticketType === 'Open Donation (Any Amount)' && (
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Donation Amount (₹)</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter Amount"
                                    value={amount === 0 ? '' : amount}
                                    onChange={(e) => { const val = e.target.value; setAmount(val === '' ? 0 : parseInt(val)); }}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gold mb-2">
                                    {ticketType === 'Couple Pass (₹350)' ? 'Couple Names' : 'Full Name'}
                                </label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20" placeholder={ticketType === 'Couple Pass (₹350)' ? "e.g., Partner1 & Partner2" : "e.g., Sagar Chatterjee"} />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Phone</label>
                                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        {/* Sold By / Referral (NEW) */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gold mb-2">Referral Name</label>
                            <input 
                                type="text" 
                                value={soldBy} 
                                onChange={(e) => setSoldBy(e.target.value)} 
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20" 
                                placeholder="Name of the person who invited you" 
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gold mb-2">Upload Payment Screenshot</label>
                            <div className="relative w-full">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="payment-proof" />
                                <label htmlFor="payment-proof" className={`w-full flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${previewUrl ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/30 bg-black/20'}`}>
                                    {previewUrl ? (
                                        <div className="relative w-full h-32">
                                            <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white text-sm font-bold">Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-cream/60 text-sm">📸 Click to Upload Proof</span>
                                    )}
                                </label>
                            </div>
                        </div>

                        <button type="submit" disabled={status !== 'idle'} className="w-full bg-gold text-vanta font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-white transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {status === 'uploading' && <><Loader2 className="animate-spin" size={18} /> Uploading Proof...</>}
                            {status === 'submitting' && <><Loader2 className="animate-spin" size={18} /> Verifying...</>}
                            {status === 'idle' && "Submit & Get Ticket"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}