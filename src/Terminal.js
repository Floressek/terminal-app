import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState([
    'Welcome to Szymon Florek\'s Portfolio Terminal!',
    'Type <span class="command-highlight">help</span> to see available commands or <span class="command-highlight">portfolio</span> for a visual experience.'
  ]);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState('default'); // 'default', 'hacker', 'retro', 'synthwave'
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const projects = [
    {
      name: "Azure-db-RAG",
      description: "RAG for the Cosmos DB for Mongo DB vCore on Azure deployed on WhatsApp",
      tech: ["Python", "Azure", "MongoDB", "RAG"],
      link: "github.com/Floressek/Azure-db-RAG"
    },
    {
      name: "Gmail-extractor",
      description: "Script for extracting information from emails to be processed using OCR, fitted to custom JSON and presented in Google Sheets",
      tech: ["JavaScript", "OCR", "Google API", "Automation"],
      link: "github.com/Floressek/Gmail-extractor"
    },
    {
      name: "MED",
      description: "Materials and solutions from Data Exploration Methods laboratories, focusing on various data analysis techniques",
      tech: ["Python", "Jupyter Notebook", "Data Science", "Machine Learning"],
      link: "github.com/Floressek/MED"
    },
    {
      name: "concurrentLab_algorythms",
      description: "Simulation of a tourist attraction in a salt mine, implementing concurrent programming principles",
      tech: ["Java", "Concurrency", "Algorithms"],
      link: "github.com/Floressek/concurrentLab_algorythms"
    },
    {
      name: "MailAnalyzer",
      description: "Email analysis application written in MAUI that leverages AI to provide deep insights into email communications",
      tech: ["C#", "MAUI", "AI", ".NET"],
      link: "github.com/Floressek/MailAnalyzer"
    }
  ];

  const skills = {
    languages: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 },
      { name: "C++", level: 75 },
      { name: "Java", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "C", level: 65 }
    ],
    tools: [
      { name: "Docker", level: 85 },
      { name: "Git", level: 90 },
      { name: "Jupyter", level: 80 },
      { name: "JetBrains IDE", level: 85 }
    ],
    databases: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Oracle", level: 70 },
      { name: "Azure Cosmos", level: 75 }
    ]
  };

  const commands = {
    help: () => {
      const commandList = [
        ['about', 'Display information about me'],
        ['projects', 'View my projects'],
        ['skills', 'View my technical skills'],
        ['contact', 'Display my contact information'],
        ['interests', 'View my personal interests'],
        ['education', 'View my educational background'],
        ['portfolio', 'View my professional portfolio'],
        ['matrix', 'Enter the Matrix'],
        ['quote', 'Display a random programming quote'],
        ['clear', 'Clear the terminal'],
        ['help', 'Display this help message']
      ];
      
      return `Available commands:

${commandList.map(([cmd, desc]) => 
  `${cmd.padEnd(10)} - ${desc}`
).join('\n')}`;
    },
    about: () => {
      return `<div class="about-section">
        <h2>About Me</h2>
        <p>Hello! I'm Szymon Florek, a software developer with a passion for creating innovative solutions.</p>
        <p>I'm currently a 3rd year Computer Science student at Wojskowa Akademia Techniczna (WAT), focusing on Data Science and Machine Learning.</p>
        <p>I enjoy working with various technologies and am always eager to learn new skills.</p>
        <p>For a more visual representation of my work and skills, type <span class="command-highlight" onclick="document.getElementById('command-input').value='portfolio'; document.getElementById('command-input').dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}))">portfolio</span> or click the button in the header.</p>
      </div>`;
    },
    projects: () => {
      const projectsList = projects.map((project, index) => 
        `Project ${index + 1}: ${project.name}
  Description: ${project.description}
  Technologies: ${project.tech.join(', ')}
  Link: <a href="https://${project.link}" target="_blank" class="terminal-link">${project.link}</a>
`
      ).join('\n');
      
      return `My Projects:
==================

${projectsList}`;
    },
    skills: () => {
      const languageSkills = skills.languages.map(s => `  ${s.name.padEnd(15)} [${getProgressBar(s.level)}] ${s.level}%`).join('\n');
      const toolSkills = skills.tools.map(s => `  ${s.name.padEnd(15)} [${getProgressBar(s.level)}] ${s.level}%`).join('\n');
      const dbSkills = skills.databases.map(s => `  ${s.name.padEnd(15)} [${getProgressBar(s.level)}] ${s.level}%`).join('\n');
      
      return `Programming Languages:
${languageSkills}

Tools & Technologies:
${toolSkills}

Databases:
${dbSkills}

Currently Learning:
  • Machine Learning & Data Science
  • Cloud Computing (AWS/GCP/AZURE)
  • Software Development Practices
  • Web Development Technologies`;
    },
    interests: () => `Personal Interests:
• Chess
• Bouldering
• Woodworking
• Coding
• Reading`,
    education: () => `Education:
• Computer Science at WAT (Wojskowa Akademia Techniczna)
• 3rd year student
• Focus on Data Science and Machine Learning`,
    contact: () => `Contact Information:

📧 Email:    <a href="mailto:szymon.florek@student.wat.edu.pl" class="terminal-link">szymon.florek@student.wat.edu.pl</a>
🌐 GitHub:   <a href="https://github.com/Floressek" target="_blank" class="terminal-link">github.com/Floressek</a>
💼 LinkedIn: <a href="https://linkedin.com/in/szymon-florek-33a968296" target="_blank" class="terminal-link">linkedin.com/in/szymon-florek-33a968296</a>

Feel free to reach out for collaboration or opportunities!`,
    clear: () => {
      setOutput([]);
      return '';
    },
    ls: () => `projects/
skills.txt
about.md
contact.txt
interests.txt
education.txt
README.md`,
    cat: (args) => {
      const files = {
        'skills.txt': commands.skills(),
        'contact.txt': commands.contact(),
        'README.md': commands.about(),
        'about.md': commands.about(),
        'interests.txt': commands.interests(),
        'education.txt': commands.education()
      };
      return files[args] || `cat: ${args}: No such file`;
    },
    pwd: () => `/home/szymon/portfolio/${currentDirectory}`,
    cd: (args) => {
      if (!args || args === '~') {
        setCurrentDirectory('~');
        return '';
      }
      return `cd: ${args}: No such directory`;
    },
    echo: (args) => args || '',
    date: () => new Date().toLocaleString(),
    whoami: () => 'szymon',
    sudo: (args) => {
      if (args === 'rm -rf /' || args === 'rm -rf /*') {
        setTimeout(() => {
          setIsDeleting(true);
          setTimeout(() => {
            setOutput([
              'Welcome to Szymon Florek\'s Portfolio Terminal!',
              'Type \'help\' to see available commands.',
              'Just kidding! Your system is safe. 😉'
            ]);
            setIsDeleting(false);
          }, 5000);
        }, 1000);
        
        return `<div style="color: red; font-weight: bold;">
██    ██  ██████  ██    ██     ████████ ██   ██ ██ ███    ██ ██   ██     
 ██  ██  ██    ██ ██    ██        ██    ██   ██ ██ ████   ██ ██  ██      
  ████   ██    ██ ██    ██        ██    ███████ ██ ██ ██  ██ █████       
   ██    ██    ██ ██    ██        ██    ██   ██ ██ ██  ██ ██ ██  ██      
   ██     ██████   ██████         ██    ██   ██ ██ ██   ████ ██   ██     
                                                                         
████████ ██   ██ ██ ███████     ██ ███████                               
   ██    ██   ██ ██ ██          ██ ██                                    
   ██    ███████ ██ ███████     ██ ███████                               
   ██    ██   ██ ██      ██     ██      ██                               
   ██    ██   ██ ██ ███████     ██ ███████                               
                                                                         
██████   █████  ██████                                                   
██   ██ ██   ██ ██   ██                                                  
██████  ███████ ██   ██                                                  
██   ██ ██   ██ ██   ██                                                  
██████  ██   ██ ██████                                                   
                                                                         
██ ██████  ███████  █████                                                
██ ██   ██ ██      ██   ██                                               
██ ██   ██ █████   ███████                                               
██ ██   ██ ██      ██   ██                                               
██ ██████  ███████ ██   ██                                               
</div>

<span style="color: red; font-weight: bold;">System will now delete itself in 5 seconds...</span>`;
      }
      return `sudo: ${args}: command not found`;
    },
    theme: (args) => {
      const availableThemes = ['default', 'hacker', 'retro', 'synthwave'];
      
      if (!args || !availableThemes.includes(args)) {
        return `Available themes: ${availableThemes.join(', ')}\nUsage: theme [theme_name]`;
      }
      
      setTerminalTheme(args);
      return `Terminal theme changed to "${args}"`;
    },
    matrix: () => {
      setTimeout(() => {
        setTerminalTheme('hacker');
        setOutput(prev => [
          ...prev,
          'Initiating Matrix mode...',
          'Wake up, Neo...',
          'The Matrix has you...',
          'Follow the white rabbit.',
          'Knock, knock, Neo.'
        ]);
        
        // Add falling code animation after a delay
        setTimeout(() => {
          setOutput(prev => [
            ...prev,
            `<div class="matrix-code">
              <pre style="color: #00ff00; text-shadow: 0 0 5px #00ff00; font-family: monospace; overflow: hidden;">
01001110 01100101 01101111 00001010 01010111 01100001 01101011 01100101 00100000 01110101 01110000 00001010
01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000 00100000 01101000
01100001 01110011 00100000 01111001 01101111 01110101 00001010 01000110 01101111 01101100 01101100 01101111
01110111 00100000 01110100 01101000 01100101 00100000 01110111 01101000 01101001 01110100 01100101 00100000
01110010 01100001 01100010 01100010 01101001 01110100 00001010 01001011 01101110 01101111 01100011 01101011
00101100 00100000 01101011 01101110 01101111 01100011 01101011 00101100 00100000 01001110 01100101 01101111
              </pre>
            </div>`,
            `<div style="color: #00ff00; margin-top: 20px; text-shadow: 0 0 5px #00ff00;">
              <p>Choose your pill:</p>
              <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
                <button 
                  style="background-color: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);"
                  onclick="
                    (function() {
                      const event = new CustomEvent('matrix-red-pill');
                      document.dispatchEvent(event);
                    })()
                  "
                >
                  RED PILL
                </button>
                <button 
                  style="background-color: #0000ff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; box-shadow: 0 0 10px rgba(0, 0, 255, 0.7);"
                  onclick="
                    (function() {
                      const event = new CustomEvent('matrix-blue-pill');
                      document.dispatchEvent(event);
                    })()
                  "
                >
                  BLUE PILL
                </button>
              </div>
              <p style="margin-top: 10px;">Red Pill - See how deep the rabbit hole goes</p>
              <p>Blue Pill - Return to normal terminal</p>
            </div>`
          ]);
        }, 3000);
      }, 500);
      
      return 'Loading Matrix sequence...';
    },
    neofetch: () => {
      const date = new Date();
      const uptime = Math.floor(Math.random() * 24) + 'h ' + Math.floor(Math.random() * 60) + 'm';
      const os = navigator.platform || 'macOS';
      const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                     navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                     navigator.userAgent.includes('Safari') ? 'Safari' : 'Unknown Browser';
      const resolution = `${window.innerWidth}x${window.innerHeight}`;
      const shell = 'portfolio-bash';
      
      return `<div style="display: flex; align-items: flex-start;">
  <div style="color: #00ff00; margin-right: 20px; font-size: 12px; line-height: 12px; white-space: pre;">
                    .---.
                   /     \\
                   \\.@-@./
                   /\`\\_/\`\\
                  //  _  \\\\
                 | \\     )|_
                /\`\\_\`>  <_/ \\
                \\__/'---'\\__/
  </div>
  <div>
    <span style="color: #00ff00;">szymon@portfolio</span>
    <span style="color: #ffffff;">-----------------------</span>
    <span style="color: #00ff00;">OS:</span> <span style="color: #ffffff;">${os}</span>
    <span style="color: #00ff00;">Host:</span> <span style="color: #ffffff;">Portfolio Terminal</span>
    <span style="color: #00ff00;">Kernel:</span> <span style="color: #ffffff;">React ${React.version}</span>
    <span style="color: #00ff00;">Uptime:</span> <span style="color: #ffffff;">${uptime}</span>
    <span style="color: #00ff00;">Shell:</span> <span style="color: #ffffff;">${shell}</span>
    <span style="color: #00ff00;">Resolution:</span> <span style="color: #ffffff;">${resolution}</span>
    <span style="color: #00ff00;">Browser:</span> <span style="color: #ffffff;">${browser}</span>
    <span style="color: #00ff00;">Date:</span> <span style="color: #ffffff;">${date.toLocaleDateString()}</span>
    <span style="color: #00ff00;">Time:</span> <span style="color: #ffffff;">${date.toLocaleTimeString()}</span>
    <span style="color: #00ff00;">Theme:</span> <span style="color: #ffffff;">${terminalTheme}</span>
    <span style="color: #ffffff;">-----------------------</span>
    <div style="display: flex; margin-top: 5px;">
      <span style="color: #ff0000;">██ </span>
      <span style="color: #ff7f00;">██ </span>
      <span style="color: #ffff00;">██ </span>
      <span style="color: #00ff00;">██ </span>
      <span style="color: #0000ff;">██ </span>
      <span style="color: #4b0082;">██ </span>
      <span style="color: #9400d3;">██ </span>
    </div>
  </div>
</div>`;
    },
    quote: () => {
      const quotes = [
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
        { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
        { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
        { text: "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases.", author: "Norman Augustine" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
        { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { text: "Computers are good at following instructions, but not at reading your mind.", author: "Donald Knuth" },
        { text: "It's not a bug – it's an undocumented feature.", author: "Anonymous" },
        { text: "The best thing about a boolean is even if you are wrong, you are only off by a bit.", author: "Anonymous" },
        { text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: "Edsger W. Dijkstra" },
        { text: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", author: "John Woods" },
        { text: "There are two ways to write error-free programs; only the third one works.", author: "Alan J. Perlis" },
        { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
        { text: "Nine people can't make a baby in a month.", author: "Fred Brooks" },
        { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
        { text: "Without requirements or design, programming is the art of adding bugs to an empty text file.", author: "Louis Srygley" }
      ];
      
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      return `<div style="color: #ffffff; padding: 10px; border-left: 4px solid #00ffff; margin: 10px 0;">
        <p style="font-style: italic; font-size: 16px;">"${randomQuote.text}"</p>
        <p style="text-align: right; color: #00ffff;">— ${randomQuote.author}</p>
      </div>`;
    },
    portfolio: () => {
      setIsPortfolioVisible(true);
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = 0;
        }
      }, 100);
      return `<div style="text-align: center; padding: 20px; color: #64ffda;">
        <h2 style="margin-bottom: 15px;">Opening Professional Portfolio View</h2>
        <p style="margin-bottom: 10px;">Switching to a more visual representation of my portfolio...</p>
        <div style="font-size: 24px; margin: 20px 0;">
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
        </div>
      </div>`;
    },
    'red pill': () => {
      setTerminalTheme('hacker');
      setOutput(prev => [
        ...prev,
        `<div style="color: #00ff00; text-shadow: 0 0 5px #00ff00;">
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 15px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">You take the red pill...</p>
          
          <div style="border: 1px solid #00ff00; padding: 15px; margin: 20px 0; background-color: rgba(0, 255, 0, 0.1); border-radius: 5px;">
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">The Matrix has been revealed to you.</p>
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">Welcome to the real world.</p>
          </div>
          
          <div style="margin: 25px 0; overflow: hidden; border: 1px solid #00ff00; border-radius: 5px; padding: 10px; background-color: rgba(0, 0, 0, 0.7);">
            <pre style="font-size: 12px; line-height: 1.2; overflow: hidden; animation: matrixRain 10s linear infinite, matrixGlow 2s ease-in-out infinite; text-align: center;">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓
            ▓ 01001101 01000001 01010100 01010010 01001001 01011000 ▓
            ▓ 01010111 01000001 01001011 01000101 00100000 01010101 01010000 ▓
            ▓ 01010100 01001000 01000101 00100000 01001101 01000001 01010100 01010010 01001001 01011000 00100000 01001000 01000001 01010011 00100000 01011001 01001111 01010101 ▓
            ▓ 01000110 01001111 01001100 01001100 01001111 01010111 00100000 01010100 01001000 01000101 00100000 01010111 01001000 01001001 01010100 01000101 00100000 01010010 01000001 01000010 01000010 01001001 01010100 ▓
            ▓ 01001011 01001110 01001111 01000011 01001011 00101100 00100000 01001011 01001110 01001111 01000011 01001011 00101100 00100000 01001110 01000101 01001111 ▓
            ▓ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ▓
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            </pre>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding: 15px; border: 1px dashed #00ff00; border-radius: 5px; background-color: rgba(0, 255, 0, 0.05);">
            <p style="margin-bottom: 15px; font-size: 16px;">You are now in <span style="color: #ff0000; text-shadow: 0 0 5px #ff0000;">The Matrix</span>. Reality is different here.</p>
            <p>Type <span class="command-highlight" style="font-size: 18px;">help</span> to see available commands in the Matrix.</p>
          </div>
        </div>`
      ]);
    },
    'blue pill': () => {
      setTerminalTheme('default');
      setOutput(prev => [
        ...prev,
        `<div style="color: #3498db; text-shadow: 0 0 5px #3498db;">
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 15px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">You take the blue pill...</p>
          
          <div style="border: 1px solid #3498db; padding: 15px; margin: 20px 0; background-color: rgba(52, 152, 219, 0.1); border-radius: 5px;">
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">The story ends here.</p>
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">You wake up in your bed and believe whatever you want to believe.</p>
          </div>
          
          <div style="margin: 25px 0; overflow: hidden; border: 1px solid #3498db; border-radius: 5px; padding: 10px; background-color: rgba(0, 0, 0, 0.7); text-align: center;">
            <div style="font-size: 50px; margin: 20px 0; animation: fadeIn 3s ease-in-out;">
              (-.-)Zzz...
            </div>
            <p style="font-size: 18px; margin: 15px 0; opacity: 0.8;">Returning to the comfort of ignorance...</p>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding: 15px; border: 1px dashed #3498db; border-radius: 5px; background-color: rgba(52, 152, 219, 0.05);">
            <p style="margin-bottom: 15px; font-size: 16px;">You chose <span style="color: #3498db; text-shadow: 0 0 5px #3498db;">blissful ignorance</span>. The Matrix remains hidden.</p>
            <p>Type <span class="command-highlight" style="font-size: 18px;">help</span> to see available commands.</p>
          </div>
        </div>`
      ]);
    }
  };

  const getProgressBar = (level) => {
    const width = 20;
    const filled = Math.round((level / 100) * width);
    return '█'.repeat(filled) + '░'.repeat(width - filled);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Add event listeners for matrix pill buttons
  useEffect(() => {
    const handleRedPill = () => {
      setTerminalTheme('hacker');
      setOutput(prev => [
        ...prev,
        `<div style="color: #00ff00; text-shadow: 0 0 5px #00ff00;">
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 15px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">You take the red pill...</p>
          
          <div style="border: 1px solid #00ff00; padding: 15px; margin: 20px 0; background-color: rgba(0, 255, 0, 0.1); border-radius: 5px;">
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">The Matrix has been revealed to you.</p>
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">Welcome to the real world.</p>
          </div>
          
          <div style="margin: 25px 0; overflow: hidden; border: 1px solid #00ff00; border-radius: 5px; padding: 10px; background-color: rgba(0, 0, 0, 0.7);">
            <pre style="font-size: 12px; line-height: 1.2; overflow: hidden; animation: matrixRain 10s linear infinite, matrixGlow 2s ease-in-out infinite; text-align: center;">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓
            ▓ 01001101 01000001 01010100 01010010 01001001 01011000 ▓
            ▓ 01010111 01000001 01001011 01000101 00100000 01010101 01010000 ▓
            ▓ 01010100 01001000 01000101 00100000 01001101 01000001 01010100 01010010 01001001 01011000 00100000 01001000 01000001 01010011 00100000 01011001 01001111 01010101 ▓
            ▓ 01000110 01001111 01001100 01001100 01001111 01010111 00100000 01010100 01001000 01000101 00100000 01010111 01001000 01001001 01010100 01000101 00100000 01010010 01000001 01000010 01000010 01001001 01010100 ▓
            ▓ 01001011 01001110 01001111 01000011 01001011 00101100 00100000 01001011 01001110 01001111 01000011 01001011 00101100 00100000 01001110 01000101 01001111 ▓
            ▓ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ░ ▒ ▓ ░ ▒ ░ ▓ ▒ ▓
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            </pre>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding: 15px; border: 1px dashed #00ff00; border-radius: 5px; background-color: rgba(0, 255, 0, 0.05);">
            <p style="margin-bottom: 15px; font-size: 16px;">You are now in <span style="color: #ff0000; text-shadow: 0 0 5px #ff0000;">The Matrix</span>. Reality is different here.</p>
            <p>Type <span class="command-highlight" style="font-size: 18px;">help</span> to see available commands in the Matrix.</p>
          </div>
        </div>`
      ]);
    };

    const handleBluePill = () => {
      setTerminalTheme('default');
      setOutput(prev => [
        ...prev,
        `<div style="color: #3498db; text-shadow: 0 0 5px #3498db;">
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 15px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">You take the blue pill...</p>
          
          <div style="border: 1px solid #3498db; padding: 15px; margin: 20px 0; background-color: rgba(52, 152, 219, 0.1); border-radius: 5px;">
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">The story ends here.</p>
            <p style="font-size: 16px; margin-bottom: 10px; text-align: center;">You wake up in your bed and believe whatever you want to believe.</p>
          </div>
          
          <div style="margin: 25px 0; overflow: hidden; border: 1px solid #3498db; border-radius: 5px; padding: 10px; background-color: rgba(0, 0, 0, 0.7); text-align: center;">
            <div style="font-size: 50px; margin: 20px 0; animation: fadeIn 3s ease-in-out;">
              (-.-)Zzz...
            </div>
            <p style="font-size: 18px; margin: 15px 0; opacity: 0.8;">Returning to the comfort of ignorance...</p>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding: 15px; border: 1px dashed #3498db; border-radius: 5px; background-color: rgba(52, 152, 219, 0.05);">
            <p style="margin-bottom: 15px; font-size: 16px;">You chose <span style="color: #3498db; text-shadow: 0 0 5px #3498db;">blissful ignorance</span>. The Matrix remains hidden.</p>
            <p>Type <span class="command-highlight" style="font-size: 18px;">help</span> to see available commands.</p>
          </div>
        </div>`
      ]);
    };

    document.addEventListener('matrix-red-pill', handleRedPill);
    document.addEventListener('matrix-blue-pill', handleBluePill);

    return () => {
      document.removeEventListener('matrix-red-pill', handleRedPill);
      document.removeEventListener('matrix-blue-pill', handleBluePill);
    };
  }, []);

  const handleCommand = (command) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    const [cmd, ...args] = trimmedCommand.split(' ');
    const result = commands[cmd] ? commands[cmd](args.join(' ')) : `Command not found: ${cmd}`;
    
    setOutput(prev => [
      ...prev, 
      `<span class="prompt-user">szymon@portfolio:${currentDirectory}$</span><span style="color: rgb(255, 255, 255)"> ${trimmedCommand}</span>`,
      result
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
      setCommandHistory(prev => [...prev, currentCommand]);
      setHistoryIndex(commandHistory.length + 1);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setCurrentCommand(commandHistory[historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setCurrentCommand(commandHistory[historyIndex + 1]);
      } else {
        setHistoryIndex(commandHistory.length);
        setCurrentCommand('');
      }
    } else if (e.key === 'Escape' && isPortfolioVisible) {
      setIsPortfolioVisible(false);
      setOutput(prev => {
        return prev.filter(line => !line.includes('Opening Professional Portfolio View'));
      });
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = 0;
        }
      }, 100);
    }
  };

  const handleCloseTerminal = () => {
    setIsTerminalVisible(false);
    setTimeout(() => {
      setIsTerminalVisible(true);
      setOutput(prev => [
        ...prev,
        'Terminal restarted. All previous session data has been cleared.',
        'Welcome back to Szymon Florek\'s Portfolio Terminal!',
        'Type \'help\' to see available commands.'
      ]);
    }, 1500);
  };

  const handleMinimizeTerminal = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  const handleMaximizeTerminal = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
  };

  return (
    <div className={`terminal-container ${isTerminalMinimized ? 'minimized' : ''} ${isTerminalMaximized ? 'maximized' : ''} theme-${terminalTheme}`}>
      {isTerminalVisible && (
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control close" onClick={handleCloseTerminal}></span>
              <span className="control minimize" onClick={handleMinimizeTerminal}></span>
              <span className="control maximize" onClick={handleMaximizeTerminal}></span>
            </div>
            <div className="terminal-title">
              <span>szymon@portfolio</span>
              <span className="status-indicator">●</span>
            </div>
          </div>
          <div className={`terminal-content ${isDeleting ? 'deleting' : ''}`} ref={outputRef}>
            {!isPortfolioVisible ? (
              <>
                <div id="terminal-output">
                  {output.map((line, index) => (
                    <div 
                      key={index} 
                      className="line" 
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ))}
                </div>
                <div className="input-line">
                  <span className="prompt-user">szymon@portfolio:{currentDirectory}$</span>
                  <input
                    id="command-input"
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    disabled={isDeleting}
                  />
                </div>
              </>
            ) : (
              <div id="portfolio-content">
                <div className="portfolio-back-button" onClick={() => {
                  setIsPortfolioVisible(false);
                  setOutput(prev => {
                    return prev.filter(line => !line.includes('Opening Professional Portfolio View'));
                  });
                  setTimeout(() => {
                    if (outputRef.current) {
                      outputRef.current.scrollTop = 0;
                    }
                  }, 100);
                }}>
                  [Press ESC or click here to return to terminal]
                </div>
                
                <div className="portfolio-header">
                  <div className="portfolio-name">SZYMON FLOREK</div>
                  <div className="portfolio-title">Computer Science Student & Tech Enthusiast</div>
                </div>
                
                <div className="portfolio-about">
                  <div className="section-title">ABOUT ME</div>
                  <p>Computer Science student (3rd year) at WAT (Wojskowa Akademia Techniczna), focusing on Data Science and Machine Learning. I'm passionate about solving complex problems through code and exploring new technologies.</p>
                  <p>Currently exploring the vast world of software development and AI while building practical skills through hands-on projects.</p>
                </div>
                
                <div className="portfolio-section">
                  <div className="section-title">PROJECTS</div>
                  <div className="projects-grid">
                    {projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <h3>{project.name}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="tech-stack">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                        <div className="project-link">
                          <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="terminal-link">
                            View Project →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="portfolio-section">
                  <div className="section-title">TECHNICAL SKILLS</div>
                  <div className="skills-container">
                    <div className="skill-category">
                      <h4>Programming Languages</h4>
                      <div className="skills-grid">
                        {skills.languages.map((skill, index) => (
                          <div key={index} className="skill">
                            <div className="skill-header">
                              <span>{skill.name}</span>
                              <span className="percentage">{skill.level}%</span>
                            </div>
                            <div className="progress-bar">
                              <div className="progress" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="skill-category">
                      <h4>Tools & Technologies</h4>
                      <div className="skills-grid">
                        {skills.tools.map((skill, index) => (
                          <div key={index} className="skill">
                            <div className="skill-header">
                              <span>{skill.name}</span>
                              <span className="percentage">{skill.level}%</span>
                            </div>
                            <div className="progress-bar">
                              <div className="progress" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="skill-category">
                      <h4>Databases</h4>
                      <div className="skills-grid">
                        {skills.databases.map((skill, index) => (
                          <div key={index} className="skill">
                            <div className="skill-header">
                              <span>{skill.name}</span>
                              <span className="percentage">{skill.level}%</span>
                            </div>
                            <div className="progress-bar">
                              <div className="progress" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="learning-section">
                    <h4>Currently Learning</h4>
                    <div className="learning-tags">
                      <span className="learning-tag">Machine Learning</span>
                      <span className="learning-tag">Data Science</span>
                      <span className="learning-tag">Cloud Computing</span>
                      <span className="learning-tag">Software Development</span>
                      <span className="learning-tag">Web Development</span>
                    </div>
                  </div>
                </div>
                
                <div className="portfolio-section">
                  <div className="section-title">EDUCATION</div>
                  <div className="education-item">
                    <h4>Computer Science</h4>
                    <p>Wojskowa Akademia Techniczna (WAT)</p>
                    <p>3rd year student</p>
                    <p>Focus on Data Science and Machine Learning</p>
                  </div>
                </div>
                
                <div className="portfolio-section">
                  <div className="section-title">INTERESTS</div>
                  <div className="interests-container">
                    <div className="interest-item">
                      <span className="interest-icon">♟️</span>
                      <span>Chess</span>
                    </div>
                    <div className="interest-item">
                      <span className="interest-icon">🧗</span>
                      <span>Bouldering</span>
                    </div>
                    <div className="interest-item">
                      <span className="interest-icon">🪚</span>
                      <span>Woodworking</span>
                    </div>
                    <div className="interest-item">
                      <span className="interest-icon">💻</span>
                      <span>Coding</span>
                    </div>
                    <div className="interest-item">
                      <span className="interest-icon">📚</span>
                      <span>Reading</span>
                    </div>
                  </div>
                </div>
                
                <div className="portfolio-section">
                  <div className="section-title">CONTACT</div>
                  <div className="contact-container">
                    <div className="contact-item">
                      <span className="contact-icon">📧</span>
                      <a href="mailto:szymon.florek@student.wat.edu.pl" className="terminal-link">szymon.florek@student.wat.edu.pl</a>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">🌐</span>
                      <a href="https://github.com/Floressek" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/Floressek</a>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">💼</span>
                      <a href="https://linkedin.com/in/szymon-florek-33a968296" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/szymon-florek-33a968296</a>
                    </div>
                  </div>
                </div>
                
                <div className="portfolio-footer">
                  <p>This portfolio is built with React and styled to resemble a terminal interface.</p>
                  <p>Type 'help' in the terminal to see available commands.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal; 