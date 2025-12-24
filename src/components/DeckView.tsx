
"use client";

import React, { useState, useMemo } from 'react';
import type { Deck, Note, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Award, BookImage, Footprints, Eye, BookText } from 'lucide-react';
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
        <Card className="bg-background/50 border">
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline">Topic Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <NestedAccordion sections={parsed} />
            </CardContent>
        </Card>
    );
};


const LearnAsReadingWriting = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master this topic through structured writing, definitions, and summarization.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Rewrite → condense → memorise (most effective)</h4>
            <p><strong>How:</strong> Rewrite the notes in full sentences. Rewrite again, cutting it to half the length. Rewrite again into 10–12 key sentences. This forces you to identify what actually matters.</p>

            <h4>2️⃣ Definition mastery (exam gold)</h4>
            <p><strong>How:</strong> Create a page titled “GCSE Chemistry Definitions”. Write and memorise: atom, element, compound, mixture, chemical reaction, isotope, atomic number, mass number, relative atomic mass. Cover → rewrite → check → correct.</p>
            
            <h4>3️⃣ Turn every fact into a question</h4>
            <p><strong>Example:</strong> What is an atom? How are atoms represented? How are compounds formed? Why can compounds only be separated chemically? Then write full sentence answers.</p>

            <h4>4️⃣ Paragraph chaining (build understanding)</h4>
            <p>Write linked paragraphs on: atoms & elements, compounds & mixtures, atomic models, subatomic particles, and the periodic table & groups. Use connectives like therefore, because, as a result. This improves 6-mark answers.</p>

            <h4>5️⃣ Tables from memory (structure + clarity)</h4>
            <p>Rewrite key information into tables from memory, e.g., for Subatomic particles (Particle, Charge, Mass) or Group trends (| Group | Outer electrons | Reactivity trend |). Tables help exam organisation.</p>
            
            <h4>6️⃣ “Explain why” practice (higher marks)</h4>
            <p>Write short answers to: Explain why atoms have no overall charge. Explain why Group 0 elements are unreactive. Explain why Group 1 reactivity increases down the group. Explain why mixtures can be separated physically. This builds AO2/AO3 skills.</p>
            
            <h4>7️⃣ Model development summaries</h4>
            <p>Write one paragraph explaining how atomic models changed and why experimental evidence caused those changes. This targets common GCSE questions.</p>

            <h4>8️⃣ Bullet → sentence → paragraph method</h4>
            <p>Take bullet points and turn them into sentences, then combine sentences into a paragraph. Finally, rewrite the paragraph from memory.</p>

            <h4>9️⃣ Exam command-word practice</h4>
            <p><strong>How:</strong> Write answers using command words: define, describe, explain, compare, state. Stick to clear, concise language.</p>

            <h4>🔟 Daily 15-minute routine (reading/writing)</h4>
            <p>Read notes (5 mins), write from memory (5 mins), then check and correct in a different colour (5 mins).</p>
        </CardContent>
    </Card>
);

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
            <h4>1️⃣ Build-it-with-objects method (FOUNDATION METHOD)</h4>
            <p><strong>What you need:</strong> Coins / beads / paper balls / LEGO</p>
            <p><strong>How:</strong> One object = atom, Same objects = element, Different objects joined = compound, Loose pile = mixture. Say out loud while doing it: “Compounds are chemically combined.” “Mixtures are not chemically combined.” This physically locks in the concept.</p>
            
            <h4>2️⃣ Walk-the-topic method (movement + recall)</h4>
            <p>Walk around your room. Each step = one fact. Say from memory: “All substances are made of atoms,” “An atom is the smallest part of an element,” etc. If you stop, check notes, then restart walking.</p>
            
            <h4>3️⃣ Act out atomic models (model development)</h4>
            <p>You are the atom. Stand still (solid sphere), spread arms with dots (plum pudding), hands in center (nucleus), walk in circles (Bohr model). Say the model name while acting. Movement helps remember the sequence.</p>

            <h4>4️⃣ Human charge game (subatomic particles)</h4>
            <p>Stand up: Right hand up = +1 proton, Arms out = 0 neutron, Left hand down = –1 electron. Then say: “Atoms have no overall electrical charge.”</p>

            <h4>5️⃣ Scale it with your hands (size & mass)</h4>
            <p>Use your hands: Big circle with arms = atom, Tiny pinch = nucleus. Say: “Almost all of the mass is in the nucleus.” This makes the size vs. mass concept intuitive.</p>

            <h4>6️⃣ Electron shell walking</h4>
            <p>Put objects in circles on the floor. Walk and place electrons for Sodium (2, 8, 1), saying: “Electrons occupy the lowest available energy levels.”</p>
            
            <h4>7️⃣ Periodic table floor map</h4>
            <p>Use tape on the floor. Left side = metals, Right side = non-metals. Stand in Group 1 and say its reactivity trend. Do the same for Group 7 and Group 0.</p>

            <h4>8️⃣ Reactivity direction game</h4>
            <p>Point DOWN with your hand for Group 1 reactivity (increases), Group 7 reactivity (decreases), and Group 0 boiling point (increases). Directional movement helps recall trends.</p>
            
            <h4>9️⃣ Separation process stations (mixtures)</h4>
            <p>Set up 5 stations (Filtration, Crystallisation, etc.). Walk to a station and state what it separates and that it's a physical process.</p>

            <h4>🔟 Teach-an-invisible-student method</h4>
            <p>Stand up and teach the topic out loud with hand gestures but no notes. If you freeze, you've found a revision gap. Teaching is the deepest form of learning.</p>
        </CardContent>
    </Card>
);

const LearnAsVisual = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Engage with this topic by drawing, connecting, and organizing information visually.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ One MASTER DIAGRAM (highest impact)</h4>
            <p>Create one A3 sheet titled “Structure of Matter (GCSE Chemistry)”. Split it into sections with boxes for Atoms & Elements, Compounds & Mixtures, Atomic Structure, Periodic Table, and Groups 0, 1, 7. Use arrows to show links (e.g., atoms → elements → compounds, atomic structure → periodic table position → reactivity). Seeing everything connected prevents topic confusion.</p>

            <h4>2️⃣ Colour-coded meaning system (never change colours)</h4>
            <p>Use consistent colours: 🔵 Atoms / subatomic particles, 🟢 Compounds, 🟡 Mixtures, 🔴 Chemical reactions, 🟣 Periodic table / groups. Your brain remembers colour patterns faster than text.</p>

            <h4>3️⃣ “Before vs After” diagrams (for reactions & mixtures)</h4>
            <p>Draw paired boxes for a chemical reaction (Before: elements, After: compound + energy change) and a mixture (Before: substances together, After: substances separated physically). Label with ✔ new substance or ✖ no new substance. This visually locks in the difference.</p>

            <h4>4️⃣ Timeline strip for atomic models</h4>
            <p>Draw a horizontal timeline: Tiny solid sphere → Plum pudding model → Nuclear model → Bohr model → Protons → Neutrons. Add small sketches and arrows showing “new evidence → new model”.</p>

            <h4>5️⃣ Particle tables instead of sentences</h4>
            <p>Turn facts into tables for Subatomic particles (Particle, Charge, Mass, Location) and Atom facts (Feature, What it shows - Atomic number, Mass number). Tables help visual learners compare instantly.</p>
            
            <h4>6️⃣ Scale diagrams (size & mass)</h4>
            <p>Draw a large circle for an atom and a tiny dot for the nucleus. Write the radii (0.1 nm vs 1 × 10⁻¹⁴ m) and label “Almost all mass in nucleus”. Seeing the scale difference builds understanding.</p>

            <h4>7️⃣ Electronic structure ring diagrams</h4>
            <p>For the first 20 elements, draw shells as circles, add electrons as dots, and colour the outer shell. Label the group number and reactivity trend. This visually links electrons → group → properties.</p>

            <h4>8️⃣ Periodic table highlighting (pattern spotting)</h4>
            <p>Print a periodic table. Highlight groups vertically, shade metals vs. non-metals, and circle Groups 0, 1, and 7. Patterns equal memory.</p>

            <h4>9️⃣ Group summary boxes (exam gold)</h4>
            <p>Create one box per group (0, 1, 7) and list key properties (e.g., outer electrons, reactivity trend, boiling point trend). Seeing trends side-by-side is key.</p>

            <h4>🔟 Arrow trend diagrams (reactivity & boiling point)</h4>
            <p>Instead of words, use arrows: Group 1 reactivity ⬇️ increases, Group 7 reactivity ⬇️ decreases. Your brain remembers directional arrows well.</p>

            <h4>1️⃣1️⃣ Comparison grids (metals vs non-metals)</h4>
            <p>Draw a split box for Metals (positive ions, left/bottom) vs Non-metals (do not form positive ions, right/top). Quick visual contrast provides exam clarity.</p>

            <h4>1️⃣2️⃣ Redraw-from-memory rule (most important)</h4>
            <p>Daily routine: Look at your diagrams for 1 minute. Close notes. Redraw everything from memory. Add missing parts in a different colour. If you can redraw it, you understand it.</p>
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
    // Find a note that has exam skills, only relevant for deck1 for now
    const noteWithSkills = initialNotesData['deck1']?.find(note => note.examSkills);
    return noteWithSkills?.examSkills || null;
  }, []);


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
  
  const renderLearnContent = () => {
    if (!userDetails?.learningStyle || deck.id !== 'deck1') return null;

    let learnComponent = null;
    switch (userDetails.learningStyle) {
        case 'Kinesthetic':
            learnComponent = <LearnAsKinesthetic />;
            break;
        case 'Visual':
            learnComponent = <LearnAsVisual />;
            break;
        case 'Reading/Writing':
            learnComponent = <LearnAsReadingWriting />;
            break;
        default:
            return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Learn the Content</CardTitle>
                <CardDescription>
                    Here are some revision tasks tailored to your learning style.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {learnComponent}
            </CardContent>
        </Card>
    );
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
              {examSkillsText && deck.id === 'deck1' && (
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
            
            {renderLearnContent()}
            
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
