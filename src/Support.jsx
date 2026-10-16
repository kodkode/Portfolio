import { useEffect } from 'react'
import { ContactForm } from './App.jsx'

/* ===========================================================================
 * /support — the Support URL listed on every App Store product page.
 * Uses the same form (and the same /api/contact endpoint) as the home page.
 * ======================================================================== */

const APPS = ['VoqaWisp', 'Passwards', 'Other']

const CHECKLIST = [
  'Which app, and its version (Settings → About in the app)',
  'Your device and OS version — e.g. iPhone 15, iOS 26.1',
  'What you expected, what happened instead, and how to reproduce it',
]

export default function Support() {
  useEffect(() => {
    document.title = 'Support — Michael Tubul'
  }, [])

  return (
    <div className="grain min-h-svh overflow-x-clip bg-paper text-ink">
      <header className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <a href="/" className="inline-flex min-h-11 items-center font-display text-sm tracking-tight uppercase" aria-label="Home">
            MT<span className="text-accent">.</span>
          </a>
          <a href="/" className="link-under inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest">
            <span aria-hidden="true" className="mr-1 text-accent">←</span> Home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">App support</p>
        <h1 className="mt-6 max-w-3xl font-serif text-3xl italic leading-tight sm:text-5xl">
          Something not working? <span className="text-accent">Tell me.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          Support for apps published by Michael Tubul on the App Store. Every message is read by me — the
          developer — and I usually reply within two business days.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">To get a fast fix, include</h2>
            <ul className="mt-4 space-y-3 border-t-2 border-ink pt-4">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug text-ink-2">
              Feature requests are welcome here too.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ContactForm
              intro="Contact support"
              placeholder="Describe the problem or question…"
              appOptions={APPS}
            />
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-ink bg-ink py-4 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-1 px-4 font-mono text-xs uppercase tracking-widest sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Michael Tubul</p>
          <p>
            <a href="/" className="link-under">kodkode.dev</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
