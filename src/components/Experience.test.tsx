import { render, screen } from '@testing-library/react';
import Experience from './Experience';
import { describe, it, expect } from 'vitest';

describe('Experience Component', () => {
  const mockExperience = [
    {
      company: 'Tech Corp',
      role: 'Senior Frontend Engineer',
      time: '2020 - Present',
      details: ['Developed scalable web apps.', 'Mentored junior developers.']
    },
    {
      company: 'Startup Inc',
      role: 'Web Developer',
      time: '2018 - 2020',
      details: ['Built MVP from scratch.', 'Implemented responsive design.']
    }
  ];

  it('renders section title correctly', () => {
    render(<Experience experience={mockExperience} />);

    // Check if the SectionTitle content is rendered correctly
    expect(screen.getByText('工作经历')).toBeInTheDocument();
  });

  it('renders multiple experience items correctly', () => {
    render(<Experience experience={mockExperience} />);

    // First job
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020 - Present')).toBeInTheDocument();

    // Second job
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    expect(screen.getByText('Web Developer')).toBeInTheDocument();
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
  });

  it('renders details list items correctly for each job', () => {
    render(<Experience experience={mockExperience} />);

    // Details from first job
    expect(screen.getByText('Developed scalable web apps.')).toBeInTheDocument();
    expect(screen.getByText('Developed scalable web apps.').tagName).toBe('LI');
    expect(screen.getByText('Mentored junior developers.')).toBeInTheDocument();
    expect(screen.getByText('Mentored junior developers.').tagName).toBe('LI');

    // Details from second job
    expect(screen.getByText('Built MVP from scratch.')).toBeInTheDocument();
    expect(screen.getByText('Built MVP from scratch.').tagName).toBe('LI');
    expect(screen.getByText('Implemented responsive design.')).toBeInTheDocument();
    expect(screen.getByText('Implemented responsive design.').tagName).toBe('LI');
  });

  it('renders correctly with an empty experience array', () => {
    render(<Experience experience={[]} />);

    expect(screen.getByText('工作经历')).toBeInTheDocument();
    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
  });

  it('handles missing or empty fields gracefully', () => {
    // Though types define them as required strings, testing empty strings and arrays
    const edgeCaseExperience = [
      {
        company: '',
        role: '',
        time: '',
        details: []
      }
    ];

    const { container } = render(<Experience experience={edgeCaseExperience} />);

    // The component should render the section title
    expect(screen.getByText('工作经历')).toBeInTheDocument();

    // It should render a job container but no list items for details
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});
