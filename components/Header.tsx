import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Trang Chủ', id: SectionId.HERO },
    { label: 'Tính Năng', id: SectionId.FEATURES },
    { label: 'Sản Phẩm', id: SectionId.PRODUCTS },
    { label: 'Đánh Giá', id: SectionId.TESTIMONIALS },
    { label: 'Liên Hệ', id: SectionId.CONTACT },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(SectionId.HERO)}>
          <img 
            src="https://thamoto.hienmauto.com/wp-content/uploads/2025/11/logo-hien-m-.png" 
            alt="Hien M Auto Logo" 
            className="h-10 md:h-14 w-auto object-contain" 
          />
          <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase flex items-center gap-1.5">
            <span className="text-white">HIEN</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">M</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">AUTO</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Đặt Hàng Ngay
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-lg font-medium text-gray-300 hover:text-amber-500"
            >
              {link.label}
            </button>
          ))}
          <button 
             onClick={() => scrollToSection(SectionId.CONTACT)}
            className="mt-4 bg-amber-500 text-black font-bold py-3 px-6 rounded-lg w-full"
          >
            Nhận Báo Giá
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;