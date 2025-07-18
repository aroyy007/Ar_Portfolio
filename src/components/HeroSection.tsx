
import { useEffect, useRef } from "react";
import { Avatar } from "./ui/avatar";
import { useIsMobile } from "../hooks/use-mobile";
import bgimage from "./bgphoto.png";
import cv from "./Arijit_Roy_CV.pdf";

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Animation sequence for hero elements
    const timer1 = setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.classList.add("opacity-100");
        headingRef.current.classList.remove("opacity-0", "-translate-y-8");
      }
    }, 100);

    const timer2 = setTimeout(() => {
      if (subheadingRef.current) {
        subheadingRef.current.classList.add("opacity-100");
        subheadingRef.current.classList.remove("opacity-0", "-translate-y-8");
      }
    }, 300);

    const timer3 = setTimeout(() => {
      if (bioRef.current) {
        bioRef.current.classList.add("opacity-100");
        bioRef.current.classList.remove("opacity-0", "-translate-y-8");
      }
    }, 500);

    const timer4 = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.classList.add("opacity-100");
        ctaRef.current.classList.remove("opacity-0", "-translate-y-8");
      }
    }, 700);
    
    const timer5 = setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.classList.add("opacity-100");
        imageRef.current.classList.remove("opacity-0", "scale-95");
      }
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col justify-center pb-6 sm:pb-8 lg:pb-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <div className="text-portfolio-neon-blue font-medium mb-2 sm:mb-3 transition-all duration-700 opacity-0 -translate-y-8 text-sm sm:text-base" ref={subheadingRef}>
              <p>Hi, my name is</p>
            </div>
            
            <h1 
              ref={headingRef}
              className="responsive-text-4xl font-bold font-montserrat mb-2 sm:mb-3 lg:mb-4 tracking-tighter transition-all duration-700 opacity-0 -translate-y-8"
            >
              <span className="gradient-text">Arijit Roy</span>
              <span className="text-white">.</span>
            </h1>

            <h2 className="responsive-text-2xl font-bold text-gray-400 mb-3 sm:mb-4 lg:mb-6 transition-all duration-700 opacity-0 -translate-y-8" ref={bioRef}>
              Full Stack Developer
            </h2>

            <p 
              ref={bioRef}
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-4 sm:mb-6 lg:mb-8 xl:mb-10 transition-all duration-700 opacity-0 -translate-y-8 leading-relaxed"
            >
              I build real-world, impactful tech — from disaster response platforms to AI-powered monitoring systems.
            </p>

            <div 
              ref={ctaRef}
              className="transition-all duration-700 opacity-0 -translate-y-8"
            >
              <a 
                href={cv} 
                className="neon-button inline-block"
                download
              >
                Download My CV
              </a>
            </div>
          </div>
          
          {/* Right side - Image with animation */}
          <div 
            ref={imageRef} 
            className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 transition-all duration-700 opacity-0 scale-95"
          >
            <div className="relative">
              <div className="profile-image-container">
                <div className="profile-image-border"></div>
                <div className="profile-image rounded-full overflow-hidden h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72 2xl:h-96 2xl:w-96">
                  <img 
                    src={bgimage} 
                    alt="Arijit Roy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 sm:w-6 sm:h-6 text-portfolio-purple-light"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;