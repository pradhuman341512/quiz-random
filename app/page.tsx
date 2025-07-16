'use client'

import { useState } from 'react'

type QuestionType = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

const originalQuestions: QuestionType[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Leo Tolstoy', 'William Shakespeare', 'Mark Twain', 'Charles Dickens'],
    correctAnswer: 'William Shakespeare',
  },
  {
    id: 3,
    question: 'What does HTTP stand for?',
    options: [
      'HyperText Transfer Protocol',
      'HighText Transfer Protocol',
      'HyperTool Test Protocol',
      'HyperText Testing Program',
    ],
    correctAnswer: 'HyperText Transfer Protocol',
  },
  {
    id: 4,
    question: 'What is 7 × 8?',
    options: ['54', '56', '58', '48'],
    correctAnswer: '56',
  },
  {
    id: 5,
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Saturn', 'Jupiter'],
    correctAnswer: 'Mars',
  },
]

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuestionType[]>(shuffleArray(originalQuestions))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(originalQuestions.length).fill(''))
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const currentQuestion = questions[currentIndex]
  const selectedOption = answers[currentIndex]
  const hasAnswered = selectedOption !== ''
  const isCorrect = selectedOption === currentQuestion.correctAnswer

  const handleOptionClick = (option: string) => {
    if (hasAnswered) return

    const updatedAnswers = [...answers]
    updatedAnswers[currentIndex] = option
    setAnswers(updatedAnswers)

    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    // If it's the last question and this was the last answer
    if (currentIndex === questions.length - 1 && updatedAnswers.every(ans => ans !== '')) {
      setShowScore(true)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleRestart = () => {
    setQuestions(shuffleArray(originalQuestions))
    setCurrentIndex(0)
    setAnswers(Array(originalQuestions.length).fill(''))
    setScore(0)
    setShowScore(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">Question {currentIndex + 1}</h1>

        <p className="text-gray-700">{currentQuestion.question}</p>

        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`w-full px-4 py-2 rounded text-left border text-black
                ${
                  selectedOption === option
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'hover:bg-gray-100 border-gray-300'
                }`}
              disabled={hasAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {hasAnswered && (
          <div className="text-center font-medium mt-3 text-lg">
            {isCorrect ? '✅ Correct!' : `❌ Wrong! Answer: ${currentQuestion.correctAnswer}`}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-black"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Show score at end */}
        {showScore && (
          <div className="text-center mt-6 text-lg font-semibold text-green-600 space-y-2">
            <div>🎉 Quiz Completed! Your Score: {score} / {questions.length}</div>
            <button
              onClick={handleRestart}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Restart Quiz 🔄
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
