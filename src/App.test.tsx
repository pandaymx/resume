// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the main sections of the resume and initially hides the AI memory modal', () => {
    render(<App />);

    // Assert main sections are present (we can check for basic structural elements from child components)
    // Header should render profile name, or we can check for the AI memory button.
    expect(screen.getByRole('button', { name: /AI 记忆库/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /下载 \/ 打印 PDF/i })).toBeInTheDocument();

    // Assert the modal is initially closed
    expect(screen.queryByText('AI 记忆库 / Context')).not.toBeInTheDocument();
  });

  it('opens and closes the AI memory modal correctly', async () => {
    render(<App />);

    // Click the button to open the modal
    fireEvent.click(screen.getByRole('button', { name: /AI 记忆库/i }));

    // Modal title should appear
    const modalTitle = await screen.findByText('AI 记忆库 / Context');
    expect(modalTitle).toBeInTheDocument();

    // Verify some text from aiMemory is rendered (since aiMemory is mocked/provided globally, we might need to check if markdown is rendered, or mock aiMemory if it's empty, but normally we just check a snippet. Let's see what `data.aiMemory` holds, or just check the modal body renders something).
    // Let's close it using "我知道了"
    fireEvent.click(screen.getByRole('button', { name: /我知道了/i }));

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText('AI 记忆库 / Context')).not.toBeInTheDocument();
    });

    // Reopen to test 'X' close button
    fireEvent.click(screen.getByRole('button', { name: /AI 记忆库/i }));
    await screen.findByText('AI 记忆库 / Context');

    // Close using 'X' button
    // Since the X button doesn't have text or a dedicated aria-label, we can find it by traversing from the modal title.
    const reOpenedModalTitle = await screen.findByText('AI 记忆库 / Context');
    const modalHeader = reOpenedModalTitle.closest('.memory-modal-header');
    const xButton = modalHeader?.querySelector('button');
    if (xButton) {
      fireEvent.click(xButton);
    }

    await waitFor(() => {
      expect(screen.queryByText('AI 记忆库 / Context')).not.toBeInTheDocument();
    });
  }, 15000);

  it('triggers window.print when print buttons are clicked', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    render(<App />);

    // Click the main print button
    fireEvent.click(screen.getByRole('button', { name: /下载 \/ 打印 PDF/i }));
    expect(printSpy).toHaveBeenCalledTimes(1);

    // Open modal to click the inside print button
    fireEvent.click(screen.getByRole('button', { name: /AI 记忆库/i }));
    await screen.findByText('AI 记忆库 / Context');

    // Click print inside modal
    fireEvent.click(screen.getByRole('button', { name: /打印此内容/i }));
    expect(printSpy).toHaveBeenCalledTimes(2);
  }, 15000);
});
