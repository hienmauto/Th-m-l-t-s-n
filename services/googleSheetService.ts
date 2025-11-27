
// Đặt đường dẫn Web App URL từ Google Apps Script của bạn vào đây
// Hướng dẫn setup ở phần tin nhắn bên dưới
const GOOGLE_SCRIPT_URL = ''; 

export interface ProductPriceData {
  brand: string;
  model: string;
  year: string; // Có thể để trống nếu áp dụng cho tất cả đời xe
  type: string; // 'rubber', 'pvc', 'tpe'
  price: string;
  originalPrice: string;
  image: string;
}

// Dữ liệu mẫu (Fallback data) để hiển thị khi chưa kết nối Google Sheet
const MOCK_DB: ProductPriceData[] = [
  // Toyota Vios
  { brand: 'Toyota', model: 'Vios', year: 'All', type: 'rubber', price: '288.000đ', originalPrice: '480.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2.jpg' },
  { brand: 'Toyota', model: 'Vios', year: 'All', type: 'pvc', price: '490.000đ', originalPrice: '820.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038706600_423f168bba15b7192763629d43e20938.jpg' },
  { brand: 'Toyota', model: 'Vios', year: 'All', type: 'tpe', price: '1.490.000đ', originalPrice: '1.750.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg' },
  
  // Mazda CX-5
  { brand: 'Mazda', model: 'CX-5', year: 'All', type: 'rubber', price: '295.000đ', originalPrice: '490.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2.jpg' },
  { brand: 'Mazda', model: 'CX-5', year: 'All', type: 'pvc', price: '495.000đ', originalPrice: '830.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038706600_423f168bba15b7192763629d43e20938.jpg' },
  { brand: 'Mazda', model: 'CX-5', year: 'All', type: 'tpe', price: '1.550.000đ', originalPrice: '1.800.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg' },
  
  // VinFast VF 8
  { brand: 'VinFast', model: 'VF 8', year: 'All', type: 'tpe', price: '1.650.000đ', originalPrice: '1.950.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg' },
];

export const fetchProductPrice = async (
  brand: string, 
  model: string, 
  year: string, 
  type: string
): Promise<ProductPriceData | null> => {
  
  // 1. Ưu tiên lấy từ Google Sheet nếu có URL
  if (GOOGLE_SCRIPT_URL) {
    try {
      // Tạo URL với query parameters
      const url = new URL(GOOGLE_SCRIPT_URL);
      url.searchParams.append('brand', brand);
      url.searchParams.append('model', model);
      url.searchParams.append('year', year);
      url.searchParams.append('type', type);

      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (data && data.price) {
        return data as ProductPriceData;
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu từ Google Sheet:", error);
      // Fallback xuống dữ liệu mẫu nếu lỗi
    }
  }

  // 2. Sử dụng dữ liệu mẫu (Mock Data) nếu không có Google Sheet hoặc lỗi
  // Logic tìm kiếm đơn giản
  const found = MOCK_DB.find(item => 
    item.brand === brand && 
    item.model === model && 
    (item.type === type || type.includes(item.type))
  );
  
  // Nếu không tìm thấy chính xác xe, trả về giá mặc định theo loại thảm
  if (!found) {
     if (type.includes('rubber')) return { brand, model, year, type, price: '288.000đ', originalPrice: '480.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/2.jpg' };
     if (type.includes('pvc')) return { brand, model, year, type, price: '490.000đ', originalPrice: '820.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/z6643038706600_423f168bba15b7192763629d43e20938.jpg' };
     if (type.includes('tpe')) return { brand, model, year, type, price: '1.490.000đ', originalPrice: '1.750.000đ', image: 'https://thamoto.hienmauto.com/wp-content/uploads/2025/11/vn-11134207-820l4-mg8xet4at9mw89-54.jpg' };
  }

  return found || null;
};