import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data/cloudAxisData';

export default function HeroCarousel({ onCtaClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="home" className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden bg-black select-none">
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        const words = slide.title.split(' ');

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[7000ms] ease-out"
              style={{ 
                backgroundImage: `url('${slide.bgImage}')`,
                filter: 'brightness(0.55)'
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

            {/* Centered Content */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center text-white max-w-4xl px-4 z-20">
                
                {/* Word-by-word animated title in Playfair Display serif */}
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight drop-shadow-lg"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {isActive && words.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="word-reveal mr-2.5 inline-block"
                      style={{ animationDelay: `${wIdx * 0.15}s` }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 font-light drop-shadow">
                  {slide.subtitle}
                </p>

                {/* Discover More / Read More Button */}
                <div>
                  <button
                    onClick={() => {
                      if (onCtaClick) onCtaClick();
                      else {
                        const target = document.querySelector('#services');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="read-more-btn group cursor-pointer"
                  >
                    <span>{slide.btnText}</span>
                    <svg className="arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E51A1A] text-white/80 hover:text-white transition-all backdrop-blur-sm hidden sm:flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E51A1A] text-white/80 hover:text-white transition-all backdrop-blur-sm hidden sm:flex items-center justify-center cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === i ? 'w-8 bg-[#E51A1A]' : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
