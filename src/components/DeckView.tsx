
"use client";

import React, { useState, useMemo } from 'react';
import type { Deck, Note, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Award, BookImage, Footprints, Eye, BookText, PersonStanding, Hand, Move, Fingerprint, Map, ChevronsDown, Handshake, Link as LinkIcon, Disc, Scale, TestTube, Recycle, Brain, Key, ChevronsRightLeft, Rows, Thermometer, Sigma, CircleDashed, Zap, Gauge } from 'lucide-react';
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
    
    const displayTitle = deckTitle === 'Atomic structure and the periodic table' 
        ? 'Atomic structure and the periodic table:'
        : deckTitle === 'Bonding, structure, and the properties of matter'
        ? 'Bonding, structure, and the properties of matter:'
        : `${deckTitle}:`;

    return (
        <Card className="bg-background/50 border">
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline">Topic Summary</CardTitle>
                <p className="text-muted-foreground pt-2 font-semibold">{displayTitle}</p>
            </CardHeader>
            <CardContent>
                <NestedAccordion sections={parseNotes(notes)} />
            </CardContent>
        </Card>
    );
};


const LearnAsReadingWritingDeck1 = () => (
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
            <p>Create a page titled “GCSE Chemistry Definitions”. Write and memorise: atom, element, compound, mixture, chemical reaction, isotope, atomic number, mass number, relative atomic mass. Cover → rewrite → check → correct.</p>
            
            <h4>3️⃣ Turn every fact into a question</h4>
            <p><strong>Example:</strong> What is an atom? How are atoms represented? How are compounds formed? Why can compounds only be separated chemically? Then write full sentence answers.</p>

            <h4>4️⃣ Paragraph chaining (build understanding)</h4>
            <p>Write linked paragraphs on: Paragraph 1: atoms & elements, Paragraph 2: compounds & mixtures, Paragraph 3: atomic models, Paragraph 4: subatomic particles, Paragraph 5: periodic table & groups. Use connectives: therefore, because, as a result. This improves 6-mark answers.</p>

            <h4>5️⃣ Tables from memory (structure + clarity)</h4>
            <p>Rewrite key information into tables from memory, e.g., for Subatomic particles (Particle, Charge, Mass) or Group trends (| Group | Outer electrons | Reactivity trend |). Tables help exam organisation.</p>
            
            <h4>6️⃣ “Explain why” practice (higher marks)</h4>
            <p>Write short answers to: Explain why atoms have no overall charge. Explain why Group 0 elements are unreactive. Explain why Group 1 reactivity increases down the group. Explain why mixtures can be separated physically. This builds AO2/AO3 skills.</p>
            
            <h4>7️⃣ Model development summaries</h4>
            <p>Write one paragraph explaining: how atomic models changed and why experimental evidence caused changes. This targets common GCSE questions.</p>

            <h4>8️⃣ Bullet → sentence → paragraph method</h4>
            <p>Take bullet points and: Turn them into sentences, Turn sentences into a paragraph, Rewrite the paragraph from memory.</p>

            <h4>9️⃣ Exam command-word practice</h4>
            <p><strong>How:</strong> Write answers using command words: define, describe, explain, compare, state. Stick to clear, concise language.</p>

            <h4>🔟 Daily 15-minute routine (reading/writing)</h4>
            <p>Read notes (5 mins), Write from memory (5 mins), Check and correct in a different colour (5 mins).</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck1 = () => (
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
            <p><strong>How:</strong> One object = atom, Same objects = element, Different objects joined = compound, Loose pile = mixture. Say out loud while doing it: “Compounds are chemically combined.” “Mixtures are not chemically combined.” 👉 This physically locks in compound vs mixture (huge exam confusion point).</p>
            
            <h4>2️⃣ Walk-the-topic method (movement + recall)</h4>
            <p>Walk around your room. Each step = one fact. Say (from memory): “All substances are made of atoms.”, “An atom is the smallest part of an element.”, “Elements are shown in the periodic table.”, “Chemical reactions form new substances.” If you stop → check notes → restart walking.</p>
            
            <h4>3️⃣ Act out atomic models (model development)</h4>
            <p>You = the atom. Stand still → tiny solid sphere, Spread arms with dots → plum pudding model, Hands tight in centre → nucleus, Walk in circles → Bohr model, Tap chest → protons, Tap head → neutrons. Say the model name while acting it out. 👉 Movement helps remember sequence + reasons models changed.</p>

            <h4>4️⃣ Human charge game (subatomic particles)</h4>
            <p>Stand up and use your body: Right hand up → +1 proton, Arms out → 0 neutron, Left hand down → –1 electron. Then say: “Atoms have no overall electrical charge.”, “Number of electrons equals number of protons.” Your body becomes the atom.</p>

            <h4>5️⃣ Scale it with your hands (size & mass)</h4>
            <p>Use your hands: Big circle with arms → atom, Tiny pinch → nucleus. Say: “Almost all of the mass is in the nucleus.” This makes size vs mass intuitive.</p>

            <h4>6️⃣ Electron shell walking</h4>
            <p>Put objects in circles on the floor. First circle = first shell, Second = second shell, Third = third shell. Walk and place: Sodium → 2, 8, 1. Say: “Electrons occupy the lowest available energy levels.”</p>
            
            <h4>7️⃣ Periodic table floor map</h4>
            <p>Use tape or paper on the floor. Left side = metals, Right side = non-metals. Stand in: Group 1 → say “reactivity increases down the group”, Group 7 → say “reactivity decreases down the group”, Group 0 → say “full outer shell, unreactive”. Movement + position = memory.</p>

            <h4>8️⃣ Reactivity direction game</h4>
            <p>Point DOWN with your hand: Group 1 → “reactivity increases”, Group 7 → “reactivity decreases”, Group 0 → “boiling point increases”. Directional movement helps recall trends fast in exams.</p>

            <h4>9️⃣ Separation process stations (mixtures)</h4>
            <p>Set up 5 “stations” (different spots in the room): Filtration, Crystallisation, Simple distillation, Fractional distillation, Chromatography. Walk to a station and say: what it separates, that it is a physical process, that no new substances are made.</p>

            <h4>🔟 Teach-an-invisible-student method</h4>
            <p>Stand up and teach the topic out loud like a lesson. Rule: No notes, Use hand gestures. If you freeze → that’s a revision gap. Teaching = deepest learning.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck1 = () => (
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
            <p>Create one A3 sheet titled: “Structure of Matter (GCSE Chemistry)”. Split it into sections with boxes: Atoms & Elements, Compounds & Mixtures, Atomic Structure, Periodic Table, Groups 0, 1, 7. Use arrows to show links: atoms → elements → compounds, atomic structure → periodic table position → reactivity. 👉 Seeing everything connected prevents topic confusion.</p>

            <h4>2️⃣ Colour-coded meaning system (never change colours)</h4>
            <p>Use the same colours every time: 🔵 Atoms / subatomic particles, 🟢 Compounds, 🟡 Mixtures, 🔴 Chemical reactions, 🟣 Periodic table / groups. Your brain remembers colour patterns faster than text.</p>

            <h4>3️⃣ “Before vs After” diagrams (for reactions & mixtures)</h4>
            <p>Draw paired boxes: Chemical reaction (Before: elements, After: compound + energy change) and Mixture (Before: substances together, After: substances separated physically). Label with: ✔ new substance, ✖ no new substance. This visually locks in the difference between mixtures and compounds.</p>

            <h4>4️⃣ Timeline strip for atomic models</h4>
            <p>Draw a horizontal timeline: Tiny solid sphere, Plum pudding model, Nuclear model, Bohr model, Protons, Neutrons. Add: small sketches, arrows showing “new evidence → new model”. This helps exam questions about scientific development over time.</p>

            <h4>5️⃣ Particle tables instead of sentences</h4>
            <p>Turn facts into tables only: Subatomic particles (Particle, Charge, Mass, Location) and Atom facts (Feature, What it shows - Atomic number, Mass number). Tables help visual learners compare instantly.</p>
            
            <h4>6️⃣ Scale diagrams (size & mass)</h4>
            <p>Draw: a large circle = atom, a tiny dot in the centre = nucleus. Write: atom radius: 0.1 nm, nucleus radius: 1 × 10⁻¹⁴ m. Then add: “Almost all mass in nucleus”. Seeing the scale difference builds understanding.</p>

            <h4>7️⃣ Electronic structure ring diagrams</h4>
            <p>For the first 20 elements: draw shells as circles, add electrons as dots, colour the outer shell. Then label: group number, reactivity trend. This visually links: electrons → group → properties.</p>

            <h4>8️⃣ Periodic table highlighting (pattern spotting)</h4>
            <p>Print a periodic table and: Highlight groups vertically, Shade: metals (left & bottom), non-metals (right & top). Circle: Group 0, Group 1, Group 7. Patterns = memory.</p>

            <h4>9️⃣ Group summary boxes (exam gold)</h4>
            <p>Create one box per group: Group 0 (full outer shell, unreactive, boiling point increases down group), Group 1 (1 outer electron, reactivity increases down group), Group 7 (7 outer electrons, reactivity decreases down group, displacement reactions). Seeing trends side-by-side is key.</p>

            <h4>🔟 Arrow trend diagrams (reactivity & boiling point)</h4>
            <p>Instead of words, use arrows: Group 1 reactivity ⬇️ increases, Group 7 reactivity ⬇️ decreases, Group 0 boiling point ⬇️ increases. Your brain remembers directional arrows very well.</p>

            <h4>1️⃣1️⃣ Comparison grids (metals vs non-metals)</h4>
            <p>Draw a split box: Metals (positive ions, left/bottom) vs Non-metals (do not form positive ions, right/top). Quick visual contrast = exam clarity.</p>

            <h4>1️⃣2️⃣ Redraw-from-memory rule (most important)</h4>
            <p>Daily routine: Look at your diagrams for 1 minute, Close notes, Redraw everything from memory, Add missing parts in a different colour. If you can redraw it → you understand it.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck2 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master this topic with diagrams, models, and color-coding.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Bonding, structure, and the properties of matter</h4>
            <p><strong>Activity:</strong></p>
            <p>Mind map: Create a colorful mind map connecting bonding types → structures → properties → uses. Use icons or small sketches for atoms, ions, metals, polymers, and nanoparticles.</p>

            <h4>2️⃣ Chemical bonds: ionic, covalent, metallic</h4>
            <p><strong>Activity:</strong></p>
            <p>Color-coded chart: Make a table with three columns (Ionic / Covalent / Metallic). Use colors to indicate: Electron transfer (red → blue), Shared electrons (overlapping circles), Delocalised electrons (wavy arrows). Interactive animation: Use online simulations (e.g., PhET) to see bonding in 3D.</p>
            
            <h4>3️⃣ Ionic bonding</h4>
            <p><strong>Activity:</strong></p>
            <p>Dot-and-cross diagrams: Draw ions in different colors (e.g., metal = blue, non-metal = red). 3D ball-and-stick model: Build NaCl or MgO using small balls for ions to see the lattice. Group activity: Physically "transfer electrons" with colored balls between students acting as atoms.</p>

            <h4>4️⃣ Ionic compounds</h4>
            <p><strong>Activity:</strong></p>
            <p>Ionic lattice diagram: Use graph paper or LEGO to create a 3D model of NaCl lattice. Highlight electrostatic forces using arrows between ions. Empirical formula exercise: Build mini-models of compounds, then deduce formulas visually.</p>

            <h4>5️⃣ Covalent bonding</h4>
            <p><strong>Activity:</strong></p>
            <p>Venn diagram or sharing diagrams: Use overlapping colored circles to show shared electron pairs. 3D molecular models: Build hydrogen, water, methane, ammonia using modeling kits. Drawing practice: Dot-and-cross and line diagrams in different colors for each element.</p>

            <h4>6️⃣ Metallic bonding</h4>
            <p><strong>Activity:</strong></p>
            <p>Layered diagram: Show metal atoms in layers and wavy arrows for delocalised electrons. Animation: Show how electrons move freely through the metal lattice. Hands-on: Stack coins or discs to represent layers of atoms, with beads representing delocalised electrons.</p>
            
            <h4>7️⃣ Bonding and structure linked to properties</h4>
            <p><strong>States of matter Activity:</strong></p>
            <p>Particle diagrams: Draw solids, liquids, and gases using colored dots; show movement with arrows. Melting/boiling demonstration: Use ice and water to visually connect particle movement with state changes.</p>
            <p><strong>Properties Activity:</strong></p>
            <p>Comparison table: Use visuals and symbols to represent: Conductivity (⚡), Melting point (🌡️), Strength of forces (arrows of different thickness). Molecule model building: Build small molecules vs. polymer chains vs. metallic lattice.</p>
            
            <h4>8️⃣ Structure and bonding of carbon</h4>
            <p><strong>Activity:</strong></p>
            <p>3D models: Build diamond, graphite layers, graphene sheets, and C₆₀ fullerenes using colored balls and sticks. Layered diagrams: Show graphite’s layers and how delocalised electrons move. Compare and contrast chart: Include hardness, conductivity, melting points with small icons.</p>

            <h4>9️⃣ Nanoparticles</h4>
            <p><strong>Activity:</strong></p>
            <p>Size comparison diagram: Draw nanoparticles vs. bulk materials to illustrate surface area. Visual uses chart: Draw icons for medicine, electronics, cosmetics, etc., linking them to nanoparticles. Infographic: Show risks vs. benefits visually, with color-coded warnings and benefits.</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck2 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Engage with this topic using action, movement, and real-world examples.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Bonding, structure, and the properties of matter</h4>
            <p><strong>Activity:</strong> Role-play atoms: Use small balls or beads to represent atoms. Move around the room to show how atoms form different structures (molecules vs. giant lattices). Build-and-touch models: Use modeling clay, LEGO, or ball-and-stick kits to physically construct molecules, polymers, metals, and ionic lattices.</p>
            
            <h4>2️⃣ Chemical bonds: ionic, covalent, metallic</h4>
            <p><strong>Activity:</strong> Electron transfer simulation: Give students colored balls representing electrons. "Metal atoms" give away balls, "non-metals" take them to show ionic bonding. Covalent bonding handshake: Two students “share” balls to simulate shared electrons. Metallic bonding: Students form a “grid” holding hands loosely while “delocalised electrons” (other students) move around freely between them.</p>

            <h4>3️⃣ Ionic bonding</h4>
            <p><strong>Activity:</strong> Dot-and-cross tactile exercise: Use beads or stickers to create dot-and-cross diagrams on sticky boards. 3D lattice building: Build a NaCl or MgO lattice using LEGO or magnetic balls to feel the structure.</p>

            <h4>4️⃣ Ionic compounds</h4>
            <p><strong>Activity:</strong> Empirical formula activity: Use colored beads for different ions. Build mini-compounds and physically count the ratio of ions to determine the formula. Electrostatic forces demonstration: Use magnets to mimic attraction between ions in a lattice.</p>

            <h4>5️⃣ Covalent bonding</h4>
            <p><strong>Activity:</strong> Molecule building: Use clay or sticks to make hydrogen, water, ammonia, methane, etc. Sharing simulation: Pair up and “share” balls representing electrons to build covalent molecules. Polymer chain activity: Link paper clips or chains to model polymer chains.</p>

            <h4>6️⃣ Metallic bonding</h4>
            <p><strong>Activity:</strong> Layer stacking: Stack coins or discs to simulate layers of metal atoms. Move them slightly to feel malleability. Delocalised electron race: Have “electrons” (students) move through a “metal lattice” formed by other students holding hands in a grid.</p>

            <h4>7️⃣ Bonding and structure linked to properties</h4>
            <p><strong>States of matter Activity:</strong> Movement simulation: Students act as particles. Solid = tightly packed, vibrating; liquid = moving past each other; gas = moving fast and far apart. Melting/boiling demo: Heat ice cubes and feel the phase change; relate movement of molecules to state.</p>
            <p><strong>Properties Activity:</strong> Hands-on comparison: Touch samples (metal, polymer, sugar/crystals) and test conductivity with a simple circuit to feel differences. Strength demonstration: Stack objects to mimic lattice strength; shake gently to represent weak vs. strong bonds.</p>

            <h4>8️⃣ Structure and bonding of carbon</h4>
            <p><strong>Activity:</strong> Model building: Make diamond, graphite, graphene, and fullerene structures using clay or 3D kits. Layer movement: Slide graphite layers over each other to feel why it’s slippery; try the same with a “diamond lattice” (rigid model) to feel hardness.</p>
            
            <h4>9️⃣ Nanoparticles</h4>
            <p><strong>Activity:</strong> Size comparison: Use balls of different sizes to represent nanoparticles vs. bulk materials; feel how many small balls fit into a container compared to large ones (surface area effect). Application demo: Handle models representing nanoparticles in medicine, electronics, or sunscreens to visualize and “use” them safely in simulations.</p>
        </CardContent>
    </Card>
);

const LearnAsReadingWritingDeck2 = () => (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master this topic through structured writing, definitions, and summarization.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Bonding, structure, and the properties of matter</h4>
            <p><strong>Activity:</strong> Summarize in your own words: Write a 3–5 sentence summary for this section. Bullet-point notes: Break down the key ideas: “Atoms can form molecules or giant structures,” “Bonding explains properties,” etc. Glossary: Write definitions for key terms: structure, bonding, properties, material engineering.</p>
            
            <h4>2️⃣ Chemical bonds: ionic, covalent, metallic</h4>
            <p><strong>Activity:</strong> Comparison table: Create a written table comparing ionic, covalent, and metallic bonds: Type of atoms involved, Electron movement, Forces involved, Examples. Flashcards: One side = bond type, other side = characteristics/examples.</p>

            <h4>3️⃣ Ionic bonding</h4>
            <p><strong>Activity:</strong> Step-by-step notes: Write out the process of electron transfer, forming positive and negative ions. Dot-and-cross practice: Write multiple examples (NaCl, MgO) and label ions. Group number rule: Write a table linking group numbers to ion charges.</p>

            <h4>4️⃣ Ionic compounds</h4>
            <p><strong>Activity:</strong> Written explanation: Describe in words why ionic compounds have high melting points and conduct when molten. Empirical formula exercises: Write down formulas from given ions. Limitations of diagrams: Write short notes explaining why diagrams don’t show 3D structures or forces clearly.</p>

            <h4>5️⃣ Covalent bonding</h4>
            <p><strong>Activity:</strong> Stepwise instructions: Write step-by-step guides for drawing dot-and-cross diagrams for H₂, HCl, H₂O, CH₄, NH₃. Compare molecule types: Write a chart comparing small molecules, polymers, and giant covalent structures: bonds, states, melting points.</p>

            <h4>6️⃣ Metallic bonding</h4>
            <p><strong>Activity:</strong> Written notes: Describe structure, delocalised electrons, and malleability in your own words. Comparison table: Write a table comparing metals vs. alloys: hardness, layers, conductivity.</p>

            <h4>7️⃣ Bonding and structure linked to properties</h4>
            <p><strong>States of matter Activity:</strong> Written explanation: Describe how particle theory explains solids, liquids, and gases. Melting/boiling points: Write notes linking strength of forces to temperature changes.</p>
            <p><strong>Properties of compounds Activity:</strong> Table/chart: For ionic compounds, small molecules, polymers, metals, and alloys: list melting/boiling points, conductivity, and reasons. Short-answer practice: Write answers to questions like: “Why can metals conduct electricity?” or “Why do polymers stay solid at room temp?”</p>

            <h4>8️⃣ Structure and bonding of carbon</h4>
            <p><strong>Activity:</strong> Written comparison: Make a table for diamond, graphite, graphene, and fullerenes: bonds, hardness, conductivity, uses. Notes on nanostructures: Write descriptions of carbon nanotubes and graphene, including applications.</p>
            
            <h4>9️⃣ Nanoparticles</h4>
            <p><strong>Activity:</strong> Summary sheet: Write down size, properties, and uses of nanoparticles in your own words. Pros and cons list: Create a written table of benefits vs. risks. Examples: List at least 3 products or applications for nanoparticles.</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck3 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Master this topic with hands-on activities and simulations.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Hands-on with Chemical Equations</h4>
            <p><strong>Balancing movement activity:</strong> Write chemical equations on sticky notes, each element or molecule on a separate note. Physically move them on a table or board to balance the atoms. Repeat with multiple equations until balancing becomes intuitive.</p>
            <p><strong>Atom/particle tokens:</strong> Use beads, Lego, or coins to represent atoms/molecules. Build reactants and products physically. Rearrange to show conservation of mass in reactions.</p>
            
            <h4>2️⃣ Relative Formula Mass & Mass Calculations</h4>
            <p><strong>Bead/mole model:</strong> Assign beads or blocks to represent relative atomic masses. Combine beads to represent molecules and calculate total mass physically. Helps visualize how relative formula mass is built from atoms.</p>
            <p><strong>Mass scale simulation:</strong> Use a kitchen scale or small weights to represent grams of reactants/products. Physically add/subtract weights to demonstrate mass changes in reactions, including gases escaping.</p>

            <h4>3️⃣ Moles and Avogadro’s Constant</h4>
            <p><strong>Mole line-up activity:</strong> Each student represents a particle (atom, molecule, ion). Line up 6.02 × 10²³ objects represented by tokens or use scaled-down versions. Helps internalize large numbers and concept of moles.</p>
            <p><strong>Conversion practice with objects:</strong> Give a mass in grams and physically count or group objects to represent moles.</p>

            <h4>4️⃣ Limiting Reactants</h4>
            <p><strong>Hands-on limiting reactant simulation:</strong> Give two types of tokens representing two reactants. Create products using fixed ratios, remove tokens as used. Observe which reactant runs out first → limiting reactant.</p>
            
            <h4>5️⃣ Percentage Yield</h4>
            <p><strong>Product collection simulation:</strong> Use beads, coins, or balls to represent theoretical maximum product. Physically remove “lost product” beads to simulate actual yield. Calculate percentage yield using physical counts.</p>

            <h4>6️⃣ Atom Economy</h4>
            <p><strong>Sorting game:</strong> Give a mix of tokens representing all reactants and possible products. Physically separate desired products from by-products. Count tokens to calculate atom economy.</p>

            <h4>7️⃣ Concentration of Solutions</h4>
            <p><strong>Liquid measuring activity:</strong> Use water or colored liquids to measure solute and solvent volumes. Pour known masses into different volumes to visualize concentration. Practice adjusting mass or volume to see how concentration changes.</p>
            
            <h4>8️⃣ Gas Volumes</h4>
            <p><strong>Balloon gas analogy:</strong> Use balloons to represent gases. Inflate to scale 1 mole = 24 dm³. Practice adding/subtracting balloons to simulate volumes of gaseous reactants/products.</p>
            <p><strong>Volume simulation with containers:</strong> Use boxes or containers of fixed size to simulate gas volumes at r.t.p. Combine “reactant boxes” to form “product boxes” physically.</p>
            
            <h4>9️⃣ Revision Games</h4>
            <p><strong>Flashcard movement:</strong> Write equation types, definitions, or calculations on flashcards. Place cards around the room, walk to the correct card to answer a question. Movement helps kinesthetic memory.</p>
            <p><strong>Reaction lab stations:</strong> Set up mini “stations” with different calculations: moles, yield, concentration, atom economy. Move from station to station performing calculations physically with tokens or counters.</p>
            
            <h4>🔟 Build Your Own Lab Models</h4>
            <p><strong>DIY lab kits or simulations:</strong> Make a small-scale physical model of: Reactants → Products, Mole conversions, Gaseous reactions using balloons or containers. Repeatedly “run” reactions using your models to reinforce memory.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck3 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master this topic by drawing, connecting, and organizing information visually.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Concept Maps</h4>
            <p><strong>Activity:</strong> Draw a large concept map starting with Quantitative Chemistry in the center.</p>
            <p><strong>Branches:</strong> Include “Conservation of Mass”, “Moles”, “Limiting Reactants”, “Percentage Yield”, “Atom Economy”, “Concentration of Solutions”, “Gas Volumes”.</p>
            <p><strong>Visual cues:</strong> Use colors for each branch, small icons or simple drawings (e.g., a balance for conservation of mass, flasks for concentration).</p>

            <h4>2️⃣ Flow Diagrams</h4>
            <p><strong>Activity:</strong> Create step-by-step flow diagrams for processes: Balancing chemical equations → Mass calculations → Moles → Limiting reactants → Percentage yield.</p>
            <p><strong>Tip:</strong> Use arrows, different colors, and numbered steps to make the sequence easy to follow.</p>
            
            <h4>3️⃣ Infographics</h4>
            <p><strong>Activity:</strong> Turn your notes into a one-page infographic. Include: Equations (draw atoms as colored spheres or balls), Moles & Avogadro’s Constant (illustrate 1 mole as a cluster of 6.02×10²³ particles), Limiting Reactants (show tokens being used up), Percentage Yield & Atom Economy (draw “before and after” with lost products visually).</p>

            <h4>4️⃣ Tables & Charts</h4>
            <p><strong>Activity:</strong> Mass calculations (Table with columns: Reactant → Relative Formula Mass → Mass in grams → Moles → Products), Concentration (Beaker diagrams showing volume and solute, color-coded for clarity), Gas Volumes (Draw balloons representing molar volume, 24 dm³).</p>

            <h4>5️⃣ Color-Coding</h4>
            <p><strong>Activity:</strong> Assign a color to each concept: Conservation of Mass → Blue, Moles → Yellow, Limiting Reactants → Orange, Percentage Yield → Purple, Atom Economy → Green, Concentration → Pink.</p>
            <p><strong>Tip:</strong> Always highlight formulas, key numbers, and steps in their assigned color.</p>
            
            <h4>6️⃣ Visual Mnemonics</h4>
            <p><strong>Activity:</strong> Create visual memory aids for tricky ideas: Conservation of Mass (draw a balance scale with equal atoms on each side), Limiting Reactants (draw a funnel filling products until one reactant is used up), Atom Economy (draw a pie chart showing “useful product” vs “waste”).</p>

            <h4>7️⃣ Sketch Your Equations</h4>
            <p><strong>Activity:</strong> For each chemical equation, use colored dots for atoms and draw arrows showing electron transfer, bonds forming, or moles. <strong>Tip:</strong> The act of drawing helps reinforce memory.</p>

            <h4>8️⃣ Mind Maps for Exam Preparation</h4>
            <p><strong>Activity:</strong> Create a mind map with main topics as branches. Add examples (e.g., Mg + HCl → MgCl₂ + H₂). Use icons (e.g., beaker for solutions, balloon for gas volumes). Add mini flow charts inside branches for steps in calculations.</p>

            <h4>9️⃣ Flashcards with Diagrams</h4>
            <p><strong>Activity:</strong> Make flashcards with: Front (Question/concept, e.g., “Calculate % yield”), Back (Colored visual solution, small diagram showing steps).</p>

            <h4>🔟 “Redraw Without Notes” Practice</h4>
            <p><strong>Activity:</strong> Once confident, take a blank sheet and try to redraw concept maps, equations, and diagrams. <strong>Tip:</strong> Use different colored pens to mark missing or incorrect parts and compare with your notes.</p>
        </CardContent>
    </Card>
);

const LearnAsReadingWritingDeck3 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master this topic with structured notes, definitions, and written practice.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Rewrite the Specification in Your Own Words</h4>
            <p><strong>Why it works:</strong> rewriting forces processing, not memorising.</p>
            <p><strong>How to do it:</strong> Take each sub-heading (e.g. Conservation of mass, Moles, Percentage yield). Rewrite it in 5–6 clear bullet points. Keep the same meaning and key terms from the spec.</p>
            <p><strong>Example:</strong> The law of conservation of mass states that no atoms are lost or made during a chemical reaction. Rewrite as: No atoms are created or destroyed in chemical reactions, Total mass of reactants equals total mass of products, Equations must be balanced to show this.</p>

            <h4>2️⃣ Create Definition Flashcards (Text-Only)</h4>
            <p><strong>Why it works:</strong> reading/writing learners remember precise wording.</p>
            <p><strong>How to do it:</strong> Front: Term, Back: Full definition in sentence form. Key terms: Conservation of mass, Relative formula mass (Mr), Mole, Avogadro constant, Limiting reactant, Percentage yield, Atom economy, Concentration (g/dm³ and mol/dm³), Molar volume (24 dm³). 👉 Rewrite the definition every time you get one wrong.</p>
            
            <h4>3️⃣ Formula Sheets (Written, Not Visual)</h4>
            <p><strong>Why it works:</strong> seeing formulas repeatedly in writing builds recall. Create a formula page and rewrite it daily: Mr = sum of relative atomic masses, n = m ÷ Mr, m = n × Mr, % yield = (actual ÷ theoretical) × 100, Atom economy = (Mr of desired product ÷ total Mr of reactants) × 100, Concentration (g/dm³) = mass ÷ volume, Gas volume at r.t.p = moles × 24. ✍️ Write each formula with one sentence explaining what it does.</p>

            <h4>4️⃣ Step-by-Step Written Methods</h4>
            <p><strong>Why it works:</strong> GCSE marks reward method as much as answers. For each calculation type, write a numbered method. Example: Percentage Yield: 1. Calculate the theoretical mass using the balanced equation. 2. Use the actual mass given in the question. 3. Divide actual mass by theoretical mass. 4. Multiply by 100. 5. Give answer to correct significant figures. Do this for: Mr calculations, Moles, Limiting reactants, Concentration, Gas volumes.</p>

            <h4>5️⃣ Tables for Comparisons</h4>
            <p><strong>Why it works:</strong> tables organise large amounts of written information. Make tables like: Yield vs Atom Economy (Feature, Percentage Yield, Atom Economy). Measures: How much product is actually made vs. How much reactant becomes useful product. Depends on: Losses, reversibility, side reactions vs. Balanced equation. Important for: Efficiency of reaction vs. Sustainability.</p>
            
            <h4>6️⃣ Practice Exam-Style Questions (Written Answers)</h4>
            <p><strong>Why it works:</strong> reading/writing learners improve by producing text. Do short written questions daily, such as: “Explain why mass appears to change when a gas is produced.”, “Explain why a reaction may have a low percentage yield.”, “Explain why reactions with high atom economy are preferred.” ✍️ Use full sentences and mark them against mark schemes.</p>
            
            <h4>7️⃣ “Blurting” Technique</h4>
            <p><strong>Why it works:</strong> active recall through writing. <strong>How:</strong> Read a topic (e.g. moles) for 10 minutes. Close notes. Write everything you remember. Compare with notes. Rewrite missing information in a different colour. This is one of the best techniques for reading/writing learners.</p>

            <h4>8️⃣ Structured Summaries</h4>
            <p>After each topic, write: 5 key facts, 2 key equations, 1 common mistake. Example (Limiting Reactants): The limiting reactant is completely used up, It limits the amount of product formed, Excess reactant remains unused.</p>

            <h4>9️⃣ Past Paper Annotation</h4>
            <p><strong>Why it works:</strong> improves exam technique through reading. Print or copy questions. Underline command words (calculate, explain, describe). Write short notes next to each step of the solution. Rewrite the model answer in your own words.</p>

            <h4>🔟 Weekly One-Page Written Summary</h4>
            <p>Once per week: Write one page only. No diagrams. Bullet points, tables, equations, definitions. Aim to explain everything from memory. This builds long-term retention.</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck4 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Master "Chemical changes" with hands-on, movement-based activities.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Reactivity of Metals – “Do it with your body”</h4>
            <p><strong>🔼 Human reactivity line:</strong> Write metal names on paper/cards. Physically line them up from most → least reactive. Walk along the line and say what each reacts with: “Potassium – water, very violent”, “Copper – no reaction”. 👉 Memory trigger: position + movement</p>
            <p><strong>🪨 Displacement role-play:</strong> You = more reactive metal, Chair = compound, Sit someone (less reactive metal) on the chair. You “push them out” → displacement. If you can’t push them → no reaction. 👉 Helps you feel why displacement works</p>
            
            <h4>2️⃣ Oxidation & Reduction – “Take and give”</h4>
            <p><strong>🟢 Oxygen swap game:</strong> Hold a ball = oxygen. Metal gains ball → oxidation. Metal loses ball → reduction. Say it out loud every time: “GAIN oxygen = OXIDATION”.</p>
            <p><strong>⚡ Electron trading (HT):</strong> Coins = electrons. Losing coins → oxidation. Gaining coins → reduction. Physically pass coins during reactions. 👉 Works really well for redox + electrolysis</p>

            <h4>3️⃣ Extraction of Metals – “Build it, break it”</h4>
            <p><strong>🔥 Carbon reduction demo (safe version):</strong> Stack blocks: metal + oxygen. Remove oxygen block using a “carbon” card. Say: “Carbon reduces the metal oxide”. 👉 Reinforces reduction = loss of oxygen</p>
            <p><strong>❌ Decision movement:</strong> Stand up. Step left if “carbon extraction”, Step right if “electrolysis”. Example: Iron → left, Aluminium → right. 👉 Links reactivity → extraction method</p>

            <h4>4️⃣ Acids & Metals – “Act it out”</h4>
            <p><strong>💥 Reaction acting:</strong> Acid = one hand, Metal = other hand. Clap → hydrogen escapes (blow air). Say the word equation while acting. 👉 Movement locks in equations</p>

            <h4>5️⃣ Neutralisation & Salts – “Hands-on matching”</h4>
            <p><strong>🧂 Salt building:</strong> Write ions on small cards (Na⁺, Cl⁻, SO₄²⁻). Physically join the right ions. Swap acids and watch the salt change. 👉 Makes salt formation intuitive</p>
            <p><strong>🎈 Carbonate reaction demo:</strong> Bottle + vinegar + baking soda. Feel the balloon inflate → CO₂. 👉 You feel the gas being made</p>
            
            <h4>6️⃣ pH Scale – “Walk the scale”</h4>
            <p><strong>🚶‍♀️ pH floor line:</strong> Write numbers 0–14 on paper. Walk along: Left = acidic, Middle = neutral, Right = alkaline. Say examples as you step: “pH 1 – stomach acid”, “pH 7 – water”. 👉 Movement + numbers = strong recall</p>
            
            <h4>7️⃣ Titrations – “Real control”</h4>
            <p><strong>🧪 Dry-run titration:</strong> Use water + food colouring. Practise: Turn tap slowly, Swirl, Stop at colour change. 👉 Builds muscle memory for practical marks</p>

            <h4>8️⃣ Electrolysis – “Be the ion”</h4>
            <p><strong>⚡ Ion walking game:</strong> You = ion. Positive sign on chest → walk to cathode. Negative sign → walk to anode. Say: “Opposites attract”.</p>
            <p><strong>🔄 Half-equation acting (HT):</strong> Hold electrons (coins). Cathode: gain coins. Anode: lose coins. Act out: Gain → reduction, Lose → oxidation. 👉 Almost impossible to forget after this</p>

            <h4>9️⃣ Revision that involves movement</h4>
            <p><strong>🟩 Post-it wall revision:</strong> One concept per post-it. Stick them around your room. Walk to answer questions.</p>
            <p><strong>🎤 Teach while pacing:</strong> Walk around and teach the topic out loud. If you can say it while moving → you know it.</p>

            <h4>🔟 Exam memory triggers (very important)</h4>
            <p>Before the exam: Tap desk twice → say “OIL RIG”. Move finger left → carbon extraction. Move finger right → electrolysis. 👉 Small movements = instant recall</p>
        </CardContent>
    </Card>
);

const LearnAsReadingWritingDeck4 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master "Chemical changes" with structured writing and text-based drills.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Rewrite the syllabus in your own words (core method)</h4>
            <p>Take each sub-heading (e.g. Reactivity series). Rewrite it as 3–5 short bullet points using simple language. Avoid copying — rephrasing = learning. <strong>Example:</strong> Metals high in the reactivity series lose electrons easily and form positive ions, so they react more violently.</p>

            <h4>2️⃣ Create “perfect exam paragraphs”</h4>
            <p>For every big idea, write one model paragraph you could memorise. <strong>Example (oxidation & reduction):</strong> Oxidation is the gain of oxygen or the loss of electrons, while reduction is the loss of oxygen or gain of electrons. In metal reactions, the metal is oxidised because it loses electrons to form positive ions. 👉 This trains AO1 + AO2.</p>

            <h4>3️⃣ Cornell notes (very effective)</h4>
            <p>Split your page: Left column: key terms/questions, Right column: explanations, Bottom: 2–3 sentence summary. <strong>Example questions:</strong> What is oxidation? Why is aluminium extracted by electrolysis?</p>

            <h4>4️⃣ Keyword definition drills</h4>
            <p>Make a list of command-word-ready definitions: Oxidation, Reduction, Electrolyte, Neutralisation, Strong vs weak acid. Rewrite each daily until you can do it from memory.</p>

            <h4>5️⃣ Tables instead of paragraphs</h4>
            <p>Convert long content into comparison tables. <strong>Example:</strong> Concept: Strong acid, Key points: Fully ionised, lower pH. Concept: Weak acid, Key points: Partially ionised, higher pH. 👉 Writing tables improves recall and exam clarity.</p>

            <h4>6️⃣ “Blurting” (top-grade technique)</h4>
            <p>Read a section. Close your notes. Write everything you remember. Check and correct in a different colour. Do this for: Reactivity series, Electrolysis rules, Acid reactions.</p>

            <h4>7️⃣ Write word → symbol → ionic equations</h4>
            <p>For every reaction: Word equation, Balanced symbol equation, Ionic / half equation (HT). Writing repeatedly builds automatic recall in exams.</p>

            <h4>8️⃣ Use exam sentence starters</h4>
            <p>Memorise and practise starters like: “This metal is more reactive because…”, “The product formed at the cathode is…”, “Neutralisation occurs when…”. These unlock method marks.</p>

            <h4>9️⃣ “Explain like the mark scheme”</h4>
            <p>After writing an answer, ask: Have I named ions? Have I mentioned electrons or oxygen? Have I linked cause → effect? Rewrite answers until they sound mark-scheme accurate.</p>

            <h4>🔟 Summarise each topic onto ONE page</h4>
            <p>Force yourself to reduce: Reactivity of metals → 1 page, Acids → 1 page, Electrolysis → 1 page. Shorter notes = stronger memory.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck4 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master "Chemical changes" with diagrams, flowcharts, and color-coding.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Reactivity series as a visual ladder (must-do)</h4>
            <p><strong>How to use it:</strong> Draw a vertical ladder. Top = most reactive, bottom = least. Colour code: 🔴 reacts with water, 🟠 reacts with acids, ⚫ no reaction. 👉 The height of the metal helps you remember reactivity instantly.</p>

            <h4>2️⃣ Colour-coded oxidation & reduction</h4>
            <p><strong>Visual rule:</strong> Oxidation = red arrow IN (oxygen in / electrons out), Reduction = blue arrow OUT. Write next to every reaction: OX = gain O / lose e⁻, RED = lose O / gain e⁻. 👉 Colour = meaning (no memorising sentences).</p>

            <h4>3️⃣ Metal extraction flowchart</h4>
            <p>Draw this decision tree: Is metal more reactive than carbon? → YES → Electrolysis; NO → Reduction with carbon. Add examples in boxes: Aluminium → electrolysis, Iron → carbon. 👉 One glance = full method recall.</p>

            <h4>4️⃣ Acid reactions as equation maps</h4>
            <p>Use arrows, not sentences: Acid + metal → salt + hydrogen ↑, Acid + alkali → salt + water, Acid + carbonate → salt + water + CO₂ ↑. Draw gas bubbles for H₂ and CO₂.</p>

            <h4>5️⃣ Salt formation visual grid</h4>
            <p>Create a 2-way table: Acid ↓ / Base → | Sodium | Calcium | Copper. Then fill in with salts like NaCl, CaSO₄, etc. 👉 Patterns jump out visually → fewer mistakes.</p>

            <h4>6️⃣ pH scale as a colour bar</h4>
            <p>Draw a long rectangle: Red (0–2) → strong acid, Green (7) → neutral, Purple (12–14) → strong alkali. Label real examples on the bar. 👉 Colour = acidity strength.</p>

            <h4>7️⃣ Titration as a storyboard</h4>
            <p>Draw 4 boxes: 1. Burette setup, 2. Adding acid, 3. Colour change, 4. End point. 👉 You remember the process, not steps.</p>

            <h4>8️⃣ Electrolysis direction diagrams (essential)</h4>
            <p><strong>Visual rules:</strong> ➕ ions → cathode (−), ➖ ions → anode (+). Hydrogen at cathode if metal is reactive. Oxygen at anode unless halides present. Use big arrows and symbols.</p>
            
            <h4>9️⃣ Half-equations in boxes (HT)</h4>
            <p>Draw two boxes every time: Cathode (reduction): 2H⁺ + 2e⁻ → H₂. Anode (oxidation): 4OH⁻ → O₂ + 2H₂O + 4e⁻. 👉 Box layout = automatic recall.</p>

            <h4>🔟 One-page visual summaries (power move)</h4>
            <p>For each topic create a page with no paragraphs, only diagrams, arrows, boxes, and color. 👉 If you can “see the page” in the exam, you win.</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck5 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Master "Energy changes" with hands-on activities.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Exothermic vs Endothermic — “Feel the energy”</h4>
            <p><strong>🔥 Hot–Cold hand test:</strong> Rub your hands together quickly → feel heat. Say: “Energy released → exothermic”. Hold a cold bottle or ice → feel cold. Say: “Energy taken in → endothermic”. 👉 Physical sensation locks in the concept.</p>
            <p><strong>🎭 Body temperature acting:</strong> Exothermic: raise arms, step forward, say “temperature rises”. Endothermic: crouch, hug yourself, say “temperature falls”. Repeat every time you revise.</p>
            
            <h4>2️⃣ Energy conservation — “Pass the energy”</h4>
            <p><strong>⚡ Energy transfer game:</strong> Use a ball = energy. Pass ball from “reaction” to “surroundings”. Say: “Energy is conserved — it’s transferred, not lost”. 👉 Helps avoid exam misconceptions.</p>

            <h4>3️⃣ Reaction profiles — “Be the graph”</h4>
            <p><strong>📈 Walk the energy diagram:</strong> Floor = energy axis. Start low = reactants. Walk up a chair/step = activation energy. Walk down: End lower → exothermic, End higher → endothermic. Say out loud: “This peak is the activation energy”.</p>

            <h4>4️⃣ Activation energy — “Barrier challenge”</h4>
            <p><strong>🚧 Push-to-start demo:</strong> Try pushing a door lightly → no movement. Push harder → door opens. Say: “Reactions need a minimum energy to start”. 👉 This mirrors activation energy perfectly.</p>

            <h4>5️⃣ Bond breaking & forming (HT) — “Build and snap”</h4>
            <p><strong>🧱 Bond model:</strong> Use LEGO, pens, or paper clips. Pull apart = breaking bonds (energy in). Snap together = forming bonds (energy out). Say: “Breaking bonds needs energy”, “Making bonds releases energy”.</p>

            <h4>6️⃣ Practical reactions — “Do the chemistry”</h4>
            <p><strong>🌡 Mini temperature practical:</strong> Mix: Vinegar + baking soda (endothermic), Neutralisation (exothermic). Measure temperature change. 👉 Hands-on = exam confidence.</p>

            <h4>7️⃣ Cells & batteries — “Build a cell”</h4>
            <p><strong>🔋 Paper cell model:</strong> Two different coins = metals. Paper towel + salt water = electrolyte. Connect with wire. Say: “Different metals + electrolyte produce voltage”.</p>
            <p><strong>🔄 Rechargeable vs non-rechargeable acting:</strong> Walk forward = reaction happening. Hit a wall = non-rechargeable (reactants used up). Turn around and walk back = rechargeable (reaction reversed).</p>

            <h4>8️⃣ Fuel cells — “Flow of fuel”</h4>
            <p><strong>🚶 Continuous movement model:</strong> One person = hydrogen, one person = oxygen. Walk continuously into a “cell” area. Clap when water is produced. Say: “Fuel supplied continuously → electricity keeps flowing”.</p>

            <h4>9️⃣ Half-equations (HT) — “Electron passing”</h4>
            <p><strong>⚡ Electron transfer game:</strong> Coins = electrons. Oxidation = give away coins. Reduction = receive coins. At hydrogen fuel cell: Hydrogen gives electrons, Oxygen gains electrons.</p>

            <h4>🔟 Memory-locking routines (VERY effective)</h4>
            <p><strong>🔁 5-minute movement recap:</strong> Each day: Walk reaction profile, Act exo vs endo, Pass energy ball, Build a cell. 👉 Short, physical repetition = long-term memory.</p>
        </CardContent>
    </Card>
);

const LearnAsReadingWritingDeck5 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master "Energy changes" with structured writing and definitions.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Turn the spec into your own notes (foundation step)</h4>
            <p>Take each heading and rewrite it in your own words in short paragraphs. Example: An exothermic reaction releases energy to the surroundings, causing the temperature to increase. The products have less energy than the reactants. 👉 Rewriting = understanding.</p>

            <h4>2️⃣ Learn by definitions (non-negotiable)</h4>
            <p>Create a definitions page and memorise: Exothermic reaction, Endothermic reaction, Activation energy, Reaction profile, Electrolyte, Rechargeable cell. Rewrite each definition from memory daily.</p>

            <h4>3️⃣ Use “blurting” (top-grade technique)</h4>
            <p>Read one subtopic (e.g. reaction profiles). Close notes. Write everything you remember. Check and correct in a different colour. Do this for: Exo vs endo, Reaction profiles, Cells & batteries.</p>

            <h4>4️⃣ Write perfect exam paragraphs</h4>
            <p>For each big idea, write one model answer you could reproduce in an exam. Example (reaction profiles): A reaction profile shows the energy changes during a reaction. The peak represents the activation energy, which is the minimum energy needed for a reaction to occur. Memorise these paragraphs.</p>

            <h4>5️⃣ Tables instead of long text</h4>
            <p>Convert notes into comparison tables. Exothermic vs Endothermic: Energy released/absorbed, Temperature increases/decreases, Products lower/higher energy. Tables improve recall and reduce errors.</p>

            <h4>6️⃣ Sentence starters (exam gold)</h4>
            <p>Practise using: “Energy is conserved because…”, “This reaction is exothermic as…”, “The activation energy is…”. Rewrite answers using these starters.</p>

            <h4>7️⃣ Reaction profiles – written explanation</h4>
            <p>Draw the graph, then write a short explanation underneath: Where reactants are, Where products are, What the peak represents. Writing + labelling strengthens memory.</p>

            <h4>8️⃣ Bond energy calculations (HT)</h4>
            <p>Write out the steps every time: Bonds broken → energy in, Bonds formed → energy out, Calculate difference. Repeat until the method is automatic.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck5 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master "Energy changes" with diagrams, arrows, and color-coding.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1️⃣ Exothermic vs Endothermic — see the energy move</h4>
            <p>Draw two big boxes. Use arrows: 🔴 Outward arrows = exothermic (energy released), 🔵 Inward arrows = endothermic (energy absorbed). Add a thermometer icon showing temperature up or down. 👉 In the exam, picture the arrows.</p>

            <h4>2️⃣ Memory colour code (use this everywhere)</h4>
            <p>🔴 Red = energy released, 🔵 Blue = energy absorbed, 🟢 Green = reactants, 🟣 Purple = products. Use the same colours in all diagrams to lock memory.</p>

            <h4>3️⃣ Reaction profiles — picture the hill</h4>
            <p>Draw profiles for exothermic (products lower) and endothermic (products higher). Colour the peak for activation energy. Draw a smiley face for exothermic and a sad face for endothermic as a memory cue.</p>

            <h4>4️⃣ Activation energy — visual barrier</h4>
            <p>Draw a wall or hill between reactants and products. Label it: Activation Energy. A bigger hill means a harder reaction to start. 👉 One image = full definition.</p>

            <h4>5️⃣ Bond breaking & forming (HT) — arrows tell the story</h4>
            <p>Draw: Breaking bonds → 🔵 arrow in, Forming bonds → 🔴 arrow out. More red than blue = exothermic. More blue than red = endothermic.</p>

            <h4>6️⃣ Cells & batteries — simple block diagrams</h4>
            <p>Draw diagrams for: a simple cell (two different metals, electrolyte, electron flow arrow), a battery (multiple cells in series showing larger voltage), and use ➡️ (one direction) for non-rechargeable vs. 🔄 (circular) for rechargeable.</p>

            <h4>7️⃣ Fuel cells — continuous flow diagram</h4>
            <p>Draw: Hydrogen entering → electrons flowing → oxygen entering → water leaving. Colour-code H₂, O₂, and H₂O. (HT) Add half-equations in boxes at electrodes.</p>

            <h4>8️⃣ One-page visual summaries (VERY powerful)</h4>
            <p>Create summary pages with NO paragraphs, only diagrams, arrows, symbols, and labels. Make pages for: 1. Exothermic vs endothermic, 2. Reaction profiles & activation energy, 3. Cells & fuel cells. If you can see the page in your head, you’ve learned it.</p>
        </CardContent>
    </Card>
);

const LearnAsKinestheticDeck6 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Footprints className="w-6 h-6" />
                Learn as a Kinesthetic Learner
            </CardTitle>
            <CardDescription>Master reaction rates and equilibrium with hands-on activities.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>🧪🔴 RATE OF REACTION (4.6.1)</h4>
            <h4>🟠 1️⃣ Collision Theory Role-Play</h4>
            <p><strong>🚶‍♂️🚶‍♀️ Be the particles:</strong> 🟦 Low temperature → walk slowly. 🟥 High temperature → move fast. 💥 Light bump = ❌ no reaction. 💥💥 Hard bump = ✅ reaction.</p>
            <p>🧠 <strong>Remember:</strong> Reactions need collisions + enough energy. Hotter = faster + harder collisions 🔥</p>

            <h4>🟡 2️⃣ Surface Area Hands-On</h4>
            <p><strong>🧊 Take a sugar cube / chalk:</strong> 🔵 One big piece = slow. 🟢 Crushed pieces = fast. ✋ Touch all the surfaces.</p>
            <p>🧠 <strong>Memory hook:</strong> More surface area = more collisions = faster rate ⚡</p>

            <h4>🟢 3️⃣ Rate of Reaction Relay</h4>
            <p><strong>⏱️ Timer ON. 🥄 Move coins from Cup A (reactants) to Cup B (products).</strong> 🐢 Slow round = low rate. 🐇 Fast round = high rate.</p>
            <p>🧠 <strong>Exam link:</strong> 📌 Rate = quantity ÷ time</p>

            <h4>🔵 4️⃣ Walk the Graph</h4>
            <p><strong>📈 Tape a giant graph on the floor. 👣 Walk the line:</strong> Steep = FAST rate ⚡. Flat = SLOW rate 🐌. 📏 Lay a ruler/string as a tangent.</p>
            <p>🧠 <strong>Lock it in:</strong> Gradient = rate. Tangent = rate at ONE moment (HT).</p>

            <h4>🟣 5️⃣ Catalyst Shortcut Game</h4>
            <p><strong>🚶 Long path = ❌ no catalyst. 🏃 Shortcut = ✅ catalyst.</strong> ⏱️ Time both paths.</p>
            <p>🧠 <strong>Key idea:</strong> Catalyst = lower activation energy (start & end same, just quicker ⚡).</p>

            <hr className="my-4" />

            <h4>🔁🟠 REVERSIBLE REACTIONS & EQUILIBRIUM (4.6.2)</h4>
            <h4>🔴 6️⃣ Equilibrium Tug-of-War</h4>
            <p><strong>👈 Forward reaction vs 👉 Reverse reaction.</strong> ⚖️ Equal pull = equilibrium. ➕ Add people to one side → shift occurs.</p>
            <p>🧠 <strong>Exam phrase:</strong> Forward rate = reverse rate</p>

            <h4>🟡 7️⃣ Le Chatelier Reaction Game</h4>
            <p><strong>One person SHOUTS 🗣️:</strong> 🔥 “Increase temperature!”, 💨 “Increase pressure!”, 🧪 “Increase concentration!”. <strong>Everyone MOVES 🏃 to correct side.</strong></p>
            <p>🧠 <strong>Rules to chant while moving:</strong> 🔥 Heat ↑ → endothermic direction. 💨 Pressure ↑ → fewer gas molecules. 🧪 Concentration ↑ → move away.</p>

            <h4>🟢 8️⃣ Pressure Squeeze Demo</h4>
            <p><strong>🟢 Sticky notes = gas molecules. ✋ Squeeze them together.</strong></p>
            <p>🧠 <strong>Sticky memory:</strong> Pressure ↑ → fewer molecules side wins 🏆</p>

            <h4>🔵 9️⃣ Activation Energy Build</h4>
            <p><strong>📚 Stack books/blocks:</strong> 🔴 Tall stack = high activation energy. 🟢 Short stack = catalysed reaction.</p>
            <p>🧠 <strong>Say it while building:</strong> “Catalysts LOWER activation energy!”</p>

            <hr className="my-4" />
            
            <h4>🧠🟣 MEMORY-BOOST MOVEMENTS</h4>
            <p><strong>✋ Hand Signals:</strong> ⚡ Fast hand = fast rate, ✂️ Cutting motion = catalyst, ⚖️ Flat hands = equilibrium.</p>
            <p><strong>🚶 Walk & Talk:</strong> Pace while saying answers OUT LOUD 🗣️. Movement = memory 🔁.</p>
            <p><strong>✍️ Before Exams:</strong> 1️⃣ Act it out for 5 seconds. 2️⃣ Then write the answer.</p>
        </CardContent>
    </Card>
);

const LearnAsReadingWritingDeck6 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookText className="w-6 h-6" />
                Learn as a Reading/Writing Learner
            </CardTitle>
            <CardDescription>Master reaction rates with structured notes and written practice.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>🧪 RATE OF REACTION (4.6.1)</h4>
            <h4>1️⃣ Rewrite into CLEAN NOTES</h4>
            <p>Rewrite the notes in your own words using headings and bullet points. Example: Rate of reaction: the change in quantity of reactant or product per unit time. Formula: Rate = quantity ÷ time. Units: g/s, cm³/s, mol/s (HT). 🧠 Writing = processing = memory</p>
            
            <h4>2️⃣ Definition Drills</h4>
            <p>Create a definitions page and rewrite each definition 3 times. Key definitions: Rate of reaction, Activation energy, Catalyst, Reversible reaction, Dynamic equilibrium. 📌 Aim to write them from memory by the 3rd time.</p>
            
            <h4>3️⃣ Formula Practice Pages</h4>
            <p>Write the formula at the top of a page: Rate = quantity ÷ time. Under it, do at least 5 worked examples using mass, volume, and moles (HT). 📖 This trains exam calculation accuracy.</p>

            <h4>4️⃣ Describe Graphs in WORDS</h4>
            <p>Take a reaction graph and describe it in sentences: “The reaction is fastest at the start because the gradient is steep. As time increases, the gradient decreases, showing the rate slows down.” 🧠 Examiners reward clear written explanations.</p>

            <h4>5️⃣ Write EXAM SENTENCES</h4>
            <p>Practise writing full-mark answers using keywords. Example: “Increasing temperature increases the rate of reaction because particles move faster, causing more frequent and more energetic collisions, so more particles have energy greater than the activation energy.” ✍️ Repeat until fluent.</p>

            <h4>6️⃣ Catalyst Paragraph Builder</h4>
            <p>Write a perfect catalyst paragraph with this template: “A catalyst increases the rate of reaction by providing an alternative reaction pathway with a lower activation energy. This means a greater proportion of particles have sufficient energy to react. The catalyst is not used up in the reaction.” Memorise this paragraph.</p>

            <h4>🔁 REVERSIBLE REACTIONS & EQUILIBRIUM (4.6.2)</h4>
            <h4>7️⃣ Word Equation Lists</h4>
            <p>Write and rewrite word equations like: Nitrogen + hydrogen ⇌ ammonia, Hydrated copper sulfate ⇌ anhydrous copper sulfate + water. 📌 Writing equations improves recall.</p>

            <h4>8️⃣ Le Chatelier Sentence Frames</h4>
            <p>Use sentence starters and complete them: “If the temperature is increased, the equilibrium position shifts in the __________ direction.” “Increasing pressure shifts equilibrium towards the side with __________ gas molecules.”</p>
            
            <h4>9️⃣ Comparison Tables (Text-based)</h4>
            <p>Create written tables for Temperature Increase (Endothermic → more products, Exothermic → fewer products) and Pressure Increase (Shifts to side with fewer gas molecules). ✍️ Writing tables reinforces structure.</p>

            <h4>🔟 Blur–Write–Check Method</h4>
            <p>1️⃣ Read notes 2️⃣ Cover them 3️⃣ Write everything you remember 4️⃣ Check and correct in a different colour. 🧠 This is one of the most effective revision techniques.</p>

            <h4>🧠 EXAM-SPECIFIC STRATEGIES</h4>
            <p>✔️ Keyword Lists: Write a must-use keywords list (Collision frequency, Activation energy, etc.) and tick them off as you revise.</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck6 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master this topic by drawing, connecting, and organizing information visually.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>🧪 RATE OF REACTION (4.6.1)</h4>
            <h4>🟥 1️⃣ Use COLOUR-CODED NOTES</h4>
            <p>Rewrite the notes using the same colours every time: 🔴 Definitions (rate, activation energy), 🔵 Equations & formulas, 🟢 Factors, 🟣 Graphs, 🟠 Exam keywords. Your brain links colour = meaning 🧠✨</p>

            <h4>📊 2️⃣ Picture the RATE FORMULA</h4>
            <p>Draw a big box: ⬇️ 🟦 RATE = QUANTITY ÷ TIME ⬆️. Under it, draw: ⚖️ Mass (g), 🧪 Volume (cm³), ⚛️ Moles (HT). ➡️ One formula = many uses</p>

            <h4>📈 3️⃣ Graphs = STORIES</h4>
            <p>Always draw two graphs side by side: 🟢 Fast reaction (Steep curve, Finishes quickly), 🔴 Slow reaction (Shallow curve, Takes longer). ✏️ Draw a tangent and label: ➡️ “Rate at this moment”. 📌 Visual rule: Steeper = faster ⚡</p>

            <h4>💥 4️⃣ Collision Theory as CARTOONS</h4>
            <p>Draw particles as circles: 🟦 Low temperature (Far apart, Slow arrows ➡️), 🔥 High temperature (Close together, Big arrows ➡️➡️➡️). ❌ Small arrows = no reaction. ✅ Big arrows = reaction. Your brain remembers movement lines better than words.</p>

            <h4>🧊 5️⃣ Surface Area Sketch</h4>
            <p>Draw: One big cube ❌, Many small cubes ✅. Label: 🟢 More surface area, ⚡ Faster reaction. 📌 Exam phrase to write under drawing: “Greater surface area increases collision frequency”</p>

            <h4>✂️ 6️⃣ Catalyst Energy Profile</h4>
            <p>Draw two hills: 🔴 Tall hill = no catalyst, 🟢 Short hill = catalyst. Same start & end level ✔️, Lower peak ✔️. 🧠 Visual memory: Catalyst = shorter hill</p>

            <hr/>
            <h4>🔁 REVERSIBLE REACTIONS & EQUILIBRIUM (4.6.2)</h4>
            <h4>🔄 7️⃣ Reversible Reaction Arrows</h4>
            <p>Always draw: ⬅️ ⇌ ➡️. Write: Left = forward, Right = reverse. Under it: ⚖️ Equilibrium = same rate</p>

            <h4>⚖️ 8️⃣ Equilibrium Balance Diagram</h4>
            <p>Draw a balance scale: ⚪ Reactants | Products ⚪. Label: ❌ Amounts NOT equal, ✅ Rates ARE equal. This stops common exam mistakes 🚫</p>

            <h4>🔥 9️⃣ Temperature Change FLOWCHART (HT)</h4>
            <p>Draw arrows: 🔥 Temp ↑ ➡️ Endothermic direction ➡️ More products (endo). ❄️ Temp ↓ ➡️ Exothermic direction ➡️ More products (exo). 📌 Use red for exothermic, blue for endothermic</p>

            <h4>💨 🔢 1️⃣0️⃣ Pressure Change DIAGRAM (HT)</h4>
            <p>Draw gas particles: 🔴 Left side: 4 particles, 🟢 Right side: 2 particles. ⬆️ Pressure ↑ ➡️ Arrow to fewer particles side. 🧠 Picture beats memorising every time.</p>

            <h4>🧪 1️⃣1️⃣ Concentration Change MAP (HT)</h4>
            <p>Draw a box reaction: Add reactant ➕ ➡️ Arrow AWAY ➡️ Towards products. Remove product ➖ ➡️ Arrow TOWARDS products. Label: “System acts to oppose change”</p>
        </CardContent>
    </Card>
);

const LearnAsVisualDeck7 = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Learn as a Visual Learner
            </CardTitle>
            <CardDescription>Master Organic Chemistry by drawing structures and visualizing reactions.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1. Crude Oil, Hydrocarbons & Alkanes 🛢️</h4>
            <p><strong>Draw a ladder diagram:</strong> Each rung adds +1 carbon. Write the formula pattern CnH₂n+₂. Colour carbons black and hydrogens blue. Make a one-box-per-alkane strip: Methane | Ethane | Propane | Butane. 👁️ <strong>Visual cue:</strong> Every step adds one carbon and two hydrogens.</p>

            <h4>2. Fractional Distillation 🧪</h4>
            <p><strong>Draw a tall column:</strong> Red at the bottom (hot), blue at the top (cool). Use short arrows for small molecules (go high) and long arrows for large molecules (stay low). 🧠 <strong>Visual sentence:</strong> Small = top = low boiling point.</p>

            <h4>3. Properties of Hydrocarbons 🔥</h4>
            <p><strong>Turn into a visual table:</strong> Use up/down arrows to show trends for Boiling Point, Viscosity, and Flammability as molecule size increases. Highlight arrows in different colours.</p>

            <h4>4. Combustion of Hydrocarbons 🔥</h4>
            <p><strong>Draw a reaction strip:</strong> Hydrocarbon → CO₂ + H₂O. Circle oxygen in red to represent oxidation. 💡 <strong>Sticky-note rule:</strong> Complete combustion = only CO₂ + H₂O.</p>

            <h4>5. Cracking & Alkenes 🪓</h4>
            <p><strong>Draw a long zig-zag chain</strong> and split it in the middle. Label one side 'alkane' and the other 'alkene' (draw the double bond boldly). For the bromine water test, draw an orange box → an arrow → a clear box, and label "alkene present."</p>

            <h4>6. Alkenes & Addition Reactions ➕</h4>
            <p><strong>Draw the C=C double bond</strong> with a thick line. Draw arrows going across the bond to show where new atoms are added. The final product should have a single bond. Write once: "Addition = atoms added across C=C."</p>

            <h4>7. Alcohols 🍺</h4>
            <p><strong>Highlight the –OH group</strong> in a bright colour in all alcohol structures. Create a reaction wheel with "Alcohol" in the center and spokes for: Burn 🔥, Sodium ⚡, Water 💧, Oxidation 🧪.</p>

            <h4>8. Carboxylic Acids 🍋</h4>
            <p><strong>Draw the –COOH functional group</strong> as a distinct block shape and attach it to your acid molecules. For esterification, draw: Acid + Alcohol → Ester + Water, using colors and arrows to track the atoms.</p>

            <h4>9. Polymers 🧵</h4>
            <p><strong>Addition Polymerisation:</strong> Highlight the C=C double bond in the monomer. Draw the repeating unit in a box, showing no atoms are lost. <strong>Condensation Polymerisation (HT):</strong> Draw the two different monomers and circle the small molecule (like H₂O) that is removed in a bright colour.</p>

            <h4>10. DNA & Natural Polymers 🧬</h4>
            <p><strong>Draw DNA as a twisted ladder</strong> and colour-code the base pairs. For proteins, draw a chain of different coloured circles and label them "amino acids." Create a simple diagram: DNA → (made of) → nucleotides, Proteins → (made of) → amino acids.</p>
        </CardContent>
    </Card>
);




const DeckView = ({ deck, onQuiz, userDetails, onNoteAdded }: DeckViewProps) => {
  const { user } = useUser();
  const firestore = useFirestore();
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
    if (!userDetails?.learningStyle) return null;
    
    const style = userDetails.learningStyle;
    const deckId = deck.id;

    if (deckId === 'deck1') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck1 />;
        if (style === 'Visual') return <LearnAsVisualDeck1 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck1 />;
    }

    if (deckId === 'deck2') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck2 />;
        if (style === 'Visual') return <LearnAsVisualDeck2 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck2 />;
    }

    if (deckId === 'deck3') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck3 />;
        if (style === 'Visual') return <LearnAsVisualDeck3 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck3 />;
    }
    
    if (deckId === 'deck4') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck4 />;
        if (style === 'Visual') return <LearnAsVisualDeck4 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck4 />;
    }
     if (deckId === 'deck5') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck5 />;
        if (style === 'Visual') return <LearnAsVisualDeck5 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck5 />;
    }
    if (deckId === 'deck6') {
        if (style === 'Kinesthetic') return <LearnAsKinestheticDeck6 />;
        if (style === 'Visual') return <LearnAsVisualDeck6 />;
        if (style === 'Reading/Writing') return <LearnAsReadingWritingDeck6 />;
    }
    if (deckId === 'deck7') {
        if (style === 'Visual') return <LearnAsVisualDeck7 />;
    }
    
    return null;
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
                        Quiz
                    </CardTitle>
                    <CardDescription>Test your knowledge with a quiz tailored to your learning style.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button onClick={handleGenerateQuiz} className="w-full" size="lg">
                        Quiz Me!
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
