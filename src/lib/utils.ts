import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getContrastColor(bgColor: string): string {
  // Simple implementation - can be enhanced
  return bgColor.includes('dark') ? 'light' : 'dark'
}