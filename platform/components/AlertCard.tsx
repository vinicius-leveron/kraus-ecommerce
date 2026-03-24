'use client'

import { AlertTriangle, ArrowRight, TrendingUp, Package, X } from 'lucide-react'
import { useState } from 'react'

interface AlertAction {
  label: string
  onClick?: () => void
}

interface AlertCardProps {
  type: 'warning' | 'info' | 'success' | 'danger'
  title: string
  description: string
  action?: AlertAction
  secondaryAction?: AlertAction
  dismissible?: boolean
  icon?: 'alert' | 'trending' | 'package'
}

const typeClasses = {
  warning: {
    bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    icon: 'bg-amber-100 text-amber-600',
    title: 'text-amber-900',
    description: 'text-amber-700',
    button: 'bg-amber-500 hover:bg-amber-600 text-white',
    secondaryButton: 'bg-amber-100 hover:bg-amber-200 text-amber-700'
  },
  info: {
    bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
    border: 'border-gray-200',
    icon: 'bg-gray-100 text-gray-600',
    title: 'text-gray-900',
    description: 'text-gray-700',
    button: 'bg-gray-600 hover:bg-gray-700 text-white',
    secondaryButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  },
  success: {
    bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    title: 'text-green-900',
    description: 'text-green-700',
    button: 'bg-green-500 hover:bg-green-600 text-white',
    secondaryButton: 'bg-green-100 hover:bg-green-200 text-green-700'
  },
  danger: {
    bg: 'bg-gradient-to-r from-red-50 to-rose-50',
    border: 'border-red-200',
    icon: 'bg-red-100 text-red-600',
    title: 'text-red-900',
    description: 'text-red-700',
    button: 'bg-red-500 hover:bg-red-600 text-white',
    secondaryButton: 'bg-red-100 hover:bg-red-200 text-red-700'
  }
}

const icons = {
  alert: AlertTriangle,
  trending: TrendingUp,
  package: Package
}

export default function AlertCard({
  type,
  title,
  description,
  action,
  secondaryAction,
  dismissible = true,
  icon = 'alert'
}: AlertCardProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const classes = typeClasses[type]
  const IconComponent = icons[icon]

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`
        ${classes.bg} ${classes.border}
        border rounded-xl p-4 shadow-sm
        animate-slide-in-right
        transition-all duration-300
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${classes.icon} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-semibold ${classes.title}`}>{title}</h4>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className={`text-sm ${classes.description} mt-1`}>{description}</p>

          {(action || secondaryAction) && (
            <div className="flex items-center gap-2 mt-3">
              {action && (
                <button
                  onClick={action.onClick}
                  className={`${classes.button} px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors`}
                >
                  {action.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className={`${classes.secondaryButton} px-3 py-1.5 rounded-lg text-sm font-medium transition-colors`}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AlertStack({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-20 right-6 w-96 space-y-3 z-50">
      {children}
    </div>
  )
}
