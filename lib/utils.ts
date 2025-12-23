import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TITLES = ['psi', 'dr', 'dra', 'psic', 'lic']

export function getUserDisplayData(user: any, profile?: any) {
  const email = user?.email || ''
  const metadata = user?.user_metadata || {}

  // 1. Determine Display Name
  let rawName = profile?.full_name || metadata?.full_name || ''

  if (!rawName && email) {
    // Fallback to email prefix
    const prefix = email.split('@')[0]
    rawName = prefix
      .split(/[\._]/)
      .map(part => {
        const lower = part.toLowerCase()
        if (TITLES.includes(lower)) {
          return lower.charAt(0).toUpperCase() + lower.slice(1) + '.'
        }
        return part.charAt(0).toUpperCase() + part.slice(1)
      })
      .join(' ')
  }

  // 2. Determine Initials
  let initials = 'U'
  if (rawName) {
    const parts = rawName.split(/\s+/).filter(p => p.length > 0)
    // Filter out titles for initials
    const initialsParts = parts.filter(p => !TITLES.some(t => p.toLowerCase().startsWith(t.toLowerCase()) && p.endsWith('.')))

    const targetParts = initialsParts.length > 0 ? initialsParts : parts
    initials = targetParts
      .map(p => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return {
    displayName: rawName || 'Usuario',
    initials: initials
  }
}
