/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  pt: {
    navigation: {
      aria: "Navegação do portfólio",
      back: "Voltar",
      language: "Mudar para inglês",
      theme: "Mudar tema de cores",
      tabs: {
        about: "Início",
        projects: "Projetos",
        stack: "Habilidades",
        contact: "Contato",
        pix: "Apoiar",
      },
    },
    paths: {
      about: "~",
      projects: "~/projetos",
      stack: "~/habilidades",
      contact: "~/contato",
      pix: "~/apoiar",
    },
    commands: {
      about: "whoami",
      projects: "ls -l ./projetos",
      stack: "tree ./habilidades",
      contact: "cat ./contato.txt",
      pix: "cat ./apoiar-pix.txt",
    },
    terminal: {
      sessionUser: "visitor@felipe",
      inputLabel: "Comando do terminal",
      placeholder: 'clique nas abas acima ou digite "ajuda", "projetos"...',
      clearedHint:
        '# tela limpa — digite "ajuda" ou clique em qualquer aba acima para voltar',
      errorCommand:
        'bash: {cmd}: comando não encontrado — digite "ajuda" ou clique nas abas acima',
      errorDirectory:
        'bash: cd: {value}: diretório não encontrado — digite "ls" para ver os diretórios',
      errorFile:
        'bash: cat: {value}: arquivo não encontrado — digite "ls" para ver as opções',
      tabHint: "[Tab]",
      lsComment:
        "# Diretórios disponíveis (clique para abrir ou digite cd <nome>):",
      lsItems: [
        {
          section: "about",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "inicio/",
          summary: "apresentação e menu principal",
        },
        {
          section: "projects",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "projetos/",
          summary: "aplicações web, desktop e automações",
        },
        {
          section: "stack",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "habilidades/",
          summary: "tecnologias organizadas por função",
        },
        {
          section: "contact",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "contato/",
          summary: "e-mail direto, GitHub e LinkedIn",
        },
        {
          section: "pix",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "apoiar/",
          summary: "QR Code e chave Pix",
        },
      ],
      pwdHint: "# Você está no diretório atual da sessão.",
      openingUrl: "# Abrindo {label} em uma nova aba...",
      themeListComment:
        "# Temas disponíveis — clique ou digite theme <nome>:",
      themeChanged: "# Tema alterado para {name}.",
      errorTheme:
        'bash: theme: "{value}" não encontrado — digite "theme" para listar',
      activeTag: "[ativo]",
    },
    profile: {
      name: "Felipe Avila",
      role: "Desenvolvedor Full-Stack",
      description:
        "Desenvolvo sites, sistemas web completos e automações do zero, além de explorar cibersegurança e engenharia reversa.",
      openAction: "abrir →",
      menuItems: [
        {
          section: "projects",
          key: "2",
          title: "Projetos",
          description: "Aplicações web, desktop e automações com código aberto",
        },
        {
          section: "stack",
          key: "3",
          title: "Habilidades",
          description: "Tecnologias que uso no dia a dia organizadas por área",
        },
        {
          section: "contact",
          key: "4",
          title: "Contato",
          description: "E-mail direto, GitHub e LinkedIn para conversarmos",
        },
        {
          section: "pix",
          key: "5",
          title: "Apoiar",
          description: "QR Code e chave Pix para apoiar novos projetos",
        },
      ],
    },
    projects: {
      introComment:
        "# Projetos reais em código aberto — clique em qualquer link para ver o repositório.",
      listHeader: "projetos",
      repository: "Ver código no GitHub",
      stackLabel: "tecnologias",
      previewAlt: "Prévia do projeto {name}",
      closePreview: "Fechar",
      backHome: "Voltar ao início",
      nextSection: "Ver habilidades",
      items: [
        {
          id: "portfolio",
          name: "Este Portfólio",
          tag: "Web",
          url: "https://github.com/FelipeGFA/portifolio",
          description:
            "Portfólio interativo construído como um terminal Linux funcional, acessível tanto por cliques quanto por comandos bash.",
          tech: ["React", "Vite", "Tailwind CSS", "GSAP"],
        },
        {
          id: "launchpad",
          name: "Online Launchpad",
          tag: "Web",
          url: "https://github.com/FelipeGFA/Launchpad",
          description:
            "Mesa musical interativa no navegador com pads responsivos, visualizador de áudio, efeitos visuais e sequenciador.",
          tech: ["React", "Web Audio", "JavaScript"],
        },
        {
          id: "hagitori",
          name: "Hagitori Desktop",
          tag: "Desktop",
          url: "https://github.com/hagitori/hagitori-desktop",
          description:
            "Aplicativo multiplataforma para download de mangás com interface rápida e sistema extensível de fontes.",
          tech: ["Rust", "Tauri", "TypeScript"],
        },
      ],
    },
    stack: {
      introComment:
        "# Ferramentas organizadas por função — para facilitar a leitura mesmo fora da área técnica.",
      statusOk: "[OK]",
      backHome: "Voltar ao início",
      nextSection: "Ver projetos",
      groups: [
        {
          code: "01",
          title: "INTERFACES & SITES (Frontend)",
          items: [
            { name: "React", role: "interfaces web interativas" },
            { name: "TypeScript", role: "código JavaScript tipado" },
            { name: "JavaScript", role: "lógica e interatividade web" },
            { name: "Tailwind CSS", role: "estilização rápida e responsiva" },
            { name: "Vite", role: "build moderno e leve" },
          ],
        },
        {
          code: "02",
          title: "SISTEMAS & AUTOMAÇÃO (Backend)",
          items: [
            { name: "Node.js", role: "servidores e APIs web" },
            { name: "Python", role: "automação, scripts e dados" },
            { name: "Java", role: "aplicações corporativas e APIs" },
            { name: "Kotlin", role: "desenvolvimento moderno na JVM" },
          ],
        },
        {
          code: "03",
          title: "FERRAMENTAS & AMBIENTE",
          items: [
            { name: "Git", role: "controle de versão de código" },
            { name: "Linux / Bash", role: "ambiente e scripts de terminal" },
          ],
        },
      ],
    },
    contact: {
      introComment: "# Canais diretos para projetos, vagas ou parcerias.",
      title: "Vamos conversar?",
      subtitle:
        "Prefere mandar um e-mail direto ou chamar pelas redes? Escolha o canal mais prático abaixo.",
      emailLabel: "E-mail",
      sendEmail: "Enviar e-mail",
      copyEmail: "Copiar e-mail",
      emailCopied: "E-mail copiado",
      openProfile: "Abrir perfil",
      backHome: "Voltar ao início",
    },
    pix: {
      introComment:
        "# Apoio opcional via Pix — escaneie o QR Code ou copie a chave abaixo.",
      title: "Gostou do trabalho?",
      description:
        "Um café ajuda a manter novos projetos abertos e experimentos em movimento.",
      copy: "Copiar chave Pix",
      copied: "Chave copiada",
      codeLabel: "Pix Copia e Cola",
      qrAlt: "QR Code Pix para apoiar Felipe Avila",
      backHome: "Voltar ao início",
    },
    help: {
      introComment:
        "# Comandos disponíveis — clique em qualquer comando abaixo ou digite no terminal:",
      commands: [
        { cmd: "inicio", desc: "Volta para a tela inicial de apresentação" },
        { cmd: "projetos", desc: "Lista os projetos publicados no GitHub" },
        { cmd: "habilidades", desc: "Mostra as tecnologias organizadas por área" },
        { cmd: "contato", desc: "Exibe e-mail direto, GitHub e LinkedIn" },
        { cmd: "apoiar", desc: "Abre o QR Code e a chave Pix" },
        { cmd: "whoami", desc: "Exibe apenas o resumo de perfil" },
        { cmd: "ls", desc: "Lista os diretórios navegáveis da sessão" },
        { cmd: "pwd", desc: "Mostra o caminho do diretório atual" },
        { cmd: "neofetch", desc: "Exibe o resumo do ambiente do portfólio" },
        { cmd: "open github", desc: "Abre o perfil no GitHub em nova aba" },
        { cmd: "open linkedin", desc: "Abre o perfil no LinkedIn em nova aba" },
        { cmd: "theme", desc: "Lista e troca os temas de cores do terminal" },
        { cmd: "en", desc: "Alterna o idioma do terminal para inglês" },
        { cmd: "clear", desc: "Limpa a saída atual do terminal" },
      ],
    },
    neofetch: {
      introComment: "# Informações da sessão e do portfólio",
      themeLabel: "Tema",
      rows: [
        ["Usuário", "Felipe Avila"],
        ["Atuação", "Desenvolvedor Full-Stack"],
        ["Stack UI", "React · Vite · Tailwind CSS v4 · GSAP"],
        ["Foco", "Web, Sistemas, Automação & AppSec/RE"],
        ["Idioma", "Português (PT-BR)"],
      ],
    },
  },
  en: {
    navigation: {
      aria: "Portfolio navigation",
      back: "Back",
      language: "Switch to Portuguese",
      theme: "Switch color theme",
      tabs: {
        about: "Home",
        projects: "Projects",
        stack: "Skills",
        contact: "Contact",
        pix: "Support",
      },
    },
    paths: {
      about: "~",
      projects: "~/projects",
      stack: "~/skills",
      contact: "~/contact",
      pix: "~/support",
    },
    commands: {
      about: "whoami",
      projects: "ls -l ./projects",
      stack: "tree ./skills",
      contact: "cat ./contact.txt",
      pix: "cat ./support-pix.txt",
    },
    terminal: {
      sessionUser: "visitor@felipe",
      inputLabel: "Terminal command",
      placeholder: 'click the tabs above or type "help", "projects"...',
      clearedHint:
        '# screen cleared — type "help" or click any tab above to return',
      errorCommand:
        'bash: {cmd}: command not found — type "help" or click the tabs above',
      errorDirectory:
        'bash: cd: {value}: no such directory — type "ls" to list directories',
      errorFile:
        'bash: cat: {value}: no such file — type "ls" to see available options',
      tabHint: "[Tab]",
      lsComment:
        "# Available directories (click to open or type cd <name>):",
      lsItems: [
        {
          section: "about",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "home/",
          summary: "introduction and main menu",
        },
        {
          section: "projects",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "projects/",
          summary: "web apps, desktop software, and automations",
        },
        {
          section: "stack",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "skills/",
          summary: "technologies grouped by purpose",
        },
        {
          section: "contact",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "contact/",
          summary: "direct email, GitHub, and LinkedIn",
        },
        {
          section: "pix",
          permissions: "drwxr-xr-x",
          owner: "felipe",
          name: "support/",
          summary: "Pix QR Code and copy-paste key",
        },
      ],
      pwdHint: "# Current session working directory.",
      openingUrl: "# Opening {label} in a new tab...",
      themeListComment:
        "# Available themes — click or type theme <name>:",
      themeChanged: "# Theme switched to {name}.",
      errorTheme:
        'bash: theme: "{value}" not found — type "theme" to list available themes',
      activeTag: "[active]",
    },
    profile: {
      name: "Felipe Avila",
      role: "Full-Stack Developer",
      description:
        "I build websites, full-stack web applications, and automations from scratch to production — while exploring cybersecurity and reverse engineering.",
      openAction: "open →",
      menuItems: [
        {
          section: "projects",
          key: "2",
          title: "Projects",
          description: "Open-source web apps, desktop tools, and automations",
        },
        {
          section: "stack",
          key: "3",
          title: "Skills",
          description: "Technologies I work with grouped by role",
        },
        {
          section: "contact",
          key: "4",
          title: "Contact",
          description: "Direct email, GitHub, and LinkedIn to reach out",
        },
        {
          section: "pix",
          key: "5",
          title: "Support",
          description: "Pix QR Code and key to support future projects",
        },
      ],
    },
    projects: {
      introComment:
        "# Open-source projects — click any link to inspect the repository.",
      listHeader: "projects",
      repository: "View code on GitHub",
      stackLabel: "tech",
      previewAlt: "Preview of {name}",
      closePreview: "Close",
      backHome: "Back to home",
      nextSection: "View skills",
      items: [
        {
          id: "portfolio",
          name: "This Portfolio",
          tag: "Web",
          url: "https://github.com/FelipeGFA/portifolio",
          description:
            "Interactive portfolio designed like a real Linux terminal, easy to explore by clicking or typing bash commands.",
          tech: ["React", "Vite", "Tailwind CSS", "GSAP"],
        },
        {
          id: "launchpad",
          name: "Online Launchpad",
          tag: "Web",
          url: "https://github.com/FelipeGFA/Launchpad",
          description:
            "Browser-based musical launchpad featuring interactive pads, audio visualizer, lighting effects, and a sequencer.",
          tech: ["React", "Web Audio", "JavaScript"],
        },
        {
          id: "hagitori",
          name: "Hagitori Desktop",
          tag: "Desktop",
          url: "https://github.com/hagitori/hagitori-desktop",
          description:
            "Cross-platform manga downloader built for speed with an extensible scraper plugin architecture.",
          tech: ["Rust", "Tauri", "TypeScript"],
        },
      ],
    },
    stack: {
      introComment:
        "# Tools grouped by purpose — easy to scan even without a technical background.",
      statusOk: "[OK]",
      backHome: "Back to home",
      nextSection: "View projects",
      groups: [
        {
          code: "01",
          title: "INTERFACES & WEBSITES (Frontend)",
          items: [
            { name: "React", role: "interactive web interfaces" },
            { name: "TypeScript", role: "typed JavaScript code" },
            { name: "JavaScript", role: "web logic and interactivity" },
            { name: "Tailwind CSS", role: "fast responsive styling" },
            { name: "Vite", role: "modern lightweight bundler" },
          ],
        },
        {
          code: "02",
          title: "SYSTEMS & AUTOMATION (Backend)",
          items: [
            { name: "Node.js", role: "servers and web APIs" },
            { name: "Python", role: "automation, scripts, and data" },
            { name: "Java", role: "enterprise apps and APIs" },
            { name: "Kotlin", role: "modern JVM development" },
          ],
        },
        {
          code: "03",
          title: "TOOLS & ENVIRONMENT",
          items: [
            { name: "Git", role: "code version control" },
            { name: "Linux / Bash", role: "terminal environment and scripts" },
          ],
        },
      ],
    },
    contact: {
      introComment:
        "# Direct channels for projects, job opportunities, or collaborations.",
      title: "Let's talk?",
      subtitle:
        "Prefer sending a direct email or reaching out on social platforms? Choose the easiest option below.",
      emailLabel: "Email",
      sendEmail: "Send email",
      copyEmail: "Copy email",
      emailCopied: "Email copied",
      openProfile: "Open profile",
      backHome: "Back to home",
    },
    pix: {
      introComment:
        "# Optional support via Pix — scan the QR Code or copy the key below.",
      title: "Enjoyed the work?",
      description:
        "A coffee helps keep new open-source projects and experiments moving forward.",
      copy: "Copy Pix key",
      copied: "Key copied",
      codeLabel: "Pix Copy & Paste",
      qrAlt: "Pix QR Code to support Felipe Avila",
      backHome: "Back to home",
    },
    help: {
      introComment:
        "# Available commands — click any command below or type it in the terminal:",
      commands: [
        { cmd: "home", desc: "Return to the main introduction view" },
        { cmd: "projects", desc: "List open-source projects on GitHub" },
        { cmd: "skills", desc: "Show technologies grouped by purpose" },
        { cmd: "contact", desc: "Show direct email, GitHub, and LinkedIn" },
        { cmd: "support", desc: "Open the Pix QR Code and key" },
        { cmd: "whoami", desc: "Show only the profile summary" },
        { cmd: "ls", desc: "List navigable directories in the session" },
        { cmd: "pwd", desc: "Print the current working directory" },
        { cmd: "neofetch", desc: "Show portfolio environment details" },
        { cmd: "open github", desc: "Open GitHub profile in a new tab" },
        { cmd: "open linkedin", desc: "Open LinkedIn profile in a new tab" },
        { cmd: "theme", desc: "List and switch terminal color themes" },
        { cmd: "pt", desc: "Switch terminal language to Portuguese" },
        { cmd: "clear", desc: "Clear current terminal output" },
      ],
    },
    neofetch: {
      introComment: "# Session and portfolio environment info",
      themeLabel: "Theme",
      rows: [
        ["User", "Felipe Avila"],
        ["Role", "Full-Stack Developer"],
        ["UI Stack", "React · Vite · Tailwind CSS v4 · GSAP"],
        ["Focus", "Web, Systems, Automation & AppSec/RE"],
        ["Language", "English (EN)"],
      ],
    },
  },
};

const LanguageContext = createContext(null);

function getValue(dictionary, path) {
  return path.split(".").reduce((value, key) => value?.[key], dictionary) ?? path;
}

function readStoredLanguage() {
  try {
    const saved = localStorage.getItem("portfolio-language");
    return saved === "en" || saved === "pt" ? saved : "pt";
  } catch {
    return "pt";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "pt" ? "en" : "pt")),
      t: (path, variables = {}) => {
        const raw = getValue(translations[language], path);
        if (typeof raw !== "string") return raw;
        return Object.entries(variables).reduce(
          (text, [key, replacement]) =>
            text.replace(`{${key}}`, String(replacement)),
          raw,
        );
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
