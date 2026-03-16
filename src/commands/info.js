import { register, getAllCommands } from './registry';
import projects from '../data/projects';
import skills from '../data/skills';
import { progressBar } from '../utils/formatting';

export default function registerInfoCommands() {
  register('help', {
    description: 'Display available commands',
    usage: 'help',
    handler() {
      const cmds = getAllCommands();
      const categories = {
        'Navigation & Files': ['ls', 'cd', 'pwd', 'cat', 'tree', 'find', 'grep'],
        'File Operations': ['mkdir', 'touch', 'rm', 'cp', 'mv', 'chmod'],
        'Text Processing': ['head', 'tail', 'wc', 'sort', 'echo'],
        'System Info': ['whoami', 'hostname', 'uname', 'uptime', 'date', 'env', 'history', 'which', 'man'],
        'Portfolio': ['about', 'projects', 'skills', 'contact', 'education', 'interests', 'work', 'portfolio'],
        'Fun & Extras': ['matrix', 'quote', 'vim', 'neofetch', 'hack', 'coffee', 'easter-eggs'],
        'Terminal': ['clear', 'theme', 'help'],
      };

      let output = `<span style="color:#64ffda;font-weight:bold">Available Commands</span>\n<span style="color:#555">${'\u2500'.repeat(50)}</span>\n`;

      for (const [cat, cmdNames] of Object.entries(categories)) {
        output += `\n<span style="color:#ffcc00;font-weight:bold">${cat}</span>\n`;
        for (const name of cmdNames) {
          const cmd = cmds.get(name);
          if (cmd) {
            output += `  <span style="color:#64ffda">${name.padEnd(14)}</span> <span style="color:#aaa">${cmd.description}</span>\n`;
          }
        }
      }

      output += `\n<span style="color:#555">${'\u2500'.repeat(50)}</span>`;
      output += `\n<span style="color:#aaa">Tip: Use <span class="command-highlight">man &lt;command&gt;</span> for detailed help. Supports pipes: <span class="command-highlight">cat file | grep pattern</span></span>`;
      return output;
    },
  });

  register('about', {
    description: 'Display information about me',
    usage: 'about',
    handler() {
      return `<div class="about-section">
  <h2>About Me</h2>
  <p>Hi! I'm <span style="color:#64ffda;font-weight:bold">Szymon Florek</span> \u2014 software developer, AI enthusiast, and quantum computing explorer based in <span style="color:#64ffda">Warsaw</span>.</p>
  <p>I graduated with honors <span style="color:#ffcc00">(5.0)</span> from my BSc in Computer Science at WAT, with a thesis on <span style="color:#64ffda">"Analysis of Possibilities for Improving RAG Chatbots"</span>.</p>
  <p>Currently a <span style="color:#64ffda">1st year MSc student</span> in Quantum Computing at WAT, while working at <span style="color:#64ffda">@ardium-pl</span>.</p>
  <p>I build things with Python, TypeScript, Terraform, and AI/ML tools. Check out my work: <a href="https://floressek.com" target="_blank" class="terminal-link">floressek.com</a></p>
  <p>Type <span class="command-highlight">portfolio</span> for a visual experience or <span class="command-highlight">work</span> for professional info.</p>
</div>`;
    },
  });

  register('projects', {
    description: 'View my projects',
    usage: 'projects',
    handler() {
      const list = projects.map((p, i) =>
        `<span style="color:#64ffda;font-weight:bold">Project ${i + 1}: ${p.name}</span>\n` +
        `  Description: ${p.description}\n` +
        `  Technologies: ${p.tech.join(', ')}\n` +
        `  Link: <a href="https://${p.link}" target="_blank" class="terminal-link">${p.link}</a>\n`
      ).join('\n');

      return `<span style="color:#ffcc00;font-weight:bold">My Projects</span> <span style="color:#555">(${projects.length} featured / 45 total on GitHub)</span>\n${'\u2550'.repeat(50)}\n\n${list}` +
        `\n<span style="color:#aaa">See all 45 repos: <a href="https://github.com/Floressek?tab=repositories" target="_blank" class="terminal-link">github.com/Floressek</a></span>`;
    },
  });

  register('skills', {
    description: 'View my technical skills',
    usage: 'skills',
    handler() {
      const fmt = (list) => list.map(s =>
        `  ${s.name.padEnd(17)} [${progressBar(s.level)}] ${s.level}%`
      ).join('\n');

      return `<span style="color:#ffcc00;font-weight:bold">Programming Languages:</span>\n${fmt(skills.languages)}\n\n` +
        `<span style="color:#ffcc00;font-weight:bold">Tools & Infrastructure:</span>\n${fmt(skills.tools)}\n\n` +
        `<span style="color:#ffcc00;font-weight:bold">Databases:</span>\n${fmt(skills.databases)}\n\n` +
        `<span style="color:#ffcc00;font-weight:bold">AI & Data Science:</span>\n${fmt(skills.ai)}\n\n` +
        `<span style="color:#64ffda">Currently Exploring:</span>\n` +
        `  \u2022 Quantum Computing & Quantum Algorithms\n` +
        `  \u2022 Advanced RAG Architectures\n` +
        `  \u2022 Cloud-Native Infrastructure (GCP/Azure)\n` +
        `  \u2022 NLP & Large Language Models`;
    },
  });

  register('contact', {
    description: 'Display contact information',
    usage: 'contact',
    handler() {
      return `<span style="color:#ffcc00;font-weight:bold">Contact Information</span>\n\n` +
        `\uD83D\uDCE7 Email:    <a href="mailto:szymon.florek@student.wat.edu.pl" class="terminal-link">szymon.florek@student.wat.edu.pl</a>\n` +
        `\uD83C\uDF10 Website:  <a href="https://floressek.com" target="_blank" class="terminal-link">floressek.com</a>\n` +
        `\uD83D\uDC19 GitHub:   <a href="https://github.com/Floressek" target="_blank" class="terminal-link">github.com/Floressek</a> <span style="color:#555">(45 repos)</span>\n` +
        `\uD83D\uDCBC LinkedIn: <a href="https://linkedin.com/in/szymon-florek-33a968296" target="_blank" class="terminal-link">linkedin.com/in/szymon-florek-33a968296</a>\n` +
        `\uD83C\uDFE2 Company:  <a href="https://github.com/ardium-pl" target="_blank" class="terminal-link">@ardium-pl</a>\n` +
        `\uD83D\uDCCD Location: Warsaw, Poland\n\n` +
        `<span style="color:#64ffda">Open to collaboration, research opportunities, and interesting projects!</span>`;
    },
  });

  register('interests', {
    description: 'View my personal interests',
    usage: 'interests',
    handler() {
      return `<span style="color:#ffcc00;font-weight:bold">Personal Interests</span>\n\n` +
        `  \u265F\uFE0F  Chess\n` +
        `  \uD83E\uDDD7  Bouldering\n` +
        `  \uD83E\uDE9A  Woodworking\n` +
        `  \uD83D\uDCBB  Coding\n` +
        `  \uD83D\uDCDA  Reading`;
    },
  });

  register('education', {
    description: 'View my educational background',
    usage: 'education',
    handler() {
      return `<span style="color:#ffcc00;font-weight:bold">Education</span>\n\n` +
        `  <span style="color:#64ffda;font-weight:bold">\uD83C\uDF93 MSc Computer Science</span> \u2014 Quantum Computing\n` +
        `     Wojskowa Akademia Techniczna (WAT), Warsaw\n` +
        `     1st year \u2022 2025\u2013present\n` +
        `     Focus: Quantum Computing & Quantum Algorithms\n\n` +
        `  <span style="color:#64ffda;font-weight:bold">\uD83C\uDF93 BSc Computer Science</span> \u2014 Graduated with Honors <span style="color:#ffcc00">(5.0)</span>\n` +
        `     Wojskowa Akademia Techniczna (WAT), Warsaw\n` +
        `     2022\u20132025\n` +
        `     Thesis: "Analysis of Possibilities for Improving RAG Chatbots"\n` +
        `     Focus: Data Science, Machine Learning, AI`;
    },
  });

  register('work', {
    description: 'View my professional experience',
    usage: 'work',
    handler() {
      return `<span style="color:#ffcc00;font-weight:bold">Professional Experience</span>\n\n` +
        `  <span style="color:#64ffda;font-weight:bold">\uD83C\uDFE2 Software Developer</span> @ <a href="https://github.com/ardium-pl" target="_blank" class="terminal-link">ardium-pl</a>\n` +
        `     Warsaw, Poland\n\n` +
        `  <span style="color:#aaa">Key areas:</span>\n` +
        `     \u2022 Full-stack development\n` +
        `     \u2022 Cloud infrastructure (GCP, Azure, Terraform)\n` +
        `     \u2022 AI/ML solutions & RAG systems\n` +
        `     \u2022 Data pipelines & automation\n\n` +
        `  <span style="color:#aaa">Also contributing to:</span>\n` +
        `     \u2022 Open-source projects (45 public repos on GitHub)\n` +
        `     \u2022 Academic research in Quantum Computing\n` +
        `     \u2022 Community knowledge sharing`;
    },
  });
}
