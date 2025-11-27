import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

const categories = [
  { id: 'tpe', label: 'Thảm TPE' },
  { id: 'pvc', label: 'Thảm PVC' },
  { id: 'rubber', label: 'Thảm Cao Su' },
];

const images = [
  {
    id: 1,
    category: 'tpe',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6759552197350_06d745355819e4440a35fa599b80e869.jpg",
    title: "Thảm TPE Đúc Khuôn",
    desc: "Ôm khít sàn xe, sang trọng"
  },
  {
    id: 2,
    category: 'tpe',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6759551564303_dea5f03c06e4f2297bcaf1f3e1eec08f.jpg",
    title: "Thảm TPE Ghế Phụ",
    desc: "Chống nước, thiết kế tràn viền"
  },
  {
    id: 3,
    category: 'tpe',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6759552197440_c88850d84d283d638c65660db0ec54b0.jpg",
    title: "Thảm TPE Hàng Ghế Sau",
    desc: "Liền lạc, bảo vệ sàn tuyệt đối"
  },
  {
    id: 4,
    category: 'pvc',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038422922_c5583c5429b729901e5553586f0a2e65-1.jpg",
    title: "Thảm PVC Nguyên Sinh",
    desc: "Màu sắc trang nhã, sạch sẽ"
  },
  {
    id: 5,
    category: 'pvc',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038559306_ea7c31cbf60232eba66f3aa9704c6a37.jpg",
    title: "Thảm thiết kế theo form xe",
    desc: "Vệ sinh dễ dàng"
  },
  {
    id: 6,
    category: 'pvc',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038279949_9131db984c75b554c79b1939054c12a4.jpg",
    title: "Thảm PVC Full Cốp",
    desc: "Bảo vệ toàn diện khoang hành lý"
  },
  {
    id: 7,
    category: 'rubber',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/1-1.jpg",
    title: "Thảm Cao Su Ghế Lái",
    desc: "Chống trượt, an toàn chân ga"
  },
  {
    id: 8,
    category: 'rubber',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2-1.jpg",
    title: "Thảm Cao Su Cắt Form",
    desc: "Cắt máy CNC chuẩn form xe"
  },
  {
    id: 9,
    category: 'rubber',
    src: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/3.jpg",
    title: "Thảm Cao Su Băng Sau",
    desc: "Phủ kín sàn, dễ dàng vệ sinh"
  }
];

const RealImages: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('tpe');

  const filteredImages = images.filter(img => img.category === activeCategory);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-80"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Hình Ảnh Lắp Đặt Trên Xe
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Trăm nghe không bằng một thấy. Dưới đây là hình ảnh thực tế thảm lót sàn Hien M Auto được lắp đặt trên xe của khách hàng.
          </p>
          <div className="inline-flex items-center gap-2 bg-zinc-800/80 border border-amber-500/30 text-amber-500 px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-amber-900/20 backdrop-blur-sm">
            <Camera size={18} />
            <span>Ảnh Chụp Thực Tế</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:border-amber-500/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-black/50 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500"
            >
              {/* Aspect Ratio Square (1:1) */}
              <div className="aspect-square overflow-hidden bg-zinc-900">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
                <p className="text-amber-400 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 font-medium">
                  {img.desc}
                </p>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                  <ZoomIn size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealImages;