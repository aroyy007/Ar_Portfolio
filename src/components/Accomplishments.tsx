import { useEffect, useRef } from "react";

interface AwardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
}

const awards: AwardItem[] = [
  {
    id: 1,
    title: "ICPC Regionalist 2024",
    description:
      "Qualified for the ICPC Asia Regional Contest, solving complex algorithmic problems.",
    icon: "🏆",
    color: "text-neo-green",
    borderColor: "border-neo-green/30 hover:border-neo-green",
  },
  {
    id: 2,
    title: "National Hackathon Finalist",
    description:
      "Reached the finals of a national-level hackathon with an innovative IoT solution.",
    icon: "🥇",
    color: "text-neo-blue",
    borderColor: "border-neo-blue/30 hover:border-neo-blue",
  },
  {
    id: 3,
    title: "Top Algorithm Rankings",
    description:
      "Consistently ranked in the top percentile on competitive programming platforms.",
    icon: "⚡",
    color: "text-neo-orange",
    borderColor: "border-neo-orange/30 hover:border-neo-orange",
  },
];

const platforms = [
  {
    name: "Codeforces",
    icon: "/codeforce.png",
    url: "https://codeforces.com/profile/aroyy007",
    color: "text-neo-blue",
  },
  {
    name: "LeetCode",
    icon: "/leetcode.png",
    url: "https://leetcode.com/aroyy007/",
    color: "text-neo-orange",
  },
  {
    name: "HackerRank",
    icon: "/hackerrank.png",
    url: "https://www.hackerrank.com/aroyy007",
    color: "text-neo-green",
  },
  {
    name: "CodeChef",
    icon: "/codechef.png",
    url: "https://www.codechef.com/users/aroyy007",
    color: "text-neo-yellow",
  },
];

const Accomplishments = () => {
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
      id="accomplishments"
      ref={sectionRef}
      className="py-12 bg-neo-black text-white border-y-4 border-black relative overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b-2 border-white pb-3">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            CODING<span className="text-neo-green">_STATS</span>
          </h2>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="font-mono text-neo-green text-xs font-bold">LIVE</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements Column */}
          <div className="reveal flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-green border-2 border-white flex items-center justify-center">
                <span className="text-black font-black text-sm">🏆</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white">ACHIEVEMENTS</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)]">
              <div className="space-y-4 flex-1">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className={`border-2 ${award.borderColor} bg-neo-black/60 p-4 transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{award.icon}</span>
                      <div>
                        <h4 className={`font-black text-lg uppercase ${award.color}`}>
                          {award.title}
                        </h4>
                        <p className="font-mono text-xs text-gray-400 mt-1">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-neo-green p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-neo-green">stats --achievements</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platforms Column */}
          <div className="reveal flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-orange border-2 border-white flex items-center justify-center">
                <span className="text-black font-black text-sm">⚡</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white">PLATFORMS</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)]">
              <div className="grid grid-cols-2 gap-4 flex-1">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/10 hover:border-neo-orange bg-neo-black/60 p-4 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-[4px_4px_0_rgba(255,159,28,0.1)]"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 border border-white/20 p-2 flex items-center justify-center">
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`font-black uppercase text-sm ${platform.color}`}>
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-neo-orange p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-neo-orange">platforms --list</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;