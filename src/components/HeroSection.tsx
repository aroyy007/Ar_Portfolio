import { useEffect, useState } from "react";
import cv from "./ArijitRoyCV.pdf";
import portrait from "../assets/arijit-illustrated.png";

const HeroSection = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className={`hero-layout ${ready ? "is-ready" : ""}`}>
        <div className="hero-copy">
          <div className="hero-status">
            <span className="hero-status-light" aria-hidden="true" />
            <span>SYSTEM STATUS: ONLINE</span>
          </div>

          <p className="hero-kicker">Arijit Roy / Software engineer</p>
          <h1 id="hero-title" className="hero-title">
            <span>FULL STACK</span>
            <span className="hero-title-outline">DEVELOPER</span>
          </h1>

          <div className="hero-summary">
            <p>I build useful digital products where thoughtful engineering meets applied AI.</p>
            <strong>React · Node.js · Python · ML &amp; AI</strong>
          </div>

          <div className="hero-actions">
            <button onClick={scrollToProjects} data-magnetic className="hero-primary neo-hover">
              VIEW MY WORK <span aria-hidden="true">↘</span>
            </button>
            <a href={cv} download data-magnetic className="hero-secondary neo-hover">
              <i className="ri-download-line" aria-hidden="true" /> DOWNLOAD CV
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait-index" aria-hidden="true">AR / 01</div>
          <div className="hero-portrait-frame">
            <img src={portrait} alt="Illustrated portrait of Arijit Roy" className="hero-portrait" />
          </div>
          <div className="hero-location" aria-hidden="true">
            <span>23.8103° N</span>
            <span>DHAKA, BD</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-note" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span><span>↓</span>
      </div>
    </section>
  );
};

export default HeroSection;
