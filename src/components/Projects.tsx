import { useEffect, useRef } from "react";
import AcademiaConnect from "./AcademiaConnect.png";
import FloodGuard from "./FloodGuard.png";
import AirQuality from "./AirQuality.png";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  image: string;
  hoverColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Air Quality Monitor",
    description:
      "Full-stack IoT + AI solution for real-time AQI tracking and prediction using Arduino sensors, Node.js, and HuggingFace ML models.",
    tech: ["Arduino", "Node.js", "React", "MongoDB", "HuggingFace"],
    githubUrl: "https://github.com/aroyy007/Air_Quality_Monitoring",
    image: AirQuality,
    hoverColor: "group-hover:text-neo-red",
  },
  {
    id: 2,
    title: "AcademiaConnect",
    description:
      "A comprehensive academic collaboration platform for students and faculty to share resources, manage courses, and communicate.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/aroyy007/AcademiaConnect",
    image: AcademiaConnect,
    hoverColor: "group-hover:text-neo-blue",
  },
  {
    id: 3,
    title: "FloodGuard Aid",
    description:
      "Emergency response platform for flood-affected areas with real-time mapping, resource coordination, and volunteer management.",
    tech: ["React", "Firebase", "Google Maps API", "Tailwind"],
    githubUrl: "https://github.com/aroyy007/FloodGuard_Aid_Network",
    image: FloodGuard,
    hoverColor: "group-hover:text-neo-pink",
  },
];

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`reveal group bg-white border-4 border-black p-4 shadow-hard ${index % 2 === 1 ? "md:mt-20" : ""
                }`}
            >
              {/* Image */}
              <div className="bg-black border-2 border-black aspect-video relative overflow-hidden mb-6 group-hover:shadow-none transition-all">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Content */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h3
                    className={`text-2xl md:text-4xl font-black uppercase mb-2 transition-colors glitch-hover ${project.hoverColor}`}
                  >
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm mb-4 max-w-xs">
                    {project.description}
                  </p>
                  <div className="flex gap-2 font-mono text-xs font-bold flex-wrap">
                    {project.tech.map((t) => (
                      <span key={t} className="neo-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Link */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black bg-neo-green flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-hard-sm flex-shrink-0"
                >
                  <i className="ri-arrow-right-up-line text-2xl"></i>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-24">
          <a
            href="https://github.com/aroyy007?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
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