const commands = new Map();

export function register(name, config) {
  commands.set(name, config);
}

export function getCommand(name) {
  return commands.get(name);
}

export function getAllCommands() {
  return commands;
}

export function getCommandNames() {
  return Array.from(commands.keys());
}

export function parseArgs(argsStr) {
  if (!argsStr) return { flags: {}, args: [] };
  const tokens = argsStr.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  const flags = {};
  const args = [];

  for (const token of tokens) {
    if (token.startsWith('--')) {
      const eq = token.indexOf('=');
      if (eq > -1) {
        flags[token.slice(2, eq)] = token.slice(eq + 1);
      } else {
        flags[token.slice(2)] = true;
      }
    } else if (token.startsWith('-') && token.length > 1 && !/^-\d/.test(token)) {
      for (const ch of token.slice(1)) flags[ch] = true;
    } else {
      args.push(token.replace(/^["']|["']$/g, ''));
    }
  }
  return { flags, args };
}

export function execute(input, ctx) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.includes(' | ')) {
    return executePipeline(trimmed, ctx);
  }
  return executeSingle(trimmed, ctx);
}

function executeSingle(input, ctx) {
  const spaceIdx = input.indexOf(' ');
  const cmdName = spaceIdx === -1 ? input : input.slice(0, spaceIdx);
  const argsStr = spaceIdx === -1 ? '' : input.slice(spaceIdx + 1);

  const cmd = commands.get(cmdName);
  if (!cmd) {
    if (commands.has(input)) {
      return commands.get(input).handler('', ctx);
    }
    return `<span style="color: #ff6b6b;">${cmdName}: command not found</span>. Type <span class="command-highlight">help</span> for available commands.`;
  }

  return cmd.handler(argsStr, ctx);
}

function executePipeline(input, ctx) {
  const stages = input.split(/\s*\|\s*/);
  let stdin = null;

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i].trim();
    const spaceIdx = stage.indexOf(' ');
    const cmdName = spaceIdx === -1 ? stage : stage.slice(0, spaceIdx);
    const argsStr = spaceIdx === -1 ? '' : stage.slice(spaceIdx + 1);

    const cmd = commands.get(cmdName);
    if (!cmd) return `${cmdName}: command not found`;

    const result = cmd.handler(argsStr, { ...ctx, stdin });
    stdin = typeof result === 'string' ? result.replace(/<[^>]*>/g, '') : '';
  }

  return stdin;
}
