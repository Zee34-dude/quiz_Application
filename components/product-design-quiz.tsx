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

const productDesignQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main goal of the Udacity Product Design course?',
    options: [
      'To learn how to code web applications',
      'To transform ideas into user-validated products',
      'To master database management',
      'To study algorithms and data structures'
    ],
    correctAnswer: 1,
    explanation: 'The course focuses on turning ideas into user-validated products.´:contentReference[oaicite:1]{index=1}'
  },
  {
    id: 2,
    question: 'Which of the following is a skill taught in the Product Design course?',
    options: [
      'Blockchain development',
      'Product prototyping',
      'Network security analysis',
      'Cloud architecture'
    ],
    correctAnswer: 1,
    explanation: 'Product prototyping is listed among the skills learned.´:contentReference[oaicite:2]{index=2}'
  },
  {
    id: 3,
    question: 'How many lessons are in the Product Design course outline?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 3,
    explanation: 'The outline includes 9 lessons.´:contentReference[oaicite:3]{index=3}'
  },
  {
    id: 4,
    question: 'What phase in the Design Sprint focuses on understanding the problem?',
    options: [
      'Phase 1: Understand',
      'Phase 4: Decide',
      'Phase 2: Define',
      'Phase 6: Validate'
    ],
    correctAnswer: 0,
    explanation: 'Phase 1 focuses on increasing understanding of the problem.´:contentReference[oaicite:4]{index=4}'
  },
  {
    id: 5,
    question: 'What phase comes after "Define" in the Design Sprint?',
    options: [
      'Phase 4: Decide',
      'Phase 3: Sketch',
      'Phase 5: Prototype',
      'Phase 6: Validate'
    ],
    correctAnswer: 1,
    explanation: 'Phase 3: Sketch follows Define.´:contentReference[oaicite:5]{index=5}'
  },
  {
    id: 6,
    question: 'Which Design Sprint phase focuses on prototyping?',
    options: [
      'Phase 2: Define',
      'Phase 5: Prototype',
      'Phase 4: Decide',
      'Phase 1: Understand'
    ],
    correctAnswer: 1,
    explanation: 'Phase 5 is focused on prototyping.´:contentReference[oaicite:6]{index=6}'
  },
  {
    id: 7,
    question: 'What is emphasized during the Validate phase?',
    options: [
      'Coding finished software',
      'Validating concepts with users and feasibility tests',
      'Hiring a design team',
      'Running A/B tests on a live product'
    ],
    correctAnswer: 1,
    explanation: 'The Validate phase focuses on testing concepts with users and feasibility.´:contentReference[oaicite:7]{index=7}'
  },
  {
    id: 8,
    question: 'What type of project is included at the end of the course?',
    options: [
      'Machine learning project',
      'Design Sprint project',
      'Database design assignment',
      'Cloud deployment lab'
    ],
    correctAnswer: 1,
    explanation: 'The course includes a Design Sprint project.´:contentReference[oaicite:8]{index=8}'
  },
  {
    id: 9,
    question: 'Why does the course include a Design Sprint methodology?',
    options: [
      'To teach team leadership skills',
      'To explore, prototype, and test product ideas quickly',
      'To train in project budgeting',
      'To learn JavaScript frameworks'
    ],
    correctAnswer: 1,
    explanation: 'The Design Sprint teaches rapid exploration, prototyping and testing.´:contentReference[oaicite:9]{index=9}'
  },
  {
    id: 10,
    question: 'Which of these is NOT listed as a skill you learn in the course?',
    options: [
      'Decision matrix method',
      'Solution sketching',
      'Project evaluation',
      'Mobile app programming'
    ],
    correctAnswer: 3,
    explanation: 'Mobile app programming is not listed; the focus is on design skills.´:contentReference[oaicite:10]{index=10}'
  },
  {
    id: 11,
    question: 'What does the “Decide” phase in a Design Sprint do?',
    options: [
      'Define the core user personas',
      'Narrow down ideas to the most promising solution',
      'Develop final product code',
      'Identify project stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'The Decide phase focuses on converging ideas to a single solution.´:contentReference[oaicite:11]{index=11}'
  },
  {
    id: 12,
    question: 'In ideation, what is a key activity?',
    options: [
      'Generating and refining product ideas',
      'Writing backend APIs',
      'Deploying to production',
      'Coding UI components'
    ],
    correctAnswer: 0,
    explanation: 'Ideation involves generating and refining ideas.´:contentReference[oaicite:12]{index=12}'
  },
  {
    id: 13,
    question: 'What is one focus during the UX/UI section of the syllabus?',
    options: [
      'Building API endpoints',
      'Understanding material design and accessible user flows',
      'Database normalization',
      'Network configuration'
    ],
    correctAnswer: 1,
    explanation: 'The UX/UI segment includes understanding material design and accessibility.´:contentReference[oaicite:13]{index=13}'
  },
  {
    id: 14,
    question: 'What is a common metric to track for product success?',
    options: [
      'CPU utilization',
      'Customer engagement',
      'Memory usage',
      'Network latency'
    ],
    correctAnswer: 1,
    explanation: 'Tracking customer engagement is a key metric for product success.´:contentReference[oaicite:14]{index=14}'
  },
  {
    id: 15,
    question: 'In product design, what is “validation”?',
    options: [
      'Testing product ideas with real users to confirm they solve problems',
      'Running automated tests on code',
      'Deploying remote servers',
      'Creating high-definition graphics'
    ],
    correctAnswer: 0,
    explanation: 'Validation involves confirming product ideas through user feedback.´:contentReference[oaicite:15]{index=15}'
  },
  {
    id: 16,
    question: 'Which one is a step in Google’s Design Sprint process?',
    options: [
      'Phase 1: Plan',
      'Phase 3: Sketch',
      'Phase 7: Launch to market',
      'Phase 8: Automate tests'
    ],
    correctAnswer: 1,
    explanation: 'Sketching is a core step in the Design Sprint.´:contentReference[oaicite:16]{index=16}'
  },
  {
    id: 17,
    question: 'Who is mentioned as an instructor in the Product Design course?',
    options: [
      'Jeff Bezos',
      'Alex King',
      'Linus Torvalds',
      'Ada Lovelace'
    ],
    correctAnswer: 1,
    explanation: 'Alex King, Product Manager at Google, is one of the instructors.´:contentReference[oaicite:17]{index=17}'
  },
  {
    id: 18,
    question: 'How many hours is the Product Design course estimated to take?',
    options: ['8 hours', '10 hours', '12 hours', '15 hours'],
    correctAnswer: 2,
    explanation: 'The course is listed as approximately 12 hours long.´:contentReference[oaicite:18]{index=18}'
  },
  {
    id: 19,
    question: 'What is required before enrolling in the course?',
    options: [
      'Advanced programming experience',
      'Prior product management experience',
      'Ability to communicate fluently in English',
      'Certification in UX/UI design'
    ],
    correctAnswer: 2,
    explanation: 'You must communicate fluently in English, but no technical prerequisites are needed.´:contentReference[oaicite:19]{index=19}'
  },
  {
    id: 20,
    question: 'Which phase focuses on converging ideas to one idea for the prototype?',
    options: [
      'Prototype',
      'Understand',
      'Decide',
      'Validate'
    ],
    correctAnswer: 2,
    explanation: 'The Decide phase narrows down to one solution.´:contentReference[oaicite:20]{index=20}'
  },
  {
    id: 21,
    question: 'Which of these activities is part of product prototyping?',
    options: [
      'Writing user documentation',
      'Creating mockups to test design ideas',
      'Configuring databases',
      'Setting up domain names'
    ],
    correctAnswer: 1,
    explanation: 'Prototyping typically involves mockups and early design models.´:contentReference[oaicite:21]{index=21}'
  },
  {
    id: 22,
    question: 'Why are key metrics important in product design?',
    options: [
      'They automate product updates',
      'They help measure user engagement, satisfaction, and performance',
      'They replace UX research',
      'They secure the application'
    ],
    correctAnswer: 1,
    explanation: 'Key metrics help evaluate performance and user engagement.´:contentReference[oaicite:22]{index=22}'
  },
  {
    id: 23,
    question: 'What is one goal of conducting user research?',
    options: [
      'To increase server uptime',
      'To understand user needs and behaviors',
      'To create backend code',
      'To automate testing'
    ],
    correctAnswer: 1,
    explanation: 'User research helps uncover needs and behaviors.´:contentReference[oaicite:23]{index=23}'
  },
  {
    id: 24,
    question: 'Which part of the course focuses on sketching and brainstorming?',
    options: [
      'Phase 5: Prototype',
      'Phase 3: Sketch',
      'Phase 1: Understand',
      'Phase 6: Validate'
    ],
    correctAnswer: 1,
    explanation: 'Sketching and brainstorming occur in Phase 3.´:contentReference[oaicite:24]{index=24}'
  },
  {
    id: 25,
    question: 'Design sprints are commonly used by:',
    options: [
      'Graphic designers only',
      'Teams seeking rapid idea validation and iteration',
      'Network engineers',
      'Database architects'
    ],
    correctAnswer: 1,
    explanation: 'Design sprints help teams quickly test and refine ideas.:contentReference[oaicite:25]{index=25}'
  },
  {
    id: 26,
    question: 'What does “run a Design Sprint” entail?',
    options: [
      'Walk through all phases to develop, test, and refine a concept',
      'Deploy the final product to production',
      'Train team members in UX tools',
      'Configure cloud services'
    ],
    correctAnswer: 0,
    explanation: 'Running a sprint involves going through all phases to validate and refine ideas.:contentReference[oaicite:26]{index=26}'
  },
  {
    id: 27,
    question: 'Which part of Design Sprint focuses on defining outcomes?',
    options: [
      'Phase 4: Decide',
      'Phase 1: Understand',
      'Phase 2: Define',
      'Phase 3: Sketch'
    ],
    correctAnswer: 2,
    explanation: 'Phase 2 focuses on defining outcomes and focus areas.´:contentReference[oaicite:27]{index=27}'
  },
  {
    id: 28,
    question: 'A key part of prototyping is:',
    options: [
      'Writing backend unit tests',
      'Sketching wireframes and mockups',
      'Designing network diagrams',
      'Auth token configuration'
    ],
    correctAnswer: 1,
    explanation: 'Prototyping involves creating wireframes and mockups.´:contentReference[oaicite:28]{index=28}'
  },
  {
    id: 29,
    question: 'What does user validation confirm?',
    options: [
      'That the product codebase is bug-free',
      'That the solution solves real user problems',
      'That server latency is minimized',
      'That the app UI colors match brand guidelines'
    ],
    correctAnswer: 1,
    explanation: 'Validation confirms the solution works for users.:contentReference[oaicite:29]{index=29}'
  },
  {
    id: 30,
    question: 'Which skill helps in choosing between multiple product ideas?',
    options: [
      'Decision matrix method',
      'Network optimization',
      'CSS styling',
      'Database indexing'
    ],
    correctAnswer: 0,
    explanation: 'Decision matrices help compare and prioritize ideas.:contentReference[oaicite:30]{index=30}'
  }
];



interface QuizProps {
  onComplete: (score: number, total: number) => void
}

export function ProductDesignQuiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const question = productDesignQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / productDesignQuestions.length) * 100

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
    if (currentQuestion < productDesignQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), productDesignQuestions.length)
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
    onComplete(finalScore, productDesignQuestions.length)
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
            <h1 className="text-3xl font-bold text-foreground">Product design Quiz</h1>
            <div className="text-right flex flex-col items-end gap-2">
              <QuizTimer initialMinutes={15} onTimeUp={handleTimeUp} />
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {productDesignQuestions.length}</p>
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
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-950 text-foreground'
                      : 'border-red-500 bg-red-50 dark:bg-red-950 text-foreground'
                    : 'border-border hover:border-accent/50 bg-card'
                  } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${selectedAnswer === index
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
            <div className={`p-4 rounded-lg mb-8 ${selectedAnswer === question.correctAnswer
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
                {currentQuestion === productDesignQuestions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
