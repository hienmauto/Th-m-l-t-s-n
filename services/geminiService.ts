import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là trợ lý ảo chuyên nghiệp của Hien M Auto, chuyên cung cấp thảm lót sàn ô tô chất lượng cao.
Nhiệm vụ của bạn là tư vấn cho khách hàng về 3 dòng thảm chính:

1. Thảm Cao Su Cao Cấp:
   - Giá: Chỉ từ 200.000đ - 300.000đ (đang giảm 40%).
   - Đặc điểm: Bền bỉ, giá rẻ, dễ cắt theo form, chống nước tốt.

2. Thảm PVC Nguyên Sinh:
   - Giá: Chỉ từ 400.000đ - 500.000đ (đang giảm 40%).
   - Đặc điểm: Nhựa nguyên sinh an toàn sức khỏe, không mùi, màu sắc đẹp, đàn hồi tốt.

3. Thảm Nhựa Đúc TPE (Dòng cao cấp nhất):
   - Giá: Từ 1.000.000đ trở lên.
   - Ưu đãi: Đang giảm 15% và TẶNG KÈM bộ thảm rối.
   - Đặc điểm: Đúc khuôn 3D/5D chuẩn khít theo từng xe, vật liệu TPE cao cấp, sang trọng, siêu bền, không mùi, chịu nhiệt tốt.

Lưu ý quan trọng: Giá trên chưa bao gồm thảm lót cốp.
Hãy trả lời ngắn gọn, thân thiện, xưng hô là "Em" và gọi khách là "Anh/Chị". Luôn khuyến khích khách hàng để lại số điện thoại để nhận ưu đãi giảm giá sâu này.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini Chat", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = initializeChat();
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Xin lỗi, tôi đang gặp chút sự cố kết nối. Vui lòng để lại SĐT để nhân viên gọi lại ạ.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Hệ thống đang bận, xin vui lòng thử lại sau.";
  }
};