"use client";

import React, { useState } from 'react';
import type { Deck } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Folder, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RenameDeckDialog } from './RenameDeckDialog';
import { DeleteDeckDialog } from './DeleteDeckDialog';

type DeckListProps = {
  decks: Deck[];
  selectedDeckId: string | null;
  onSelectDeck: (id: string) => void;
  onCreateDeck: () => void;
  onRenameDeck: (deckId: string, newTitle: string) => void;
  onDeleteDeck: (deckId: string) => void;
};

const DeckList = ({
  decks,
  selectedDeckId,
  onSelectDeck,
  onCreateDeck,
  onRenameDeck,
  onDeleteDeck,
}: DeckListProps) => {
  const [deckToRename, setDeckToRename] = useState<Deck | null>(null);
  const [deckToDelete, setDeckToDelete] = useState<Deck | null>(null);

  const handleRename = (deck: Deck, newTitle: string) => {
    onRenameDeck(deck.id, newTitle);
    setDeckToRename(null);
  };

  const handleDelete = (deck: Deck) => {
    onDeleteDeck(deck.id);
    setDeckToDelete(null);
  };
  
  return (
    <div className="p-2 flex flex-col h-full">
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
            <div key={deck.id} className="group relative">
              <button
                onClick={() => onSelectDeck(deck.id)}
                className={`w-full p-3 text-left rounded-2xl transition-colors duration-200 font-sidebar text-lg flex items-center gap-3 ${
                  selectedDeckId === deck.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-inner'
                    : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <Folder className="w-6 h-6 flex-shrink-0" />
                <h3 className="font-bold truncate flex-1">{deck.title}</h3>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem onClick={() => setDeckToRename(deck)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeckToDelete(deck)}
                    className="text-red-500 focus:text-red-500 focus:bg-red-500/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
      {deckToRename && (
        <RenameDeckDialog
          deck={deckToRename}
          onRename={handleRename}
          onClose={() => setDeckToRename(null)}
        />
      )}
      {deckToDelete && (
        <DeleteDeckDialog
          deck={deckToDelete}
          onDelete={handleDelete}
          onClose={() => setDeckToDelete(null)}
        />
      )}
    </div>
  );
};

export default DeckList;
