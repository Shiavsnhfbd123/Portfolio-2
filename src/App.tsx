import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PhotoCard3D from './PhotoCard3D'
import {
  profile, education, learning, interests, skills, featured, featuredPoints,
  pipeline, projects, certs, stats, type Project,
} from './data'

const sections = ['about', 'education', 'skills', 'projects', 'certifications', 'connect'] as const

function useActive(ids: readonly string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

const Tag = ({ children, accent = false }: { children: ReactNode; accent?: boolean }) => (
  <span className={`rounded-md border px-2.5 py-1 text-[13px] leading-5 ${accent ? 'border-accent/40 bg-accent/10 text-accent' : 'border-line bg-raised text-fg/90'}`}>
    {children}
  </span>
)

const Btn = ({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) => {
  const ext = href.startsWith('http')
  return (
    <a
      href={href}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noreferrer' : undefined}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition duration-150 active:translate-y-px ${
        primary
          ? 'border-accent bg-accent text-accent-ink hover:border-accent-hover hover:bg-accent-hover'
          : 'border-line text-fg hover:border-accent/60 hover:text-accent'
      }`}
    >
      {children}
      {ext && <span aria-hidden>↗</span>}
    </a>
  )
}

const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-16 border-t border-line py-14 md:py-20">
    <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
      <h2 className="font-serif text-2xl font-semibold md:sticky md:top-24 md:self-start md:text-3xl">{title}</h2>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
)

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 font-mono text-[13px] text-muted">{children}</p>
)

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-serif text-lg font-semibold">Shivansh Aggarwal</a>
        <ul className="hidden gap-7 text-sm md:flex">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                aria-current={active === s ? 'true' : undefined}
                className={`relative py-1 capitalize transition-colors ${
                  active === s ? 'text-fg after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line px-5 md:hidden"
          >
            {sections.map((s) => (
              <li key={s} className="border-b border-line last:border-0">
                <a href={`#${s}`} onClick={() => setOpen(false)} className="block py-3 capitalize text-fg">{s}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 0.06} className="h-full">
      <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.9)]">
        <h3 className="text-xl font-semibold leading-snug">{p.name}</h3>
        <div className="mt-3 flex flex-wrap gap-2">{p.status.map((s) => <Tag key={s}>{s}</Tag>)}</div>
        <p className="mt-4 text-[15px] text-muted">{p.desc}</p>
        <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-muted/90">{p.tech.join(' / ')}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {p.github && <Btn href={p.github}>GitHub</Btn>}
          {p.demo && <Btn href={p.demo} primary>Live demo</Btn>}
        </div>
      </article>
    </Reveal>
  )
}

export default function App() {
  const active = useActive(sections)
  const links: [string, string, string][] = [
    ['GitHub', profile.github, `github.com/${profile.githubHandle}`],
    ['LinkedIn', profile.linkedin, 'linkedin.com/in/shivanshhr123'],
    ['Email', `mailto:${profile.email}`, profile.email],
  ]
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <Header active={active} />

      <main id="main" className="mx-auto max-w-6xl px-5">
        <section id="top" className="grid items-center gap-12 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-mono text-sm text-muted">Hello, I'm</p>
            <h1 className="mt-3 text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">{profile.name}</h1>
            <p className="mt-4 text-xl font-medium text-accent">{profile.title}</p>
            <p className="mt-5 max-w-lg text-lg text-muted">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="#projects" primary>View projects</Btn>
              <Btn href={profile.github}>GitHub</Btn>
              <Btn href={profile.linkedin}>LinkedIn</Btn>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {[profile.location, 'IIT Patna: B.S. AI and Cyber Security', 'SVSU: B.Tech Computer Engineering'].map((t) => (
                <li key={t} className="flex items-center gap-2"><span aria-hidden className="size-1 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <PhotoCard3D />
          </motion.div>
        </section>

        <Section id="about" title="About">
          <Reveal>
            <p className="max-w-2xl text-xl leading-relaxed text-fg/90">{profile.summary}</p>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div><dt className="mb-3 font-mono text-[13px] text-muted">Currently learning</dt><dd className="flex flex-wrap gap-2">{learning.map((l) => <Tag key={l}>{l}</Tag>)}</dd></div>
              <div><dt className="mb-3 font-mono text-[13px] text-muted">Interests</dt><dd className="flex flex-wrap gap-2">{interests.map((i) => <Tag key={i}>{i}</Tag>)}</dd></div>
            </dl>
            <blockquote className="mt-10 border-l-2 border-accent pl-5">
              <Label>Goal</Label>
              <p className="font-serif text-xl italic leading-snug sm:text-2xl">{profile.goal}</p>
            </blockquote>
            <p className="mt-6 text-muted">Off screen: {profile.hobby.toLowerCase()}.</p>
          </Reveal>
        </Section>

        <Section id="education" title="Education">
          <ol className="divide-y divide-line border-y border-line">
            {education.map((e, i) => (
              <li key={e.school}>
                <Reveal delay={i * 0.06} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="text-xl font-semibold">{e.school}</h3>
                    <p className="mt-1 text-muted">{e.mode} {e.degree}</p>
                  </div>
                  <p className="font-mono text-sm text-muted sm:text-right">{e.progress}<br />Expected {e.grad}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skills" title="Tech stack">
          <Reveal>
            <dl className="divide-y divide-line border-y border-line">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]">
                  <dt className="pt-1 font-mono text-[13px] text-muted">{group}</dt>
                  <dd className="flex flex-wrap gap-2">{items.map((s) => <Tag key={s}>{s}</Tag>)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        <Section id="projects" title="Projects">
          <Reveal>
            <article className="rounded-lg border border-line border-t-2 border-t-accent bg-surface p-6 sm:p-8">
              <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
                <div>
                  <p className="font-mono text-[13px] text-accent">Featured project</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">{featured.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">{featured.status.map((s, i) => <Tag key={s} accent={i === 0}>{s}</Tag>)}</div>
                  <p className="mt-5 text-lg text-muted">{featured.desc}</p>
                  <ul className="mt-5 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">{featuredPoints.map((f) => <li key={f}>{f}</li>)}</ul>
                  <p className="mt-6 font-mono text-[12.5px] leading-relaxed text-muted/90">{featured.tech.join(' / ')}</p>
                </div>
                <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <h4 className="text-lg font-semibold">How a request is handled</h4>
                  <ol className="relative mt-5 ml-2 space-y-5 border-l border-line">
                    {pipeline.map((p) => (
                      <li key={p.step} className="relative pl-6">
                        <span aria-hidden className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 ${p.backend ? 'border-accent bg-accent' : 'border-muted bg-surface'}`} />
                        <p className="font-medium">{p.step}</p>
                        <p className="text-sm text-muted">{p.note}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-sm text-muted">Hollow: the AI suggests. Filled: the backend enforces. Repository and demo are not published yet.</p>
                </div>
              </div>
            </article>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">{projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}</div>
        </Section>

        <Section id="certifications" title="Certifications">
          <ul className="divide-y divide-line border-y border-line">
            {certs.map((c, i) => (
              <li key={c.name}>
                <Reveal delay={i * 0.05} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div>
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <p className="text-sm text-muted">{c.by} / {c.date}</p>
                  </div>
                  <Btn href={c.url}>View credential</Btn>
                </Reveal>
              </li>
            ))}
          </ul>
          <h3 className="mb-5 mt-14 text-xl font-semibold">On GitHub</h3>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-surface p-5">
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="font-serif text-4xl font-semibold">{s.n}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="connect" title="Connect">
          <Reveal>
            <p className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl">Let's build something useful and innovative.</p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {links.map(([k, href, label]) => (
                <li key={k}>
                  <a
                    href={href}
                    target={k === 'Email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-accent"
                  >
                    <span className="font-serif text-xl">{k}</span>
                    <span className="break-all text-sm text-muted transition-colors group-hover:text-accent">
                      {label} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted">
          <span>{profile.name}, {profile.location}</span>
          <a href="#top" className="hover:text-accent">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
