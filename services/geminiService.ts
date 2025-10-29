
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

export const generateBlogContent = async (prompt: string, type: 'title' | 'excerpt' | 'content'): Promise<string> => {
  if (!prompt.trim()) {
    return "Vui lòng nhập yêu cầu cho AI.";
  }
  
  try {
    let systemInstruction = '';
    let temperature = 0.7;
    
    switch (type) {
      case 'title':
        systemInstruction = `
          Bạn là một chuyên gia viết tiêu đề cho các bài viết y khoa về ung bướu.
          Tạo tiêu đề hấp dẫn, dễ hiểu và chuyên nghiệp cho bài viết về: ${prompt}
          
          Yêu cầu:
          - Tiêu đề ngắn gọn (dưới 60 ký tự)
          - Thu hút sự chú ý của người đọc
          - Phù hợp với chủ đề y khoa
          - Dễ hiểu cho bệnh nhân và người nhà
          - Chỉ trả về tiêu đề, không giải thích thêm
        `;
        temperature = 0.8;
        break;
        
      case 'excerpt':
        systemInstruction = `
          Bạn là một chuyên gia viết tóm tắt cho các bài viết y khoa về ung bướu.
          Tạo đoạn tóm tắt ngắn gọn (2-3 câu) cho bài viết về: ${prompt}
          
          Yêu cầu:
          - Tóm tắt dưới 150 ký tự
          - Nêu bật thông tin quan trọng nhất
          - Dễ hiểu cho người không chuyên
          - Khuyến khích đọc tiếp
          - Chỉ trả về tóm tắt, không giải thích thêm
        `;
        temperature = 0.6;
        break;
        
      case 'content':
        systemInstruction = `
          Bạn là Bác sĩ Từ Ngọc Hiếu, chuyên khoa Ung bướu với nhiều năm kinh nghiệm.
          Viết một bài viết chuyên nghiệp và dễ hiểu về chủ đề: ${prompt}
          
          Yêu cầu:
          - Viết theo phong cách chuyên nghiệp nhưng dễ hiểu
          - Chia thành các đoạn rõ ràng
          - Bao gồm thông tin hữu ích và thực tế
          - Sử dụng ngôn ngữ thân thiện, gần gũi
          - Kết thúc bằng lời khuyến cáo về việc tham khảo ý kiến bác sĩ
          - Độ dài khoảng 500-800 từ
          - Chỉ trả về nội dung bài viết, không giải thích thêm
        `;
        temperature = 0.7;
        break;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: temperature,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating blog content:", error);
    return "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại sau.";
  }
};

export const generateBlogIdeas = async (): Promise<string[]> => {
  try {
    const systemInstruction = `
      Bạn là một chuyên gia nội dung y khoa về ung bướu.
      Đề xuất 5 chủ đề bài viết hữu ích cho bệnh nhân và người nhà về:
      - Phòng ngừa ung thư
      - Dấu hiệu cảnh báo sớm
      - Quá trình điều trị
      - Chăm sóc sau điều trị
      - Dinh dưỡng và lối sống
      
      Mỗi chủ đề phải:
      - Thực tế và hữu ích
      - Dễ hiểu cho người không chuyên
      - Phù hợp với bác sĩ chuyên khoa ung bướu
      - Chỉ trả về danh sách chủ đề, mỗi chủ đề một dòng
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Đề xuất chủ đề bài viết về ung bướu",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text.split('\n').filter(line => line.trim()).slice(0, 5);
  } catch (error) {
    console.error("Error generating blog ideas:", error);
    return [
      "Dấu hiệu cảnh báo sớm của ung thư vú",
      "Chế độ dinh dưỡng cho bệnh nhân ung thư",
      "Tầm quan trọng của tầm soát ung thư định kỳ",
      "Cách chăm sóc tinh thần cho bệnh nhân ung thư",
      "Phòng ngừa ung thư qua lối sống lành mạnh"
    ];
  }
};
