
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
import { ChevronRight, FileText, Mic, Layers, Baseline, Presentation, Youtube } from 'lucide-react';

type ImportDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
};

const importOptions = [
  { name: 'PDF', icon: FileText },
  { name: 'Record lecture', icon: Mic },
  { name: 'Quizlet', icon: Layers },
  { name: 'Notes', icon: Baseline },
  { name: 'PowerPoint', icon: Presentation },
  { name: 'YouTube', icon: Youtube },
];

export const ImportDialog = ({ isOpen, onClose, onSelect }: ImportDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Add information to your deck from various sources.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          {importOptions.map(option => (
            <Button
              key={option.name}
              variant="outline"
              className="w-full justify-start text-left h-14"
              onClick={() => onSelect(option.name)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <option.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="font-semibold">{option.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
