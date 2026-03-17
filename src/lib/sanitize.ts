import sanitize from "sanitize-html";

/**
 * Sanitize HTML from WordPress to prevent XSS attacks.
 * Allows safe HTML tags (formatting, images, links, iframes) but strips scripts.
 */
export function sanitizeHTML(dirty: string | undefined | null): string {
  if (!dirty) return "";
  return sanitize(dirty, {
    allowedTags: sanitize.defaults.allowedTags.concat([
      "img",
      "iframe",
      "figure",
      "figcaption",
      "video",
      "source",
      "picture",
    ]),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class", "style"],
      iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "loading", "title"],
      div: ["class", "style", "id"],
      span: ["class", "style"],
      p: ["class", "style"],
      a: ["href", "target", "rel", "class", "title"],
      "*": ["class"],
    },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"],
  });
}

/**
 * Strip all HTML tags and decode entities for plain text usage (meta descriptions, etc.)
 */
export function stripHTML(html: string | undefined | null): string {
  if (!html) return "";
  const stripped = html.replace(/<[^>]+>/g, "");
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
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.slice(2, -1), 10);
      return String.fromCharCode(code);
    });
}
