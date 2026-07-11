import React from 'react';

// Regular expressions for markdown parsing
const inlineRegex = /(\*\*.*?\*\*|`.*?`)/g;
const nonWhitespaceRegex = /\S/;
const unorderedListRegex = /^[-*]\s+(.*)$/;
const orderedListRegex = /^(\d+)\.\s+(.*)$/;

// Recursively parse inline bold (**text**) and code blocks (`text`)
export const parseInline = (inlineText: string): React.ReactNode[] => {
  const parts = inlineText.split(inlineRegex);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 bg-slate-100 text-blue-600 text-xs rounded font-mono border border-slate-200/50 mx-0.5 font-medium">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

// Custom high-performance markdown parser for rendering raw md strings with rich styling
export const renderMarkdown = (text: string | { default: string } | undefined | null) => {
  const markdownString = typeof text === 'string'
    ? text
    : (text && typeof text === 'object' && 'default' in text ? text.default : '');

  if (!markdownString || typeof markdownString !== 'string') {
    return <p className="text-slate-500 text-sm">正在加载数据或数据格式错误...</p>;
  }

  return markdownString.split('\n').map((line, i) => {
    const leadingSpaces = line.search(nonWhitespaceRegex);
    const trimmed = line.trim();

    if (trimmed === '') {
      return <div key={i} className="h-2" />;
    }

    // 1. Divider
    if (trimmed.startsWith('---')) {
      return <hr key={i} className="my-5 border-slate-200" />;
    }

    // 2. Headings
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={i} className="text-2xl font-bold mt-6 mb-3 text-slate-800 border-b pb-2 border-slate-200">
          {parseInline(trimmed.replace('# ', ''))}
        </h1>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-lg font-bold mt-5 mb-2.5 text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-500 rounded-full inline-block"></span>
          {parseInline(trimmed.replace('## ', ''))}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-sm font-bold mt-4 mb-2 text-slate-700">
          {parseInline(trimmed.replace('### ', ''))}
        </h3>
      );
    }

    // 3. Unordered Lists (bullet points, supporting leading spaces indentation)
    const ulMatch = trimmed.match(unorderedListRegex);
    if (ulMatch) {
      const indentStyle = leadingSpaces > 0 ? { marginLeft: `${leadingSpaces * 6}px` } : { marginLeft: '16px' };
      return (
        <li key={i} style={indentStyle} className="list-disc text-slate-600 my-1 text-sm leading-relaxed">
          {parseInline(ulMatch[1])}
        </li>
      );
    }

    // 4. Numbered Lists
    const olMatch = trimmed.match(orderedListRegex);
    if (olMatch) {
      const num = parseInt(olMatch[1], 10);
      const indentStyle = leadingSpaces > 0 ? { marginLeft: `${leadingSpaces * 6}px` } : { marginLeft: '16px' };
      return (
        <li key={i} value={num} style={indentStyle} className="list-decimal text-slate-600 my-1 text-sm leading-relaxed">
          {parseInline(olMatch[2])}
        </li>
      );
    }

    // 5. Normal Paragraphs
    return (
      <p key={i} className="text-slate-600 my-1.5 leading-relaxed text-sm">
        {parseInline(trimmed)}
      </p>
    );
  });
};
