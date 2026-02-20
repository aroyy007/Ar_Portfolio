import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  category: string;
  hoverColor: string;
}

const skills: Skill[] = [
  { name: "REACT", category: "LIBRARY", hoverColor: "hover:bg-white" },
  { name: "NODE.JS", category: "BACKEND", hoverColor: "hover:bg-neo-green" },
  { name: "PYTHON", category: "LANGUAGE", hoverColor: "hover:bg-neo-blue" },
  { name: "JAVASCRIPT", category: "LANGUAGE", hoverColor: "hover:bg-neo-yellow" },
  { name: "C++", category: "LANGUAGE", hoverColor: "hover:bg-neo-purple" },
  { name: "MONGODB", category: "DATABASE", hoverColor: "hover:bg-neo-green" },
  { name: "TAILWIND", category: "STYLING", hoverColor: "hover:bg-neo-pink" },
  { name: "FIREBASE", category: "BACKEND", hoverColor: "hover:bg-neo-orange" },
  { name: "EXPRESS", category: "FRAMEWORK", hoverColor: "hover:bg-neo-yellow" },
  { name: "REDUX", category: "STATE", hoverColor: "hover:bg-neo-purple" },
  { name: "GIT", category: "VERSION", hoverColor: "hover:bg-white" },
  { name: "TENSORFLOW", category: "AI/ML", hoverColor: "hover:bg-neo-orange" },
];

const Skills = () => {
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
      id="skills"
      ref={sectionRef}
      className="py-12 bg-neo-black text-neo-white border-y-4 border-black relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-4 border-white pb-4">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase text-white tracking-tighter">
            TECH<span className="text-neo-green">_STACK</span>
          </h2>
          <div className="flex items-center gap-2 mt-2 md:mt-0 mb-2 md:mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="font-mono text-neo-green text-sm font-bold">/// SYSTEM_OPTIMIZED</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="reveal flex flex-wrap justify-center md:justify-start">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] h-24 border-r-2 border-b-2 border-white/20 bg-neo-black ${skill.hoverColor} transition-all duration-0 hover:z-10 relative flex flex-col items-center justify-center p-2`}
            >
              <div className="text-neo-green group-hover:text-black font-mono text-xs mb-1 opacity-50">
                &gt;_ {skill.category}
              </div>
              <div className="text-white group-hover:text-black font-black font-display text-lg md:text-xl uppercase">
                {skill.name}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-white mt-8 pt-4 flex justify-between font-mono text-xs text-gray-500">
          <span>TOTAL_NODES: {skills.length}</span>
          <span>MEMORY_USAGE: 128MB</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;