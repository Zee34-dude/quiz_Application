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

const dataAnalyticsQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the core purpose of data analytics?',
    options: [
      'To generate as much data as possible from social media',
      'To turn raw data into useful information for decision-making',
      'To replace all human decision-making with automated tools',
      'To store large volumes of company data efficiently'
    ],
    correctAnswer: 1,
    explanation: 'The core purpose of data analytics is to turn raw data into useful information for decision-making.'
  },
  {
    id: 2,
    question: 'Why is the data cleaning step necessary?',
    options: [
      'To collect more data from new sources',
      'To remove unwanted, redundant, or missing values',
      'To visualize data in graphs and charts',
      'To present findings to stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'Data cleaning removes unwanted, redundant, or missing values to ensure data quality.'
  },
  {
    id: 3,
    question: 'The final step of interpreting the results aims to:',
    options: [
      'Collect more transactional data',
      'Clean the dataset again',
      'Find hidden patterns and support data-driven decisions',
      'Automatically implement solutions without human review'
    ],
    correctAnswer: 2,
    explanation: 'Interpreting results focuses on finding hidden patterns and supporting data-driven decisions.'
  },
  {
    id: 4,
    question: 'What is the most accurate definition of data analytics according to the notes?',
    options: [
      'Storing large amounts of data in the cloud.',
      'The process of exploring and analyzing large datasets to make predictions and boost data-driven decision making.',
      'The act of collecting data from social media.',
      'A tool used only for scientific research.'
    ],
    correctAnswer: 1,
    explanation: 'Data analytics involves exploring and analyzing large datasets to support data-driven decisions.'
  },
  {
    id: 5,
    question: 'Which Python library is primarily used for numerical computing and supports n-dimensional arrays?',
    options: [
      'Pandas',
      'Matplotlib',
      'NumPy',
      'SciPy'
    ],
    correctAnswer: 2,
    explanation: 'NumPy is used for numerical computing and supports n-dimensional arrays.'
  },
  {
    id: 6,
    question: 'Which library is specifically mentioned as having features for building regression, classification, and clustering models?',
    options: [
      'SciPy',
      'Scikit-Learn',
      'Pandas',
      'Matplotlib'
    ],
    correctAnswer: 1,
    explanation: 'Scikit-Learn provides tools for regression, classification, and clustering.'
  },
  {
    id: 7,
    question: 'What is the primary purpose of the describe() function in Pandas?',
    options: [
      'To plot a histogram',
      'To load a dataset',
      'To print summary statistics of the dataset',
      'To remove duplicate rows'
    ],
    correctAnswer: 2,
    explanation: 'describe() prints summary statistics of the dataset.'
  },
  {
    id: 8,
    question: 'What is the primary goal of Exploratory Data Analysis (EDA)?',
    options: [
      'To build the final machine learning model',
      'To understand the data in depth and learn its different characteristics',
      'To deploy a data analytics application',
      'To replace all statistical tests with visual analysis'
    ],
    correctAnswer: 1,
    explanation: 'EDA aims to understand the data and its characteristics.'
  },
  {
    id: 9,
    question: 'In the market analysis example, what was done to handle missing values in the "month" column?',
    options: [
      'Rows with missing month values were deleted.',
      'Missing values were filled with the mean of the column.',
      'Missing values were filled with the mode (most common month).',
      'The column was dropped entirely.'
    ],
    correctAnswer: 2,
    explanation: 'Missing values were filled using the mode.'
  },
  {
    id: 10,
    question: 'In the context of outliers, what is a "multivariate outlier"?',
    options: [
      'A data point that lies outside the expected range for a single variable',
      'A data point that is extreme when considering the relationship between two or more variables',
      'A missing value that depends on other features',
      'A duplicate record in the dataset'
    ],
    correctAnswer: 1,
    explanation: 'A multivariate outlier is extreme when considering multiple variables together.'
  },
  {
    id: 11,
    question: 'In the market analysis example, what insight was derived from the box plot of "response vs. salary"?',
    options: [
      'People with higher education are more likely to respond "yes."',
      'The salary range for "no" responses was 20k–70k, and for "yes" responses it was 50k–100k.',
      'Age and salary have a high correlation.',
      'Most people in the survey had secondary school education.'
    ],
    correctAnswer: 1,
    explanation: 'The box plot showed different salary ranges for responses.'
  },
  {
    id: 12,
    question: 'What is the primary purpose of Business Intelligence (BI) tools according to the notes?',
    options: [
      'To replace human analysts',
      'To analyze large volumes of data and provide actionable insights',
      'To store data securely in the cloud',
      'To automate all business decisions'
    ],
    correctAnswer: 1,
    explanation: 'BI tools analyze data to provide actionable insights.'
  },
  {
    id: 13,
    question: 'What is the primary focus of qualitative research?',
    options: [
      'Gathering and analyzing numerical data for statistical patterns',
      'Understanding human behavior, ideas, and experiences through non-numerical data',
      'Conducting large-scale surveys with closed-ended questions',
      'Running controlled laboratory experiments'
    ],
    correctAnswer: 1,
    explanation: 'Qualitative research focuses on non-numerical human experiences.'
  },
  {
    id: 14,
    question: 'Which type of quantitative research aims to measure the strength of a relationship between two or more variables?',
    options: [
      'Descriptive Research',
      'Experimental Research',
      'Correlational Research',
      'Causal-Comparative Research'
    ],
    correctAnswer: 2,
    explanation: 'Correlational research measures relationships between variables.'
  },
  {
    id: 15,
    question: 'In the bookstore example, what did qualitative research help uncover?',
    options: [
      'The precise percentage of customers who were dissatisfied',
      'The statistical correlation between book types and sales',
      'The feeling that there were not enough books for children/teenagers',
      'The exact profit margin on adult books'
    ],
    correctAnswer: 2,
    explanation: 'Qualitative research revealed customer feelings.'
  },
  {
    id: 16,
    question: 'Which statement best reflects the overall conclusion about using both research methods?',
    options: [
      'Only qualitative research provides accurate insights',
      'Using both methods together can lead to more unbiased and meaningful results',
      'Quantitative research is always superior for business decisions',
      'Researchers should avoid mixing methods to prevent confusion'
    ],
    correctAnswer: 1,
    explanation: 'Using both methods leads to better insights.'
  },
  {
    id: 17,
    question: 'What is the primary responsibility of a data analyst, as described in the notes?',
    options: [
      'Managing company finances',
      'Collecting, processing, and performing statistical analyses on large datasets',
      'Designing marketing campaigns',
      'Developing software applications'
    ],
    correctAnswer: 1,
    explanation: 'Data analysts work with large datasets to extract insights.'
  },
  {
    id: 18,
    question: 'Which programming language is NOT mentioned as essential for a data analyst to learn?',
    options: [
      'Python',
      'SQL',
      'Java',
      'R'
    ],
    correctAnswer: 2,
    explanation: 'Java is not mentioned as essential.'
  },
  {
    id: 19,
    question: 'What is a key soft skill emphasized for data analysts?',
    options: [
      'Physical fitness',
      'Ability to explain complex data to non-technical stakeholders',
      'Musical talent',
      'Public speaking for large audiences'
    ],
    correctAnswer: 1,
    explanation: 'Clear communication is essential for data analysts.'
  },
  {
    id: 20,
    question: 'What is a key difference in the types of data that data scientists work with compared to data analysts?',
    options: [
      'Data scientists only work with structured data',
      'Data scientists often handle unstructured data like text or video',
      'Data analysts work with more complex datasets than data scientists',
      'Data analysts specialize in real-time streaming data'
    ],
    correctAnswer: 1,
    explanation: 'Data scientists often work with unstructured data.'
  },
  {
    id: 21,
    question: 'What type of analytics is mainly associated with data analysts?',
    options: [
      'Predictive Analytics',
      'Prescriptive Analytics',
      'Descriptive Analytics',
      'Diagnostic Analytics'
    ],
    correctAnswer: 2,
    explanation: 'Data analysts mainly focus on descriptive analytics.'
  },
  {
    id: 22,
    question: 'What does Exploratory Data Analysis (EDA) help achieve?',
    options: [
      'Automatically selects the best machine learning model',
      'Helps understand the data and discover hidden trends',
      'Replaces the need for data cleaning',
      'Guarantees 100% model accuracy'
    ],
    correctAnswer: 1,
    explanation: 'EDA helps uncover trends and patterns.'
  },
  {
    id: 23,
    question: 'Which of the following is a method to treat outliers?',
    options: [
      'Ignore them completely',
      'Delete the entire column containing outliers',
      'Cap the outlier data',
      'Always keep them without any change'
    ],
    correctAnswer: 2,
    explanation: 'Capping is a common method for treating outliers.'
  },
  {
    id: 24,
    question: 'In Excel, which function counts non-blank cells in a range?',
    options: [
      'COUNT',
      'COUNTA',
      'COUNTBLANK',
      'COUNTIF'
    ],
    correctAnswer: 1,
    explanation: 'COUNTA counts non-blank cells.'
  },
  {
    id: 25,
    question: 'What is the main purpose of a confidence interval?',
    options: [
      'To determine the exact population parameter.',
      'To quantify the uncertainty around a sample estimate.',
      'To replace hypothesis testing.',
      'To visualize data distribution.'
    ],
    correctAnswer: 1,
    explanation: 'Confidence intervals express uncertainty in estimates.'
  },
  {
    id: 26,
    question: 'In SQL, what is the difference between WHERE and HAVING?',
    options: [
      'WHERE works on aggregated data; HAVING works on row data',
      'WHERE works on row data; HAVING works on aggregated data',
      'Both are interchangeable',
      'WHERE is used only with JOINs'
    ],
    correctAnswer: 1,
    explanation: 'WHERE filters rows; HAVING filters aggregated results.'
  },
  {
    id: 27,
    question: 'What does the VLOOKUP function do?',
    options: [
      'Looks up values vertically in a table based on a key',
      'Sums values based on multiple criteria',
      'Creates pivot tables automatically',
      'Generates random numbers'
    ],
    correctAnswer: 0,
    explanation: 'VLOOKUP searches for values vertically.'
  },
  {
    id: 28,
    question: 'How does data analytics transform the retail industry?',
    options: [
      'By eliminating the need for physical stores',
      'By providing insights into customer preferences and optimizing pricing',
      'By manufacturing all products in-house',
      'By replacing cashiers with robots'
    ],
    correctAnswer: 1,
    explanation: 'Retail analytics improves pricing and customer understanding.'
  },
  {
    id: 29,
    question: 'In which industry is data analytics used to identify high-risk patients and personalize treatment plans?',
    options: [
      'Finance',
      'Healthcare',
      'Retail',
      'Manufacturing'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare uses analytics for patient risk and treatment planning.'
  },
  {
    id: 30,
    question: 'What are the top five genres by popularity in the dataset?',
    options: [
      'Classical, Jazz, Blues, Folk, World',
      'Dance, Pop, Rap, Hip-Hop, Reggaeton',
      'Rock, Metal, Punk, Alternative, Indie',
      'Country, Gospel, R&B, Soul, Funk'
    ],
    correctAnswer: 1,
    explanation: 'These genres were identified as the most popular.'
  }
];



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

  const question = dataAnalyticsQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / dataAnalyticsQuestions.length) * 100

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
    if (currentQuestion < dataAnalyticsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), dataAnalyticsQuestions.length)
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
    onComplete(finalScore, dataAnalyticsQuestions.length)
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
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {dataAnalyticsQuestions.length}</p>
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
                {currentQuestion === dataAnalyticsQuestions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
