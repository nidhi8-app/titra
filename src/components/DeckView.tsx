"use client";

import React from 'react';
import type { Deck } from '@/lib/types';
import { Button } from './ui/button';
import { Plus, Search } from 'lucide-react';
import { Progress } from './ui/progress';

type DeckViewProps = {
  deck: Deck;
};

const DeckView = ({ deck }: DeckViewProps) => {
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My decks</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Plus className="mr-2" />
            Add deck
          </Button>
          <Button>Learn</Button>
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deck.cards.map((card) => (
          <div key={card.id} className="rounded-xl shadow-md bg-card border flex flex-col">
            <div className={`h-16 rounded-t-xl ${card.color}`}></div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-bold truncate mb-2">{card.title}</h3>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>{card.cardCount > 0 ? `${card.cardCount} cards` : ''}</span>
                  {card.progress > 0 && (
                    <span className="font-semibold">{card.progress}%</span>
                  )}
                </div>
                {card.progress > 0 && (
                  <Progress value={card.progress} className="h-2 mt-2" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckView;
