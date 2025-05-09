
import { useEffect, useRef, useState } from "react";

const ParallaxBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      // Update mouse position for glow effect
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Parallax effect
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      
      // Set hovering state
      setIsHovering(true);
      
      // Reset hover state after mouse stops moving
      const timeout = setTimeout(() => {
        setIsHovering(false);
      }, 1500);
      
      return () => clearTimeout(timeout);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background - Made darker */}
      <div className="absolute inset-0 bg-black bg-gradient-to-br from-black via-portfolio-dark-deeper to-portfolio-dark opacity-90"></div>
      
      {/* Mouse glow effect */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-700"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(155, 135, 245, 0.15) 0%, rgba(155, 135, 245, 0.05) 40%, transparent 70%)',
          opacity: isHovering ? 1 : 0,
          boxShadow: '0 0 60px 20px rgba(155, 135, 245, 0.1)',
          filter: 'blur(10px)',
        }}
      ></div>
      
      {/* Animated grid elements */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Purple circle blur */}
        <div className="absolute top-[20%] left-[20%] w-64 h-64 rounded-full bg-portfolio-purple/15 blur-[100px]"></div>
        
        {/* Blue circle blur */}
        <div className="absolute top-[60%] right-[20%] w-80 h-80 rounded-full bg-portfolio-blue/15 blur-[100px]"></div>
        
        {/* Neon pink smaller blur */}
        <div className="absolute bottom-[30%] left-[30%] w-40 h-40 rounded-full bg-portfolio-neon-pink/15 blur-[80px]"></div>
        
        {/* Grid lines - horizontal */}
        <div className="absolute inset-0 opacity-[0.02]">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={`h-${index}`}
              className="absolute w-full h-px bg-white" 
              style={{ top: `${index * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Grid lines - vertical */}
        <div className="absolute inset-0 opacity-[0.02]">
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
