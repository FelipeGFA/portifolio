import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Github, Linkedin, Terminal } from "lucide-react";
import qrcodePix from "./assets/qrcode-pix.png";
import { PROJECT_PREVIEWS, preloadImages } from "./utils/projectPreviews";
import { gsap, useGSAP } from "./utils/gsapConfig";
import {
  applyTheme,
  getNextThemeId,
  getThemeById,
  readStoredTheme,
  resolveTheme,
} from "./utils/themes";
import {
  SECTIONS,
  SECTION_KEYS,
  getCommandSuggestions,
  resolveDirectory,
  resolveFile,
  resolveSection,
} from "./utils/terminalCommands";
import { useTranslation } from "./i18n/LanguageContext";
import {
  About,
  Contact,
  HelpOutput,
  LsOutput,
  NeofetchOutput,
  Pix,
  Projects,
  Stack,
  ThemeOutput,
} from "./components/TerminalViews";

const EMAIL_ADDRESS = "felipegabriel.avila6@gmail.com";
const GITHUB_URL = "https://github.com/FelipeGFA";
const LINKEDIN_URL = "https://www.linkedin.com/in/felipegfa";
const PIX_KEY =
  "00020126580014BR.GOV.BCB.PIX01364a6f60cf-51d9-4d47-a26a-de91ee8ccdf55204000053039865802BR5901N6001C62070503***6304A262";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [themeId, setThemeId] = useState(readStoredTheme);
  const [command, setCommand] = useState("");
  const [screenCleared, setScreenCleared] = useState(false);
  const [commandMessage, setCommandMessage] = useState("");
  const [commandView, setCommandView] = useState(null);
  const [commandOverride, setCommandOverride] = useState(null);
  const [profileOnly, setProfileOnly] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [executionId, setExecutionId] = useState(0);
  const [errorTick, setErrorTick] = useState(0);

  const appScopeRef = useRef(null);
  const bodyRef = useRef(null);
  const outputRef = useRef(null);
  const typedCmdRef = useRef(null);
  const errorRef = useRef(null);
  const inputRef = useRef(null);

  const { language, setLanguage, toggleLanguage, t } = useTranslation();

  const currentTheme = useMemo(() => getThemeById(themeId), [themeId]);
  const currentPath = t(`paths.${activeSection}`);
  const displayedCommand = commandOverride ?? t(`commands.${activeSection}`);

  const suggestion = useMemo(
    () => getCommandSuggestions(command)[0] ?? "",
    [command],
  );
  const suggestionSuffix =
    suggestion &&
    suggestion.startsWith(command.trimStart().toLowerCase()) &&
    command.trimStart().length > 0
      ? suggestion.slice(command.trimStart().length)
      : "";

  const scrollBodyToTop = () => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  const navigate = useCallback(
    (section) => {
      if (section !== activeSection) {
        setNavigationHistory((history) => [...history, activeSection]);
      }
      setActiveSection(section);
      setCommand("");
      setScreenCleared(false);
      setCommandMessage("");
      setCommandView(null);
      setCommandOverride(null);
      setProfileOnly(false);
      setHistoryIndex(-1);
      setExecutionId((id) => id + 1);
      scrollBodyToTop();
    },
    [activeSection],
  );

  const goBack = () => {
    const previousSection = navigationHistory[navigationHistory.length - 1];
    if (!previousSection) return;
    setNavigationHistory((history) => history.slice(0, -1));
    setActiveSection(previousSection);
    setCommand("");
    setScreenCleared(false);
    setCommandMessage("");
    setCommandView(null);
    setCommandOverride(null);
    setProfileOnly(false);
    setHistoryIndex(-1);
    setExecutionId((id) => id + 1);
    scrollBodyToTop();
  };

  const executeCommand = (rawInput) => {
    const raw = rawInput.trim();
    if (!raw) return;

    const normalized = raw.toLowerCase();
    const [name, ...argumentsList] = normalized.split(/\s+/);
    const argument = argumentsList.join(" ");

    setCommandHistory((history) => [...history, raw]);
    setHistoryIndex(-1);
    setCommand("");

    if (name === "clear" || name === "cls") {
      setScreenCleared(true);
      setCommandMessage("");
      setCommandView(null);
      return;
    }

    if (name === "whoami") {
      setActiveSection("about");
      setScreenCleared(false);
      setCommandMessage("");
      setCommandView(null);
      setCommandOverride(raw);
      setProfileOnly(true);
      setExecutionId((id) => id + 1);
      scrollBodyToTop();
      return;
    }

    if (name === "ls") {
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({ type: "ls" });
      setProfileOnly(false);
      setExecutionId((id) => id + 1);
      scrollBodyToTop();
      return;
    }

    if (name === "pwd") {
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({
        type: "text",
        text: `${currentPath}\n${t("terminal.pwdHint")}`,
      });
      setExecutionId((id) => id + 1);
      return;
    }

    if (name === "help" || name === "ajuda" || name === "?") {
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({ type: "help" });
      setExecutionId((id) => id + 1);
      scrollBodyToTop();
      return;
    }

    if (name === "neofetch" || name === "fetch") {
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({ type: "neofetch" });
      setExecutionId((id) => id + 1);
      scrollBodyToTop();
      return;
    }

    if (name === "theme" || name === "tema") {
      if (!argument) {
        setScreenCleared(false);
        setCommandMessage("");
        setCommandOverride(raw);
        setCommandView({ type: "themes" });
        setExecutionId((id) => id + 1);
        scrollBodyToTop();
        return;
      }

      const matchedTheme = resolveTheme(argument);
      if (matchedTheme) {
        setThemeId(matchedTheme.id);
        setScreenCleared(false);
        setCommandMessage("");
        setCommandOverride(raw);
        setCommandView({
          type: "text",
          text: t("terminal.themeChanged", { name: matchedTheme.label }),
        });
        setExecutionId((id) => id + 1);
        return;
      }

      setCommandMessage(t("terminal.errorTheme", { value: argument }));
      setErrorTick((tick) => tick + 1);
      return;
    }

    if (name === "pt" || name === "en") {
      setLanguage(name);
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setExecutionId((id) => id + 1);
      return;
    }

    if (name === "lang" || name === "idioma") {
      toggleLanguage();
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setExecutionId((id) => id + 1);
      return;
    }

    if (normalized === "open github" || name === "github") {
      window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({
        type: "text",
        text: t("terminal.openingUrl", { label: "GitHub" }),
      });
      setExecutionId((id) => id + 1);
      return;
    }

    if (normalized === "open linkedin" || name === "linkedin") {
      window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
      setScreenCleared(false);
      setCommandMessage("");
      setCommandOverride(raw);
      setCommandView({
        type: "text",
        text: t("terminal.openingUrl", { label: "LinkedIn" }),
      });
      setExecutionId((id) => id + 1);
      return;
    }

    if (SECTION_KEYS[normalized]) {
      navigate(SECTION_KEYS[normalized]);
      return;
    }

    if (name === "cd") {
      const target = resolveDirectory(argument || "~");
      if (target) {
        navigate(target);
        return;
      }
      setCommandMessage(
        t("terminal.errorDirectory", { value: argument || "" }),
      );
      setErrorTick((tick) => tick + 1);
      return;
    }

    if (name === "cat") {
      const target = resolveFile(argument);
      if (target) {
        navigate(target);
        return;
      }
      setCommandMessage(t("terminal.errorFile", { value: argument || "" }));
      setErrorTick((tick) => tick + 1);
      return;
    }

    const directTarget = resolveSection(normalized);
    if (directTarget) {
      navigate(directTarget);
      return;
    }

    setCommandMessage(t("terminal.errorCommand", { cmd: name }));
    setErrorTick((tick) => tick + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    executeCommand(command);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Tab" && suggestion) {
      event.preventDefault();
      setCommand(suggestion);
      return;
    }

    if (event.key === "ArrowUp") {
      if (!commandHistory.length) return;
      event.preventDefault();
      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      if (historyIndex === -1) return;
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCommand("");
      } else {
        setHistoryIndex(nextIndex);
        setCommand(commandHistory[nextIndex]);
      }
    }
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-secure context.
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-secure context.
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const targetTag = event.target?.tagName;
      const isTyping =
        targetTag === "INPUT" ||
        targetTag === "TEXTAREA" ||
        event.target?.isContentEditable;

      if (event.key === "Escape") {
        setCommandMessage("");
        if (isTyping) event.target.blur();
        return;
      }

      if (isTyping) return;

      if (SECTION_KEYS[event.key]) {
        event.preventDefault();
        navigate(SECTION_KEYS[event.key]);
        return;
      }

      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [navigate]);

  useEffect(() => {
    const urls = [...Object.values(PROJECT_PREVIEWS), qrcodePix];
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => preloadImages(urls), {
        timeout: 1000,
      });
      return () => window.cancelIdleCallback(idleId);
    }
    const timerId = window.setTimeout(() => preloadImages(urls), 150);
    return () => window.clearTimeout(timerId);
  }, []);

  useGSAP(
    () => {
      if (screenCleared) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          const scrambleTargets = outputRef.current
            ? outputRef.current.querySelectorAll('[data-gsap="scramble"]')
            : [];

          if (reduceMotion) {
            if (typedCmdRef.current) {
              typedCmdRef.current.textContent = displayedCommand;
            }
            scrambleTargets.forEach((el) => {
              el.textContent = el.dataset.text || el.textContent;
            });
            return;
          }

          if (typedCmdRef.current) {
            gsap.fromTo(
              typedCmdRef.current,
              { text: { value: "" } },
              {
                text: { value: displayedCommand },
                duration: 0.22,
                ease: "none",
              },
            );
          }

          const revealTargets = outputRef.current
            ? outputRef.current.querySelectorAll('[data-gsap="reveal"]')
            : [];
          if (revealTargets.length) {
            gsap.fromTo(
              revealTargets,
              { opacity: 0, y: 6 },
              {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.035,
                ease: "power2.out",
                clearProps: "transform,opacity",
              },
            );
          }

          scrambleTargets.forEach((el) => {
            const finalText = el.dataset.text || el.textContent || "";
            gsap.killTweensOf(el);
            gsap.to(el, {
              duration: 0.34,
              scrambleText: {
                text: finalText,
                chars: "░▒▓/\\<>+=*#",
                speed: 0.5,
                revealDelay: 0.04,
              },
            });
          });
        },
      );
    },
    {
      scope: appScopeRef,
      dependencies: [executionId, displayedCommand, screenCleared],
    },
  );

  useGSAP(
    () => {
      if (!errorTick || !errorRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          errorRef.current,
          { x: 0 },
          {
            keyframes: [{ x: -5 }, { x: 5 }, { x: -3 }, { x: 2 }, { x: 0 }],
            duration: 0.22,
            ease: "power1.inOut",
            clearProps: "transform",
          },
        );
      });
    },
    { scope: appScopeRef, dependencies: [errorTick] },
  );

  return (
    <div
      ref={appScopeRef}
      className="flex min-h-[100dvh] flex-col bg-[var(--outer-bg)] p-0 sm:p-2"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col border-0 bg-[var(--bg)] sm:border sm:border-[var(--border)]">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4">
            <div className="flex min-w-0 items-center gap-2 text-xs sm:text-[13px]">
              <Terminal size={14} className="shrink-0 text-[var(--accent)]" />
              <span className="truncate">
                <span className="font-semibold text-[var(--accent)]">
                  {t("terminal.sessionUser")}
                </span>
                <span className="text-[var(--dim)]">:</span>
                <span className="font-medium text-[var(--cyan)]">
                  {currentPath}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goBack}
                disabled={!navigationHistory.length}
                title={t("navigation.back")}
                aria-label={t("navigation.back")}
                className="inline-flex h-7 cursor-pointer items-center gap-1 border border-[var(--border)] bg-[var(--bg)] px-2 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft size={13} />
                <span className="hidden sm:inline">{t("navigation.back")}</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeId((current) => getNextThemeId(current))}
                title={t("navigation.theme")}
                aria-label={`${t("navigation.theme")}: ${currentTheme.label}`}
                className="inline-flex h-7 cursor-pointer items-center gap-1.5 border border-[var(--border)] bg-[var(--bg)] px-2 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 shrink-0 bg-[var(--accent)]"
                />
                <span className="hidden text-[var(--dim)] sm:inline">:theme</span>
                <span className="text-[var(--text)]">{currentTheme.label}</span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                title={t("navigation.language")}
                aria-label={t("navigation.language")}
                className="inline-flex h-7 cursor-pointer items-center gap-1 border border-[var(--border)] bg-[var(--bg)] px-2 text-xs font-semibold"
              >
                <span
                  className={
                    language === "pt"
                      ? "text-[var(--accent)]"
                      : "text-[var(--dim)]"
                  }
                >
                  PT
                </span>
                <span className="text-[var(--dim)]">|</span>
                <span
                  className={
                    language === "en"
                      ? "text-[var(--accent)]"
                      : "text-[var(--dim)]"
                  }
                >
                  EN
                </span>
              </button>
            </div>
          </div>

          <nav
            aria-label={t("navigation.aria")}
            className="flex flex-wrap items-center gap-1 border-t border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 sm:px-4"
          >
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id && !commandView;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => navigate(section.id)}
                  onMouseEnter={
                    section.id === "projects"
                      ? () => preloadImages()
                      : undefined
                  }
                  onFocus={
                    section.id === "projects"
                      ? () => preloadImages()
                      : undefined
                  }
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex cursor-pointer items-center gap-1.5 border px-2.5 py-1 text-xs transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-[var(--on-accent)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? "text-[var(--on-accent)]"
                        : "text-[var(--accent)]"
                    }
                  >
                    [{section.key}]
                  </span>
                  <span>{t(`navigation.tabs.${section.id}`)}</span>
                </button>
              );
            })}
          </nav>
        </header>

        <main
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8"
        >
          <div className="mx-auto max-w-4xl">
            {!screenCleared ? (
              <>
                <div className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] sm:text-sm">
                  <span className="font-semibold text-[var(--accent)]">
                    {t("terminal.sessionUser")}
                  </span>
                  <span className="text-[var(--dim)]">:</span>
                  <span className="font-medium text-[var(--cyan)]">
                    {currentPath}
                  </span>
                  <span className="font-bold text-[var(--accent)]">$</span>
                  <span ref={typedCmdRef} className="ml-1 text-[var(--text)]">
                    {displayedCommand}
                  </span>
                </div>

                <div ref={outputRef}>
                  {commandView?.type === "help" && (
                    <HelpOutput onRunCommand={executeCommand} />
                  )}
                  {commandView?.type === "ls" && (
                    <LsOutput onNavigate={navigate} />
                  )}
                  {commandView?.type === "neofetch" && (
                    <NeofetchOutput themeName={currentTheme.label} />
                  )}
                  {commandView?.type === "themes" && (
                    <ThemeOutput
                      activeThemeId={themeId}
                      onSelectTheme={(id) => setThemeId(id)}
                    />
                  )}
                  {commandView?.type === "text" && (
                    <pre
                      data-gsap="reveal"
                      className="m-0 border-l-2 border-l-[var(--accent)] bg-[var(--surface)] p-4 whitespace-pre-wrap text-[13px] text-[var(--text)]"
                    >
                      {commandView.text}
                    </pre>
                  )}
                  {!commandView && (
                    <>
                      {activeSection === "about" && (
                        <About
                          onNavigate={navigate}
                          profileOnly={profileOnly}
                        />
                      )}
                      {activeSection === "projects" && (
                        <Projects onNavigate={navigate} />
                      )}
                      {activeSection === "stack" && (
                        <Stack onNavigate={navigate} />
                      )}
                      {activeSection === "contact" && (
                        <Contact
                          emailCopied={emailCopied}
                          onCopyEmail={copyEmail}
                          onNavigate={navigate}
                        />
                      )}
                      {activeSection === "pix" && (
                        <Pix
                          pixKey={PIX_KEY}
                          copied={copied}
                          onCopy={copyPix}
                          image={qrcodePix}
                          onNavigate={navigate}
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <p className="text-xs text-[var(--muted)] sm:text-[13px]">
                {t("terminal.clearedHint")}
              </p>
            )}

            {commandMessage && (
              <p
                ref={errorRef}
                role="alert"
                className="mt-4 border border-[var(--red)] bg-[color-mix(in_srgb,var(--red)_12%,var(--bg))] px-3 py-2 text-xs text-[var(--red)] sm:text-[13px]"
              >
                {commandMessage}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="group mt-7 flex flex-wrap items-center gap-x-1.5 gap-y-2 border-t border-dashed border-[var(--border)] pt-4 text-[13px] sm:flex-nowrap sm:text-sm"
            >
              <div className="flex shrink-0 items-center gap-1">
                <span className="font-semibold text-[var(--accent)]">
                  {t("terminal.sessionUser")}
                </span>
                <span className="text-[var(--dim)]">:</span>
                <span className="font-medium text-[var(--cyan)]">
                  {currentPath}
                </span>
                <span className="font-bold text-[var(--accent)]">$</span>
              </div>

              <div className="relative flex min-w-[200px] flex-1 items-center gap-1.5">
                {!command && (
                  <span
                    aria-hidden="true"
                    className="cursor-block shrink-0 group-focus-within:hidden"
                  />
                )}
                {suggestionSuffix && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre text-[13px] sm:text-sm"
                  >
                    <span className="invisible">{command}</span>
                    <span className="text-[var(--dim)]">
                      {suggestionSuffix} {t("terminal.tabHint")}
                    </span>
                  </div>
                )}
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder={t("terminal.placeholder")}
                  aria-label={t("terminal.inputLabel")}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  className="relative z-10 w-full min-w-0 border-0 bg-transparent text-[13px] text-[var(--text)] placeholder-[var(--dim)] caret-[var(--accent)] outline-none sm:text-sm"
                />
              </div>
            </form>
          </div>
        </main>

        <footer className="flex items-center justify-center border-t border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)] sm:px-4">
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
