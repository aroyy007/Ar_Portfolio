
import * as React from "react";

// Define breakpoints matching tailwind config
const BREAKPOINTS = {
  xs: 375,  // Medium phones
  sm: 640,  // Default Tailwind sm
  md: 768,  // Tablets 
  lg: 1024, // Small laptops
  xl: 1280, // Default Tailwind xl
  "2xl": 1536, // Default Tailwind 2xl
  "3xl": 1920, // Full HD screens
};

type Breakpoint = keyof typeof BREAKPOINTS;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md);
    };
    
    handleResize(); // Set initial value
    
    // Modern way to add event listener to MediaQueryList
    mql.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);
    
    return () => {
      mql.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !!isMobile;
}

export function useBreakpoint(breakpoint: Breakpoint) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Check if the window object is available (for SSR compatibility)
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
    
    const handleChange = () => {
      setMatches(mql.matches);
    };
    
    // Set initial value
    handleChange();
    
    // Use the modern approach
    mql.addEventListener("change", handleChange);
    
    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return matches;
}
