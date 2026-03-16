import React from 'react';
import { register } from './registry';
import { THEMES } from '../context/ThemeContext';

export default function registerTerminalCommands() {
  register('clear', {
    description: 'Clear the terminal',
    usage: 'clear',
    handler(_, ctx) {
      ctx.clearOutput();
      return '';
    },
  });

  register('theme', {
    description: 'Change terminal theme',
    usage: 'theme [name]',
    handler(argsStr, ctx) {
      const name = argsStr.trim();
      if (!name || !THEMES.includes(name)) {
        return `Available themes: ${THEMES.join(', ')}\nUsage: theme [theme_name]`;
      }
      ctx.setTheme(name);
      return `Terminal theme changed to "${name}"`;
    },
  });

  register('neofetch', {
    description: 'Display system information',
    usage: 'neofetch',
    handler(_, ctx) {
      const uptime = Math.floor(Math.random() * 24) + 'h ' + Math.floor(Math.random() * 60) + 'm';
      const os = navigator.platform || 'Portfolio OS';
      const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' :
        navigator.userAgent.includes('Firefox') ? 'Firefox' :
        navigator.userAgent.includes('Safari') ? 'Safari' : 'Unknown';
      const resolution = `${window.innerWidth}x${window.innerHeight}`;

      return `<div style="display:flex;align-items:flex-start;gap:20px;">
  <pre style="color:#64ffda;font-size:11px;line-height:1.1;">
   _____ ______
  / ____|  ____|
 | (___ | |__
  \\___ \\|  __|
  ____) | |
 |_____/|_|

 szymon@portfolio
  </pre>
  <div style="line-height:1.6;">
    <span style="color:#64ffda;font-weight:bold;">szymon</span><span style="color:#fff;">@</span><span style="color:#64ffda;font-weight:bold;">portfolio</span>
    <span style="color:#555;">${'\u2500'.repeat(28)}</span>
    <span style="color:#64ffda;">OS:</span> <span style="color:#fff;">${os}</span>
    <span style="color:#64ffda;">Host:</span> <span style="color:#fff;">Portfolio Terminal v2.0</span>
    <span style="color:#64ffda;">Kernel:</span> <span style="color:#fff;">React ${React.version}</span>
    <span style="color:#64ffda;">Uptime:</span> <span style="color:#fff;">${uptime}</span>
    <span style="color:#64ffda;">Shell:</span> <span style="color:#fff;">portfolio-bash 5.1</span>
    <span style="color:#64ffda;">Resolution:</span> <span style="color:#fff;">${resolution}</span>
    <span style="color:#64ffda;">Browser:</span> <span style="color:#fff;">${browser}</span>
    <span style="color:#64ffda;">Theme:</span> <span style="color:#fff;">${ctx.theme}</span>
    <span style="color:#555;">${'\u2500'.repeat(28)}</span>
    <span style="color:#64ffda;">User:</span> <span style="color:#fff;">Szymon Florek</span>
    <span style="color:#64ffda;">Role:</span> <span style="color:#fff;">MSc Quantum Computing @ WAT</span>
    <span style="color:#64ffda;">Work:</span> <span style="color:#fff;">Software Dev @ ardium-pl</span>
    <span style="color:#64ffda;">BSc:</span> <span style="color:#ffcc00;">Honors (5.0)</span> <span style="color:#888;">\u2014 RAG Chatbots</span>
    <span style="color:#64ffda;">Repos:</span> <span style="color:#fff;">45 public on GitHub</span>
    <span style="color:#64ffda;">Web:</span> <span style="color:#fff;">floressek.com</span>
    <span style="color:#555;">${'\u2500'.repeat(28)}</span>
    <div style="display:flex;gap:2px;margin-top:4px;">
      <span style="color:#ff0000;">\u2588\u2588</span><span style="color:#ff7f00;">\u2588\u2588</span><span style="color:#ffff00;">\u2588\u2588</span><span style="color:#00ff00;">\u2588\u2588</span><span style="color:#0000ff;">\u2588\u2588</span><span style="color:#4b0082;">\u2588\u2588</span><span style="color:#9400d3;">\u2588\u2588</span>
    </div>
  </div>
</div>`;
    },
  });

  register('vim', {
    description: 'Open the vim editor (if you dare)',
    usage: 'vim',
    handler(_, ctx) {
      ctx.setVimMode(true);

      setTimeout(() => {
        ctx.addOutput(`<div class="vim-editor">
  <div class="vim-header">
    <span>"untitled" [New File]</span>
    <span>0,0-1 All</span>
  </div>
  <div class="vim-content">
    ${'<p>~</p>'.repeat(12)}
  </div>
  <div class="vim-mode">
    <span style="color:#ff5555;font-weight:bold;background:#2d2d2d;padding:2px 8px;border-radius:3px;border:1px solid #444;">-- INSERT --</span>
    <span class="vim-hint">You're trapped in vim! Try typing :q! to exit</span>
  </div>
  <div class="vim-footer">
    <span>"untitled" [New File]</span>
    <span style="color:#e5c07b;">Hint: There's a secret escape command... (try 'cat .vimrc')</span>
    <span>0,0-1 All</span>
  </div>
</div>`);
      }, 500);

      return 'Opening vim...';
    },
  });

  register('please-let-me-out', {
    description: 'Secret escape from vim',
    handler(_, ctx) {
      ctx.setVimMode(false);
      return '<span style="color:green;">Congratulations! You found the secret escape command! Exiting vim...</span>';
    },
  });

  const vimFakeCommands = [':q', ':q!', ':wq', ':wq!', 'ZZ', 'ZQ', 'exit', 'quit'];
  vimFakeCommands.forEach(cmd => {
    register(cmd, {
      description: 'Vim command (trapped!)',
      handler() {
        const msgs = {
          ':q': 'E37: No write since last change (add ! to override)',
          ':q!': "E212: Can't open file for writing: Permission denied",
          ':wq': "E212: Can't open file for writing: Permission denied",
          ':wq!': "E212: Can't open file for writing: Permission denied",
          'ZZ': "E212: Can't open file for writing: Permission denied",
          'ZQ': 'Not an editor command: ZQ',
          'exit': 'Not an editor command: exit',
          'quit': 'Not an editor command: quit',
        };
        return `<span style="color:red;">${msgs[cmd] || 'Not an editor command'}</span>`;
      },
    });
  });

  register('portfolio', {
    description: 'View my professional portfolio',
    usage: 'portfolio',
    handler(_, ctx) {
      ctx.setPortfolioVisible(true);
      setTimeout(() => {
        if (ctx.outputRef && ctx.outputRef.current) {
          ctx.outputRef.current.scrollTop = 0;
        }
      }, 100);
      return `<div style="text-align:center;padding:20px;color:#64ffda;">
  <h2 style="margin-bottom:15px;">Opening Professional Portfolio View</h2>
  <p style="margin-bottom:10px;">Switching to visual representation...</p>
  <div style="font-size:24px;margin:20px 0;">
    <span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span>
  </div>
</div>`;
    },
  });
}
