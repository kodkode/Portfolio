import { neon } from '@neondatabase/serverless'

/**
 * POST /api/contact — stores a contact-form submission in Neon Postgres.
 *
 * Runs as a Vercel Serverless Function. The connection string is injected
 * automatically when you attach a Neon database from the Vercel Marketplace
 * (Storage → Neon), so there is nothing to paste into the dashboard by hand.
 *
 * Unlike the old Appwrite setup, no credentials reach the browser: the client
 * posts plain JSON here, and only this function talks to the database.
 */

const CONNECTION_STRING = process.env.DATABASE_URL || process.env.POSTGRES_URL

// Length caps — generous for a human, hostile to anyone pasting a payload.
const LIMITS = { name: 120, email: 200, message: 5000 }

// Deliberately loose: real-world addresses defeat clever regexes. This only
// rejects obvious junk; the address is stored as text either way.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let schemaReady = null

/** Create the table on first invocation of a cold instance, then cache it. */
function ensureSchema(sql) {
  schemaReady ??= sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name       text        NOT NULL,
      email      text        NOT NULL,
      message    text        NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `
  return schemaReady
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!CONNECTION_STRING) {
    // Misconfiguration, not the visitor's fault — don't leak details to them.
    console.error('DATABASE_URL is not set. Attach a Neon database in Vercel.')
    return res.status(500).json({ error: 'The contact form is not available right now.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body
  if (!body) return res.status(400).json({ error: 'Malformed request.' })

  // Honeypot: hidden field that only bots fill in. Accept, then discard.
  if (clean(body.company)) return res.status(200).json({ ok: true })

  const name = clean(body.name)
  const email = clean(body.email)
  const message = clean(body.message)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in every field.' })
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: 'That is longer than the form accepts.' })
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' })
  }

  try {
    const sql = neon(CONNECTION_STRING)
    await ensureSchema(sql)
    // Tagged template — values are sent as bound parameters, never interpolated.
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `
    return res.status(200).json({ ok: true })
  } catch (err) {
    // A failed CREATE TABLE shouldn't poison every later request on this instance.
    schemaReady = null
    console.error('Failed to store contact message:', err)
    return res.status(500).json({ error: 'Could not send that. Email me directly instead.' })
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
