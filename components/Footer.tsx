import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <img 
              src="https://thamoto.hienmauto.com/wp-content/uploads/2025/11/logo-hien-m-.png" 
              alt="Hien M Auto Logo" 
              className="h-12 w-auto object-contain" 
            />
            <div className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-1.5">
              <span className="text-white">HIEN</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">M</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">AUTO</span>
            </div>
          </div>
          <p className="text-sm text-center md:text-left">© 2024 Hien M Auto Vietnam. All rights reserved.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-amber-500 transition-colors"><Facebook size={24} /></a>
          <a href="#" className="hover:text-amber-500 transition-colors"><Instagram size={24} /></a>
          <a href="#" className="hover:text-amber-500 transition-colors"><Youtube size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;