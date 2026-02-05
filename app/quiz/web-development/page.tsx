'use client'

import { useState } from 'react'
import { WebDevQuiz } from '@/components/web-dev-quiz'
import { QuizResults } from '@/components/quiz-results'

export default function WebDevelopmentQuizPage() {
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState({ score: 0, total: 0 })
  const [questionState, setQuestionState] = useState(false)
  const handleComplete = (score: number, total: number) => {
    setResults({ score, total })
    setCompleted(true)
  }

  if (completed) {
    return (
      <QuizResults
        score={results.score}
        total={results.total}
        trackName="Web Development Track"
        trackType="web-development"
        setCompleted={setCompleted}

      />
    )
  }

  return <WebDevQuiz onComplete={handleComplete} questionState={questionState} setQuestionState={setQuestionState} />
}
