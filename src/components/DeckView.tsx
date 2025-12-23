
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Lightbulb, BookOpen, Mic, Footprints, MessageSquare, Award } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { generatePodcast } from '@/ai/flows/generate-podcast-flow';
import type { GeneratePodcastOutput } from '@/ai/flows/generate-podcast-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { initialNotesData, type InitialNoteSeed } from '@/lib/initial-notes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import KinestheticQuizView from './KinestheticQuizView';
import VisualQuizView from './VisualQuizView';
import ReadingWritingQuizView from './ReadingWritingQuizView';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const NotesSummary = ({ notesText }: { notesText: string }) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Topic Notes</CardTitle>
                <CardDescription>A quick overview of the key points in this deck.</CardDescription>
            </CardHeader>
            <CardContent>
                {!notesText && <p className="text-destructive text-sm">There are no notes to display.</p>}
                {notesText && (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {notesText}
                    </div>
                )}
            </CardContent>
        </Card>
    )
};


const PodcastPlayer = ({ title, notesText }: { title: string, notesText: string }) => {
    const [podcast, setPodcast] = useState<GeneratePodcastOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const generateAudio = async () => {
            if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
                setError("The AI podcast feature is disabled. Please add your Gemini API key to the .env file to enable it.");
                setIsLoading(false);
                return;
            }

            if (!notesText) {
                setError("There are no notes to generate a podcast from.");
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            setError(null);

            try {
                const result = await generatePodcast(notesText);
                if (result.media) {
                    setPodcast(result);
                } else {
                    throw new Error("AI did not return any audio.");
                }
            } catch (err: any) {
                console.error("Failed to generate podcast:", err);
                const errorMessage = err.message || "Could not generate audio at this time.";
                setError(errorMessage);
                toast({
                    variant: "destructive",
                    title: "Podcast Generation Failed",
                    description: errorMessage,
                });
            } finally {
                setIsLoading(false);
            }
        };

        generateAudio();
    }, [notesText, toast]);

    return (
        <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <Mic className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-sm text-muted-foreground">Titra Podcasts</p>
                </div>
            </div>
            
            {isLoading && (
                <div className="flex items-center justify-center h-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Generating your podcast...</p>
                </div>
            )}
            
            {error && (
                 <div className="flex items-center justify-center h-24 text-destructive text-sm px-4 text-center">
                    <p>{error}</p>
                 </div>
            )}

            {!isLoading && !error && podcast?.media && (
                <audio controls className="w-full">
                    <source src={podcast.media} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};


const LearningStyleContent = ({ notes, learningStyle, deckTitle, deckId }: { notes: (Note | InitialNoteSeed)[], learningStyle: string, deckTitle: string, deckId: string }) => {
  const combinedNotes = useMemo(() => notes.map(n => `### ${n.title}\n\n${n.body}`).join('\n\n---\n\n'), [notes]);

  const styleInfo = {
    "Visual": { icon: Lightbulb, description: "Visual learners thrive on images, diagrams, and seeing the connections between ideas. Try these techniques to make your notes more memorable." },
    "Auditory": { icon: Mic, description: "Auditory learners prefer listening and speaking. Plug in and listen to this podcast episode covering the key concepts." },
    "Kinesthetic": { icon: Footprints, description: "Kinesthetic learners prefer hands-on experience and application. Here are some activities to get you moving." },
    "Reading/Writing": { icon: BookOpen, description: "Reading/Writing learners prefer text-based information. Here are your notes, organized for clarity and review." },
  };

  const { icon: Icon, description } = styleInfo[learningStyle as keyof typeof styleInfo] || styleInfo["Reading/Writing"];

  const renderLearningContent = () => {
    switch (learningStyle) {
      case 'Auditory':
        return <PodcastPlayer title={deckTitle} notesText={combinedNotes} />;
      case 'Kinesthetic':
        return (
           <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h4>Tabletop sorting game (great for memory)</h4>
              <p><strong>What to do</strong></p>
              <p>Write these on separate pieces of paper:</p>
              <ul>
                <li>atom</li>
                <li>element</li>
                <li>compound</li>
                <li>chemical reaction</li>
                <li>symbol</li>
                <li>formula</li>
                <li>word equation</li>
                <li>periodic table</li>
              </ul>
              <p>Physically sort them into groups:</p>
              <ul>
                <li>“Things”</li>
                <li>“Representations”</li>
                <li>“Processes”</li>
              </ul>
              <p>Move them around until it makes sense.</p>
              <p>👉 This builds understanding, not just memory.</p>
              <hr />
              <h4>Teach an imaginary class</h4>
              <p><strong>What to do</strong></p>
              <ul>
                  <li>Stand up.</li>
                  <li>Explain the topic out loud like you’re teaching Year 7.</li>
                  <li>Use hand movements and pointing.</li>
              </ul>
              <p>If you can teach it without notes, you understand it.</p>
              <hr />
              <h4>Rip-and-rebuild notes</h4>
               <p><strong>What to do</strong></p>
              <ul>
                  <li>Write notes once.</li>
                  <li>Rip the page into strips (each strip = one idea).</li>
                  <li>Mix them up.</li>
                  <li>Rebuild them in the correct order.</li>
                  <li>Say each sentence as you place it.</li>
              </ul>
              <hr />
              <h4>Rubber-band chemistry</h4>
              <p><strong>What to do</strong></p>
              <ul>
                  <li>Rubber bands = chemical bonds</li>
                  <li>Stretching band → energy change</li>
                  <li>Breaking band → chemical reaction</li>
              </ul>
              <p>Say what’s happening while doing it.</p>
            </div>
          </ScrollArea>
        );
      case 'Visual':
        if (deckId === 'deck1') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>One Master Diagram (Highest Impact)</h4>
                <p>On a large sheet of paper, create a central hub titled "Structure of Matter". Branch out with main sections in boxes: Atoms & Elements, Compounds & Mixtures, Atomic Structure, and Periodic Table Groups. Use arrows to link related concepts (e.g., atoms → elements → compounds). This creates a single visual anchor for the whole topic.</p>
                <hr />
                <h4>Color-Coded Meaning System</h4>
                <p>Assign a specific color to each core concept and stick to it: 🔵 Atoms/Subatomic Particles, 🟢 Compounds, 🟡 Mixtures, 🔴 Reactions, 🟣 Periodic Table. Your brain will build faster connections based on these visual cues.</p>
                <hr />
                <h4>"Before vs. After" Diagrams</h4>
                <p>Draw paired boxes to compare processes. For a chemical reaction, show "Before: separate elements" and "After: compound formed + energy change". For a mixture, show "Before: substances together" and "After: substances physically separated". This visually solidifies the key difference.</p>
                <hr />
                <h4>Atomic Model Timeline</h4>
                <p>Draw a horizontal timeline showing the evolution of the atomic model: Solid Sphere → Plum Pudding → Nuclear → Bohr → Protons/Neutrons. Add small sketches and arrows labeled "new evidence" to show how scientific understanding developed.</p>
                <hr />
                <h4>Particle Tables for Quick Comparison</h4>
                <p>Instead of writing sentences, organize information into tables. Create one for subatomic particles (Particle, Charge, Mass, Location) and another for atomic numbers and mass numbers. Tables allow for instant visual comparison.</p>
                <hr />
                <h4>Scale Diagrams for Size and Mass</h4>
                <p>Draw a large circle for an atom and a tiny dot in the middle for the nucleus. Label their approximate sizes (0.1 nm vs 1x10⁻¹⁴ m) and add the note "Almost all mass is in the nucleus." Seeing the scale difference makes the concept tangible.</p>
                <hr />
                <h4>Electronic Structure Ring Diagrams</h4>
                <p>For the first 20 elements, draw the nucleus and electron shells as concentric circles. Fill in the electrons and color-code the outer shell. This visually links an element's structure to its group and reactivity.</p>
                <hr />
                <h4>Periodic Table Highlighting</h4>
                <p>Print a periodic table and use highlighters to mark patterns. Shade the areas for metals and non-metals. Circle key groups (0, 1, 7). This turns the table from a list of facts into a map of patterns.</p>
                <hr />
                <h4>Group Summary Boxes</h4>
                <p>For each key group (0, 1, 7), create a small summary box with the most critical information: number of outer electrons, reactivity trend, and key properties. Placing these side-by-side makes comparison effortless.</p>
                <hr />
                <h4>Arrow Trend Diagrams</h4>
                <p>Represent trends using simple arrows instead of words. For example: Group 1 Reactivity ⬇️ INCREASES. Group 7 Reactivity ⬇️ DECREASES. Your brain processes and remembers these directional cues very effectively.</p>
                <hr />
                <h4>Redraw-from-Memory Rule</h4>
                <p><strong>This is the most important technique.</strong> Look at your master diagram or notes for one minute. Cover them up and redraw everything from memory. Then, compare and add any missing information in a different color. If you can draw it, you truly understand it.</p>
              </div>
            </ScrollArea>
          );
        }
        // Fallback for other decks for visual learners
        return (
          <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {combinedNotes}
            </div>
          </ScrollArea>
        );
      case 'Reading/Writing':
        if (deckId === 'deck1') {
            return (
              <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h4>1️⃣ Rewrite → Reduce → Rewrite (very effective)</h4>
                      <p><strong>How</strong>: Rewrite the notes in full sentences. Reduce them to half the length. Reduce again to 5–6 key sentences. This forces understanding, not copying.</p>
                      <hr />
                      <h4>2️⃣ Definition drilling (exam-focused)</h4>
                      <p><strong>How</strong>: Write each definition clearly: atom, element, compound, chemical reaction. Cover the definitions. Rewrite them from memory. Check and correct. Repeat until accurate.</p>
                      <hr />
                      <h4>3️⃣ Turn notes into questions</h4>
                      <p><strong>How</strong>: Convert each line into a question, e.g.: What are all substances made of? What is an atom? How are atoms represented? How are compounds formed? Then write full answers.</p>
                      <hr />
                      <h4>4️⃣ Sentence stems (controlled writing)</h4>
                      <p>Complete these in writing: “All substances are made of …”, “An atom is …”, “Compounds contain …”, “Chemical reactions always involve …”. This helps precise exam wording.</p>
                      <hr />
                      <h4>5️⃣ Paragraph chaining</h4>
                      <p><strong>How</strong>: Write one paragraph about atoms & elements. Write one paragraph about compounds. Write one paragraph about chemical reactions. Link paragraphs using connectives like because, therefore, however.</p>
                      <hr />
                      <h4>6️⃣ Keyword lists + explanations</h4>
                      <p><strong>How</strong>: List keywords from the notes. Under each, write a one-line explanation in your own words. Example: atom → smallest part of an element that can exist.</p>
                      <hr />
                      <h4>7️⃣ Copy → Cover → Write (classic but powerful)</h4>
                      <p><strong>How</strong>: Copy a section neatly. Cover it. Write it again from memory. Compare and correct in a different colour.</p>
                      <hr />
                      <h4>8️⃣ Exam command-word practice</h4>
                      <p><strong>How</strong>: Write answers to: Define atom, Describe a compound, Explain a chemical reaction, State two ways reactions can be represented. Stick to clear written responses.</p>
                      <hr />
                      <h4>9️⃣ Checklist writing</h4>
                      <p><strong>How</strong>: Rewrite the “Students should be able to…” section as a checklist, then rewrite it as sentences, then rewrite from memory.</p>
                  </div>
              </ScrollArea>
            );
        }
        // Fallback for other decks
        return (
          <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {combinedNotes}
            </div>
          </ScrollArea>
        );
      default:
        return (
          <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {combinedNotes}
            </div>
          </ScrollArea>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Icon className="w-6 h-6" />
            Learn: {learningStyle} Style
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          {renderLearningContent()}
      </CardContent>
    </Card>
  )
}

const DeckView = ({ deck, onQuiz, userDetails }: DeckViewProps) => {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isExamSkillsDialogOpen, setIsExamSkillsDialogOpen] = useState(false);
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
  
  const combinedNotesText = useMemo(() => {
    if (!deckNotes) return "";
    return deckNotes.map(n => n.body).join('\n\n---\n\n');
  }, [deckNotes]);

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
    
    if (userDetails.learningStyle === 'Visual' && deck.id === 'deck1') {
        setVisualQuiz(deck.title);
        return;
    }

    if (userDetails.learningStyle === 'Kinesthetic' && deck.id === 'deck1') {
        setKinestheticQuiz(deck.title);
        return;
    }

    if (userDetails.learningStyle === 'Reading/Writing' && deck.id === 'deck1') {
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
    return <VisualQuizView title={visualQuiz} onBack={() => setVisualQuiz(null)} />;
  }

  if (kinestheticQuiz) {
    return <KinestheticQuizView title={kinestheticQuiz} onBack={() => setKinestheticQuiz(null)} />;
  }

  if (readingWritingQuiz) {
    return <ReadingWritingQuizView title={readingWritingQuiz} onBack={() => setReadingWritingQuiz(null)} />;
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
            <NotesSummary notesText={combinedNotesText} />
            
            {examSkillsText && (
                <Button variant="outline" className="w-full" onClick={() => setIsExamSkillsDialogOpen(true)}>
                    <Award className="mr-2 h-4 w-4" />
                    Exam Skills
                </Button>
            )}

            <LearningStyleContent notes={deckNotes} learningStyle={userDetails?.learningStyle || 'Reading/Writing'} deckTitle={deck.title} deckId={deck.id} />
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
                           <MessageSquare className="mr-2 h-4 w-4" />
                        )}
                        Generate Quiz
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
    </div>
  );
};

export default DeckView;

    