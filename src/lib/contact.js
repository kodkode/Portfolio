/**
 * Client half of the contact form.
 *
 * Posts to the /api/contact serverless function, which is the only thing that
 * touches the database. Nothing secret ships in the browser bundle — there is
 * no endpoint, project id, or key to configure here.
 */

export async function submitContactMessage({ name, email, message }) {
  let response
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
  } catch {
    // Offline, DNS failure, request blocked — never reached the server.
    throw new Error('Network error — check your connection and try again.')
  }

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}))
    throw new Error(error || 'Could not send that. Email me directly instead.')
  }
}
