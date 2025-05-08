
import { useRef, useEffect } from "react";

interface TeachingItem {
  id: number;
  title: string;
  description: string;
  date: string;
}

const teachingItems: TeachingItem[] = [
  {
    id: 1,
    title: "Algorithms & Competitive Programming",
    description: "Mentoring junior students in algorithmic problem-solving techniques.",
    date: "Coming Soon"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    description: "Teaching React and Node.js fundamentals to beginners.",
    date: "Coming Soon"
  },
  {
    id: 3,
    title: "IoT Systems Design",
    description: "Guiding students through creating connected device systems.",
    date: "Coming Soon"
  }
];

const Teaching = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      itemRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="teaching" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="section-heading">Teaching &amp; Mentorship</h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-10">
          Sharing knowledge and mentoring others is an important part of my journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teachingItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className="glass rounded-lg p-6 hover-card opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="text-portfolio-purple-light text-sm font-medium mb-2">
              {item.date}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teaching;
