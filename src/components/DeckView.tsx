
"use client";

import React, { useState } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { Plus, BrainCircuit, Loader2 } from 'lucide-react';
import NoteEditor from './NoteEditor';
import NoteCard from './NoteCard';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { ImportDialog } from './ImportDialog';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { useToast } from '@/hooks/use-toast';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const DeckView = ({ deck, onQuiz, userDetails, onNoteAdded }: DeckViewProps) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const [isImporting, setIsImporting] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const { toast } = useToast();

  const notesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/notes`),
      where('deckId', '==', deck.id)
    );
  }, [user, firestore, deck.id]);
  
  const { data: deckNotes, isLoading } = useCollection<Note>(notesQuery);


  const handleSaveNote = async (title: string, body: string) => {
    if (!user || !firestore) return;
    const notesCollectionRef = collection(firestore, `users/${user.uid}/notes`);

    const newNote: Omit<Note, 'id' > = {
        title,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
        deckId: deck.id,
    };

    await addDoc(notesCollectionRef, newNote);
    onNoteAdded();
    setIsCreatingNote(false);
  };

  const handleGenerateQuiz = async () => {
    if (!deckNotes || deckNotes.length === 0) {
      toast({
        variant: "destructive",
        title: "Cannot generate quiz",
        description: "You need to add some notes to this deck first.",
      });
      return;
    }
    
    if (!userDetails?.learningStyle) {
      toast({
        variant: "destructive",
        title: "Learning style not set",
        description: "Please set your learning style in the 'Learning Style' tab before generating a quiz.",
      });
      return;
    }

    setIsGeneratingQuiz(true);
    try {
      const notesContent = deckNotes.map(n => `Title: ${n.title}\nBody: ${n.body}`).join('\n\n---\n\n');
      const result = await generateQuiz({
        notes: notesContent,
        learningStyle: userDetails.learningStyle,
      });

      if (result.questions && result.questions.length > 0) {
        onQuiz(result.questions, deck.title);
      } else {
        throw new Error("AI did not return any questions.");
      }
    } catch (error: any) {
      console.error("Failed to generate quiz:", error);
      if (error.message.includes('API key not valid')) {
        toast({
            variant: "destructive",
            title: "Google AI API Key is Not Set",
            description: "Please set your GEMINI_API_KEY in the .env file to use this feature.",
        });
      } else {
        toast({
            variant: "destructive",
            title: "Quiz Generation Failed",
            description: "There was an error generating the quiz. Please try again.",
        });
      }
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  if (isCreatingNote) {
    return <NoteEditor onSave={handleSaveNote} onCancel={() => setIsCreatingNote(false)} />;
  }

  const renderDeckCards = () => {
    if (deck.cards.length === 0 && (!deckNotes || deckNotes.length === 0)) {
      return (
        <div className="text-center col-span-full py-16">
          <h3 className="mt-4 text-lg font-semibold">This deck is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">Click 'Import' to add your first note.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deckNotes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold">{deck.title}</h2>
        <div className="flex gap-2">
            <Button onClick={() => setIsImporting(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Import
            </Button>
            <Button onClick={handleGenerateQuiz} disabled={isGeneratingQuiz}>
                {isGeneratingQuiz ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <BrainCircuit className="mr-2 h-4 w-4" />
                )}
                Quiz me
            </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        renderDeckCards()
      )}
      <ImportDialog
        isOpen={isImporting}
        onClose={() => setIsImporting(false)}
        onSelect={(option) => {
            if (option === 'Notes') {
                setIsCreatingNote(true);
            } else {
                toast({
                    title: "Feature not available",
                    description: `Importing from "${option}" is not yet implemented.`,
                });
            }
            setIsImporting(false);
        }}
      />
    </div>
  );
};

export default DeckView;
