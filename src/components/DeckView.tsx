
"use client";

import React, { useState, useMemo } from 'react';
import type { Deck, Note, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Award, BookImage, Hand, Footprints, Pen, Headphones, Eye, Microscope, Map, Boxes, Palette, GitBranch, Triangle, ListChecks, Columns, Brain, Highlighter, DraftingCompass, BookCopy, BookText, Sigma, Link, TestTube, ChevronsRightLeft, Thermometer, Rows, Key, CircleDashed, Disc, Gauge, Cloud, TestTube2, Network, PersonStanding, CheckCircle, Handshake, Recycle } from 'lucide-react';
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
        <Card className="bg-background/50 border-2">
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
            <h4>1️⃣ Rewrite → Reduce → Rewrite (very effective)</h4>
            <p>Rewrite the notes in full sentences. Reduce them to half the length. Reduce again to 5–6 key sentences. This forces understanding, not copying.</p>

            <h4>2️⃣ Definition drilling (exam-focused)</h4>
            <p>Write each definition clearly: atom, element, compound, chemical reaction. Cover the definitions. Rewrite them from memory. Check and correct. Repeat until accurate.</p>
            
            <h4>3️⃣ Turn notes into questions</h4>
            <p>Convert each line into a question, e.g.: What are all substances made of? What is an atom? How are atoms represented? How are compounds formed? Then write full answers.</p>

            <h4>4️⃣ Sentence stems (controlled writing)</h4>
            <p>Complete these in writing: “All substances are made of …”, “An atom is …”, “Compounds contain …”, “Chemical reactions always involve …” This helps precise exam wording.</p>

            <h4>5️⃣ Paragraph chaining</h4>
            <p>Write one paragraph about atoms & elements. Write one paragraph about compounds. Write one paragraph about chemical reactions. Link paragraphs using connectives like because, therefore, however.</p>
            
            <h4>6️⃣ Keyword lists + explanations</h4>
            <p>List keywords from the notes. Under each, write a one-line explanation in your own words. Example: atom → smallest part of an element that can exist.</p>

            <h4>7️⃣ Copy → Cover → Write (classic but powerful)</h4>
            <p>Copy a section neatly. Cover it. Write it again from memory. Compare and correct in a different colour.</p>

            <h4>8️⃣ Exam command-word practice</h4>
            <p>Write answers to: Define atom, Describe a compound, Explain a chemical reaction, State two ways reactions can be represented. Stick to clear written responses.</p>

            <h4>9️⃣ Checklist writing</h4>
            <p>Rewrite the “Students should be able to…” section as a checklist, then rewrite it as sentences, then rewrite from memory.</p>
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
            <p><strong>How:</strong></p>
            <ul>
                <li>One object = atom</li>
                <li>Same objects = element</li>
                <li>Different objects joined = compound</li>
                <li>Loose pile = mixture</li>
            </ul>
            <p>Say out loud while doing it: “Compounds are chemically combined.”, “Mixtures are not chemically combined.”</p>
            <p>👉 This physically locks in compound vs mixture (huge exam confusion point).</p>
            
            <h4>2️⃣ Walk-the-topic method (movement + recall)</h4>
            <p>Walk around your room. Each step = one fact. Say (from memory):</p>
            <ul>
                <li>“All substances are made of atoms.”</li>
                <li>“An atom is the smallest part of an element.”</li>
                <li>“Elements are shown in the periodic table.”</li>
                <li>“Chemical reactions form new substances.”</li>
            </ul>
            <p>If you stop → check notes → restart walking.</p>
            
            <h4>3️⃣ Act out atomic models (model development)</h4>
            <p>You = the atom.</p>
            <ul>
                <li>Stand still → tiny solid sphere</li>
                <li>Spread arms with dots → plum pudding model</li>
                <li>Hands tight in centre → nucleus</li>
                <li>Walk in circles → Bohr model</li>
                <li>Tap chest → protons</li>
                <li>Tap head → neutrons</li>
            </ul>
            <p>Say the model name while acting it out. 👉 Movement helps remember sequence + reasons models changed.</p>

            <h4>4️⃣ Human charge game (subatomic particles)</h4>
            <p>Stand up and use your body:</p>
            <ul>
                <li>Right hand up → +1 proton</li>
                <li>Arms out → 0 neutron</li>
                <li>Left hand down → –1 electron</li>
            </ul>
            <p>Then say: “Atoms have no overall electrical charge.” and “Number of electrons equals number of protons.”</p>

            <h4>5️⃣ Scale it with your hands (size & mass)</h4>
            <p>Use your hands: Big circle with arms → atom. Tiny pinch → nucleus. Say: “Almost all of the mass is in the nucleus.” This makes size vs mass intuitive.</p>

            <h4>6️⃣ Electron shell walking</h4>
            <p>Put objects in circles on the floor. Walk and place Sodium → 2, 8, 1. Say: “Electrons occupy the lowest available energy levels.”</p>
            
            <h4>7️⃣ Periodic table floor map</h4>
            <p>Use tape or paper on the floor. Left side = metals. Right side = non-metals. Stand in Group 1 → say “reactivity increases down the group”. Stand in Group 7 → say “reactivity decreases down the group”. Stand in Group 0 → say “full outer shell, unreactive”.</p>

            <h4>8️⃣ Reactivity direction game</h4>
            <p>Point DOWN with your hand: Group 1 → “reactivity increases”. Group 7 → “reactivity decreases”. Group 0 → “boiling point increases”.</p>
            
            <h4>9️⃣ Separation process stations (mixtures)</h4>
            <p>Set up 5 “stations” (different spots in the room): Filtration, Crystallisation, Simple distillation, Fractional distillation, Chromatography. Walk to a station and say: what it separates, that it is a physical process, that no new substances are made.</p>

            <h4>🔟 Teach-an-invisible-student method</h4>
            <p>Stand up and teach the topic out loud like a lesson. Rule: No notes, use hand gestures. If you freeze → that’s a revision gap. Teaching = deepest learning.</p>
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
            <p>Create one A3 sheet titled: “Structure of Matter (GCSE Chemistry)”. Split it into sections with boxes for Atoms & Elements, Compounds & Mixtures, Atomic Structure, Periodic Table, and Groups 0, 1, 7. Use arrows to show links. 👉 Seeing everything connected prevents topic confusion.</p>

            <h4>2️⃣ Colour-coded meaning system (never change colours)</h4>
            <p>Use the same colours every time: 🔵 Atoms / subatomic particles, 🟢 Compounds, 🟡 Mixtures, 🔴 Chemical reactions, 🟣 Periodic table / groups. Your brain remembers colour patterns faster than text.</p>

            <h4>3️⃣ “Before vs After” diagrams (for reactions & mixtures)</h4>
            <p>Draw paired boxes for a chemical reaction (Before: elements, After: compound + energy change) and a mixture (Before: substances together, After: substances separated physically). Label with ✔ new substance or ✖ no new substance. This visually locks in the difference.</p>

            <h4>4️⃣ Timeline strip for atomic models</h4>
            <p>Draw a horizontal timeline: Tiny solid sphere → Plum pudding model → Nuclear model → Bohr model → Protons → Neutrons. Add small sketches and arrows showing “new evidence → new model”. This helps with exam questions about scientific development.</p>

            <h4>5️⃣ Particle tables instead of sentences</h4>
            <p>Turn facts into tables for Subatomic particles (Particle, Charge, Mass, Location) and Atom facts (Feature, What it shows - Atomic number, Mass number). Tables help visual learners compare instantly.</p>
            
            <h4>6️⃣ Scale diagrams (size & mass)</h4>
            <p>Draw a large circle for an atom and a tiny dot in the centre for the nucleus. Write the atom radius (0.1 nm) and nucleus radius (1 × 10⁻¹⁴ m). Add “Almost all mass in nucleus”. Seeing the scale difference builds understanding.</p>

            <h4>7️⃣ Electronic structure ring diagrams</h4>
            <p>For the first 20 elements, draw shells as circles, add electrons as dots, and colour the outer shell. Then label the group number and reactivity trend. This visually links electrons → group → properties.</p>

            <h4>8️⃣ Periodic table highlighting (pattern spotting)</h4>
            <p>Print a periodic table. Highlight groups vertically. Shade metals (left & bottom) and non-metals (right & top). Circle Groups 0, 1, and 7. Patterns = memory.</p>

            <h4>9️⃣ Group summary boxes (exam gold)</h4>
            <p>Create one box per group (0, 1, and 7) and list their key properties (e.g., outer electrons, reactivity trend, boiling point trend). Seeing trends side-by-side is key.</p>

            <h4>🔟 Arrow trend diagrams (reactivity & boiling point)</h4>
            <p>Instead of words, use arrows: Group 1 reactivity ⬇️ increases, Group 7 reactivity ⬇️ decreases, Group 0 boiling point ⬇️ increases. Your brain remembers directional arrows very well.</p>

            <h4>1️⃣1️⃣ Comparison grids (metals vs non-metals)</h4>
            <p>Draw a split box for Metals (positive ions, left/bottom) vs Non-metals (do not form positive ions, right/top). Quick visual contrast = exam clarity.</p>

            <h4>1️⃣2️⃣ Redraw-from-memory rule (most important)</h4>
            <p>Daily routine: Look at your diagrams for 1 minute. Close notes. Redraw everything from memory. Add missing parts in a different colour. If you can redraw it → you understand it.</p>
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
            {deck.id === 'deck1' && userDetails?.learningStyle === 'Visual' && <LearnAsVisual />}
            {deck.id === 'deck1' && userDetails?.learningStyle === 'Reading/Writing' && <LearnAsReadingWriting />}
            
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
