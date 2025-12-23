
"use client";

import React, { useState, useMemo } from 'react';
import type { Deck, Note, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Award, BookImage, Hand, Footprints, Pen, Headphones, Eye, Microscope } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { initialNotesData, parseNotes } from '@/lib/initial-notes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { PeriodicTableDialog } from './PeriodicTableDialog';
import { NestedAccordion } from './NestedAccordion';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (deckId: string, deckTitle:string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const NotesSummary = ({ notes, deckTitle }: { notes: Note[], deckTitle: string }) => {
    const parsed = React.useMemo(() => parseNotes(notes), [notes]);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline">Topic Summary</CardTitle>
                 <CardDescription>{deckTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <NestedAccordion sections={parsed} />
            </CardContent>
        </Card>
    );
};


const LearnAsKinesthetic = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Engage with this topic using action, movement, and real-world examples.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4 className="flex items-center gap-2"><Hand className="inline-block h-5 w-5" />Learn by Doing (Active Methods)</h4>
            <ul>
                <li><strong>Write it out by hand:</strong> Rewrite notes, summaries, or definitions — handwriting improves memory more than typing.</li>
                <li><strong>Build or model concepts:</strong> Use objects (LEGO, clay, paper, coins) to represent ideas. Example: atoms = beads, compounds = bead combinations.</li>
                <li><strong>Act it out:</strong> Physically role-play processes (e.g. particles vibrating, chemical reactions colliding).</li>
            </ul>

            <h4 className="flex items-center gap-2"><Footprints className="inline-block h-5 w-5" />Learn with Movement</h4>
            <ul>
                <li><strong>Walk while revising:</strong> Read flashcards or explain topics out loud while pacing.</li>
                <li><strong>Gesture while explaining:</strong> Use your hands to show steps, processes, or cause-and-effect.</li>
                <li><strong>Stations method:</strong> Set up different spots for different topics and rotate between them.</li>
            </ul>

            <h4 className="flex items-center gap-2"><Pen className="inline-block h-5 w-5" />Active Recall + Action</h4>
            <ul>
                <li><strong>Flashcards you touch and sort:</strong> Physically sort cards into “know / unsure / don’t know” piles.</li>
                <li><strong>Whiteboard blurting:</strong> Write everything you remember, erase, then rewrite from memory.</li>
                <li><strong>Teach someone else:</strong> Stand up and explain the topic like a mini lesson.</li>
            </ul>

            <h4 className="flex items-center gap-2"><Eye className="inline-block h-5 w-5" />Make Learning Physical & Visual</h4>
            <ul>
                <li><strong>Draw diagrams and flowcharts:</strong> Redraw them from memory, not copying.</li>
                <li><strong>Colour-code with purpose:</strong> Same colours = same types of information.</li>
                <li><strong>Foldable notes / flip tabs:</strong> Opening and closing tabs reinforces memory.</li>
            </ul>
            
            <h4 className="flex items-center gap-2"><Headphones className="inline-block h-5 w-5" />Use the Body + Voice</h4>
            <ul>
                <li><strong>Say it out loud:</strong> Read notes, equations, or definitions aloud.</li>
                <li><strong>Record yourself:</strong> Listen back while moving or doing chores.</li>
                <li><strong>Create rhythms or actions:</strong> Match facts to claps, taps, or movements.</li>
            </ul>

             <h4 className="flex items-center gap-2"><Microscope className="inline-block h-5 w-5" />For Science</h4>
            <ul>
                <li>Re-enact experiments or processes.</li>
                <li>Label diagrams from memory.</li>
                <li>Use real-life examples you can touch or move.</li>
            </ul>
        </CardContent>
    </Card>
);


const DeckView = ({ deck, onQuiz, userDetails, onNoteAdded }: DeckViewProps) => {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isExamSkillsDialogOpen, setIsExamSkillsDialogOpen] = useState(false);
  const [isPeriodicTableDialogOpen, setIsPeriodicTableDialogOpen] = useState(false);
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
    const noteWithSkills = (deckNotes || []).find(note => note.examSkills);
    return noteWithSkills?.examSkills || null;
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
    
    onQuiz(deck.id, deck.title);
  };
  

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
            <NotesSummary notes={deckNotes} deckTitle={deck.title} />

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
            
            {deck.id === 'deck1' && userDetails?.learningStyle === 'Kinesthetic' && <LearnAsKinesthetic />}
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="w-6 h-6" />
                        AI Quiz
                    </CardTitle>
                    <CardDescription>Test your knowledge with a quiz tailored to your learning style.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button onClick={handleGenerateQuiz} disabled={isGeneratingQuiz} className="w-full" size="lg">
                        {isGeneratingQuiz ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           "Generate AI Quiz"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="pr-4">
            {renderContent()}
        </div>
      </ScrollArea>

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

    