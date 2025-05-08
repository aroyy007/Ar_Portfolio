
import { useEffect, useRef } from "react";

const ParallaxBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-portfolio-dark bg-gradient-to-br from-portfolio-dark via-portfolio-dark-deeper to-portfolio-dark-lighter opacity-80"></div>
      
      {/* Animated grid elements */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Purple circle blur */}
        <div className="absolute top-[20%] left-[20%] w-64 h-64 rounded-full bg-portfolio-purple/20 blur-[100px]"></div>
        
        {/* Blue circle blur */}
        <div className="absolute top-[60%] right-[20%] w-80 h-80 rounded-full bg-portfolio-blue/20 blur-[100px]"></div>
        
        {/* Neon pink smaller blur */}
        <div className="absolute bottom-[30%] left-[30%] w-40 h-40 rounded-full bg-portfolio-neon-pink/20 blur-[80px]"></div>
        
        {/* Grid lines - horizontal */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={`h-${index}`}
              className="absolute w-full h-px bg-white" 
              style={{ top: `${index * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Grid lines - vertical */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={`v-${index}`}
              className="absolute h-full w-px bg-white" 
              style={{ left: `${index * 10}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
