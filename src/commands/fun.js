import { register } from './registry';
import quotes from '../data/quotes';

export default function registerFunCommands() {
  register('matrix', {
    description: 'Enter the Matrix',
    usage: 'matrix',
    handler(_, ctx) {
      ctx.setTheme('hacker');

      setTimeout(() => {
        ctx.addOutput(
          'Initiating Matrix mode...',
          'Wake up, Neo...',
          'The Matrix has you...',
          'Follow the white rabbit.',
          'Knock, knock, Neo.'
        );

        setTimeout(() => {
          ctx.addOutput(
            `<div class="matrix-code"><pre style="color:#0f0;text-shadow:0 0 5px #0f0;font-family:monospace;overflow:hidden;">
01001110 01100101 01101111 00001010 01010111 01100001 01101011 01100101
01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010
01101001 01111000 00100000 01101000 01100001 01110011 00100000 01111001
01101111 01110101 00001010 01000110 01101111 01101100 01101100 01101111
01110111 00100000 01110100 01101000 01100101 00100000 01110111 01101000
01101001 01110100 01100101 00100000 01110010 01100001 01100010 01100010
</pre></div>`,
            `<div style="color:#0f0;margin-top:20px;text-shadow:0 0 5px #0f0;">
  <p>Choose your pill:</p>
  <div style="display:flex;justify-content:center;gap:20px;margin:20px 0;">
    <button style="background:#ff0000;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-weight:bold;box-shadow:0 0 10px rgba(255,0,0,0.7);" onclick="(function(){document.dispatchEvent(new CustomEvent('matrix-red-pill'))})()">RED PILL</button>
    <button style="background:#0000ff;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-weight:bold;box-shadow:0 0 10px rgba(0,0,255,0.7);" onclick="(function(){document.dispatchEvent(new CustomEvent('matrix-blue-pill'))})()">BLUE PILL</button>
  </div>
  <p style="margin-top:10px;">Red Pill - See how deep the rabbit hole goes</p>
  <p>Blue Pill - Return to normal terminal</p>
</div>`
          );
        }, 3000);
      }, 500);

      return 'Loading Matrix sequence...';
    },
  });

  register('red pill', {
    description: 'Take the red pill',
    handler(_, ctx) {
      ctx.setTheme('hacker');
      ctx.addOutput(`<div style="color:#0f0;text-shadow:0 0 5px #0f0;">
  <p style="font-size:24px;font-weight:bold;margin-bottom:15px;text-align:center;text-transform:uppercase;letter-spacing:2px;">You take the red pill...</p>
  <div style="border:1px solid #0f0;padding:15px;margin:20px 0;background:rgba(0,255,0,0.1);border-radius:5px;">
    <p style="font-size:16px;margin-bottom:10px;text-align:center;">The Matrix has been revealed to you.</p>
    <p style="font-size:16px;text-align:center;">Welcome to the real world.</p>
  </div>
  <div style="text-align:center;margin-top:25px;padding:15px;border:1px dashed #0f0;border-radius:5px;">
    <p style="margin-bottom:15px;">You are now in <span style="color:#f00;text-shadow:0 0 5px #f00;">The Matrix</span>.</p>
    <p>Type <span class="command-highlight">help</span> to see available commands.</p>
  </div>
</div>`);
      return '';
    },
  });

  register('blue pill', {
    description: 'Take the blue pill',
    handler(_, ctx) {
      ctx.setTheme('default');
      ctx.addOutput(`<div style="color:#3498db;text-shadow:0 0 5px #3498db;">
  <p style="font-size:24px;font-weight:bold;margin-bottom:15px;text-align:center;text-transform:uppercase;letter-spacing:2px;">You take the blue pill...</p>
  <div style="border:1px solid #3498db;padding:15px;margin:20px 0;background:rgba(52,152,219,0.1);border-radius:5px;">
    <p style="font-size:16px;margin-bottom:10px;text-align:center;">The story ends here.</p>
    <p style="font-size:16px;text-align:center;">You wake up and believe whatever you want to believe.</p>
  </div>
  <div style="margin:25px 0;text-align:center;border:1px solid #3498db;border-radius:5px;padding:10px;background:rgba(0,0,0,0.7);">
    <div style="font-size:50px;margin:20px 0;animation:fadeIn 3s ease-in-out;">(-.-)Zzz...</div>
    <p style="font-size:18px;margin:15px 0;opacity:0.8;">Returning to the comfort of ignorance...</p>
  </div>
  <div style="text-align:center;margin-top:25px;padding:15px;border:1px dashed #3498db;border-radius:5px;">
    <p>Type <span class="command-highlight">help</span> to see available commands.</p>
  </div>
</div>`);
      return '';
    },
  });

  register('quote', {
    description: 'Display a random programming quote',
    usage: 'quote',
    handler() {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      return `<div style="color:#fff;padding:10px;border-left:4px solid #00ffff;margin:10px 0;">
  <p style="font-style:italic;font-size:16px;">"${q.text}"</p>
  <p style="text-align:right;color:#00ffff;">\u2014 ${q.author}</p>
</div>`;
    },
  });

  register('hack', {
    description: 'Simulate a hacking sequence',
    usage: 'hack',
    handler(_, ctx) {
      const targets = ['NASA', 'Pentagon', 'FBI', 'CIA', 'NSA', 'MI6', 'Area 51', 'GitHub', 'StackOverflow', 'Google'];
      const target = targets[Math.floor(Math.random() * targets.length)];
      const steps = [
        `<div style="color:#0f0;font-family:monospace;">Initializing hack sequence on ${target} servers...</div>`,
        `<div style="color:#0f0;font-family:monospace;">Bypassing firewall...</div>`,
        `<div style="color:#0f0;font-family:monospace;">Cracking encryption...</div>`,
        `<div style="color:#0f0;font-family:monospace;">Accessing mainframe...</div>`,
        `<div style="color:#0f0;font-family:monospace;">Downloading classified data...</div>`,
        `<div style="color:#f00;font-weight:bold;font-size:18px;text-align:center;margin:10px 0;">\u26A0\uFE0F INTRUSION DETECTED \u26A0\uFE0F</div>`,
        `<div style="color:#f00;font-family:monospace;text-align:center;">Connection terminated by ${target} security systems!</div>`,
        `<div style="color:#fff;font-family:monospace;text-align:center;margin-top:10px;">Just kidding! This is just a harmless easter egg. \uD83D\uDE09</div>`,
      ];

      steps.forEach((step, i) => {
        setTimeout(() => ctx.addOutput(step), (i + 1) * 1500);
      });

      return `<div style="color:#0f0;font-family:monospace;text-align:center;font-weight:bold;">INITIATING HACK SEQUENCE</div>`;
    },
  });

  register('coffee', {
    description: 'Take a coffee break',
    usage: 'coffee',
    handler() {
      return `<div style="color:#8B4513;font-family:monospace;text-align:center;padding:15px;">
  <pre>
       ( (
        ) )
     .........
     |       |]
     \\       /
      \`-----'
  </pre>
  <p style="margin-top:15px;font-size:16px;">\u2615 Coffee break! \u2615</p>
  <p style="color:#A0A0A0;font-size:14px;">Every developer's best friend.</p>
</div>`;
    },
  });

  register('konami', {
    description: 'Enter the Konami code',
    usage: 'konami',
    handler(_, ctx) {
      setTimeout(() => {
        ctx.addOutput(`<div style="text-align:center;padding:20px;color:#ffff00;">
  <h2 style="margin-bottom:15px;">\uD83C\uDFAE KONAMI CODE ACTIVATED! \uD83C\uDFAE</h2>
  <p style="margin-bottom:10px;">\u2191 \u2191 \u2193 \u2193 \u2190 \u2192 \u2190 \u2192 B A</p>
  <div style="font-size:50px;margin:20px 0;">\uD83C\uDFC6</div>
  <p>30 LIVES ADDED!</p>
</div>`);
      }, 500);
      return 'Entering Konami code...';
    },
  });

  register('easter-eggs', {
    description: 'List hidden easter eggs',
    usage: 'easter-eggs',
    handler() {
      return `<div style="color:#ffff00;padding:10px;border:1px dashed #ffff00;margin:10px 0;background:rgba(255,255,0,0.05);">
  <h3 style="text-align:center;margin-bottom:15px;">\uD83E\uDD5A Hidden Easter Eggs \uD83E\uDD5A</h3>
  <ul style="list-style:none;padding-left:20px;margin-top:10px;">
    <li>\u2022 <span style="color:#ff9900;">sudo rm -rf /</span> - Try to delete the system</li>
    <li>\u2022 <span style="color:#ff9900;">please-let-me-out</span> - Secret escape from vim</li>
    <li>\u2022 <span style="color:#ff9900;">theme [name]</span> - Change theme (default, hacker, retro, synthwave)</li>
    <li>\u2022 <span style="color:#ff9900;">red pill / blue pill</span> - Direct Matrix commands</li>
    <li>\u2022 <span style="color:#ff9900;">konami</span> - Enter the Konami code</li>
    <li>\u2022 <span style="color:#ff9900;">hack</span> - Simulate hacking into a system</li>
    <li>\u2022 <span style="color:#ff9900;">coffee</span> - Take a coffee break</li>
    <li>\u2022 <span style="color:#ff9900;">cat .vimrc</span> - View vim configuration</li>
    <li>\u2022 <span style="color:#ff9900;">tree</span> - Display directory tree</li>
    <li>\u2022 <span style="color:#ff9900;">cat file | grep pattern</span> - Pipe commands together</li>
  </ul>
  <p style="margin-top:15px;text-align:center;font-style:italic;">Keep exploring to find more secrets!</p>
</div>`;
    },
  });

  register('sudo', {
    description: 'Execute command as superuser',
    usage: 'sudo <command>',
    handler(argsStr, ctx) {
      if (argsStr.startsWith('rm -rf /')) {
        setTimeout(() => {
          ctx.setDeleting(true);
          setTimeout(() => {
            ctx.setOutput([
              '<span style="color:#64ffda;font-weight:bold">Szymon Florek</span> <span style="color:#555">\u2014 MSc Quantum Computing @ WAT \u2022 Software Dev @ ardium-pl</span>',
              '',
              'Type <span class="command-highlight">help</span> for commands, <span class="command-highlight">about</span> for bio, or <span class="command-highlight">portfolio</span> for the visual experience.',
              '',
              'Just kidding! Your system is safe. \uD83D\uDE09',
            ]);
            ctx.setDeleting(false);
          }, 5000);
        }, 1000);

        return `<div style="color:red;font-weight:bold;">
\u2588\u2588    \u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588    \u2588\u2588     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588\u2588    \u2588\u2588 \u2588\u2588   \u2588\u2588
 \u2588\u2588  \u2588\u2588  \u2588\u2588    \u2588\u2588 \u2588\u2588    \u2588\u2588        \u2588\u2588    \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588\u2588\u2588   \u2588\u2588 \u2588\u2588  \u2588\u2588
  \u2588\u2588\u2588\u2588   \u2588\u2588    \u2588\u2588 \u2588\u2588    \u2588\u2588        \u2588\u2588    \u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588 \u2588\u2588 \u2588\u2588  \u2588\u2588 \u2588\u2588\u2588\u2588\u2588
   \u2588\u2588    \u2588\u2588    \u2588\u2588 \u2588\u2588    \u2588\u2588        \u2588\u2588    \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588  \u2588\u2588\u2588\u2588 \u2588\u2588  \u2588\u2588
   \u2588\u2588     \u2588\u2588\u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588\u2588\u2588         \u2588\u2588    \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588   \u2588\u2588\u2588\u2588 \u2588\u2588   \u2588\u2588
</div>
<span style="color:red;font-weight:bold;">System will now delete itself in 5 seconds...</span>`;
      }
      return `sudo: ${argsStr.split(' ')[0] || 'missing command'}: command not found`;
    },
  });
}
