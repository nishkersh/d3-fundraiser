'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GoldGlowCardProps {
  children?: React.ReactNode; // FIXED: Added '?' to make it optional
  className?: string;
  name?: string;
  role?: string;
  image?: string;
  isActive?: boolean;
}

export const GoldGlowCard: React.FC<GoldGlowCardProps> = ({ 
  children, className = "", name, role, image, isActive = false 
}) => {
  
  // Logic: If children exist (like in EventDetails), render them.
  // If not, render the Team Member layout using the props.
  const content = children || (
      <div className="relative w-full h-full group">
          <div className="w-full h-full overflow-hidden rounded-[22px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
              />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20 rounded-b-[22px]">
              <h3 className={`text-2xl font-playfair transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white'}`}>
                  {name}
              </h3>
              <p className="text-sm font-lato text-cream/80 uppercase tracking-widest">{role}</p>
          </div>
      </div>
  );

  return (
    <motion.div 
      className={`relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#D4AF37] via-[#F5F5F0] to-[#B8860B] transition-all duration-500 ${className}`}
      style={{
        boxShadow: isActive 
            ? "0 0 30px 2px rgba(212, 175, 55, 0.6)" 
            : "0 0 0px 0px rgba(0,0,0,0)",
        scale: isActive ? 1 : 0.98
      }}
      whileHover={{ scale: 1, boxShadow: "0 0 30px 2px rgba(212, 175, 55, 0.6)" }}
    >
      <div className="h-full w-full bg-[#2a0202] rounded-2xl overflow-hidden relative">
        {content}
      </div>
    </motion.div>
  );
};