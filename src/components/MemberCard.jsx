import React, { useState, useEffect, useRef } from 'react';
import secondYearMembers from './SecondYear.json';
import { FaLinkedin } from 'react-icons/fa';

const SecondYearCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Clone members to create infinite loop illusion
  const clonedMembers = [...secondYearMembers, ...secondYearMembers, ...secondYearMembers];

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

  const handlePrev = () => {
    setCurrentSlide(prev => {
      if (prev <= 0) {
        // Jump to near the end (middle of cloned array) for infinite effect
        return secondYearMembers.length * 2 - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentSlide(prev => {
      if (prev >= secondYearMembers.length * 2) {
        // Jump back to near the start (middle of cloned array) for infinite effect
        return secondYearMembers.length;
      }
      return prev + 1;
    });
  };

  // Auto-slide with smooth infinite effect
  useEffect(() => {
    if (!isHovered) {
      animationRef.current = requestAnimationFrame(function autoSlide() {
        setCurrentSlide(prev => {
          if (prev >= secondYearMembers.length * 2) {
            // Smooth transition back to middle
            return secondYearMembers.length;
          }
          return prev + 0.005; // Very small increment for ultra-smooth movement
        });
        animationRef.current = requestAnimationFrame(autoSlide);
      });
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext(); // Swipe left
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev(); // Swipe right
    }
  };

  // Calculate the translateX value for smooth infinite scrolling
  const getTranslateX = () => {
    const itemWidth = 100 / visibleCards;
    const middleSectionStart = secondYearMembers.length;
    const middleSectionEnd = secondYearMembers.length * 2;
    
    if (currentSlide >= middleSectionEnd) {
      // When we reach the end of cloned items, jump to middle section
      return `-${middleSectionStart * itemWidth}%`;
    }
    return `-${currentSlide * itemWidth}%`;
  };

  return (
    <div className="relative w-full py-8 bg-gray-100">
      

      <div 
        className="relative max-w-4xl mx-auto px-2 sm:px-4"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="text-xl sm:text-2xl font-bold text-gray-600 hover:text-gray-800 z-10 p-1 sm:p-2"
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div className="flex-1 overflow-hidden mx-1 sm:mx-2">
            <div
              className="flex transition-transform duration-300 ease-linear"
              style={{ 
                transform: `translateX(${getTranslateX()})`,
                width: `${(clonedMembers.length * 100) / visibleCards}%`
              }}
            >
              {clonedMembers.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="px-1 sm:px-2"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={member.image}
                        alt={member.Name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xs sm:text-sm font-medium text-center line-clamp-1">
                      {member.Name}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                      {member.Branch}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {member.Year}
                    </p>
                    {member.linkedin !== 'NA' && member.linkedin !== 'Not made till date' && (
                      <a
                        href={
                          member.linkedin.startsWith('http')
                            ? member.linkedin
                            : `https://www.linkedin.com/in/${member.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-blue-500 hover:text-blue-700"
                      >
                        <FaLinkedin className="text-sm sm:text-base" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="text-xl sm:text-2xl font-bold text-gray-600 hover:text-gray-800 z-10 p-1 sm:p-2"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondYearCarousel;