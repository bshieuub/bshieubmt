import React from 'react';
import type { Service, Testimonial } from './types';
import { StethoscopeIcon, MicroscopeIcon, HeartPulseIcon, UsersIcon } from './components/IconComponents';

export const DOCTOR_INFO = {
  name: "Bác sĩ Từ Ngọc Hiếu",
  specialty: "Chuyên khoa Ung bướu",
  location: "Buôn Ma Thuột, Đắk Lắk",
  bio: "Với nhiều năm kinh nghiệm trong lĩnh vực ung bướu, Bác sĩ Từ Ngọc Hiếu hiện đang công tác tại Khoa Ung bướu - Bệnh viện Đại học Y dược Buôn Ma Thuột và phụ trách phòng khám chuyên khoa Ung bướu tại Buôn Ma Thuột. Tốt nghiệp từ các trường đại học y khoa danh tiếng và liên tục cập nhật kiến thức qua các khóa đào tạo chuyên sâu, Bác sĩ Hiếu luôn áp dụng những phương pháp chẩn đoán và điều trị tiên tiến nhất, mang lại hy vọng và chất lượng sống tốt hơn cho người bệnh.",
  philosophy: "Tận tâm - Thấu hiểu - Trách nhiệm. Tôi luôn đặt bệnh nhân làm trung tâm, lắng nghe và chia sẻ để cùng họ vượt qua hành trình khó khăn này."
};

export const NAV_LINKS = [
  { name: 'Trang chủ', section: 'home' },
  { name: 'Giới thiệu', section: 'about' },
  { name: 'Dịch vụ', section: 'services' },
  { name: 'Blog', section: 'blog' },
  { name: 'Hỏi đáp AI', section: 'knowledge' },
  { name: 'Bệnh nhân', section: 'testimonials' },
  { name: 'Liên hệ', section: 'contact' },
];

export const SERVICES: Service[] = [
  {
    // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
    icon: React.createElement(StethoscopeIcon, { className: "w-12 h-12 text-secondary" }),
    title: "Tư vấn & Khám sàng lọc",
    description: "Khám lâm sàng, tư vấn chuyên sâu về các bệnh lý ung bướu, giúp phát hiện sớm và định hướng điều trị kịp thời."
  },
  {
    // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
    icon: React.createElement(MicroscopeIcon, { className: "w-12 h-12 text-secondary" }),
    title: "Tầm soát ung thư",
    description: "Thực hiện các gói tầm soát ung thư toàn diện theo các phác đồ chuẩn quốc tế cho các loại ung thư phổ biến."
  },
  {
    // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
    icon: React.createElement(HeartPulseIcon, { className: "w-12 h-12 text-secondary" }),
    title: "Hóa trị & Điều trị đích",
    description: "Lên phác đồ và thực hiện hóa trị, điều trị trúng đích, liệu pháp miễn dịch... tối ưu hóa hiệu quả và giảm thiểu tác dụng phụ."
  },
  {
    // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
    icon: React.createElement(UsersIcon, { className: "w-12 h-12 text-secondary" }),
    title: "Chăm sóc giảm nhẹ",
    description: "Nâng cao chất lượng cuộc sống cho bệnh nhân bằng cách kiểm soát triệu chứng, giảm đau và hỗ trợ tinh thần."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Bác sĩ Hiếu rất tận tâm và giải thích cặn kẽ về bệnh tình cho gia đình tôi. Nhờ có bác sĩ, mẹ tôi đã lạc quan hơn và tuân thủ điều trị rất tốt.",
    author: "Anh Trần Văn Nam",
    relation: "Con trai bệnh nhân"
  },
  {
    quote: "Sự chăm sóc và phác đồ điều trị của bác sĩ Hiếu thực sự hiệu quả. Tôi cảm thấy sức khỏe mình cải thiện rõ rệt qua từng ngày. Xin chân thành cảm ơn bác sĩ.",
    author: "Chị Nguyễn Thị Lan",
    relation: "Bệnh nhân"
  },
  {
    quote: "Phòng khám sạch sẽ, chuyên nghiệp. Bác sĩ Hiếu không chỉ giỏi chuyên môn mà còn rất tâm lý, luôn động viên bệnh nhân. Tôi rất tin tưởng.",
    author: "Ông Lê Minh Tuấn",
    relation: "Bệnh nhân"
  }
];