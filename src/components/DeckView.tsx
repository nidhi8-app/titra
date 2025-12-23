
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
         if (deckId === 'deck1') {
            return (
                <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <h4>1️⃣ Build-it-with-objects method (FOUNDATION METHOD)</h4>
                        <p><strong>What you need:</strong> Coins / beads / paper balls / LEGO</p>
                        <p><strong>How:</strong> One object = atom. Same objects = element. Different objects joined = compound. Loose pile = mixture.</p>
                        <p>Say out loud while doing it: “Compounds are chemically combined.” “Mixtures are not chemically combined.”</p>
                        <p>👉 This physically locks in compound vs mixture (huge exam confusion point).</p>
                        <hr />
                        <h4>2️⃣ Walk-the-topic method (movement + recall)</h4>
                        <p>Walk around your room. Each step = one fact. Say (from memory): “All substances are made of atoms.”, “An atom is the smallest part of an element.”, etc. If you stop → check notes → restart walking.</p>
                        <hr />
                        <h4>3️⃣ Act out atomic models (model development)</h4>
                        <p>You = the atom. Stand still → tiny solid sphere. Spread arms with dots → plum pudding model. Hands tight in centre → nucleus. Walk in circles → Bohr model. Tap chest → protons. Tap head → neutrons. Say the model name while acting it out.</p>
                        <p>👉 Movement helps remember sequence + reasons models changed.</p>
                        <hr />
                        <h4>4️⃣ Human charge game (subatomic particles)</h4>
                        <p>Stand up and use your body: Right hand up → +1 proton. Arms out → 0 neutron. Left hand down → –1 electron. Then say: “Atoms have no overall electrical charge.” and “Number of electrons equals number of protons.”</p>
                        <hr />
                        <h4>5️⃣ Scale it with your hands (size & mass)</h4>
                        <p>Use your hands: Big circle with arms = atom. Tiny pinch = nucleus. Say: “Almost all of the mass is in the nucleus.” This makes size vs mass intuitive.</p>
                        <hr />
                        <h4>6️⃣ Electron shell walking</h4>
                        <p>Put objects in circles on the floor. Walk and place electrons for Sodium (2, 8, 1). Say: “Electrons occupy the lowest available energy levels.”</p>
                        <hr />
                        <h4>7️⃣ Periodic table floor map</h4>
                        <p>Use tape or paper on the floor. Left side = metals. Right side = non-metals. Stand in Group 1 and say its reactivity trend. Do the same for Groups 7 and 0.</p>
                        <hr />
                        <h4>8️⃣ Reactivity direction game</h4>
                        <p>Point DOWN with your hand: Group 1 → “reactivity increases”. Group 7 → “reactivity decreases”. Group 0 → “boiling point increases”.</p>
                        <hr />
                        <h4>9️⃣ Separation process stations (mixtures)</h4>
                        <p>Set up 5 stations in your room (Filtration, Crystallisation, etc.). Walk to a station and explain what it separates and that it's a physical process.</p>
                        <hr />
                        <h4>🔟 Teach-an-invisible-student method</h4>
                        <p>Stand up and teach the topic out loud without notes, using hand gestures. If you freeze, you've found a revision gap.</p>
                    </div>
                </ScrollArea>
            );
         }
         if (deckId === 'deck2') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>Role-play atoms</h4>
                <p>Use small balls or beads to represent atoms. Move around the room to show how atoms form different structures (molecules vs. giant lattices).</p>
                <h4>Build-and-touch models</h4>
                <p>Use modeling clay, LEGO, or ball-and-stick kits to physically construct molecules, polymers, metals, and ionic lattices.</p>
                <hr />
                <h4>Chemical bonds: ionic, covalent, metallic</h4>
                <p><strong>Electron transfer simulation:</strong> "Metal atoms" give away colored balls (electrons), "non-metals" take them to show ionic bonding.</p>
                <p><strong>Covalent bonding handshake:</strong> Two students “share” balls to simulate shared electrons.</p>
                <p><strong>Metallic bonding:</strong> Students form a “grid” holding hands loosely while “delocalised electrons” (other students) move around freely between them.</p>
                <hr />
                <h4>States of matter</h4>
                <p><strong>Movement simulation:</strong> Students act as particles. Solid = tightly packed, vibrating; liquid = moving past each other; gas = moving fast and far apart.</p>
                <hr />
                <h4>Structure and bonding of carbon</h4>
                <p><strong>Model building:</strong> Make diamond, graphite, graphene, and fullerene structures using clay or 3D kits.</p>
                <p><strong>Layer movement:</strong> Slide graphite layers over each other to feel why it’s slippery; try the same with a “diamond lattice” (rigid model) to feel hardness.</p>
                <hr />
                <h4>Nanoparticles</h4>
                <p><strong>Size comparison:</strong> Use balls of different sizes to represent nanoparticles vs. bulk materials; feel how many small balls fit into a container compared to large ones (surface area effect).</p>
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
        if (deckId === 'deck2') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h4>Mind Map Activity</h4>
                  <p>Create a colorful mind map connecting bonding types (ionic, covalent, metallic) to their structures, properties, and common uses. Use icons or small sketches for atoms, ions, polymers, and nanoparticles to make it more memorable.</p>
                  <hr />
                  <h4>Color-Coded Bonding Chart</h4>
                  <p>Make a three-column chart for Ionic, Covalent, and Metallic bonding. Instead of just text, use visual cues:</p>
                  <ul>
                      <li><strong>Ionic:</strong> Show electron transfer with a colored arrow (e.g., red electron moving from a blue atom).</li>
                      <li><strong>Covalent:</strong> Use overlapping colored circles to represent shared electron pairs.</li>
                      <li><strong>Metallic:</strong> Draw a grid of positive ions with wavy arrows representing the "sea" of delocalized electrons.</li>
                  </ul>
                   <p>Also, consider using an online simulation (like PhET) to see these bonds form in 3D.</p>
                  <hr />
                  <h4>Ionic and Covalent Diagram Practice</h4>
                  <p>Practice drawing dot-and-cross diagrams for ionic compounds (like NaCl) and covalent molecules (like H₂O, CH₄). Use different colors for each element to clearly see where electrons come from or how they are shared.</p>
                  <hr />
                  <h4>Build 3D Models</h4>
                  <p>Use a modeling kit (or even small balls and sticks) to build 3D structures. Create a simple ionic lattice (NaCl), a water molecule, and a methane molecule to physically see their shapes.</p>
                  <hr />
                  <h4>Visual Comparison Table</h4>
                  <p>Create a table comparing the properties of different structures (Ionic, Simple Covalent, Giant Covalent, Metallic). Use symbols and icons: a ⚡ for conductivity, a thermometer icon for melting point (high/low), and arrows of different thicknesses for the strength of forces.</p>
                  <hr />
                  <h4>Carbon Structures: 3D Visualization</h4>
                  <p>Build or draw the 3D models for diamond, graphite, and a C₆₀ fullerene. For graphite, draw the layers and show how delocalized electrons move between them. This helps explain why it's soft and conducts electricity.</p>
                  <hr/>
                  <h4>Nanoparticle Size Diagram</h4>
                  <p>Draw a large circle to represent a bulk material and then many tiny circles inside another large one to represent nanoparticles of the same mass. This visually explains why nanoparticles have a huge surface area to volume ratio.</p>
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
                      <h4>1️⃣ Rewrite → Condense → Memorise (Most Effective)</h4>
                      <p><strong>How:</strong> Rewrite the notes in full sentences. Rewrite again, cutting it to half the length. Rewrite again into 10–12 key sentences. This forces you to identify what actually matters.</p>
                      <hr />
                      <h4>2️⃣ Definition Mastery (Exam Gold)</h4>
                      <p><strong>How:</strong> Create a page titled “GCSE Chemistry Definitions”. Write and memorise: atom, element, compound, mixture, chemical reaction, isotope, atomic number, mass number, relative atomic mass. Cover → rewrite → check → correct.</p>
                      <hr />
                      <h4>3️⃣ Turn Every Fact into a Question</h4>
                      <p><strong>How:</strong> Convert each line into a question, e.g.: What is an atom? How are atoms represented? How are compounds formed? Why can compounds only be separated chemically? Then write full sentence answers.</p>
                      <hr />
                      <h4>4️⃣ Paragraph Chaining (Build Understanding)</h4>
                      <p><strong>How:</strong> Write linked paragraphs on different topics (e.g., atomic models, subatomic particles, periodic table). Use connectives like "therefore", "because", and "as a result" to improve 6-mark answers.</p>
                      <hr />
                      <h4>5️⃣ Tables from Memory (Structure + Clarity)</h4>
                      <p><strong>How:</strong> Rewrite key information into tables from memory, covering subatomic particles or group trends. Tables help with exam organisation.</p>
                      <hr />
                      <h4>6️⃣ "Explain Why" Practice (Higher Marks)</h4>
                      <p><strong>How:</strong> Write short answers to questions like "Explain why atoms have no overall charge" or "Explain why Group 1 reactivity increases down the group." This builds AO2/AO3 skills.</p>
                      <hr />
                      <h4>7️⃣ Model Development Summaries</h4>
                      <p><strong>How:</strong> Write one paragraph explaining how atomic models changed and why experimental evidence caused those changes. This targets common GCSE questions.</p>
                      <hr />
                      <h4>8️⃣ Exam Command-Word Practice</h4>
                      <p><strong>How:</strong> Write answers using command words like "define", "describe", "explain", "compare", and "state". Stick to clear, concise language.</p>
                  </div>
              </ScrollArea>
            );
        }
        if (deckId === 'deck2') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>Summarize in your own words</h4>
                <p>Write a 3–5 sentence summary for this section. Create bullet-point notes for key ideas and a glossary for terms like structure, bonding, and properties.</p>
                <hr />
                <h4>Comparison table: Ionic, Covalent, Metallic</h4>
                <p>Create a written table comparing the three bond types, covering: type of atoms involved, electron movement, forces involved, and examples.</p>
                <hr />
                <h4>Step-by-step written notes</h4>
                <p>Write out the process of electron transfer for ionic bonding, or the steps to draw dot-and-cross diagrams for covalent molecules (H₂, HCl, H₂O, CH₄, NH₃).</p>
                <hr />
                <h4>Written explanations for properties</h4>
                <p>Describe in words why ionic compounds have high melting points, why metals conduct electricity, and why simple molecules have low boiling points.</p>
                <hr />
                <h4>Carbon structures comparison</h4>
                <p>Make a table comparing diamond, graphite, graphene, and fullerenes, listing their bonds, hardness, conductivity, and uses.</p>
                <hr />
                <h4>Nanoparticles summary sheet</h4>
                <p>Write down the size, properties, and uses of nanoparticles in your own words. Create a pros and cons list for their applications.</p>
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


    

    

    