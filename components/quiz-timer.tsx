'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface QuizTimerProps {
  initialMinutes: number
  onTimeUp: () => void
}

export function QuizTimer({ initialMinutes, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft < 300 // Less than 5 minutes

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
        isWarning
          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      }`}
    >
      <Clock className="w-5 h-5" />
      <span>
        {minutes}:{seconds < 10 ? '0' : ''}
        {seconds}
      </span>
    </div>
  )
}
