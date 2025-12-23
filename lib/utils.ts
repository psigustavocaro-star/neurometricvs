import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TITLE_MAP: Record<string, string> = {
  'psi': 'Ps.',
  'psic': 'Ps.',
  'dr': 'Dr.',
  'dra': 'Dra.',
  'lic': 'Lic.',
  'médico': 'Dr.',
  'medico': 'Dr.',
  'médica': 'Dra.',
  'medica': 'Dra.'
}

export function getUserDisplayData(user: any, profile?: any) {
  const email = user?.email || ''
  const metadata = user?.user_metadata || {}

  // 1. Determine Base Name
  let rawName = profile?.full_name || metadata?.full_name || ''
  const specialty = profile?.specialty || ''

  if (!rawName && email) {
    // Fallback to email prefix
    const prefix = email.split('@')[0]
    rawName = prefix
      .split(/[\._]/)
      .map((part: string) => {
        const lower = part.toLowerCase()
        if (TITLE_MAP[lower]) return TITLE_MAP[lower]
        return part.charAt(0).toUpperCase() + part.slice(1)
      })
      .join(' ')
  }

  // 2. Add Title if missing but inferred from specialty
  let finalName = rawName || 'Usuario'
  const lowerName = finalName.toLowerCase()
  const hasTitle = Object.values(TITLE_MAP).some(t => lowerName.startsWith(t.toLowerCase()))

  if (!hasTitle && specialty) {
    const lowerSpec = specialty.toLowerCase()
    if (lowerSpec.includes('psic')) finalName = `Ps. ${finalName}`
    else if (lowerSpec.includes('psiquiatr') || lowerSpec.includes('médic') || lowerSpec.includes('medico')) finalName = `Dr. ${finalName}`
  }

  // 3. Determine Initials (ignoring titles)
  let initials = 'U'
  if (finalName) {
    const parts = finalName.split(/\s+/).filter((p: string) => p.length > 0)
    // Filter out parts that are known titles
    const initialsParts = parts.filter((p: string) => !Object.values(TITLE_MAP).some(t => t.toLowerCase() === p.toLowerCase() || (p.toLowerCase().startsWith(t.toLowerCase()) && p.endsWith('.'))))

    const targetParts = initialsParts.length > 0 ? initialsParts : parts
    initials = targetParts
      .map((p: string) => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return {
    displayName: finalName,
    initials: initials
  }
}
