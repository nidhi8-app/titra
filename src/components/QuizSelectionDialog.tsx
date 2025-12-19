
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { initialQuizTopics } from '@/lib/data';
import type { Card as TopicCard } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

type QuizSelectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: TopicCard) => void;
};

export const QuizSelectionDialog = ({ isOpen, onClose, onSelectTopic }: QuizSelectionDialogProps) => {
  const topics = initialQuizTopics;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Quiz</DialogTitle>
          <DialogDescription>
            Choose a topic to start quizzing yourself on.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 my-4">
          <div className="pr-4 space-y-2">
            {topics.map(topic => (
              <Button
                key={topic.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => onSelectTopic(topic)}
              >
                <span>{topic.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
