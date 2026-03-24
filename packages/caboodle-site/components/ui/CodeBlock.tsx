'use client';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-block">
      <button className="code-block-copy" type="button" aria-label="Copy code" onClick={handleCopy}>
        <span className="material-icons" aria-hidden="true">
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
      <code>{code}</code>
    </div>
  );
}
