/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const translations = {
  pt: {
    navigation: {
      aria: "Navegação do portfólio",
      back: "Voltar",
      home: "Início",
      projects: "Projetos",
      stack: "Tecnologias",
      contact: "Contato",
      pix: "Apoie o trabalho",
      language: "Mudar para inglês",
    },
    terminal: {
      inputLabel: "Comando do terminal",
      errorCommand: "comando não encontrado",
      errorDirectory: "cd: diretório não encontrado: {value}",
      errorFile: "cat: arquivo não encontrado: {value}",
      directories: "projects/    stack/    contact/    pix/",
      actions: "ls -l actions",
    },
    profile: {
      name: "Felipe Avila",
      role: "Desenvolvedor full-stack.",
      description: "Sou dev full-stack apaixonado por tecnologia, as vezes mexo com cibersegurança e engenharia reversa.",
    },
    actions: {
      projects: "repositórios e projetos",
      stack: "tecnologias e ferramentas",
      contact: "canais de contato & email",
      pix: "apoie este trabalho",
    },
    projects: {
      command: "cat projects.git",
      portfolioName: "Este portifolio",
      routerName: "Roteirizador Urbano",
      portfolio: "Portfólio pessoal em React e Vite, apresentado como um terminal interativo.",
      launchpad: "Launchpad musical moderno com pads interativos, visualizador, efeitos de luz e sequenciador.",
      hagitori: "Downloader de mangás multiplataforma com backend Rust, Tauri e sistema extensível de scrapers.",
      router: "Aplicação Flask que otimiza rotas de serviço a partir de planilhas, com mapas interativos e exportação de relatórios.",
      kahoot: "Script Python que usa Playwright e IA para analisar perguntas e selecionar respostas no Kahoot.",
      dotfiles: "Configurações instaláveis para um ambiente Arch Linux com i3, Polybar, Kitty, Rofi e scripts próprios.",
      repository: "ver repositório",
    },
    stack: { command: "cat stack.sys", ready: "● pronto" },
    contact: {
      command: "cat contact.log",
      title: "Vamos conversar?",
    },
    pix: {
      command: "cat support.pix",
      title: "Gostou do trabalho?",
      description: "Um café ajuda a manter os próximos projetos em movimento.",
      copied: "código copiado",
      copy: "copiar chave Pix",
    },
  },
  en: {
    navigation: {
      aria: "Portfolio navigation",
      back: "Back",
      home: "Home",
      projects: "Projects",
      stack: "Technologies",
      contact: "Contact",
      pix: "Support the work",
      language: "Switch to Portuguese",
    },
    terminal: {
      inputLabel: "Terminal command",
      errorCommand: "command not found",
      errorDirectory: "cd: directory not found: {value}",
      errorFile: "cat: file not found: {value}",
      directories: "projects/    stack/    contact/    pix/",
      actions: "ls -l actions",
    },
    profile: {
      name: "Felipe Avila",
      role: "Full-stack developer.",
      description: "I am a full-stack developer passionate about technology, sometimes I explore cybersecurity and reverse engineering.",
    },
    actions: {
      projects: "repositories and projects",
      stack: "technologies and tools",
      contact: "contact channels and email",
      pix: "support this work",
    },
    projects: {
      command: "cat projects.git",
      portfolioName: "This portfolio",
      routerName: "Urban Route Optimizer",
      portfolio: "Personal portfolio built with React and Vite, presented as an interactive terminal.",
      launchpad: "Modern music launchpad with interactive pads, visualizer, light effects, and sequencer.",
      hagitori: "Cross-platform manga downloader with a Rust backend, Tauri, and an extensible scraper system.",
      router: "Flask application that optimizes service routes from spreadsheets, with interactive maps and report exports.",
      kahoot: "Python script using Playwright and AI to analyze questions and select answers in Kahoot.",
      dotfiles: "Installable configuration for an Arch Linux environment with i3, Polybar, Kitty, Rofi, and custom scripts.",
      repository: "view repository",
    },
    stack: { command: "cat stack.sys", ready: "● ready" },
    contact: {
      command: "cat contact.log",
      title: "Let's talk?",
    },
    pix: {
      command: "cat support.pix",
      title: "Enjoyed the work?",
      description: "A coffee helps keep the next projects moving.",
      copied: "code copied",
      copy: "copy Pix key",
    },
  },
};

const LanguageContext = createContext(null);

function getValue(dictionary, path) {
  return path.split(".").reduce((value, key) => value?.[key], dictionary) ?? path;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("portfolio-language") || "pt");

  const value = useMemo(() => ({
    language,
    toggleLanguage: () => setLanguage((current) => current === "pt" ? "en" : "pt"),
    t: (path, variables = {}) => Object.entries(variables).reduce(
      (text, [key, replacement]) => text.replace(`{${key}}`, replacement),
      getValue(translations[language], path),
    ),
  }), [language]);

  localStorage.setItem("portfolio-language", language);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  return useContext(LanguageContext);
}
