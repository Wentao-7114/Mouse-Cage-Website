import './Project.css'

const projects = [
  {
    title: 'AnyParser',
    tag: 'React, TypeScript, Git',
    date: 'Oct 2024 - Nov 2024',
    bullets: [
      'Led front-end development of a multi-page React and TypeScript UI.',
      'Built a modular component system to improve reuse and maintainability.',
      'Integrated Auth0 authentication, protected routes, and role-gated pages.',
      'Delivered responsive layouts and interaction patterns across desktop and mobile.',
    ],
  },
  {
    title: 'IMDb Anime Platform',
    tag: 'React, Node.js, MS SQL Server, GCP, Git',
    date: 'Sep 2023 - Dec 2023',
    bullets: [
      'Built a Node.js/Express REST API backend for anime details and user features.',
      'Designed a normalized SQL Server schema on Google Cloud Platform.',
      'Implemented sign-up, login, session management, reviews, and favorites.',
      'Modeled Favorites with constraints and indexes for fast, idempotent add/remove behavior.',
    ],
  },
]

function Project() {
  return (
    <section className="project-view" aria-labelledby="project-title">
      <div className="project-heading">
        <p className="eyebrow">Projects</p>
        <h1 id="project-title">Selected projects in product UI, authentication, APIs, and relational data modeling.</h1>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <span>{project.tag}</span>
            <h3>{project.title}</h3>
            <small>{project.date}</small>
            <ul>
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Project
