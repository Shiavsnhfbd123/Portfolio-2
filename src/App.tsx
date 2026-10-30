import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEventHandler,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PhotoCard3D from "./PhotoCard3D";
import EmailContactDialog from "./EmailContactDialog";
import { Icon, type IconName } from "./Icon";
import {
  profile,
  education,
  learning,
  interests,
  skills,
  featured,
  featuredPoints,
  pipeline,
  projects,
  certs,
  stats,
  type Project,
} from "./data";

const sections = [
  "about",
  "education",
  "skills",
  "projects",
  "certifications",
  "connect",
] as const;
const resume = `${import.meta.env.BASE_URL}Shivansh_Aggarwal_Resume.pdf`;
function useActive() {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const position = window.scrollY + Math.min(window.innerHeight * 0.3, 200);
      let current = "";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= position) current = id;
      });
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        current = "connect";
      setActive(current);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${total > 0 ? window.scrollY / total : 0}`,
      );
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
const Tag = ({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) => <span className={`tag${accent ? " tag-accent" : ""}`}>{children}</span>;

function Btn({
  href,
  children,
  primary = false,
  icon = "arrow",
  download,
  newTab = false,
  onClick,
  opensDialog = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  icon?: IconName;
  download?: string;
  newTab?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  opensDialog?: boolean;
}) {
  const external = href.startsWith("http") || newTab;
  return (
    <a
      href={href}
      className={`button${primary ? " button-primary" : ""}`}
      target={external && !download ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      onClick={onClick}
      aria-haspopup={opensDialog ? "dialog" : undefined}
    >
      <Icon name={icon} />
      <span>{children}</span>
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
function ResumeActions() {
  return (
    <div className="resume-actions">
      <Btn
        href={resume}
        primary
        icon="download"
        download="Shivansh_Aggarwal_Resume.pdf"
      >
        Download Resume
      </Btn>
      <Btn href={resume} icon="file" newTab>
        View Resume
      </Btn>
    </div>
  );
}
function Section({
  id,
  number,
  title,
  caption,
  children,
}: {
  id: string;
  number: string;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="content-section"
    >
      <div className="section-heading">
        <span className="eyebrow">
          <span className="section-number">{number}</span> / {caption}
        </span>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  const toggle = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);
  const changeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#101511" : "#f7f7ef");
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Storage is optional. */
    }
  };
  return (
    <header className="site-header">
      <div className="reading-progress" aria-hidden="true" />
      <nav className="header-inner" aria-label="Primary">
        <a
          className="brand"
          href="#top"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name} — back to top`}
        >
          <span className="monogram" aria-hidden="true">
            SA
          </span>
          <span className="brand-name">
            {profile.name.toUpperCase()}
            <span>DEVELOPER AND CURIOUS BUILDER</span>
          </span>
        </a>
        <ul className="desktop-links">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                aria-current={active === s ? "location" : undefined}
              >
                {s === "connect" ? "Contact" : s}
              </a>
            </li>
          ))}
        </ul>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={changeTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="header-resume"
          >
            Resume <Icon name="arrow" size={15} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
          >
            <ul>
              {sections.map((s, i) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    aria-current={active === s ? "location" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="eyebrow">0{i + 1}</span>
                    {s === "connect" ? "Contact" : s}
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 0.06} className="project-reveal">
      <article className="project-card">
        <div
          className={`project-visual project-visual-${i}`}
          aria-hidden="true"
        >
          <span className="visual-index">0{i + 2} / PROJECT</span>
          {i < 2 ? (
            <div className="mini-library">
              <div className="mini-sidebar">
                <Icon name="database" size={23} />
                <span />
                <span />
                <span />
              </div>
              <div className="mini-content">
                <div className="mini-title">
                  {i === 0 ? "Library / AutoFill" : "Library / Dashboard"}
                </div>
                <div className="mini-books">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="mini-lines">
                  <span />
                  <span />
                  <span />
                </div>
                {i === 0 && (
                  <span className="autofill">
                    <Icon name="spark" size={12} /> One-click AutoFill
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="mini-portfolio">
              <span>
                Shivansh Aggarwal<span>.</span>
              </span>
              <p>
                Building ideas into
                <br />
                <em>working applications.</em>
              </p>
              <div />
              <div />
            </div>
          )}
          <span className="visual-note">Interface illustration</span>
        </div>
        <div className="project-body">
          <div className="project-status">
            {p.status.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <h3>{p.name}</h3>
          <p className="description">{p.desc}</p>
          <div className="project-tech">
            {p.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="project-links">
            {p.github && (
              <Btn href={p.github} icon="github">
                Source code
              </Btn>
            )}
            {p.demo && <Btn href={p.demo}>Live demo</Btn>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function App() {
  const active = useActive();
  const emailDialogRef = useRef<HTMLDialogElement>(null);
  const openEmail: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const dialog = emailDialogRef.current;
    if (dialog) {
      event.preventDefault();
      if (!dialog.open) dialog.showModal();
    }
  };
  const links: { name: string; href: string; label: string; icon: IconName }[] =
    [
      {
        name: "GitHub",
        href: profile.github,
        label: `github.com/${profile.githubHandle}`,
        icon: "github",
      },
      {
        name: "LinkedIn",
        href: profile.linkedin,
        label: "linkedin.com/in/shivanshhr123",
        icon: "linkedin",
      },
      {
        name: "Email",
        href: `mailto:${profile.email}`,
        label: profile.email,
        icon: "mail",
      },
    ];
  const skillIcons: IconName[] = [
    "code",
    "terminal",
    "database",
    "spark",
    "code",
  ];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header active={active} />
      <main id="main" className="page-shell">
        <section id="top" className="hero">
          <div className="hero-copy">
            <div className="hero-intro">
              <span className="status-dot" /> FULL-STACK DEVELOPMENT · AI ·
              CYBERSECURITY
            </div>
            <p className="hello">Hello, I’m</p>
            <h1>
              {profile.name.split(" ")[0]}
              <br />
              <em>
                {profile.name.split(" ").slice(1).join(" ")}
                <span>.</span>
              </em>
            </h1>
            <div className="hero-role">
              <span />
              {profile.title}
            </div>
            <p className="hero-description">{profile.tagline}</p>
            <div className="hero-project-link">
              <a href="#projects">
                Explore my work <Icon name="arrow" size={19} />
              </a>
              <span>Ideas. Code. Working applications.</span>
            </div>
            <ResumeActions />
            <div className="hero-socials">
              <span>FIND ME ON</span>
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  aria-label={l.name}
                  onClick={l.name === "Email" ? openEmail : undefined}
                  aria-haspopup={l.name === "Email" ? "dialog" : undefined}
                  target={l.name === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <Icon name={l.icon} />
                </a>
              ))}
              <span className="social-divider" />
              <span className="hero-location">
                <Icon name="pin" size={14} /> Faridabad, India
              </span>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-label">
              <span className="eyebrow">THE PERSON BEHIND THE CODE</span>
              <Icon name="spark" />
            </div>
            <PhotoCard3D />
            <div className="portrait-caption">
              <span>
                <span className="status-dot" /> Learning. Building. Evolving.
              </span>
              <span className="eyebrow">01 / INTRO</span>
            </div>
          </div>
          <div className="hero-bottom">
            <div>
              <span className="eyebrow">CURRENTLY STUDYING AT</span>
              <p>
                IIT Patna <span>&</span> SVSU
              </p>
            </div>
            <p>
              B.S. AI & Cyber Security
              <br />
              B.Tech Computer Engineering
            </p>
            <a href="#about" className="scroll-cue">
              A little more about me <span>↓</span>
            </a>
          </div>
        </section>

        <Section
          id="about"
          number="01"
          caption="A LITTLE CONTEXT"
          title="Curiosity meets creation."
        >
          <Reveal>
            <p className="about-lead">{profile.summary}</p>
            <div className="about-details">
              <div>
                <h3 className="eyebrow">CURRENTLY LEARNING</h3>
                <div className="tags">
                  {learning.map((l) => (
                    <Tag accent key={l}>
                      {l}
                    </Tag>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="eyebrow">WHAT I’M DRAWN TO</h3>
                <div className="tags">
                  {interests.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
              </div>
            </div>
            <blockquote>
              <Icon name="spark" size={25} />
              <div>
                <span className="eyebrow">THE GOAL</span>
                <p>{profile.goal}</p>
              </div>
            </blockquote>
            <div className="about-footer">
              <p>Off screen: {profile.hobby.toLowerCase()}.</p>
              <span className="location">
                <Icon name="pin" size={14} />
                {profile.location}
              </span>
            </div>
            <div className="about-resume">
              <div>
                <h3>Get the full picture.</h3>
                <p>My background, skills, and experience in one PDF.</p>
              </div>
              <ResumeActions />
            </div>
          </Reveal>
        </Section>

        <Section
          id="education"
          number="02"
          caption="THE FOUNDATION"
          title="Always a student."
        >
          <ol className="education-list">
            {education.map((e, i) => (
              <li key={e.school}>
                <Reveal delay={i * 0.08}>
                  <div className="education-top">
                    <span className="school-mark" aria-hidden="true">
                      {i === 0 ? "IIT" : "SVSU"}
                    </span>
                    <span className="tag">{e.mode}</span>
                  </div>
                  <h3>{e.school}</h3>
                  <p className="degree">{e.degree}</p>
                  <div className="education-meta">
                    <span>{e.progress}</span>
                    <span>Expected {e.grad}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="skills"
          number="03"
          caption="MY TOOLKIT"
          title="The tools behind the ideas."
        >
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.04}>
                <div className="skill-group">
                  <div className="skill-title">
                    <span className="skill-icon">
                      <Icon name={skillIcons[i]} size={21} />
                    </span>
                    <h3>{group}</h3>
                    <span className="skill-count">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="tags">
                    {items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <section
          id="projects"
          aria-labelledby="projects-title"
          className="projects-section"
        >
          <div className="wide-section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-number">04</span> / SELECTED WORK
              </span>
              <h2 id="projects-title">
                Ideas, put into practice<span>.</span>
              </h2>
            </div>
            <p>
              A selection of things I’ve built.
              <br />
              From full-stack systems to AI exploration.
            </p>
          </div>
          <Reveal>
            <article className="featured-project">
              <div className="featured-copy">
                <span className="eyebrow featured-label">
                  <span className="status-dot" /> FEATURED / IN DEVELOPMENT
                </span>
                <h3>
                  {featured.name.split(":")[0]}
                  <span>
                    {featured.name.split(":").slice(1).join(":").trim()}
                  </span>
                </h3>
                <div className="tags">
                  {featured.status.map((s, i) => (
                    <Tag key={s} accent={i === 0}>
                      {s}
                    </Tag>
                  ))}
                </div>
                <p className="description">{featured.desc}</p>
                <ul className="feature-points">
                  {featuredPoints.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="project-tech">
                  {featured.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="pipeline-panel">
                <div className="panel-bar">
                  <span className="window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>querypilot / request-flow</span>
                  <Icon name="terminal" size={15} />
                </div>
                <div className="pipeline-content">
                  <h4>From a question to a query.</h4>
                  <p>A look at how a request is handled.</p>
                  <ol>
                    {pipeline.map((p, i) => (
                      <li
                        key={p.step}
                        className={p.backend ? "backend-step" : ""}
                      >
                        <span className="step-marker">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h5>{p.step}</h5>
                          <p>{p.note}</p>
                        </div>
                        {p.backend && <Icon name="check" size={14} />}
                      </li>
                    ))}
                  </ol>
                  <div className="pipeline-legend">
                    <span>
                      <i />
                      AI suggests
                    </span>
                    <span>
                      <i />
                      Backend enforces
                    </span>
                  </div>
                  <p className="project-availability">
                    Repository and demo are not published yet.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </section>

        <Section
          id="certifications"
          number="05"
          caption="MILESTONES"
          title="Learning in action."
        >
          <ul className="certifications-list">
            {certs.map((c, i) => (
              <li key={c.name}>
                <Reveal delay={i * 0.05}>
                  <span className="certificate-index">0{i + 1}</span>
                  <div>
                    <h3>{c.name}</h3>
                    <p>
                      {c.by} <span>·</span> {c.date}
                    </p>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="credential-link"
                    aria-label={`View ${c.name} credential (opens in a new tab)`}
                  >
                    <span>View credential</span>
                    <Icon name="arrow" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="github-heading">
            <h3>
              <Icon name="github" size={21} /> On GitHub
            </h3>
            <span>Manually maintained snapshot</span>
          </div>
          <dl className="github-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  {s.n}
                  <span>↗</span>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <section
          id="connect"
          aria-labelledby="connect-title"
          className="contact-section"
        >
          <Reveal>
            <div className="contact-intro">
              <span className="eyebrow">
                <span className="section-number">06</span> / START A
                CONVERSATION
              </span>
              <Icon name="spark" size={32} />
            </div>
            <div className="contact-heading">
              <h2 id="connect-title">
                Let’s build
                <br />
                something <em>useful.</em>
              </h2>
              <div>
                <p>
                  Useful and innovative applications start with a conversation.
                </p>
                <Btn
                  href={`mailto:${profile.email}`}
                  primary
                  icon="mail"
                  onClick={openEmail}
                  opensDialog
                >
                  Say hello
                </Btn>
              </div>
            </div>
            <ul className="contact-links">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    onClick={l.name === "Email" ? openEmail : undefined}
                    aria-haspopup={l.name === "Email" ? "dialog" : undefined}
                    target={l.name === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <span className="contact-link-title">
                      <Icon name={l.icon} size={21} />
                      {l.name}
                    </span>
                    <span className="contact-address">{l.label}</span>
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>
      <EmailContactDialog dialogRef={emailDialogRef} />
      <footer className="site-footer">
        <div className="page-shell">
          <a className="footer-brand" href="#top">
            {profile.name}
            <span>.</span>
          </a>
          <p>
            © {new Date().getFullYear()} · {profile.location}
          </p>
          <a href="#top">
            Back to top <Icon name="up" size={15} />
          </a>
        </div>
      </footer>
      <a
        href="#top"
        className={`back-to-top${active ? " visible" : ""}`}
        aria-label="Back to top"
        tabIndex={active ? 0 : -1}
      >
        <Icon name="up" />
      </a>
    </>
  );
}
