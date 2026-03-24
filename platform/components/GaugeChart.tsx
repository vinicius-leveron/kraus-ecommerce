'use client'

import { useEffect, useState } from 'react'
import { useCountUp } from '@/lib/useCountUp'

interface GaugeChartProps {
  value: number
  maxValue?: number
  label: string
  sublabel?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  showTarget?: boolean
  target?: number
}

const sizeClasses = {
  sm: { width: 120, stroke: 8, fontSize: 'text-xl', labelSize: 'text-xs' },
  md: { width: 160, stroke: 10, fontSize: 'text-3xl', labelSize: 'text-sm' },
  lg: { width: 200, stroke: 12, fontSize: 'text-4xl', labelSize: 'text-base' }
}

const colorClasses = {
  blue: { stroke: '#6B7280', gradient: ['#6B7280', '#4B5563'] },
  green: { stroke: '#10B981', gradient: ['#10B981', '#059669'] },
  orange: { stroke: '#F97316', gradient: ['#F97316', '#EA580C'] },
  purple: { stroke: '#9CA3AF', gradient: ['#9CA3AF', '#6B7280'] },
  red: { stroke: '#EF4444', gradient: ['#EF4444', '#DC2626'] }
}

export default function GaugeChart({
  value,
  maxValue = 100,
  label,
  sublabel,
  size = 'md',
  color = 'blue',
  showTarget = false,
  target = 80
}: GaugeChartProps) {
  const [isAnimated, setIsAnimated] = useState(false)
  const { count } = useCountUp({ end: value, duration: 1500, delay: 300 })

  const sizeConfig = sizeClasses[size]
  const colorConfig = colorClasses[color]

  const radius = (sizeConfig.width - sizeConfig.stroke) / 2
  const circumference = radius * Math.PI // Half circle
  const progress = (count / maxValue) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const gradientId = `gauge-gradient-${color}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: sizeConfig.width, height: sizeConfig.width / 2 + 20 }}>
        <svg
          width={sizeConfig.width}
          height={sizeConfig.width / 2 + 10}
          className="transform rotate-0"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorConfig.gradient[0]} />
              <stop offset="100%" stopColor={colorConfig.gradient[1]} />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d={`M ${sizeConfig.stroke / 2} ${sizeConfig.width / 2}
                A ${radius} ${radius} 0 0 1 ${sizeConfig.width - sizeConfig.stroke / 2} ${sizeConfig.width / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={sizeConfig.stroke}
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            d={`M ${sizeConfig.stroke / 2} ${sizeConfig.width / 2}
                A ${radius} ${radius} 0 0 1 ${sizeConfig.width - sizeConfig.stroke / 2} ${sizeConfig.width / 2}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={sizeConfig.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isAnimated ? circumference - progress : circumference}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out'
            }}
          />

          {/* Target marker */}
          {showTarget && (
            <>
              {/* Target line */}
              <line
                x1={sizeConfig.width / 2 + radius * Math.cos(Math.PI * (1 - target / maxValue))}
                y1={sizeConfig.width / 2 - radius * Math.sin(Math.PI * (1 - target / maxValue))}
                x2={sizeConfig.width / 2 + (radius - 15) * Math.cos(Math.PI * (1 - target / maxValue))}
                y2={sizeConfig.width / 2 - (radius - 15) * Math.sin(Math.PI * (1 - target / maxValue))}
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </>
          )}
        </svg>

        {/* Center text */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ bottom: 0 }}
        >
          <span className={`${sizeConfig.fontSize} font-bold text-gray-900 tabular-nums`}>
            {Math.round(count)}%
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center mt-2">
        <p className={`font-medium text-gray-900 ${sizeConfig.labelSize}`}>{label}</p>
        {sublabel && (
          <p className="text-xs text-gray-500 mt-0.5">{sublabel}</p>
        )}
        {showTarget && (
          <p className="text-xs text-gray-400 mt-1">
            Meta: {target}%
          </p>
        )}
      </div>
    </div>
  )
}

export function AutomationDashboard() {
  const modules = [
    { label: 'Atendimento', value: 78, color: 'blue' as const, sublabel: '156 msgs automatizadas' },
    { label: 'Estoque', value: 45, color: 'green' as const, sublabel: '23 entradas via IA' },
    { label: 'Anuncios', value: 62, color: 'orange' as const, sublabel: '18 anuncios gerados' },
    { label: 'Financeiro', value: 85, color: 'purple' as const, sublabel: '42 lancamentos auto' }
  ]

  const avgAutomation = Math.round(modules.reduce((acc, m) => acc + m.value, 0) / modules.length)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Taxa de Automacao</h3>
          <p className="text-sm text-gray-500">Por modulo da plataforma</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">{avgAutomation}%</p>
          <p className="text-xs text-gray-500">media geral</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {modules.map((module) => (
          <GaugeChart
            key={module.label}
            value={module.value}
            label={module.label}
            sublabel={module.sublabel}
            color={module.color}
            size="sm"
            showTarget
            target={80}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-900">Progresso este mes</p>
            <p className="text-sm text-green-700">Automacao aumentou 12% em relacao ao mes anterior</p>
          </div>
        </div>
      </div>
    </div>
  )
}
