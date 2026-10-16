"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

// The chat panel starts empty (no greeting, no suggested questions).
// Only the Reset button (in the header) and the input + send button
// are visible until the user sends their first message.

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [unread, setUnread] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Show "unread" indicator when the chat is closed (subtle pulse)
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setUnread(true), 2500)
      return () => clearTimeout(t)
    } else {
      setUnread(false)
    }
  }, [open])

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      // Send to /api/chat with current history (excluding system prompt)
      // The API rebuilds the conversation from scratch each time using
      // the history we pass, so it's stateless from the client's POV.
      const history = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          history,
        }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        throw new Error(errBody.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      if (!data.reply) {
        throw new Error("No reply in response")
      }

      // Save sessionId if server assigned one
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ])
    } catch (err) {
      console.error("[Chatbot] Error:", err)
      setError(
        "Sorry, I couldn't respond right now. Please try again, or email Dires at dires7481@gmail.com."
      )
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  function clearChat() {
    setMessages([])
    setError(null)
  }

  return (
    <>
      {/* === Floating chat bubble (always visible, bottom-right) === */}
      <motion.button
        aria-label={open ? "Close chat" : "Open chat — Ask about Dires"}
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-xl shadow-brand-glow/30 ring-4 ring-background/80"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread pulse indicator */}
        {!open && unread && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
        )}
      </motion.button>

      {/* === Chat panel === */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop (semi-transparent so the page is dimmed) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden
            />

            {/* The panel itself */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[24rem] max-w-md flex flex-col rounded-3xl glass-card overflow-hidden shadow-2xl"
              style={{ height: "min(70vh, 36rem)" }}
              role="dialog"
              aria-label="Ask about Dires chat"
            >
              {/* === Header === */}
              <div className="flex items-center gap-3 p-4 border-b border-border/40 bg-background/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-md shadow-brand-glow/30 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">
                    Ask about Dires
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online · Replies in your language
                  </p>
                </div>
                <button
                  onClick={clearChat}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2 py-1 rounded-md hover:bg-secondary/60"
                  aria-label="Reset chat"
                >
                  Reset
                </button>
              </div>

              {/* === Messages area === */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        m.role === "user"
                          ? "bg-gradient-brand text-primary-foreground rounded-br-sm"
                          : "glass-card text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                      <motion.span
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.span
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.15,
                        }}
                      />
                      <motion.span
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3,
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-bl-sm bg-destructive/15 border border-destructive/30 px-4 py-2.5 text-sm text-destructive-foreground max-w-[85%]">
                      {error}
                    </div>
                  </motion.div>
                )}

                {/* Empty state hint — only shows when no messages yet.
                    Keeps the panel from looking broken; disappears after the
                    first message. */}
                {messages.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <Sparkles className="h-8 w-8 text-accent/50 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about Dires — his skills, projects, or how to contact him.
                      I reply in your language.
                    </p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* === Input area === */}
              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-border/40 bg-background/40"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Dires… (in any language)"
                    disabled={loading}
                    maxLength={2000}
                    className="flex-1 min-w-0 rounded-full bg-secondary/60 border border-border/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-md shadow-brand-glow/25 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
