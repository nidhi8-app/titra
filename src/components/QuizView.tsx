
"use client";

import React from 'react';
import { initialQuizTopics, quizQuestions } from '@/lib/data';
import { Button } from './ui/button';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { Progress } from './ui/progress';
import type { Card as TopicCard, QuizQuestion } from '@/lib/types';
import QuestionCard from './QuestionCard';

const QuizSession = ({ topic, onBack }: { topic: TopicCard, onBack: () => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [quizFinished, setQuizFinished] = React.useState(false);
  
  const questions = quizQuestions[topic.id] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };
  
  if (quizFinished) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">You scored {score} out of {questions.length}</p>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">{topic.title}</h2>
      </div>
      {currentQuestion ? (
        <QuestionCard 
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      ) : (
         <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
            <p className="text-xl">No questions available for this topic yet.</p>
         </div>
      )}
    </div>
  );
};

type QuizViewProps = {
    preselectedTopic?: TopicCard | null;
}

const QuizView = ({ preselectedTopic = null }: QuizViewProps) => {
  const [selectedTopic, setSelectedTopic] = React.useState<TopicCard | null>(preselectedTopic);
  const topics = initialQuizTopics;
  
  React.useEffect(() => {
    setSelectedTopic(preselectedTopic);
  }, [preselectedTopic]);

  if (selectedTopic) {
    return <QuizSession topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
          <Button>Start Random Quiz</Button>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="rounded-xl shadow-md bg-card border flex flex-col p-4 gap-4 text-left hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center">
              <h3 className="font-bold truncate text-lg">{topic.title}</h3>
            </div>
            <div className="text-sm text-muted-foreground mt-auto">
              <div className="flex justify-between items-center">
                <span>{topic.cardCount > 0 ? `${topic.cardCount} questions` : 'No questions'}</span>
                {topic.progress >= 0 && (
                  <span className="font-semibold">{topic.progress}%</span>
                )}
              </div>
              {topic.progress > 0 && (
                <Progress value={topic.progress} className="h-2 mt-2" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizView;
