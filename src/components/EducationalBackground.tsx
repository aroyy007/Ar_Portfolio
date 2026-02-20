import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import bgimage from "./bgphoto.png";
import edu from "./EDU.jpeg";
import school from "./school.png";
import college from "./College.jpg";

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
        degree: "BSc in Computer Science & Engineering",
        logo: edu,
    },
    {
        id: 2,
        date: "2019 - 2021",
        institution: "Govt Haji Mohammad Mohsin College",
        degree: "Higher Secondary Certificate (HSC)",
        logo: college,
    },
    {
        id: 3,
        date: "2014 - 2019",
        institution: "St. Placid's School & College",
        degree: "Secondary School Certificate (SSC)",
        logo: school,
    },
];

const EducationalBackground = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useIsMobile();

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
            id="about"
            ref={sectionRef}
            className="py-24 px-4 max-w-7xl mx-auto border-x-4 border-black bg-white my-12 shadow-hard-lg"
        >
            {/* About Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
                {/* Photo */}
                <div className="md:col-span-4 reveal">
                    <div className="aspect-square bg-gray-200 border-4 border-black relative shadow-hard overflow-hidden group">
                        <img
                            src={bgimage}
                            alt="Arijit Roy"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-neo-red text-white px-2 font-mono text-xs border border-black z-10">
                            AVATAR.JPG
                        </span>
                    </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-8 flex flex-col justify-center reveal">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Who am I?</h2>
                    <p className="font-mono text-lg md:text-xl leading-relaxed mb-6">
                        I am Arijit Roy. A full-stack developer who builds{" "}
                        <span className="bg-neo-yellow px-1 border border-black">real-world, impactful solutions</span> — from IoT systems
                        to AI-powered applications.
                    </p>
                    <p className="font-mono text-base md:text-lg mb-8 text-gray-600 border-l-4 border-neo-purple pl-4">
                        &gt; BSc in Computer Science & Engineering @ East Delta University<br />
                        &gt; ICPC Regionalist 2024 | IoT & AI Enthusiast<br />
                        &gt; Full Stack: React, Node.js, Python, MongoDB
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <div className="bg-neo-black text-white px-4 py-2 font-mono text-sm border-2 border-transparent">
                            📍 LOCATION: CHITTAGONG, BD
                        </div>
                        <div className="bg-neo-green text-black px-4 py-2 font-mono text-sm border-2 border-black font-bold">
                            🟢 STATUS: AVAILABLE
                        </div>
                    </div>
                </div>
            </div>

            {/* Education Cards */}
            <div className="border-t-4 border-black pt-12">
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-8 flex items-center gap-3">
                    <span className="bg-neo-blue text-white px-3 py-1 border-2 border-black text-sm font-mono">EDU</span>
                    Academic Background
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {educationHistory.map((item) => (
                        <div
                            key={item.id}
                            className="reveal bg-white border-4 border-black p-5 shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            {item.logo && (
                                <div className="w-16 h-16 border-2 border-black mb-4 overflow-hidden bg-gray-100">
                                    <img src={item.logo} alt={item.institution} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <h4 className="text-xl font-black uppercase mb-1">{item.institution}</h4>
                            <p className="font-mono text-sm text-gray-700 mb-2">{item.degree}</p>
                            <span className="font-mono text-xs bg-neo-black text-white px-2 py-1 inline-block">
                                {item.date}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationalBackground;