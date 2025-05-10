
import { useState, useRef, useEffect } from "react";

const Contact = () => {
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);
  const [isHoveringLinkedIn, setIsHoveringLinkedIn] = useState(false);
  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    if (socialRef.current) {
      observer.observe(socialRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      if (socialRef.current) {
        observer.unobserve(socialRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="section-container pb-32">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="section-heading">Contact</h2>
      </div>

      <div 
        ref={contentRef} 
        className="glass rounded-lg p-8 max-w-3xl mx-auto text-center opacity-0 translate-y-8 transition-all duration-700"
      >
        <h3 className="text-3xl font-semibold font-poppins text-white mb-4">
          Want to collaborate?
        </h3>
        <p className="text-lg text-gray-300 mb-8">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div 
          ref={socialRef}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 opacity-0 translate-y-8 transition-all duration-700"
          style={{ transitionDelay: "200ms" }}
        >
          <a
            href="mailto:contact@arijitroy.me"
            className="relative flex items-center justify-center w-64 p-4 bg-portfolio-dark-deeper text-white rounded-lg transition-all duration-300"
            onMouseEnter={() => setIsHoveringEmail(true)}
            onMouseLeave={() => setIsHoveringEmail(false)}
          >
            <div
              className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                isHoveringEmail ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(45deg, rgba(155,135,245,0.4) 0%, rgba(14,165,233,0.4) 100%)",
                boxShadow: "0 0 15px 2px rgba(155, 135, 245, 0.5)",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/arijit-roy-3004ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-64 p-4 bg-portfolio-dark-deeper text-white rounded-lg transition-all duration-300"
            onMouseEnter={() => setIsHoveringLinkedIn(true)}
            onMouseLeave={() => setIsHoveringLinkedIn(false)}
          >
            <div
              className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                isHoveringLinkedIn ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(45deg, rgba(155,135,245,0.4) 0%, rgba(14,165,233,0.4) 100%)",
                boxShadow: "0 0 15px 2px rgba(155, 135, 245, 0.5)",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>

          <a
            href="https://github.com/aroyy007"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-64 p-4 bg-portfolio-dark-deeper text-white rounded-lg transition-all duration-300"
            onMouseEnter={() => setIsHoveringGithub(true)}
            onMouseLeave={() => setIsHoveringGithub(false)}
          >
            <div
              className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                isHoveringGithub ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(45deg, rgba(155,135,245,0.4) 0%, rgba(14,165,233,0.4) 100%)",
                boxShadow: "0 0 15px 2px rgba(155, 135, 245, 0.5)",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-16">
        <p>&copy; {new Date().getFullYear()} Arijit Roy. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
