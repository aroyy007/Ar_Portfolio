
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
  { name: "Codeforces", img: "/codeforce.png" },
  { name: "LeetCode", img: "/leetcode.png" },
  { name: "HackerRank", img: "/hackerrank.png" },
  { name: "CodeChef", img: "/codechef.png" },
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
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 sm:mb-8">
        <h2 className="section-heading">Accomplishments</h2>
      </div>

      {/* Major Accomplishments */}
      <div className="responsive-grid-3 mb-6 sm:mb-8 lg:mb-10">
        {awards.map((award, index) => (
          <div
            key={award.id}
            ref={(el) => (awardRefs.current[index] = el)}
            className="glass rounded-lg card-padding hover-card opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-center">{award.icon}</div>
            <h3 className="responsive-text-xl font-semibold text-white mb-2 sm:mb-3 text-center sm:text-left">
              {award.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed text-center sm:text-left">
              {award.description}
            </p>
          </div>
        ))}
      </div>

      {/* Coding Platforms */}
      <div 
        ref={platformsRef} 
        className="glass rounded-lg card-padding opacity-0 translate-y-8 transition-all duration-700"
        style={{ transitionDelay: "450ms" }}
      >
        <h3 className="section-subheading text-center sm:text-left mb-4 sm:mb-6">Top Rankings In</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {codingPlatforms.map((platform, index) => (
            <div
              key={index}
              className="card-padding bg-portfolio-dark rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:neon-shadow touch-target"
            >
              <img
                src={platform.img}
                alt={platform.name}
                className="mx-auto mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain"
                loading="lazy"
              />
              <div className="text-sm sm:text-base lg:text-lg font-medium text-white">
                {platform.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;