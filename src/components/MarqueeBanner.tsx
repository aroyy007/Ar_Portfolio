const MarqueeBanner = () => {
    const text = "/// OPEN FOR WORK /// FULL STACK DEVELOPMENT /// IoT & AI /// ICPC REGIONALIST /// FAST /// SECURE /// ";

    return (
        <div className="border-b-4 border-black bg-neo-blue py-3 relative z-20">
            <div className="marquee-container font-mono font-bold text-xl md:text-2xl text-white">
                <div className="marquee-content">
                    <span className="whitespace-nowrap">{text}</span>
                    <span className="whitespace-nowrap">{text}</span>
                    <span className="whitespace-nowrap">{text}</span>
                    <span className="whitespace-nowrap">{text}</span>
                </div>
            </div>
        </div>
    );
};

export default MarqueeBanner;
