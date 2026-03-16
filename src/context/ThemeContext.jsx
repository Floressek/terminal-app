import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const THEMES = ['default', 'hacker', 'retro', 'synthwave'];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');

  const changeTheme = (name) => {
    if (THEMES.includes(name)) {
      setTheme(name);
      return true;
    }
    return false;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
