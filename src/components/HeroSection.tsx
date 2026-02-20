import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import cv from "./Arijit_Roy_CV.pdf";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const refs = [badgeRef, headingRef, subtitleRef, ctaRef];
    refs.forEach((ref, i) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current?.classList.add("active");
        }, 200 + i * 200);
      }
    });
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden border-b-4 border-black"
    >
      {/* Decorative Shapes */}
      {!isMobile && (
        <>
          <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-black shadow-hard animate-bounce rotate-12" />
          <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-pink rounded-full border-4 border-black shadow-hard animate-pulse" />
        </>
      )}
      <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none hidden md:block">
        CODE
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Status Badge */}
        <div ref={badgeRef} className="reveal inline-block bg-neo-white border-2 border-black px-4 py-1 mb-6 shadow-hard rotate-[-2deg]">
          <span className="font-mono font-bold text-neo-green bg-black px-2 mr-2">●</span>
          <span className="font-mono font-bold text-sm">SYSTEM STATUS: ONLINE</span>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="reveal text-[15vw] md:text-[10vw] leading-[0.8] font-black uppercase tracking-tighter mb-6"
        >
          FULL STACK<br />
          <span
            className="text-neo-white"
            style={{ WebkitTextStroke: isMobile ? "2px black" : "3px black" }}
          >
            DEVELOPER
          </span>
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="reveal font-mono text-base md:text-2xl max-w-2xl mx-auto mb-10 bg-neo-yellow border-2 border-black p-4 shadow-hard rotate-1"
        >
          I build real-world, impactful tech solutions. <br />
          <b>React • Node.js • Python • IoT & AI</b>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="reveal flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <button
            onClick={scrollToProjects}
            className="bg-black text-white border-2 border-black px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold shadow-hard neo-hover"
          >
            VIEW DATABASE
          </button>
          <a
            href={cv}
            download
            className="bg-neo-white text-black border-2 border-black px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold shadow-hard neo-hover flex items-center justify-center gap-2"
          >
            <i className="ri-download-line"></i> DOWNLOAD CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;