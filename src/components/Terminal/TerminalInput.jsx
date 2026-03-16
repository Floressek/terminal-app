import React from 'react';

export default function TerminalInput({ prompt, value, onChange, onKeyDown, inputRef, disabled, isVimMode }) {
  return (
    <div className="input-line">
      <span className="prompt-user">
        {isVimMode ? (
          <span className="vim-prompt-badge">--VIM--</span>
        ) : (
          prompt
        )}
      </span>
      <input
        id="command-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
        disabled={disabled}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
