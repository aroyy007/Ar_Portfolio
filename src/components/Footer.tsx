import deskScene from "../assets/arijit-desk.png";

const sitemap = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#publications" },
  { label: "Work", href: "#projects" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/aroyy007", icon: "ri-github-fill" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arijit-roy-3004ar/", icon: "ri-linkedin-fill" },
  { label: "X / Twitter", href: "https://twitter.com/aroyy007", icon: "ri-twitter-x-fill" },
];

const Footer = () => {
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-grid" aria-hidden="true" />
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-character" aria-hidden="true">
        <img src={deskScene} alt="" loading="lazy" decoding="async" />
        <span className="footer-eye footer-eye-left" />
        <span className="footer-eye footer-eye-right" />
      </div>

      <div className="footer-content">
        <p className="footer-eyebrow"><span /> AVAILABLE FOR SELECT PROJECTS</p>
        <h2 id="footer-heading">Have an idea?<br /><em>Let’s make it real.</em></h2>
        <a className="footer-email" href="mailto:contact@arijitroy.me">
          contact@arijitroy.me <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-bottom">
        <a href="#home" className="footer-mark" aria-label="Back to the top">AR.</a>
        <nav aria-label="Footer navigation">
          {sitemap.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="footer-socials">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
              <i className={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
        <p>© 2026 ARIJIT ROY</p>
      </div>
    </footer>
  );
};

export default Footer;
