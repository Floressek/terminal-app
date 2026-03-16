import { register, parseArgs } from './registry';
import { formatDate, formatSize } from '../utils/formatting';

export default function registerSystemCommands() {
  register('ls', {
    description: 'List directory contents',
    usage: 'ls [-la] [path]',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      const path = args[0] || null;
      const showAll = flags.a || flags.l;
      const longFormat = flags.l;

      const result = ctx.fs.ls(path, { a: showAll });
      if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;

      if (longFormat) {
        const date = formatDate();
        const lines = result.entries.map(e => {
          const perms = e.permissions || (e.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--');
          const links = e.type === 'dir' ? ' 2' : ' 1';
          const size = formatSize(e.size || 4096);
          const color = e.type === 'dir' ? 'color:#6bc5ff;font-weight:bold' : 'color:#fff';
          return `${perms}${links} szymon users ${size} ${date} <span style="${color}">${e.name}${e.type === 'dir' ? '/' : ''}</span>`;
        });
        const total = result.entries.reduce((s, e) => s + (e.size || 4096), 0);
        return `total ${Math.ceil(total / 1024)}\n${lines.join('\n')}`;
      }

      return result.entries.map(e => {
        if (e.type === 'dir') return `<span style="color:#6bc5ff;font-weight:bold">${e.name}/</span>`;
        return e.name;
      }).join('  ');
    },
  });

  register('cd', {
    description: 'Change directory',
    usage: 'cd [path]',
    handler(argsStr, ctx) {
      const path = argsStr.trim() || '~';
      const result = ctx.fs.cd(path);
      if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      return '';
    },
  });

  register('pwd', {
    description: 'Print working directory',
    usage: 'pwd',
    handler(_, ctx) { return ctx.fs.pwd(); },
  });

  register('cat', {
    description: 'Display file contents',
    usage: 'cat [-n] <file>',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      if (!args.length) return 'cat: missing file operand';

      const outputs = [];
      for (const file of args) {
        const result = ctx.fs.cat(file);
        if (result.error) { outputs.push(`<span style="color:#ff6b6b">${result.error}</span>`); continue; }
        if (flags.n) {
          outputs.push(result.content.split('\n').map((line, i) => `${String(i + 1).padStart(6)}  ${line}`).join('\n'));
        } else {
          outputs.push(result.content);
        }
      }
      return outputs.join('\n');
    },
  });

  register('echo', {
    description: 'Display a line of text',
    usage: 'echo [text]',
    handler(argsStr) { return argsStr || ''; },
  });

  register('date', {
    description: 'Display current date and time',
    usage: 'date',
    handler() { return new Date().toString(); },
  });

  register('whoami', {
    description: 'Print current user name',
    usage: 'whoami',
    handler() { return 'szymon'; },
  });

  register('hostname', {
    description: 'Print system hostname',
    usage: 'hostname',
    handler() { return 'portfolio-terminal'; },
  });

  register('uname', {
    description: 'Print system information',
    usage: 'uname [-a]',
    handler(argsStr) {
      const { flags } = parseArgs(argsStr);
      if (flags.a) return 'Portfolio OS 1.0 portfolio-terminal 6.1.0-portfolio #1 SMP x86_64 GNU/Linux';
      return 'Portfolio OS';
    },
  });

  register('uptime', {
    description: 'Show how long the system has been running',
    usage: 'uptime',
    handler() {
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const users = 1;
      const load = [0.1 + Math.random() * 0.5, 0.1 + Math.random() * 0.3, 0.05 + Math.random() * 0.2];
      return ` ${new Date().toLocaleTimeString()} up ${h}:${String(m).padStart(2, '0')}, ${users} user, load average: ${load.map(l => l.toFixed(2)).join(', ')}`;
    },
  });

  register('mkdir', {
    description: 'Create directories',
    usage: 'mkdir [-p] <directory>',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      if (!args.length) return 'mkdir: missing operand';
      for (const dir of args) {
        const result = ctx.fs.mkdir(dir, { p: flags.p });
        if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      }
      return '';
    },
  });

  register('touch', {
    description: 'Create empty files',
    usage: 'touch <file>',
    handler(argsStr, ctx) {
      const { args } = parseArgs(argsStr);
      if (!args.length) return 'touch: missing file operand';
      for (const file of args) {
        const result = ctx.fs.touch(file);
        if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      }
      return '';
    },
  });

  register('rm', {
    description: 'Remove files or directories',
    usage: 'rm [-rf] <file>',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      if (!args.length) return 'rm: missing operand';
      for (const file of args) {
        const result = ctx.fs.rm(file, { r: flags.r || flags.R });
        if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      }
      return '';
    },
  });

  register('cp', {
    description: 'Copy files',
    usage: 'cp <source> <dest>',
    handler(argsStr, ctx) {
      const { args } = parseArgs(argsStr);
      if (args.length < 2) return 'cp: missing destination operand';
      const result = ctx.fs.cp(args[0], args[1]);
      if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      return '';
    },
  });

  register('mv', {
    description: 'Move or rename files',
    usage: 'mv <source> <dest>',
    handler(argsStr, ctx) {
      const { args } = parseArgs(argsStr);
      if (args.length < 2) return 'mv: missing destination operand';
      const result = ctx.fs.mv(args[0], args[1]);
      if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      return '';
    },
  });

  register('grep', {
    description: 'Search for patterns in files',
    usage: 'grep [-in] <pattern> [file]',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      if (!args.length) return 'grep: missing pattern';
      const pattern = args[0];
      const files = args.slice(1);

      let text;
      if (ctx.stdin) {
        text = ctx.stdin;
      } else if (files.length) {
        const parts = [];
        for (const f of files) {
          const r = ctx.fs.cat(f);
          if (r.error) { parts.push(r.error); continue; }
          parts.push(r.content);
        }
        text = parts.join('\n');
      } else {
        return 'grep: no input';
      }

      const re = new RegExp(pattern, flags.i ? 'gi' : 'g');
      const lines = text.split('\n');
      const matches = [];
      lines.forEach((line, i) => {
        if (re.test(line)) {
          const prefix = flags.n ? `<span style="color:#6bc5ff">${i + 1}:</span>` : '';
          const highlighted = line.replace(re, m => `<span style="color:#ff6b6b;font-weight:bold">${m}</span>`);
          matches.push(prefix + highlighted);
          re.lastIndex = 0;
        }
      });

      if (flags.c) return String(matches.length);
      return matches.length ? matches.join('\n') : '';
    },
  });

  register('head', {
    description: 'Output the first part of files',
    usage: 'head [-n N] <file>',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      const n = parseInt(flags.n) || 10;
      let text;
      if (ctx.stdin) { text = ctx.stdin; }
      else if (args[0]) {
        const r = ctx.fs.cat(args[0]);
        if (r.error) return `<span style="color:#ff6b6b">${r.error}</span>`;
        text = r.content;
      } else return 'head: missing file operand';
      return text.split('\n').slice(0, n).join('\n');
    },
  });

  register('tail', {
    description: 'Output the last part of files',
    usage: 'tail [-n N] <file>',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      const n = parseInt(flags.n) || 10;
      let text;
      if (ctx.stdin) { text = ctx.stdin; }
      else if (args[0]) {
        const r = ctx.fs.cat(args[0]);
        if (r.error) return `<span style="color:#ff6b6b">${r.error}</span>`;
        text = r.content;
      } else return 'tail: missing file operand';
      const lines = text.split('\n');
      return lines.slice(-n).join('\n');
    },
  });

  register('wc', {
    description: 'Word, line, and byte count',
    usage: 'wc [-lwc] [file]',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      let text;
      if (ctx.stdin) { text = ctx.stdin; }
      else if (args[0]) {
        const r = ctx.fs.cat(args[0]);
        if (r.error) return `<span style="color:#ff6b6b">${r.error}</span>`;
        text = r.content;
      } else return 'wc: missing file operand';

      const lines = text.split('\n').length;
      const words = text.split(/\s+/).filter(Boolean).length;
      const chars = text.length;

      if (flags.l) return String(lines);
      if (flags.w) return String(words);
      if (flags.c) return String(chars);
      return `  ${lines}  ${words} ${chars}${args[0] ? ' ' + args[0] : ''}`;
    },
  });

  register('sort', {
    description: 'Sort lines of text',
    usage: 'sort [-r] [file]',
    handler(argsStr, ctx) {
      const { flags, args } = parseArgs(argsStr);
      let text;
      if (ctx.stdin) { text = ctx.stdin; }
      else if (args[0]) {
        const r = ctx.fs.cat(args[0]);
        if (r.error) return `<span style="color:#ff6b6b">${r.error}</span>`;
        text = r.content;
      } else return '';

      const lines = text.split('\n');
      lines.sort();
      if (flags.r) lines.reverse();
      return lines.join('\n');
    },
  });

  register('find', {
    description: 'Search for files in a directory',
    usage: 'find [path] [-name pattern] [-type f|d]',
    handler(argsStr, ctx) {
      const { args } = parseArgs(argsStr);
      let startPath = '.';
      let pattern = null;
      let typeFilter = null;

      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-name' && args[i + 1]) { pattern = args[++i]; }
        else if (args[i] === '-type' && args[i + 1]) { typeFilter = args[++i]; }
        else if (!args[i].startsWith('-')) { startPath = args[i]; }
      }

      const result = ctx.fs.find(startPath, pattern, typeFilter);
      if (result.error) return `<span style="color:#ff6b6b">${result.error}</span>`;
      return result.results.join('\n');
    },
  });

  register('which', {
    description: 'Locate a command',
    usage: 'which <command>',
    handler(argsStr) {
      const cmd = argsStr.trim();
      if (!cmd) return 'which: missing argument';
      const builtins = ['ls', 'cd', 'cat', 'pwd', 'echo', 'date', 'whoami', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'grep', 'head', 'tail', 'wc', 'sort', 'find', 'clear', 'help'];
      if (builtins.includes(cmd)) return `/usr/bin/${cmd}`;
      return `${cmd} not found`;
    },
  });

  register('history', {
    description: 'Display command history',
    usage: 'history',
    handler(_, ctx) {
      if (!ctx.history.length) return 'No commands in history.';
      return ctx.history.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`).join('\n');
    },
  });

  register('env', {
    description: 'Display environment variables',
    usage: 'env',
    handler(_, ctx) {
      return [
        `USER=szymon`,
        `HOME=${ctx.fs.home}`,
        `PWD=${ctx.fs.pwd()}`,
        `SHELL=/bin/bash`,
        `TERM=xterm-256color`,
        `LANG=en_US.UTF-8`,
        `PATH=/usr/local/bin:/usr/bin:/bin`,
        `EDITOR=vim`,
        `BROWSER=${navigator.userAgent.includes('Chrome') ? 'chrome' : 'firefox'}`,
      ].join('\n');
    },
  });

  register('chmod', {
    description: 'Change file mode bits',
    usage: 'chmod <mode> <file>',
    handler(argsStr, ctx) {
      const { args } = parseArgs(argsStr);
      if (args.length < 2) return 'chmod: missing operand';
      if (!ctx.fs.exists(args[1])) return `<span style="color:#ff6b6b">chmod: cannot access '${args[1]}': No such file or directory</span>`;
      return '';
    },
  });

  register('man', {
    description: 'Display manual pages',
    usage: 'man <command>',
    handler(argsStr) {
      const cmd = argsStr.trim();
      if (!cmd) return 'What manual page do you want?\nFor example, try \'man ls\'.';

      const pages = {
        ls: 'LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [-la] [path]\n\nDESCRIPTION\n    List information about files in the current directory or given path.\n\n    -l    use long listing format\n    -a    include hidden files (dotfiles)',
        cd: 'CD(1)\n\nNAME\n    cd - change directory\n\nSYNOPSIS\n    cd [path]\n\nDESCRIPTION\n    Change the current working directory.\n    Use ~ for home, .. for parent, - for previous directory.',
        cat: 'CAT(1)\n\nNAME\n    cat - concatenate files and print\n\nSYNOPSIS\n    cat [-n] <file>\n\nDESCRIPTION\n    Concatenate and display file contents.\n\n    -n    number output lines',
        grep: 'GREP(1)\n\nNAME\n    grep - search for patterns\n\nSYNOPSIS\n    grep [-inc] <pattern> [file]\n\nDESCRIPTION\n    Search for pattern in file or stdin (via pipe).\n\n    -i    case insensitive\n    -n    show line numbers\n    -c    count matches only',
        find: 'FIND(1)\n\nNAME\n    find - search for files\n\nSYNOPSIS\n    find [path] [-name pattern] [-type f|d]\n\nDESCRIPTION\n    Search for files matching criteria in directory tree.',
        mkdir: 'MKDIR(1)\n\nNAME\n    mkdir - make directories\n\nSYNOPSIS\n    mkdir [-p] <directory>\n\nDESCRIPTION\n    Create directories.\n\n    -p    create parent directories as needed',
        rm: 'RM(1)\n\nNAME\n    rm - remove files or directories\n\nSYNOPSIS\n    rm [-rf] <file>\n\nDESCRIPTION\n    Remove files or directories.\n\n    -r    remove directories recursively\n    -f    force removal without confirmation',
      };

      return pages[cmd] || `No manual entry for ${cmd}`;
    },
  });

  register('tree', {
    description: 'Display directory tree',
    usage: 'tree [path]',
    handler(argsStr, ctx) {
      const path = argsStr.trim() || '.';
      const abs = ctx.fs.resolve(path);
      const node = ctx.fs._getNode(abs);
      if (!node) return `<span style="color:#ff6b6b">${path}: No such file or directory</span>`;
      if (node.type !== 'dir') return path;

      const lines = [];
      let dirs = 0, files = 0;

      function walk(n, prefix, isLast) {
        const entries = Object.entries(n.children).sort(([a], [b]) => a.localeCompare(b));
        entries.forEach(([name, child], i) => {
          const last = i === entries.length - 1;
          const connector = last ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ';
          const color = child.type === 'dir' ? 'color:#6bc5ff;font-weight:bold' : 'color:#fff';
          lines.push(`${prefix}${connector}<span style="${color}">${name}</span>`);
          if (child.type === 'dir') {
            dirs++;
            walk(child, prefix + (last ? '    ' : '\u2502   '), last);
          } else {
            files++;
          }
        });
      }

      lines.push(`<span style="color:#6bc5ff;font-weight:bold">${ctx.fs._getName(abs) || '.'}</span>`);
      walk(node, '', true);
      lines.push(`\n${dirs} directories, ${files} files`);
      return lines.join('\n');
    },
  });

  register('export', {
    description: 'Set environment variables (simulated)',
    usage: 'export VAR=value',
    handler(argsStr) {
      if (!argsStr.trim()) return 'export: usage: export VAR=value';
      return '';
    },
  });

  register('alias', {
    description: 'Define or display aliases',
    usage: 'alias [name=value]',
    handler(argsStr) {
      if (!argsStr.trim()) {
        return "alias ll='ls -la'\nalias la='ls -a'\nalias ..='cd ..'";
      }
      return '';
    },
  });
}
