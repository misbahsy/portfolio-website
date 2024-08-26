import React from 'react'

export function Button({ children, variant = 'default', className, ...props }) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors'
  const variantClasses = variant === 'outline' ? 'border border-white' : 'bg-blue-500 hover:bg-blue-600'
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}
