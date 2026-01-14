'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function EventDetails() {
    return (
        <section className="py-24 bg-[#1a0505] relative border-t border-white/5 z-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-xl font-playfair text-white mb-2">The Date</h3>
                        <p className="text-cream/60 font-lato">January 31, 2025</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-playfair text-white mb-2">The Time</h3>
                        <p className="text-cream/60 font-lato">6:00 PM Onwards</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-playfair text-white mb-2">The Venue</h3>
                        <p className="text-cream/60 font-lato">Rotary House, Sector 37<br />Chandigarh</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
