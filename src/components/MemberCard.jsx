import React, { useState, useEffect, useRef } from 'react';
import secondYearMembers from './SecondYear.json';
import { FaLinkedin } from 'react-icons/fa';

const SecondYearCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoDirection, setAutoDirection] = useState('next');
  const [isHovered, setIsHovered] = useState(false);
  const currentSlideRef = useRef(currentSlide);
  const autoDirectionRef = useRef(autoDirection);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    autoDirectionRef.current = autoDirection;
  }, [autoDirection]);

  const handlePrev = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? secondYearMembers.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => 
      prev === secondYearMembers.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        const current = currentSlideRef.current;
        const direction = autoDirectionRef.current;

        if (direction === 'next') {
          if (current < secondYearMembers.length - 1) {
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
  }, [isHovered]);

  return (
    <div className="relative w-full py-10 bg-gray-100">
      {/* <h1 className="text-3xl font-bold text-ieee-blue text-center mb-8">Executive Members</h1> */}

      <div 
        className="relative max-w-7xl mx-auto px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="text-3xl font-bold text-gray-600 hover:text-gray-800 z-10 p-2"
          >
            &#8592;
          </button>

          <div className="flex-1 overflow-hidden mx-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {secondYearMembers.map((member) => (
                <div
                  key={member.id}
                  className="w-1/4 flex-shrink-0 p-2"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.Name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h2 className="text-lg font-semibold text-center">{member.Name}</h2>
                    <p className="text-sm text-gray-600">{member.Branch}</p>
                    <p className="text-sm text-gray-600">{member.Year}</p>
                    {member.linkedin !== 'NA' && member.linkedin !== 'Not made till date' && (
                      <a
                        href={
                          member.linkedin.startsWith('http')
                            ? member.linkedin
                            : `https://www.linkedin.com/in/${member.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-600 hover:text-blue-800"
                      >
                        <FaLinkedin size={22} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="text-3xl font-bold text-gray-600 hover:text-gray-800 z-10 p-2"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondYearCarousel;