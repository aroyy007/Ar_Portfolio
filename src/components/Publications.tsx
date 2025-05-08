
import { useRef, useEffect } from "react";

interface PublicationItem {
  id: number;
  title: string;
  description: string;
  status: string;
  type: "publication" | "problem";
}

const items: PublicationItem[] = [
  {
    id: 1,
    title: "IoT-Based Smart Air Quality Monitoring System",
    description: "Research on efficient real-time air quality monitoring using low-cost sensors and machine learning.",
    status: "Upcoming",
    type: "publication"
  },
  {
    id: 2,
    title: "Optimizing Emergency Response with AI",
    description: "Analysis of AI techniques for improving disaster relief communication.",
    status: "In Progress",
    type: "publication"
  },
  {
    id: 3,
    title: "Advanced Data Structures",
    description: "Creating competitive programming problems focusing on advanced data structures.",
    status: "Coming Soon",
    type: "problem"
  },
  {
    id: 4,
    title: "Graph Theory Challenge",
    description: "Series of algorithmic problems based on graph theory and network optimization.",
    status: "In Development",
    type: "problem"
  }
];

const Publications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (publicationsRef.current) {
      observer.observe(publicationsRef.current);
    }

    if (problemsRef.current) {
      observer.observe(problemsRef.current);
    }

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (publicationsRef.current) {
        observer.unobserve(publicationsRef.current);
      }
      if (problemsRef.current) {
        observer.unobserve(problemsRef.current);
      }
      itemRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  const publications = items.filter(item => item.type === "publication");
  const problems = items.filter(item => item.type === "problem");

  return (
    <section id="publications" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="section-heading">Research &amp; Judging</h2>
      </div>

      {/* Publications */}
      <div 
        ref={publicationsRef}
        className="mb-12 opacity-0 translate-y-8 transition-all duration-700"
      >
        <h3 className="section-subheading">Upcoming Publications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="glass rounded-lg p-6 hover-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-block bg-portfolio-purple/20 text-portfolio-purple-light text-xs px-3 py-1 rounded-full mb-3">
                {item.status}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Setting */}
      <div 
        ref={problemsRef}
        className="opacity-0 translate-y-8 transition-all duration-700"
        style={{ transitionDelay: "200ms" }}
      >
        <h3 className="section-subheading">Problem Setting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[publications.length + index] = el)}
              className="glass rounded-lg p-6 hover-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${(publications.length + index) * 150}ms` }}
            >
              <div className="inline-block bg-portfolio-blue/20 text-portfolio-blue text-xs px-3 py-1 rounded-full mb-3">
                {item.status}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
