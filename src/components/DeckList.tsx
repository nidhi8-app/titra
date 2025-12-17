"use client";

import React from 'react';
import type { Deck } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Folder, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type DeckListProps = {
  decks: Deck[];
  selectedDeckId: string | null;
  onSelectDeck: (id: string) => void;
  onCreateDeck: () => void;
};

const DeckList = ({
  decks,
  selectedDeckId,
  onSelectDeck,
  onCreateDeck,
}: DeckListProps) => {
  return (
    <div className="p-2 flex flex-col h-full items-center">
      <Button
        onClick={onCreateDeck}
        className="w-full mb-4 font-sidebar font-bold text-lg rounded-xl shadow-sm"
        variant="secondary"
      >
        <Plus className="mr-2" /> New Deck
      </Button>
      <ScrollArea className="flex-1 w-full">
        <div className="space-y-2 pr-2">
          {decks.map((deck) => (
            <button
              key={deck.id}
              onClick={() => onSelectDeck(deck.id)}
              className={`w-full p-3 text-center rounded-2xl transition-colors duration-200 font-sidebar text-lg flex items-center justify-center gap-3 ${
                selectedDeckId === deck.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-inner'
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Folder className="w-6 h-6" />
              <h3 className="font-bold truncate">{deck.title}</h3>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DeckList;
