import { render, screen } from '@testing-library/react';
import { Mail } from 'lucide-react';
import SectionTitle from './SectionTitle';

describe('SectionTitle Component', () => {
  it('renders the title correctly without an icon', () => {
    render(<SectionTitle title="Experience" />);

    const titleElement = screen.getByRole('heading', { level: 3, name: 'Experience' });
    expect(titleElement).toBeInTheDocument();

    // Ensure no SVG is rendered
    const svgElement = titleElement.querySelector('svg');
    expect(svgElement).not.toBeInTheDocument();
  });

  it('renders the title and the icon correctly', () => {
    render(<SectionTitle title="Contact" icon={Mail} />);

    const titleElement = screen.getByRole('heading', { level: 3, name: 'Contact' });
    expect(titleElement).toBeInTheDocument();

    // Ensure the SVG is rendered with expected attributes
    const svgElement = titleElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '18');
    expect(svgElement).toHaveAttribute('height', '18');
    expect(svgElement).toHaveClass('text-slate-500');
  });

  it('appends custom className correctly', () => {
    render(<SectionTitle title="Projects" className="custom-test-class" />);

    const titleElement = screen.getByRole('heading', { level: 3, name: 'Projects' });
    expect(titleElement).toHaveClass('custom-test-class');
  });
});
