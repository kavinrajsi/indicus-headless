import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML from WordPress to prevent XSS attacks.
 * Allows safe HTML tags (formatting, images, links) but strips scripts.
 */
export function sanitizeHTML(dirty: string | undefined | null): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "loading"],
  });
}

/**
 * Strip all HTML tags and decode entities for plain text usage (meta descriptions, etc.)
 */
export function stripHTML(html: string | undefined | null): string {
  if (!html) return "";
  const stripped = html.replace(/<[^>]+>/g, "");
  // Decode common HTML entities
  return stripped
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.slice(2, -1));
      return String.fromCharCode(code);
    });
}
