
import { useEffect, useRef } from "react";
import { Avatar } from "./ui/avatar";

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
    <section id="hero" className="min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 text-left">
            <div className="text-portfolio-neon-blue font-medium mb-3 transition-all duration-700 opacity-0 -translate-y-8" ref={subheadingRef}>
              <p>Hi, my name is</p>
            </div>
            
            <h1 
              ref={headingRef}
              className="text-5xl md:text-7xl font-bold font-montserrat mb-4 tracking-tighter transition-all duration-700 opacity-0 -translate-y-8"
            >
              <span className="gradient-text">Arijit Roy</span>
              <span className="text-white">.</span>
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-400 mb-6 transition-all duration-700 opacity-0 -translate-y-8" ref={bioRef}>
              Full Stack Developer
            </h2>

            <p 
              ref={bioRef}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 transition-all duration-700 opacity-0 -translate-y-8"
            >
              I build real-world, impactful tech — from disaster response platforms to AI-powered monitoring systems.
            </p>

            <div 
              ref={ctaRef}
              className="transition-all duration-700 opacity-0 -translate-y-8"
            >
              <a 
                href="#projects" 
                className="neon-button inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({behavior: "smooth"});
                  }
                }}
              >
                Explore My Work
              </a>
            </div>
          </div>
          
          {/* Right side - Image with animation */}
          <div 
            ref={imageRef} 
            className="w-full md:w-1/2 flex justify-center items-center transition-all duration-700 opacity-0 scale-95"
          >
            <div className="relative">
              <div className="profile-image-container">
                <div className="profile-image-border"></div>
                <div className="profile-image rounded-full overflow-hidden h-72 w-72 md:h-96 md:w-96">
                  {/* Placeholder image - you can replace this with your actual image */}
                  <img 
                    src="/placeholder.svg" 
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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6 text-portfolio-purple-light"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
