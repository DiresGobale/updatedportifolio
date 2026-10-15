import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables (fall back to .env.example values if .env missing)
dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Basic request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'contact-service', timestamp: new Date().toISOString() })
})

// Validation helper
interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

function validatePayload(payload: Partial<ContactPayload>): string[] {
  const errors: string[] = []

  if (!payload.name || typeof payload.name !== 'string' || payload.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.')
  }
  if (
    !payload.email ||
    typeof payload.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  ) {
    errors.push('A valid email address is required.')
  }
  if (!payload.subject || typeof payload.subject !== 'string' || payload.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters.')
  }
  if (!payload.message || typeof payload.message !== 'string' || payload.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.')
  }

  return errors
}

// Build a Nodemailer transporter.
// In sandbox/preview environments SMTP credentials may not be present.
// In that case we create a stub transporter that logs the email instead of sending it,
// so the contact form still works end-to-end without breaking the UX.
function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (host && port && user && pass && pass !== 'your-app-password') {
    return nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    })
  }

  // Sandbox fallback — log instead of actually sending
  return {
    sendMail: async (options: nodemailer.SendMailOptions) => {
      console.log('--- [SANDBOX] Email not sent (no SMTP credentials) ---')
      console.log('To:', options.to)
      console.log('Subject:', options.subject)
      console.log('Text:', options.text)
      console.log('----------------------------------------------------')
      return { messageId: `sandbox-${Date.now()}`, response: 'sandbox-logged' }
    },
  } as unknown as nodemailer.Transporter
}

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const payload = req.body as Partial<ContactPayload>
    const errors = validatePayload(payload)

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      })
    }

    const { name, email, subject, message } = payload as ContactPayload

    const toEmail = process.env.CONTACT_TO_EMAIL || 'owner@example.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'portfolio@localhost'

    const transporter = createTransporter()

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${fromEmail}>`,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: [
        `New message from your portfolio contact form.`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        `${message}`,
        ``,
        `---`,
        `Sent at: ${new Date().toISOString()}`,
      ].join('\n'),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1a1a1a;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
            New message from your portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; font-weight: 600; width: 80px;">Name:</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Subject:</td><td style="padding: 6px 0;">${subject}</td></tr>
          </table>
          <h3 style="color: #0f172a; margin-top: 24px;">Message</h3>
          <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 14px 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          <p style="margin-top: 24px; color: #64748b; font-size: 12px;">
            Sent at ${new Date().toISOString()}
          </p>
        </div>
      `,
    })

    console.log(`Contact email sent: ${info.messageId}`)

    return res.status(200).json({
      success: true,
      message: 'Thanks for reaching out! Your message has been sent successfully.',
      messageId: info.messageId,
    })
  } catch (err) {
    console.error('Contact form error:', err)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    })
  }
})

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

app.listen(PORT, () => {
  console.log(`Contact service running on http://localhost:${PORT}`)
  console.log(`POST /api/contact available`)
  if (!process.env.SMTP_USER || process.env.SMTP_PASS === 'your-app-password') {
    console.log('⚠️  SMTP credentials not configured — running in SANDBOX mode (emails will be logged, not sent).')
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  process.exit(0)
})
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...')
  process.exit(0)
})
