import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowLeft,
  Home,
  FolderGit2,
  Cpu,
  Coffee,
} from "lucide-react";
import "./App.css";
import qrcodePix from "./assets/qrcode-pix.png";
import { resolveDirectory, resolveFile } from "./utils/terminalCommands";
import { useTranslation } from "./i18n/LanguageContext";
import {
  About,
  Contact,
  Pix,
  Projects,
  Stack,
} from "./components/TerminalViews";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [command, setCommand] = useState("");
  const [screenCleared, setScreenCleared] = useState(false);
  const [commandMessage, setCommandMessage] = useState("");
  const [commandOutput, setCommandOutput] = useState(null);
  const [lastCommand, setLastCommand] = useState("whoami");
  const [profileOnly, setProfileOnly] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { language, toggleLanguage, t } = useTranslation();
  const pixKey =
    "00020126580014BR.GOV.BCB.PIX01364a6f60cf-51d9-4d47-a26a-de91ee8ccdf55204000053039865802BR5901N6001C62070503***6304A262";

  useEffect(() => inputRef.current?.focus(), [activeSection]);

  const navigate = (section) => {
    if (section !== activeSection) {
      setNavigationHistory((history) => [...history, activeSection]);
    }
    setActiveSection(section);
    setCommand("");
    setScreenCleared(false);
    setCommandMessage("");
    setCommandOutput(null);
    setLastCommand(section === "about" ? "whoami" : `cat ${section}`);
    setProfileOnly(false);
  };
  const goBack = () => {
    const previousSection = navigationHistory[navigationHistory.length - 1];
    if (!previousSection) return;
    setNavigationHistory((history) => history.slice(0, -1));
    setActiveSection(previousSection);
    setCommand("");
    setScreenCleared(false);
    setCommandMessage("");
    setCommandOutput(null);
    setLastCommand(previousSection === "about" ? "whoami" : `cat ${previousSection}`);
    setProfileOnly(false);
  };
  const runCommand = (event) => {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    const [name, ...argumentsList] = value.split(/\s+/);
    const argument = argumentsList.join(" ");
    const shortcutTarget = value.match(/^[1-4]$/)
      ? ["projects", "stack", "contact", "pix"][Number(value) - 1]
      : null;

    if (!value) return;
    if (name === "clear") {
      setScreenCleared(true);
      setCommand("");
      setCommandMessage("");
      setCommandOutput(null);
      return;
    }
    setScreenCleared(false);
    setCommandMessage("");
    setCommandOutput(null);
    if (name === "whoami") {
      setActiveSection("about");
      setLastCommand("whoami");
      setProfileOnly(true);
      setCommand("");
      return;
    }
    if (name === "ls") {
      setLastCommand("ls");
      setCommandOutput(t("terminal.directories"));
      setCommand("");
      return;
    }
    if (name === "help") return navigate("about");
    if (shortcutTarget) return navigate(shortcutTarget);
    if (name === "cd") {
      const target = resolveDirectory(argument || "~");
      if (target) return navigate(target);
      setCommandMessage(
        t("terminal.errorDirectory", { value: argument || "" }),
      );
      setCommand("");
      return;
    }
    if (name === "cat") {
      const target = resolveFile(argument);
      if (target) return navigate(target);
      setCommandMessage(t("terminal.errorFile", { value: argument || "" }));
      setCommand("");
      return;
    }
    setCommandMessage(`${name}: ${t("terminal.errorCommand")}`);
    setCommand("");
  };
  const copyPix = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="terminal-app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-line">
            <span className="prompt-label">
              <b>guest@dev</b>
              <em>:</em>
              <strong>~/portfolio</strong>
            </span>
          </div>
          <nav className="mouse-nav" aria-label={t("navigation.aria")}>
            <button type="button" onClick={goBack} disabled={!navigationHistory.length} title={t("navigation.back")}>
              <ArrowLeft size={15} />
            </button>
            <button type="button" onClick={() => navigate("about")} title={t("navigation.home")}>
              <Home size={15} />
            </button>
            <button type="button" onClick={() => navigate("projects")} title={t("navigation.projects")}>
              <FolderGit2 size={15} />
            </button>
            <button type="button" onClick={() => navigate("stack")} title={t("navigation.stack")}>
              <Cpu size={15} />
            </button>
            <button type="button" onClick={() => navigate("contact")} title={t("navigation.contact")}>
              <Mail size={15} />
            </button>
            <button type="button" onClick={() => navigate("pix")} title={t("navigation.pix")}>
              <Coffee size={15} />
            </button>
            <button
              type="button"
              className="language-switch"
              onClick={toggleLanguage}
              title={t("navigation.language")}
              aria-label={t("navigation.language")}
            >
              {language === "pt" ? "EN" : "PT"}
            </button>
          </nav>
        </div>
      </header>
      <main className="page-shell">
        <section className="terminal-window">
          <div className="window-bar">
            <div className="window-title">
              <span className="traffic-lights">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
          <div className="terminal-body">
            <div className="terminal-content">
              {!screenCleared && (
                <>
                  <div className="command-line">
                    <span>guest@terminal</span>
                    <b>:</b>
                    <strong>~</strong>
                    <i>$</i>
                    <span className="typed">
                      {lastCommand}
                    </span>
                  </div>
                  {commandOutput ? (
                    <p className="terminal-output">{commandOutput}</p>
                  ) : (
                    <>
                      {activeSection === "about" && (
                        <About onNavigate={navigate} profileOnly={profileOnly} />
                      )}
                      {activeSection === "projects" && <Projects />}
                      {activeSection === "stack" && <Stack />}
                      {activeSection === "contact" && <Contact />}
                      {activeSection === "pix" && (
                        <Pix
                          pixKey={pixKey}
                          copied={copied}
                          onCopy={copyPix}
                          image={qrcodePix}
                        />
                      )}
                    </>
                  )}
                  {commandMessage && (
                    <p className="terminal-message">{commandMessage}</p>
                  )}
                </>
              )}
              <form className="command-line input-line" onSubmit={runCommand}>
                <span>guest@terminal</span>
                <b>:</b>
                <strong>~</strong>
                <i>$</i>
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  aria-label={t("terminal.inputLabel")}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </section>
      </main>
      <div className="social-bar">
        <a href="https://github.com/FelipeGFA" target="_blank" rel="noreferrer">
          <Github size={13} /> gh/dev
        </a>
        <a href="https://www.linkedin.com/in/felipegfa" target="_blank" rel="noreferrer">
          <Linkedin size={13} /> in/dev
        </a>
      </div>
    </div>
  );
}

export default App;
