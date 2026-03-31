import React from 'react';
import DOMPurify from 'dompurify';

const IS_HTML = /<[a-zA-Z]/;

export default function TerminalOutput({ lines }) {
  return (
    <div id="terminal-output">
      {lines.map((line, i) => {
        // Support structured HTML lines: { type: 'html', content: string }
        if (line && typeof line === 'object' && line.type === 'html' && typeof line.content === 'string') {
          const sanitized = DOMPurify.sanitize(line.content);
          return (
            <div
              key={i}
              className="line"
              dangerouslySetInnerHTML={{ __html: sanitized }}
            />
          );
        }

        if (typeof line === 'string' && IS_HTML.test(line)) {
          const sanitized = DOMPurify.sanitize(line);
          return (
            <div
              key={i}
              className="line"
              dangerouslySetInnerHTML={{ __html: sanitized }}
            />
          );
        }

        return (
          <div key={i} className="line">
            {String(line)}
          </div>
        );
      })}
    </div>
  );
}
