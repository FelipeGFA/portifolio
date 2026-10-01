const directoryAliases = {
  "~": "about",
  ".": "about",
  "..": "about",
  about: "about",
  projects: "projects",
  stack: "stack",
  contact: "contact",
  pix: "pix",
};

const fileAliases = {
  "about.sh": "about",
  "projects.git": "projects",
  "stack.sys": "stack",
  "contact.log": "contact",
  "contact.sh": "contact",
  "support.pix": "pix",
};

export function resolveDirectory(value) {
  return directoryAliases[value.replace(/^\.\//, "")] || null;
}

export function resolveFile(value) {
  return fileAliases[value.replace(/^\.\//, "")] || resolveDirectory(value);
}
