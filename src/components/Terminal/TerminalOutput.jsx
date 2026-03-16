import React from 'react';

const IS_HTML = /<[a-zA-Z]/;

export default function TerminalOutput({ lines }) {
  return (
    <div id="terminal-output">
      {lines.map((line, i) =>
        IS_HTML.test(line)
          ? <div key={i} className="line" dangerouslySetInnerHTML={{ __html: line }} />
          : <div key={i} className="line">{line}</div>
      )}
    </div>
  );
}
