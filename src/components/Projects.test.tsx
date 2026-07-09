import { render, screen } from '@testing-library/react';
import Projects from './Projects';

describe('Projects Component', () => {
  const mockProjects = [
    {
      name: 'Project Alpha',
      tech: 'React, TypeScript',
      desc: 'A cool project.',
      achievements: ['Built UI', 'Integrated API'],
      link: 'https://github.com/test/alpha'
    },
    {
      name: 'Project Beta',
      tech: 'Vue, JavaScript',
      desc: 'Another project.',
      achievements: ['Optimized performance']
      // No link provided
    }
  ];

  it('renders project details correctly', () => {
    render(<Projects projects={mockProjects} />);

    // Check Project Alpha details
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('（技术栈: React, TypeScript）')).toBeInTheDocument();
    expect(screen.getByText('A cool project.')).toBeInTheDocument();
    expect(screen.getByText('Built UI')).toBeInTheDocument();
    expect(screen.getByText('Integrated API')).toBeInTheDocument();

    // Check Project Beta details
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(screen.getByText('（技术栈: Vue, JavaScript）')).toBeInTheDocument();
    expect(screen.getByText('Another project.')).toBeInTheDocument();
    expect(screen.getByText('Optimized performance')).toBeInTheDocument();
  });

  it('renders link when provided', () => {
    render(<Projects projects={mockProjects} />);

    // Since only one project has a link, there should be exactly one link element
    const link = screen.getByRole('link', { name: /查看代码/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/test/alpha');
  });

  it('does not render link when not provided', () => {
    render(<Projects projects={[mockProjects[1]]} />);

    // Project Beta does not have a link
    const link = screen.queryByRole('link', { name: /查看代码/i });
    expect(link).not.toBeInTheDocument();
  });

  it('renders correctly with an empty project list', () => {
    render(<Projects projects={[]} />);

    // Should still render the section title
    expect(screen.getByText('重点项目')).toBeInTheDocument();

    // But no projects should be rendered
    expect(screen.queryByText('Project Alpha')).not.toBeInTheDocument();
  });
});
