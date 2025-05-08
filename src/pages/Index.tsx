
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WorkExperience from "../components/WorkExperience";
import Projects from "../components/Projects";
import Accomplishments from "../components/Accomplishments";
import Teaching from "../components/Teaching";
import Publications from "../components/Publications";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import ParallaxBackground from "../components/ParallaxBackground";

const Index = () => {
  useEffect(() => {
    // Update the page title
    document.title = "Arijit Roy | Portfolio";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Arijit Roy - Full Stack Developer, IoT & AI Enthusiast, ICPC Regionalist');
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <WorkExperience />
        <Projects />
        <Accomplishments />
        <Teaching />
        <Publications />
        <Skills />
        <Blog />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
