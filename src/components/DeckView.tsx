
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Award, Book, BookImage } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { initialNotesData } from '@/lib/initial-notes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import KinestheticQuizView from './KinestheticQuizView';
import VisualQuizView from './VisualQuizView';
import ReadingWritingQuizView from './ReadingWritingQuizView';
import { PeriodicTableDialog } from './PeriodicTableDialog';
import { TopicList } from './TopicList';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};


const DeckView = ({ deck, onQuiz, userDetails }: DeckViewProps) => {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isExamSkillsDialogOpen, setIsExamSkillsDialogOpen] = useState(false);
  const [isPeriodicTableDialogOpen, setIsPeriodicTableDialogOpen] = useState(false);
  const [kinestheticQuiz, setKinestheticQuiz] = useState<string | null>(null);
  const [visualQuiz, setVisualQuiz] = useState<string | null>(null);
  const [readingWritingQuiz, setReadingWritingQuiz] = useState<string | null>(null);
  const { toast } = useToast();

  const notesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/notes`),
      where('deckId', '==', deck.id)
    );
  }, [user, firestore, deck.id]);
  
  const { data: userNotes, isLoading } = useCollection<Note>(notesQuery);

  const deckNotes = useMemo(() => {
    const initial = initialNotesData[deck.id] || [];
    if (isLoading) {
      return initial;
    }
    if (userNotes && userNotes.length > 0) {
      return userNotes;
    }
    return initial;
  }, [deck.id, userNotes, isLoading]);
  
  const examSkillsText = useMemo(() => {
    if (!deckNotes) return null;
    // Assuming the exam skills are on the first note of the deck for simplicity
    return deckNotes[0]?.examSkills || null;
  }, [deckNotes]);


  const handleGenerateQuiz = async () => {
    if (!deckNotes || deckNotes.length === 0) {
      toast({
        variant: "destructive",
        title: "Cannot generate quiz",
        description: "There are no notes in this deck to generate a quiz from.",
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
    
    if (userDetails.learningStyle === 'Visual') {
        setVisualQuiz(deck.title);
        return;
    }

    if (userDetails.learningStyle === 'Kinesthetic') {
        setKinestheticQuiz(deck.title);
        return;
    }

    if (userDetails.learningStyle === 'Reading/Writing') {
      setReadingWritingQuiz(deck.title);
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        toast({
            variant: "destructive",
            title: "AI Feature Disabled",
            description: "Please add your Gemini API key to the .env file to generate a quiz.",
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
      const errorMessage = error.message || "There was an error generating the quiz. Please try again.";
      toast({
          variant: "destructive",
          title: "Quiz Generation Failed",
          description: errorMessage,
      });
    } finally {
      setIsGeneratingQuiz(false);
    }
  };
  
  if (visualQuiz) {
    return <VisualQuizView title={visualQuiz} onBack={() => setVisualQuiz(null)} deckId={deck.id} />;
  }

  if (kinestheticQuiz) {
    return <KinestheticQuizView title={kinestheticQuiz} onBack={() => setKinestheticQuiz(null)} deckId={deck.id} />;
  }

  if (readingWritingQuiz) {
    return <ReadingWritingQuizView title={readingWritingQuiz} onBack={() => setReadingWritingQuiz(null)} deckId={deck.id} />;
  }

  const renderContent = () => {
    if (isLoading && !userNotes) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!deckNotes || deckNotes.length === 0) {
      return (
        <div className="text-center col-span-full py-16">
          <h3 className="mt-4 text-lg font-semibold">This deck is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add some notes to get started.</p>
        </div>
      );
    }

    return (
        <div className="space-y-6">
            <TopicList notes={deckNotes} />
            
            <div className="flex gap-2 mb-4">
              {examSkillsText && (
                  <Button variant="outline" className="w-full" onClick={() => setIsExamSkillsDialogOpen(true)}>
                      <Award className="mr-2 h-4 w-4" />
                      Exam Skills
                  </Button>
              )}
               <Button variant="outline" className="w-full" onClick={() => setIsPeriodicTableDialogOpen(true)}>
                    <BookImage className="mr-2 h-4 w-4" />
                    Periodic Table
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="w-6 h-6" />
                        Quiz Me
                    </CardTitle>
                    <CardDescription>Test your knowledge with a quiz tailored to your learning style.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button onClick={handleGenerateQuiz} disabled={isGeneratingQuiz} className="w-full" size="lg">
                        {isGeneratingQuiz ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           "Generate Quiz"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {renderContent()}

      {examSkillsText && (
        <Dialog open={isExamSkillsDialogOpen} onOpenChange={setIsExamSkillsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Exam Skills</DialogTitle>
              <DialogDescription>
                Here's what you need to know for your exam based on this topic.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] my-4">
              <div className="pr-4 prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {examSkillsText}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button onClick={() => setIsExamSkillsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
       <PeriodicTableDialog
        isOpen={isPeriodicTableDialogOpen}
        onClose={() => setIsPeriodicTableDialogOpen(false)}
      />
    </div>
  );
};

export default DeckView;
