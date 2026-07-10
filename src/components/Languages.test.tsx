import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Languages from './Languages';

describe('Languages Component', () => {
  const mockLanguages = [
    { name: '中文', level: '母语' },
    { name: '英语', level: 'CET-6 (读写流利)' },
    { name: '英语', level: 'CET-4' },
  ];

  it('renders section title correctly', () => {
    render(<Languages languages={mockLanguages} />);
    expect(screen.getByText('语言能力')).toBeInTheDocument();
  });

  it('renders all language items correctly', () => {
    render(<Languages languages={mockLanguages} />);

    // Check if names are rendered (with their list markers)
    expect(screen.getByText('• 中文：')).toBeInTheDocument();

    // Using getAllByText for '• 英语：' since it appears twice
    const englishLabels = screen.getAllByText('• 英语：');
    expect(englishLabels.length).toBe(2);

    // Check if levels are rendered
    expect(screen.getByText('母语')).toBeInTheDocument();
    expect(screen.getByText('CET-6 (读写流利)')).toBeInTheDocument();
    expect(screen.getByText('CET-4')).toBeInTheDocument();
  });

  it('returns null when languages prop is empty', () => {
    const { container } = render(<Languages languages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when languages prop is undefined', () => {
    // @ts-expect-error testing invalid prop
    const { container } = render(<Languages languages={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});
