const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-4xl font-black mb-6 font-display">ARIJIT.</h2>
                    <p className="text-gray-400 max-w-sm">
                        Building real-world, impactful solutions with the raw aesthetics of brutalist design.
                        No cookies, no trackers, just code.
                    </p>
                </div>

                {/* Sitemap */}
                <div>
                    <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SITEMAP</h3>
                    <ul className="space-y-2 text-gray-400">
                        {[
                            { label: "Home", href: "#hero" },
                            { label: "About", href: "#about" },
                            { label: "Projects", href: "#projects" },
                            { label: "Contact", href: "#contact" },
                        ].map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="hover:text-white hover:underline decoration-neo-pink decoration-2 transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SOCIALS</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/aroyy007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-neo-yellow transition-colors"
                        >
                            <i className="ri-github-fill"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/arijit-roy-3004ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-neo-purple transition-colors"
                        >
                            <i className="ri-linkedin-fill"></i>
                        </a>
                        <a
                            href="https://twitter.com/aroyy007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-neo-blue transition-colors"
                        >
                            <i className="ri-twitter-fill"></i>
                        </a>
                        <a
                            href="mailto:contact@arijitroy.me"
                            className="text-2xl hover:text-neo-pink transition-colors"
                        >
                            <i className="ri-mail-fill"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                <p>© 2026 ARIJIT.exe // SYSTEM_END</p>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-white opacity-[0.03] leading-none select-none pointer-events-none text-center font-display">
                BRUTAL
            </div>
        </footer>
    );
};

export default Footer;
