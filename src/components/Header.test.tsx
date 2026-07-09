import { render, screen } from '@testing-library/react';
import { Mail, Phone } from 'lucide-react';
import Header from './Header';

describe('Header Component', () => {
  const mockProfile = {
    name: 'Jane Doe',
    title: 'Software Engineer',
    summary: 'A passionate developer building web applications.',
    contact: [
      {
        icon: Mail,
        value: 'jane.doe@example.com',
        link: 'mailto:jane.doe@example.com'
      },
      {
        icon: Phone,
        value: '123-456-7890'
      }
    ]
  };

  it('renders profile information correctly', () => {
    render(<Header profile={mockProfile} />);

    // Check if name is rendered
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();

    // Check if summary is rendered
    expect(screen.getByText('A passionate developer building web applications.')).toBeInTheDocument();
  });

  it('renders contact items correctly with links', () => {
    render(<Header profile={mockProfile} />);

    // Check if email link is rendered correctly
    const emailLink = screen.getByRole('link', { name: 'jane.doe@example.com' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:jane.doe@example.com');
  });

  it('renders contact items correctly without links', () => {
    render(<Header profile={mockProfile} />);

    // Check if phone number is rendered as plain text (not a link)
    const phoneText = screen.getByText('123-456-7890');
    expect(phoneText).toBeInTheDocument();
    expect(phoneText.tagName).not.toBe('A');
  });

  it('renders correctly with empty contact list', () => {
    const profileWithoutContact = { ...mockProfile, contact: [] };
    render(<Header profile={profileWithoutContact} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByText('jane.doe@example.com')).not.toBeInTheDocument();
  });
});
