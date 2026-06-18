import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './App.css'
import PythonPlayground from './PythonPlayground'

const emailAddress = 'z2396491383@gmail.com'
const emailSubject = 'Portfolio Contact'
const emailBody = 'Hi Wentao,%0D%0A%0D%0AI found your portfolio and wanted to contact you.'

const emailHref = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`

const skills = [
  {
    title: 'Frontend Craft',
    text: 'Responsive interfaces, polished details, and component-driven React experiences.',
  },
  {
    title: 'Problem Solving',
    text: 'Clear thinking, practical tradeoffs, and steady progress from idea to implementation.',
  },
  {
    title: 'User Focus',
    text: 'Simple flows, accessible structure, and products that feel calm to use.',
  },
]

const projects = [
  {
    title: 'Portfolio System',
    tag: 'Design + React',
    text: 'A refined personal homepage focused on clarity, structure, and lightweight performance.',
  },
  {
    title: 'Product Dashboard',
    tag: 'UI Architecture',
    text: 'A clean dashboard concept with organized metrics, quick actions, and responsive layouts.',
  },
  {
    title: 'Learning Lab',
    tag: 'Experimentation',
    text: 'Small technical experiments used to explore new patterns, tools, and interaction ideas.',
  },
]

function AbstractIllustration() {
  return (
    <div className="illustration" aria-hidden="true">
      <div className="node node-one"></div>
      <div className="node node-two"></div>
      <div className="node node-three"></div>
      <div className="node node-four"></div>
      <div className="line line-one"></div>
      <div className="line line-two"></div>
      <div className="line line-three"></div>
      <div className="code-window">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="signal-card">
        <strong>Build</strong>
        <small>Think, refine, ship.</small>
      </div>
    </div>
  )
}

function SiteHeader({ currentView, onNavigateHome, onNavigateSection, onNavigatePlayground }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={onNavigateHome} aria-label="Home">
        <span className="brand-mark">P</span>
        <span>Portfolio</span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        <button type="button" onClick={() => onNavigateSection('skills')}>
          Skills
        </button>
        <button type="button" onClick={() => onNavigateSection('projects')}>
          Projects
        </button>
        <button type="button" onClick={() => onNavigateSection('contact')}>
          Contact
        </button>
        <button
          className={currentView === 'playground' ? 'active' : ''}
          type="button"
          onClick={onNavigatePlayground}
        >
          Playground
        </button>
      </nav>
    </header>
  )
}

function PortfolioHome() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Personal Portfolio</p>
          <h1>Thoughtful digital work with a clean, modern edge.</h1>
          <p className="hero-text">
            I build focused web experiences that balance technical quality,
            useful design, and a calm sense of organization.
          </p>
          <div className="hero-actions" aria-label="Primary links">
            <a className="button primary" href="#projects">
              View Projects
            </a>
            <a className="button secondary" href={emailHref}>
              Get in Touch
            </a>
          </div>
        </div>
        <AbstractIllustration />
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title">A practical mix of design sense and technical execution.</h2>
        </div>
        <div className="card-grid">
          {skills.map((skill) => (
            <article className="info-card" key={skill.title}>
              <div className="card-icon"></div>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">Selected work shaped around clarity and momentum.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <a href="#contact">Discuss this style</a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Open to thoughtful projects and useful conversations.</h2>
        </div>
        <div className="contact-links" aria-label="Social links">
          <a href={emailHref} target="_blank" rel="noreferrer">
            <MdEmail aria-hidden="true" />
            Email
          </a>
          <a href="https://github.com/Wentao-7114" target="_blank" rel="noreferrer">
            <FaGithub aria-hidden="true" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/wentao-zhang-" target="_blank" rel="noreferrer">
            <FaLinkedin aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <span>Designed with clarity and care.</span>
        <a href="#home">Back to top</a>
      </footer>
    </>
  )
}

function App() {
  const getViewFromPath = () => (window.location.pathname === '/playground' ? 'playground' : 'home')
  const [view, setView] = useState(getViewFromPath)

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromPath())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateHome = () => {
    setView('home')
    window.history.pushState({}, '', '/')
    window.setTimeout(() => {
      window.location.hash = 'home'
    }, 0)
  }

  const navigateSection = (sectionId) => {
    setView('home')
    window.history.pushState({}, '', `/#${sectionId}`)
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const navigatePlayground = () => {
    setView('playground')
    window.history.pushState({}, '', '/playground')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="site-shell">
      <SiteHeader
        currentView={view}
        onNavigateHome={navigateHome}
        onNavigateSection={navigateSection}
        onNavigatePlayground={navigatePlayground}
      />
      {view === 'playground' ? <PythonPlayground /> : <PortfolioHome />}
    </main>
  )
}

export default App
