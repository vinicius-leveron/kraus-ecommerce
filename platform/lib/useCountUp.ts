'use client'

import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
  delay?: number
  onComplete?: () => void
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  delay = 0,
  onComplete
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)
  const [isComplete, setIsComplete] = useState(false)
  const countRef = useRef(start)
  const frameRef = useRef<number>()

  useEffect(() => {
    const startTime = Date.now() + delay
    const difference = end - start

    const animate = () => {
      const now = Date.now()

      if (now < startTime) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function: easeOutExpo
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const currentCount = start + (difference * easeOutExpo)
      countRef.current = currentCount
      setCount(Number(currentCount.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
        onComplete?.()
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration, decimals, delay, onComplete])

  return { count, isComplete }
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}
