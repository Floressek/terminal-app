import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState([
    'Welcome to Szymon Florek\'s Portfolio Terminal!',
    'Type \'help\' to see available commands.'
  ]);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [isDeleting, setIsDeleting] = useState(false);
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
      return `Available commands:

${[
  ['about',    'Display information about Szymon Florek'],
  ['projects', 'List my projects'],
  ['skills',   'Show my technical skills'],
  ['contact',  'Display contact information'],
  ['interests','Show my personal interests'],
  ['education','Show my education details'],
  ['clear',    'Clear the terminal screen'],
  ['help',     'Display this help message']
].map(([cmd, desc]) => 
  `${cmd.padEnd(10)} - ${desc}`
).join('\n')}`;
    },
    about: () => `About Me:
• Computer Science Student (3rd year) at WAT (Military University of Technology)
• Focusing on Data Science and Machine Learning
• Exploring software development and AI
• Building practical skills through hands-on projects
• 21 years old`,
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
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">
          <div className="controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
          <div className="title">portfolio@macbook-pro ~</div>
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
              <div className="back-button" onClick={() => setIsPortfolioVisible(false)}>
                [Press ESC or click here to return to terminal]
              </div>
              <div className="section-title">SIMON | CS STUDENT & TECH ENTHUSIAST</div>
              <p>Computer Science student (3rd year) at WAT (Wojskowa Akademia Techniczna), focusing on Data Science and Machine Learning.</p>
              <p>Currently exploring the vast world of software development and AI while building practical skills through hands-on projects.</p>
              
              <div className="section-title">PROJECTS:</div>
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3>→ {project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    Technologies: {project.tech.join(', ')}
                  </div>
                  <div className="project-link">
                    <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="terminal-link">
                      {project.link}
                    </a>
                  </div>
                </div>
              ))}
              
              <div className="section-title">TECHNICAL STACK:</div>
              <p>Languages: Python, SQL, C++, Java, C, JavaScript, TypeScript</p>
              <p>Tools: Docker, Git, Jupyter Notebook, JetBrains Stack</p>
              <p>Databases: MySQL, MongoDB, Oracle, Weaviate, Azure MongoDB vCore</p>
              <p>Learning: Machine Learning, Data Science Libraries, Cloud Platforms</p>
              
              <div className="section-title">INTERESTS:</div>
              <p>Chess • Bouldering • Woodworking • Coding • Reading</p>
              
              <div className="section-title">CONTACT:</div>
              <p>
                <span>📧 Email: </span>
                <a href="mailto:szymon.florek@student.wat.edu.pl" className="terminal-link">szymon.florek@student.wat.edu.pl</a>
              </p>
              <p>
                <span>🌐 GitHub: </span>
                <a href="https://github.com/Floressek" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/Floressek</a>
              </p>
              <p>
                <span>💼 LinkedIn: </span>
                <a href="https://linkedin.com/in/szymon-florek-33a968296" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/szymon-florek-33a968296</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal; 