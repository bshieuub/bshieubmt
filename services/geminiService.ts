
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A real-world app would handle this more gracefully
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const askAI = async (question: string): Promise<string> => {
  if (!question.trim()) {
    return "Vui lòng nhập câu hỏi của bạn.";
  }
  
  try {
    const systemInstruction = `
      Bạn là một trợ lý y khoa AI, cung cấp thông tin chung về ung thư học để tham khảo.
      Câu trả lời của bạn phải rõ ràng, dễ hiểu cho bệnh nhân và người nhà.
      KHÔNG được đưa ra chẩn đoán hoặc lời khuyên y tế thay thế cho bác sĩ.
      **QUAN TRỌNG:** Luôn kết thúc câu trả lời bằng lời khuyến cáo sau:
      "Lưu ý: Thông tin này chỉ mang tính chất tham khảo, không thể thay thế cho chẩn đoán và tư vấn của bác sĩ chuyên khoa. Vui lòng liên hệ Bác sĩ Từ Ngọc Hiếu hoặc cơ sở y tế uy tín để được thăm khám chính xác."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Đã có lỗi xảy ra khi kết nối với trợ lý AI. Vui lòng thử lại sau.";
  }
};
