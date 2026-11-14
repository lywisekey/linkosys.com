import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

/**
 * Recipients, comma-separated in CONTACT_TO_EMAIL so the list can change without
 * a deploy. Resend takes an array directly; sending one message addressed to
 * everyone keeps a single thread rather than splitting replies across copies.
 */
const TO_EMAILS = (process.env.CONTACT_TO_EMAIL || 'info@linkosys.com')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean)
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'no-reply@linkosys.com'

/** Longest value accepted per field, to bound payload size and abuse. */
const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  company: 160,
  interest: 80,
  message: 5000
} as const

/**
 * Submitted values are interpolated into an HTML email. Without escaping, a
 * submission containing markup renders as live HTML in the recipient's inbox —
 * including links and styling controlled by the sender.
 */
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Keeps header-injection characters out of the subject and reply-to. */
function sanitizeHeader(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max)
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ success: false, message: 'Invalid request body' })
  }
  const body = req.body as Record<string, unknown>
  const { name, email, phone, company, message, interest } = body

  // Honeypot: a hidden field no human fills in. Bots that submit every input
  // get a success response so they do not learn they were filtered.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' })
  }

  const required = ['name', 'email', 'company', 'interest', 'message']
  if (required.some((field) => typeof body[field] !== 'string' || !(body[field] as string).trim())) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields' })
  }
  if (phone != null && typeof phone !== 'string') {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number' })
  }

  const cleanEmail = sanitizeHeader(email, LIMITS.email)
  if (!isEmail(cleanEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' })
  }

  for (const [field, max] of Object.entries(LIMITS)) {
    const value = body[field]
    if (typeof value === 'string' && value.length > max) {
      return res.status(400).json({ success: false, message: `The ${field} field is too long` })
    }
  }

  const cleanName = sanitizeHeader(name, LIMITS.name)
  const cleanCompany = sanitizeHeader(company, LIMITS.company)

  const rows: [string, unknown][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Company', company || '—'],
    ['Area of interest', interest || '—']
  ]

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      replyTo: cleanEmail,
      subject: `New contact from ${cleanName} — ${cleanCompany || 'No company'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`
            )
            .join('')}
          <tr>
            <td><strong>Message</strong></td>
            <td style="white-space:pre-wrap">${escapeHtml(message)}</td>
          </tr>
        </table>
      `
    })

    if (error) throw error

    return res
      .status(200)
      .json({ success: true, message: 'Your message has been sent successfully.' })
  } catch (error) {
    console.error('Resend error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send email. Please try again later.' })
  }
}
