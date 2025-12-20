
"use client";

import React, { useState } from 'react';
import type { Deck, Note } from '@/lib/types';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import NoteEditor from './NoteEditor';
import NoteCard from './NoteCard';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

type DeckViewProps = {
  deck: Deck;
};

const DeckView = ({ deck }: DeckViewProps) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useUser();
  const firestore = useFirestore();

  const handleSaveNote = async (title: string, body: string) => {
    if (!user || !firestore) return;

    const newNote: Omit<Note, 'id'> = {
        title,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const notesCollectionRef = collection(firestore, `users/${user.uid}/notes`);
    const docRef = await addDoc(notesCollectionRef, newNote);
    
    setNotes(prev => [...prev, { ...newNote, id: docRef.id }]);
    setIsCreatingNote(false);
  };
  
  if (isCreatingNote) {
    return <NoteEditor onSave={handleSaveNote} onCancel={() => setIsCreatingNote(false)} />;
  }

  // If there are no cards, we can show a message to the user.
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-2xl font-semibold">This deck is empty!</h3>
        <p className="mt-2 text-muted-foreground">
          Click the button below to start adding notes.
        </p>
        <Button className="mt-4" onClick={() => setIsCreatingNote(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{deck.title}</h2>
        <Button onClick={() => setIsCreatingNote(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default DeckView;
