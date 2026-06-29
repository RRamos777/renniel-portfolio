import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const profile = {
  name: 'Renniel Ramos',
  initials: 'RR',
  photo: '/images/renniel-profile.png',
  title: 'Full Stack Developer',
  location: 'Angeles City, Philippines',
  email: 'renniel.ramos0701@gmail.com',
  github: 'https://github.com/RRamos777',
  linkedin: 'https://www.linkedin.com/in/renniel-ramos-78853123a/',
  availability: 'Full-time · Remote-ready · Flexible across EST / PST / GMT / AEST',
  oneLiner:
    'I build practical web platforms, APIs, automation tools, and integrations that turn manual workflows into reliable software.',
};

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

const capabilities = [
  'Web applications',
  'REST APIs',
  'SQL Server',
  'Automation',
  'RFID workflows',
  'Face recognition integration',
  'IIS deployment',
  'Production support',
];

const stats = [
  { value: '3+', label: 'years building production systems' },
  { value: '6+', label: 'major internal tools & platforms shipped' },
  { value: '.NET', label: 'C#, Blazor, APIs, SQL Server' },
];

const featuredWork = [
  {
    eyebrow: 'Enterprise platform',
    title: 'Insurance Management Modules',
    year: '2025 — Present',
    summary:
      'Maintains and develops production modules, backend APIs, database routines, and deployment workflows for live insurance management systems.',
    impact: ['Blazor + C# modules', 'SQL Server stored procedures', 'IIS / Azure deployment', 'Bug fixes and feature releases'],
    tags: ['Blazor', 'C#', '.NET', 'SQL Server', 'Azure DevOps'],
  },
  {
    eyebrow: 'Event operations',
    title: 'QR Event Registration & Claiming',
    year: '2024 — 2025',
    summary:
      'Built QR-based registration and claiming tools to support company events, reduce manual checking, and centralize attendee tracking.',
    impact: ['QR validation flow', 'Admin dashboards', 'Reporting views', 'Operational monitoring'],
    tags: ['C#', 'Angular', 'SQL Server', 'QR workflows'],
  },
  {
    eyebrow: 'Automation + hardware',
    title: 'Attendance Automation with Face Recognition',
    year: '2024 — 2025',
    summary:
      'Integrated Hikvision face recognition data into attendance workflows, helping teams move away from manual DTR processing.',
    impact: ['Device integration', 'Attendance logs', 'DTR automation', 'Database-backed reporting'],
    tags: ['Hikvision', 'Automation', 'SQL Server', '.NET'],
  },
  {
    eyebrow: 'Freelance system',
    title: 'RFID School DTR & Canteen Platform',
    year: '2024',
    summary:
      'Developed RFID-based in/out monitoring, notification workflows, payroll support, and centralized management tools for school operations.',
    impact: ['RFID monitoring', 'Notifications', 'Payroll computation', 'Spreadsheet replacement'],
    tags: ['RFID', 'C#', 'SQL Server', 'Automation'],
  },
];

const experience = [
  {
    period: 'Aug 2025 — Present',
    role: 'Full Stack Developer',
    company: 'Thurston Software Solutions, Inc',
    description:
      'Developing insurance management features, backend APIs, database optimizations, deployments, and long-term production improvements.',
  },
  {
    period: 'Oct 2024 — Aug 2025',
    role: 'Full Stack Developer & Database Administrator',
    company: 'La Rose Noire',
    description:
      'Built event, QR claiming, ticketing, production process, attendance automation, reporting, and database administration workflows.',
  },
  {
    period: '2024',
    role: 'Freelance Full Stack Developer',
    company: 'School DTR & Canteen System',
    description:
      'Delivered RFID monitoring, canteen-related tools, payroll automation, and centralized admin systems with ongoing support.',
  },
  {
    period: '2023 — 2024',
    role: 'Freelance Full Stack Developer',
    company: 'Law Firm DTR & Payroll System',
    description:
      'Created a custom attendance and payroll platform using C#, AngularJS, SQL Server, and IIS deployment.',
  },
];

const stackGroups = [
  {
    title: 'Frontend',
    description: 'Interfaces for internal teams, admins, operations, and users.',
    tools: ['Blazor', 'Angular', 'MVC', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    description: 'Business logic, APIs, integrations, and workflow automation.',
    tools: ['C#', '.NET Core 6/8', '.NET Framework', 'REST API', 'Entity Framework'],
  },
  {
    title: 'Database',
    description: 'Schema design, reporting, stored procedures, and optimization.',
    tools: ['SQL Server 2019/2022', 'Stored Procedures', 'Database Design', 'Query Optimization'],
  },
  {
    title: 'DevOps & Support',
    description: 'Deployments, version control, ticketing, and production maintenance.',
    tools: ['IIS', 'Azure', 'Azure DevOps', 'GitHub', 'Production Troubleshooting'],
  },
  {
    title: 'Integrations',
    description: 'Connecting hardware, systems, and data sources into reliable flows.',
    tools: ['RFID', 'Hikvision', 'Attendance Devices', 'System Integration'],
  },
];

const process = [
  {
    step: '01',
    title: 'Understand the workflow',
    text: 'Map the current manual process, users, data points, edge cases, and approval rules before writing code.',
  },
  {
    step: '02',
    title: 'Design the system path',
    text: 'Plan the database structure, UI flow, API boundaries, and reporting needs so the system stays maintainable.',
  },
  {
    step: '03',
    title: 'Build and validate',
    text: 'Develop incrementally, test business rules, optimize queries, and review with users before release.',
  },
  {
    step: '04',
    title: 'Deploy and support',
    text: 'Handle IIS or cloud deployment, production fixes, user feedback, and long-term improvements after launch.',
  },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [ids]);

  return active;
}

function Header() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Go to top">
        <span className="brand-mark">{profile.initials}</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <small>{profile.title}</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={`mailto:${profile.email}`}>
        Hire / Contact
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="kicker">Available for full-stack development roles</p>
          <h1>
            Software that feels practical, maintainable, and built for real operations.
          </h1>
          <p className="hero-lead">{profile.oneLiner}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              View selected work
            </a>
            <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <aside className="profile-card reveal delay-1" aria-label="Profile summary">
          <div className="profile-photo-wrap">
            <img className="profile-photo" src={profile.photo} alt="Black and white portrait of Renniel Ramos" />
          </div>
          <div className="profile-content">
            <p className="profile-name">{profile.name}</p>
            <p className="profile-title">{profile.title}</p>
            <div className="profile-meta">
              <span>{profile.location}</span>
              <span>{profile.availability}</span>
            </div>
            <div className="signal-list">
              <span>Clean code</span>
              <span>Database-first thinking</span>
              <span>Reliable deployment</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="capability-strip" aria-label="Core capabilities">
        {capabilities.map((capability) => (
          <span key={capability}>{capability}</span>
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, link }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-side">
        <p>{text}</p>
        {link ? (
          <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
            {link.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section className="section" id="work">
      <SectionHeading
        eyebrow="01 — Selected work"
        title="Projects that connect software, data, people, and devices."
        text="Not just business systems — the work spans web applications, APIs, QR/RFID workflows, hardware integrations, automation, database design, and production support."
        link={{ label: 'Open GitHub ↗', href: profile.github, external: true }}
      />

      <div className="work-list">
        {featuredWork.map((project, index) => (
          <article className="work-card" key={project.title}>
            <div className="work-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="work-main">
              <div className="work-card-head">
                <p>{project.eyebrow}</p>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="work-summary">{project.summary}</p>
              <div className="impact-grid">
                {project.impact.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="tag-column">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeading
        eyebrow="02 — Experience"
        title="Hands-on across development, database work, and release support."
        text="A timeline focused on what was built, maintained, integrated, optimized, and deployed."
      />
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={`${item.company}-${item.period}`}>
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="section" id="stack">
      <SectionHeading
        eyebrow="03 — Stack"
        title="A practical stack for web apps, APIs, integrations, and data-heavy workflows."
        text="Focused on technologies Renniel has used in real projects and production environments."
      />
      <div className="stack-grid">
        {stackGroups.map((group) => (
          <article className="stack-card" key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="tool-list">
              {group.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <SectionHeading
        eyebrow="04 — Process"
        title="How I usually turn a workflow into software."
        text="The goal is not just to ship screens — it is to make daily operations easier, traceable, and supportable."
      />
      <div className="process-grid">
        {process.map((item) => (
          <article className="process-card" key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="section-eyebrow">05 — Contact</p>
        <h2>Need a developer who can build, connect, deploy, and support the system?</h2>
      </div>
      <div className="contact-actions">
        <a className="button primary" href={`mailto:${profile.email}`}>
          Email Renniel
        </a>
        <a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
      <p className="contact-note">
        {profile.email} · {profile.location}
      </p>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Process />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Renniel Ramos</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
