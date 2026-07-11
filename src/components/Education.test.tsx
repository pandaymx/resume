import { render, screen } from '@testing-library/react';
import Education from './Education';
import { describe, it, expect } from 'vitest';

describe('Education Component', () => {
  const mockEducation = {
    school: 'Tsinghua University',
    degree: 'Bachelor of Engineering',
    time: '2015 - 2019',
    details: ['GPA 3.9/4.0', 'National Scholarship']
  };

  it('renders section title correctly', () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText('教育背景')).toBeInTheDocument();
  });

  it('renders basic education information correctly', () => {
    render(<Education education={mockEducation} />);

    expect(screen.getByText('Tsinghua University')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Engineering')).toBeInTheDocument();
    expect(screen.getByText('2015 - 2019')).toBeInTheDocument();
  });

  it('renders details correctly when populated', () => {
    render(<Education education={mockEducation} />);

    // Details are joined by '、'
    expect(screen.getByText('GPA 3.9/4.0、National Scholarship')).toBeInTheDocument();
  });

  it('does not render details when the details array is empty', () => {
    const emptyDetailsEducation = {
      ...mockEducation,
      details: []
    };

    render(<Education education={emptyDetailsEducation} />);

    expect(screen.queryByText('GPA 3.9/4.0、National Scholarship')).not.toBeInTheDocument();
    expect(screen.getByText('Tsinghua University')).toBeInTheDocument(); // Ensure it still renders without crashing
  });
});
