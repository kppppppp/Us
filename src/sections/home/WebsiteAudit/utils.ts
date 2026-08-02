// ── Normalization and Exceptions ──────────────────────────────
export const normalizeUrl = (raw: string): string => {
  let u = raw.trim();
  if (!u.startsWith("http://") && !u.startsWith("https://")) u = "https://" + u;
  return u;
};

export const getDomain = (raw: string): string => {
  try {
    return new URL(normalizeUrl(raw)).hostname.replace(/^www\./, "");
  } catch {
    return raw.trim().replace(/^www\./, "");
  }
};

export const isUnexpectedSolutions = (url: string): boolean => {
  const d = getDomain(url).toLowerCase();
  return d === "unexpectedsolutions.in" || d.endsWith(".unexpectedsolutions.com") || d === "unexpectedsolutions.com";
};

// ── Score Colors ──────────────────────────────────────────────
export const scoreColor = (n: number) => {
  if (n >= 80) return { text: "#5d46d8", bg: "rgba(93,70,216,0.08)", label: "Good" };
  if (n >= 50) return { text: "#facc15", bg: "rgba(250,204,21,0.1)", label: "Needs Work" };
  return { text: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Poor" };
};

export const sevColor = (s: "high" | "medium" | "low") => {
  if (s === "high") return { dot: "#f87171", badge: "rgba(248,113,113,0.15)", color: "#f87171" };
  if (s === "medium") return { dot: "#facc15", badge: "rgba(250,204,21,0.15)", color: "#facc15" };
  return { dot: "#94a3b8", badge: "rgba(148,163,184,0.15)", color: "#94a3b8" };
};

// ── Audit Map ──────────────────────────────────────────────────
export const AUDIT_MAP: Record<string, { category: string; text: string }> = {
  "first-contentful-paint":    { category: "Speed",         text: "Page takes too long to show first content — visitors may leave before it loads" },
  "speed-index":               { category: "Speed",         text: "Content appears slowly — improving server response time will help significantly" },
  "largest-contentful-paint":  { category: "Speed",         text: "Main content loads too slowly — compress images and use faster hosting" },
  "total-blocking-time":       { category: "Speed",         text: "Page is unresponsive during load — reduce heavy JavaScript to fix this" },
  "cumulative-layout-shift":   { category: "Mobile",        text: "Page elements shift while loading — set dimensions on images and ads" },
  "interactive":               { category: "Speed",         text: "Page takes too long to become interactive — optimise scripts and reduce load" },
  "render-blocking-resources": { category: "Speed",         text: "CSS/JS files are blocking the page from loading — defer non-critical resources" },
  "uses-optimized-images":     { category: "Speed",         text: "Images are not optimised — compress them to reduce load time significantly" },
  "uses-responsive-images":    { category: "Mobile",        text: "Images are larger than needed on mobile — serve correctly sized images" },
  "uses-webp-images":          { category: "Speed",         text: "Images are in old formats — convert to WebP for faster loading" },
  "offscreen-images":          { category: "Speed",         text: "Images load even when not visible — enable lazy loading to speed up the page" },
  "unminified-css":            { category: "Speed",         text: "CSS files are not minified — minify them to reduce file size" },
  "unminified-javascript":     { category: "Speed",         text: "JavaScript files are not minified — minify them to improve load speed" },
  "unused-css-rules":          { category: "Speed",         text: "Unused CSS is being loaded — remove it to reduce page weight" },
  "unused-javascript":         { category: "Speed",         text: "Unused JavaScript is slowing the page — remove or defer it" },
  "uses-text-compression":     { category: "Speed",         text: "Text files are not compressed — enable GZIP/Brotli on your server" },
  "uses-long-cache-ttl":       { category: "Speed",         text: "Static assets are not cached — set cache headers to speed up repeat visits" },
  "efficient-animated-content":{ category: "Speed",         text: "Animated GIFs are slowing the page — convert them to video format" },
  "duplicated-javascript":     { category: "Speed",         text: "Duplicate JavaScript files detected — remove duplicates to reduce load" },
  "legacy-javascript":         { category: "Speed",         text: "Old JavaScript is being sent to modern browsers — update your build config" },
  "document-title":            { category: "SEO",           text: "Page is missing a title tag — add one to improve search ranking" },
  "meta-description":          { category: "SEO",           text: "Meta description is missing — add one to improve click-through rate from Google" },
  "link-text":                 { category: "SEO",           text: "Links have unclear text like click here — use descriptive link text for SEO" },
  "crawlable-anchors":         { category: "SEO",           text: "Some links cannot be crawled by Google — fix anchor tags to improve indexing" },
  "is-crawlable":              { category: "SEO",           text: "Page is blocked from search engines — check your robots.txt file" },
  "robots-txt":                { category: "SEO",           text: "robots.txt file has errors — fix it so Google can crawl your site properly" },
  "image-alt":                 { category: "Accessibility", text: "Images are missing alt text — add descriptions for screen readers and SEO" },
  "color-contrast":            { category: "Accessibility", text: "Text contrast is too low — increase contrast so all users can read content" },
  "tap-targets":               { category: "Mobile",        text: "Buttons and links are too small on mobile — increase tap target sizes" },
  "viewport":                  { category: "Mobile",        text: "Viewport meta tag is missing — add it so the site displays correctly on phones" },
  "font-size":                 { category: "Mobile",        text: "Font size is too small on mobile — increase to at least 16px for readability" },
  "content-width":             { category: "Mobile",        text: "Content is wider than the screen on mobile — fix horizontal scrolling" },
  "is-on-https":               { category: "SEO",           text: "Site is not using HTTPS — add an SSL certificate immediately for security and SEO" },
  "uses-http2":                { category: "Speed",         text: "Site is using old HTTP/1.1 — upgrade to HTTP/2 for faster loading" },
  "third-party-summary":       { category: "Speed",         text: "Third-party scripts like ads and chat are slowing the page — audit and reduce them" },
};

export const getSeverity = (score: number): "high" | "medium" | "low" => {
  if (score < 0.5) return "high";
  if (score < 0.8) return "medium";
  return "low";
};

export const generateSummary = (domain: string, speed: number, seo: number, mobile: number, accessibility: number): string => {
  const avg = Math.round((speed + seo + mobile + accessibility) / 4);
  if (avg >= 90) return `${domain} is in excellent shape — top scores across all categories. Great work keeping it optimised.`;
  if (avg >= 70) return `${domain} performs well overall but has some areas worth improving, especially ${speed < 70 ? "speed" : seo < 70 ? "SEO" : "accessibility"}. Fixing these could noticeably improve conversions.`;
  if (avg >= 50) return `${domain} has moderate performance with several issues affecting user experience and search ranking. Addressing the high-priority items below will make a significant difference.`;
  return `${domain} has significant performance issues across multiple areas. These problems are likely costing you visitors and rankings — addressing them should be a priority.`;
};
