import { isSafeUrl } from './sanitizeUrl';
import { describe, it, expect } from 'vitest';

describe('isSafeUrl', () => {
  it('should allow http and https', () => {
    expect(isSafeUrl('http://example.com')).toBe(true);
    expect(isSafeUrl('https://example.com')).toBe(true);
  });

  it('should allow mailto and tel', () => {
    expect(isSafeUrl('mailto:test@example.com')).toBe(true);
    expect(isSafeUrl('tel:+1234567890')).toBe(true);
  });

  it('should block javascript', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('javascript:alert("XSS")')).toBe(false);
  });

  it('should reject URLs with spaces, tabs, or control characters', () => {
    expect(isSafeUrl('  javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('\x19javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('java\nscript:alert(1)')).toBe(false);
    expect(isSafeUrl('javascript\t:alert(1)')).toBe(false);
    expect(isSafeUrl('\x00http://safe.com')).toBe(false);
  });

  it('should allow relative urls', () => {
    expect(isSafeUrl('/about')).toBe(true);
    expect(isSafeUrl('about')).toBe(true);
  });
});
