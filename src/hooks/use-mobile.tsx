
import * as React from "react";

// Define breakpoints matching tailwind config
const BREAKPOINTS = {
  xs: 320,   // Small phones
  sm: 375,   // Medium phones  
  md: 425,   // Large phones
  lg: 768,   // Tablets
  xl: 1024,  // Small laptops
  "2xl": 1440, // Large desktops
  "3xl": 1920, // Full HD screens
};

type Breakpoint = keyof typeof BREAKPOINTS;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.lg);
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

// Additional utility hooks for common breakpoint checks
export function useIsTablet() {
  const isTablet = useBreakpoint('lg');
  const isDesktop = useBreakpoint('xl');
  return isTablet && !isDesktop;
}

export function useIsDesktop() {
  return useBreakpoint('xl');
}

export function useIsSmallPhone() {
  const [isSmallPhone, setIsSmallPhone] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.sm - 1}px)`);
    
    const handleResize = () => {
      setIsSmallPhone(window.innerWidth < BREAKPOINTS.sm);
    };
    
    handleResize();
    
    mql.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);
    
    return () => {
      mql.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !!isSmallPhone;
}