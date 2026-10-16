# Portfolio — Michael Tubul

Personal portfolio site. React + Vite, styled with Tailwind CSS v4, deployed on
Vercel with a serverless contact form backed by Neon Postgres.

**Live:** https://kodkode.dev

## Stack

| Layer     | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Framework | React 19 + Vite 8                                        |
| Styling   | Tailwind CSS v4 (via `@tailwindcss/vite`, no config file) |
| Linting   | Oxlint                                                   |
| Hosting   | Vercel (static build + serverless functions)             |
| Database  | Neon Postgres, attached through the Vercel Marketplace   |
| Analytics | Vercel Web Analytics                                     |

## Local development

```bash
npm install
npm run dev
```

`npm run dev` runs plain Vite, which serves the site but **not** the `/api`
routes — the contact form will report a network error. To exercise the form
locally, use the Vercel CLI instead:

```bash
npx vercel dev
```

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the built output
npm run lint      # oxlint
```

## Contact form

The form posts JSON to `POST /api/contact`, a Vercel Serverless Function that
validates the input and inserts a row into Neon Postgres.

- `src/lib/contact.js` — client-side `fetch`, no credentials in the bundle
- `api/contact.js` — validation, honeypot handling, and the database write
- Table `contact_messages` is created automatically on the first submission
  after a cold start, so there is no migration step to run

Nothing secret ships to the browser. The connection string is read only inside
the serverless function, which is why it is `DATABASE_URL` and **not**
`VITE_DATABASE_URL` — the `VITE_` prefix would publish it in the client bundle.

### Setting up the database

1. Vercel dashboard → your project → **Storage** → **Marketplace** → **Neon**
2. Create a database and attach it to this project
3. Vercel injects `DATABASE_URL` into all environments automatically

Neon's free tier is far larger than this form will ever need.

### Reading the messages

Open the Neon console → your project → **SQL Editor**:

```sql
SELECT created_at, name, email, message
FROM contact_messages
ORDER BY created_at DESC;
```

Submissions do not send an email notification, so check here periodically.

### Validation rules

| Field     | Rule                                         |
| --------- | -------------------------------------------- |
| `name`    | required, max 120 chars                      |
| `email`   | required, max 200 chars, must contain `@`    |
| `message` | required, max 5000 chars                     |
| `company` | honeypot — if filled, the request is dropped |

## Environment variables

See `.env.example`. Only one variable exists: `DATABASE_URL`.

## Deployment

Vercel builds from `main` on every push. `vercel.json` sets security headers
and cache policy — hashed assets in `/assets/` are cached for a year, the HTML
entry point is always revalidated, and `/api/` responses are never cached.
