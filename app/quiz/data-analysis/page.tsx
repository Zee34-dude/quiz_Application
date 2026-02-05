'use client'

import { useState } from 'react'
import { DataAnalysisQuiz } from '@/components/data-analysis-quiz'
import { QuizResults } from '@/components/quiz-results'

export default function DataAnalysisQuizPage() {
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState({ score: 0, total: 0 })

  const handleComplete = (score: number, total: number) => {
    setResults({ score, total })
    setCompleted(true)
  }

  if (completed) {
    return (
      <QuizResults
        score={results.score}
        total={results.total}
        trackName="Data Analysis Track"
        trackType="data-analysis"
      />
    )
  }

  return <DataAnalysisQuiz onComplete={handleComplete} />
}
