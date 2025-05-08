
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold font-montserrat mb-3 tracking-tighter transition-all duration-700 opacity-0 -translate-y-8"
        >
          <span className="gradient-text">Arijit Roy</span>
        </h1>

        <div 
          ref={subheadingRef}
          className="mb-6 transition-all duration-700 delay-100 opacity-0 -translate-y-8"
        >
          <h2 className="text-xl md:text-2xl text-portfolio-purple-light font-medium font-poppins">
            Full Stack Developer | IoT &amp; AI Enthusiast | ICPC Regionalist '24
          </h2>
        </div>

        <p 
          ref={bioRef}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 opacity-0 -translate-y-8"
        >
          I build real-world, impactful tech — from disaster response platforms to AI-powered monitoring systems.
        </p>

        <div 
          ref={ctaRef}
          className="transition-all duration-700 delay-300 opacity-0 -translate-y-8"
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
