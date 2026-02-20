import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const bootMessages = [
    "> Initializing contact module...",
    "> Connection established.",
    "> Ready for transmission_",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    if (!isVisible) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootMessages.length) {
        setTerminalLines((prev) => [...prev, bootMessages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Transmission Received!",
        description: "I'll get back to you soon.",
      });
      reset();
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <div className="reveal bg-white border-4 border-black shadow-hard-xl p-6 md:p-8 lg:p-12 relative mt-12">
        {/* Badge */}
        <div className="absolute -top-10 -left-2 md:-left-6 bg-neo-yellow border-4 border-black px-4 md:px-6 py-2 shadow-hard rotate-[-5deg]">
          <span className="font-black text-lg md:text-2xl">START A PROJECT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-[0.85]">
              Let's<br />Talk<br />Code.
            </h2>
            <p className="font-mono text-base md:text-lg mb-8 text-gray-600">
              I am currently available for freelance work and open to full-time opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black flex-shrink-0">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <a
                  href="mailto:contact@arijitroy.me"
                  className="text-base md:text-xl font-bold hover:bg-neo-blue hover:text-white transition-colors px-1"
                >
                  contact@arijitroy.me
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black flex-shrink-0">
                  <i className="ri-github-line text-xl"></i>
                </div>
                <a
                  href="https://github.com/aroyy007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-xl font-bold hover:bg-neo-yellow transition-colors px-1"
                >
                  github.com/aroyy007
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black flex-shrink-0">
                  <i className="ri-linkedin-line text-xl"></i>
                </div>
                <a
                  href="https://www.linkedin.com/in/arijit-roy-3004ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-xl font-bold hover:bg-neo-purple hover:text-white transition-colors px-1"
                >
                  linkedin.com/in/arijit-roy
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Terminal Form */}
          <div className="bg-neo-black border-4 border-black shadow-hard overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-white/20 bg-neo-black">
              <div className="flex gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full border border-black" />
                <div className="h-3 w-3 bg-yellow-500 rounded-full border border-black" />
                <div className="h-3 w-3 bg-green-500 rounded-full border border-black" />
              </div>
              <span className="font-mono text-white/60 text-xs ml-2">terminal@arijit:~</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-6">
              {/* Boot Messages */}
              <div className="mb-4 font-mono text-xs text-neo-green space-y-1">
                {terminalLines.map((line, i) => (
                  <p key={i} className="animate-fade-in">{line}</p>
                ))}
              </div>

              {submitted ? (
                <div className="py-10 text-center">
                  <i className="ri-checkbox-circle-fill text-5xl text-neo-green block mb-4"></i>
                  <h3 className="text-xl font-black uppercase text-white">
                    Transmission Received
                  </h3>
                  <p className="font-mono text-sm mt-2 text-gray-400">
                    System response initialized. I will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="font-mono font-bold mb-1 uppercase text-xs text-neo-green block">
                      &gt; Identity
                    </label>
                    <input
                      {...register("name")}
                      placeholder="NAME / COMPANY"
                      className="w-full bg-white/5 border-2 border-white/20 p-3 font-mono font-bold text-white text-sm focus:outline-none focus:border-neo-green focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                    {errors.name && (
                      <p className="text-neo-red font-mono text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-mono font-bold mb-1 uppercase text-xs text-neo-green block">
                      &gt; Coordinates
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-white/5 border-2 border-white/20 p-3 font-mono font-bold text-white text-sm focus:outline-none focus:border-neo-green focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                    {errors.email && (
                      <p className="text-neo-red font-mono text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-mono font-bold mb-1 uppercase text-xs text-neo-green block">
                      &gt; Transmission
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="PROJECT DETAILS..."
                      className="w-full bg-white/5 border-2 border-white/20 p-3 font-mono font-bold text-white text-sm focus:outline-none focus:border-neo-green focus:bg-white/10 transition-all resize-none placeholder:text-white/30"
                    />
                    {errors.message && (
                      <p className="text-neo-red font-mono text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neo-green text-black font-black text-lg py-3 border-2 border-black shadow-hard neo-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT DATA"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;