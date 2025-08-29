import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'xs' | 'sm' | 'base' | 'lg'
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', icon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    
    const variantStyles = {
      default: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      success: "bg-green-100 text-green-800 hover:bg-green-200",
      warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      danger: "bg-red-100 text-red-800 hover:bg-red-200",
      info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
    }

    const sizeStyles = {
      xs: "px-2 py-0.5 text-xs",
      sm: "px-2.5 py-0.5 text-xs",
      base: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-sm"
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }