
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
                <NestedAccordion sections={parsed} />
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
            <p><strong>Activity:</strong> Mind map: Create a colorful mind map connecting bonding types → structures → properties → uses. Use icons or small sketches for atoms, ions, metals, polymers, and nanoparticles.</p>

            <h4>2️⃣ Chemical bonds: ionic, covalent, metallic</h4>
            <p><strong>Activity:</strong> Color-coded chart: Make a table with three columns (Ionic / Covalent / Metallic). Use colors to indicate: Electron transfer (red → blue), Shared electrons (overlapping circles), Delocalised electrons (wavy arrows). Interactive animation: Use online simulations (e.g., PhET) to see bonding in 3D.</p>
            
            <h4>3️⃣ Ionic bonding</h4>
            <p><strong>Activity:</strong> Dot-and-cross diagrams: Draw ions in different colors (e.g., metal = blue, non-metal = red). 3D ball-and-stick model: Build NaCl or MgO using small balls for ions to see the lattice. Group activity: Physically "transfer electrons" with colored balls between students acting as atoms.</p>

            <h4>4️⃣ Ionic compounds</h4>
            <p><strong>Activity:</strong> Ionic lattice diagram: Use graph paper or LEGO to create a 3D model of NaCl lattice. Highlight electrostatic forces using arrows between ions. Empirical formula exercise: Build mini-models of compounds, then deduce formulas visually.</p>

            <h4>5️⃣ Covalent bonding</h4>
            <p><strong>Activity:</strong> Venn diagram or sharing diagrams: Use overlapping colored circles to show shared electron pairs. 3D molecular models: Build hydrogen, water, methane, ammonia using modeling kits. Drawing practice: Dot-and-cross and line diagrams in different colors for each element.</p>

            <h4>6️⃣ Metallic bonding</h4>
            <p><strong>Activity:</strong> Layered diagram: Show metal atoms in layers and wavy arrows for delocalised electrons. Animation: Show how electrons move freely through the metal lattice. Hands-on: Stack coins or discs to represent layers of atoms, with beads representing delocalised electrons.</p>
            
            <h4>7️⃣ Bonding and structure linked to properties</h4>
            <p><strong>States of matter Activity:</strong> Particle diagrams: Draw solids, liquids, and gases using colored dots; show movement with arrows. Melting/boiling demonstration: Use ice and water to visually connect particle movement with state changes.</p>
            <p><strong>Properties Activity:</strong> Comparison table: Use visuals and symbols to represent: Conductivity (⚡), Melting point (🌡️), Strength of forces (arrows of different thickness). Molecule model building: Build small molecules vs. polymer chains vs. metallic lattice.</p>
            
            <h4>8️⃣ Structure and bonding of carbon</h4>
            <p><strong>Activity:</strong> 3D models: Build diamond, graphite layers, graphene sheets, and C₆₀ fullerenes using colored balls and sticks. Layered diagrams: Show graphite’s layers and how delocalised electrons move. Compare and contrast chart: Include hardness, conductivity, melting points with small icons.</p>

            <h4>9️⃣ Nanoparticles</h4>
            <p><strong>Activity:</strong> Size comparison diagram: Draw nanoparticles vs. bulk materials to illustrate surface area. Visual uses chart: Draw icons for medicine, electronics, cosmetics, etc., linking them to nanoparticles. Infographic: Show risks vs. benefits visually, with color-coded warnings and benefits.</p>
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
    if (!userDetails?.learningStyle) return null;
    
    if (deck.id === 'deck1') {
        switch (userDetails.learningStyle) {
            case 'Kinesthetic':
                return <LearnAsKinestheticDeck1 />;
            case 'Visual':
                return <LearnAsVisualDeck1 />;
            case 'Reading/Writing':
                return <LearnAsReadingWritingDeck1 />;
            default:
                return null;
        }
    }

    if (deck.id === 'deck2') {
        switch (userDetails.learningStyle) {
            case 'Visual':
                return <LearnAsVisualDeck2 />;
            case 'Kinesthetic':
                return <LearnAsKinestheticDeck2 />;
            case 'Reading/Writing':
                return <LearnAsReadingWritingDeck2 />;
            default:
                return null;
        }
    }

    if (deck.id === 'deck3') {
        switch (userDetails.learningStyle) {
            case 'Kinesthetic':
                return <LearnAsKinestheticDeck3 />;
            default:
                return null;
        }
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

    