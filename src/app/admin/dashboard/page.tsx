"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard, FolderGit2, Sparkles, Users, User, LogOut,
  Plus, Trash2, Edit3, Save, X, ArrowLeft, Code2,
} from "lucide-react"
import { projects as initialProjects, skillCategories as initialSkills, testimonials as initialTestimonials, profile as initialProfile, services as initialServices, techProgress as initialTechProgress } from "@/lib/portfolio-data"
import { TechProgress as TechProgressType } from "@/lib/portfolio-data"

type Tab = "overview" | "projects" | "skills" | "testimonials" | "profile" | "tech"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [authChecked, setAuthChecked] = useState(false)

  const [projects, setProjects] = useState(initialProjects)
  const [skills, setSkills] = useState(initialSkills)
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [profile, setProfile] = useState(initialProfile)
  const [techProgress, setTechProgress] = useState<TechProgressType[]>(initialTechProgress)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) { router.push("/admin"); return }
    const expires = localStorage.getItem("admin_expires")
    if (expires && new Date(expires) < new Date()) {
      localStorage.removeItem("admin_token"); router.push("/admin"); return
    }
    setAuthChecked(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_email")
    localStorage.removeItem("admin_expires")
    router.push("/admin")
  }

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
  }

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Sparkles },
    { id: "testimonials", label: "Testimonials", icon: Users },
    { id: "tech", label: "Tech Progress", icon: Sparkles },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground"><Code2 className="h-5 w-5" /></span>
            <div><p className="text-sm font-semibold">Admin Dashboard</p><p className="text-xs text-muted-foreground">dires7481@gmail.com</p></div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors"><ArrowLeft className="h-3.5 w-3.5" /> Site</a>
            <button onClick={handleLogout} className="text-xs text-destructive hover:text-red-400 flex items-center gap-1 transition-colors rounded-lg px-3 py-1.5 hover:bg-destructive/10"><LogOut className="h-3.5 w-3.5" /> Logout</button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        <aside className="hidden sm:block w-56 min-h-[calc(100vh-4rem)] border-r border-border/40 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === item.id ? "bg-accent/15 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}>
                <Icon className="h-4 w-4" />{item.label}
              </button>
            )
          })}
        </aside>

        <div className="sm:hidden fixed top-16 left-0 right-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40 flex overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors ${activeTab === item.id ? "text-accent border-b-2 border-accent" : "text-muted-foreground"}`}>
                <Icon className="h-3.5 w-3.5" />{item.label}
              </button>
            )
          })}
        </div>

        <main className="flex-1 p-4 sm:p-6 pt-20 sm:pt-6 overflow-x-hidden">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Projects", value: projects.length, icon: FolderGit2, color: "#06b6d4" },
                  { label: "Skill Categories", value: skills.length, icon: Sparkles, color: "#a855f7" },
                  { label: "Testimonials", value: testimonials.length, icon: Users, color: "#f59e0b" },
                  { label: "Services", value: initialServices.length, icon: LayoutDashboard, color: "#ec4899" },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div key={i} className="glass-card rounded-2xl p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-3" style={{ background: `${stat.color}20`, color: stat.color }}><Icon className="h-5 w-5" /></div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setActiveTab("projects")} className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">+ Manage Projects</button>
                  <button onClick={() => setActiveTab("skills")} className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">+ Manage Skills</button>
                  <button onClick={() => setActiveTab("testimonials")} className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">+ Manage Testimonials</button>
                  <button onClick={() => setActiveTab("profile")} className="rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">Edit Profile</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Projects ({projects.length})</h2>
                <button onClick={() => { setEditingId(-1) }} className="flex items-center gap-2 rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> Add Project</button>
              </div>
              <div className="space-y-3">
                {projects.map((p, i) => (
                  <div key={i} className="glass-card rounded-xl p-4">
                    {editingId === i ? (
                      <ProjectEditForm data={p} onSave={(d) => { setProjects(prev => prev.map((x, j) => j === i ? { ...x, ...d } : x) as any); setEditingId(null) }} onCancel={() => setEditingId(null)} />
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {p.featured && <span className="text-xs rounded bg-amber-500/20 text-amber-400 px-2 py-0.5">Featured</span>}
                            <h3 className="text-sm font-semibold truncate">{p.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
                          <div className="flex flex-wrap gap-1">{p.tags.slice(0, 4).map(t => <span key={t} className="text-[10px] rounded bg-secondary/60 px-1.5 py-0.5">{t}</span>)}</div>
                        </div>
                        <div className="flex gap-2 ml-3 shrink-0">
                          <button onClick={() => setEditingId(i)} className="text-muted-foreground hover:text-accent p-2 rounded-lg hover:bg-accent/10 transition-colors"><Edit3 className="h-4 w-4" /></button>
                          <button onClick={() => setProjects(prev => prev.filter((_, j) => j !== i) as any)} className="text-muted-foreground hover:text-red-400 p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {editingId === -1 && (
                  <div className="glass-card rounded-xl p-4 border-2 border-accent/30">
                    <h3 className="text-sm font-semibold mb-3 text-accent">New Project</h3>
                    <ProjectEditForm data={{ title: "", description: "", tags: [], github: "", demo: "" }} onSave={(d) => { setProjects(prev => [...prev, { ...d, slug: d.title.toLowerCase().replace(/\s+/g, "-"), features: [], longDescription: "", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" } as any]); setEditingId(null) }} onCancel={() => setEditingId(null)} />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">Skill Categories ({skills.length})</h2>
              <div className="space-y-3">
                {skills.map((cat, i) => (
                  <div key={i} className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">{cat.title} ({cat.skills.length})</h3>
                      <button onClick={() => setSkills(prev => prev.filter((_, j) => j !== i) as any)} className="text-muted-foreground hover:text-red-400 p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="space-y-2">
                      {cat.skills.map((s, j) => (
                        <div key={j} className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
                          <div><p className="text-xs font-medium">{s.name}</p><p className="text-[10px] text-muted-foreground">{s.description}</p></div>
                          <button onClick={() => setSkills(prev => prev.map((c, k) => k === i ? { ...c, skills: c.skills.filter((_, l) => l !== j) } : c) as any)} className="text-muted-foreground hover:text-red-400"><X className="h-3 w-3" /></button>
                        </div>
                      ))}
                      <button onClick={() => setSkills(prev => prev.map((c, k) => k === i ? { ...c, skills: [...c.skills, { name: "New Skill", description: "Description here" }] } : c) as any)} className="text-xs text-accent flex items-center gap-1 hover:opacity-80"><Plus className="h-3 w-3" /> Add skill</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "testimonials" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Testimonials ({testimonials.length})</h2>
                <button onClick={() => setTestimonials(prev => [...prev, { quote: "New testimonial", name: "New Person", title: "Title", organization: "Org", avatar: "NP", accentColor: "cyan" } as any])} className="flex items-center gap-2 rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> Add Testimonial</button>
              </div>
              <div className="space-y-3">
                {testimonials.map((t, i) => (
                  <div key={i} className="glass-card rounded-xl p-4">
                    {editingTestimonial === i ? (
                      <TestimonialEditForm data={t} onSave={(d) => { setTestimonials(prev => prev.map((x, j) => j === i ? { ...x, ...d } : x) as any); setEditingTestimonial(null) }} onCancel={() => setEditingTestimonial(null)} />
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold">{t.avatar}</div>
                            <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{t.title} · {t.organization}</p></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                        </div>
                        <div className="flex gap-2 ml-3 shrink-0">
                          <button onClick={() => setEditingTestimonial(i)} className="text-muted-foreground hover:text-accent p-2 rounded-lg hover:bg-accent/10 transition-colors"><Edit3 className="h-4 w-4" /></button>
                          <button onClick={() => setTestimonials(prev => prev.filter((_, j) => j !== i) as any)} className="text-muted-foreground hover:text-red-400 p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Tech Progress ({techProgress.length})</h2>
                <button onClick={() => setTechProgress(prev => [...prev, { name: "New Tech", level: 50, color: "#06b6d4" }])} className="flex items-center gap-2 rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> Add Tech</button>
              </div>
              <div className="space-y-3">
                {techProgress.map((tech, i) => (
                  <div key={i} className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <input value={tech.name} onChange={e => setTechProgress(prev => prev.map((t, j) => j === i ? { ...t, name: e.target.value } : t))} className="rounded-lg bg-secondary/60 border border-border/40 px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent w-40" />
                        <div className="flex items-center gap-2 flex-1">
                          <input type="range" min="0" max="100" value={tech.level} onChange={e => setTechProgress(prev => prev.map((t, j) => j === i ? { ...t, level: parseInt(e.target.value) } : t))} className="flex-1 accent-accent" />
                          <span className="text-sm font-mono text-muted-foreground w-10 text-right">{tech.level}%</span>
                        </div>
                      </div>
                      <button onClick={() => setTechProgress(prev => prev.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-400 p-2 rounded-lg hover:bg-destructive/10 ml-2"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${tech.level}%`, background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              <div className="glass-card rounded-2xl p-6 space-y-4 max-w-2xl">
                {[
                  { key: "name", label: "Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: "Phone", type: "text" },
                  { key: "location", label: "Location", type: "text" },
                  { key: "tagline", label: "Tagline", type: "textarea" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium text-foreground block mb-1.5">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea value={(profile as any)[field.key]} onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))} rows={3} className="w-full rounded-xl bg-secondary/60 border border-border/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none" />
                    ) : (
                      <input type={field.type} value={(profile as any)[field.key]} onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))} className="w-full rounded-xl bg-secondary/60 border border-border/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => alert("Profile updated (demo — changes are in-memory).")} className="flex items-center gap-2 rounded-lg bg-gradient-brand text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90"><Save className="h-4 w-4" /> Save Changes</button>
                  <button onClick={() => setProfile(initialProfile)} className="flex items-center gap-2 rounded-lg border border-border/40 px-4 py-2.5 text-sm font-medium hover:bg-secondary/60 transition-colors"><X className="h-4 w-4" /> Reset</button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

function ProjectEditForm({ data, onSave, onCancel }: { data: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(data.title || "")
  const [description, setDescription] = useState(data.description || "")
  const [tagsStr, setTagsStr] = useState((data.tags || []).join(", "))
  const [github, setGithub] = useState(data.github || "")
  const [demo, setDemo] = useState(data.demo || "")

  return (
    <div className="space-y-3">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project title" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={2} className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
      <input value={tagsStr} onChange={e => setTagsStr(e.target.value)} placeholder="Tags (comma-separated)" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub URL" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <input value={demo} onChange={e => setDemo(e.target.value)} placeholder="Demo URL" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ title, description, tags: tagsStr.split(",").map(t => t.trim()).filter(Boolean), github, demo })} className="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium hover:bg-secondary/60"><X className="h-3.5 w-3.5" /> Cancel</button>
      </div>
    </div>
  )
}

function TestimonialEditForm({ data, onSave, onCancel }: { data: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [quote, setQuote] = useState(data.quote || "")
  const [name, setName] = useState(data.name || "")
  const [title, setTitle] = useState(data.title || "")
  const [organization, setOrganization] = useState(data.organization || "")
  const [avatar, setAvatar] = useState(data.avatar || "")

  return (
    <div className="space-y-3">
      <textarea value={quote} onChange={e => setQuote(e.target.value)} placeholder="Quote" rows={3} className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <input value={organization} onChange={e => setOrganization(e.target.value)} placeholder="Organization" className="w-full rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar initials (e.g. AB)" maxLength={3} className="w-32 rounded-lg bg-secondary/60 border border-border/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ quote, name, title, organization, avatar })} className="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"><Save className="h-3.5 w-3.5" /> Save</button>
        <button onClick={onCancel} className="flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium hover:bg-secondary/60"><X className="h-3.5 w-3.5" /> Cancel</button>
      </div>
    </div>
  )
}