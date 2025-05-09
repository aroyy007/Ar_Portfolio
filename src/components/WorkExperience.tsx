
import { useEffect, useState, useRef } from "react";

interface ExperienceItem {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    date: "May 2025 - Aug 2025",
    title: "Software Engineering Intern",
    company: "Future Tech Inc.",
    description: "Will be working on developing and optimizing cloud-based solutions using React, Node.js, and AWS."
  },
  {
    id: 2,
    date: "Jan 2025 - Apr 2025",
    title: "Research Assistant",
    company: "University AI Lab",
    description: "Will be conducting research on AI algorithms for IoT data processing and real-time analysis."
  },
  {
    id: 3,
    date: "Jun 2024 - Dec 2024",
    title: "Web Developer",
    company: "Local Tech Startup",
    description: "Building responsive web applications and implementing user authentication systems."
  }
];

const WorkExperience = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineItems = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    timelineItems.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      timelineItems.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="experience" className="section-container py-16">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-8">
        <h2 className="section-heading">Work Experience</h2>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-portfolio-purple-light/30"></div>

        {/* Timeline items */}
        <div className="relative z-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (timelineItems.current[index] = el)}
              className={`flex flex-col md:flex-row md:items-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveItem(exp.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {/* Timeline node */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-portfolio-purple-light border-4 border-portfolio-dark-deeper transition-all duration-300">
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                    activeItem === exp.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 0 15px 5px rgba(155, 135, 245, 0.7)',
                  }}
                ></div>
              </div>

              {/* Content */}
              <div
                className={`md:w-[45%] pl-8 md:pl-0 ${
                  index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                }`}
              >
                <div
                  className={`glass p-6 rounded-lg hover-card ${
                    activeItem === exp.id ? 'neon-shadow' : ''
                  }`}
                >
                  <div className="text-portfolio-purple-light font-medium mb-2">
                    {exp.date}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-lg text-gray-300 mb-3">{exp.company}</div>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
