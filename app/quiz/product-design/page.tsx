'use client'

import { useState } from 'react'
import { DataAnalysisQuiz } from '@/components/data-analysis-quiz'
import { QuizResults } from '@/components/quiz-results'
import { ProductDesignQuiz } from '@/components/product-design-quiz'

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
        setCompleted={ setCompleted}
        score={results.score}
        total={results.total}
        trackName="Product Design Track"
        trackType="product-design"
      />
    )
  }

  return <ProductDesignQuiz onComplete={handleComplete} />
}
