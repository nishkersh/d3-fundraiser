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
                        <p className="text-cream/60 font-lato">Jan 31 - Feb 1, 2026</p>
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
                        <p className="text-cream/60 font-lato">11:00 AM Onwards</p>

                        {/* Workshop Slots */}
                        <div className="mt-4 pt-4 border-t border-gold/10 w-full max-w-[200px]">
                            <p className="text-gold/80 text-xs font-bold uppercase tracking-widest mb-2">Workshop Slots</p>
                            <p className="text-cream/40 text-xs font-lato leading-relaxed">
                                11:30am | 1:00pm <br />
                                2:30pm | 4:00pm | 5:30pm
                            </p>
                        </div>
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
                        <p className="text-cream/60 font-lato">Rotary House<br />#107A, Sector 18A, Chandigarh</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
