import React, { useState, useEffect } from 'react';
import secondYearMembers from './SecondYear.json';
import { FaLinkedin } from 'react-icons/fa';

const SecondYearCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? secondYearMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === secondYearMembers.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleCards = () => {
    const total = secondYearMembers.length;
    const cards = [];
    for (let i = 0; i < 4; i++) {
      cards.push(secondYearMembers[(currentSlide + i) % total]);
    }
    return cards;
  };

  return (
    <div className="relative w-full py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Second Year Members</h1>

      <div className="relative max-w-7xl mx-auto flex justify-between items-center px-6">
        <button
          onClick={handlePrev}
          className="text-3xl font-bold text-gray-600 hover:text-gray-800"
        >
          &#8592;
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mx-4">
          {visibleCards().map((member) => (
            <div
              key={member.id}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center"
            >
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
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-3xl font-bold text-gray-600 hover:text-gray-800"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default SecondYearCarousel;
