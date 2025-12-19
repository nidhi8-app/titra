
"use client";

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // When the question changes, pre-fill the answer if it exists
    setSelectedOption(answers[currentQuestionIndex]);
  }, [currentQuestionIndex, answers]);


  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [currentQuestionIndex]: selectedOption };
      setAnswers(newAnswers);

      if (currentQuestionIndex < learningStyleQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(undefined); // This will be overridden by the useEffect if an answer exists
      } else {
        calculateResult(newAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
        <div className="flex justify-end w-full gap-2">
            {currentQuestionIndex > 0 && (
                <Button variant="outline" onClick={handleBack}>
                    Back
                </Button>
            )}
            <Button onClick={handleNext} disabled={!selectedOption}>
                {currentQuestionIndex < learningStyleQuestions.length - 1 ? 'Next' : 'Finish'}
            </Button>
        </div>
        <p className="text-xs text-muted-foreground self-center">
          This quiz is based on the VARK model.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LearningStyleQuiz;
