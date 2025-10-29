
import React from 'react';
import { SERVICES } from '../constants';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Dịch vụ chuyên khoa</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Cung cấp các dịch vụ toàn diện từ tầm soát, chẩn đoán đến điều trị và chăm sóc.</p>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-light p-8 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-center items-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
