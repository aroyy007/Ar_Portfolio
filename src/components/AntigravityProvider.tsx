import { useEffect, useRef, useCallback, createContext, useContext, type ReactNode } from "react";

interface AntigravityContextType {
  registerMagnetic: (el: HTMLElement) => void;
  unregisterMagnetic: (el: HTMLElement) => void;
}

const AntigravityContext = createContext<AntigravityContextType>({
  registerMagnetic: () => {},
  unregisterMagnetic: () => {},
});

export const useAntigravity = () => useContext(AntigravityContext);

const AntigravityProvider = ({ children }: { children: ReactNode }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const magneticEls = useRef<Set<HTMLElement>>(new Set());
  const rafRef = useRef<number>(0);

  const registerMagnetic = useCallback((el: HTMLElement) => { magneticEls.current.add(el); }, []);
  const unregisterMagnetic = useCallback((el: HTMLElement) => { magneticEls.current.delete(el); }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // Check hover on interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-magnetic], input, textarea, select");
      if (isInteractive) {
        ring.classList.add("expanded");
      } else {
        ring.classList.remove("expanded");
      }

      // Magnetic effect
      magneticEls.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          const strength = 0.3;
          const maxDisp = 12;
          const pull = Math.min((1 - dist / 80) * maxDisp, maxDisp) * strength;
          const angle = Math.atan2(dy, dx);
          el.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
        } else {
          el.style.transform = "";
        }
      });
    };

    // Ring lerp animation
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animateRing);
    };



    // Scroll reveal with child stagger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Stagger children
            const children = entry.target.querySelectorAll(".reveal-child");
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 60}ms`;
              child.classList.add("active");
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all .reveal elements
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Mouse parallax
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    const onMouseMoveParallax = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      parallaxEls.forEach((el) => {
        const depth = parseInt((el as HTMLElement).dataset.parallax || "1");
        const factor = depth * 8;
        const x = ((e.clientX - cx) / cx) * factor;
        const y = ((e.clientY - cy) / cy) * factor;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousemove", onMouseMoveParallax);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", onMouseMoveParallax);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <AntigravityContext.Provider value={{ registerMagnetic, unregisterMagnetic }}>
      {children}
      {!isTouch && (
        <>
          <div ref={dotRef} className="ag-cursor-dot" />
          <div ref={ringRef} className="ag-cursor-ring" />
        </>
      )}
    </AntigravityContext.Provider>
  );
};

export default AntigravityProvider;
