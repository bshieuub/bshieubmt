
import React from 'react';
import { TESTIMONIALS } from '../constants';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Bệnh nhân nói về chúng tôi</h2>
           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Niềm tin và sự hài lòng của bệnh nhân là động lực lớn nhất.</p>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-light p-8 rounded-lg shadow-md flex flex-col">
              <div className="text-5xl text-primary opacity-20">“</div>
              <p className="text-gray-700 italic flex-grow mb-6">
                {testimonial.quote}
              </p>
              <div className="mt-auto">
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
