'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight } from 'lucide-react'
import { QuizTimer } from './quiz-timer'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const dataAnalysisQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the mean of the following numbers: 2, 4, 6, 8, 10?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'The mean is the sum of all numbers divided by the count: (2+4+6+8+10)/5 = 30/5 = 6.'
  },
  {
    id: 2,
    question: 'Which SQL keyword is used to sort query results?',
    options: ['FILTER', 'SORT', 'ORDER BY', 'ARRANGE'],
    correctAnswer: 2,
    explanation: 'The ORDER BY clause is used to sort the results of a SQL query in ascending or descending order.'
  },
  {
    id: 3,
    question: 'What does the SELECT statement do in SQL?',
    options: [
      'Inserts data',
      'Retrieves data from a database',
      'Deletes data',
      'Updates data'
    ],
    correctAnswer: 1,
    explanation: 'The SELECT statement is used to retrieve data from one or more tables in a database.'
  },
  {
    id: 4,
    question: 'In Python, which library is most commonly used for data manipulation?',
    options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    correctAnswer: 1,
    explanation: 'Pandas is the primary library for data manipulation and analysis in Python, providing data structures like DataFrames.'
  },
  {
    id: 5,
    question: 'What is the standard deviation used for?',
    options: [
      'To find the average of data',
      'To measure the spread or dispersion of data',
      'To count the number of data points',
      'To find the maximum value'
    ],
    correctAnswer: 1,
    explanation: 'Standard deviation measures how spread out the data is from the mean, indicating variability in the dataset.'
  },
  {
    id: 6,
    question: 'Which visualization is best for showing parts of a whole?',
    options: ['Line Chart', 'Pie Chart', 'Scatter Plot', 'Histogram'],
    correctAnswer: 1,
    explanation: 'A pie chart is ideal for showing how different parts make up a whole, displaying percentages or proportions.'
  },
  {
    id: 7,
    question: 'What does a JOIN operation do in SQL?',
    options: [
      'Combines multiple databases',
      'Combines rows from multiple tables based on a related column',
      'Combines columns into one table',
      'Connects to an external server'
    ],
    correctAnswer: 1,
    explanation: 'A JOIN combines rows from two or more tables based on a related column, allowing you to query related data.'
  },
  {
    id: 8,
    question: 'In data analysis, what is a null or missing value?',
    options: [
      'A value of zero',
      'A value that is absent or not recorded',
      'A negative number',
      'An empty string'
    ],
    correctAnswer: 1,
    explanation: 'A null or missing value is data that is absent or not recorded, represented as NULL or NaN in datasets.'
  },
  {
    id: 9,
    question: 'What is correlation?',
    options: [
      'A cause-and-effect relationship',
      'A measure of the strength and direction of association between two variables',
      'Always implies causation',
      'The average of two numbers'
    ],
    correctAnswer: 1,
    explanation: 'Correlation measures how strongly two variables are related and in which direction (positive or negative).'
  },
  {
    id: 10,
    question: 'Which Python function reads a CSV file into a DataFrame?',
    options: [
      'pandas.read_file()',
      'pandas.load_csv()',
      'pandas.read_csv()',
      'pandas.import_csv()'
    ],
    correctAnswer: 2,
    explanation: 'The pandas.read_csv() function reads a CSV file and loads it into a DataFrame for data manipulation.'
  }
]

interface QuizProps {
  onComplete: (score: number, total: number) => void
}

export function DataAnalysisQuiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const question = dataAnalysisQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / dataAnalysisQuestions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)
    setShowExplanation(true)

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < dataAnalysisQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), dataAnalysisQuestions.length)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswered(false)
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    const finalScore = score + (answered && selectedAnswer === question.correctAnswer ? 1 : 0)
    onComplete(finalScore, dataAnalysisQuestions.length)
  }

  if (timeUp) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-foreground">Data Analysis Quiz</h1>
            <div className="text-right flex flex-col items-end gap-2">
              <QuizTimer initialMinutes={20} onTimeUp={handleTimeUp} />
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {dataAnalysisQuestions.length}</p>
              <p className="text-lg font-semibold text-accent">Score: {score}</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 border-2 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-950 text-foreground'
                      : 'border-red-500 bg-red-50 dark:bg-red-950 text-foreground'
                    : 'border-border hover:border-accent/50 bg-card'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-border'
                    }`}
                  >
                    {selectedAnswer === index && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-lg mb-8 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
            }`}>
              <p className="font-semibold text-foreground mb-2">
                {selectedAnswer === question.correctAnswer ? '✓ Correct!' : 'Explanation:'}
              </p>
              <p className="text-foreground">{question.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1)
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                  setAnswered(false)
                }}
              >
                Previous
              </Button>
            )}
            {answered && (
              <Button
                onClick={handleNext}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {currentQuestion === dataAnalysisQuestions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
