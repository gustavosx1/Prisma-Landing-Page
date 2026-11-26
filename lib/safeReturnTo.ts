const ORIGIN = "https://www.prismanews.com.br";

/** Auth destinations must remain local, including after URL normalization. */
export function safeReturnTo(value: string | null | undefined): string {
  if (!value?.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(value)) return "/topicos";
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("//") || /[\\\u0000-\u001f\u007f]/.test(decoded)) return "/topicos";
    const url = new URL(value, ORIGIN);
    if (url.origin !== ORIGIN) return "/topicos";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/topicos";
  }
}