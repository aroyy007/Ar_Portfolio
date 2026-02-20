import { useEffect, useRef, useState } from "react";

interface GitHubData {
  public_repos: number;
  followers: number;
  created_at: string;
}

const platforms = [
  {
    name: "Codeforces",
    icon: "/codeforce.png",
    url: "https://codeforces.com/profile/aroyy007",
    color: "text-neo-blue",
    borderHover: "hover:border-neo-blue",
  },
  {
    name: "LeetCode",
    icon: "/leetcode.png",
    url: "https://leetcode.com/aroyy007/",
    color: "text-neo-orange",
    borderHover: "hover:border-neo-orange",
  },
  {
    name: "HackerRank",
    icon: "/hackerrank.png",
    url: "https://www.hackerrank.com/aroyy007",
    color: "text-neo-green",
    borderHover: "hover:border-neo-green",
  },
  {
    name: "CodeChef",
    icon: "/codechef.png",
    url: "https://www.codechef.com/users/aroyy007",
    color: "text-neo-yellow",
    borderHover: "hover:border-neo-yellow",
  },
];

const GITHUB_USERNAME = "aroyy007";

const Accomplishments = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ghData, setGhData] = useState<GitHubData | null>(null);
  const [ghError, setGhError] = useState(false);

  // Fetch GitHub API data
  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (!res.ok) throw new Error("GitHub API error");
        const data = await res.json();
        setGhData(data);
      } catch {
        setGhError(true);
      }
    }
    fetchGitHub();
  }, []);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const repoCount = ghData?.public_repos ?? "--";
  const followerCount = ghData?.followers ?? "--";
  const commitEstimate = ghData
    ? `${(ghData.public_repos * 20 + ghData.followers * 5)}+`
    : "--";
  const joinedDate = ghData?.created_at
    ? new Date(ghData.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
    : "--";

  return (
    <section
      id="accomplishments"
      ref={sectionRef}
      className="py-12 md:py-20 bg-neo-black text-white border-y-4 border-black relative overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-rows-fr">
          {/* ========== GITHUB COLUMN ========== */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-green border-2 border-white flex items-center justify-center">
                <i className="ri-github-fill text-lg text-black"></i>
              </div>
              <h3 className="text-2xl font-black uppercase text-white">GITHUB</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)] relative">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <i className="ri-github-fill text-3xl text-neo-green"></i>
                  <div>
                    <h4 className="text-xl font-black text-white leading-tight">
                      {GITHUB_USERNAME}
                    </h4>
                    <p className="text-[10px] font-mono text-neo-green uppercase tracking-widest">
                      Open Source Contributor
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-neo-green tracking-tighter">
                    {ghError ? "ERR" : commitEstimate}
                  </div>
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Commits</p>
                </div>
              </div>

              {/* Stats Grid 2×2 */}
              <div className="grid grid-cols-2 gap-4 mb-8 uppercase">
                <div className="border-2 border-neo-green/30 bg-neo-black/60 p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                    Repositories
                  </div>
                  <div className="text-white font-black text-3xl tracking-tighter">
                    {ghError ? "ERR" : repoCount}
                  </div>
                </div>
                <div className="border-2 border-neo-green/30 bg-neo-black/60 p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                    Followers
                  </div>
                  <div className="text-white font-black text-3xl tracking-tighter">
                    {ghError ? "ERR" : followerCount}
                  </div>
                </div>
                <div className="border-2 border-neo-green/30 bg-neo-black/60 p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                    Commits
                  </div>
                  <div className="text-white font-black text-3xl tracking-tighter">
                    {ghError ? "ERR" : commitEstimate}
                  </div>
                </div>
                <div className="border-2 border-neo-green/30 bg-neo-black/60 p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                  <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                    Joined
                  </div>
                  <div className="text-white font-black text-xl tracking-tighter mt-1 leading-none">
                    {ghError ? "N/A" : joinedDate}
                  </div>
                </div>
              </div>

              {/* Contribution Graph */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <div className="bg-black border-2 border-neo-green/30 p-2 overflow-hidden shadow-[4px_4px_0_rgba(51,255,87,0.1)] hover:border-neo-green transition-colors duration-500 relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-green rounded-full animate-pulse" />
                  <p className="text-[8px] font-mono text-neo-green/50 uppercase tracking-[0.2em] mb-1">
                    Matrix_Output
                  </p>
                  <img
                    src={`https://ghchart.rshah.org/33FF57/${GITHUB_USERNAME}`}
                    alt="GitHub Contribution Graph"
                    className="w-full h-auto filter brightness-110"
                    style={{ imageRendering: "auto" }}
                  />
                </div>
              </div>

              {/* Command Line Footer */}
              <div className="mt-auto flex items-center justify-between text-neo-green p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-neo-green">gh --stats</span>
                  <span className="animate-pulse">_</span>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neo-green px-3 py-1 font-black uppercase border border-neo-green hover:bg-neo-green hover:text-black transition-all"
                >
                  VIEW_GH →
                </a>
              </div>
            </div>
          </div>

          {/* ========== PLATFORMS COLUMN ========== */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-orange border-2 border-white flex items-center justify-center">
                <i className="ri-code-box-fill text-lg text-black"></i>
              </div>
              <h3 className="text-2xl font-black uppercase text-white">PLATFORMS</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)]">
              {/* Achievements */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "🏆",
                    title: "ICPC Regionalist 2024",
                    desc: "Qualified for ICPC Asia Regional Contest",
                    color: "text-neo-green",
                    border: "border-neo-green/30 hover:border-neo-green",
                  },
                  {
                    icon: "🥇",
                    title: "National Hackathon Finalist",
                    desc: "Reached finals with an innovative IoT solution",
                    color: "text-neo-blue",
                    border: "border-neo-blue/30 hover:border-neo-blue",
                  },
                  {
                    icon: "⚡",
                    title: "Top Algorithm Rankings",
                    desc: "Top percentile on competitive programming platforms",
                    color: "text-neo-orange",
                    border: "border-neo-orange/30 hover:border-neo-orange",
                  },
                ].map((a) => (
                  <div
                    key={a.title}
                    className={`border-2 ${a.border} bg-neo-black/60 p-4 transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{a.icon}</span>
                      <div>
                        <h4 className={`font-black text-lg uppercase ${a.color}`}>{a.title}</h4>
                        <p className="font-mono text-xs text-gray-400 mt-1">{a.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform Links */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`border-2 border-white/10 ${platform.borderHover} bg-neo-black/60 p-4 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-[4px_4px_0_rgba(255,159,28,0.1)]`}
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