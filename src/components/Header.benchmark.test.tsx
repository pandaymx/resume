// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Header from './Header';
import { Mail, Phone } from 'lucide-react';

describe('Header Component Performance', () => {
  it('should measure rendering performance', () => {
    const mockProfile = {
      name: 'Jane Doe',
      title: 'Software Engineer',
      summary: 'A passionate developer building web applications.',
      contact: Array.from({ length: 1500 }).map((_, i) => ({
        icon: i % 2 === 0 ? Mail : Phone,
        value: `contact ${i}`,
        link: i % 2 === 0 ? 'https://example.com' : 'javascript:alert("xss")',
        isLinkSafe: i % 2 === 0
      }))
    };

    // Warmup
    const { rerender } = render(<Header profile={mockProfile} />);
    rerender(<Header profile={mockProfile} />);

    // Now measure just the re-renders
    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      rerender(<Header profile={mockProfile} />);
    }
    const end = performance.now();

    console.log(`\n\n📊 Re-render Benchmark Results: ${end - start} ms\n\n`);
  }, 20000); // 20s timeout
});
