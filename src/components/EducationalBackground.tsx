import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import edu from './EDU.jpeg'
import school from './school.png'
import college from './College.jpg'

interface EducationItem {
    id: number;
    date: string;
    institution: string;
    degree: string;
    logo?: string;
}

const educationHistory: EducationItem[] = [
    {
        id: 1,
        date: "September 2022 - September 2026",
        institution: "East Delta University",
        degree: "Bachelor of Science in Computer Science and Engineering",
        logo: edu,
    },
    {
        id: 2,
        date: "2019 - 2021",
        institution: "Govt Haji Mohammad Mohsin College",
        degree: "Higher Secondary",
        logo: college, 
    },
    {
        id: 3,
        date: "2019",
        institution: "St. Placid's School & College",
        degree: "Secondary School",
        logo: school,
    }
];

const EducationalBackground = () => {
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineItems = useRef<(HTMLDivElement | null)[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-up', 'opacity-100');
                        entry.target.classList.remove('opacity-0', 'translate-y-8');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        timelineItems.current.forEach((item) => {
            if (item) {
                observer.observe(item);
            }
        });

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            timelineItems.current.forEach((item) => {
                if (item) {
                    observer.unobserve(item);
                }
            });
        };
    }, []);

    return (
        <section id="education" className="section-container">
            <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 xs:mb-8">
                <h2 className="section-heading">Educational Background</h2>
            </div>

            <div className="relative">
                {/* Vertical timeline line with glow effect */}
                <div className="absolute left-4 xs:left-5 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-portfolio-purple-light via-portfolio-purple-light to-transparent"></div>
                <div className="absolute left-4 xs:left-5 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-portfolio-purple-light/30 blur-sm"></div>

                {/* Timeline items */}
                <div className="relative z-10">
                    {educationHistory.map((edu, index) => (
                        <div
                            key={edu.id}
                            ref={(el) => (timelineItems.current[index] = el)}
                            className={`flex flex-col md:flex-row md:items-center mb-8 xs:mb-10 opacity-0 translate-y-8 transition-all duration-700 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                            onMouseEnter={() => setActiveItem(edu.id)}
                            onMouseLeave={() => setActiveItem(null)}
                        >
                            {/* Timeline node with enhanced glow */}
                            <div className="absolute left-4 xs:left-5 md:left-1/2 transform md:-translate-x-1/2 w-4 xs:w-5 h-4 xs:h-5 rounded-full bg-portfolio-purple-light border-4 border-portfolio-dark-deeper transition-all duration-300 z-20">
                                {/* Enhanced glow effect on hover */}
                                <div
                                    className={`absolute inset-0 rounded-full transition-all duration-300 ${activeItem === edu.id ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                                        }`}
                                    style={{
                                        boxShadow: '0 0 20px 8px rgba(155, 135, 245, 0.8), 0 0 40px 15px rgba(155, 135, 245, 0.4)',
                                    }}
                                ></div>
                                {/* Pulsing effect */}
                                <div
                                    className={`absolute inset-0 rounded-full bg-portfolio-purple-light transition-all duration-1000 ${activeItem === edu.id ? 'animate-ping opacity-20' : 'opacity-0'
                                        }`}
                                ></div>
                            </div>

                            {/* Content */}
                            <div
                                className={`md:w-[45%] pl-10 xs:pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-6 lg:pl-12' : 'md:pr-6 lg:pr-12'
                                    }`}
                            >
                                <div
                                    className={`glass p-5 xs:p-6 sm:p-7 rounded-xl hover-card transition-all duration-300 ${activeItem === edu.id ? 'neon-shadow scale-105' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        {/* Institution Logo */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-lg bg-gradient-to-br from-portfolio-purple-light/20 to-portfolio-purple-light/10 border border-portfolio-purple-light/30 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={edu.logo}
                                                    alt={`${edu.institution} logo`}
                                                    className="w-8 h-8 xs:w-10 xs:h-10 object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Institution Info */}
                                        <div className="flex-grow">
                                            <div className="text-portfolio-purple-light text-sm xs:text-base font-medium mb-2">
                                                {edu.date}
                                            </div>
                                            <h3 className="text-lg xs:text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                                                {edu.institution}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="text-base xs:text-lg text-gray-300 font-medium leading-relaxed">
                                        {edu.degree}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationalBackground;