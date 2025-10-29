
import React from 'react';
import { DOCTOR_INFO } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Giới thiệu Bác sĩ</h2>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 flex justify-center">
            <img src="https://picsum.photos/id/1027/300/400" alt={DOCTOR_INFO.name} className="rounded-lg shadow-xl object-cover h-full w-full" />
          </div>
          <div className="md:col-span-3">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{DOCTOR_INFO.bio}</p>
            <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-lg italic text-primary font-medium leading-relaxed">"{DOCTOR_INFO.philosophy}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
