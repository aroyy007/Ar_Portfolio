import { useState, useRef, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Air Quality Monitoring System",
    description: "Full-stack IoT + AI solution for real-time AQI tracking and prediction",
    tech: ["Arduino", "Node.js", "React", "MongoDB", "HuggingFace"],
    githubUrl: "https://github.com/aroyy007",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 2,
    title: "AcademiaConnect",
    description: "Central academic portal with role-based access for notes and assignments",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/aroyy007/AcademiaConnect",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 3,
    title: "FloodGuard Aid Network",
    description: "Emergency communication platform for flood relief",
    tech: ["React", "Firebase", "Google Maps API"],
    githubUrl: "https://github.com/aroyy007/FloodGuard_Aid_Network",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    projectRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      projectRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="projects" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-8">
        <h2 className="section-heading mb-8 xs:mb-10 sm:mb-12">Projects</h2>
      </div>

      <div className="responsive-grid-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className="glass rounded-xl overflow-hidden hover-card opacity-0 translate-y-12 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="h-36 xs:h-40 sm:h-44 md:h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <h3 className="text-lg xs:text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm xs:text-base text-gray-300 mb-3 xs:mb-4">{project.description}</p>
              <div className="mb-4 xs:mb-5">
                <h4 className="text-xs xs:text-sm text-portfolio-purple-light mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1 xs:gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-portfolio-dark-lighter px-2 py-1 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-purple-light flex items-center hover:text-portfolio-purple transition-colors text-sm xs:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
