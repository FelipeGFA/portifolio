import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import { PROJECT_PREVIEWS } from "../utils/projectPreviews";
import { THEMES } from "../utils/themes";
import { gsap, useGSAP } from "../utils/gsapConfig";
import { useTranslation } from "../i18n/LanguageContext";

const EMAIL_ADDRESS = "felipegabriel.avila6@gmail.com";
const GITHUB_URL = "https://github.com/FelipeGFA";
const LINKEDIN_URL = "https://www.linkedin.com/in/felipegfa";

function SectionFooter({ backLabel, onBack, nextLabel, onNext }) {
  return (
    <div
      data-gsap="reveal"
      className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex cursor-pointer items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
      >
        <ArrowLeft size={14} />
        <span>{backLabel}</span>
      </button>
      {nextLabel && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex cursor-pointer items-center gap-2 border border-[var(--border-strong)] bg-[var(--surface-hi)] px-3 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
        >
          <span>{nextLabel}</span>
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

export function About({ onNavigate, profileOnly = false }) {
  const { t } = useTranslation();
  const menuItems = t("profile.menuItems");

  return (
    <div className="space-y-8">
      <div
        data-gsap="reveal"
        className="border-l-2 border-l-[var(--accent)] py-1 pl-4 sm:pl-5"
      >
        <h1
          data-gsap="scramble"
          data-text={t("profile.name")}
          className="font-[Space_Mono,monospace] text-2xl font-bold tracking-tight text-[var(--heading)] sm:text-4xl"
        >
          {t("profile.name")}
        </h1>
        <p className="mt-1 text-sm font-semibold text-[var(--accent)] sm:text-base">
          {t("profile.role")}
        </p>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-[var(--text)] sm:text-sm">
          {t("profile.description")}
        </p>
      </div>

      {!profileOnly && (
        <div
          data-gsap="reveal"
          className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
        >
          {menuItems.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => onNavigate(item.section)}
              className="group flex w-full cursor-pointer flex-col gap-1.5 px-3 py-3.5 text-left transition-colors hover:bg-[var(--surface)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="font-bold text-[var(--accent)]">
                  [{item.key}]
                </span>
                <span className="text-sm font-semibold text-[var(--heading)] group-hover:text-[var(--accent)]">
                  {item.title}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-xs text-[var(--muted)]">
                  {item.description}
                </span>
                <span className="shrink-0 text-xs font-medium text-[var(--dim)] transition-colors group-hover:text-[var(--accent)]">
                  {t("profile.openAction")}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Projects({ onNavigate }) {
  const { t } = useTranslation();
  const projects = t("projects.items");
  const [selectedId, setSelectedId] = useState(
    () => projects[0]?.id ?? "portfolio",
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const detailRef = useRef(null);
  const projectTitleRef = useRef(null);
  const dialogRef = useRef(null);
  const hasMountedRef = useRef(false);

  const foundIndex = projects.findIndex((project) => project.id === selectedId);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;
  const activeProject = projects[activeIndex] || null;
  const activePreviewSrc = activeProject
    ? PROJECT_PREVIEWS[activeProject.id]
    : null;

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  useGSAP(
    () => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }
      if (!activeProject) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            if (projectTitleRef.current) {
              projectTitleRef.current.textContent = activeProject.name;
            }
            return;
          }

          if (detailRef.current) {
            gsap.killTweensOf(detailRef.current);
            gsap.fromTo(
              detailRef.current,
              { opacity: 0.35, y: 4 },
              {
                opacity: 1,
                y: 0,
                duration: 0.18,
                ease: "power2.out",
                clearProps: "transform,opacity",
              },
            );
          }

          if (projectTitleRef.current) {
            gsap.killTweensOf(projectTitleRef.current);
            gsap.to(projectTitleRef.current, {
              duration: 0.26,
              scrambleText: {
                text: activeProject.name,
                chars: "░▒▓/\\<>+=*#",
                speed: 0.6,
              },
            });
          }
        },
      );
    },
    { dependencies: [selectedId] },
  );

  useGSAP(
    () => {
      if (!lightboxOpen || !dialogRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          dialogRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.16,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
        );
      });
    },
    { dependencies: [lightboxOpen] },
  );

  return (
    <div className="space-y-4">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("projects.introComment")}
      </p>

      <div data-gsap="reveal" className="flex flex-wrap gap-1 md:hidden">
        {projects.map((project, index) => {
          const isSelected = project.id === activeProject?.id;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedId(project.id)}
              className={`inline-flex cursor-pointer items-center gap-1.5 border px-2.5 py-1.5 text-xs transition-colors ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-[var(--on-accent)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
              }`}
            >
              <span>[{String(index + 1).padStart(2, "0")}]</span>
              <span>{project.name}</span>
            </button>
          );
        })}
      </div>

      {activeProject && (
        <div
          data-gsap="reveal"
          className="grid grid-cols-1 border border-[var(--border)] bg-[var(--bg)] md:grid-cols-[260px_1fr]"
        >
          <div className="hidden border-r border-[var(--border)] md:flex md:flex-col">
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
              ~/{t("projects.listHeader")} ({projects.length})
            </div>

            <div className="divide-y divide-[var(--border)]">
              {projects.map((project, index) => {
                const isSelected = project.id === activeProject.id;
                const thumbSrc = PROJECT_PREVIEWS[project.id];
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    aria-current={isSelected ? "true" : undefined}
                    className={`flex w-full cursor-pointer items-center gap-3 border-l-2 px-3 py-3 text-left transition-colors ${
                      isSelected
                        ? "border-l-[var(--accent)] bg-[var(--surface)]"
                        : "border-l-transparent hover:bg-[var(--surface)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-3 shrink-0 text-[10px] ${
                        isSelected ? "text-[var(--accent)]" : "text-transparent"
                      }`}
                    >
                      ▶
                    </span>

                    {thumbSrc && (
                      <div className="aspect-[3/2] w-14 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--outer-bg)]">
                        <img
                          src={thumbSrc}
                          alt=""
                          loading="eager"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="font-bold text-[var(--accent)]">
                          [{String(index + 1).padStart(2, "0")}]
                        </span>
                        <span className="text-[var(--dim)]">
                          [{project.tag}]
                        </span>
                      </div>
                      <div
                        className={`mt-0.5 truncate text-xs font-semibold ${
                          isSelected
                            ? "text-[var(--heading)]"
                            : "text-[var(--text)]"
                        }`}
                      >
                        {project.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[var(--accent)]">
                  {String(activeIndex + 1).padStart(2, "0")}/
                  {String(projects.length).padStart(2, "0")}
                </span>
                <span className="text-[var(--dim)]">·</span>
                <span className="text-[var(--cyan)]">
                  ~/{t("projects.listHeader")}/{activeProject.id}
                </span>
                <span className="text-[var(--muted)]">
                  [{activeProject.tag}]
                </span>
              </div>

              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
              >
                <span>{t("projects.repository")}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div ref={detailRef} className="space-y-4 p-4 sm:p-5">
              {activePreviewSrc && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={t("projects.previewAlt", {
                    name: activeProject.name,
                  })}
                  className="block w-full cursor-pointer border border-[var(--border)] bg-[var(--outer-bg)] transition-colors hover:border-[var(--accent)]"
                >
                  <div className="aspect-[3/2] max-h-[360px] w-full overflow-hidden">
                    <img
                      src={activePreviewSrc}
                      alt={t("projects.previewAlt", {
                        name: activeProject.name,
                      })}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </button>
              )}

              <div className="space-y-2">
                <h2
                  ref={projectTitleRef}
                  data-gsap="scramble"
                  data-text={activeProject.name}
                  className="text-base font-bold text-[var(--heading)] sm:text-lg"
                >
                  {activeProject.name}
                </h2>
                <p className="text-[13px] leading-relaxed text-[var(--text)]">
                  {activeProject.description}
                </p>
                <p className="pt-1 text-xs">
                  <span className="text-[var(--dim)]">
                    {t("projects.stackLabel")}:{" "}
                  </span>
                  <span className="text-[var(--cyan)]">
                    {activeProject.tech.join(" · ")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxOpen && activeProject && activePreviewSrc && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("projects.previewAlt", { name: activeProject.name })}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl border border-[var(--border-strong)] bg-[var(--bg)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px]">
                <span className="font-bold text-[var(--accent)]">
                  [{String(activeIndex + 1).padStart(2, "0")}]
                </span>
                <span className="font-bold text-[var(--heading)]">
                  {activeProject.name}
                </span>
                <span className="text-[11px] text-[var(--cyan)]">
                  [{activeProject.tag}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
                >
                  <span>{t("projects.repository")}</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="inline-flex cursor-pointer items-center gap-1 border border-[var(--border-strong)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--text)] transition-colors hover:border-[var(--red)] hover:text-[var(--red)]"
                >
                  <span>{t("projects.closePreview")}</span>
                  <X size={13} />
                </button>
              </div>
            </div>

            <div className="flex justify-center bg-[var(--outer-bg)] p-3 sm:p-4">
              <img
                src={activePreviewSrc}
                alt={t("projects.previewAlt", { name: activeProject.name })}
                className="max-h-[78vh] w-auto max-w-full border border-[var(--border)] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <SectionFooter
        backLabel={t("projects.backHome")}
        onBack={() => onNavigate("about")}
        nextLabel={t("projects.nextSection")}
        onNext={() => onNavigate("stack")}
      />
    </div>
  );
}

export function Stack({ onNavigate }) {
  const { t } = useTranslation();
  const groups = t("stack.groups");
  const statusOk = t("stack.statusOk");

  return (
    <div className="space-y-6">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("stack.introComment")}
      </p>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.code} data-gsap="reveal" className="space-y-2.5">
            <h2 className="border-b border-[var(--border)] pb-1.5 text-xs font-bold tracking-wide text-[var(--cyan)] sm:text-[13px]">
              <span className="text-[var(--accent)]">{group.code}/</span>{" "}
              {group.title}
            </h2>

            <ul className="space-y-2 pl-1">
              {group.items.map((item, idx) => {
                const isLast = idx === group.items.length - 1;
                return (
                  <li
                    key={item.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 text-[13px]"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span
                        aria-hidden="true"
                        className="select-none text-[var(--dim)]"
                      >
                        {isLast ? "└──" : "├──"}
                      </span>
                      <span className="font-semibold text-[var(--heading)]">
                        {item.name}
                      </span>
                      <span className="text-xs text-[var(--muted)]">
                        — {item.role}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      {statusOk}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <SectionFooter
        backLabel={t("stack.backHome")}
        onBack={() => onNavigate("about")}
        nextLabel={t("stack.nextSection")}
        onNext={() => onNavigate("projects")}
      />
    </div>
  );
}

export function Contact({ emailCopied, onCopyEmail, onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("contact.introComment")}
      </p>

      <div data-gsap="reveal" className="space-y-1">
        <h2
          data-gsap="scramble"
          data-text={t("contact.title")}
          className="text-base font-bold text-[var(--heading)] sm:text-lg"
        >
          {t("contact.title")}
        </h2>
        <p className="text-[13px] text-[var(--muted)]">
          {t("contact.subtitle")}
        </p>
      </div>

      <div
        data-gsap="reveal"
        className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
      >
        <div className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Mail size={16} className="shrink-0 text-[var(--accent)]" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--dim)]">
                {t("contact.emailLabel")}
              </div>
              <div className="break-all text-[13px] font-medium text-[var(--text)]">
                {EMAIL_ADDRESS}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>{t("contact.sendEmail")}</span>
              <ExternalLink size={12} />
            </a>
            <button
              type="button"
              onClick={onCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              {emailCopied ? <Check size={13} /> : <Copy size={13} />}
              <span>
                {emailCopied
                  ? t("contact.emailCopied")
                  : t("contact.copyEmail")}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Github size={16} className="shrink-0 text-[var(--cyan)]" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--dim)]">
                GitHub
              </div>
              <div className="text-[13px] font-medium text-[var(--text)]">
                github.com/FelipeGFA
              </div>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--cyan)] transition-colors hover:border-[var(--cyan)] hover:bg-[var(--surface-hi)]"
          >
            <span>{t("contact.openProfile")}</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Linkedin size={16} className="shrink-0 text-[var(--cyan)]" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--dim)]">
                LinkedIn
              </div>
              <div className="text-[13px] font-medium text-[var(--text)]">
                linkedin.com/in/felipegfa
              </div>
            </div>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--cyan)] transition-colors hover:border-[var(--cyan)] hover:bg-[var(--surface-hi)]"
          >
            <span>{t("contact.openProfile")}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <SectionFooter
        backLabel={t("contact.backHome")}
        onBack={() => onNavigate("about")}
      />
    </div>
  );
}

export function Pix({ pixKey, copied, onCopy, image, onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("pix.introComment")}
      </p>

      <div
        data-gsap="reveal"
        className="space-y-5 border-y border-[var(--border)] py-5"
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_144px]">
          <div className="space-y-3">
            <h2
              data-gsap="scramble"
              data-text={t("pix.title")}
              className="text-base font-bold text-[var(--heading)] sm:text-lg"
            >
              {t("pix.title")}
            </h2>
            <p className="text-[13px] text-[var(--muted)]">
              {t("pix.description")}
            </p>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex cursor-pointer items-center gap-2 border border-[var(--accent)] bg-[var(--accent-soft)] px-3.5 py-2 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? t("pix.copied") : t("pix.copy")}</span>
            </button>
          </div>

          <div className="order-first w-[144px] border border-[var(--border-strong)] bg-white p-2 md:order-none">
            <img
              src={image}
              alt={t("pix.qrAlt")}
              className="block h-[126px] w-[126px]"
            />
          </div>
        </div>

        <div className="border-l-2 border-l-[var(--border-strong)] bg-[var(--surface)] p-3">
          <div className="mb-1 text-[11px] uppercase tracking-wider text-[var(--dim)]">
            {t("pix.codeLabel")}
          </div>
          <code className="block select-all break-all text-xs leading-relaxed text-[var(--muted)]">
            {pixKey}
          </code>
        </div>
      </div>

      <SectionFooter
        backLabel={t("pix.backHome")}
        onBack={() => onNavigate("about")}
      />
    </div>
  );
}

export function HelpOutput({ onRunCommand }) {
  const { t } = useTranslation();
  const commands = t("help.commands");

  return (
    <div className="space-y-3">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("help.introComment")}
      </p>

      <div
        data-gsap="reveal"
        className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
      >
        {commands.map((item) => (
          <button
            key={item.cmd}
            type="button"
            onClick={() => onRunCommand(item.cmd)}
            className="flex w-full cursor-pointer flex-col gap-1 px-3 py-2.5 text-left transition-colors hover:bg-[var(--surface)] sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="min-w-[140px] font-semibold text-[var(--accent)]">
              $ {item.cmd}
            </span>
            <span className="text-xs text-[var(--muted)] sm:text-[13px]">
              {item.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LsOutput({ onNavigate }) {
  const { t } = useTranslation();
  const items = t("terminal.lsItems");

  return (
    <div className="space-y-3">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("terminal.lsComment")}
      </p>

      <div
        data-gsap="reveal"
        className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
      >
        {items.map((item) => (
          <button
            key={item.section}
            type="button"
            onClick={() => onNavigate(item.section)}
            className="flex w-full cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 px-3 py-2.5 text-left text-xs transition-colors hover:bg-[var(--surface)] sm:text-[13px]"
          >
            <span className="text-[var(--dim)]">{item.permissions}</span>
            <span className="hidden text-[var(--muted)] sm:inline">
              {item.owner}
            </span>
            <span className="min-w-[120px] font-semibold text-[var(--cyan)]">
              {item.name}
            </span>
            <span className="text-[var(--muted)]">— {item.summary}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ThemeOutput({ activeThemeId, onSelectTheme }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("terminal.themeListComment")}
      </p>

      <div
        data-gsap="reveal"
        className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
      >
        {THEMES.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onSelectTheme(theme.id)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-left text-xs transition-colors sm:text-[13px] ${
                isActive ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 border border-[var(--border-strong)] p-0.5">
                  <span
                    className="block h-3 w-3"
                    style={{ background: theme.vars["--bg"] }}
                  />
                  <span
                    className="block h-3 w-3"
                    style={{ background: theme.vars["--accent"] }}
                  />
                  <span
                    className="block h-3 w-3"
                    style={{ background: theme.vars["--cyan"] }}
                  />
                </span>
                <span
                  className={
                    isActive
                      ? "font-bold text-[var(--accent)]"
                      : "font-semibold text-[var(--heading)]"
                  }
                >
                  {theme.label}
                </span>
                <span className="text-[var(--dim)]">({theme.id})</span>
              </div>

              {isActive && (
                <span className="font-semibold text-[var(--accent)]">
                  {t("terminal.activeTag")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NeofetchOutput({ themeName }) {
  const { t } = useTranslation();
  const rows = t("neofetch.rows");

  return (
    <div className="space-y-3">
      <p data-gsap="reveal" className="text-xs text-[var(--muted)]">
        {t("neofetch.introComment")}
      </p>

      <div
        data-gsap="reveal"
        className="grid gap-6 border-y border-[var(--border)] py-5 sm:grid-cols-[auto_1fr]"
      >
        <pre
          aria-hidden="true"
          className="m-0 select-none text-xs leading-tight text-[var(--accent)]"
        >{`  +-----------------+
  | >_ FELIPE.DEV   |
  |                 |
  | [bash]  [tui]   |
  | [react] [gsap]  |
  +-----------------+`}</pre>

        <dl className="grid gap-1.5 text-[13px]">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap gap-2">
              <dt className="min-w-[90px] font-semibold text-[var(--cyan)]">
                {label}:
              </dt>
              <dd className="m-0 text-[var(--text)]">{value}</dd>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <dt className="min-w-[90px] font-semibold text-[var(--cyan)]">
              {t("neofetch.themeLabel")}:
            </dt>
            <dd className="m-0 text-[var(--text)]">{themeName} · Bash TUI</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
