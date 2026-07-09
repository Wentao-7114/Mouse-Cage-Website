import { useEffect, useState } from 'react'
import { fetchUserAttributes, signOut } from 'aws-amplify/auth'
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './App.css'
import Exp from './Exp'
import LoginPage from './LoginPage'
import PythonPlayground from './PythonPlayground'
import Project from './Project'
import Resources from './Resources'
import SignupPage from './SignupPage'
import dataIcon from './assets/data-icon.svg'
import programmingIcon from './assets/programming-icon.svg'
import riceLogo from './assets/Rice_Logo.png'
import toolsIcon from './assets/tools-icon.svg'
import uiucLogo from './assets/UIUC_Logo_1.png'

const emailAddress = 'wentao@mousecage.net'
const emailSubject = 'Portfolio Contact'
const emailBody = 'Hi Wentao,%0D%0A%0D%0AI found your portfolio and wanted to contact you.'

const emailHref = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`

const skills = [
  {
    title: 'Languages',
    text: 'Python, C/C++, T-SQL, VBA, MySQL, TypeScript, JavaScript, HTML/CSS, Java.',
    icon: programmingIcon,
  },
  {
    title: 'Frameworks & Data',
    text: 'React, Node.js/Express, MS SQL Server, SQL Server Integration Services.',
    icon: dataIcon,
  },
  {
    title: 'Developer Tools',
    text: 'Git, MS Excel, Visual Studio, Docker, Google Cloud Platform, VS Code, PyCharm, IntelliJ.',
    icon: toolsIcon,
  },
]

const education = [
  {
    school: 'Rice University',
    degree: 'Master of Computer Science',
    location: 'Houston, TX',
    date: 'Dec 2026',
    logo: riceLogo,
    logoAlt: 'Rice University logo',
    status: 'Current graduate study',
    theme: 'rice',
  },
  {
    school: 'University of Illinois Urbana-Champaign',
    degree: (
      <>
        Bachelor of Science in Computer Science (Honors),
        <br />
        Minor in Mathematics
      </>
    ),
    location: 'Champaign, IL',
    date: 'Dec 2024',
    logo: uiucLogo,
    logoAlt: 'University of Illinois Urbana-Champaign logo',
    status: 'Undergraduate foundation',
    theme: 'uiuc',
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

function SiteHeader({
  currentView,
  onNavigateHome,
  onNavigateContact,
  onNavigateExperience,
  onNavigatePlayground,
  onNavigateProject,
  onNavigateResources,
  onNavigateLogin,
  userEmail,
  onLogout,
}) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={onNavigateHome} aria-label="Home">
        <span className="brand-mark">WZ</span>
        <span>Wentao Zhang</span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        <button type="button" onClick={onNavigateHome}>
          Home
        </button>
         
        <button
          className={currentView === 'experience' ? 'active' : ''}
          type="button"
          onClick={onNavigateExperience}
        >
          Experience
        </button>
        <button
          className={currentView === 'project' ? 'active' : ''}
          type="button"
          onClick={onNavigateProject}
        >
          Projects
        </button>
        
        <button
          className={currentView === 'playground' ? 'active' : ''}
          type="button"
          onClick={onNavigatePlayground}
        >
          Playground
        </button>
        <button
          className={currentView === 'resources' ? 'active' : ''}
          type="button"
          onClick={onNavigateResources}
        >
          Resources
        </button>
        <button type="button" onClick={onNavigateContact}>
          Contact
        </button>
        <span className={`nav-user-email${userEmail ? '' : ' signed-out'}`}>
          {userEmail || 'Please log in first!'}
        </span>
        {userEmail ? (
          <button className="login-nav-button" type="button" onClick={onLogout}>
            Log out
          </button>
        ) : (
          <button
            className={`login-nav-button${currentView === 'login' ? ' active' : ''}`}
            type="button"
            onClick={onNavigateLogin}
          >
            Log in
          </button>
        )}
      </nav>
    </header>
  )
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="contact-eyebrow">Let's connect</p>
        <h2 id="contact-title">Let's build something impactful.</h2>
        <p className="contact-text">
          I'm open to software engineering and data engineering opportunities.
        </p>
         
      </div>
      <div className="contact-links" aria-label="Social links">
        <a href={emailHref} target="_blank" rel="noreferrer">
          <MdEmail aria-hidden="true" />
          <span>Email</span>
          <small aria-hidden="true">
            <FaArrowRight />
          </small>
        </a>
        <a href="https://github.com/Wentao-7114" target="_blank" rel="noreferrer">
          <FaGithub aria-hidden="true" />
          <span>GitHub</span>
          <small aria-hidden="true">
            <FaArrowRight />
          </small>
        </a>
        <a href="https://www.linkedin.com/in/wentao-zhang-" target="_blank" rel="noreferrer">
          <FaLinkedin aria-hidden="true" />
          <span>LinkedIn</span>
          <small aria-hidden="true">
            <FaArrowRight />
          </small>
        </a>
      </div>
    </section>
  )
}

function SiteFooter({ onBackToTop }) {
  return (
    <footer className="site-footer">
      <span>Designed with clarity and care.</span>
      <button type="button" onClick={onBackToTop}>
        Back to top
      </button>
    </footer>
  )
}

function PortfolioHome() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Wentao Zhang</p>
          <h1>Computer science graduate student building reliable data systems and web products.</h1>
          <p className="hero-text">
            I am a Master of Computer Science student at Rice University with hands-on
            experience in SQL Server, ETL pipelines, React applications, and C++ systems.
          </p>
           
        </div>
        <AbstractIllustration />
      </section>




      <section className="section" id="education" aria-labelledby="education-title">
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h2 id="education-title">
            Graduate CS student at Rice,  
          </h2>
          <h2 id="education-title">
             with an honors CS foundation from UIUC.
          </h2>
        </div>
        <div className="education-grid">
          {education.map((item) => (
            <article className={`education-card ${item.theme}`} key={item.school}>
              <div className="education-logo-row">
                <img src={item.logo} alt={item.logoAlt} />
              </div>
              <span className="education-date">{item.date}</span>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <div className="education-card-footer">
                <small>{item.location}</small>
                <strong>{item.status}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title">A practical stack across data engineering, software systems, and web development.</h2>
        </div>
        <div className="card-grid">
          {skills.map((skill) => (
            <article className="info-card" key={skill.title}>
              <div className="card-icon" aria-hidden="true">
                <img src={skill.icon} alt="" />
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </article>
          ))}
        </div>
      </section>

      
    </>
  )
}

function App() {
  const getViewFromPath = () => {
    if (window.location.pathname === '/experience') return 'experience'
    if (window.location.pathname === '/playground') return 'playground'
    if (window.location.pathname === '/project') return 'project'
    if (window.location.pathname === '/resources') return 'resources'
    if (window.location.pathname === '/login') return 'login'
    if (window.location.pathname === '/signup') return 'signup'
    return 'home'
  }
  const [view, setView] = useState(getViewFromPath)
  const [signupDetails, setSignupDetails] = useState(() => window.history.state || {})
  const [userEmail, setUserEmail] = useState('')
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [loginNotice, setLoginNotice] = useState('')

  useEffect(() => {
    const restoreSession = async () => {
      let restoredEmail = ''

      try {
        const attributes = await fetchUserAttributes()
        restoredEmail = attributes.email || ''
        setUserEmail(restoredEmail)
      } catch {
        setUserEmail('')
      } finally {
        setIsAuthReady(true)

        if (!restoredEmail && window.location.pathname === '/resources') {
          setLoginNotice('Please log in first to access Resources.')
          setView('login')
          window.history.replaceState({}, '', '/login')
        }
      }
    }

    restoreSession()
  }, [])

  useEffect(() => {
    const handlePopState = (event) => {
      setView(getViewFromPath())
      setSignupDetails(event.state || {})
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  const navigateContact = () => {
    window.history.pushState({}, '', `${window.location.pathname}#contact`)
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const navigateTop = () => {
    window.history.replaceState({}, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigatePlayground = () => {
    setView('playground')
    window.history.pushState({}, '', '/playground')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateExperience = () => {
    setView('experience')
    window.history.pushState({}, '', '/experience')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateProject = () => {
    setView('project')
    window.history.pushState({}, '', '/project')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateResources = () => {
    if (!userEmail) {
      setLoginNotice('Please log in first to access Resources.')
      setView('login')
      window.history.pushState({}, '', '/login')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setView('resources')
    window.history.pushState({}, '', '/resources')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateLogin = () => {
    setLoginNotice('')
    setView('login')
    window.history.pushState({}, '', '/login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateSignup = (details = {}) => {
    setSignupDetails(details)
    setView('signup')
    window.history.pushState(details, '', '/signup')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginSuccess = (email) => {
    setLoginNotice('')
    setUserEmail(email)
    setView('home')
    window.history.replaceState({}, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } finally {
      setUserEmail('')
      setView('home')
      window.history.pushState({}, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderView = () => {
    if (view === 'experience') return <Exp />
    if (view === 'project') return <Project />
    if (view === 'playground') return <PythonPlayground />
    if (view === 'resources') {
      if (!isAuthReady || !userEmail) return null
      return <Resources />
    }
    if (view === 'login') {
      return (
        <LoginPage
          key="login"
          initialMessage={loginNotice}
          onLogin={handleLoginSuccess}
          onNavigateSignup={navigateSignup}
        />
      )
    }
    if (view === 'signup') {
      return (
        <SignupPage
          key="signup"
          initialEmail={signupDetails.email}
          startInConfirmation={signupDetails.confirmationRequired}
          onNavigateLogin={navigateLogin}
        />
      )
    }
    return <PortfolioHome />
  }

  return (
    <main className="site-shell" id="top">
      <SiteHeader
        currentView={view}
        onNavigateHome={navigateHome}
        onNavigateContact={navigateContact}
        onNavigateExperience={navigateExperience}
        onNavigatePlayground={navigatePlayground}
        onNavigateProject={navigateProject}
        onNavigateResources={navigateResources}
        onNavigateLogin={navigateLogin}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      {renderView()}
      <ContactSection />
      <SiteFooter onBackToTop={navigateTop} />
    </main>
  )
}

export default App
