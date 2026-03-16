import React from 'react';
import projects from '../../data/projects';
import skills from '../../data/skills';
import './Portfolio.css';

export default function Portfolio({ onBack }) {
  return (
    <div id="portfolio-content">
      <div className="portfolio-back-button" onClick={onBack}>
        <span className="back-icon">{'\u2B05'}</span> Return to Terminal
      </div>

      <div className="portfolio-header">
        <div className="portfolio-avatar">
          <div className="avatar-placeholder">SF</div>
        </div>
        <div className="portfolio-intro">
          <div className="portfolio-name">SZYMON FLOREK</div>
          <div className="portfolio-title">MSc Quantum Computing &bull; Software Developer @ ardium-pl</div>
          <div className="portfolio-tagline">BSc with Honors (5.0) &bull; Warsaw, Poland &bull; <a href="https://floressek.com" target="_blank" rel="noopener noreferrer" className="portfolio-link-inline">floressek.com</a></div>
        </div>
      </div>

      <div className="portfolio-about">
        <SectionTitle icon={'\uD83D\uDC68\u200D\uD83D\uDCBB'} title="ABOUT ME" />
        <div className="about-content">
          <p>MSc student in Quantum Computing at WAT (Wojskowa Akademia Techniczna). Graduated BSc with honors (5.0) with a thesis on <strong>"Analysis of Possibilities for Improving RAG Chatbots"</strong>.</p>
          <p>Currently working as a software developer at <strong>ardium-pl</strong>, building full-stack applications, cloud infrastructure, and AI-powered solutions. 45 public repositories on GitHub and counting.</p>
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83C\uDFE2'} title="EXPERIENCE" />
        <div className="experience-item">
          <div className="experience-header">
            <h4>Software Developer</h4>
            <span className="experience-company">@ ardium-pl</span>
          </div>
          <p className="experience-location">Warsaw, Poland</p>
          <div className="experience-tags">
            {['Full-Stack', 'Cloud (GCP/Azure)', 'AI/ML', 'Terraform', 'Data Pipelines'].map((t, i) =>
              <span key={i} className="tech-tag">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83D\uDE80'} title="PROJECTS" />
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className={`project-card${project.featured ? ' featured' : ''}`}>
              {project.featured && <div className="featured-badge">BSc Thesis</div>}
              <div className="project-header">
                <h3>{project.name}</h3>
                <div className="project-icon">{project.name.charAt(0)}</div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
              </div>
              <div className="project-link">
                <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-footer">
          <a href="https://github.com/Floressek?tab=repositories" target="_blank" rel="noopener noreferrer" className="view-all-link">View all 45 repositories on GitHub &rarr;</a>
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83D\uDEE0\uFE0F'} title="TECHNICAL SKILLS" />
        <div className="skills-container">
          <SkillCategory icon={'\uD83D\uDCBB'} title="Programming Languages" items={skills.languages} />
          <SkillCategory icon={'\uD83D\uDD27'} title="Tools & Infrastructure" items={skills.tools} />
          <SkillCategory icon={'\uD83D\uDDC4\uFE0F'} title="Databases" items={skills.databases} />
          <SkillCategory icon={'\uD83E\uDD16'} title="AI & Data Science" items={skills.ai} />
        </div>
        <div className="learning-section">
          <h4><span className="category-icon">{'\uD83C\uDF31'}</span> Currently Exploring</h4>
          <div className="learning-tags">
            {['Quantum Computing', 'Quantum Algorithms', 'Advanced RAG', 'Cloud-Native (GCP)', 'NLP / LLMs'].map((t, i) =>
              <span key={i} className="learning-tag">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83C\uDF93'} title="EDUCATION" />
        <div className="education-item">
          <div className="education-icon">{'\uD83C\uDFEB'}</div>
          <div className="education-details">
            <h4>MSc Computer Science &mdash; Quantum Computing</h4>
            <p className="education-school">Wojskowa Akademia Techniczna (WAT)</p>
            <p className="education-year">1st year &bull; 2025&ndash;present</p>
            <p className="education-focus">Focus on Quantum Computing & Quantum Algorithms</p>
          </div>
        </div>
        <div className="education-item">
          <div className="education-icon">{'\uD83C\uDFC6'}</div>
          <div className="education-details">
            <h4>BSc Computer Science &mdash; <span className="honors-badge">Graduated with Honors (5.0)</span></h4>
            <p className="education-school">Wojskowa Akademia Techniczna (WAT)</p>
            <p className="education-year">2022&ndash;2025</p>
            <p className="education-focus">Thesis: "Analysis of Possibilities for Improving RAG Chatbots"</p>
            <p className="education-focus">Focus: Data Science, Machine Learning, AI</p>
          </div>
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83C\uDFAF'} title="INTERESTS" />
        <div className="interests-container">
          {[
            ['\u265F\uFE0F', 'Chess'],
            ['\uD83E\uDDD7', 'Bouldering'],
            ['\uD83E\uDE9A', 'Woodworking'],
            ['\uD83D\uDCBB', 'Coding'],
            ['\uD83D\uDCDA', 'Reading'],
          ].map(([icon, name], i) => (
            <div key={i} className="interest-item">
              <span className="interest-icon">{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="portfolio-section">
        <SectionTitle icon={'\uD83D\uDCEC'} title="CONTACT" />
        <div className="contact-container">
          <ContactItem icon={'\uD83D\uDCE7'} href="mailto:szymon.florek@student.wat.edu.pl" text="szymon.florek@student.wat.edu.pl" />
          <ContactItem icon={'\uD83C\uDF10'} href="https://floressek.com" text="floressek.com" />
          <ContactItem icon={'\uD83D\uDC19'} href="https://github.com/Floressek" text="github.com/Floressek" />
          <ContactItem icon={'\uD83D\uDCBC'} href="https://linkedin.com/in/szymon-florek-33a968296" text="linkedin.com/in/szymon-florek" />
          <ContactItem icon={'\uD83C\uDFE2'} href="https://github.com/ardium-pl" text="@ardium-pl" />
        </div>
      </div>

      <div className="portfolio-footer">
        <div className="footer-content">
          <p>Built with React. Type 'help' in the terminal to explore.</p>
        </div>
        <div className="footer-signature">
          <span className="terminal-prompt">szymon@portfolio:~$ </span>
          <span className="blink">_</span>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="section-title">
      <span className="section-icon">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function SkillCategory({ icon, title, items }) {
  return (
    <div className="skill-category">
      <h4><span className="category-icon">{icon}</span> {title}</h4>
      <div className="skills-grid">
        {items.map((skill, i) => (
          <div key={i} className="skill">
            <div className="skill-header">
              <span>{skill.name}</span>
              <span className="percentage">{skill.level}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactItem({ icon, href, text }) {
  return (
    <div className="contact-item">
      <span className="contact-icon">{icon}</span>
      <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
    </div>
  );
}
