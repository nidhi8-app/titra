
"use client";

import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { explainConcept } from '@/ai/flows/explain-concept-flow';
import { Loader } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

type WritingQuestionCardProps = {
  question: QuizQuestion;
  onNextQuestion: () => void;
  onCorrectAnswer: () => void;
  learningStyle: string;
};

const WritingQuestionCard = ({ question, onNextQuestion, onCorrectAnswer, learningStyle }: WritingQuestionCardProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [isExplanationDialogOpen, setIsExplanationDialogOpen] = useState(false);

  useEffect(() => {
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowReveal(false);
    setExplanation(null);
  }, [question]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      onCorrectAnswer();
    }
  };

  const handleReveal = () => {
    setShowReveal(true);
    setIsAnswered(true);
    setIsCorrect(false); // Revealing means they didn't get it right on their own
  };

  const handleNext = () => {
    onNextQuestion();
  };

  const handleExplainConcept = async () => {
    setIsExplanationLoading(true);
    setExplanation(null);
    setIsExplanationDialogOpen(true);
    try {
      const result = await explainConcept({
        question: question.question,
        correctAnswer: question.correctAnswer,
        learningStyle: learningStyle,
      });
      setExplanation(result.explanation);
    } catch (error: any) {
      console.error("Failed to get explanation:", error);
      setExplanation("Sorry, I couldn't get an explanation at this time.");
    } finally {
      setIsExplanationLoading(false);
    }
  };

  const getHint = () => {
    const hintLength = Math.max(3, Math.floor(question.correctAnswer.length / 3));
    return question.correctAnswer.substring(0, hintLength) + '...';
  }

  const inputClass = isAnswered 
    ? (isCorrect ? 'border-green-500 focus-visible:ring-green-500' : 'border-red-500 focus-visible:ring-red-500')
    : '';

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={showReveal ? question.correctAnswer : userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={isAnswered || showReveal}
              className={cn("text-base", inputClass)}
            />
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} disabled={isAnswered}>
                    {showHint ? 'Hide' : 'Hint'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleReveal} disabled={isAnswered}>
                    Reveal Answer
                </Button>
            </div>
            {showHint && !isAnswered && !showReveal && (
                 <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">Hint: {getHint()}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            {isAnswered ? (
              <div className="flex w-full justify-between items-center">
                <div>
                  {!isCorrect ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <p className="text-red-500 font-semibold">The correct answer is: {question.correctAnswer}</p>
                      <Button variant="outline" onClick={handleExplainConcept}>
                        Explain the concept to me
                      </Button>
                    </div>
                  ) : (
                    <p className="text-green-500 font-semibold">Correct!</p>
                  )}
                </div>
                <Button onClick={handleNext}>
                  Next Question
                </Button>
              </div>
            ) : (
              <Button onClick={handleSubmit} disabled={!userAnswer}>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isExplanationDialogOpen} onOpenChange={setIsExplanationDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Explanation</DialogTitle>
            <DialogDescription>
              Here's an explanation tailored for a {learningStyle} learner.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] my-4">
            <div className="pr-4">
              {isExplanationLoading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {explanation}
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsExplanationDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WritingQuestionCard;
