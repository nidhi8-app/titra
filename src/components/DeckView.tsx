
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Lightbulb, BookOpen, Mic, Footprints, MessageSquare, Award, Scale, Sigma, TestTube, Percent, Recycle, FlaskConical, Target, Brain, Book, FileUp } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { generatePodcast } from '@/ai/flows/generate-podcast-flow';
import type { GeneratePodcastOutput } from '@/ai/flows/generate-podcast-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { initialNotesData, type InitialNoteSeed, parseNotes } from '@/lib/initial-notes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import KinestheticQuizView from './KinestheticQuizView';
import VisualQuizView from './VisualQuizView';
import ReadingWritingQuizView from './ReadingWritingQuizView';
import { PeriodicTableDialog } from './PeriodicTableDialog';
import { NestedAccordion } from './NestedAccordion';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const NotesSummary = ({ notes }: { notes: (Note | InitialNoteSeed)[] }) => {
    const parsedNotes = useMemo(() => parseNotes(notes), [notes]);

    return (
        <Card className="mb-2 bg-transparent shadow-none border-none">
            <CardHeader>
                <CardTitle>Topic Notes</CardTitle>
                <CardDescription>A quick overview of the key points in this deck.</CardDescription>
            </CardHeader>
            <CardContent>
                {parsedNotes && parsedNotes.length > 0 ? (
                    <NestedAccordion sections={parsedNotes} />
                ) : (
                    <p className="text-destructive text-sm">There are no notes to display.</p>
                )}
            </CardContent>
        </Card>
    );
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
        if (deckId === 'deck3') {
            return (
              <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4><BrainCircuit className="inline-block mr-2" />1️⃣ Hands-on with Chemical Equations</h4>
                    <p><strong>Balancing movement activity:</strong> Write chemical equations on sticky notes, each element or molecule on a separate note. Physically move them on a table or board to balance the atoms.</p>
                    <p><strong>Atom/particle tokens:</strong> Use beads, Lego, or coins to represent atoms/molecules. Build reactants and products physically and rearrange to show conservation of mass.</p>
                    <hr />
                    <h4><Scale className="inline-block mr-2" />2️⃣ Relative Formula Mass & Mass Calculations</h4>
                    <p><strong>Bead/mole model:</strong> Assign beads or blocks to represent relative atomic masses. Combine them to represent molecules and physically calculate the total mass.</p>
                    <p><strong>Mass scale simulation:</strong> Use a kitchen scale or small weights to represent grams of reactants/products. Physically add/subtract weights to demonstrate mass changes.</p>
                    <hr />
                    <h4><Sigma className="inline-block mr-2" />3️⃣ Moles and Avogadro’s Constant</h4>
                    <p><strong>Mole line-up activity:</strong> Use tokens or scaled-down versions to internalize the large number of particles in a mole.</p>
                    <p><strong>Conversion practice with objects:</strong> Given a mass in grams, physically count or group objects to represent moles.</p>
                    <hr />
                    <h4><TestTube className="inline-block mr-2" />4️⃣ Limiting Reactants</h4>
                    <p><strong>Hands-on simulation:</strong> Use two types of tokens (e.g., red and blue beads) representing reactants. Create "products" using a fixed ratio (e.g., 1 red + 2 blue) and observe which reactant runs out first.</p>
                    <hr />
                    <h4><Percent className="inline-block mr-2" />5️⃣ Percentage Yield</h4>
                    <p><strong>Product collection simulation:</strong> Use beads or coins to represent the theoretical maximum product. Physically remove some to simulate "lost product" and then calculate the percentage yield from the physical counts.</p>
                    <hr />
                    <h4><Recycle className="inline-block mr-2" />6️⃣ Atom Economy</h4>
                    <p><strong>Sorting game:</strong> Use a mix of tokens for all reactants and products. Physically separate the "desired products" from the "by-products" and count them to calculate the atom economy.</p>
                    <hr />
                    <h4><FlaskConical className="inline-block mr-2" />7️⃣ Concentration of Solutions</h4>
                    <p><strong>Liquid measuring activity:</strong> Use water and colored liquids to measure solute and solvent volumes. Pour known masses into different volumes to visualize how concentration changes.</p>
                    <hr />
                    <h4><Award className="inline-block mr-2" />8️⃣ Gas Volumes</h4>
                    <p><strong>Balloon gas analogy:</strong> Use balloons to represent gases, inflated to a scale where 1 mole = 24 dm³. Add/subtract balloons to simulate volumes in reactions.</p>
                    <hr />
                    <h4><Target className="inline-block mr-2" />9️⃣ Revision Games</h4>
                    <p><strong>Flashcard movement:</strong> Place flashcards with definitions or calculations around the room and walk to the correct card to answer a question.</p>
                    <p><strong>Reaction lab stations:</strong> Set up mini-stations for different calculations (moles, yield, etc.) and move between them, performing calculations with tokens.</p>
                    <hr />
                    <h4><Brain className="inline-block mr-2" />🔟 Build Your Own Lab Models</h4>
                    <p><strong>DIY lab kits:</strong> Make small-scale physical models for mole conversions or gas reactions using balloons and containers, and "run" the reactions to reinforce memory.</p>
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
                  <h4>Mind map</h4>
                  <p>Create a colorful mind map connecting bonding types → structures → properties → uses. Use icons or small sketches for atoms, ions, metals, polymers, and nanoparticles.</p>
                  <hr />
                  <h4>Color-coded chart</h4>
                  <p>Make a table with three columns (Ionic / Covalent / Metallic). Use colors to indicate electron transfer (red → blue), shared electrons (overlapping circles), and delocalised electrons (wavy arrows).</p>
                  <hr />
                  <h4>Interactive animation</h4>
                  <p>Use online simulations (e.g., PhET) to see bonding in 3D.</p>
                  <hr />
                  <h4>Dot-and-cross diagrams</h4>
                  <p>Draw ions in different colors (e.g., metal = blue, non-metal = red). For covalent bonds, use Venn diagrams or sharing diagrams with overlapping colored circles.</p>
                  <hr />
                  <h4>3D models</h4>
                  <p>Build NaCl or MgO using small balls for ions to see the lattice. Build H₂, H₂O, CH₄, NH₃ using modeling kits.</p>
                  <hr />
                  <h4>Comparison tables with visuals</h4>
                  <p>Use symbols to represent properties: ⚡ for conductivity, a thermometer icon for melting point, and arrows of different thicknesses for the strength of forces.</p>
                  <hr/>
                  <h4>Carbon Structures Visualization</h4>
                  <p>Build or draw 3D models for diamond, graphite, and C₆₀ fullerene. For graphite, draw the layers and show how delocalised electrons move between them.</p>
                  <hr />
                  <h4>Nanoparticle Size Diagram</h4>
                  <p>Draw a large circle for a bulk material and many tiny circles inside another to represent nanoparticles, visually explaining the huge surface area to volume ratio.</p>
              </div>
            </ScrollArea>
          );
        }
        if (deckId === 'deck3') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h4>1. Balance & Conservation of Mass</h4>
                <p>Use diagrams with color-coded atoms to show that the number of atoms of each element is the same in reactants and products, proving mass is conserved. Example: For Mg + 2HCl → MgCl₂ + H₂, draw Mg, H, and Cl atoms and count them on both sides.</p>
                <hr />
                <h4>2. Relative Formula Mass (Mr)</h4>
                <p>Break down formulas visually. For CaCO₃, draw it as one Ca atom, one C atom, and three O atoms. Assign their masses (40, 12, 16) and add them up. Use a calculator icon to reinforce the calculation.</p>
                <hr />
                <h4>3. Moles & Avogadro's Constant</h4>
                <p>Create a visual analogy for a mole. Draw a box representing '1 mole' and write "6.02 x 10²³ particles" inside it. This turns an abstract number into a container concept.</p>
                <hr />
                <h4>4. Limiting Reactants</h4>
                <p>Draw the 'before' and 'after' of a reaction. In the 'before' state, show all reactant particles. In the 'after' state, show the product formed, the 'leftover' excess reactant, and clearly label the 'used up' limiting reactant.</p>
                <hr />
                <h4>5. Percentage Yield</h4>
                <p>Use a diagram of a beaker representing the 'Maximum theoretical mass'. Draw an arrow showing some product being 'Lost' (e.g., spilled or evaporated) and some turning into 'By-Products'. The remaining amount is the 'Actual' yield. This visually explains why the actual yield is less than the theoretical.</p>
                <hr />
                <h4>6. Amounts & Concentrations</h4>
                <p>Use diagrams of volumetric flasks. To show concentration, use colored dots (solute) in the liquid (solvent). A darker color or more dots means a higher concentration. Label flasks with volumes (e.g., 250 cm³) and amounts to connect the visual with the formula.</p>
                <hr/>
                <h4>1. Concept Maps</h4>
                <p><strong>Activity:</strong> Draw a large concept map starting with Quantitative Chemistry in the center. Branches: Include “Conservation of Mass”, “Moles”, “Limiting Reactants”, “Percentage Yield”, “Atom Economy”, “Concentration of Solutions”, “Gas Volumes”.</p>
                <p><strong>Visual cues:</strong> Use colors for each branch, small icons or simple drawings (e.g., a balance for conservation of mass, flasks for concentration).</p>
                <hr/>
                <h4>2. Flow Diagrams</h4>
                <p><strong>Activity:</strong> Create step-by-step flow diagrams for processes: Balancing chemical equations → Mass calculations → Moles → Limiting reactants → Percentage yield.</p>
                <p><strong>Tip:</strong> Use arrows, different colors, and numbered steps to make the sequence easy to follow.</p>
                <hr/>
                <h4>3. Infographics</h4>
                <p><strong>Activity:</strong> Turn your notes into a one-page infographic. Include: Equations (draw atoms as colored spheres), Moles & Avogadro’s Constant (illustrate 1 mole as a cluster of particles), Limiting Reactants (show tokens being used up), Percentage Yield & Atom Economy (draw “before and after” with lost products visually).</p>
                <hr/>
                <h4>4. Tables & Charts</h4>
                <p><strong>Activity:</strong> Mass calculations table (Reactant → Mr → Mass → Moles → Products). Concentration beaker diagrams showing volume and solute, color-coded. Gas Volumes: Draw balloons representing molar volume (24 dm³).</p>
                <hr/>
                <h4>5. Color-Coding</h4>
                <p><strong>Activity:</strong> Assign a color to each concept: Conservation of Mass (Blue), Moles (Yellow), Limiting Reactants (Orange), Percentage Yield (Purple), Atom Economy (Green), Concentration (Pink). Always highlight formulas and key numbers in their assigned color.</p>
                <hr/>
                <h4>6. Visual Mnemonics</h4>
                <p><strong>Activity:</strong> Create visual memory aids: draw a balance scale for Conservation of Mass, a funnel for Limiting Reactants, a pie chart for Atom Economy showing “useful product” vs “waste”.</p>
                <hr/>
                <h4>7. Sketch Your Equations</h4>
                <p><strong>Activity:</strong> For each chemical equation, use colored dots for atoms and draw arrows showing electron transfer or bonds forming.</p>
                <hr/>
                <h4>8. Mind Maps for Exam Preparation</h4>
                <p><strong>Activity:</strong> Create a mind map with main topics as branches. Add examples and mini flow charts for calculation steps.</p>
                <hr/>
                <h4>9. Flashcards with Diagrams</h4>
                <p><strong>Activity:</strong> Make flashcards with a question on the front and a colored visual solution on the back.</p>
                <hr/>
                <h4>10. “Redraw Without Notes” Practice</h4>
                <p><strong>Activity:</strong> Take a blank sheet and redraw concept maps, equations, and diagrams from memory. Compare with your notes and use a different color to fill in gaps.</p>
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
                      <h4>6️⃣ “Explain Why" Practice (Higher Marks)</h4>
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
        if (deckId === 'deck3') {
          return (
            <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h4>1️⃣ Rewrite the Specification in Your Own Words</h4>
                  <p><strong>Why it works:</strong> rewriting forces processing, not memorising.</p>
                  <p><strong>How to do it:</strong> Take each sub-heading (e.g. Conservation of mass, Moles, Percentage yield). Rewrite it in 5–6 clear bullet points. Keep the same meaning and key terms from the spec.</p>
                  <hr />
                  <h4>2️⃣ Create Definition Flashcards (Text-Only)</h4>
                  <p><strong>Why it works:</strong> reading/writing learners remember precise wording.</p>
                  <p><strong>How to do it:</strong> Front: Term. Back: Full definition in sentence form. Key terms: Conservation of mass, Relative formula mass (Mr), Mole, Avogadro constant, Limiting reactant, Percentage yield, Atom economy, Concentration, Molar volume (24 dm³).</p>
                  <hr />
                  <h4>3️⃣ Formula Sheets (Written, Not Visual)</h4>
                  <p><strong>Why it works:</strong> seeing formulas repeatedly in writing builds recall.</p>
                  <p>Create a formula page and rewrite it daily: Mr = sum of Ar, n = m ÷ Mr, % yield = (actual ÷ theoretical) × 100, etc. Write each formula with one sentence explaining what it does.</p>
                  <hr />
                  <h4>4️⃣ Step-by-Step Written Methods</h4>
                  <p><strong>Why it works:</strong> GCSE marks reward method as much as answers.</p>
                  <p>For each calculation type, write a numbered method. E.g., for Percentage Yield: 1. Calculate theoretical mass. 2. Use actual mass. 3. Divide actual by theoretical. 4. Multiply by 100.</p>
                  <hr />
                  <h4>5️⃣ Tables for Comparisons</h4>
                  <p><strong>Why it works:</strong> tables organise large amounts of written information. Make tables comparing Yield vs Atom Economy, for example.</p>
                  <hr />
                  <h4>6️⃣ Practice Exam-Style Questions (Written Answers)</h4>
                  <p><strong>Why it works:</strong> reading/writing learners improve by producing text. Do short written questions daily, e.g., “Explain why mass appears to change when a gas is produced.” Use full sentences.</p>
                  <hr />
                  <h4>7️⃣ “Blurting” Technique</h4>
                  <p><strong>Why it works:</strong> active recall through writing.</p>
                  <p><strong>How:</strong> Read a topic for 10 minutes. Close notes. Write everything you remember. Compare with notes and rewrite missing information in a different colour.</p>
                  <hr />
                  <h4>8️⃣ Structured Summaries</h4>
                  <p>After each topic, write: 5 key facts, 2 key equations, 1 common mistake.</p>
                  <hr />
                  <h4>9️⃣ Past Paper Annotation</h4>
                  <p><strong>Why it works:</strong> improves exam technique through reading. Print questions, underline command words, write notes next to steps, and rewrite model answers in your own words.</p>
                  <hr />
                  <h4>🔟 Weekly One-Page Written Summary</h4>
                  <p>Once per week, write a one-page summary from memory using only text. This builds long-term retention.</p>
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
            <NotesSummary notes={deckNotes} />
            
            <div className="flex gap-2 mb-4">
              {examSkillsText && (
                  <Button variant="outline" className="w-full" onClick={() => setIsExamSkillsDialogOpen(true)}>
                      <Award className="mr-2 h-4 w-4" />
                      Exam Skills
                  </Button>
              )}
               <Button variant="outline" className="w-full" onClick={() => setIsPeriodicTableDialogOpen(true)}>
                    <Book className="mr-2 h-4 w-4" />
                    Periodic Table
                </Button>
            </div>

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
       <PeriodicTableDialog
        isOpen={isPeriodicTableDialogOpen}
        onClose={() => setIsPeriodicTableDialogOpen(false)}
      />
    </div>
  );
};

export default DeckView;

    