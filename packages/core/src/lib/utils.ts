import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
export { cva, type VariantProps } from 'class-variance-authority'
export { clsx } from 'clsx'
