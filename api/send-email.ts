import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@linkosys.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'no-reply@linkosys.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { name, email, phone, company, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact from ${name} — ${company || 'No company'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Company</strong></td><td>${company || '—'}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    })

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' })
  }
}
