import React, { useState } from 'react';
import { faqList } from '../data/cloudAxisData';

export default function FaqAndMap() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 border-b border-gray-200">
      
      {/* Section Heading */}
      <h2 
        className="text-3xl sm:text-4xl md:text-5xl text-center mb-14 font-bold"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <span className="text-black">Discover More</span>{" "}
        <span className="text-[#E51A1A]">About Us</span>
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* FAQ Section (Left) */}
        <div className="space-y-4">
          <h3 
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Frequently Asked <span className="text-[#E51A1A]">Questions</span>
          </h3>

          <div className="space-y-3.5">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className="bg-white hover:bg-red-50/40 p-5 rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 border border-gray-200 hover:border-red-300"
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 font-sans leading-snug">
                      {faq.question}
                    </h4>
                    <span className={`text-2xl font-bold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45 text-[#E51A1A]' : 'text-gray-400'}`}>
                      +
                    </span>
                  </div>

                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed pt-2 border-t border-gray-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Google Map (Right) */}
        <div className="w-full h-full space-y-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[400px] h-full bg-white relative">
            <iframe
              title="CloudAxis Engineering Location Map"
              className="w-full h-[420px] border-0"
              src="https://maps.google.com/maps?q=Bingiriya,%20North%20Western%20Province,%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
            />
            <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
              <span className="font-semibold text-gray-900">
                Bingiriya HQ & Industrial Automation Engineering Center
              </span>
              <span className="text-[#E51A1A] font-bold">Hotline: +94 76 391 4538</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
