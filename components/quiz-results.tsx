'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trophy, Home } from 'lucide-react'

interface ResultsProps {
  score: number
  total: number
  trackName: string
  trackType: 'web-development' | 'data-analysis' | 'product-design'
  setCompleted: (completed: boolean) => void
}

export function QuizResults({ score, total, trackName, trackType, setCompleted }: ResultsProps) {
  const percentage = Math.round((score / total) * 100)
  const Learningtrack = [
    {
      trackType: 'web-development',
      track: "Web Development"
    },
    {
      trackType: 'data-analysis',
      track: "Data Analytics"
    },
    {
      trackType: 'product-design',
      track: "Product Design"
    }
  ]
  const getPerformanceLevel = (percent: number) => {
    if (percent === 100) return { level: 'Perfect!', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950' }
    if (percent >= 80) return { level: 'Excellent!', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950' }
    if (percent >= 60) return { level: 'Good!', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950' }
    if (percent >= 40) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950' }
    return { level: 'Keep Practicing!', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950' }
  }

  const performance = getPerformanceLevel(percentage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        {/* Trophy Icon */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Main Results Card */}
        <Card className="p-8 md:p-12 mb-8 border-2 border-border">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-lg text-muted-foreground">{trackName}</p>
          </div>

          {/* Score Display */}
          <div className={`${performance.bg} rounded-2xl p-8 mb-8`}>
            <div className="flex justify-center items-end gap-4 mb-4">
              <div className="text-6xl font-bold text-foreground">{score}</div>
              <div className="text-2xl text-muted-foreground mb-2">/ {total}</div>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold ${performance.color} mb-2`}>
                {performance.level}
              </p>
              <p className="text-lg text-foreground">
                You scored <span className="font-bold">{percentage}%</span>
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Correct</p>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{total - score}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">{percentage}%</p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="bg-muted rounded-lg p-6 mb-8">
            <p className="text-foreground text-center">
              {percentage === 100 && "Outstanding! You've mastered this quiz. Consider trying the other track!"}
              {percentage >= 80 && percentage < 100 && "Great job! You have a strong understanding of this topic."}
              {percentage >= 60 && percentage < 80 && "Good effort! Review the concepts and try again to improve."}
              {percentage >= 40 && percentage < 60 && "You're on the right track. Keep studying and retake the quiz!"}
              {percentage < 40 && "Don't give up! Review the material and try again. Each attempt helps you learn."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/quiz/${trackType}`} className="w-full">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setCompleted(false)}
              >
                Retake Quiz
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button
                className={`w-full ${trackType === 'web-development'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Switch Track Option */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              Want to try the other track?
            </p>
            {
              Learningtrack.map((trackobj,idx) => (trackType !== trackobj.trackType &&
                <Link
                  key={idx}
                  href={trackType !== trackobj.trackType ? trackobj.trackType : ''}
                  className="w-full "
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent mb-2"
                  >
                    {trackobj.track}
                  </Button>
                </Link>))

            }
          </div>
        </Card>
      </div>
    </div>
  )
}
