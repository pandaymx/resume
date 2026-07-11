import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';
import type { SkillGroup } from './Skills';

describe('Skills Component', () => {
  const mockSkills: SkillGroup[] = [
    {
      category: '前端框架',
      items: ['React', 'Vue', 'Svelte'],
    },
    {
      category: '后端',
      items: ['Node.js', 'Python'],
    },
  ];

  it('renders section title correctly', () => {
    const { container } = render(<Skills skills={mockSkills} />);
    expect(screen.getByText('专业技能')).toBeInTheDocument();

    // The SectionTitle component renders an SVG for the icon. We can verify it exists.
    // The icon is rendered inside the h3 element.
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders skill categories and items correctly', () => {
    render(<Skills skills={mockSkills} />);

    // Check categories
    expect(screen.getByText('• 前端框架：')).toBeInTheDocument();
    expect(screen.getByText('• 后端：')).toBeInTheDocument();

    // Check items joined by '、'
    expect(screen.getByText('React、Vue、Svelte')).toBeInTheDocument();
    expect(screen.getByText('Node.js、Python')).toBeInTheDocument();
  });

  it('renders safely with an empty skills array', () => {
    render(<Skills skills={[]} />);

    expect(screen.getByText('专业技能')).toBeInTheDocument();
    // No categories should be rendered
    expect(screen.queryByText('• 前端框架：')).not.toBeInTheDocument();
  });

  it('renders safely with an empty items array within a skill group', () => {
    const skillsWithEmptyItems: SkillGroup[] = [
      {
        category: '工具',
        items: [],
      },
    ];

    render(<Skills skills={skillsWithEmptyItems} />);

    expect(screen.getByText('• 工具：')).toBeInTheDocument();
    // We expect the items span to be empty, so no text is joined
    // The parent span for items will not have content but won't crash
  });

  it('renders special characters and long text correctly', () => {
    const specialSkills: SkillGroup[] = [
      {
        category: 'Very Long Category Name That Might Wrap Or Cause Issues @#$%^&*()',
        items: ['C++', 'C#', 'Objective-C', 'Long text value string testing layout @#$%^&*()'],
      },
    ];

    render(<Skills skills={specialSkills} />);

    expect(screen.getByText('• Very Long Category Name That Might Wrap Or Cause Issues @#$%^&*()：')).toBeInTheDocument();
    expect(screen.getByText('C++、C#、Objective-C、Long text value string testing layout @#$%^&*()')).toBeInTheDocument();
  });
});
