import React from 'react';
import { SectionId } from '../types';
import { Droplets, Shield, Ruler, Wind, Zap, Layers } from 'lucide-react';

const features = [
  {
    icon: <Ruler className="w-10 h-10 text-amber-500" />,
    title: "Thiết Kế Chuẩn Form",
    description: "Được đo đạc và cắt hoặc đúc khuôn TPE chính xác theo từng dòng xe, đảm bảo ôm khít sàn xe 100%."
  },
  {
    icon: <Shield className="w-10 h-10 text-amber-500" />,
    title: "Siêu Bền Bỉ",
    description: "Chất liệu PVC và nhựa TPE cao cấp chịu được ma sát cao, không bong tróc, tuổi thọ sử dụng lâu dài."
  },
  {
    icon: <Droplets className="w-10 h-10 text-amber-500" />,
    title: "Chống Nước Tuyệt Đối",
    description: "Bề mặt chống thấm nước hoàn toàn, dễ dàng lau chùi vệ sinh chỉ với khăn ướt hoặc xịt rửa."
  },
  {
    icon: <Wind className="w-10 h-10 text-amber-500" />,
    title: "Không Mùi Độc Hại",
    description: "Sử dụng vật liệu nguyên sinh an toàn cho sức khỏe, không gây mùi hôi khó chịu ngay cả khi để xe ngoài nắng."
  },
  {
    icon: <Layers className="w-10 h-10 text-amber-500" />,
    title: "An Toàn Vận Hành",
    description: "Thiết kế chống trượt, không gây kẹt chân ga, chân phanh, đảm bảo an toàn tuyệt đối khi lái xe."
  },
  {
    icon: <Zap className="w-10 h-10 text-amber-500" />,
    title: "Lắp Đặt Dễ Dàng",
    description: "Trọng lượng nhẹ, thiết kế thông minh, dễ dàng tháo lắp để vệ sinh tại nhà mà không cần ra tiệm."
  }
];

const Features: React.FC = () => {
  return (
    <section id={SectionId.FEATURES} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Tại Sao Chọn Hien M Auto?</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Chúng tôi mang đến giải pháp bảo vệ sàn xe toàn diện với các dòng thảm thế hệ mới.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 bg-white p-4 rounded-full w-fit shadow-md group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;