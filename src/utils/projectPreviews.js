import portfolioPreview from "../assets/portifolio.webp";
import launchpadPreview from "../assets/online-launchpad.webp";
import hagitoriPreview from "../assets/hagitori.webp";

export const PROJECT_PREVIEWS = {
  portfolio: portfolioPreview,
  launchpad: launchpadPreview,
  hagitori: hagitoriPreview,
};

const preloadedUrls = new Set();

export function preloadImages(urls = Object.values(PROJECT_PREVIEWS)) {
  if (typeof window === "undefined") return;

  for (const src of urls) {
    if (!src || preloadedUrls.has(src)) continue;
    preloadedUrls.add(src);

    if (!src.startsWith("data:") && document.head) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      if (src.endsWith(".webp")) {
        link.type = "image/webp";
      }
      document.head.appendChild(link);
    }

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.decode?.().catch(() => {});
  }
}
