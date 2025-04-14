import React, { useState, useEffect, useRef } from 'react';
import secondYearMembers from './SecondYear.json';
import { FaLinkedin } from 'react-icons/fa';

const SecondYearCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoDirection, setAutoDirection] = useState('next');
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const containerRef = useRef(null);
  const currentSlideRef = useRef(currentSlide);
  const autoDirectionRef = useRef(autoDirection);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    autoDirectionRef.current = autoDirection;
  }, [autoDirection]);

  useEffect(() => {
    const updateVisibleCards = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      let cards = 1;
      if (containerWidth >= 1024) cards = 4;
      else if (containerWidth >= 768) cards = 3;
      else if (containerWidth >= 640) cards = 2;
      setVisibleCards(cards);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxSlide = Math.max(0, secondYearMembers.length - visibleCards);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? maxSlide : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === maxSlide ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        const current = currentSlideRef.current;
        const direction = autoDirectionRef.current;

        if (direction === 'next') {
          if (current < maxSlide) {
            setCurrentSlide(current + 1);
          } else {
            setAutoDirection('prev');
            setCurrentSlide(current - 1);
          }
        } else {
          if (current > 0) {
            setCurrentSlide(current - 1);
          } else {
            setAutoDirection('next');
            setCurrentSlide(current + 1);
          }
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, maxSlide]);

  return (
    <div className="relative w-full py-10 bg-gray-100">
      

      <div 
        className="relative max-w-7xl mx-auto px-4"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="text-2xl md:text-3xl font-bold text-gray-600 hover:text-gray-800 z-10 p-2"
          >
            &#8592;
          </button>

          <div className="flex-1 overflow-hidden mx-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${(currentSlide * 100) / visibleCards}%)`,
                width: `${(secondYearMembers.length * 100) / visibleCards}%`
              }}
            >
              {secondYearMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-1 md:p-2"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-md flex flex-col items-center h-full">
                    <img
                      src={member.image}
                      alt={member.Name}
                      className="w-full h-32 md:h-40 object-cover rounded-lg mb-2 md:mb-3"
                    />
                    <h2 className="text-sm md:text-base font-semibold text-center">
                      {member.Name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600">{member.Branch}</p>
                    <p className="text-xs md:text-sm text-gray-600">{member.Year}</p>
                    {member.linkedin !== 'NA' && member.linkedin !== 'Not made till date' && (
                      <a
                        href={
                          member.linkedin.startsWith('http')
                            ? member.linkedin
                            : `https://www.linkedin.com/in/${member.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 md:mt-2 text-blue-600 hover:text-blue-800"
                      >
                        <FaLinkedin className="text-lg md:text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="text-2xl md:text-3xl font-bold text-gray-600 hover:text-gray-800 z-10 p-2"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondYearCarousel;