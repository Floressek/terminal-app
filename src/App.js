import React from 'react';
import Terminal from './components/Terminal/Terminal';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Terminal />
      </div>
    </ThemeProvider>
  );
}

export default App;
