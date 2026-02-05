'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            QuizMaster
          </div>
          <div className="text-sm text-muted-foreground">Test Your Knowledge</div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Challenge Yourself with Expert Quizzes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Master the fundamentals and advance your skills in web development and data analysis with our comprehensive quiz platform.
          </p>
        </div>

        {/* Track Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Web Development Track */}
          <Link href="/quiz/web-development">
            <div
              className="group cursor-pointer h-full"
              onMouseEnter={() => setHoveredTrack('web')}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <div
                className={`p-8 rounded-2xl border-2 transition-all duration-300 h-full flex flex-col ${
                  hoveredTrack === 'web'
                    ? 'border-primary bg-card shadow-lg scale-105'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="mb-6 inline-flex w-fit">
                  <div className="bg-primary/10 p-4 rounded-xl">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Web Development
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Test your knowledge on HTML, CSS, JavaScript, React, and modern web technologies.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {hoveredTrack === 'web' ? '50 Questions' : '1 Difficulty Levels'}
                  </span>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {}}
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          {/* Data Analysis Track */}
          <Link href="/quiz/data-analysis">
            <div
              className="group cursor-pointer h-full"
              onMouseEnter={() => setHoveredTrack('data')}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <div
                className={`p-8 rounded-2xl border-2 transition-all duration-300 h-full flex flex-col ${
                  hoveredTrack === 'data'
                    ? 'border-accent bg-card shadow-lg scale-105'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="mb-6 inline-flex w-fit">
                  <div className="bg-accent/10 p-4 rounded-xl">
                    <BarChart3 className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Data Analysis
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Explore statistics, SQL, Python, data visualization, and analytics fundamentals.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-accent">
                    {hoveredTrack === 'data' ? '10 Questions' : '1 Difficulty Levels'}
                  </span>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => {}}
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              100+
            </div>
            <p className="text-sm text-muted-foreground">Questions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              2 Tracks
            </div>
            <p className="text-sm text-muted-foreground">Learning Paths</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Expert
            </div>
            <p className="text-sm text-muted-foreground">Curated Content</p>
          </div>
        </div>
      </section>
    </div>
  )
}
