import { useEffect } from 'react'

/* ===========================================================================
 * /privacy — the Privacy Policy URL listed in App Store Connect and linked
 * from inside each app (App Review Guideline 5.1.1(i)).
 * ======================================================================== */

export const SUPPORT_EMAIL = 'michael@kodkode.dev'
const EFFECTIVE_DATE = '8 November 2026'

const SECTIONS = [
  {
    title: 'Who this policy covers',
    body: [
      'This policy covers the apps Michael publishes on the App Store (VoqaWisp and Passwards) and this website, kodkode.dev. I am an independent developer; when this policy says “I” or “me”, it means me, Michael, the developer and data controller.',
      'Each app is described separately below because they handle data differently. If an app is not listed here, this general policy applies to it until a dedicated section is added.',
    ],
  },
  {
    title: 'The short version',
    body: [
      'I do not sell your data, I do not use your data for advertising, and I do not track you across other companies’ apps or websites.',
      'Wherever possible, data stays on your device or in your own iCloud account, where I cannot read it.',
    ],
  },
  {
    title: 'VoqaWisp',
    body: [
      'Microphone audio. VoqaWisp asks for microphone access so it can transcribe your speech. Transcription runs on your device using WhisperKit. Your audio is not uploaded to me or to any third party.',
      'Transcript text. To clean up punctuation and formatting, the text of a transcript is sent to Groq, Inc., a third-party AI inference provider, over an encrypted connection. Groq processes the text to return the cleaned-up version. I do not receive or store your transcripts on any server of mine.',
      'Third-party processing. Groq handles transcript text under its own privacy policy and data-processing terms (groq.com/privacy-policy). I only use providers that commit to protecting your data to a standard at least equal to this policy.',
    ],
  },
  {
    title: 'Passwards',
    body: [
      'Your vault. Everything you store in Passwards is end-to-end encrypted on your device before it is synced. Sync uses Apple CloudKit in your own private iCloud database. I cannot read, access or decrypt your vault, and neither can Apple.',
      'Recovery escrow. If you turn on recovery, the material needed to recover your vault is stored in encrypted form so that only you can complete a recovery. It does not give me a way into your vault.',
      'Deleting your data. Deleting the app’s data from within Passwards, or removing its data from iCloud (Settings → [your name] → iCloud → Manage Account Storage), permanently deletes your synced vault.',
    ],
  },
  {
    title: 'This website and the support form',
    body: [
      'Support and contact form. When you send a message, I store your name, email address, the app you selected and your message in a database hosted by Neon (via Vercel). I use this only to answer you.',
      'Email. If you email me, I keep the conversation in my mailbox for the same purpose.',
      'Analytics. This site uses Vercel Web Analytics, which counts page views without cookies and without identifying individual visitors.',
      'Hosting. The site is hosted on Vercel, which keeps short-lived technical logs (such as IP address and browser type) to run and protect the service.',
    ],
  },
  {
    title: 'Retention and deletion',
    body: [
      'Support messages and emails are kept only as long as needed to resolve your request and any follow-up, then deleted. Data stored on your device or in your iCloud account stays under your control and is removed when you delete it or the app.',
      `To have your data deleted, access the data I hold about you, or withdraw consent you previously gave, email ${SUPPORT_EMAIL}. I will respond within 30 days.`,
    ],
  },
  {
    title: 'Children',
    body: [
      'These apps are not directed at children under 13, and I do not knowingly collect personal data from them. If you believe a child has sent me personal data, contact me and I will delete it.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'If this policy changes, the updated version will be posted on this page with a new effective date. Significant changes will also be noted in the app’s release notes.',
    ],
  },
]

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — Michael'
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
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Privacy policy</p>
        <h1 className="mt-6 max-w-3xl font-serif text-3xl italic leading-tight sm:text-5xl">
          Your data is <span className="text-accent">yours.</span>
        </h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
          Effective {EFFECTIVE_DATE}
        </p>

        <div className="mt-12 max-w-3xl space-y-12">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="border-b-2 border-ink pb-3 font-mono text-xs uppercase tracking-widest">{title}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-2">
                {body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="border-b-2 border-ink pb-3 font-mono text-xs uppercase tracking-widest">Contact</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Questions about privacy or your data:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="link-under text-ink">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t-2 border-ink bg-ink py-4 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-1 px-4 font-mono text-xs uppercase tracking-widest sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Michael</p>
          <p>
            <a href="/support" className="link-under">App Support</a>
          </p>
          <p>
            <a href="/" className="link-under">kodkode.dev</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
