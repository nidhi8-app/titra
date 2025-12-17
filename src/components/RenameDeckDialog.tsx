"use client";

import React, { useState } from 'react';
import type { Deck } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type RenameDeckDialogProps = {
  deck: Deck;
  onRename: (deck: Deck, newTitle: string) => void;
  onClose: () => void;
};

export const RenameDeckDialog = ({
  deck,
  onRename,
  onClose,
}: RenameDeckDialogProps) => {
  const [newTitle, setNewTitle] = useState(deck.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onRename(deck, newTitle.trim());
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Deck</DialogTitle>
            <DialogDescription>
              Enter a new name for the deck "{deck.title}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="deck-name" className="sr-only">
              Deck Name
            </Label>
            <Input
              id="deck-name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Rename</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
