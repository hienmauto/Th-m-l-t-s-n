import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { ChevronRight, ShieldCheck, Star, Award } from 'lucide-react';

const heroImages = [
  {
    id: 1,
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg",
    caption: "Thảm TPE đúc khuôn nguyên khối"
  },
  {
    id: 2,
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038706600_423f168bba15b7192763629d43e20938.jpg",
    caption: "Thảm PVC nguyên sinh an toàn"
  },
  {
    id: 3,
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2.jpg",
    caption: "Thảm cao su cao cấp không mùi"
  }
];

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    document.getElementById(SectionId.PRODUCTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id={SectionId.HERO} 
      className="relative min-h-screen flex items-center justify-center bg-zinc-900 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Luxury Car Interior" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1 text-amber-500 text-sm font-semibold">
            <Award size={16} />
            <span>Thương hiệu thảm lót sàn uy tín Hien M Auto</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Nâng Tầm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Đẳng Cấp Xế Yêu
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
            Chuyên cung cấp thảm nhựa đúc TPE, PVC nguyên sinh và thảm cao su cao cấp. Khuyến mãi lên đến 40% hôm nay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={scrollToProducts}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-8 rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20"
            >
              Xem Ưu Đãi <ChevronRight size={20} />
            </button>
            <div className="flex items-center justify-center gap-2 text-white/80 py-4 px-8">
               <ShieldCheck size={20} className="text-green-500"/> Bảo hành dài hạn
            </div>
          </div>

          <div className="pt-8 flex items-center gap-8 border-t border-white/10">
             <div>
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="text-gray-400 text-sm">Khách hàng tin dùng</p>
             </div>
             <div>
                <p className="text-3xl font-bold text-white flex items-center gap-1">4.9 <Star size={20} fill="#f59e0b" className="text-amber-500"/></p>
                <p className="text-gray-400 text-sm">Đánh giá trung bình</p>
             </div>
          </div>
        </div>

        {/* Image Carousel with Stack Effect */}
        <div className="hidden md:block relative w-full max-w-[550px] aspect-[3/2] mx-auto animate-fade-in-up group perspective-1000">
           {heroImages.map((img, index) => {
             // Calculate position relative to active index
             // 0: Front, 1: Middle, 2: Back
             const position = (index - activeIndex + heroImages.length) % heroImages.length;
             const isFront = position === 0;
             
             // Dynamic Styles based on position
             const zIndex = 30 - position * 10; 
             const opacity = isFront ? 1 : 0.5 - (position * 0.1); 
             const scale = 1 - position * 0.05; 
             const translateX = position * 30; // Shift right for back images
             const rotate = isFront ? 3 : 6 + position * 2; // More rotation for back images

             return (
               <div 
                 key={img.id}
                 className="absolute inset-0 transition-all duration-700 ease-in-out"
                 style={{
                   zIndex,
                   opacity,
                   transform: `translateX(${translateX}px) scale(${scale})`
                 }}
               >
                 <div 
                    className={`
                      w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative 
                      transition-transform duration-700 
                      ${isFront ? 'rotate-3 group-hover:rotate-0' : 'grayscale-[0.5]'}
                    `}
                    style={{
                       // Apply static rotation here to allow hover override via class on Front item
                       transform: isFront ? undefined : `rotate(${rotate}deg)`
                    }}
                 >
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded text-white text-sm font-medium">
                       {img.caption}
                    </div>
                 </div>
               </div>
             );
           })}
           
           {/* Decorative background border */}
           <div className="absolute -z-10 top-8 -right-8 w-full h-full border-2 border-amber-500/30 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;