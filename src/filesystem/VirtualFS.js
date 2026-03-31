import projects from '../data/projects';
import skills from '../data/skills';
import { progressBar } from '../utils/formatting';

function genSkillsContent() {
  const fmt = (list) => list.map(s => `  ${s.name.padEnd(15)} [${progressBar(s.level)}] ${s.level}%`).join('\n');
  return [
    'Programming Languages:', fmt(skills.languages), '',
    'Tools & Technologies:', fmt(skills.tools), '',
    'Databases:', fmt(skills.databases), '',
    'AI & Data Science:', fmt(skills.ai), '',
    'Currently Exploring:',
    '  \u2022 Quantum Computing & Quantum Algorithms',
    '  \u2022 Advanced RAG Architectures',
    '  \u2022 Cloud-Native Infrastructure (GCP/Azure)',
    '  \u2022 NLP & Large Language Models',
  ].join('\n');
}

export default class VirtualFS {
  constructor() {
    this.home = '/home/szymon';
    this.cwd = this.home;
    this._prevDir = this.home;
    this.root = this._buildTree();
  }

  _f(content, perms) {
    return { type: 'file', content: content || '', permissions: perms || '-rw-r--r--' };
  }

  _d(children, perms) {
    return { type: 'dir', children: children || {}, permissions: perms || 'drwxr-xr-x' };
  }

  _buildTree() {
    const projDirs = {};
    projects.forEach(p => {
      projDirs[p.name] = this._d({
        'README.md': this._f(
          `# ${p.name}\n\n${p.description}\n\nTechnologies: ${p.tech.join(', ')}\nLink: https://${p.link}`
        ),
      });
    });

    return this._d({
      home: this._d({
        szymon: this._d({
          '.bashrc': this._f("# ~/.bashrc\nalias ll='ls -la'\nalias la='ls -a'\nexport PS1='\\u@\\h:\\w\\$ '\nexport PATH=$PATH:~/bin"),
          '.bash_logout': this._f('# ~/.bash_logout\n# executed by bash when login shell exits'),
          '.profile': this._f('# ~/.profile\n# executed by the command interpreter for login shells'),
          '.vimrc': this._f('" Vim configuration\nset nocompatible\nset showmode\nset showcmd\nset number\nset relativenumber\n" Secret exit: please-let-me-out'),
          'README.md': this._f("# Szymon Florek\n\nMSc Quantum Computing student at WAT, Warsaw.\nBSc graduated with honors (5.0).\nSoftware Developer @ ardium-pl.\n\nType 'help' to see available commands.\nType 'portfolio' for a visual experience.\nVisit: https://floressek.com"),
          'about.md': this._f("# About Me\n\nHi! I'm Szymon Florek \u2014 software developer, AI enthusiast,\nand quantum computing explorer based in Warsaw.\n\nI graduated with honors (5.0) from my BSc at WAT.\nMy thesis produced RAGx (github.com/Floressek/ImprovedRag)\n\u2014 an ablation-oriented RAG system with multihop retrieval,\nChain-of-Verification, and cross-encoder reranking,\ntested on NVIDIA H100 at WAT Cloud Lab.\n\nCurrently a 1st year MSc student in Quantum Computing\nat WAT, while working at @ardium-pl.\n\nSee thesis.md for the full breakdown."),
          'skills.txt': this._f(genSkillsContent()),
          'contact.txt': this._f("Contact Information\n\nEmail:    szymon.florek@student.wat.edu.pl\nWebsite:  floressek.com\nGitHub:   github.com/Floressek (45 repos)\nLinkedIn: linkedin.com/in/szymon-florek-33a968296\nCompany:  @ardium-pl\nLocation: Warsaw, Poland\n\nOpen to collaboration and interesting projects!"),
          'interests.txt': this._f("Personal Interests\n\n\u2022 Chess\n\u2022 Bouldering\n\u2022 Woodworking\n\u2022 Coding\n\u2022 Reading"),
          'education.txt': this._f("Education\n\nMSc Computer Science \u2014 Quantum Computing\n  WAT (Wojskowa Akademia Techniczna), Warsaw\n  1st year \u2022 2025\u2013present\n  Focus: Quantum Computing & Quantum Algorithms\n\nBSc Computer Science \u2014 Graduated with Honors (5.0)\n  WAT (Wojskowa Akademia Techniczna), Warsaw\n  2022\u20132025\n  Thesis: \"Analysis of Possibilities for Improving RAG Chatbots\"\n  Focus: Data Science, Machine Learning, AI"),
          'thesis.md': this._f("# BSc Thesis: RAGx\n\n## Analysis of Possibilities for Improving RAG Chatbots\n\nGrade: 5.0 (Honors)\nYear: 2025\nUniversity: WAT (Wojskowa Akademia Techniczna)\nCode: github.com/Floressek/ImprovedRag\nLicense: MIT\n\n## Overview\n\nRAGx is an ablation-oriented Retrieval-Augmented Generation\nsystem featuring:\n- Adaptive query rewriting (LLM-powered decomposition)\n- Multihop retrieval with 3-stage reranking pipeline\n- Chain-of-Verification (CoVe) for hallucination reduction\n- Cross-encoder reranking (Jina Reranker v2)\n- Multi-provider LLM support (HuggingFace/Ollama/vLLM)\n\nOptimized for Polish Wikipedia (1M+ articles in Qdrant).\n\n## Architecture\n\nQuery -> Linguistic Analysis (spaCy) -> Adaptive Rewriting\n  -> Retrieval (single / multihop parallel)\n  -> 3-Stage Reranking (local -> fusion -> global)\n  -> LLM Generation (Qwen 4-bit quantized)\n  -> Chain-of-Verification (NLI claim checking)\n  -> Final Answer + Citations + Metadata\n\n## Key Results (1000 questions, 12 configs)\n\n  Config          | Faithful | Relevancy | Recall | Latency\n  baseline        |  0.768   |   0.594   | 0.600  |  2.7s\n  multihop_only   |  0.891   |   0.714   | 0.829  | 18.4s\n  multihop+cot    |  0.870   |   0.762   | 0.828  | 25.7s\n  full_cove_meta  |  0.858   |   0.743   | 0.827  | 60.4s\n\nBest ROI: multihop provides +38.4% Recall improvement.\n\n## Infrastructure\n\nDev:  RTX 4070 (12GB), Ryzen 7 7800X3D, 32GB DDR5\nProd: NVIDIA H100 (96GB), 128GB DDR5 (WAT Cloud Lab)\n\n## Tech Stack\n\nPython 3.12+, FastAPI, Qdrant, spaCy, HuggingFace,\nJina Reranker v2, Qwen2.5/Qwen3, Docker, Streamlit\n\nSee also: github.com/Floressek/Azure-db-RAG (earlier work)"),
          projects: this._d(projDirs),
        }),
      }),
      etc: this._d({
        hostname: this._f('portfolio-terminal'),
        'os-release': this._f('NAME="Portfolio OS"\nVERSION="1.0"\nID=portfolio\nPRETTY_NAME="Portfolio OS 1.0"'),
        passwd: this._f('root:x:0:0:root:/root:/bin/bash\nszymon:x:1000:1000:Szymon Florek:/home/szymon:/bin/bash'),
      }),
      tmp: this._d({}),
      var: this._d({
        log: this._d({
          syslog: this._f('[INFO] System initialized\n[INFO] Portfolio terminal ready\n[INFO] Virtual filesystem mounted\n[INFO] All services running'),
        }),
      }),
    });
  }

  // --- Path resolution ---

  resolve(path) {
    if (!path || path === '~') return this.home;
    if (path === '-') return this._prevDir;
    if (path.startsWith('~/')) return this._normalize(this.home + path.slice(1));
    if (path.startsWith('/')) return this._normalize(path);
    return this._normalize(this.cwd + '/' + path);
  }

  _normalize(p) {
    const parts = p.split('/').filter(Boolean);
    const stack = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') { stack.pop(); continue; }
      stack.push(part);
    }
    return '/' + stack.join('/');
  }

  cwdShort() {
    if (this.cwd === this.home) return '~';
    if (this.cwd.startsWith(this.home + '/')) return '~' + this.cwd.slice(this.home.length);
    return this.cwd;
  }

  // --- Node access ---

  _getNode(absPath) {
    if (absPath === '/') return this.root;
    const parts = absPath.split('/').filter(Boolean);
    let node = this.root;
    for (const part of parts) {
      if (!node || node.type !== 'dir' || !node.children[part]) return null;
      node = node.children[part];
    }
    return node;
  }

  _getParent(absPath) {
    const parentPath = absPath.split('/').slice(0, -1).join('/') || '/';
    return { node: this._getNode(parentPath), path: parentPath };
  }

  _getName(absPath) {
    return absPath.split('/').filter(Boolean).pop() || '';
  }

  getNode(path) { return this._getNode(this.resolve(path)); }
  exists(path) { return this._getNode(this.resolve(path)) !== null; }
  isDir(path) { const n = this.getNode(path); return n && n.type === 'dir'; }
  isFile(path) { const n = this.getNode(path); return n && n.type === 'file'; }

  // --- Operations ---

  pwd() { return this.cwd; }

  cd(path) {
    const abs = this.resolve(path || '~');
    const node = this._getNode(abs);
    if (!node) return { error: `cd: ${path}: No such file or directory` };
    if (node.type !== 'dir') return { error: `cd: ${path}: Not a directory` };
    this._prevDir = this.cwd;
    this.cwd = abs;
    return { success: true };
  }

  ls(path, flags = {}) {
    const abs = path ? this.resolve(path) : this.cwd;
    const node = this._getNode(abs);
    if (!node) return { error: `ls: cannot access '${path || '.'}': No such file or directory` };

    if (node.type === 'file') {
      return { entries: [{ name: this._getName(abs), type: 'file', permissions: node.permissions, size: (node.content || '').length }] };
    }

    let entries = Object.entries(node.children).map(([name, n]) => ({
      name,
      type: n.type,
      permissions: n.permissions || (n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--'),
      size: n.type === 'file' ? (n.content || '').length : 4096,
    }));

    if (!flags.a) entries = entries.filter(e => !e.name.startsWith('.'));

    entries.sort((a, b) => a.name.localeCompare(b.name));

    if (flags.a) {
      entries.unshift(
        { name: '.', type: 'dir', permissions: 'drwxr-xr-x', size: 4096 },
        { name: '..', type: 'dir', permissions: 'drwxr-xr-x', size: 4096 },
      );
    }

    return { entries };
  }

  cat(path) {
    const node = this.getNode(path);
    if (!node) return { error: `cat: ${path}: No such file or directory` };
    if (node.type === 'dir') return { error: `cat: ${path}: Is a directory` };
    return { content: node.content };
  }

  mkdir(path, flags = {}) {
    const abs = this.resolve(path);
    if (this._getNode(abs)) {
      if (flags.p) return { success: true };
      return { error: `mkdir: cannot create directory '${path}': File exists` };
    }

    if (flags.p) {
      const parts = abs.split('/').filter(Boolean);
      let current = this.root;
      for (const part of parts) {
        if (!current.children[part]) {
          current.children[part] = this._d({});
        } else if (current.children[part].type !== 'dir') {
          return { error: `mkdir: cannot create directory '${path}': Not a directory` };
        }
        current = current.children[part];
      }
      return { success: true };
    }

    const parent = this._getParent(abs);
    if (!parent.node || parent.node.type !== 'dir') {
      return { error: `mkdir: cannot create directory '${path}': No such file or directory` };
    }
    parent.node.children[this._getName(abs)] = this._d({});
    return { success: true };
  }

  touch(path, content) {
    const abs = this.resolve(path);
    const existing = this._getNode(abs);
    if (existing) {
      if (content !== undefined && existing.type === 'file') existing.content = content;
      return { success: true };
    }
    const parent = this._getParent(abs);
    if (!parent.node || parent.node.type !== 'dir') {
      return { error: `touch: cannot touch '${path}': No such file or directory` };
    }
    parent.node.children[this._getName(abs)] = this._f(content || '');
    return { success: true };
  }

  writeFile(path, content) {
    return this.touch(path, content);
  }

  rm(path, flags = {}) {
    const abs = this.resolve(path);
    const node = this._getNode(abs);
    if (!node) return { error: `rm: cannot remove '${path}': No such file or directory` };
    if (node.type === 'dir' && !flags.r) {
      return { error: `rm: cannot remove '${path}': Is a directory` };
    }
    const parent = this._getParent(abs);
    delete parent.node.children[this._getName(abs)];
    return { success: true };
  }

  cp(src, dst) {
    const srcNode = this.getNode(src);
    if (!srcNode) return { error: `cp: cannot stat '${src}': No such file or directory` };
    if (srcNode.type === 'dir') return { error: `cp: -r not specified; omitting directory '${src}'` };

    const dstAbs = this.resolve(dst);
    const dstNode = this._getNode(dstAbs);

    if (dstNode && dstNode.type === 'dir') {
      dstNode.children[this._getName(this.resolve(src))] = this._f(srcNode.content);
    } else {
      const parent = this._getParent(dstAbs);
      if (!parent.node) return { error: `cp: cannot create '${dst}': No such file or directory` };
      parent.node.children[this._getName(dstAbs)] = this._f(srcNode.content);
    }
    return { success: true };
  }

  mv(src, dst) {
    const result = this.cp(src, dst);
    if (result.error) return result;
    return this.rm(src);
  }

  find(startPath, pattern, typeFilter) {
    const abs = this.resolve(startPath || '.');
    const startNode = this._getNode(abs);
    if (!startNode) return { error: `find: '${startPath}': No such file or directory` };

    const results = [];
    const walk = (path, node) => {
      const name = this._getName(path) || '/';
      const matchType = !typeFilter || (typeFilter === 'f' && node.type === 'file') || (typeFilter === 'd' && node.type === 'dir');
      const matchName = !pattern || this._globMatch(name, pattern);

      if (matchType && matchName) results.push(path || '/');

      if (node.type === 'dir') {
        Object.entries(node.children).forEach(([childName, childNode]) => {
          walk(path === '/' ? '/' + childName : path + '/' + childName, childNode);
        });
      }
    };
    walk(abs, startNode);
    return { results };
  }

  _globMatch(name, pattern) {
    const re = new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
    return re.test(name);
  }

  // --- Tab completion ---

  getCompletions(partial) {
    if (!partial) {
      const node = this._getNode(this.cwd);
      if (!node || node.type !== 'dir') return [];
      return Object.entries(node.children).map(([name, n]) => name + (n.type === 'dir' ? '/' : ''));
    }

    const lastSlash = partial.lastIndexOf('/');
    let dirPath, prefix;

    if (lastSlash === -1) {
      dirPath = this.cwd;
      prefix = partial;
    } else {
      dirPath = this.resolve(partial.substring(0, lastSlash + 1) || '/');
      prefix = partial.substring(lastSlash + 1);
    }

    const node = this._getNode(dirPath);
    if (!node || node.type !== 'dir') return [];

    return Object.entries(node.children)
      .filter(([name]) => name.startsWith(prefix))
      .map(([name, n]) => {
        const full = lastSlash === -1 ? name : partial.substring(0, lastSlash + 1) + name;
        return full + (n.type === 'dir' ? '/' : '');
      });
  }
}
