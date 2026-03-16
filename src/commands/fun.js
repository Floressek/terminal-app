import { register } from './registry';
import quotes from '../data/quotes';

export default function registerFunCommands() {
  register('matrix', {
    description: 'Enter the Matrix',
    usage: 'matrix',
    handler(_, ctx) {
      ctx.setTheme('hacker');

      const lines = [
        '<span style="color:#0f0;opacity:0.5;">[ SIGNAL DETECTED ]</span>',
        '',
        '<span style="color:#0f0;text-shadow:0 0 8px #0f0;">Wake up, Neo...</span>',
      ];
      setTimeout(() => ctx.addOutput(...lines), 800);

      setTimeout(() => {
        ctx.addOutput('<span style="color:#0f0;text-shadow:0 0 8px #0f0;">The Matrix has you...</span>');
      }, 2500);

      setTimeout(() => {
        ctx.addOutput('<span style="color:#0f0;text-shadow:0 0 8px #0f0;">Follow the white rabbit.</span>');
      }, 4000);

      setTimeout(() => {
        ctx.addOutput(
          '<span style="color:#0f0;text-shadow:0 0 12px #0f0;font-size:16px;font-weight:bold;">Knock, knock, Neo.</span>',
          '',
          `<div style="background:#000;border:1px solid #0f0;border-radius:6px;padding:16px;margin:10px 0;overflow:hidden;">
  <pre style="color:#0f0;text-shadow:0 0 3px #0f0;font-size:10px;line-height:1.2;text-align:center;animation:matrixGlow 2s ease-in-out infinite;">
  \u2593\u2592\u2591 01001110 \u2591\u2592\u2593 01100101 \u2593\u2592\u2591 01101111 \u2591\u2592\u2593
  \u2591 THE MATRIX HAS YOU \u2591 FOLLOW THE WHITE RABBIT \u2591
  \u2593\u2592\u2591 01010111 \u2591\u2592\u2593 01100001 \u2593\u2592\u2591 01101011 \u2591\u2592\u2593
  \u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593\u2591\u2592\u2593
  </pre>
</div>`,
          `<div style="color:#0f0;margin-top:16px;text-shadow:0 0 5px #0f0;text-align:center;">
  <p style="margin-bottom:12px;font-size:15px;">Choose your destiny:</p>
  <div style="display:flex;justify-content:center;gap:24px;margin:16px 0;">
    <button style="background:linear-gradient(135deg,#cc0000,#ff3333);color:#fff;border:none;padding:12px 28px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 0 20px rgba(255,0,0,0.5);transition:all 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="(function(){document.dispatchEvent(new CustomEvent('matrix-red-pill'))})()">RED PILL \uD83D\uDD34</button>
    <button style="background:linear-gradient(135deg,#0000cc,#3333ff);color:#fff;border:none;padding:12px 28px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 0 20px rgba(0,0,255,0.5);transition:all 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="(function(){document.dispatchEvent(new CustomEvent('matrix-blue-pill'))})()">BLUE PILL \uD83D\uDD35</button>
  </div>
  <p style="color:#0a0;font-size:12px;margin-top:8px;">Red = truth \u2022 Blue = blissful ignorance</p>
</div>`
        );
      }, 5500);

      return `<div style="color:#0f0;text-align:center;text-shadow:0 0 10px #0f0;">
  <pre style="font-size:10px;line-height:1;">
 _____ _            __  __       _        _
|_   _| |__   ___  |  \\/  | __ _| |_ _ __(_)_  __
  | | | '_ \\ / _ \\ | |\\/| |/ _\` | __| '__| \\ \\/ /
  | | | | | |  __/ | |  | | (_| | |_| |  | |>  <
  |_| |_| |_|\\___| |_|  |_|\\__,_|\\__|_|  |_/_/\\_\\
  </pre>
  <p style="margin-top:8px;">Initializing...</p>
</div>`;
    },
  });

  register('red pill', {
    description: 'Take the red pill',
    handler(_, ctx) {
      ctx.setTheme('hacker');
      ctx.addOutput(`<div style="color:#0f0;text-shadow:0 0 5px #0f0;text-align:center;">
  <pre style="font-size:11px;color:#f00;text-shadow:0 0 8px #f00;">
    \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588
    \u2588\u2588   \u2588\u2588 \u2588\u2588      \u2588\u2588   \u2588\u2588
    \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588   \u2588\u2588   \u2588\u2588
    \u2588\u2588   \u2588\u2588 \u2588\u2588      \u2588\u2588   \u2588\u2588
    \u2588\u2588   \u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588
  </pre>
  <div style="border:1px solid #0f0;padding:20px;margin:16px 0;background:rgba(0,255,0,0.05);border-radius:6px;">
    <p style="font-size:18px;margin-bottom:8px;">The Matrix has been revealed to you.</p>
    <p style="font-size:16px;color:#0a0;">Welcome to the real world, Neo.</p>
  </div>
  <p style="color:#888;margin-top:12px;">You are now in <span style="color:#f00;text-shadow:0 0 5px #f00;">The Matrix</span>. Type <span class="command-highlight">help</span> to continue.</p>
</div>`);
      return '';
    },
  });

  register('blue pill', {
    description: 'Take the blue pill',
    handler(_, ctx) {
      ctx.setTheme('default');
      ctx.addOutput(`<div style="color:#3498db;text-align:center;">
  <pre style="font-size:11px;color:#3498db;text-shadow:0 0 5px #3498db;">
    \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588
    \u2588\u2588   \u2588\u2588 \u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588
    \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588\u2588\u2588\u2588
    \u2588\u2588   \u2588\u2588 \u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588
    \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588
  </pre>
  <div style="margin:20px 0;font-size:48px;animation:fadeIn 2s ease-in-out;">
    (-.-)Zzz...
  </div>
  <div style="border:1px solid #3498db;padding:16px;margin:12px 0;background:rgba(52,152,219,0.08);border-radius:6px;">
    <p style="font-size:16px;">The story ends. You wake up believing whatever you want to believe.</p>
  </div>
  <p style="color:#888;margin-top:12px;">Type <span class="command-highlight">help</span> to continue.</p>
</div>`);
      return '';
    },
  });

  register('quote', {
    description: 'Display a random programming quote',
    usage: 'quote',
    handler() {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      return `<div style="color:#fff;padding:12px 16px;border-left:4px solid #64ffda;margin:10px 0;background:rgba(100,255,218,0.03);border-radius:0 6px 6px 0;">
  <p style="font-style:italic;font-size:15px;line-height:1.5;">\u201C${q.text}\u201D</p>
  <p style="text-align:right;color:#64ffda;margin-top:8px;font-size:13px;">\u2014 ${q.author}</p>
</div>`;
    },
  });

  register('hack', {
    description: 'Simulate a hacking sequence',
    usage: 'hack',
    handler(_, ctx) {
      const targets = ['NASA', 'Pentagon', 'FBI', 'CIA', 'NSA', 'MI6', 'Area 51', 'GitHub', 'StackOverflow', 'Google'];
      const target = targets[Math.floor(Math.random() * targets.length)];
      const fakeIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

      const steps = [
        `<div style="color:#0f0;font-family:monospace;"><span style="color:#555;">[${fakeIP()}]</span> Resolving ${target.toLowerCase()}.gov DNS...</div>`,
        `<div style="color:#0f0;font-family:monospace;"><span style="color:#555;">[${fakeIP()}]</span> Scanning open ports: 22, 80, 443, 8080...</div>`,
        `<div style="color:#0f0;font-family:monospace;"><span style="color:#555;">[${fakeIP()}]</span> Bypassing WAF and firewall rules...</div>`,
        `<div style="color:#0f0;font-family:monospace;">[<span style="color:#ffcc00;">========</span><span style="color:#555;">............</span>] 40% Cracking RSA-4096...</div>`,
        `<div style="color:#0f0;font-family:monospace;">[<span style="color:#ffcc00;">================</span><span style="color:#555;">......</span>] 75% Injecting payload...</div>`,
        `<div style="color:#0f0;font-family:monospace;">[<span style="color:#0f0;">=======================</span>] 100% Access granted!</div>`,
        `<div style="color:#0f0;font-family:monospace;"><span style="color:#555;">[${fakeIP()}]</span> Downloading classified data from ${target}...</div>`,
        `<div style="color:#0f0;font-family:monospace;">
  <pre style="color:#0f0;font-size:10px;text-align:center;">
  ___________________
 |  _______________ |
 | |  ___________  ||
 | | | TOP SECRET | ||
 | | |  ${target.padEnd(10)} | ||
 | | |___________| ||
 | |_______________||
 |___________________|
  </pre>
</div>`,
        `<div style="text-align:center;margin:12px 0;">
  <span style="color:#f00;font-weight:bold;font-size:20px;text-shadow:0 0 10px #f00;animation:blink 0.5s 6;">\u26A0 INTRUSION DETECTED \u26A0</span>
</div>`,
        `<div style="color:#f00;font-family:monospace;text-align:center;">Honeypot triggered! Trace-back initiated by ${target} CERT team!</div>`,
        `<div style="color:#f00;font-family:monospace;text-align:center;">Connection forcefully terminated.</div>`,
        `<div style="color:#888;text-align:center;margin-top:12px;border-top:1px solid #333;padding-top:12px;">Relax \u2014 this was just a harmless easter egg. No actual hacking occurred. \uD83D\uDE09<br>Type <span class="command-highlight">easter-eggs</span> for more fun.</div>`,
      ];

      steps.forEach((step, i) => {
        setTimeout(() => ctx.addOutput(step), (i + 1) * 1200);
      });

      return `<div style="text-align:center;padding:8px;">
  <pre style="color:#0f0;font-size:10px;text-shadow:0 0 3px #0f0;">
  _  _   _   ___ _  __
 | || | /_\\ / __| |/ /
 | __ |/ _ \\ (__| ' <
 |_||_/_/ \\_\\___|_|\\_\\
  </pre>
  <div style="color:#0f0;font-family:monospace;">Target: <span style="color:#f00;font-weight:bold;">${target}</span> | IP: ${fakeIP()}</div>
</div>`;
    },
  });

  register('coffee', {
    description: 'Take a coffee break',
    usage: 'coffee',
    handler() {
      return `<div style="font-family:monospace;text-align:center;padding:16px;">
  <pre style="color:#D2691E;font-size:12px;">
        {
      {   }
       }_{ __{
    .-{   }   }-.
   (   }     {   )
   |\`-.._____..-'|
   |             ;--.
   |            (__  \\
   |             | )  )
   |             |/  /
   |             /  /
   |            (  /
   \\             y'
    \`-.._____..-'
  </pre>
  <p style="margin-top:12px;font-size:18px;color:#D2691E;">\u2615 Coffee break! \u2615</p>
  <p style="color:#888;font-size:13px;margin-top:4px;">Compiling productivity... please wait.</p>
  <div style="margin-top:12px;color:#555;font-size:11px;">
    <p>\u2022 <span style="color:#D2691E;">Espresso</span> - for when production is down</p>
    <p>\u2022 <span style="color:#D2691E;">Double shot</span> - for code reviews on Friday</p>
    <p>\u2022 <span style="color:#D2691E;">IV drip</span> - for release day</p>
  </div>
</div>`;
    },
  });

  register('konami', {
    description: 'Enter the Konami code',
    usage: 'konami',
    handler(_, ctx) {
      setTimeout(() => {
        ctx.addOutput(`<div style="text-align:center;padding:16px;">
  <pre style="color:#ffcc00;font-size:10px;text-shadow:0 0 5px rgba(255,204,0,0.5);">
   \u2605 \u2605 \u2605   \u2605 \u2605 \u2605   \u2605 \u2605 \u2605
  \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605
 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605
  \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605 \u2605
   \u2605 \u2605 \u2605   \u2605 \u2605 \u2605   \u2605 \u2605 \u2605
  </pre>
  <h2 style="color:#ffcc00;margin:12px 0;text-shadow:0 0 10px rgba(255,204,0,0.5);">\uD83C\uDFAE KONAMI CODE ACTIVATED! \uD83C\uDFAE</h2>
  <div style="font-size:18px;margin:12px 0;color:#fff;letter-spacing:4px;">
    \u2191 \u2191 \u2193 \u2193 \u2190 \u2192 \u2190 \u2192 <span style="color:#f44;">B</span> <span style="color:#4f4;">A</span>
  </div>
  <div style="font-size:48px;margin:16px 0;">\uD83C\uDFC6</div>
  <div style="color:#ffcc00;font-size:22px;font-weight:bold;text-shadow:0 0 8px rgba(255,204,0,0.4);">+30 LIVES!</div>
  <div style="margin-top:12px;color:#555;font-size:11px;">
    <p>Achievement unlocked: <span style="color:#ffcc00;">Retro Gamer</span></p>
    <p>You clearly know your classics.</p>
  </div>
</div>`);
      }, 500);
      return `<span style="color:#ffcc00;">Entering code...</span> \u2191 \u2191 \u2193 \u2193 \u2190 \u2192 \u2190 \u2192 B A`;
    },
  });

  register('cowsay', {
    description: 'A cow says something',
    usage: 'cowsay [message]',
    handler(argsStr) {
      const msg = argsStr.trim() || 'Moo! Type help for commands.';
      const border = '\u2500'.repeat(msg.length + 2);
      return `<pre style="color:#fff;">
 \u250C${border}\u2510
 \u2502 ${msg} \u2502
 \u2514${border}\u2518
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`;
    },
  });

  register('ping', {
    description: 'Ping a server (simulated)',
    usage: 'ping [host]',
    handler(argsStr, ctx) {
      const host = argsStr.trim() || 'floressek.com';

      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          const time = (Math.random() * 50 + 10).toFixed(1);
          ctx.addOutput(`<span style="color:#0f0;">64 bytes from ${host}: icmp_seq=${i + 1} ttl=64 time=${time} ms</span>`);
        }, (i + 1) * 1000);
      }

      setTimeout(() => {
        const times = Array.from({length: 4}, () => (Math.random() * 50 + 10).toFixed(1));
        const avg = (times.reduce((s, t) => s + parseFloat(t), 0) / 4).toFixed(1);
        ctx.addOutput(
          `\n--- ${host} ping statistics ---`,
          `4 packets transmitted, 4 received, 0% packet loss`,
          `rtt min/avg/max = ${Math.min(...times.map(Number)).toFixed(1)}/${avg}/${Math.max(...times.map(Number)).toFixed(1)} ms`
        );
      }, 5200);

      return `PING ${host} (${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}): 56 data bytes`;
    },
  });

  register('sl', {
    description: 'Steam locomotive (you misspelled ls)',
    usage: 'sl',
    handler() {
      return `<pre style="color:#888;font-size:10px;line-height:1.1;">
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\O=====O=====O=====O_/      \\_/
</pre>
<span style="color:#555;">You meant <span class="command-highlight">ls</span>, didn't you? \uD83D\uDE0F</span>`;
    },
  });

  register('fortune', {
    description: 'Display a random fortune',
    usage: 'fortune',
    handler() {
      const fortunes = [
        "A bug in the code is worth two in the documentation.",
        "Your next commit will break nothing. (Just kidding.)",
        "The mass of the universe is made up of dark matter, dark energy, and unread Slack messages.",
        "You will mass-rename variables today... and regret it tomorrow.",
        "A wise programmer once said: 'It works on my machine.'",
        "Today is a good day to refactor. Tomorrow will be too late.",
        "In the land of the blind, the one-eyed developer deploys to production on Friday.",
        "You will encounter a semicolon in an unexpected place.",
        "The stack overflow you seek is within yourself.",
        "sudo make me a sandwich.",
      ];
      const f = fortunes[Math.floor(Math.random() * fortunes.length)];
      return `<div style="padding:8px 12px;border-left:3px solid #9400d3;color:#ddd;font-style:italic;margin:8px 0;">${f}</div>`;
    },
  });

  register('easter-eggs', {
    description: 'List hidden easter eggs',
    usage: 'easter-eggs',
    handler() {
      return `<div style="color:#ffcc00;padding:12px;border:1px dashed rgba(255,204,0,0.4);margin:10px 0;background:rgba(255,204,0,0.03);border-radius:6px;">
  <h3 style="text-align:center;margin-bottom:12px;">\uD83E\uDD5A Hidden Easter Eggs \uD83E\uDD5A</h3>
  <div style="columns:2;column-gap:24px;">
    <p>\u2022 <span style="color:#ff9900;">sudo rm -rf /</span> \u2014 nuke the system</p>
    <p>\u2022 <span style="color:#ff9900;">please-let-me-out</span> \u2014 escape vim</p>
    <p>\u2022 <span style="color:#ff9900;">theme [name]</span> \u2014 change vibes</p>
    <p>\u2022 <span style="color:#ff9900;">matrix</span> \u2014 take the pill</p>
    <p>\u2022 <span style="color:#ff9900;">red pill / blue pill</span></p>
    <p>\u2022 <span style="color:#ff9900;">konami</span> \u2014 \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA</p>
    <p>\u2022 <span style="color:#ff9900;">hack</span> \u2014 hack the planet</p>
    <p>\u2022 <span style="color:#ff9900;">coffee</span> \u2014 brew a cup</p>
    <p>\u2022 <span style="color:#ff9900;">cowsay [msg]</span> \u2014 moo</p>
    <p>\u2022 <span style="color:#ff9900;">sl</span> \u2014 choo choo</p>
    <p>\u2022 <span style="color:#ff9900;">fortune</span> \u2014 wisdom</p>
    <p>\u2022 <span style="color:#ff9900;">ping [host]</span> \u2014 pong</p>
    <p>\u2022 <span style="color:#ff9900;">cat .vimrc</span> \u2014 vim secrets</p>
    <p>\u2022 <span style="color:#ff9900;">cat thesis.md</span> \u2014 BSc work</p>
    <p>\u2022 <span style="color:#ff9900;">tree</span> \u2014 filesystem art</p>
    <p>\u2022 <span style="color:#ff9900;">pipes: cat x | grep y</span></p>
  </div>
  <p style="margin-top:12px;text-align:center;color:#888;font-style:italic;">Keep exploring... there might be more. \uD83D\uDC40</p>
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

        return `<div style="color:red;font-weight:bold;text-align:center;">
<pre style="font-size:10px;">
 _   _  _   _  _  _  _  ___  ___
| \\_/ |/ \\ | || || |  \\|_ _|| _ \\
 \\_/  |   || || || |     | | |  _/
      |_\\_/|___|_||__|  |___||_|
  ___  ___  __  ___  ___  ___
 / __|| _ \\/ _|| __|/ __||_ _|
 \\__ \\|  _/\\_ \\| _| \\__ \\ | |
 |___/|_|  |__/|___|_|___/|___|
</pre>
<span style="font-size:16px;">System will self-destruct in 5 seconds...</span>
</div>`;
      }

      if (argsStr.trim() === 'make me a sandwich') {
        return '<span style="color:#64ffda;">Okay. \uD83E\uDD6A</span>';
      }

      return `<span style="color:#ff6b6b;">[sudo] password for szymon: </span><span style="color:#888;">Nice try. sudo: ${argsStr.split(' ')[0] || 'missing command'}: command not found</span>`;
    },
  });
}
