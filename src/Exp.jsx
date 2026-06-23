import './Exp.css'

const experience = [
  {
    role: 'Data Engineer (SQL Server & ETL)',
    organization: 'G128 LLC (E-commerce)',
    location: 'Willowbrook, IL',
    date: 'Jan 2025 - Aug 2025',
    bullets: [
      'Standardized the Accounting ETL pipeline to produce QuickBooks-ready postings across 11 marketplaces.',
      'Built Amazon FBA and Walmart WFS data ingestion and replenishment pipelines using T-SQL, SSIS, and C#.',
      'Enhanced automated inventory forecasting with 3-11 months of sales and inventory data to produce 1-6 month restocking recommendations.',
      'Delivered channel-agnostic profitability reporting for consistent SKU-level margin analysis.',
      'Partnered with sales, accounting, and customer service teams to translate workflows into scalable ETL solutions and clear reporting.',
    ],
  },
  {
    role: 'Data Engineer Intern',
    organization: 'G128 LLC (E-commerce)',
    location: 'Willowbrook, IL',
    date: 'May 2023 - Dec 2023',
    bullets: [
      'Launched the first company-wide SQL Server database to replace Excel workflows for sales data and product catalog management.',
      'Built accounting ETL workflows with validation checks that reduced processing time 92%, from about 2 hours to about 10 minutes.',
      'Designed schemas and implemented T-SQL stored procedures to support core data operations.',
      'Migrated legacy data and automated recurring loads using SSIS pipelines and repeatable ETL jobs.',
    ],
  },
   
]

function Exp() {
  return (
    <section className="experience-view" aria-labelledby="experience-title">
      <div className="experience-heading">
        <p className="eyebrow">Experience</p>
        <h1 id="experience-title">Production-minded engineering across ETL, reporting, and systems reliability.</h1>
      </div>
      <div className="timeline-list">
        {experience.map((item) => (
          <article className="timeline-item" key={`${item.role}-${item.organization}`}>
            <div className="timeline-meta">
              <span>{item.date}</span>
              <small>{item.location}</small>
            </div>
            <div className="timeline-content">
              <h3>{item.role}</h3>
              <p>{item.organization}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Exp
