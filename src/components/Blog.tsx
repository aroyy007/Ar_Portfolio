
import { useRef, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sifting Signals – Part I",
    description: "Insights on building intelligent IoT systems that can process and analyze data in real-time.",
    date: "Coming Soon",
    readTime: "10 min read"
  },
  {
    id: 2,
    title: "Building for Disaster Response",
    description: "Lessons learned while developing technology for emergency communication during natural disasters.",
    date: "Coming Soon",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The ML Revolution in IoT",
    description: "How machine learning is transforming the capabilities of connected devices and systems.",
    date: "Coming Soon",
    readTime: "12 min read"
  }
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    postRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      postRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="blog" className="section-container">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="section-heading">Blog</h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-12">
          Thoughts, insights and guides on technology, development, and innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => (postRefs.current[index] = el)}
            className="glass rounded-lg overflow-hidden hover-card opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="h-3 bg-gradient-to-r from-portfolio-purple to-portfolio-blue"></div>
            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.description}</p>
              <button 
                className="text-portfolio-purple-light flex items-center hover:text-white transition-colors"
                disabled
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
