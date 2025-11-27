
import React from 'react';
import { SectionId, Testimonial } from '../types';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anh Tuấn",
    carModel: "Mercedes GLC300",
    rating: 5,
    comment: "Mình vừa lắp bộ TPE đúc khuôn cho xe GLC, phải nói là cực kỳ sang. Form vừa khít, không mùi chút nào. Lại còn được tặng thêm thảm rối.",
    avatar: "https://picsum.photos/100/100?random=10"
  },
  {
    id: 2,
    name: "Chị Lan",
    carModel: "Mazda CX-5",
    rating: 5,
    comment: "Đặt mua bộ thảm PVC nguyên sinh màu kem cho hợp nội thất. Màu đẹp, lau chùi dễ dàng lắm. Giá sale 40% quá hời.",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    id: 3,
    name: "Anh Hùng",
    carModel: "Ford Ranger",
    rating: 4,
    comment: "Thảm cao su giá rẻ mà dùng ổn áp phết. Mình chạy xe công trường nhiều đất cát, dùng loại này xịt nước cái là sạch bong.",
    avatar: "https://picsum.photos/100/100?random=12"
  },
  {
    id: 4,
    name: "Minh Khang",
    carModel: "VinFast VF 8",
    rating: 5,
    comment: "Ủng hộ hàng Việt, thảm TPE cho VF8 cắt rất chuẩn, lắp vào khớp ngay không cần chỉnh sửa. Shop tư vấn nhiệt tình.",
    avatar: "https://picsum.photos/100/100?random=13"
  },
  {
    id: 5,
    name: "Bác Ba",
    carModel: "Toyota Corolla Cross",
    rating: 5,
    comment: "Thảm nhẹ, dễ tháo ra vệ sinh. Tôi lớn tuổi rồi nên thích loại nào tiện lợi như này. Giao hàng nhanh.",
    avatar: "https://picsum.photos/100/100?random=14"
  },
  {
    id: 6,
    name: "Chị Mai",
    carModel: "Honda CR-V",
    rating: 5,
    comment: "Lúc đầu sợ mua online không vừa, ai ngờ shop gọi video check form xe kỹ lắm. Nhận hàng ưng ý hết sức.",
    avatar: "https://picsum.photos/100/100?random=15"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id={SectionId.TESTIMONIALS} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">Khách Hàng Nói Gì?</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto">
          Hơn 10.000 khách hàng đã tin tưởng lựa chọn thảm lót sàn Hien M Auto để bảo vệ xế yêu.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Gradient Overlay Left */}
        <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        {/* Gradient Overlay Right */}
        <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex w-max animate-infinite-scroll hover:pause-animation">
          {/* Render list twice to create seamless loop */}
          {[...testimonials, ...testimonials].map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-[300px] md:w-[400px] mx-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-6 right-6 text-amber-100 w-10 h-10" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < item.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic h-[80px] overflow-hidden leading-relaxed text-sm md:text-base">
                "{item.comment}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="relative">
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <CheckCircle2 size={14} className="text-blue-500 fill-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    {item.carModel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
