export const SECTIONS = [
  { id: "about", key: "1" },
  { id: "projects", key: "2" },
  { id: "stack", key: "3" },
  { id: "contact", key: "4" },
  { id: "pix", key: "5" },
];

export const SECTION_KEYS = {
  1: "about",
  2: "projects",
  3: "stack",
  4: "contact",
  5: "pix",
};

const directoryAliases = {
  "~": "about",
  ".": "about",
  "..": "about",
  inicio: "about",
  "início": "about",
  sobre: "about",
  home: "about",
  about: "about",
  projetos: "projects",
  projects: "projects",
  habilidades: "stack",
  skills: "stack",
  stack: "stack",
  contato: "contact",
  contact: "contact",
  apoiar: "pix",
  support: "pix",
  pix: "pix",
};

const fileAliases = {
  "about.sh": "about",
  "projects.git": "projects",
  "stack.sys": "stack",
  "habilidades.tree": "stack",
  "contact.sh": "contact",
  "contact.log": "contact",
  "contato.txt": "contact",
  "contact.txt": "contact",
  "support.pix": "pix",
  "apoiar.pix": "pix",
  "apoiar-pix.txt": "pix",
  "support-pix.txt": "pix",
};

const COMMAND_CANDIDATES = [
  "ajuda",
  "help",
  "whoami",
  "ls",
  "ls -la",
  "pwd",
  "neofetch",
  "clear",
  "inicio",
  "projetos",
  "habilidades",
  "contato",
  "apoiar",
  "projects",
  "stack",
  "skills",
  "contact",
  "pix",
  "support",
  "cd ~",
  "cd projetos",
  "cd projects",
  "cd habilidades",
  "cd stack",
  "cd contato",
  "cd contact",
  "cd apoiar",
  "cd pix",
  "cat projects.git",
  "cat stack.sys",
  "cat contact.sh",
  "cat contact.log",
  "cat support.pix",
  "open github",
  "open linkedin",
  "theme",
  "tema",
  "theme phosphor",
  "theme gruvbox",
  "theme tokyonight",
  "theme catppuccin",
  "theme mono",
  "pt",
  "en",
];

function normalizeTarget(value = "") {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/^\.\//, "")
    .replace(/\/+$/, "");

  if (!cleaned || cleaned === "~") return "~";
  return cleaned.replace(/^~\//, "");
}

export function resolveDirectory(value) {
  const normalized = normalizeTarget(value);
  return directoryAliases[normalized] || null;
}

export function resolveFile(value) {
  const normalized = normalizeTarget(value);
  return fileAliases[normalized] || resolveDirectory(normalized);
}

export function resolveSection(value) {
  return resolveFile(value);
}

export function getCommandSuggestions(input) {
  const normalized = input.trimStart().toLowerCase();
  if (!normalized) return [];
  return COMMAND_CANDIDATES.filter(
    (candidate) => candidate.startsWith(normalized) && candidate !== normalized,
  );
}
