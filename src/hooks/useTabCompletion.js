import { useCallback } from 'react';
import { getCommandNames } from '../commands/registry';

export function useTabCompletion(fs) {
  return useCallback((input) => {
    if (!input) return null;

    const parts = input.split(' ');

    if (parts.length === 1) {
      const partial = parts[0];
      const cmdMatches = getCommandNames().filter(c => c.startsWith(partial) && c !== partial);
      if (cmdMatches.length === 1) return cmdMatches[0] + ' ';
      return null;
    }

    const pathPartial = parts[parts.length - 1];
    const fileMatches = fs.getCompletions(pathPartial);

    if (fileMatches.length === 1) {
      parts[parts.length - 1] = fileMatches[0];
      return parts.join(' ');
    }

    if (fileMatches.length > 1) {
      const common = commonPrefix(fileMatches);
      if (common.length > pathPartial.length) {
        parts[parts.length - 1] = common;
        return parts.join(' ');
      }
    }

    return null;
  }, [fs]);
}

function commonPrefix(strings) {
  if (!strings.length) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}
