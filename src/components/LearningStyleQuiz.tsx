
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { learningStyleQuestions } from '@/lib/quiz-data';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { Label } from '@/components/ui/label';

const LearningStyleQuiz = ({ onComplete }: { onComplete: (style: string) => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const currentQuestion = learningStyleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / learningStyleQuestions.length) * 100;

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [currentQuestionIndex]: selectedOption };
      setAnswers(newAnswers);

      if (currentQuestionIndex < learningStyleQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(undefined);
      } else {
        calculateResult(newAnswers);
      }
    }
  };

  const calculateResult = (finalAnswers: { [key: number]: string }) => {
    const counts = { V: 0, A: 0, R: 0, K: 0 };
    Object.values(finalAnswers).forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    const dominantStyle = Object.keys(counts).reduce((a, b) =>
      counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
    );

    const mapVarkToStyle: { [key: string]: string } = {
      V: "Visual",
      A: "Auditory",
      R: "Reading/Writing",
      K: "Kinesthetic",
    };

    onComplete(mapVarkToStyle[dominantStyle]);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>What's your learning style?</CardTitle>
          <span className="text-sm text-muted-foreground">{currentQuestionIndex + 1} / {learningStyleQuestions.length}</span>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
        <RadioGroup onValueChange={setSelectedOption} value={selectedOption} key={currentQuestionIndex}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
              <RadioGroupItem value={option.type} id={`q${currentQuestionIndex}-o${index}`} />
              <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 text-base">{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col items-end gap-4">
        <Button onClick={handleNext} disabled={!selectedOption}>
          {currentQuestionIndex < learningStyleQuestions.length - 1 ? 'Next' : 'Finish'}
        </Button>
        <p className="text-xs text-muted-foreground self-center">
          This quiz is based on the VARK model.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LearningStyleQuiz;
