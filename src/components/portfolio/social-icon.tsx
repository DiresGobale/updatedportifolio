import type { LucideIcon } from "lucide-react"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Dribbble,
  Send,
  Music,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  instagram: Instagram,
  dribbble: Dribbble,
  telegram: Send, // paper plane — closest match to Telegram's icon
  tiktok: Music, // music note — closest match to TikTok's icon
}

export function SocialIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Mail
  return <Icon className={className} />
}
