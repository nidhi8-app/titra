
"use client";

import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
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
import { useToast } from '@/hooks/use-toast';

type QuestionCardProps = {
  question: QuizQuestion;
  onNextQuestion: () => void;
  onCorrectAnswer: () => void;
  learningStyle: string;
};

const QuestionCard = ({ question, onNextQuestion, onCorrectAnswer, learningStyle }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [isExplanationDialogOpen, setIsExplanationDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setExplanation(null);
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
      if (error.message.includes('API key not valid')) {
        setExplanation("The Google AI API Key is not set. Please add your GEMINI_API_KEY to the .env file to use this feature.");
      } else {
        setExplanation("Sorry, I couldn't get an explanation at this time.");
      }
    } finally {
      setIsExplanationLoading(false);
    }
  };

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
    <>
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
                <div>
                  {!isCorrect ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <p className="text-red-500 font-semibold">Try again next time!</p>
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
              <Button onClick={handleSubmit} disabled={!selectedOption}>
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

export default QuestionCard;

    