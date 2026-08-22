"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Mail,
  UserRound,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export function TestimonialCarousel({ members = [], className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = useMemo(
    () =>
      members.map((member) => ({
        id: member._id || member.email || member.name,
        name: member.name,
        title: member.designation,
        description: member.post,
        imageUrl: member.image,
        email: member.email,
        linkedinUrl: member.linkedin,
        ieeeProfileUrl: member.ieeeProfile,
      })),
    [members]
  );

  if (!testimonials.length) {
    return null;
  }

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial =
    testimonials[currentIndex] || testimonials[testimonials.length - 1];

  const socialIcons = [
    currentTestimonial.email && {
      icon: Mail,
      url: `mailto:${currentTestimonial.email}`,
      label: "Email",
      external: false,
    },
    currentTestimonial.linkedinUrl && {
      icon: Linkedin,
      url: currentTestimonial.linkedinUrl,
      label: "LinkedIn",
      external: true,
    },
    currentTestimonial.ieeeProfileUrl && {
      icon: UserRound,
      url: currentTestimonial.ieeeProfileUrl,
      label: "IEEE Profile",
      external: true,
    },
  ].filter(Boolean);

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <div className="hidden md:flex relative items-center">
        <div className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-ieee-blue mb-2">
                  {currentTestimonial.name}
                </h2>

                <p className="text-sm font-medium text-ieee-red">
                  {currentTestimonial.title}
                </p>
              </div>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                {currentTestimonial.description}
              </p>

              <div className="flex space-x-4">
                {socialIcons.map(({ icon: IconComponent, url, label, external }) => (
                  <a
                    key={label}
                    href={url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center transition-colors hover:bg-ieee-blue hover:scale-105 cursor-pointer"
                    aria-label={label}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
        <div className="w-full aspect-square bg-gray-200 rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold text-ieee-blue mb-2">
                {currentTestimonial.name}
              </h2>

              <p className="text-sm font-medium text-ieee-red mb-4">
                {currentTestimonial.title}
              </p>

              <p className="text-gray-800 text-sm leading-relaxed mb-6">
                {currentTestimonial.description}
              </p>

              <div className="flex justify-center space-x-4">
                {socialIcons.map(({ icon: IconComponent, url, label, external }) => (
                  <a
                    key={label}
                    href={url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center transition-colors hover:bg-ieee-blue cursor-pointer"
                    aria-label={label}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={handlePrevious}
            aria-label="Previous executive committee member"
            className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((testimonial, testimonialIndex) => (
              <button
                key={testimonial.id || testimonialIndex}
                onClick={() => setCurrentIndex(testimonialIndex)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors cursor-pointer",
                  testimonialIndex === currentIndex ? "bg-ieee-blue" : "bg-gray-400"
                )}
                aria-label={`Go to executive committee member ${
                  testimonialIndex + 1
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next executive committee member"
            className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}
