
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Edit, List } from 'lucide-react';

type FillInTheGapDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormat: (format: 'MCQ' | 'Writing') => void;
};

export const FillInTheGapDialog = ({ isOpen, onClose, onSelectFormat }: FillInTheGapDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Fill in the Gap</DialogTitle>
          <DialogDescription>
            How would you like to answer the questions?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => onSelectFormat('MCQ')}>
            <List className="h-8 w-8" />
            <span className="font-semibold">Multiple Choice</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => onSelectFormat('Writing')}>
            <Edit className="h-8 w-8" />
            <span className="font-semibold">Writing</span>
          </Button>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
