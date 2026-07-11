import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { parseInline, renderMarkdown } from './markdown';

describe('markdown utilities', () => {
  describe('parseInline', () => {
    it('should parse plain text', () => {
      const result = parseInline('Hello world');
      expect(result).toEqual(['Hello world']);
    });

    it('should parse bold text', () => {
      const { container } = render(<>{parseInline('Hello **bold** world')}</>);
      expect(container).toHaveTextContent('Hello bold world');
      const strongElement = container.querySelector('strong');
      expect(strongElement).toBeInTheDocument();
      expect(strongElement).toHaveTextContent('bold');
      expect(strongElement).toHaveClass('font-bold text-slate-800');
    });

    it('should parse code text', () => {
      const { container } = render(<>{parseInline('Use the `code` function')}</>);
      expect(container).toHaveTextContent('Use the code function');
      const codeElement = container.querySelector('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('code');
      expect(codeElement).toHaveClass('px-1.5 py-0.5 bg-slate-100 text-blue-600');
    });

    it('should handle empty input', () => {
      const result = parseInline('');
      expect(result).toEqual(['']);
    });

    it('should handle complex mixed content', () => {
      const { container } = render(<>{parseInline('Mix **bold** and `code` here')}</>);
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('code')).toBeInTheDocument();
      expect(container.textContent).toBe('Mix bold and code here');
    });
  });

  describe('renderMarkdown', () => {
    it('should handle null or undefined input', () => {
      const { container } = render(<>{renderMarkdown(null)}</>);
      expect(container).toHaveTextContent('正在加载数据或数据格式错误...');

      const { container: container2 } = render(<>{renderMarkdown(undefined)}</>);
      expect(container2).toHaveTextContent('正在加载数据或数据格式错误...');
    });

    it('should handle an object with default property', () => {
      const { container } = render(<>{renderMarkdown({ default: 'Hello' })}</>);
      expect(container.querySelector('p')).toHaveTextContent('Hello');
    });

    it('should parse paragraphs', () => {
      const { container } = render(<>{renderMarkdown('This is a paragraph.')}</>);
      const p = container.querySelector('p');
      expect(p).toBeInTheDocument();
      expect(p).toHaveTextContent('This is a paragraph.');
      expect(p).toHaveClass('text-slate-600 my-1.5 leading-relaxed text-sm');
    });

    it('should parse headings', () => {
      const { container } = render(<>{renderMarkdown('# Heading 1\n## Heading 2\n### Heading 3')}</>);

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Heading 1');

      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('Heading 2');

      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      expect(h3).toHaveTextContent('Heading 3');
    });

    it('should parse dividers', () => {
      const { container } = render(<>{renderMarkdown('---')}</>);
      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
      expect(hr).toHaveClass('my-5 border-slate-200');
    });

    it('should parse unordered lists', () => {
      const { container } = render(<>{renderMarkdown('- Item 1\n* Item 2')}</>);
      const items = container.querySelectorAll('li');
      expect(items.length).toBe(2);
      expect(items[0]).toHaveTextContent('Item 1');
      expect(items[0]).toHaveClass('list-disc');
      expect(items[1]).toHaveTextContent('Item 2');
      expect(items[1]).toHaveClass('list-disc');
    });

    it('should parse ordered lists', () => {
      const { container } = render(<>{renderMarkdown('1. First item\n2. Second item')}</>);
      const items = container.querySelectorAll('li');
      expect(items.length).toBe(2);
      expect(items[0]).toHaveTextContent('First item');
      expect(items[0]).toHaveClass('list-decimal');
      expect(items[1]).toHaveTextContent('Second item');
      expect(items[1]).toHaveClass('list-decimal');
    });

    it('should handle blank lines', () => {
      const { container } = render(<>{renderMarkdown('Line 1\n\nLine 2')}</>);
      const spacer = container.querySelector('div.h-2');
      expect(spacer).toBeInTheDocument();
    });
  });
});
