"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Search, Star, MapPin, Mail, Phone, ArrowRight, ArrowLeft,
  Plus, Trash2, TrendingDown, TrendingUp, Package, Truck, CheckCircle2,
  Clock, BookOpen, User, Calendar, Send, Download, ThumbsUp, ThumbsDown,
  Library, ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ============================================================
// 1. AI EMPLOYEE RECOMMENDATION SYSTEM DEMO
// ============================================================
export function AIRecommendationDemo() {
  const [selectedCandidate, setSelectedCandidate] = useState(0)
  const [selectedJob, setSelectedJob] = useState(0)

  const jobs = [
    { title: "Senior React Developer", skills: ["React", "TypeScript", "Tailwind", "Node.js"] },
    { title: "Flutter Mobile Developer", skills: ["Flutter", "Dart", "REST API", "SQLite"] },
    { title: "Backend Engineer", skills: ["Node.js", "Express", "PostgreSQL", "Docker"] },
  ]

  const candidates = [
    { name: "Abebe Tesfaye", skills: ["React", "TypeScript", "Tailwind", "Next.js"], match: 95, exp: "5 years" },
    { name: "Hanan Girma", skills: ["Flutter", "Dart", "REST API", "Firebase"], match: 91, exp: "3 years" },
    { name: "Yonas Bekele", skills: ["Node.js", "Express", "PostgreSQL", "Docker"], match: 88, exp: "4 years" },
    { name: "Sara Alemu", skills: ["React", "Node.js", "Python", "MongoDB"], match: 72, exp: "2 years" },
  ]

  const job = jobs[selectedJob]

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Search className="h-5 w-5 text-accent" /> Select a Job Position
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {jobs.map((j, i) => (
            <button
              key={i}
              onClick={() => { setSelectedJob(i); setSelectedCandidate(0) }}
              className={`text-left rounded-xl p-3 border transition-all ${selectedJob === i ? "border-accent bg-accent/10" : "border-border/40 hover:border-accent/30"}`}
            >
              <p className="text-sm font-semibold">{j.title}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {j.skills.map(s => <span key={s} className="text-[10px] rounded bg-secondary/60 px-1.5 py-0.5">{s}</span>)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-400" /> AI-Ranked Candidates for &ldquo;{job.title}&rdquo;
        </h3>
        <div className="space-y-3">
          {candidates.map((c, i) => {
            const matchingSkills = c.skills.filter(s => job.skills.includes(s)).length
            return (
              <button
                key={i}
                onClick={() => setSelectedCandidate(i)}
                className={`w-full text-left rounded-xl p-4 border transition-all ${selectedCandidate === i ? "border-accent bg-accent/10" : "border-border/40 hover:border-accent/30"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground text-sm font-bold">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.exp} experience</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${c.match >= 90 ? "text-green-400" : c.match >= 75 ? "text-amber-400" : "text-muted-foreground"}`}>
                      {c.match}%
                    </div>
                    <p className="text-[10px] text-muted-foreground">AI match</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map(s => (
                    <span key={s} className={`text-[10px] rounded px-2 py-0.5 ${job.skills.includes(s) ? "bg-green-500/20 text-green-400" : "bg-secondary/60 text-muted-foreground"}`}>
                      {s}{job.skills.includes(s) ? " ✓" : ""}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {matchingSkills}/{job.skills.length} required skills matched
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">AI Analysis: {candidates[selectedCandidate].name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The AI engine parsed the candidate&apos;s resume, extracted structured skills using NLP,
          and computed semantic similarity against the job requirements. The match score of
          <span className="text-green-400 font-semibold"> {candidates[selectedCandidate].match}%</span> reflects
          skill overlap, experience relevance, and semantic embedding distance.
          {candidates[selectedCandidate].match >= 90 ? " This candidate is a strong match — recommended for interview." : " This candidate has partial overlap — consider for screening."}
        </p>
      </div>
    </div>
  )
}

// ============================================================
// 2. EXPENSE TRACKER DEMO
// ============================================================
export function ExpenseTrackerDemo() {
  const [expenses, setExpenses] = useState([
    { id: 1, desc: "Lunch at campus cafeteria", amount: 45, category: "Food", date: "2025-01-15" },
    { id: 2, desc: "Bus to university", amount: 15, category: "Transport", date: "2025-01-15" },
    { id: 3, desc: "Flutter course (Udemy)", amount: 200, category: "Education", date: "2025-01-12" },
    { id: 4, desc: "Phone data plan", amount: 150, category: "Bills", date: "2025-01-10" },
    { id: 5, desc: "Coffee with team", amount: 30, category: "Food", date: "2025-01-09" },
  ])
  const [desc, setDesc] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")

  const categories = ["Food", "Transport", "Education", "Bills", "Shopping", "Other"]
  const catColors: Record<string, string> = {
    Food: "#06b6d4", Transport: "#f59e0b", Education: "#a855f7",
    Bills: "#ef4444", Shopping: "#ec4899", Other: "#64748b",
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = useMemo(() => {
    const map: Record<string, number> = {}
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount })
    return map
  }, [expenses])

  const addExpense = () => {
    if (!desc.trim() || !amount) return
    setExpenses([...expenses, {
      id: Date.now(), desc, amount: parseFloat(amount), category, date: new Date().toISOString().slice(0, 10)
    }])
    setDesc(""); setAmount(""); setCategory("Food")
  }
  const removeExpense = (id: number) => setExpenses(expenses.filter(e => e.id !== id))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase">Total Spent</p>
          <p className="text-2xl font-bold text-amber-400">{total} ETB</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase">Entries</p>
          <p className="text-2xl font-bold text-accent">{expenses.length}</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase">Categories</p>
          <p className="text-2xl font-bold text-purple-400">{Object.keys(byCategory).length}</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Plus className="h-5 w-5 text-accent" /> Add Expense</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="Amount (ETB)" className="rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={addExpense} className="rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity">Add</button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(byCategory).map(([cat, amt]) => (
            <div key={cat} className="flex items-center gap-3">
              <span className="text-xs font-medium w-20">{cat}</span>
              <div className="flex-1 h-3 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(amt / total) * 100}%`, background: catColors[cat] }} />
              </div>
              <span className="text-xs w-16 text-right">{amt} ETB</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">Recent Expenses</h3>
        <div className="space-y-2">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between rounded-lg p-3 bg-secondary/40 hover:bg-secondary/60 transition-colors">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: catColors[e.category] }} />
                <div>
                  <p className="text-sm font-medium">{e.desc}</p>
                  <p className="text-xs text-muted-foreground">{e.category} · {e.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{e.amount} ETB</span>
                <button onClick={() => removeExpense(e.id)} className="text-muted-foreground hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 3. PRODUCT DELIVERY SYSTEM DEMO
// ============================================================
export function ProductDeliveryDemo() {
  const [trackingId, setTrackingId] = useState("DLV-2025-0042")
  const [searched, setSearched] = useState(false)

  const orders = [
    { id: "DLV-2025-0042", product: "Wireless Headphones", status: "in_transit", agent: "Abebe D.", eta: "2 hours", from: "Addis Ababa", to: "Injibara" },
    { id: "DLV-2025-0041", product: "Flutter Programming Book", status: "delivered", agent: "Hanan T.", eta: "Delivered", from: "Gondar", to: "Injibara" },
    { id: "DLV-2025-0040", product: "USB-C Cable (2m)", status: "dispatched", agent: "Yonas G.", eta: "5 hours", from: "Addis Ababa", to: "Bahir Dar" },
  ]

  const statusConfig: Record<string, { icon: typeof Truck; label: string; color: string }> = {
    dispatched: { icon: Package, label: "Dispatched", color: "#f59e0b" },
    in_transit: { icon: Truck, label: "In Transit", color: "#06b6d4" },
    delivered: { icon: CheckCircle2, label: "Delivered", color: "#22c55e" },
  }

  const foundOrder = orders.find(o => o.id === trackingId)
  const steps = ["Order Placed", "Dispatched", "In Transit", "Out for Delivery", "Delivered"]
  const statusIndex = foundOrder ? (foundOrder.status === "dispatched" ? 1 : foundOrder.status === "in_transit" ? 2 : 4) : 0

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Search className="h-5 w-5 text-accent" /> Track Your Order</h3>
        <div className="flex gap-2">
          <input value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="Enter tracking ID (e.g. DLV-2025-0042)" className="flex-1 rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          <button onClick={() => setSearched(true)} className="rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90">Track</button>
        </div>
      </div>

      {searched && foundOrder && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">{foundOrder.product}</p>
              <p className="text-xs text-muted-foreground">Order #{foundOrder.id}</p>
            </div>
            <Badge style={{ background: `${statusConfig[foundOrder.status].color}20`, color: statusConfig[foundOrder.status].color, border: 0 }}>
              {statusConfig[foundOrder.status].label}
            </Badge>
          </div>

          <div className="flex items-center justify-between mb-6">
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${i <= statusIndex ? "bg-gradient-brand text-primary-foreground" : "bg-secondary/60 text-muted-foreground"}`}>
                  {i < statusIndex ? "✓" : i + 1}
                </div>
                <p className="text-[10px] mt-1 text-center hidden sm:block">{step}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div><p className="text-xs text-muted-foreground">From</p><p className="text-sm font-medium">{foundOrder.from}</p></div>
            <div><p className="text-xs text-muted-foreground">To</p><p className="text-sm font-medium">{foundOrder.to}</p></div>
            <div><p className="text-xs text-muted-foreground">Agent</p><p className="text-sm font-medium">{foundOrder.agent}</p></div>
            <div><p className="text-xs text-muted-foreground">ETA</p><p className="text-sm font-medium text-accent">{foundOrder.eta}</p></div>
          </div>
        </motion.div>
      )}

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">All Active Deliveries</h3>
        <div className="space-y-2">
          {orders.map(o => {
            const SIcon = statusConfig[o.status].icon
            return (
              <div key={o.id} className="flex items-center justify-between rounded-lg p-3 bg-secondary/40 hover:bg-secondary/60 transition-colors cursor-pointer" onClick={() => { setTrackingId(o.id); setSearched(true) }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${statusConfig[o.status].color}20`, color: statusConfig[o.status].color }}>
                    <SIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{o.product}</p>
                    <p className="text-xs text-muted-foreground">#{o.id} · {o.from} → {o.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium" style={{ color: statusConfig[o.status].color }}>{statusConfig[o.status].label}</p>
                  <p className="text-xs text-muted-foreground">{o.eta}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 4. COURSE REGISTRATION SYSTEM DEMO
// ============================================================
export function CourseRegistrationDemo() {
  const [registered, setRegistered] = useState<string[]>(["CS301 — Data Structures"])
  const [search, setSearch] = useState("")

  const courses = [
    { code: "CS301", title: "Data Structures", credits: 3, seats: 0, total: 60, prereq: "CS201", instructor: "Dr. Abebe" },
    { code: "CS302", title: "Object-Oriented Programming", credits: 4, seats: 15, total: 50, prereq: "CS201", instructor: "Dr. Sara" },
    { code: "IS401", title: "Database Management Systems", credits: 3, seats: 8, total: 40, prereq: "IS201", instructor: "Dr. Yonas" },
    { code: "IS402", title: "System Analysis & Design", credits: 3, seats: 22, total: 45, prereq: "IS201", instructor: "Dr. Hanan" },
    { code: "CS405", title: "Mobile App Development", credits: 4, seats: 3, total: 30, prereq: "CS302", instructor: "Dr. Abebe" },
    { code: "IS403", title: "Software Engineering", credits: 3, seats: 12, total: 35, prereq: "IS201", instructor: "Dr. Sara" },
  ]

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  )

  const toggleRegister = (courseCode: string) => {
    const courseStr = `${courseCode.split(' ')[0]} — ${courses.find(c => c.code === courseCode.split(' ')[0])?.title}`
    if (registered.includes(courseStr)) {
      setRegistered(registered.filter(r => r !== courseStr))
    } else {
      setRegistered([...registered, courseStr])
    }
  }

  const totalCredits = registered.reduce((sum, r) => {
    const code = r.split(' — ')[0]
    return sum + (courses.find(c => c.code === code)?.credits || 0)
  }, 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase">Registered Courses</p>
          <p className="text-2xl font-bold text-accent">{registered.length}</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase">Total Credits</p>
          <p className="text-2xl font-bold text-amber-400">{totalCredits}</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-accent" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="flex-1 rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
        </div>
        <div className="space-y-2">
          {filtered.map(c => {
            const isRegistered = registered.some(r => r.startsWith(c.code))
            const isFull = c.seats === 0
            return (
              <div key={c.code} className="flex items-center justify-between rounded-lg p-3 bg-secondary/40 hover:bg-secondary/60 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-accent">{c.code}</span>
                    <p className="text-sm font-medium truncate">{c.title}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{c.credits} credits</span>
                    <span className="text-xs text-muted-foreground">{c.instructor}</span>
                    <span className={`text-xs ${isFull ? "text-red-400" : "text-green-400"}`}>
                      {isFull ? "Full" : `${c.seats} seats left`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRegister(c.code)}
                  disabled={isFull && !isRegistered}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ml-3 ${isRegistered ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : isFull ? "bg-secondary/40 text-muted-foreground cursor-not-allowed" : "bg-gradient-brand text-primary-foreground hover:opacity-90"}`}
                >
                  {isRegistered ? "Drop" : "Register"}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> Your Registration</h3>
        <div className="space-y-2">
          {registered.length === 0 ? <p className="text-sm text-muted-foreground">No courses registered yet.</p> : registered.map(r => (
            <div key={r} className="flex items-center justify-between rounded-lg p-3 bg-green-500/10 border border-green-500/20">
              <span className="text-sm font-medium">{r}</span>
              <button onClick={() => toggleRegister(r.split(' — ')[0])} className="text-xs text-red-400 hover:text-red-500">Drop</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 5. EVALUATION MANAGEMENT SYSTEM DEMO
// ============================================================
export function EvaluationDemo() {
  const [submitted, setSubmitted] = useState(false)
  const [ratings, setRatings] = useState({ clarity: 0, knowledge: 0, engagement: 0, fairness: 0 })
  const [comment, setComment] = useState("")

  const questions = [
    { key: "clarity", label: "Clarity of explanations" },
    { key: "knowledge", label: "Depth of subject knowledge" },
    { key: "engagement", label: "Student engagement & interaction" },
    { key: "fairness", label: "Fairness in grading" },
  ]

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">Course: Information System (IS401)</p>
            <p className="text-xs text-muted-foreground">Instructor: Dr. Abebe · Semester: Fall 2025</p>
          </div>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <p className="text-lg font-semibold">Evaluation Submitted!</p>
            <p className="text-sm text-muted-foreground mt-2">Thank you for your feedback. Your response has been recorded.</p>
            <button onClick={() => { setSubmitted(false); setRatings({ clarity: 0, knowledge: 0, engagement: 0, fairness: 0 }); setComment("") }} className="mt-4 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/20 transition-all">
              Submit Another
            </button>
          </motion.div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Rate Your Instructor</h3>
            <div className="space-y-4">
              {questions.map(q => (
                <div key={q.key}>
                  <p className="text-sm font-medium mb-2">{q.label}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        onClick={() => setRatings({ ...ratings, [q.key]: n })}
                        className={`h-8 w-8 rounded-lg text-sm font-semibold transition-all ${ratings[q.key as keyof typeof ratings] >= n ? "bg-amber-400/30 text-amber-400" : "bg-secondary/60 text-muted-foreground hover:bg-secondary"}`}
                      >
                        <Star className={`h-4 w-4 mx-auto ${ratings[q.key as keyof typeof ratings] >= n ? "fill-current" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Additional Comments</p>
              <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Share your thoughts..." className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
            </div>

            <button onClick={handleSubmit} disabled={!Object.values(ratings).every(r => r > 0)} className="mt-4 w-full rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Submit Evaluation
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================
// 6. LIBRARY MANAGEMENT DEMO
// ============================================================
export function LibraryDemo() {
  const [search, setSearch] = useState("")
  const [borrowed, setBorrowed] = useState<string[]>([])

  const books = [
    { id: "B001", title: "Clean Code", author: "Robert C. Martin", category: "Programming", available: true, copies: 3 },
    { id: "B002", title: "Database System Concepts", author: "Silberschatz", category: "Database", available: true, copies: 2 },
    { id: "B003", title: "Flutter in Action", author: "Eric Windmill", category: "Mobile Dev", available: false, copies: 0 },
    { id: "B004", title: "Introduction to Algorithms", author: "Cormen et al.", category: "CS", available: true, copies: 5 },
    { id: "B005", title: "Operating System Concepts", author: "Silberschatz", category: "CS", available: true, copies: 4 },
    { id: "B006", title: "Data Structures & Algorithms", author: "Michael McMillan", category: "Programming", available: true, copies: 2 },
    { id: "B007", title: "Software Engineering", author: "Sommerville", category: "SE", available: false, copies: 0 },
    { id: "B008", title: "React Up and Running", author: "Stoyan Stefanov", category: "Web Dev", available: true, copies: 1 },
  ]

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  )

  const toggleBorrow = (id: string) => {
    if (borrowed.includes(id)) setBorrowed(borrowed.filter(b => b !== id))
    else setBorrowed([...borrowed, id])
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Books</p>
          <p className="text-xl font-bold text-accent">{books.length}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Available</p>
          <p className="text-xl font-bold text-green-400">{books.filter(b => b.available).length}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">My Loans</p>
          <p className="text-xl font-bold text-amber-400">{borrowed.length}</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Library className="h-5 w-5 text-accent" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, author, or category..." className="flex-1 rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
        </div>
        <div className="space-y-2">
          {filtered.map(b => {
            const isBorrowed = borrowed.includes(b.id)
            return (
              <div key={b.id} className="flex items-center justify-between rounded-lg p-3 bg-secondary/40 hover:bg-secondary/60 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{b.title}</p>
                    <p className="text-xs text-muted-foreground">{b.author} · {b.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className={`text-xs ${b.available ? "text-green-400" : "text-red-400"}`}>
                    {b.available ? `${b.copies} copies` : "Out of stock"}
                  </span>
                  <button
                    onClick={() => toggleBorrow(b.id)}
                    disabled={!b.available && !isBorrowed}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${isBorrowed ? "bg-red-500/20 text-red-400" : b.available ? "bg-gradient-brand text-primary-foreground hover:opacity-90" : "bg-secondary/40 text-muted-foreground cursor-not-allowed"}`}
                  >
                    {isBorrowed ? "Return" : "Borrow"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {borrowed.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-400" /> My Borrowed Books</h3>
          <div className="space-y-2">
            {borrowed.map(id => {
              const b = books.find(bk => bk.id === id)
              return b ? (
                <div key={id} className="flex items-center justify-between rounded-lg p-3 bg-green-500/10 border border-green-500/20">
                  <span className="text-sm font-medium">{b.title}</span>
                  <button onClick={() => toggleBorrow(id)} className="text-xs text-red-400 hover:text-red-500">Return</button>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
