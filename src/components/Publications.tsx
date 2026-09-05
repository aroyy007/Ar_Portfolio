import { Activity, ArrowUpRight, Database, FileText, Github, Radio } from "lucide-react";
import paperPdf from "../assets/FedAdaptEF_Morocco_Conference.pdf";

const metrics = [
  { value: "0.9601", label: "ROC–AUC", icon: Activity },
  { value: "−23.9%", label: "Communication", icon: Radio },
  { value: "16,652", label: "Fundus images", icon: Database },
  { value: "06", label: "Evaluation seeds", icon: FileText },
];

const Publications = () => (
  <section id="publications" className="publication-section">
    <div className="section-container">
      <div className="publication-heading-row reveal">
        <div>
          <span className="publication-kicker">RESEARCH ARCHIVE / 001</span>
          <h2 className="section-heading publication-heading">Selected<br />research</h2>
        </div>
        <p className="publication-intro">
          Building communication-efficient machine learning systems for practical,
          privacy-aware healthcare.
        </p>
      </div>

      <article className="publication-dossier reveal">
        <div className="publication-index" aria-hidden="true">
          <span>IEEE</span><strong>01</strong><span>2026</span>
        </div>

        <div className="publication-main">
          <div className="publication-status-row">
            <span className="publication-status"><i /> PUBLISHED</span>
            <span>FEDERATED LEARNING · MEDICAL AI</span>
          </div>
          <h3>
            FedAdapt-EF: An Efficient Federated Learning-Based Approach on
            Adaptive Compression with Error Feedback for Diabetic Retinopathy
          </h3>
          <p className="publication-authors">
            <strong>Arijit Roy</strong> · Ittekhar Mahin Abir · Antu Chowdhury
          </p>
          <p className="publication-summary">
            A layer-wise adaptive compression method that combines error feedback
            and FedProx to reduce federated-learning communication while preserving
            diabetic retinopathy classification performance.
          </p>
          <div className="publication-tags" aria-label="Research topics">
            <span>FEDERATED LEARNING</span><span>ERROR FEEDBACK</span>
            <span>DIABETIC RETINOPATHY</span><span>FEDPROX</span>
          </div>
          <div className="publication-actions">
            <a href="https://ieeexplore.ieee.org/document/11650558" target="_blank" rel="noreferrer" className="publication-button publication-button-primary">
              IEEE XPLORE <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={paperPdf} target="_blank" rel="noreferrer" className="publication-button">
              READ PAPER <FileText size={17} aria-hidden="true" />
            </a>
            <a href="https://www.researchgate.net/profile/Arijit-Roy-27/research" target="_blank" rel="noreferrer" className="publication-button">
              RESEARCHGATE <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="https://github.com/aroyy007/FedAdapt-EF" target="_blank" rel="noreferrer" className="publication-button publication-button-icon" aria-label="View FedAdapt-EF source code on GitHub">
              <Github size={19} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="publication-metrics" aria-label="Paper results">
          <div className="publication-scan" aria-hidden="true" />
          <div className="publication-metrics-label"><span>EXPERIMENT LOG</span><span>VERIFIED</span></div>
          <div className="publication-metric-grid">
            {metrics.map(({ value, label, icon: Icon }) => (
              <div className="publication-metric" key={label}>
                <Icon size={18} strokeWidth={2.4} aria-hidden="true" />
                <strong>{value}</strong><span>{label}</span>
              </div>
            ))}
          </div>
          <div className="publication-signal" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <i key={index} style={{ height: `${18 + ((index * 17) % 48)}%` }} />
            ))}
          </div>
          <p>Adaptive compression / stable convergence / six-seed evaluation</p>
        </aside>
      </article>
    </div>
  </section>
);

export default Publications;
