// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Projects, { type ProjectItem } from './Projects';

describe('Projects Component Performance', () => {
  it('should measure rendering performance', () => {
    const mockProjects: ProjectItem[] = Array.from({ length: 1500 }).map((_, i) => ({
      name: `Project ${i}`,
      tech: 'React, Vite',
      desc: 'A sample project.',
      achievements: ['Did something great'],
      link: i % 2 === 0 ? 'https://example.com' : 'javascript:alert("xss")'
    }));

    // Warmup
    const { rerender } = render(<Projects projects={mockProjects} />);
    rerender(<Projects projects={mockProjects} />);

    // Now measure just the re-renders
    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      rerender(<Projects projects={mockProjects} />);
    }
    const end = performance.now();

    console.log(`\n\n📊 Re-render Benchmark Results: ${end - start} ms\n\n`);
  }, 20000); // 20s timeout
});
