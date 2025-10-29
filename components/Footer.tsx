
import React from 'react';
import { FacebookIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <a href="https://fb.com/bshieubmt" target="_blank" rel="noopener noreferrer" aria-label="Facebook của Bác sĩ Hiếu" className="text-white hover:text-accent transition-colors">
            <FacebookIcon className="w-6 h-6" />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Bác sĩ Từ Ngọc Hiếu. All rights reserved.</p>
        <p className="text-sm opacity-80 mt-1">Website được thiết kế và phát triển để cung cấp thông tin tham khảo.</p>
      </div>
    </footer>
  );
};

export default Footer;