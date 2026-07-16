import { Client, TablesDB, ID } from 'appwrite'

/**
 * Appwrite Web SDK client.
 *
 * These four values come from your Appwrite console and are configured through
 * Vite env vars (see .env.example). They are PUBLIC by design — the Web SDK is
 * a client library, so the project id and endpoint ship in the browser bundle.
 * Access is gated by the collection/table permissions you set in Appwrite, not
 * by hiding these values.
 *
 * If any are missing, `isAppwriteConfigured` is false and the contact form
 * quietly falls back to a mailto: link, so the site still works before you
 * finish wiring up the backend.
 */

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID
const tableId = import.meta.env.VITE_APPWRITE_TABLE_ID

export const isAppwriteConfigured = Boolean(
  endpoint && projectId && databaseId && tableId,
)

let tablesDB = null

if (isAppwriteConfigured) {
  const client = new Client().setEndpoint(endpoint).setProject(projectId)
  tablesDB = new TablesDB(client)
}

/**
 * Store a contact-form submission as a row in your Appwrite table.
 * The table needs three string columns: name, email, message — and its
 * permissions must allow "Any" (or "Guests") to Create.
 */
export async function submitContactMessage({ name, email, message }) {
  if (!tablesDB) throw new Error('Appwrite is not configured.')
  return tablesDB.createRow({
    databaseId,
    tableId,
    rowId: ID.unique(),
    data: { name, email, message },
  })
}
