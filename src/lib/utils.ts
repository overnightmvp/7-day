/**
 * Utility function to merge CSS classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format currency values in Australian dollars
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format dates for display (Australian format)
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  }).format(new Date(date))
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get company domain from email
 */
export function getCompanyDomain(email: string): string {
  return email.split('@')[1] || ''
}

/**
 * Detect if email is from a common personal email provider
 */
export function isPersonalEmail(email: string): boolean {
  const personalDomains = [
    'gmail.com', 
    'yahoo.com', 
    'hotmail.com', 
    'outlook.com',
    'icloud.com',
    'aol.com'
  ]
  const domain = getCompanyDomain(email).toLowerCase()
  return personalDomains.includes(domain)
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}