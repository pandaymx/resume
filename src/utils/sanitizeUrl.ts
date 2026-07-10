export function isSafeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url, 'http://dummy.com');
    const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    return safeProtocols.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
