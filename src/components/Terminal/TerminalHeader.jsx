import React from 'react';

export default function TerminalHeader({ onClose, onMinimize, onMaximize, title }) {
  return (
    <div className="terminal-header">
      <div className="terminal-controls">
        <span className="control close" onClick={onClose} title="Close" />
        <span className="control minimize" onClick={onMinimize} title="Minimize" />
        <span className="control maximize" onClick={onMaximize} title="Maximize" />
      </div>
      <div className="terminal-title">
        <span>{title || 'szymon@portfolio'}</span>
        <span className="status-indicator" />
      </div>
    </div>
  );
}
