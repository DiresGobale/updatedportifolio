"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { contactInfo, CONTACT_API_ENDPOINT } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { fadeInLeft, fadeInRight, viewportOnce } from "./motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SocialIcon } from "./social-icon"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" }

type Status = "idle" | "submitting" | "success" | "error"

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState<string>("")
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 2) next.name = "Please enter your name (min 2 chars)."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email."
    if (form.subject.trim().length < 3) next.subject = "Subject must be at least 3 characters."
    if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (status !== "idle") setStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus("submitting")
    setFeedback("")

    try {
      const res = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      // Try to parse JSON; fall back to a generic message if it fails
      let data: { success?: boolean; message?: string; errors?: string[] } = {}
      try {
        data = await res.json()
      } catch {
        data = { success: false, message: "Unexpected response from server." }
      }

      if (res.ok && data.success) {
        setStatus("success")
        setFeedback(data.message ?? "Message sent successfully!")
        setForm(initialState)
      } else {
        setStatus("error")
        setFeedback(
          data.message ??
            "Something went wrong. Please try again or email me directly."
        )
        if (data.errors && Array.isArray(data.errors)) {
          setFeedback(data.errors.join(" "))
        }
      }
    } catch (err) {
      setStatus("error")
      setFeedback(
        "Couldn't reach the server. Please check your connection and try again, or email me directly at " +
          contactInfo.email +
          "."
      )
    }
  }

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind, or just want to say hi? Drop me a message and I'll get back to you within 24 hours."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10">
          {/* Contact info card */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-6">Get in touch</h3>

            <div className="space-y-5">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:bg-accent/25 transition-colors">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              <a href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-4 group">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:bg-accent/25 transition-colors">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">
                    {contactInfo.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium">{contactInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Follow me
              </p>
              <div className="flex gap-3">
                {contactInfo.socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl glass-card text-muted-foreground hover:text-accent transition-colors"
                  >
                    <SocialIcon name={social.icon} className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4">
                {/* Slightly bolder (font-medium) and brighter (text-foreground at full
                    opacity instead of text-accent-foreground/90) to improve readability.
                    Only this sentence changed — all other text/colors/layout untouched. */}
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  <span className="font-semibold">Currently:</span> and junior full-stack or Flutter roles. Also available for freelance
                  coursework-style projects. Average response time &lt; 24h.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.form
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            noValidate
            className="glass-card rounded-3xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-accent">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.name}
                  className={errors.name ? "border-destructive/60 focus-visible:ring-destructive/30" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.email}
                  className={errors.email ? "border-destructive/60 focus-visible:ring-destructive/30" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject <span className="text-accent">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Let's build an AI-powered dashboard"
                disabled={status === "submitting"}
                aria-invalid={!!errors.subject}
                className={errors.subject ? "border-destructive/60 focus-visible:ring-destructive/30" : ""}
              />
              {errors.subject && (
                <p className="text-xs text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message <span className="text-accent">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, and goals…"
                rows={5}
                disabled={status === "submitting"}
                aria-invalid={!!errors.message}
                className={errors.message ? "border-destructive/60 focus-visible:ring-destructive/30" : "resize-none"}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            {/* Status messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300">{feedback}</p>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3"
              >
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive-foreground">{feedback}</p>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-brand-glow/25 border-0 group"
              size="lg"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
