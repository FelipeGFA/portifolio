import { Check, Copy, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

export function PromptText({ children }) {
  return (
    <div className="prompt-text">
      <span>guest@terminal</span>
      <b>:</b>
      <strong>~</strong>
      <i>$</i>
      <span className="typed">{children}</span>
    </div>
  );
}

export function About({ onNavigate, profileOnly = false }) {
  const { t } = useTranslation();
  const items = [
    ["projects", "projects.git", t("actions.projects")],
    ["stack", "stack.sys", t("actions.stack")],
    ["contact", "contact.sh", t("actions.contact")],
    ["pix", "support.pix", t("actions.pix")],
  ];

  return (
    <div className="section-content">
      <div className="indent hero-copy">
        <h1>{t("profile.name")}</h1>
        <h2>{t("profile.role")}</h2>
        <p>{t("profile.description")}</p>
      </div>
      {!profileOnly && (
        <>
          <PromptText>{t("terminal.actions")}</PromptText>
          <div className="action-list">
            {items.map(([section, file, description], index) => (
              <button key={section} onClick={() => onNavigate(section)}>
                <b>[{index + 1}]</b>
                <strong>{file}</strong>
                <em>—</em>
                <span>{description}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const projects = [
    [
      t("projects.portfolioName"),
      "https://github.com/FelipeGFA/portifolio",
      t("projects.portfolio"),
    ],
    [
      "Online Launchpad",
      "https://github.com/FelipeGFA/Launchpad",
      t("projects.launchpad"),
    ],
    [
      "Hagitori Desktop",
      "https://github.com/hagitori/hagitori-desktop",
      t("projects.hagitori"),
    ],
    [
      t("projects.routerName"),
      "https://github.com/FelipeGFA/Roteirizador-Urbano",
      t("projects.router"),
    ],
    [
      "Kahoot Bot",
      "https://github.com/FelipeGFA/Kahoot-Bot",
      t("projects.kahoot"),
    ],
    [
      "I3 Dot Files",
      "https://github.com/FelipeGFA/I3-DOT-FILES",
      t("projects.dotfiles"),
    ],
  ];

  return (
    <div className="section-content">
      <PromptText>{t("projects.command")}</PromptText>
      <div className="project-list indent">
        {projects.map(([name, url, description], index) => (
          <article key={name}>
            <div>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h2>{name}</h2>
            </div>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noreferrer">
              {t("projects.repository")} <ExternalLink size={13} />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const { t } = useTranslation();
  const items = [
    "React",
    "JavaScript",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Git",
    "Kotlin",
    "Java",
  ];

  return (
    <div className="section-content">
      <PromptText>{t("stack.command")}</PromptText>
      <div className="stack-grid indent">
        {items.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            <small>{t("stack.ready")}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation();
  return (
    <div className="section-content">
      <PromptText>{t("contact.command")}</PromptText>
      <div className="contact-block indent">
        <h2>{t("contact.title")}</h2>
        <a href="mailto:felipegabriel.avila6@gmail.com">
          <Mail size={15} /> felipegabriel.avila6@gmail.com
        </a>
        <div className="social-links">
          <a href="https://github.com/FelipeGFA" target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub
          </a>
            <a href="https://www.linkedin.com/in/felipegfa" target="_blank" rel="noreferrer">
            <Linkedin size={15} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export function Pix({ pixKey, copied, onCopy, image }) {
  const { t } = useTranslation();
  return (
    <div className="section-content">
      <PromptText>{t("pix.command")}</PromptText>
      <div className="pix-block indent">
        <div>
          <h2>{t("pix.title")}</h2>
          <p>{t("pix.description")}</p>
          <button onClick={onCopy} className="copy-button">
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? t("pix.copied") : t("pix.copy")}
          </button>
        </div>
        <img src={image} alt="QR Code Pix" />
      </div>
      <code className="pix-code">{pixKey}</code>
    </div>
  );
}
