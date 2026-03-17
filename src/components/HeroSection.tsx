import { useEffect, useRef, useState, useMemo } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import cv from "./Arijit_Roy_CV.pdf";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [assembled, setAssembled] = useState(false);
  const [loadPhase, setLoadPhase] = useState(0);
  const isMobile = useIsMobile();

  const headlineText1 = "FULL STACK";
  const headlineText2 = "DEVELOPER";

  // Generate random offsets for each character
  const charOffsets = useMemo(() => {
    const all = (headlineText1 + headlineText2).split("");
    return all.map(() => ({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    }));
  }, []);

  // Page load sequence
  useEffect(() => {
    const t1 = setTimeout(() => setLoadPhase(1), 0);
    const t2 = setTimeout(() => setLoadPhase(2), 300);
    const t3 = setTimeout(() => setAssembled(true), 600);
    const t4 = setTimeout(() => setLoadPhase(3), 1500);
    const t5 = setTimeout(() => setLoadPhase(4), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const renderChars = (text: string, startIndex: number) => {
    return text.split("").map((char, i) => {
      const globalIndex = startIndex + i;
      const offset = charOffsets[globalIndex];
      return (
        <span
          key={globalIndex}
          className="char-wrapper inline-block"
          style={
            {
              "--char-x": `${offset.x}px`,
              "--char-y": `${offset.y}px`,
              transitionDelay: `${globalIndex * 80}ms`,
            } as React.CSSProperties
          }
          ref={(el) => {
            if (el && assembled) {
              requestAnimationFrame(() => el.classList.add("assembled"));
            }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

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
      {/* Geometric Orbit Shapes (neo-yellow at 15% opacity) */}
      {!isMobile && (
        <>
          {/* Circle 1 - large, slow */}
          <div
            className="orbit-shape w-64 h-64 rounded-full"
            style={{ top: "15%", left: "8%", "--orbit-duration": "25s" } as React.CSSProperties}
            data-parallax="1"
          />
          {/* Square 2 - medium, reverse */}
          <div
            className="orbit-shape reverse w-32 h-32"
            style={{ top: "20%", right: "12%", "--orbit-duration": "18s" } as React.CSSProperties}
            data-parallax="2"
          />
          {/* Circle 3 - small, fast */}
          <div
            className="orbit-shape w-20 h-20 rounded-full"
            style={{ bottom: "25%", left: "15%", "--orbit-duration": "12s" } as React.CSSProperties}
            data-parallax="3"
          />
          {/* Square 4 - tiny accent */}
          <div
            className="orbit-shape reverse w-12 h-12"
            style={{ bottom: "35%", right: "20%", "--orbit-duration": "30s" } as React.CSSProperties}
            data-parallax="1"
          />
        </>
      )}

      <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none hidden md:block">
        CODE
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Status Badge */}
        <div
          className={`inline-block bg-neo-white border-2 border-black px-4 py-1 mb-6 shadow-hard rotate-[-2deg] transition-all duration-700 ${
            loadPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-mono font-bold text-neo-green bg-black px-2 mr-2">●</span>
          <span className="font-mono font-bold text-sm">SYSTEM STATUS: ONLINE</span>
        </div>

        {/* Main Heading - Char Assembly */}
        <h1 className="text-[15vw] md:text-[10vw] leading-[0.8] font-black uppercase tracking-tighter mb-6">
          <span className="block">{renderChars(headlineText1, 0)}</span>
          <span
            className="block text-neo-white"
            style={{ WebkitTextStroke: isMobile ? "2px black" : "3px black" }}
          >
            {renderChars(headlineText2, headlineText1.length)}
          </span>
        </h1>

        {/* Subtitle */}
        <div
          className={`font-mono text-base md:text-2xl max-w-4xl mx-auto mb-10 bg-neo-yellow border-2 border-black p-4 shadow-hard rotate-1 transition-all duration-700 ${
            loadPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          I build real-world, impactful tech solutions with AI. <br />
          <b>React • Node.js • Python • ML & AI</b>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row justify-center gap-4 md:gap-6 transition-all duration-700 ${
            loadPhase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={scrollToProjects}
            data-magnetic
            className="bg-black text-white border-2 border-black px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold shadow-hard neo-hover"
          >
            VIEW DATABASE
          </button>
          <a
            href={cv}
            download
            data-magnetic
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