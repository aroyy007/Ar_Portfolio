import { useEffect, useRef, useCallback } from "react";
import AcademiaConnect from "./AcademiaConnect.png";
import FloodGuard from "./FloodGuard.png";
import AirQuality from "./AirQuality.png";
import mlstudybuddy from "./mlstudybuddy.jpeg";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  image: string;
  hoverColor: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ML Study Buddy",
    description:
      "ML Study Buddy is a Retrieval-Augmented Generation (RAG) system designed to help students master machine learning concepts.",
    tech: ["RAG", "Python", "LLM", "PyTorch", "HuggingFace"],
    githubUrl: "https://github.com/aroyy007/ML_Study_Buddy",
    image: mlstudybuddy,
    hoverColor: "group-hover:text-neo-orange",
    featured: true,
  },
  {
    id: 2,
    title: "Air Quality Monitor",
    description:
      "Full-stack IoT + AI solution for real-time AQI tracking and prediction using Arduino sensors, Node.js, and HuggingFace ML models.",
    tech: ["Arduino", "Node.js", "React", "MongoDB", "HuggingFace"],
    githubUrl: "https://github.com/aroyy007/Air_Quality_Monitoring",
    image: AirQuality,
    hoverColor: "group-hover:text-neo-red",
  },
  {
    id: 3,
    title: "AcademiaConnect",
    description:
      "A comprehensive academic collaboration platform for students and faculty to share resources, manage courses, and communicate.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/aroyy007/AcademiaConnect",
    image: AcademiaConnect,
    hoverColor: "group-hover:text-neo-blue",
  },
  {
    id: 4,
    title: "FloodGuard Aid",
    description:
      "Emergency response platform for flood-affected areas with real-time mapping, resource coordination, and volunteer management.",
    tech: ["React", "Firebase", "Google Maps API", "Tailwind"],
    githubUrl: "https://github.com/aroyy007/FloodGuard_Aid_Network",
    image: FloodGuard,
    hoverColor: "group-hover:text-neo-pink",
  },
];

// 3D Tilt Card Component
const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-neo-yellow border-t-4 border-black px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          className="text-5xl md:text-7xl lg:text-9xl font-black mb-16 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
          style={{ WebkitTextStroke: "3px black" }}
        >
          Selected Works
        </h2>

        {/* Featured Project — full width */}
        {featuredProject && (
          <div className="reveal mb-12">
            <TiltCard className="group">
              <article className="bg-white border-4 border-black shadow-hard overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-neo-green text-black px-3 py-1 font-mono text-xs font-bold border-2 border-black shadow-hard-sm">
                      FEATURED
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3
                      className={`text-3xl md:text-4xl font-black uppercase mb-4 transition-colors glitch-hover ${featuredProject.hoverColor}`}
                    >
                      {featuredProject.title}
                    </h3>
                    <p className="font-mono text-sm mb-6 leading-relaxed">
                      {featuredProject.description}
                    </p>
                    <div className="flex gap-2 font-mono text-xs font-bold flex-wrap mb-8">
                      {featuredProject.tech.map((t) => (
                        <span key={t} className="neo-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      className="inline-flex items-center gap-2 w-fit bg-neo-green border-2 border-black px-4 py-2 font-bold shadow-hard-sm neo-hover"
                    >
                      View Project <i className="ri-arrow-right-up-line"></i>
                    </a>
                  </div>
                </div>
              </article>
            </TiltCard>
          </div>
        )}

        {/* Other Projects Grid — with 3D tilt + hover overlay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className="reveal ag-float"
              style={
                { "--float-delay": `${index * 0.5}s` } as React.CSSProperties
              }
            >
              <TiltCard className="group h-full">
                <article className="bg-white border-4 border-black shadow-hard overflow-hidden h-full flex flex-col relative">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden border-b-4 border-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-neo-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 text-center z-10">
                    <h3 className="text-2xl font-black uppercase mb-3 text-neo-yellow">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-white/60 mb-4 max-w-xs">
                      {project.description}
                    </p>
                    <div className="flex gap-2 font-mono text-xs font-bold flex-wrap justify-center mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-neo-yellow text-black px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      className="bg-neo-green text-black border-2 border-black px-6 py-2 font-bold shadow-hard-sm neo-hover"
                    >
                      View →
                    </a>
                  </div>

                  {/* Content (visible when not hovered) */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className={`text-xl md:text-2xl font-black uppercase mb-2 transition-colors glitch-hover ${project.hoverColor}`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex gap-2 font-mono text-xs font-bold flex-wrap mt-auto pt-3">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="neo-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-24">
          <a
            href="https://github.com/aroyy007?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-block bg-neo-black text-white px-8 md:px-12 py-4 md:py-5 font-bold font-mono text-lg md:text-xl hover:bg-neo-white hover:text-black border-4 border-black transition-all shadow-hard hover:shadow-none"
          >
            VIEW ALL REPOS ON GITHUB
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;