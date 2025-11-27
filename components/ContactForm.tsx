
import React, { useState, useEffect, useRef } from 'react';
import { SectionId } from '../types';
import { Phone, MapPin, Mail, Loader2, CheckCircle, Search, ChevronDown, ChevronUp, X, Minus, Plus, Send } from 'lucide-react';
import { fetchProductPrice, ProductPriceData } from '../services/googleSheetService';

const CAR_DATA: Record<string, string[]> = {
  "Toyota": ["Vios", "Camry", "Fortuner", "Innova", "Corolla Cross", "Raize", "Veloz Cross", "Yaris", "Altis", "Land Cruiser", "Hilux"],
  "Hyundai": ["Accent", "Grand i10", "Tucson", "SantaFe", "Creta", "Stargazer", "Elantra", "Palisade", "Venue", "Custin"],
  "Honda": ["City", "CR-V", "Civic", "HR-V", "BR-V", "Accord"],
  "Mazda": ["Mazda 2", "Mazda 3", "Mazda 6", "CX-3", "CX-30", "CX-5", "CX-8", "BT-50"],
  "Kia": ["Morning", "K3", "K5", "Sonet", "Seltos", "Sportage", "Sorento", "Carnival", "Soluto", "Carens"],
  "VinFast": ["VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9", "VF e34", "Fadil", "Lux A2.0", "Lux SA2.0", "President"],
  "Ford": ["Ranger", "Everest", "Territory", "Explorer", "Transit"],
  "Mitsubishi": ["Xpander", "Outlander", "Pajero Sport", "Triton", "Attrage", "Xforce"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS", "G-Class", "Maybach"],
  "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7"],
  "Lexus": ["ES", "LS", "NX", "RX", "GX", "LX"],
  "Peugeot": ["2008", "3008", "5008", "408"],
  "Subaru": ["Forester", "Outback", "BRZ"],
  "Suzuki": ["XL7", "Ertiga", "Swift", "Jimny"],
  "MG": ["MG5", "ZS", "HS", "RX5"],
  "Khác": ["Khác"]
};

// Helper function to find brand by model
const getBrandByModel = (model: string): string => {
  for (const [brand, models] of Object.entries(CAR_DATA)) {
    if (models.includes(model)) return brand;
  }
  return "";
};

// Helper to get readable product name
const getProductTypeName = (type: string): string => {
  if (type.includes('tpe')) return "Thảm Nhựa Đúc TPE";
  if (type.includes('pvc')) return "Thảm PVC Nguyên Sinh";
  if (type.includes('rubber')) return "Thảm Cao Su";
  return type.toUpperCase();
};

// Interface cho dữ liệu hành chính
interface LocationItem {
  id: string;
  name: string;
  full_name: string;
}

interface Option {
  value: string;
  label: string;
}

// Interface mở rộng cho sản phẩm trong giỏ hàng (thêm số lượng)
interface CartItem extends ProductPriceData {
  quantity: number;
  year: string; // Ensure year is part of the cart item
}

// --- CUSTOM MULTI-SELECT COMPONENT ---
interface MultiSearchableSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

const MultiSearchableSelect: React.FC<MultiSearchableSelectProps> = ({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder, 
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter(item => item !== val));
    } else {
      onChange([...selectedValues, val]);
    }
    // Don't close immediately for multi-select
  };

  const handleRemove = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(selectedValues.filter(item => item !== val));
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 rounded-lg border flex flex-wrap items-center justify-between cursor-pointer transition-all min-h-[46px] ${
          disabled 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-gray-50 border-gray-200 hover:border-amber-500'
        } ${isOpen ? 'ring-1 ring-amber-500 border-amber-500' : ''}`}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {selectedValues.length > 0 ? (
            selectedValues.map(val => {
              const opt = options.find(o => o.value === val);
              return (
                <span key={val} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                  {opt ? opt.label.split('(')[0].trim() : val} {/* Truncate overly long labels in tags */}
                  <X 
                    size={12} 
                    className="hover:text-amber-900 cursor-pointer" 
                    onClick={(e) => handleRemove(e, val)}
                  />
                </span>
              );
            })
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center text-gray-400 ml-2">
           {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 flex flex-col animate-fade-in-up">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white rounded-t-lg z-10">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          
          {/* Options List */}
          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center justify-between ${
                      isSelected ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <CheckCircle size={16} className="text-amber-500" />}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                Không tìm thấy kết quả
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
// --- END CUSTOM COMPONENT ---

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  
  // State cho địa chỉ
  const [provinces, setProvinces] = useState<LocationItem[]>([]);
  const [districts, setDistricts] = useState<LocationItem[]>([]);
  const [wards, setWards] = useState<LocationItem[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");

  // Update State to Arrays for Multi-Select
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // Change to array to store multiple prices with Quantity
  const [productDataList, setProductDataList] = useState<CartItem[]>([]);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate years from 2025 down to 2015
  const years = Array.from({length: 11}, (_, i) => 2025 - i);

  // Fetch Provinces on mount
  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => response.json())
      .then(data => {
        if (data.error === 0) {
          setProvinces(data.data);
        }
      })
      .catch(err => console.error("Lỗi tải tỉnh thành:", err));
  }, []);

  // Handle Province Change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);

    if (provinceId) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setDistricts(data.data);
          }
        })
        .catch(err => console.error("Lỗi tải quận huyện:", err));
    }
  };

  // Handle District Change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");
    setWards([]);

    if (districtId) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setWards(data.data);
          }
        })
        .catch(err => console.error("Lỗi tải phường xã:", err));
    }
  };

  // Validation function for phone number
  const validatePhone = (value: string) => {
    if (!value) return "";
    // Loại bỏ khoảng trắng để kiểm tra
    const cleanValue = value.replace(/\s/g, '');
    if (/[^0-9]/.test(cleanValue)) return "Số điện thoại không được chứa chữ cái hoặc ký tự đặc biệt";
    if (!cleanValue.startsWith('0')) return "Số điện thoại phải bắt đầu bằng số 0";
    if (cleanValue.length !== 10) return "Số điện thoại phải có đúng 10 chữ số";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) {
      setPhoneError(validatePhone(val));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneError(validatePhone(phone));
  };

  const handleBrandsChange = (brands: string[]) => {
    setSelectedBrands(brands);
    // Khi đổi hãng xe, lọc lại các model đã chọn. Chỉ giữ lại model thuộc các hãng đang chọn.
    const availableModels: string[] = [];
    brands.forEach(brand => {
      if (CAR_DATA[brand]) availableModels.push(...CAR_DATA[brand]);
    });
    
    // Giữ lại các model cũ nếu nó vẫn thuộc danh sách hãng mới chọn, nếu không thì bỏ
    const validModels = selectedModels.filter(model => availableModels.includes(model));
    setSelectedModels(validModels);
    
    // Reset price list when structure changes
    setProductDataList([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation Checks
    if (name.trim() === "") { alert("Vui lòng nhập họ tên"); return; }
    if (phone.trim() === "" || phoneError) { alert("Vui lòng kiểm tra lại số điện thoại"); return; }
    if (selectedTypes.length === 0) { alert("Vui lòng chọn loại thảm quan tâm"); return; }
    if (selectedBrands.length === 0) { alert("Vui lòng chọn hãng xe"); return; }
    if (selectedModels.length === 0) { alert("Vui lòng chọn dòng xe"); return; }

    setIsSubmitting(true);

    // Lấy tên đầy đủ của địa điểm để gửi đi
    const provName = provinces.find(p => p.id === selectedProvince)?.full_name || "";
    const distName = districts.find(d => d.id === selectedDistrict)?.full_name || "";
    const wardName = wards.find(w => w.id === selectedWard)?.full_name || "";
    
    // Xây dựng địa chỉ đầy đủ
    let fullAddress = specificAddress;
    // Fallback: Nếu không chọn tỉnh thành (do lỗi hoặc user không chọn), gửi giá trị user đã nhập ở ô specificAddress
    if (provName || distName || wardName) {
        if (wardName) fullAddress += `, ${wardName}`;
        if (distName) fullAddress += `, ${distName}`;
        if (provName) fullAddress += `, ${provName}`;
    }

    if (fullAddress.trim() === "") { 
        alert("Vui lòng nhập địa chỉ nhận hàng"); 
        setIsSubmitting(false);
        return; 
    }

    // Xây dựng chi tiết đơn hàng theo format yêu cầu:
    // 1. Tên sản phẩm + Hãng + tên xe + năm + số lượng
    const formattedCart = productDataList.map((item, index) => 
      `${index + 1}. ${getProductTypeName(item.type)} + ${item.brand} + ${item.model} + ${item.year} + SL: ${item.quantity}`
    ).join("\n");

    // Dữ liệu gửi đi
    const formData = {
      _subject: `LPNO ${name} + ${phone}`,
      _template: "table",
      "Họ Tên": name,
      "SĐT": phone,
      "Địa Chỉ": fullAddress,
      "Đơn hàng": formattedCart
    };

    try {
      // Gửi email qua FormSubmit API
      const response = await fetch("https://formsubmit.co/ajax/hienmauto@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
        window.location.reload();
      } else {
        alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại hoặc gọi hotline.");
      }
    } catch (error) {
      console.error("Lỗi gửi mail:", error);
      alert("Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic tìm kiếm giá cho NHIỀU xe
  useEffect(() => {
    const getPrices = async () => {
      // Điều kiện để tra cứu: Phải chọn ít nhất 1 dòng xe và 1 loại thảm
      if (selectedModels.length > 0 && selectedTypes.length > 0) {
        setLoadingPrice(true);
        // Delay nhẹ để tạo hiệu ứng UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const results: CartItem[] = [];

        // Duyệt qua từng model xe đã chọn
        for (const model of selectedModels) {
           const brand = getBrandByModel(model);
           if (!brand) continue;

           // Duyệt qua từng loại thảm đã chọn cho model đó
           for (const type of selectedTypes) {
              const defaultYear = "2025";
              const data = await fetchProductPrice(brand, model, defaultYear, type);
              if (data) {
                // Initialize with quantity 1 and default year
                results.push({ ...data, year: defaultYear, quantity: 1 });
              }
           }
        }
        
        setProductDataList(results);
        setLoadingPrice(false);
      } else {
        setProductDataList([]);
      }
    };

    const debounce = setTimeout(() => {
        getPrices();
    }, 500);

    return () => clearTimeout(debounce);
  }, [selectedModels, selectedTypes]); // Removed selectedYear from dependencies

  // Handler for changing quantity
  const handleQuantityChange = (index: number, delta: number) => {
    setProductDataList(prev => {
      const newList = [...prev];
      const item = newList[index];
      const newQuantity = Math.max(1, item.quantity + delta);
      newList[index] = { ...item, quantity: newQuantity };
      return newList;
    });
  };

  // Handler for changing year of a specific item
  const handleItemYearChange = async (index: number, newYear: string) => {
    // Optimistically update the year in the list first
    const currentItem = productDataList[index];
    
    // Check if price needs to be fetched again (in case year affects price)
    // Even if price is same, we might want to ensure 'year' in data is consistent
    const newData = await fetchProductPrice(currentItem.brand, currentItem.model, newYear, currentItem.type);
    
    if (newData) {
      setProductDataList(prev => {
        const newList = [...prev];
        // Update item with new data but preserve quantity and set new year
        newList[index] = { 
            ...newData, 
            year: newYear, 
            quantity: prev[index].quantity 
        };
        return newList;
      });
    }
  };

  // Data Preparations for SearchableSelect
  const carpetTypeOptions: Option[] = [
    { value: "rubber", label: "Thảm Cao Su Cao Cấp (-40%)" },
    { value: "pvc", label: "Thảm PVC Nguyên Sinh (-40%)" },
    { value: "tpe", label: "Thảm Nhựa Đúc TPE (-15% + Quà)" },
  ];

  const brandOptions: Option[] = Object.keys(CAR_DATA).map(brand => ({ value: brand, label: brand }));

  // Tạo danh sách Model dựa trên TẤT CẢ các hãng xe đã chọn
  const modelOptions: Option[] = selectedBrands.length > 0
    ? selectedBrands.flatMap(brand => 
        CAR_DATA[brand] 
          ? CAR_DATA[brand].map(model => ({ value: model, label: `${brand} - ${model}` })) 
          : []
      )
    : [];

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Info Side */}
          <div className="md:w-5/12 p-10 md:p-16 text-white bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col">
            <h2 className="text-3xl font-bold mb-6">Liên Hệ Tư Vấn</h2>
            <p className="text-gray-400 mb-10">
              Để lại thông tin xe của bạn, hệ thống sẽ tự động tra cứu giá và hình ảnh thực tế sản phẩm dành riêng cho xe của bạn.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Hotline</p>
                  <p className="font-bold text-lg">0904.444.037</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-bold">hienmauto@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="font-bold">479 Nguyễn Xiển, P.Long Bình, TP.HCM ( Quận 9 cũ )</p>
                </div>
              </div>
            </div>

            {/* Logo replacement for Map - Centered in remaining space */}
            <div className="flex-1 flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity min-h-[200px]">
              <img 
                src="https://thamoto.hienmauto.com/wp-content/uploads/2025/11/logo-hien-m-.png" 
                alt="Hien M Auto Logo" 
                className="w-40 md:w-56 h-auto object-contain mb-4 drop-shadow-2xl" 
              />
              <div className="text-3xl font-bold tracking-tighter uppercase flex items-center gap-2">
                <span className="text-white">HIEN</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">M</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">AUTO</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 p-10 md:p-16 bg-white">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Họ tên & SĐT */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                    placeholder="Nguyễn Văn A" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border outline-none transition-all ${
                      phoneError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                    }`}
                    placeholder="0909xxxxxx" 
                    required
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1 animate-pulse font-medium">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Module Địa chỉ */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  {/* Tỉnh / Thành */}
                  <div className="relative">
                     <select 
                       value={selectedProvince}
                       onChange={handleProvinceChange}
                       className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm appearance-none cursor-pointer"
                     >
                       <option value="">Tỉnh / Thành phố</option>
                       {provinces.map((p) => (
                         <option key={p.id} value={p.id}>{p.full_name}</option>
                       ))}
                     </select>
                  </div>
                  
                  {/* Quận / Huyện */}
                  <div className="relative">
                     <select 
                       value={selectedDistrict}
                       onChange={handleDistrictChange}
                       disabled={!selectedProvince}
                       className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                     >
                       <option value="">Quận / Huyện</option>
                       {districts.map((d) => (
                         <option key={d.id} value={d.id}>{d.full_name}</option>
                       ))}
                     </select>
                  </div>

                  {/* Phường / Xã */}
                  <div className="relative">
                     <select 
                       value={selectedWard}
                       onChange={(e) => setSelectedWard(e.target.value)}
                       disabled={!selectedDistrict}
                       className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                     >
                       <option value="">Phường / Xã</option>
                       {wards.map((w) => (
                         <option key={w.id} value={w.id}>{w.full_name}</option>
                       ))}
                     </select>
                  </div>
                </div>

                <input 
                  type="text" 
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm" 
                  placeholder="Số nhà, tên đường, thôn/xóm..." 
                  required
                />
              </div>

              {/* 1. Chọn Loại Thảm TRƯỚC (Multi Select) */}
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Loại thảm quan tâm (Chọn nhiều) <span className="text-red-500">*</span></label>
                 <MultiSearchableSelect
                    options={carpetTypeOptions}
                    selectedValues={selectedTypes}
                    onChange={setSelectedTypes}
                    placeholder="-- Chọn Loại Thảm --"
                 />
              </div>
              
              {/* 2. Thông tin Xe (Chỉ hiện khi đã chọn loại thảm) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hãng xe (Chọn nhiều) <span className="text-red-500">*</span></label>
                  <MultiSearchableSelect
                    options={brandOptions}
                    selectedValues={selectedBrands}
                    onChange={handleBrandsChange}
                    placeholder="-- Chọn Hãng Xe --"
                    disabled={selectedTypes.length === 0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên xe (Model) <span className="text-red-500">*</span></label>
                  <MultiSearchableSelect
                    options={modelOptions}
                    selectedValues={selectedModels}
                    onChange={setSelectedModels}
                    placeholder="-- Chọn Dòng Xe --"
                    disabled={selectedBrands.length === 0}
                  />
                </div>
              </div>

              {/* Dynamic Product Price Display Area */}
              <div className="min-h-[120px] transition-all duration-300">
                {loadingPrice ? (
                  <div className="flex flex-col items-center justify-center h-full py-4 text-amber-500">
                    <Loader2 className="animate-spin mb-2" />
                    <span className="text-sm">Đang tra cứu giá tốt nhất...</span>
                  </div>
                ) : productDataList.length > 0 ? (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-hide">
                    {productDataList.map((item, idx) => (
                      <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 animate-fade-in-up items-center">
                        <img 
                          src={item.image} 
                          alt={`${item.model} ${item.type}`} 
                          className="w-20 h-20 object-cover rounded-lg bg-white shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">
                                {getProductTypeName(item.type)} cho {item.brand} {item.model}
                              </h4>
                              {/* Year Selection inside Card */}
                              <div className="flex items-center gap-1 mt-1">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Đời xe:</label>
                                <select
                                  value={item.year}
                                  onChange={(e) => handleItemYearChange(idx, e.target.value)}
                                  className="text-xs bg-white border border-gray-200 rounded px-1 py-0.5 outline-none focus:border-amber-500 cursor-pointer font-medium text-gray-700 hover:border-amber-400"
                                >
                                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                              </div>
                            </div>
                            <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                          </div>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-bold text-red-600">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                          </div>
                          {item.type === 'tpe' && (
                            <span className="text-[10px] text-amber-600 font-semibold block mt-1">+ Tặng kèm thảm rối</span>
                          )}
                        </div>
                        
                        {/* Quantity Control Module */}
                        <div className="flex flex-col items-center gap-1 border-l border-amber-100 pl-3 ml-2">
                           <span className="text-[10px] text-gray-400 uppercase font-bold">SL</span>
                           <button 
                             type="button"
                             onClick={() => handleQuantityChange(idx, 1)}
                             className="p-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                           >
                             <Plus size={14} />
                           </button>
                           <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                           <button 
                             type="button"
                             onClick={() => handleQuantityChange(idx, -1)}
                             className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                           >
                             <Minus size={14} />
                           </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center h-full">
                      <p>{selectedTypes.length > 0 ? "Vui lòng chọn Hãng xe & Tên xe để xem giá" : "Vui lòng chọn Loại thảm trước"}</p>
                   </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg mt-2 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Đang gửi đơn hàng...
                  </>
                ) : (
                  <>
                    Đặt Hàng <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
