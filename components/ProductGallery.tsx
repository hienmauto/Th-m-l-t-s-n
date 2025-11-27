import React, { useState } from 'react';
import { SectionId } from '../types';
import { Check, Tag, Gift, Search, CarFront, ShieldCheck } from 'lucide-react';

interface ProductDisplay {
  id: number;
  name: string;
  originalPrice?: string; // Kept for interface compatibility but not used for display anymore
  price: string;
  description: string;
  image: string;
  features: string[];
  discountTag?: string;
  gift?: string;
  isBestSeller?: boolean;
  warranty: string;
}

const products: ProductDisplay[] = [
  {
    id: 1,
    name: "Thảm Cao Su Cao Cấp",
    price: "2xx.000đ",
    description: "Giải pháp tiết kiệm, bền bỉ, cắt theo form xe.",
    image: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2.jpg",
    features: ["Cao su đàn hồi tốt", "Cắt theo form xe", "Dễ cọ rửa vệ sinh", "Chống nước 100%"],
    discountTag: "Giảm 40%",
    warranty: "Bảo hành 2 năm"
  },
  {
    id: 2,
    name: "Thảm PVC Nguyên Sinh",
    price: "4xx.000đ",
    description: "Nhựa nguyên sinh an toàn, không mùi, màu sắc thời trang.",
    image: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038706600_423f168bba15b7192763629d43e20938.jpg",
    features: ["Nhựa PVC nguyên sinh", "Không mùi độc hại", "Nhiều màu sắc", "Chống trơn trượt"],
    discountTag: "Giảm 40%",
    isBestSeller: true,
    warranty: "Bảo hành 5 năm"
  },
  {
    id: 3,
    name: "Thảm Nhựa Đúc TPE",
    price: "1.xxx.000đ",
    description: "Đúc khuôn chuẩn khít form xe, sang trọng bậc nhất.",
    image: "https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg",
    features: ["Đúc khuôn nguyên khối", "Vật liệu TPE cao cấp", "Ôm khít sàn xe", "Bảo hành 5 năm"],
    discountTag: "Giảm 15%",
    gift: "Tặng kèm bộ thảm rối",
    warranty: "Bảo hành 1 đổi 1 trong 24 tháng"
  }
];

const ProductGallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.PRODUCTS} className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm">Ưu Đãi Đặc Biệt</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Bảng Giá Hien M Auto</h2>
          
          {/* Nút kiểm tra giá dưới tiêu đề */}
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-amber-500 border border-zinc-700 hover:border-amber-500/50 py-2 px-6 rounded-full transition-all duration-300 group"
          >
            <CarFront size={18} className="group-hover:text-amber-400" />
            <span className="font-medium group-hover:text-amber-400">Kiểm tra giá theo dòng xe của bạn</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className={`relative bg-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 border border-zinc-700 flex flex-col ${
                hoveredId === product.id ? 'transform -translate-y-4 shadow-2xl shadow-amber-500/20 border-amber-500/50' : ''
              }`}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {product.discountTag && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 flex items-center gap-1 shadow-lg">
                  <Tag size={12} /> {product.discountTag}
                </div>
              )}
              
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
                  Bán Chạy Nhất
                </div>
              )}

              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === product.id ? 'scale-110' : 'scale-100'
                  }`} 
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4 text-sm min-h-[40px]">{product.description}</p>
                
                <div className="mb-4">
                  <span className="text-gray-400 text-sm block mb-1">
                    Giá chỉ từ
                  </span>
                  <div className="text-3xl font-bold text-amber-500">
                    {product.price}
                  </div>
                </div>

                {product.gift && (
                  <div className="mb-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-start gap-3">
                    <Gift className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-amber-200 font-medium">{product.gift}</span>
                  </div>
                )}

                {/* Khung thông tin bảo hành */}
                <div className="mb-6 bg-zinc-900/50 border border-zinc-700 rounded-xl p-3 flex items-center gap-3 group-hover:border-green-500/30 transition-colors">
                   <div className="bg-green-500/10 p-2 rounded-full border border-green-500/20 flex-shrink-0">
                      <ShieldCheck size={20} className="text-green-500" />
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Chính sách bảo hành</p>
                      <p className="text-sm font-bold text-white leading-tight">{product.warranty}</p>
                   </div>
                </div>

                {/* Ghi chú riêng cho TPE */}
                {product.id === 3 && (
                  <p className="text-gray-500 text-xs italic mb-4">*Lưu ý: Giá sản phẩm chưa bao gồm thảm lót cốp</p>
                )}
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="bg-amber-500/20 p-1 rounded-full text-amber-500">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-lg font-bold transition-colors mt-auto ${
                    hoveredId === product.id 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                  }`}
                >
                  Nhận Báo Giá Chi Tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nút kiểm tra giá lớn dưới danh sách sản phẩm */}
        <div className="mt-16 text-center">
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 px-10 rounded-full shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-1 group"
          >
            <Search size={24} className="group-hover:scale-110 transition-transform"/>
            <span className="text-lg">Tra Cứu Giá Theo Dòng Xe Của Bạn</span>
          </button>
          <p className="mt-4 text-gray-500 text-sm">Chọn hãng xe, đời xe để xem mẫu thảm chính xác nhất</p>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;