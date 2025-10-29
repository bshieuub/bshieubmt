
import React from 'react';
import { DOCTOR_INFO } from '../constants';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              {DOCTOR_INFO.name}
            </h1>
            <p className="mt-4 text-xl text-secondary font-semibold">{DOCTOR_INFO.specialty}</p>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              Chuyên gia tư vấn, tầm soát và điều trị các bệnh lý ung bướu tại {DOCTOR_INFO.location}.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button onClick={onOpenModal} className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-all shadow-lg text-lg">
                Đặt lịch tư vấn
              </button>
            </div>
          </div>
          <div className="flex justify-center">
             <img src="https://picsum.photos/id/1005/400/400" alt={DOCTOR_INFO.name} className="rounded-full shadow-2xl w-80 h-80 object-cover border-8 border-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
