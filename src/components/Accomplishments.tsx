
import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";

interface AwardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const awards: AwardItem[] = [
  {
    id: 1,
    title: "ICPC Regionalist 2024",
    description: "Qualified for the ICPC Asia Regional Contest, solving complex algorithmic problems.",
    icon: "🏆",
  },
  {
    id: 2,
    title: "National Hackathon Finalist",
    description: "Developed an innovative solution for disaster management in the national hackathon event.",
    icon: "🥇",
  },
  {
    id: 3,
    title: "Top Algorithm Contest Rankings",
    description: "Achieved high rankings in competitive programming platforms like Codeforces and LeetCode.",
    icon: "🔥",
  },
];

const codingPlatforms = [
  { name: "Codeforces", icon: "⭐" },
  { name: "LeetCode", icon: "⚡" },
  { name: "HackerRank", icon: "🔥" },
  { name: "CodeChef", icon: "🚀" },
];

const Accomplishments = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const awardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const platformsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

    awardRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    if (platformsRef.current) {
      observer.observe(platformsRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      awardRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
      if (platformsRef.current) {
        observer.unobserve(platformsRef.current);
      }
    };
  }, []);

  return (
    <section id="accomplishments" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 xs:mb-8">
        <h2 className="section-heading">Accomplishments</h2>
      </div>

      {/* Major Accomplishments */}
      <div className="responsive-grid-3 mb-8 xs:mb-10">
        {awards.map((award, index) => (
          <div
            key={award.id}
            ref={(el) => (awardRefs.current[index] = el)}
            className="glass rounded-lg p-4 xs:p-5 sm:p-6 hover-card opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">{award.icon}</div>
            <h3 className="text-lg xs:text-xl font-semibold text-white mb-2">{award.title}</h3>
            <p className="text-sm xs:text-base text-gray-400">{award.description}</p>
          </div>
        ))}
      </div>

      {/* Coding Platforms */}
      <div 
        ref={platformsRef} 
        className="glass rounded-lg p-4 xs:p-6 sm:p-8 opacity-0 translate-y-8 transition-all duration-700"
        style={{ transitionDelay: "450ms" }}
      >
        <h3 className="section-subheading mb-4 xs:mb-6">Top Rankings In</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4">
          {codingPlatforms.map((platform, index) => (
            <div
              key={index}
              className="p-3 xs:p-4 bg-portfolio-dark rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:neon-shadow"
            >
              <div className="text-2xl xs:text-3xl mb-2">{platform.icon}</div>
              <div className="text-base xs:text-lg font-medium text-white">{platform.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
