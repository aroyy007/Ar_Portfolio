import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "../hooks/use-mobile";

const navItems = [
  { id: "hero", label: "/HOME" },
  { id: "about", label: "/ABOUT" },
  { id: "skills", label: "/SKILLS" },
  { id: "experience", label: "/LOGS" },
  { id: "projects", label: "/WORK" },
  { id: "contact", label: "CONTACT" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="bg-neo-white border-2 border-black px-4 py-1 text-xl md:text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all neo-hover"
          >
            ARIJIT.exe
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1 bg-white border-2 border-black p-2 shadow-hard">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-3 py-1 font-mono font-bold text-sm transition-colors",
                  item.id === "contact"
                    ? "bg-neo-yellow border border-black hover:bg-neo-pink"
                    : activeSection === item.id
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-neo-white border-2 border-black p-2 shadow-hard-sm"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn("block h-0.5 bg-black transition-transform", mobileMenuOpen && "rotate-45 translate-y-2")} />
              <span className={cn("block h-0.5 bg-black transition-opacity", mobileMenuOpen && "opacity-0")} />
              <span className={cn("block h-0.5 bg-black transition-transform", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div
        ref={menuRef}
        className={cn(
          "mobile-menu-content",
          mobileMenuOpen ? "open" : "closed"
        )}
      >
        <div className="p-6 pt-20">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "block w-full text-left px-4 py-3 font-mono font-bold text-lg border-2 border-black transition-all",
                  activeSection === item.id
                    ? "bg-neo-yellow text-black"
                    : "bg-white hover:bg-neo-yellow"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <ProgressBar />
    </>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-2 bg-neo-green z-[60] border-b-2 border-black"
      style={{ width: `${progress}%` }}
    />
  );
};

export default Navbar;