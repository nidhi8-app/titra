
"use client";

import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

type QuestionCardProps = {
  question: QuizQuestion;
  onNextQuestion: () => void;
  onCorrectAnswer: () => void;
  learningStyle: string;
};

const QuestionCard = ({ question, onNextQuestion, onCorrectAnswer, learningStyle }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] =useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset state when the question changes
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
        onCorrectAnswer();
    }
  };

  const handleNext = () => {
    onNextQuestion();
  }

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return selectedOption === option ? 'bg-primary/80' : 'bg-primary';
    }
    if (option === question.correctAnswer) {
      return 'bg-green-500 hover:bg-green-600';
    }
    if (option === selectedOption && option !== question.correctAnswer) {
      return 'bg-red-500 hover:bg-red-600';
    }
    return 'bg-primary/50';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn("h-auto w-full whitespace-normal justify-start text-left", getButtonClass(option))}
              disabled={isAnswered}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          {isAnswered ? (
             <div className="flex w-full justify-between items-center">
                {!isCorrect ? (
                    <p className="text-red-500 font-semibold">Try again next time!</p>
                    // Add explanation component/button here.
                ) : (
                    <p className="text-green-500 font-semibold">Correct!</p>
                )}
                <Button onClick={handleNext}>
                  Next Question
                </Button>
            </div>
          ) : (
            <Button onClick={handleSubmit} disabled={!selectedOption}>
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
