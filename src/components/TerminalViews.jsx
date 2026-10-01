import { Check, Copy, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

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
  const items = [
    ["projects", "projects.git", "repositórios e projetos"],
    ["stack", "stack.sys", "tecnologias e ferramentas"],
    ["contact", "contact.sh", "canais de contato & email"],
    ["pix", "support.pix", "apoie este trabalho"],
  ];

  return (
    <div className="section-content">
      <div className="indent hero-copy">
        <h1>Felipe Avila</h1>
        <h2>Lip</h2>
        <p>
          Desenvolvedor full-stack.
        </p>
      </div>
      {!profileOnly && (
        <>
          <PromptText>ls -l actions</PromptText>
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
  const projects = [
    [
      "Este portifolio",
      "https://github.com/FelipeGFA/portifolio",
      "Portfólio pessoal em React e Vite, apresentado como um terminal interativo.",
    ],
    [
      "Online Launchpad",
      "https://github.com/FelipeGFA/Launchpad",
      "Launchpad musical moderno com pads interativos, visualizador, efeitos de luz e sequenciador.",
    ],
    [
      "Hagitori Desktop",
      "https://github.com/hagitori/hagitori-desktop",
      "Downloader de mangás multiplataforma com backend Rust, Tauri e sistema extensível de scrapers.",
    ],
    [
      "Roterizador Urbano",
      "https://github.com/FelipeGFA/Roteirizador-Urbano",
      "Aplicação Flask que otimiza rotas de serviço a partir de planilhas, com mapas interativos e exportação de relatórios.",
    ],
    [
      "Kahoot Bot",
      "https://github.com/FelipeGFA/Kahoot-Bot",
      "Script Python que usa Playwright e IA para analisar perguntas e selecionar respostas no Kahoot.",
    ],
    [
      "I3 Dot Files",
      "https://github.com/FelipeGFA/I3-DOT-FILES",
      "Configurações instaláveis para um ambiente Arch Linux com i3, Polybar, Kitty, Rofi e scripts próprios.",
    ],
  ];

  return (
    <div className="section-content">
      <PromptText>cat projects.git</PromptText>
      <div className="project-list indent">
        {projects.map(([name, url, description], index) => (
          <article key={name}>
            <div>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h2>{name}</h2>
            </div>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noreferrer">
              ver repositório <ExternalLink size={13} />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
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
      <PromptText>cat stack.sys</PromptText>
      <div className="stack-grid indent">
        {items.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            <small>● ready</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="section-content">
      <PromptText>cat contact.log</PromptText>
      <div className="contact-block indent">
        <h2>Vamos conversar?</h2>
        <p>
          Tenho interesse em produtos bem pensados, sistemas claros e desafios
          que pedem curiosidade.
        </p>
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
  return (
    <div className="section-content">
      <PromptText>cat support.pix</PromptText>
      <div className="pix-block indent">
        <div>
          <h2>Gostou do trabalho?</h2>
          <p>Um café ajuda a manter os próximos projetos em movimento.</p>
          <button onClick={onCopy} className="copy-button">
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "código copiado" : "copiar chave Pix"}
          </button>
        </div>
        <img src={image} alt="QR Code Pix" />
      </div>
      <code className="pix-code">{pixKey}</code>
    </div>
  );
}
