import { useEffect, useRef, useState } from 'react'
import { submitContactMessage } from './lib/contact'

/* ===========================================================================
 * Content
 * ======================================================================== */

const TICKER = [
  'VOQAWISP → APP STORE',
  'PRIVACY BY DEFAULT',
  'SELF-HOSTED EVERYTHING',
  'AUTOMATION THAT RUNS ITSELF',
  'SWIFT · PYTHON · REACT',
  'ENTERPRISE TO APP STORE',
  'EXIT 0 — CLEAN SHUTDOWN',
]

const PROJECTS = [
  {
    no: '01',
    name: 'VoqaWisp',
    kicker: 'VOICE → TEXT',
    lede: 'A macOS & iOS transcription app that treats your voice like private data — because it is.',
    body: 'Speech is transcribed on-device with WhisperKit, so raw audio never has to leave the machine. A cloud pass through Groq then cleans the transcript — punctuation, formatting, structure — turning rambling speech into text you can actually paste somewhere.',
    highlights: [
      'On-device Whisper transcription via WhisperKit — the audio stays local',
      'Groq-powered AI cleanup turns raw speech into formatted text',
      'Privacy-conscious architecture from the first commit',
    ],
    meta: [
      ['ROLE', 'Design & engineering'],
      ['PLATFORM', 'macOS · iOS'],
      ['STACK', 'Swift · SwiftUI · WhisperKit · Groq'],
      ['STATUS', 'Heading to the App Store'],
    ],
    artifact: 'waveform',
    access: 'Private build · walkthrough available',
  },
  {
    no: '02',
    name: 'Passwards',
    kicker: 'ENCRYPTED VAULT',
    lede: 'A password manager built on one uncomfortable question: what happens when you forget the master password?',
    body: 'End-to-end encrypted vault with CloudKit sync across devices, plus a recovery escrow system for the day memory fails. The design was pressure-tested through an adversarial security audit — attack it first, ship it second.',
    highlights: [
      'End-to-end encryption with CloudKit sync across devices',
      'Recovery escrow system — resilience without a backdoor',
      'Validated through an adversarial security audit',
    ],
    meta: [
      ['ROLE', 'Design & engineering'],
      ['PLATFORM', 'Apple ecosystem'],
      ['STACK', 'Swift · CryptoKit · CloudKit'],
      ['STATUS', 'Audited & hardened'],
    ],
    artifact: 'dial',
    access: 'Private build · security notes available',
  },
  {
    no: '03',
    name: 'Automation Suite',
    kicker: 'SELF-HOSTED TOOLS',
    lede: 'A growing collection of tools that do the boring work while I do something else.',
    body: 'A rental-listing watcher built on Python and Playwright pings my phone the moment something worth seeing appears — no refresh-refresh-refresh. Alongside it: custom Claude Code skills and slash-commands that compress repetitive development workflows into single commands.',
    highlights: [
      'Rental-listing watcher — Python + Playwright with real-time push notifications',
      'Custom Claude Code skills & slash-commands for AI-assisted development',
      'Self-hosted end to end: my hardware, my rules',
    ],
    meta: [
      ['ROLE', 'Builder & operator'],
      ['PLATFORM', 'Self-hosted'],
      ['STACK', 'Python · Playwright · Claude Code · MCP'],
      ['STATUS', 'Running unattended'],
    ],
    artifact: 'nodes',
    access: 'Selected tooling documented on GitHub',
    href: 'https://github.com/kodkode',
  },
]

const PUBLIC_BUILDS = [
  {
    name: 'SuperNote',
    description: 'A deliberately simple native notes app for macOS.',
    stack: 'Swift · macOS',
    href: 'https://github.com/kodkode/SuperNote',
  },
  {
    name: 'FocusTimer',
    description: 'A focused macOS timer built as a small, complete product.',
    stack: 'Swift · macOS',
    href: 'https://github.com/kodkode/FocusTimer',
  },
]

const TOOLKIT = [
  {
    no: '01',
    label: 'iOS / macOS',
    items: ['Swift', 'SwiftUI', 'CloudKit', 'CryptoKit', 'WhisperKit', 'Xcode'],
  },
  {
    no: '02',
    label: 'Systems & Infrastructure',
    items: ['Windows Server', 'Active Directory', 'SCCM', 'Group Policy', 'Networking'],
  },
  {
    no: '03',
    label: 'Automation & AI',
    items: ['Python', 'Playwright', 'Claude Code', 'MCP Integrations', 'Shell'],
  },
  {
    no: '04',
    label: 'Web',
    items: ['ASP.NET Core', 'React', 'Tailwind CSS', 'REST APIs'],
  },
]

const MARQUEE_A = ['Swift', 'SwiftUI', 'CloudKit', 'WhisperKit', 'ASP.NET Core', 'React', 'Tailwind CSS']
const MARQUEE_B = ['Windows Server', 'Active Directory', 'SCCM', 'Python', 'Playwright', 'Claude Code', 'MCP']

const PRINCIPLES = [
  {
    no: '01',
    title: 'Automate the boring part',
    body: 'If a task happens twice, it gets a script. If it happens daily, it gets a service, a log file, and push notifications.',
  },
  {
    no: '02',
    title: 'Privacy is a feature',
    body: 'Data that never leaves the device cannot leak from a server. Architectures start from that constraint, not retrofit it.',
  },
  {
    no: '03',
    title: 'Attack it before shipping it',
    body: 'The adversarial audit, the failure drill, the what-if-I-forget-the-password question — asked early, on purpose.',
  },
]

const RANGE = [
  ['ENTERPRISE INFRASTRUCTURE', 'Windows Server fleets, Active Directory, SCCM — systems measured in uptime.'],
  ['NATIVE APPS', 'Swift & SwiftUI on Apple platforms, built for the App Store, not just the simulator.'],
  ['AI-ASSISTED WORKFLOWS', 'Python, Claude Code, MCP — teaching the machine to do the second draft.'],
]

const NAV = [
  ['work', '01', 'Work'],
  ['toolkit', '02', 'Toolkit'],
  ['about', '03', 'About'],
  ['contact', '04', 'Contact'],
]

// Public contact address. Leave empty to hide every email link on the page.
const EMAIL = ''
const GITHUB_URL = 'https://github.com/kodkode'
const LINKEDIN_URL = 'https://www.linkedin.com/in/michael-tubul'

/* ===========================================================================
 * Hooks
 * ======================================================================== */

function usePrefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Scroll-reveal: adds `is-visible` once the element enters the viewport. */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Slow parallax drift for the hero headline. */
function useParallax(factor = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.scrollY * factor}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [factor])
  return ref
}

/** Local clock for the top bar (IL time). */
function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem',
  })
}

/* ===========================================================================
 * Project artifacts — one hand-drawn SVG schematic per project
 * ======================================================================== */

const WAVE_HEIGHTS = [
  14, 32, 52, 38, 64, 90, 70, 44, 58, 82, 96, 60, 36, 50, 74, 88, 56, 30, 46, 68,
  84, 52, 26, 42, 62, 78, 48, 22, 38, 56,
]

function WaveformArtifact() {
  const reduced = usePrefersReducedMotion()
  return (
    <svg viewBox="0 0 300 180" className="h-full w-full" aria-hidden="true">
      <text x="8" y="18" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        fig. 1 — speech, kept local
      </text>
      {WAVE_HEIGHTS.map((h, i) => (
        <rect
          key={i}
          x={12 + i * 9.4}
          y={100 - h / 2}
          width="4"
          height={h}
          rx="2"
          className={`${i >= 10 && i <= 19 ? 'fill-accent' : 'fill-ink'} ${reduced ? '' : 'wave-bar'}`}
          style={reduced ? undefined : { animationDelay: `${i * 90}ms` }}
        />
      ))}
      <line x1="12" y1="150" x2="288" y2="150" className="stroke-muted" strokeWidth="1" strokeDasharray="2 4" />
      <text x="12" y="168" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        whisperkit → groq → “ready to paste.”
      </text>
    </svg>
  )
}

function DialArtifact() {
  return (
    <svg viewBox="0 0 300 180" className="h-full w-full" aria-hidden="true">
      <text x="8" y="18" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        fig. 2 — the vault dial
      </text>
      <circle cx="90" cy="90" r="52" fill="none" className="stroke-ink" strokeWidth="2" />
      <circle cx="90" cy="90" r="40" fill="none" className="stroke-muted" strokeWidth="1" strokeDasharray="2 4" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2
        const x1 = 90 + Math.cos(a) * 46
        const y1 = 90 + Math.sin(a) * 46
        const x2 = 90 + Math.cos(a) * 52
        const y2 = 90 + Math.sin(a) * 52
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink" strokeWidth="1.5" />
      })}
      <line x1="90" y1="90" x2="90" y2="44" className="stroke-accent dial-needle" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="90" r="5" className="fill-ink" />
      {['e2e encryption', 'cloudkit sync', 'recovery escrow'].map((t, i) => (
        <g key={t}>
          <rect x="172" y={52 + i * 30} width="10" height="10" className={i === 2 ? 'fill-accent' : 'fill-ink'} />
          <text x="190" y={61 + i * 30} className="fill-ink" fontSize="10" fontFamily="IBM Plex Mono, monospace">
            {t}
          </text>
        </g>
      ))}
      <text x="12" y="168" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        audited adversarially. still standing.
      </text>
    </svg>
  )
}

function NodesArtifact() {
  return (
    <svg viewBox="0 0 300 180" className="h-full w-full" aria-hidden="true">
      <text x="8" y="18" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        fig. 3 — while you sleep
      </text>
      <path d="M40 90 H110" fill="none" className="stroke-ink flow-dash" strokeWidth="1.5" />
      <path d="M130 90 H200" fill="none" className="stroke-ink flow-dash" strokeWidth="1.5" />
      <path d="M220 90 H262" fill="none" className="stroke-ink flow-dash" strokeWidth="1.5" />
      <circle cx="34" cy="90" r="10" fill="none" className="stroke-ink" strokeWidth="2" />
      <rect x="112" y="78" width="24" height="24" fill="none" className="stroke-ink" strokeWidth="2" />
      <circle cx="212" cy="90" r="10" fill="none" className="stroke-ink" strokeWidth="2" />
      <circle cx="272" cy="90" r="8" className="fill-accent node-pulse" />
      <text x="20" y="120" className="fill-ink" fontSize="9" fontFamily="IBM Plex Mono, monospace">watch</text>
      <text x="106" y="120" className="fill-ink" fontSize="9" fontFamily="IBM Plex Mono, monospace">filter</text>
      <text x="196" y="120" className="fill-ink" fontSize="9" fontFamily="IBM Plex Mono, monospace">notify</text>
      <text x="258" y="120" className="fill-accent" fontSize="9" fontFamily="IBM Plex Mono, monospace">you</text>
      <text x="12" y="152" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        */5 * * * *  — the schedule never blinks
      </text>
      <text x="12" y="168" className="fill-muted" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        python · playwright · push
      </text>
    </svg>
  )
}

const ARTIFACTS = {
  waveform: WaveformArtifact,
  dial: DialArtifact,
  nodes: NodesArtifact,
}

/* ===========================================================================
 * Top bar
 * ======================================================================== */

function TopBar() {
  const time = useClock()
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <a href="#top" className="inline-flex min-h-11 items-center font-display text-sm tracking-tight uppercase" aria-label="Back to top">
          MT<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-8">
            {NAV.map(([id, no, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="link-under inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest">
                  <span className="mr-1 hidden text-accent md:inline">{no}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest md:flex">
          <span aria-hidden="true" className="blink inline-block size-2 rounded-full bg-accent" />
          Israel · {time}
        </p>
      </div>
    </header>
  )
}

/* ===========================================================================
 * Hero
 * ======================================================================== */

function Hero() {
  const parallaxRef = useParallax(0.1)
  return (
    <section id="top" className="border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-baseline justify-between border-b border-ink/20 py-4">
          <p className="hero-in font-mono text-xs uppercase tracking-widest text-muted" style={{ animationDelay: '60ms' }}>
            Portfolio — 2026 edition
          </p>
          <p className="hero-in hidden font-mono text-xs uppercase tracking-widest text-muted sm:block" style={{ animationDelay: '60ms' }}>
            Developer & IT systems engineer
          </p>
        </div>

        <div ref={parallaxRef} className="py-14 sm:py-20 lg:py-24">
          <h1 aria-label="KodKode.dev" className="font-display uppercase leading-[0.86] tracking-tight">
            <span aria-hidden="true" className="hero-in block text-[15.5vw] sm:text-[13vw] lg:text-[10.5rem]" style={{ animationDelay: '150ms' }}>
              KodKode
            </span>
            <span aria-hidden="true" className="hero-in text-outline block text-[15.5vw] sm:text-[13vw] lg:text-[10.5rem]" style={{ animationDelay: '280ms' }}>
              .dev
            </span>
          </h1>

          <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="hero-in max-w-2xl" style={{ animationDelay: '420ms' }}>
              <p className="text-xl leading-snug sm:text-2xl">
                I build <em className="font-serif italic text-accent">automation</em> that runs itself,{' '}
                <em className="font-serif italic text-accent">native apps</em> for Apple platforms, and{' '}
                <em className="font-serif italic text-accent">AI-assisted workflows</em> — from the
                enterprise server room to the App Store.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center gap-3 border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-accent hover:text-ink"
                >
                  View selected work <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center gap-3 border-2 border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                >
                  Start a conversation <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <ul className="hero-in space-y-1 font-mono text-xs uppercase tracking-widest text-muted" style={{ animationDelay: '540ms' }}>
              <li>Based in Israel</li>
              <li>Full stack, floor to cloud</li>
              <li className="text-ink">
                <a href="#contact" className="link-under inline-flex min-h-11 items-center gap-2">
                  Open to interesting problems <span aria-hidden="true" className="text-accent">●</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="marquee border-t-2 border-ink bg-ink py-3 text-paper" aria-hidden="true">
        <div className="marquee-track" style={{ '--marquee-speed': '38s' }}>
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center">
              {TICKER.map((t) => (
                <span key={t} className="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-widest">
                  {t} <span className="text-accent">✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===========================================================================
 * Section header
 * ======================================================================== */

function SectionHeader({ no, title, note, invert = false }) {
  return (
    <Reveal className={`flex items-end justify-between gap-6 border-b-2 py-6 ${invert ? 'border-paper' : 'border-ink'}`}>
      <h2 className="font-display text-4xl uppercase leading-none tracking-tight sm:text-6xl">{title}</h2>
      <div className="shrink-0 text-right">
        <p className={`font-display text-xl sm:text-2xl ${invert ? 'text-accent' : 'text-accent'}`}>{no}</p>
        {note && <p className={`mt-1 font-mono text-xs uppercase tracking-widest ${invert ? 'text-paper/60' : 'text-muted'}`}>{note}</p>}
      </div>
    </Reveal>
  )
}

/* ===========================================================================
 * Work
 * ======================================================================== */

function ProjectSpread({ project, flip }) {
  const Artifact = ARTIFACTS[project.artifact]
  return (
    <Reveal as="article" className="group border-b border-ink/20 py-14 last:border-b-0 sm:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs uppercase tracking-widest text-muted">
        <p>
          Project {project.no} — <span className="text-accent">{project.kicker}</span>
        </p>
        <p>{project.meta[3][1]}</p>
      </div>

      <div className={`mt-8 grid gap-10 lg:grid-cols-12 ${flip ? '' : ''}`}>
        {/* main column */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <h3 className="font-display text-5xl uppercase leading-[0.9] tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-7xl">
            {project.name}
          </h3>
          <p className="mt-6 max-w-xl font-serif text-2xl italic leading-snug sm:text-3xl">{project.lede}</p>
          <p className="mt-6 max-w-xl leading-relaxed text-ink-2">{project.body}</p>
          <ul className="mt-8 max-w-xl border-t border-ink/20">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-4 border-b border-ink/20 py-3 text-sm leading-snug">
                <span aria-hidden="true" className="font-mono text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="link-under inline-flex min-h-11 items-center gap-2"
              >
                {project.access} <span aria-hidden="true" className="text-accent">↗</span>
              </a>
            ) : (
              <p className="inline-flex min-h-11 items-center gap-2 border border-ink/25 px-3 text-muted">
                <span aria-hidden="true" className="text-accent">●</span> {project.access}
              </p>
            )}
          </div>
        </div>

        {/* artifact + meta column */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <div className="border-2 border-ink bg-paper-2 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="aspect-[5/3]">
              <Artifact />
            </div>
          </div>
          <dl className="mt-6">
            {project.meta.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-ink/20 py-2.5 font-mono text-xs">
                <dt className="uppercase tracking-widest text-muted">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Reveal>
  )
}

function Work() {
  return (
    <section id="work" className="scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="pt-16 sm:pt-24">
          <SectionHeader no="01" title="Selected Work" note="Three systems, built end to end" />
        </div>
        {PROJECTS.map((p, i) => (
          <ProjectSpread key={p.name} project={p} flip={i % 2 === 1} />
        ))}

        <Reveal id="public-source" className="scroll-mt-16 border-t-2 border-ink py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Public source</p>
              <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">
                Smaller builds,<br />openly inspectable.
              </h3>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="link-under mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest"
              >
                Browse the GitHub profile <span aria-hidden="true" className="text-accent">↗</span>
              </a>
            </div>
            <div className="grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2 lg:col-span-8">
              {PUBLIC_BUILDS.map((build) => (
                <a
                  key={build.name}
                  href={build.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/build min-h-56 bg-paper p-6 transition-colors hover:bg-paper-2 sm:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{build.stack}</p>
                  <h4 className="mt-8 font-display text-3xl uppercase tracking-tight transition-colors group-hover/build:text-accent">
                    {build.name}
                  </h4>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-2">{build.description}</p>
                  <p className="mt-8 font-mono text-xs uppercase tracking-widest">
                    Inspect repository <span aria-hidden="true" className="text-accent">↗</span>
                  </p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ===========================================================================
 * Toolkit — inverted section
 * ======================================================================== */

function Toolkit() {
  return (
    <section id="toolkit" className="scroll-mt-16 border-y-2 border-ink bg-ink py-16 text-paper sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeader no="02" title="Toolkit" note="What the work gets built with" invert />
      </div>

      {/* double marquee */}
      <div className="mt-12 space-y-4" aria-hidden="true">
        <div className="marquee border-y border-paper/20 py-4">
          <div className="marquee-track" style={{ '--marquee-speed': '30s' }}>
            {[0, 1].map((dup) => (
              <span key={dup} className="flex shrink-0 items-center">
                {MARQUEE_A.map((t) => (
                  <span key={t} className="mx-8 flex items-center gap-8 font-display text-3xl uppercase tracking-tight sm:text-5xl">
                    {t} <span className="text-accent text-xl sm:text-3xl">✳</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee border-b border-paper/20 pb-4">
          <div className="marquee-track is-reverse" style={{ '--marquee-speed': '34s' }}>
            {[0, 1].map((dup) => (
              <span key={dup} className="flex shrink-0 items-center">
                {MARQUEE_B.map((t) => (
                  <span key={t} className="mx-8 flex items-center gap-8 font-display text-3xl uppercase tracking-tight text-paper/40 sm:text-5xl">
                    {t} <span className="text-accent text-xl sm:text-3xl">✳</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-x-10 gap-y-12 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {TOOLKIT.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 80}>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{group.no}</p>
            <h3 className="mt-2 border-b border-paper/25 pb-3 text-lg font-semibold">{group.label}</h3>
            <ul className="mt-3">
              {group.items.map((item) => (
                <li key={item} className="border-b border-paper/10 py-2 font-mono text-sm text-paper/70">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ===========================================================================
 * About
 * ======================================================================== */

function About() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="pt-16 sm:pt-24">
          <SectionHeader no="03" title="About" note="The person behind the uptime" />
        </div>

        <div className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-2xl font-serif text-3xl italic leading-tight sm:text-4xl">
              “Good systems keep working <span className="text-accent">after you walk away.</span>”
            </p>
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-ink-2">
              <p>
                I&apos;m a developer and IT professional based in Israel, working across the full
                stack in the widest sense — enterprise infrastructure on one end, native Apple
                apps and AI-assisted tooling on the other.
              </p>
              <p>
                That range is the point. Managing Windows Server fleets teaches you what
                reliability actually costs; shipping apps teaches you what people actually
                tolerate. The interesting work happens where those two meet — tools that are
                engineered like infrastructure and feel like products.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Range</h3>
            <ul className="mt-4">
              {RANGE.map(([title, body]) => (
                <li key={title} className="border-b border-ink/20 py-4">
                  <p className="font-display text-sm uppercase tracking-tight">{title}</p>
                  <p className="mt-1.5 text-sm leading-snug text-ink-2">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* principles */}
        <div className="grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.no} delay={i * 90} className="bg-paper p-7 transition-colors duration-300 hover:bg-paper-2 sm:p-8">
              <p className="font-display text-2xl text-accent">{p.no}</p>
              <h3 className="mt-4 font-display text-lg uppercase leading-tight tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===========================================================================
 * Contact form — posts to /api/contact, which stores the message in Postgres
 * ======================================================================== */

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Jane Developer' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'jane@example.com' },
]

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // honeypot — real users never fill this hidden field
    if (data.get('company')) return

    const name = data.get('name')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const message = data.get('message')?.toString().trim()

    if (!name || !email || !message) {
      setStatus('error')
      setError('Please fill in every field.')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      await submitContactMessage({ name, email, message })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Something broke on the way out. Email me directly instead.')
    }
  }

  const busy = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="border-2 border-ink bg-paper-2/60 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Or send a message <span className="text-accent">→</span>
      </p>

      {/* honeypot: visually hidden, off the accessibility tree */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              required
              disabled={busy}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none disabled:opacity-50"
            />
          </label>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          disabled={busy}
          placeholder="What are you trying to build, break, or automate?"
          className="mt-2 w-full resize-y border-b-2 border-ink bg-transparent py-2 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none disabled:opacity-50"
        />
      </label>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="group/btn inline-flex items-center gap-3 border-2 border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-200 hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? 'Sending…' : 'Send message'}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1">
            →
          </span>
        </button>

        {/* status: announced to screen readers */}
        <p aria-live="polite" className="font-mono text-xs uppercase tracking-widest">
          {status === 'success' && (
            <span className="text-ink">
              Sent — I’ll be in touch. <span aria-hidden="true" className="text-accent">✳</span>
            </span>
          )}
          {status === 'error' && <span className="text-accent">{error}</span>}
        </p>
      </div>

      {/* if the request failed, hand the visitor a route that always works */}
      {status === 'error' && EMAIL && (
        <p className="mt-4 font-mono text-[0.7rem] leading-relaxed tracking-wide text-muted">
          Still stuck?{' '}
          <a href={`mailto:${EMAIL}`} className="link-under text-ink">
            {EMAIL}
          </a>
        </p>
      )}
    </form>
  )
}

/* ===========================================================================
 * Contact / Footer
 * ======================================================================== */

function Contact() {
  return (
    <footer id="contact" className="mt-16 border-t-2 border-ink sm:mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            04 — Contact
          </p>
          <p className="mt-6 max-w-3xl font-serif text-3xl italic leading-tight sm:text-5xl">
            Got a problem worth <span className="text-accent">automating?</span>
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* left — the direct route */}
            <div className="min-w-0 lg:col-span-7">
              {EMAIL && (
                <>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">Prefer email?</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="email-giant mt-3 block max-w-full break-words font-display text-[clamp(1rem,3.1vw,2.5rem)] uppercase leading-none tracking-tight"
                  >
                    {EMAIL}
                  </a>
                </>
              )}
              <div className={`${EMAIL ? 'mt-10 ' : ''}flex flex-wrap gap-x-10 gap-y-3`}>
                {[
                  ['GitHub', GITHUB_URL],
                  ['LinkedIn', LINKEDIN_URL],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-under inline-flex min-h-11 items-center font-mono text-sm uppercase tracking-widest"
                  >
                    {label} <span aria-hidden="true" className="text-accent">↗</span>
                  </a>
                ))}
              </div>
              {EMAIL && (
                <p className="mt-10 max-w-sm font-serif text-xl italic leading-snug text-ink-2">
                  No forms-for-the-sake-of-forms. But if it’s easier, the one on the right lands in the
                  same place.
                </p>
              )}
            </div>

            {/* right — the form */}
            <div className="min-w-0 lg:col-span-5">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t-2 border-ink bg-ink py-4 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-1 px-4 font-mono text-xs uppercase tracking-widest sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Michael Tubul</p>
          <p className="text-paper/60">Designed & built by hand — React, Tailwind, stubbornness</p>
          <p>
            exit 0 <span className="text-accent">■</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ===========================================================================
 * App
 * ======================================================================== */

export default function App() {
  return (
    <div className="grain min-h-svh overflow-x-clip bg-paper text-ink">
      <TopBar />
      <main>
        <Hero />
        <Work />
        <Toolkit />
        <About />
      </main>
      <Contact />
    </div>
  )
}
