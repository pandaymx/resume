export function isSafeUrl(url: string): boolean {
  // Reject URLs containing control characters, unencoded spaces/tabs, or DEL
  // as they can be used to bypass protocol parsing in new URL()
  // e.g. java\nscript:alert(1)
  if (/[\x00-\x20\x7F]/.test(url)) {
    return false;
  }

  try {
    const parsedUrl = new URL(url, 'http://dummy.com');
    const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    return safeProtocols.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
