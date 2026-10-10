/** Allowed schemes for citation / source links rendered in the panel. */
const ALLOWED_SCHEMES = new Set(["http:", "https:", "mailto:"]);

/** Return true when ``href`` is safe to bind in an anchor element. */
export function isSafeUrl(href: string): boolean {
  const text = href.trim();
  if (!text || text.length > 2000) {
    return false;
  }
  try {
    const parsed = new URL(text);
    return ALLOWED_SCHEMES.has(parsed.protocol);
  } catch {
    return false;
  }
}
