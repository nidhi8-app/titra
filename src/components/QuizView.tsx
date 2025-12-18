
"use client";

import React from 'react';
import { initialQuizTopics } from '@/lib/data';
import { Button } from './ui/button';
import { Plus, Search } from 'lucide-react';
import { Progress } from './ui/progress';

const QuizView = () => {
  const topics = initialQuizTopics;

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
          <div key={topic.id} className="rounded-xl shadow-md bg-card border flex flex-col">
            <div className={`h-16 rounded-t-xl ${topic.color}`}></div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold truncate mb-2">{topic.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizView;
