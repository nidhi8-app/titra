"use client";

import React from 'react';
import type { Note } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

type NoteListProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
};

const NoteList = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
}: NoteListProps) => {
  return (
    <div className="p-2 flex flex-col h-full">
      <Button
        onClick={onCreateNote}
        className="w-full mb-4 font-sidebar font-bold text-lg rounded-xl shadow-sm"
        variant="secondary"
      >
        <Plus className="mr-2" /> New Note
      </Button>
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-2">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`w-full p-3 text-left rounded-2xl transition-colors duration-200 font-sidebar text-lg ${
                selectedNoteId === note.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-inner'
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <h3 className="font-bold truncate">{note.title}</h3>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NoteList;
