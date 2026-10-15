import type { LucideIcon } from "lucide-react"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Dribbble,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  instagram: Instagram,
  dribbble: Dribbble,
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
