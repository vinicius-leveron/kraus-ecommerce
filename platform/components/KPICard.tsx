'use client'

import { useCountUp, formatCurrency, formatNumber } from '@/lib/useCountUp'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: number
  subtitle: string
  icon: LucideIcon
  trend?: {
    value: string
    positive?: boolean
  }
  format?: 'currency' | 'number' | 'percentage'
  decimals?: number
  color?: 'default' | 'green' | 'blue' | 'red' | 'purple' | 'orange'
  delay?: number
  prefix?: string
  suffix?: string
}

const colorClasses = {
  default: {
    card: 'bg-white border-gray-200',
    icon: 'text-gray-400',
    value: 'text-gray-900',
    subtitle: 'text-gray-500'
  },
  green: {
    card: 'bg-white border-gray-200',
    icon: 'text-green-500',
    value: 'text-green-600',
    subtitle: 'text-gray-500'
  },
  blue: {
    card: 'bg-white border-gray-200',
    icon: 'text-blue-500',
    value: 'text-blue-600',
    subtitle: 'text-gray-500'
  },
  red: {
    card: 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200',
    icon: 'text-red-500',
    value: 'text-red-600',
    subtitle: 'text-red-500'
  },
  purple: {
    card: 'bg-white border-gray-200',
    icon: 'text-purple-500',
    value: 'text-purple-600',
    subtitle: 'text-gray-500'
  },
  orange: {
    card: 'bg-white border-gray-200',
    icon: 'text-orange-500',
    value: 'text-orange-600',
    subtitle: 'text-gray-500'
  }
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  format = 'number',
  decimals = 0,
  color = 'default',
  delay = 0,
  prefix = '',
  suffix = ''
}: KPICardProps) {
  const { count } = useCountUp({
    end: value,
    duration: 2000,
    decimals: format === 'currency' ? 0 : decimals,
    delay
  })

  const colors = colorClasses[color]

  const formatValue = (val: number) => {
    if (format === 'currency') {
      return `R$ ${formatCurrency(val)}`
    }
    if (format === 'percentage') {
      return `${formatNumber(val, decimals)}%`
    }
    return formatNumber(val, decimals)
  }

  return (
    <div
      className={`
        ${colors.card}
        rounded-xl p-4 border
        transform transition-all duration-500 ease-out
        hover:shadow-lg hover:-translate-y-1
        animate-fade-in-up
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards'
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>
      <p className={`text-2xl font-bold mt-1 ${colors.value} tabular-nums`}>
        {prefix}{formatValue(count)}{suffix}
      </p>
      <div className="flex items-center justify-between mt-1">
        <p className={`text-xs ${colors.subtitle}`}>{subtitle}</p>
        {trend && (
          <span className={`text-xs font-medium ${
            trend.positive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  )
}
