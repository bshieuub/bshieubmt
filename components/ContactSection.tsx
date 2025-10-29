import React from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon, FacebookIcon } from './IconComponents';

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Liên hệ & Đặt hẹn</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.</p>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">Thông tin liên lạc</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Điện thoại / Zalo</h4>
                  <p className="text-gray-600">0932.484.353</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MailIcon className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">bshieuubdl@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FacebookIcon className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Facebook</h4>
                   <a href="https://fb.com/bshieubmt" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    fb.com/bshieubmt
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-gray-500 h-96 md:h-auto">
            <p>Bản đồ Google sẽ được hiển thị ở đây</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;