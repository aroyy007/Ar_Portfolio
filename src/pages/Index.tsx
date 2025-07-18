
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WorkExperience from "../components/WorkExperience";
import EducationalBackground from "../components/EducationalBackground";
import Projects from "../components/Projects";
import Accomplishments from "../components/Accomplishments";
import Skills from "../components/Skills";
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

    // Add viewport meta tag to ensure proper mobile display
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <EducationalBackground />
        {/* <WorkExperience /> */}
        <Projects />
        <Accomplishments />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default Index;