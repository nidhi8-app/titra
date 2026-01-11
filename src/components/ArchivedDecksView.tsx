
"use client";

import React from 'react';
import type { Deck } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Folder, Archive } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type ArchivedDecksViewProps = {
  archivedDecks: Deck[];
  onUnarchiveDeck: (deckId: string) => void;
};

const ArchivedDecksView = ({ archivedDecks, onUnarchiveDeck }: ArchivedDecksViewProps) => {
  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Archived Decks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {archivedDecks.length > 0 ? (
              <div className="space-y-2 pr-4">
                {archivedDecks.map(deck => (
                  <div key={deck.id} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                    <Folder className="w-6 h-6 text-muted-foreground" />
                    <span className="flex-1 font-semibold truncate">{deck.title}</span>
                    <Button variant="outline" size="sm" onClick={() => onUnarchiveDeck(deck.id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      Unarchive
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Archive className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">You have no archived decks.</p>
                <p className="text-sm text-muted-foreground">You can archive decks from the sidebar menu.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchivedDecksView;
