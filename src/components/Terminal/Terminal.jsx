import React, { useState, useRef, useEffect, useCallback } from 'react';
import VirtualFS from '../../filesystem/VirtualFS';
import { execute } from '../../commands/registry';
import registerSystemCommands from '../../commands/system';
import registerInfoCommands from '../../commands/info';
import registerFunCommands from '../../commands/fun';
import registerTerminalCommands from '../../commands/terminal';
import { useTheme } from '../../context/ThemeContext';
import { useCommandHistory } from '../../hooks/useCommandHistory';
import { useTabCompletion } from '../../hooks/useTabCompletion';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import Portfolio from '../Portfolio/Portfolio';
import './Terminal.css';
import '../../styles/themes.css';
import '../../styles/animations.css';

const WELCOME = [
  '<span style="color:#64ffda;font-weight:bold">Szymon Florek</span> <span style="color:#555">\u2014 MSc Quantum Computing @ WAT \u2022 Software Dev @ ardium-pl</span>',
  '',
  'Type <span class="command-highlight">help</span> for commands, <span class="command-highlight">about</span> for bio, or <span class="command-highlight">portfolio</span> for the visual experience.',
];

let commandsRegistered = false;
function ensureCommands() {
  if (commandsRegistered) return;
  registerSystemCommands();
  registerInfoCommands();
  registerFunCommands();
  registerTerminalCommands();
  commandsRegistered = true;
}

export default function Terminal() {
  ensureCommands();

  const [output, setOutput] = useState(WELCOME);
  const [isVimMode, setVimMode] = useState(false);
  const [isPortfolioVisible, setPortfolioVisible] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const [isMinimized, setMinimized] = useState(false);
  const [isMaximized, setMaximized] = useState(false);

  const { theme, setTheme } = useTheme();
  const fsRef = useRef(new VirtualFS());
  const historyRef = useRef([]);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const { currentCommand, setCurrentCommand, handleHistoryNav, resetHistory } = useCommandHistory(historyRef);
  const tabComplete = useTabCompletion(fsRef.current);

  const addOutput = useCallback((...lines) => {
    setOutput(prev => [...prev, ...lines]);
  }, []);

  const clearOutput = useCallback(() => setOutput([]), []);

  const handleCommand = useCallback((input) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const cwd = fsRef.current.cwdShort();

    const ctx = {
      fs: fsRef.current,
      addOutput,
      clearOutput,
      setTheme,
      theme,
      setVimMode,
      isVimMode,
      setPortfolioVisible,
      setDeleting,
      setOutput,
      history: historyRef.current,
      outputRef,
    };

    if (isVimMode) {
      const vimCmds = [':q', ':q!', ':wq', ':wq!', 'ZZ', 'ZQ', 'exit', 'quit', 'please-let-me-out'];
      if (vimCmds.includes(trimmed)) {
        const result = execute(trimmed, ctx);
        if (result) addOutput(result);
      } else {
        addOutput(`<span style="color:#ff5555;">E492: Not an editor command: ${trimmed}</span>`);
        addOutput(`<span style="color:#888;">Hint: try <span style="color:#e5c07b;">:q!</span> or <span style="color:#e5c07b;">:wq</span> ... or discover the secret command (<span style="color:#98c379;">cat .vimrc</span>)</span>`);
      }
    } else {
      addOutput(`<span class="prompt-user">szymon@portfolio:${cwd}$</span><span style="color:#fff"> ${trimmed}</span>`);
      const result = execute(trimmed, ctx);
      if (result) addOutput(result);
    }

    historyRef.current.push(trimmed);
    setCurrentCommand('');
    resetHistory();
  }, [isVimMode, addOutput, clearOutput, setTheme, theme, setCurrentCommand, resetHistory, setPortfolioVisible, setDeleting, setOutput, setVimMode]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleHistoryNav(e.key);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completed = tabComplete(currentCommand);
      if (completed) setCurrentCommand(completed);
    } else if (e.key === 'Escape' && isPortfolioVisible) {
      handlePortfolioBack();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearOutput();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommand, handleCommand, handleHistoryNav, tabComplete, setCurrentCommand, isPortfolioVisible, clearOutput]);

  const handlePortfolioBack = useCallback(() => {
    setPortfolioVisible(false);
    setOutput(prev => prev.filter(line => !line.includes('Opening Professional Portfolio View')));
    setTimeout(() => {
      if (outputRef.current) outputRef.current.scrollTop = 0;
    }, 100);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
      setOutput([
        '<span style="color:#64ffda;font-weight:bold">Szymon Florek</span> <span style="color:#555">\u2014 MSc Quantum Computing @ WAT \u2022 Software Dev @ ardium-pl</span>',
        '',
        'Terminal restarted. Type <span class="command-highlight">help</span> for commands.',
      ]);
    }, 1500);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current && !isPortfolioVisible) inputRef.current.focus();
    };
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, [isPortfolioVisible]);

  useEffect(() => {
    const handleRedPill = () => {
      setTheme('hacker');
      addOutput(`<div style="color:#0f0;text-shadow:0 0 5px #0f0;">
  <p style="font-size:24px;font-weight:bold;text-align:center;text-transform:uppercase;letter-spacing:2px;">You take the red pill...</p>
  <div style="border:1px solid #0f0;padding:15px;margin:20px 0;background:rgba(0,255,0,0.1);border-radius:5px;">
    <p style="text-align:center;">The Matrix has been revealed to you.</p>
    <p style="text-align:center;">Welcome to the real world.</p>
  </div>
</div>`);
    };
    const handleBluePill = () => {
      setTheme('default');
      addOutput(`<div style="color:#3498db;">
  <p style="font-size:24px;font-weight:bold;text-align:center;">You take the blue pill...</p>
  <div style="border:1px solid #3498db;padding:15px;margin:20px 0;background:rgba(52,152,219,0.1);border-radius:5px;">
    <p style="text-align:center;">The story ends. You wake up believing whatever you want.</p>
  </div>
</div>`);
    };

    document.addEventListener('matrix-red-pill', handleRedPill);
    document.addEventListener('matrix-blue-pill', handleBluePill);
    return () => {
      document.removeEventListener('matrix-red-pill', handleRedPill);
      document.removeEventListener('matrix-blue-pill', handleBluePill);
    };
  }, [setTheme, addOutput]);

  const containerClass = [
    'terminal-container',
    isMinimized && 'minimized',
    isMaximized && 'maximized',
    `theme-${theme}`,
  ].filter(Boolean).join(' ');

  const prompt = `szymon@portfolio:${fsRef.current.cwdShort()}$ `;

  if (!isVisible) return null;

  return (
    <div className={containerClass}>
      <div className="terminal">
        <TerminalHeader
          onClose={handleClose}
          onMinimize={() => setMinimized(m => !m)}
          onMaximize={() => setMaximized(m => !m)}
        />
        <div
          className={`terminal-content ${isDeleting ? 'deleting' : ''}`}
          ref={outputRef}
          onClick={() => inputRef.current?.focus()}
        >
          {isPortfolioVisible ? (
            <Portfolio onBack={handlePortfolioBack} />
          ) : (
            <>
              <TerminalOutput lines={output} />
              <TerminalInput
                prompt={prompt}
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
                disabled={isDeleting}
                isVimMode={isVimMode}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
