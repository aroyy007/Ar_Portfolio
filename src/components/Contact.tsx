import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && terminalLines.length === 0) {
            const lines = [
              "> Initializing contact protocol...",
              "> Loading communication channels...",
              "> System ready. Awaiting your message..."
            ];
            
            lines.forEach((line, index) => {
              setTimeout(() => {
                setTerminalLines(prev => [...prev, line]);
              }, index * 600);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [terminalLines.length]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate sending email (in production, you'd integrate with an email service)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTerminalLines(prev => [
      ...prev,
      `> Processing message from ${data.name}...`,
      `> Email: ${data.email}`,
      `> Message sent successfully! ✓`
    ]);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-container pb-16 sm:pb-20 lg:pb-32">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 sm:mb-8">
                <h2 className="section-heading">Educational Background</h2>
            </div>

      <div className="max-w-3xl mx-auto">
        {/* Terminal Window */}
        <div className="bg-[#0a0e1a] rounded-lg overflow-hidden border border-primary/20 shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-[#1a1f2e] px-4 py-3 flex items-center justify-between border-b border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-primary/70 text-sm font-mono">❯</span>
              <span className="text-primary/90 text-sm font-mono">contact.terminal</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 sm:p-8 min-h-[400px]">
            {/* Terminal Output */}
            <div className="font-mono text-sm mb-6">
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className="text-primary animate-pulse mb-2"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationDuration: "1s",
                    animationIterationCount: "1"
                  }}
                >
                  {line}
                </div>
              ))}
              {terminalLines.length >= 3 && (
                <div className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></div>
              )}
            </div>

            {/* Form */}
            {terminalLines.length >= 3 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <span className="text-primary font-mono text-sm mt-2">❯</span>
                          <div className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="enter name..."
                                className="bg-transparent border-0 border-b border-primary/30 rounded-none text-primary font-mono text-sm placeholder:text-primary/40 focus-visible:ring-0 focus-visible:border-primary px-2 py-1"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono mt-1 ml-2" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <span className="text-primary font-mono text-sm mt-2">❯</span>
                          <div className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="enter email..."
                                className="bg-transparent border-0 border-b border-primary/30 rounded-none text-primary font-mono text-sm placeholder:text-primary/40 focus-visible:ring-0 focus-visible:border-primary px-2 py-1"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono mt-1 ml-2" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <span className="text-primary font-mono text-sm mt-2">❯</span>
                          <div className="flex-1">
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="enter message..."
                                rows={4}
                                className="bg-transparent border-0 border-b border-primary/30 rounded-none text-primary font-mono text-sm placeholder:text-primary/40 focus-visible:ring-0 focus-visible:border-primary px-2 py-1 resize-none"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono mt-1 ml-2" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2 pt-4">
                    <span className="text-primary font-mono text-sm">❯</span>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-mono text-sm px-6"
                    >
                      {isSubmitting ? "sending..." : "send_message"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>

          {/* Social Links Footer */}
          <div className="bg-[#1a1f2e] px-6 py-4 border-t border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-primary/70 font-mono text-sm">❯ Connect with me:</span>
              <div className="flex gap-3">
                <a
                  href="mailto:contact@arijitroy.me"
                  className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://github.com/aroyy007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/arijit-roy-3004ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://twitter.com/aroyy007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8 sm:mt-12">
          <p className="text-sm sm:text-base font-mono">
            &copy; {new Date().getFullYear()} Arijit Roy. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;