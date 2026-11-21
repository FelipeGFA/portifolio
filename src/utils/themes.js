export const DEFAULT_THEME_ID = "phosphor";
const THEME_STORAGE_KEY = "portfolio-theme";

export const THEMES = [
  {
    id: "phosphor",
    label: "Phosphor",
    vars: {
      "--outer-bg": "#060807",
      "--bg": "#0b0d0c",
      "--surface": "#111513",
      "--surface-hi": "#181f1b",
      "--border": "#26312a",
      "--border-strong": "#394d40",
      "--text": "#e6ece7",
      "--heading": "#f0fff4",
      "--muted": "#97aa9c",
      "--dim": "#627366",
      "--accent": "#22ff7a",
      "--accent-soft": "#12291c",
      "--on-accent": "#06120a",
      "--cyan": "#5ce1e6",
      "--amber": "#f2c94c",
      "--red": "#ff6b6b",
    },
  },
  {
    id: "gruvbox",
    label: "Gruvbox",
    vars: {
      "--outer-bg": "#141617",
      "--bg": "#1d2021",
      "--surface": "#282828",
      "--surface-hi": "#32302f",
      "--border": "#3c3836",
      "--border-strong": "#504945",
      "--text": "#ebdbb2",
      "--heading": "#fbf1c7",
      "--muted": "#bdae93",
      "--dim": "#7c6f64",
      "--accent": "#fabd2f",
      "--accent-soft": "#342b16",
      "--on-accent": "#1d2021",
      "--cyan": "#8ec07c",
      "--amber": "#fe8019",
      "--red": "#fb4934",
    },
  },
  {
    id: "tokyonight",
    label: "Tokyo Night",
    vars: {
      "--outer-bg": "#10121a",
      "--bg": "#16161e",
      "--surface": "#1a1b26",
      "--surface-hi": "#24283b",
      "--border": "#292e42",
      "--border-strong": "#3b4261",
      "--text": "#c0caf5",
      "--heading": "#e0e7ff",
      "--muted": "#9aa5ce",
      "--dim": "#565f89",
      "--accent": "#7aa2f7",
      "--accent-soft": "#1c2640",
      "--on-accent": "#10121a",
      "--cyan": "#7dcfff",
      "--amber": "#e0af68",
      "--red": "#f7768e",
    },
  },
  {
    id: "catppuccin",
    label: "Catppuccin",
    vars: {
      "--outer-bg": "#11111b",
      "--bg": "#181825",
      "--surface": "#1e1e2e",
      "--surface-hi": "#2a2b3d",
      "--border": "#313244",
      "--border-strong": "#45475a",
      "--text": "#cdd6f4",
      "--heading": "#eff3ff",
      "--muted": "#a6adc8",
      "--dim": "#6c7086",
      "--accent": "#cba6f7",
      "--accent-soft": "#2c233c",
      "--on-accent": "#11111b",
      "--cyan": "#94e2d5",
      "--amber": "#f9e2af",
      "--red": "#f38ba8",
    },
  },
  {
    id: "mono",
    label: "Monochrome",
    vars: {
      "--outer-bg": "#030303",
      "--bg": "#080808",
      "--surface": "#111110",
      "--surface-hi": "#1b1a18",
      "--border": "#242320",
      "--border-strong": "#3a3833",
      "--text": "#ebe6db",
      "--heading": "#f7f4ec",
      "--muted": "#a9a49a",
      "--dim": "#6d6b66",
      "--accent": "#ebe6db",
      "--accent-soft": "#201f1d",
      "--on-accent": "#080808",
      "--cyan": "#cbc5b8",
      "--amber": "#d8d1c2",
      "--red": "#e07a70",
    },
  },
];

export function getThemeById(id) {
  return THEMES.find((theme) => theme.id === id) || THEMES[0];
}

export function getNextThemeId(currentId) {
  const index = THEMES.findIndex((theme) => theme.id === currentId);
  const nextIndex = index === -1 ? 0 : (index + 1) % THEMES.length;
  return THEMES[nextIndex].id;
}

export function resolveTheme(query = "") {
  const normalized = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!normalized) return null;

  return (
    THEMES.find(
      (theme) =>
        theme.id === normalized ||
        theme.label.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized,
    ) ||
    THEMES.find(
      (theme) =>
        theme.id.startsWith(normalized) ||
        theme.label
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .startsWith(normalized),
    ) ||
    null
  );
}

export function readStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.some((theme) => theme.id === saved) ? saved : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function applyTheme(themeId) {
  if (typeof document === "undefined") return;
  const theme = getThemeById(themeId);
  const root = document.documentElement;

  for (const [property, value] of Object.entries(theme.vars)) {
    root.style.setProperty(property, value);
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
}
