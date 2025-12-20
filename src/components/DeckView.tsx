
"use client";

import React, { useState } from 'react';
import type { Deck, Note } from '@/lib/types';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import NoteEditor from './NoteEditor';
import NoteCard from './NoteCard';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ImportDialog } from './ImportDialog';

type DeckViewProps = {
  deck: Deck;
};

const DeckView = ({ deck }: DeckViewProps) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const [isImporting, setIsImporting] = useState(false);

  const notesCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/notes`);
  }, [user, firestore]);
  
  const { data: notes, isLoading } = useCollection<Note>(notesCollectionRef);


  const handleSaveNote = async (title: string, body: string) => {
    if (!notesCollectionRef) return;

    const newNote: Omit<Note, 'id' | 'deckId'> = {
        title,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await addDoc(notesCollectionRef, { ...newNote, deckId: deck.id });
    
    setIsCreatingNote(false);
  };
  
  const deckNotes = React.useMemo(() => {
    return notes?.filter(note => note.deckId === deck.id) || [];
  }, [notes, deck.id]);

  if (isCreatingNote) {
    return <NoteEditor onSave={handleSaveNote} onCancel={() => setIsCreatingNote(false)} />;
  }

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h3 className="text-2xl font-semibold">Loading notes...</h3>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{deck.title}</h2>
        <Button onClick={() => setIsImporting(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Import
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deckNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
        ))}
        {deck.id === '1' && (
          <>
            <NoteCard note={{id: 'temp-1', title: "Combining atoms", body: "Atoms combine with other atoms through the movement of electrons...", createdAt: new Date(), updatedAt: new Date() }} />
            <NoteCard note={{id: 'temp-2', title: "Ionic bonds", body: "Takes place when metals and non-metals react by transferring electrons...", createdAt: new Date(), updatedAt: new Date() }} />
          </>
        )}
        {deck.id === '2' && (
          <>
             <NoteCard note={{id: 'temp-3', title: "What is an ion?", body: "An ion is an electrically charged atom or group of atoms formed by the loss or gain of electrons.", createdAt: new Date(), updatedAt: new Date() }} />
             <NoteCard note={{id: 'temp-4', title: "Giant ionic lattice", body: "The lattices formed by ionic compounds consist of a regular arrangement...", createdAt: new Date(), updatedAt: new Date() }} />
          </>
        )}
      </div>
      <ImportDialog
        isOpen={isImporting}
        onClose={() => setIsImporting(false)}
        onSelect={(option) => {
            if (option === 'Notes') {
                setIsCreatingNote(true);
            }
            setIsImporting(false);
        }}
      />
    </div>
  );
};

export default DeckView;
