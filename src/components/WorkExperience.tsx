import { useEffect, useRef } from "react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string[];
  color: string;
  textColor: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "FREELANCE",
    date: "2024 - PRESENT",
    description: [
      "Building responsive IoT dashboards and AI-powered web applications",
      "Developing full-stack solutions with React, Node.js, and MongoDB",
      "Creating real-time monitoring systems for environmental data",
    ],
    color: "bg-neo-yellow",
    textColor: "text-neo-yellow",
  },
  {
    id: 2,
    title: "ICPC Competitive Programmer",
    company: "EAST DELTA UNIVERSITY",
    date: "2022 - PRESENT",
    description: [
      "Qualified for ICPC Asia Regional Contest 2024",
      "Solving complex algorithmic problems in C++ and Python",
      "Mentoring juniors in competitive programming and data structures",
    ],
    color: "bg-neo-red",
    textColor: "text-neo-red",
  },
  {
    id: 3,
    title: "Research & IoT Projects",
    company: "UNIVERSITY PROJECTS",
    date: "2023 - PRESENT",
    description: [
      "Built Air Quality Monitoring System with IoT sensors and ML prediction",
      "Developed FloodGuard Aid Network for emergency response coordination",
      "Created AcademiaConnect academic collaboration platform",
    ],
    color: "bg-neo-green",
    textColor: "text-neo-green",
  },
];

const WorkExperience = () => {
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
    <section id="experience" ref={sectionRef} className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="section-heading mb-12 text-center">
        Experience<span className="text-neo-red">_Log</span>
      </h2>

      <div className="relative border-l-4 border-black ml-4 md:ml-10 space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="reveal relative pl-8 md:pl-16">
            {/* Timeline node */}
            <div className={`absolute -left-[14px] top-2 w-6 h-6 ${exp.color} border-4 border-black`} />

            {/* Card */}
            <div className="bg-white border-4 border-black p-6 shadow-hard hover:shadow-hard-xl transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase">{exp.title}</h3>
                <span className="font-mono font-bold bg-neo-black text-white px-2 py-1 mt-2 md:mt-0 text-sm">
                  {exp.date}
                </span>
              </div>
              <p className={`font-mono text-lg md:text-xl mb-2 ${exp.textColor} font-bold`}>
                @ {exp.company}
              </p>
              <ul className="list-disc list-inside font-mono text-sm md:text-base text-gray-700 space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
