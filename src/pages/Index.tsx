import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MarqueeBanner from "../components/MarqueeBanner";
import EducationalBackground from "../components/EducationalBackground";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import Accomplishments from "../components/Accomplishments";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "ARIJIT ROY | Full Stack Developer";

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const element = document.getElementById(href.slice(1));
          if (element) {
            const offset = 80;
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <EducationalBackground />
      <Skills />
      {/* <WorkExperience /> */}
      <Accomplishments />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;