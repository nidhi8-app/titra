
"use client";

import React from 'react';
import { initialQuizTopics, quizQuestions } from '@/lib/data';
import { Button } from './ui/button';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { Progress } from './ui/progress';
import type { Card as TopicCard, QuizQuestion, UserDetails } from '@/lib/types';
import QuestionCard from './QuestionCard';
import { useUser } from '@/firebase';

type QuizSource = {
  type: 'pre-made',
  topic: TopicCard
} | {
  type: 'generated',
  deckTitle: string,
  questions: QuizQuestion[]
} | null;


const QuizSession = ({ source, onBack, userDetails, onQuizCompleted }: { source: NonNullable<QuizSource>, onBack: () => void, userDetails: UserDetails | null, onQuizCompleted: (score: number, total: number) => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [quizFinished, setQuizFinished] = React.useState(false);
  const { user } = useUser();
  
  const questions = source.type === 'pre-made' ? (quizQuestions[source.topic.id] || []) : source.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const title = source.type === 'pre-made' ? source.topic.title : source.deckTitle;

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };
  
  const handleNextQuestion = () => {
     const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  }

  React.useEffect(() => {
    if (quizFinished) {
      onQuizCompleted(score, questions.length);
      if (user && questions.length > 0 && source.type === 'pre-made') {
        const percentage = (score / questions.length) * 100;
        const scoresKey = `quizScores-${user.uid}`;
        const existingScores = JSON.parse(localStorage.getItem(scoresKey) || '{}');
        const updatedScores = {
          ...existingScores,
          [source.topic.id]: percentage
        };
        localStorage.setItem(scoresKey, JSON.stringify(updatedScores));
      }
    }
  }, [quizFinished, score, questions.length, source, user, onQuizCompleted]);
  
  
  if (quizFinished) {
    const percentage = questions.length > 0 ? ((score / questions.length) * 100).toFixed(0) : 0;
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">You scored {score} out of {questions.length}</p>
        <p className="text-4xl font-bold text-primary mb-6">{percentage}%</p>
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
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {currentQuestion && userDetails ? (
        <QuestionCard 
          question={currentQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          onNextQuestion={handleNextQuestion}
          learningStyle={userDetails.learningStyle || 'Visual'}
        />
      ) : (
         <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
            <p className="text-xl">{!userDetails ? "Loading user details..." : "No questions available for this topic yet."}</p>
         </div>
      )}
    </div>
  );
};

type QuizViewProps = {
    quizSource?: QuizSource | null;
    userDetails: UserDetails | null;
    onBack: () => void;
    onQuizCompleted: (score: number, total: number) => void;
}

const QuizView = ({ quizSource = null, userDetails, onBack, onQuizCompleted }: QuizViewProps) => {
  const [topics, setTopics] = React.useState(initialQuizTopics);
  const { user } = useUser();

  React.useEffect(() => {
    if (user) {
        const scoresKey = `quizScores-${user.uid}`;
        const scores = JSON.parse(localStorage.getItem(scoresKey) || '{}');
        const updatedTopics = initialQuizTopics.map(topic => ({
            ...topic,
            progress: scores[topic.id] !== undefined ? Math.round(scores[topic.id]) : -1,
        }));
        setTopics(updatedTopics);
    }
  }, [user, quizSource]);

  if (quizSource) {
    return <QuizSession source={quizSource} onBack={onBack} userDetails={userDetails} onQuizCompleted={onQuizCompleted} />
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
            // onClick={() => setSelectedTopic(topic)}
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
