'use client';
import { useState } from 'react';

interface ShareURLProps {
  url: string;
}

export function ShareURL({ url }: ShareURLProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.origin + url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="sidebar-card">
      <div className="sidebar-heading">Share</div>
      <div className="share-url-field">
        <input type="text" readOnly value={url} />
        <button type="button" aria-label="Copy URL" onClick={handleCopy}>
          <span className="material-icons" aria-hidden="true" style={{ fontSize: '1rem' }}>
            {copied ? 'check' : 'content_copy'}
          </span>
        </button>
      </div>
    </div>
  );
}
