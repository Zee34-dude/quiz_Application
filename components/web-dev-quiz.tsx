'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { QuizTimer } from './quiz-timer'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const webDevQuestions: Question[] = [
  {
    id: 1,
    question: 'What is computer science primarily concerned with?',
    options: [
      'The study of computation, data, and algorithms',
      'Designing computer hardware only',
      'Using computers for gaming',
      'Fixing computer hardware'
    ],
    correctAnswer: 0,
    explanation: 'Computer science focuses on computation, data, algorithms, and information processing.'
  },
  {
    id: 2,
    question: 'Which component is considered the brain of the computer?',
    options: ['RAM', 'CPU', 'Hard Disk', 'Motherboard'],
    correctAnswer: 1,
    explanation: 'The CPU executes instructions and performs calculations.'
  },
  {
    id: 3,
    question: 'Which memory is volatile?',
    options: ['ROM', 'SSD', 'RAM', 'Hard Disk'],
    correctAnswer: 2,
    explanation: 'RAM loses data when power is turned off.'
  },
  {
    id: 4,
    question: 'What does ALU stand for?',
    options: [
      'Arithmetic Logic Unit',
      'Advanced Logic Unit',
      'Array Logic Utility',
      'Automated Logic Unit'
    ],
    correctAnswer: 0,
    explanation: 'The ALU handles arithmetic and logical operations.'
  },
  {
    id: 5,
    question: 'What is software?',
    options: [
      'Physical computer components',
      'Input devices',
      'Programs and instructions',
      'Electrical circuits'
    ],
    correctAnswer: 2,
    explanation: 'Software consists of programs that tell hardware what to do.'
  },

  {
    id: 6,
    question: 'What is an algorithm?',
    options: [
      'A programming language',
      'A database',
      'A step-by-step solution to a problem',
      'A hardware component'
    ],
    correctAnswer: 2,
    explanation: 'Algorithms define structured steps to solve problems.'
  },
  {
    id: 7,
    question: 'Which language is closest to machine code?',
    options: ['JavaScript', 'Assembly', 'Python', 'HTML'],
    correctAnswer: 1,
    explanation: 'Assembly language is very close to machine-level instructions.'
  },
  {
    id: 8,
    question: 'Which is a high-level programming language?',
    options: ['Binary', 'Assembly', 'JavaScript', 'Machine code'],
    correctAnswer: 2,
    explanation: 'JavaScript is a high-level, human-readable language.'
  },
  {
    id: 9,
    question: 'What symbol represents a decision in a flowchart?',
    options: ['Rectangle', 'Oval', 'Diamond', 'Circle'],
    correctAnswer: 2,
    explanation: 'Diamonds represent conditional decisions.'
  },
  {
    id: 10,
    question: 'What does HTML stand for?',
    options: [
      'Hyperlinks and Text Markup Language',
      'Home Tool Markup Language',
      'Hyper Text Markup Language',
      'High Tech Modern Language'
    ],
    correctAnswer: 2,
    explanation: 'HTML stands for Hyper Text Markup Language.'
  },

  {
    id: 11,
    question: 'Which keyword declares a block-scoped variable?',
    options: ['var', 'const', 'let', 'static'],
    correctAnswer: 2,
    explanation: '`let` creates block-scoped variables.'
  },
  {
    id: 12,
    question: 'Which JavaScript data type is NOT primitive?',
    options: ['String', 'Number', 'Object', 'Boolean'],
    correctAnswer: 2,
    explanation: 'Objects are non-primitive data types.'
  },
  {
    id: 13,
    question: 'Which operator checks both value and type?',
    options: ['==', '=', '!=', '==='],
    correctAnswer: 3,
    explanation: '`===` checks strict equality.'
  },
  {
    id: 14,
    question: 'What does NaN mean?',
    options: [
      'Negative and Null',
      'Not a Number',
      'New Assigned Number',
      'No active Number'
    ],
    correctAnswer: 1,
    explanation: 'NaN means a value is not a valid number.'
  },
  {
    id: 15,
    question: 'What is hoisting?',
    options: [
      'Running code faster',
      'Moving declarations to the top of scope',
      'Deleting unused variables',
      'Optimizing memory'
    ],
    correctAnswer: 1,
    explanation: 'Hoisting moves variable and function declarations.'
  },

  {
    id: 16,
    question: 'What is the DOM?',
    options: [
      'Data Object Model',
      'Document Output Method',
      'Document Object Model',
      'Dynamic Object Mapper'
    ],
    correctAnswer: 2,
    explanation: 'The DOM represents the structure of web documents.'
  },
  {
    id: 17,
    question: 'Which method selects the first matching CSS selector?',
    options: [
      'getElementById',
      'querySelector',
      'getElementsByClassName',
      'selectNode'
    ],
    correctAnswer: 1,
    explanation: '`querySelector` uses CSS selectors.'
  },
  {
    id: 18,
    question: 'What does preventDefault() do?',
    options: [
      'Stops event bubbling',
      'Prevents default browser behavior',
      'Deletes the event',
      'Reloads the page'
    ],
    correctAnswer: 1,
    explanation: 'It stops the browser’s default action.'
  },
  {
    id: 19,
    question: 'What is event bubbling?',
    options: [
      'Events flow from parent to child',
      'Events repeat continuously',
      'Events are canceled',
      'Events flow from child to parent'
    ],
    correctAnswer: 3,
    explanation: 'Event bubbling propagates upward in the DOM.'
  },
  {
    id: 20,
    question: 'What is asynchronous programming?',
    options: [
      'Blocking execution',
      'Running tasks independently',
      'Using only loops',
      'Single-threaded execution'
    ],
    correctAnswer: 1,
    explanation: 'Async programming prevents blocking.'
  },

  {
    id: 21,
    question: 'What is version control?',
    options: [
      'Tracking UI changes',
      'Managing file changes over time',
      'Optimizing code',
      'Deploying applications'
    ],
    correctAnswer: 1,
    explanation: 'Version control tracks and manages file history.'
  },
  {
    id: 22,
    question: 'What is Git?',
    options: [
      'A database',
      'A browser',
      'A version control system',
      'A programming language'
    ],
    correctAnswer: 2,
    explanation: 'Git is a distributed version control system.'
  },
  {
    id: 23,
    question: 'What is a repository?',
    options: [
      'A commit',
      'A branch',
      'A folder tracked by Git',
      'A remote server'
    ],
    correctAnswer: 2,
    explanation: 'Repositories store project history.'
  },
  {
    id: 24,
    question: 'What is a commit?',
    options: [
      'A saved snapshot of changes',
      'A deleted file',
      'A branch',
      'A merge conflict'
    ],
    correctAnswer: 0,
    explanation: 'Commits record changes.'
  },
  {
    id: 25,
    question: 'What causes merge conflicts?',
    options: [
      'Large repositories',
      'Slow internet',
      'Different changes to the same file',
      'Too many branches'
    ],
    correctAnswer: 2,
    explanation: 'Conflicts occur when Git cannot auto-merge.'
  },

  {
    id: 26,
    question: 'What does git add do?',
    options: [
      'Creates a branch',
      'Stages changes',
      'Commits files',
      'Pushes to remote'
    ],
    correctAnswer: 1,
    explanation: '`git add` stages files for commit.'
  },
  {
    id: 27,
    question: 'What does git push do?',
    options: [
      'Downloads changes',
      'Uploads commits to remote',
      'Deletes history',
      'Resets HEAD'
    ],
    correctAnswer: 1,
    explanation: '`git push` uploads commits.'
  },
  {
    id: 28,
    question: 'What does git pull do?',
    options: [
      'Uploads code',
      'Fetches and merges changes',
      'Deletes files',
      'Creates commits'
    ],
    correctAnswer: 1,
    explanation: '`git pull` updates local repo.'
  },
  {
    id: 29,
    question: 'What is a branch?',
    options: [
      'A folder',
      'A server',
      'An independent line of development',
      'A commit hash'
    ],
    correctAnswer: 2,
    explanation: 'Branches allow parallel work.'
  },
  {
    id: 30,
    question: 'What is .gitignore used for?',
    options: [
      'Ignoring commits',
      'Ignoring specific files',
      'Protecting branches',
      'Storing secrets'
    ],
    correctAnswer: 1,
    explanation: '.gitignore excludes files from tracking.'
  }
];



interface QuizProps {
  onComplete: (score: number, total: number) => void
}

export function WebDevQuiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const question = webDevQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / webDevQuestions.length) * 100

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
    if (currentQuestion < webDevQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), webDevQuestions.length)
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
    onComplete(finalScore, webDevQuestions.length)
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
            <h1 className="text-3xl font-bold text-foreground">Web Development Quiz</h1>
            <div className="text-right flex flex-col items-end gap-2">
              <QuizTimer initialMinutes={20} onTimeUp={handleTimeUp} />
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {webDevQuestions.length}</p>
              <p className="text-lg font-semibold text-primary">Score: {score}</p>
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
                    : 'border-border hover:border-primary/50 bg-card'
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
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {currentQuestion === webDevQuestions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
