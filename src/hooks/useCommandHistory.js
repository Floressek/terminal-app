import { useState, useCallback } from 'react';

export function useCommandHistory(historyRef) {
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');

  const handleHistoryNav = useCallback((key) => {
    const history = historyRef.current;
    if (!history.length) return;

    if (key === 'ArrowUp') {
      if (historyIndex === -1) {
        setSavedInput(currentCommand);
        const newIdx = history.length - 1;
        setHistoryIndex(newIdx);
        setCurrentCommand(history[newIdx]);
      } else if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setCurrentCommand(history[newIdx]);
      }
    } else if (key === 'ArrowDown') {
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setCurrentCommand(history[newIdx]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand(savedInput);
      }
    }
  }, [historyIndex, currentCommand, savedInput, historyRef]);

  const resetHistory = useCallback(() => {
    setHistoryIndex(-1);
    setSavedInput('');
  }, []);

  return { currentCommand, setCurrentCommand, handleHistoryNav, resetHistory };
}
