
import { useRef, useEffect } from "react";

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    icon: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: "⚡" },
      { name: "Python", icon: "🐍" },
      { name: "C++", icon: "🔥" },
      { name: "HTML/CSS", icon: "🌐" },
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "TailwindCSS", icon: "🌊" },
      { name: "Redux", icon: "🔄" },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "📦" },
      { name: "Express", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Firebase", icon: "🔥" },
    ]
  },
  {
    name: "IoT & Hardware",
    skills: [
      { name: "Arduino", icon: "🤖" },
      { name: "Raspberry Pi", icon: "🥧" },
      { name: "Sensors", icon: "📡" },
    ]
  },
  {
    name: "AI & ML",
    skills: [
      { name: "HuggingFace", icon: "🤗" },
      { name: "TensorFlow", icon: "📊" },
      { name: "Data Analysis", icon: "📈" },
    ]
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "🔄" },
      { name: "VS Code", icon: "📝" },
      { name: "Figma", icon: "🎨" },
    ]
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up", "opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    categoryRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      categoryRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="skills" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="section-heading">Technical Skills</h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-12">
          The technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            ref={(el) => (categoryRefs.current[index] = el)}
            className="glass rounded-lg p-6 opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <h3 className="text-xl font-semibold text-portfolio-purple-light mb-4">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center p-2 bg-portfolio-dark-deeper/50 rounded-lg transition-all duration-300 hover:bg-portfolio-dark-deeper hover:neon-shadow"
                >
                  <div className="text-2xl mr-3 animate-float">{skill.icon}</div>
                  <span className="text-gray-200">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
