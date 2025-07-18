import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  { name: "JavaScript", icon: "/js.png", category: "Programming" },
  { name: "Python", icon: "/python.png", category: "Programming" },
  { name: "C++", icon: "/c++.png", category: "Programming" },
  { name: "HTML/CSS", icon: "/html.png", category: "Programming" },
  { name: "React", icon: "/react.png", category: "Frontend" },
  { name: "TailwindCSS", icon: "/tailwind.png", category: "Frontend" },
  { name: "Redux", icon: "/redux.png", category: "Frontend" },
  { name: "Node.js", icon: "/nodejs.png", category: "Backend" },
  { name: "Express", icon: "/expressjs.jpg", category: "Backend" },
  { name: "MongoDB", icon: "/mongodb.png", category: "Backend" },
  { name: "Firebase", icon: "🔥", category: "Backend" },
  { name: "Arduino", icon: "🤖", category: "IoT" },
  { name: "Raspberry Pi", icon: "🥧", category: "IoT" },
  { name: "Sensors", icon: "📡", category: "IoT" },
  { name: "HuggingFace", icon: "🤗", category: "AI" },
  { name: "TensorFlow", icon: "📊", category: "AI" },
  { name: "Data Analysis", icon: "📈", category: "AI" },
  { name: "Git", icon: "🔄", category: "Tools" },
  { name: "VS Code", icon: "📝", category: "Tools" },
  { name: "Figma", icon: "🎨", category: "Tools" },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-left");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Duplicate skills array for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="section-container overflow-hidden">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 sm:mb-8">
        <h2 className="section-heading">Technical Skills</h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 text-center lg:text-left">
          The technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left">
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="glass rounded-lg p-3 sm:p-4 md:p-5 hover:neon-shadow hover:scale-105 group flex-shrink-0 mx-2 sm:mx-3"
              style={{ 
                minWidth: isMobile ? '140px' : '160px'
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon.startsWith("/") ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl md:text-4xl">{skill.icon}</span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-portfolio-purple-light opacity-80">
                  {skill.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;