
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, Eye, CheckCircle, Pencil, Rows, ChevronsRightLeft, Key, Atom, TestTube, Thermometer, Sigma, Link as LinkIcon, CircleDashed, Disc, BookImage } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { DiagramsDialog } from './DiagramsDialog';

type VisualQuizViewProps = {
    title: string;
    onBack: () => void;
    deckId: string;
    isEmbedded?: boolean;
};

const deck1Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c4', 'c5', 'c6', 'c8', 'c9'].includes(img.id));
const deck2Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c8', 'c9', 'c10', 'c11', 'c12'].includes(img.id));
const deck3Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c1', 'c2', 'c13', 'c16'].includes(img.id));


const Deck1Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: BIG-PICTURE DIAGRAMS</h3>
        <p><strong>1️⃣ Concept map (draw, don’t write paragraphs)</strong></p>
        <p>Draw a concept map starting with 'Atoms' in the centre. Add branches to: elements, compounds, mixtures, chemical reactions. On each branch, add one key fact from the notes.</p>
        <p className="mt-4"><strong>2️⃣ Before vs After (box diagrams)</strong></p>
        <p>Draw two pairs of boxes: Pair A (Chemical reaction) and Pair B (Mixture). Label 'Before' and 'After' for each, and mark whether new substances are formed and if a chemical reaction was involved.</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <p className="font-semibold">Example Concept Map Facts:</p>
                <ul className="text-sm">
                  <li><strong>Atoms:</strong> Smallest part of an element.</li>
                  <li><strong>Elements:</strong> Made of one type of atom.</li>
                  <li><strong>Compounds:</strong> 2+ elements chemically combined.</li>
                  <li><strong>Mixtures:</strong> Not chemically combined.</li>
                  <li><strong>Chemical reactions:</strong> Form new substances.</li>
                </ul>
                <p className="font-semibold mt-4">Before vs After Boxes:</p>
                <ul className="text-sm">
                    <li><strong>Pair A (Chemical Reaction):</strong> "new substances formed" ✔, "chemical reaction involved" ✔</li>
                    <li><strong>Pair B (Mixture):</strong> "new substances formed" ✖, "chemical reaction involved" ✖</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />

        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 2: ATOMIC MODELS (TIMELINE)</h3>
        <p><strong>3️⃣ Timeline task</strong></p>
        <p>Draw a horizontal timeline and place these in order: tiny solid sphere, plum pudding model, nuclear model, Bohr model, proton, neutron. Add one visual detail (dot, circle, shading) to each model.</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Check Answer</AccordionTrigger>
            <AccordionContent>
                <p className="font-semibold text-sm">Correct Order:</p>
                <ol className="list-decimal pl-6 text-sm">
                    <li>Tiny solid sphere (solid circle)</li>
                    <li>Plum pudding model (circle with dots inside)</li>
                    <li>Nuclear model (circle with central dot)</li>
                    <li>Bohr model (central dot with rings)</li>
                    <li>Proton (discovered within nucleus)</li>
                    <li>Neutron (discovered within nucleus)</li>
                </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Rows className="text-accent" />SECTION 3: SUBATOMIC PARTICLES (TABLE COMPLETION)</h3>
        <p><strong>4️⃣ Complete the table</strong>: Then circle the particle with no charge and the one with very small mass.</p>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Particle</TableHead>
                    <TableHead>Relative charge</TableHead>
                    <TableHead>Relative mass</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow><TableCell>Proton</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Neutron</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Electron</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
            </TableBody>
        </Table>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
               <Table>
                    <TableBody>
                        <TableRow><TableCell>Proton</TableCell><TableCell>+1</TableCell><TableCell>1</TableCell></TableRow>
                        <TableRow><TableCell><strong>Neutron (circled)</strong></TableCell><TableCell><strong>0</strong></TableCell><TableCell>1</TableCell></TableRow>
                        <TableRow><TableCell><strong>Electron (circled)</strong></TableCell><TableCell>-1</TableCell><TableCell><strong>Very small</strong></TableCell></TableRow>
                    </TableBody>
                </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />

         <h3 className="flex items-center gap-2"><Atom className="text-accent" />SECTION 4: SIZE & SCALE</h3>
         <p><strong>5️⃣ Scale drawing</strong></p>
         <p>Draw a large circle for an atom and a tiny dot in the centre for the nucleus. Label the atom radius and nucleus radius. Then add an arrow pointing to where almost all the mass is.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>Check Answer</AccordionTrigger>
            <AccordionContent>
                <ul className="text-sm">
                    <li>Atom radius: 0.1 nm (1 × 10⁻¹⁰ m)</li>
                    <li>Nucleus radius: &lt;1/10,000 of atom (1 × 10⁻¹⁴ m)</li>
                    <li>Arrow should point to the nucleus, labelled "almost all mass here".</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><Sigma className="text-accent" />SECTION 5: ELECTRONIC STRUCTURE</h3>
        <p><strong>6️⃣ Shell diagram</strong></p>
        <p>Draw the electronic structure of sodium as a shell diagram OR numbers (2,8,1). Circle the outer shell.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-5">
            <AccordionTrigger>Check Answer</AccordionTrigger>
            <AccordionContent>
                <p className="text-sm">Diagram should show a nucleus, an inner shell with 2 electrons, a second shell with 8 electrons, and an outer shell (circled) with 1 electron.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Key className="text-accent" />SECTION 6: PERIODIC TABLE PATTERNS</h3>
        <p><strong>7️⃣ Highlighting task</strong></p>
        <p>Draw a simplified periodic table grid and shade metals and non-metals, circle Groups 0, 1, and 7, and add arrows for reactivity trends.</p>
        <p className="mt-4"><strong>8️⃣ Group summary boxes</strong></p>
        <p>Draw three boxes for Groups 0, 1, and 7 and list their key properties using bullet points.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <p className="font-semibold text-sm">Highlighting Task:</p>
                <ul className="text-sm">
                    <li>Metals shaded on the left, non-metals on the right.</li>
                    <li>Group 1 reactivity arrow points down (increases).</li>
                    <li>Group 7 reactivity arrow points up (decreases down the group).</li>
                </ul>
                <p className="font-semibold text-sm mt-2">Group Summary Boxes:</p>
                <ul className="text-sm">
                    <li><strong>Group 0:</strong> 8 outer electrons, unreactive, boiling point increases down group.</li>
                    <li><strong>Group 1:</strong> 1 outer electron, reactivity increases down group.</li>
                    <li><strong>Group 7:</strong> 7 outer electrons, reactivity decreases down group, displacement reactions.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><CheckCircle className="text-accent" />SECTION 7: TRUE / FALSE (VISUAL MARKING)</h3>
        <p><strong>9️⃣ Colour-code</strong>: Use 🟢 for true and 🔴 for false. Correct the false ones using diagrams or arrows.</p>
         <ul className="list-none pl-0">
            <li>a) All substances are made of atoms</li>
            <li>b) Mixtures are chemically combined</li>
            <li>c) Atoms have no overall electrical charge</li>
            <li>d) Group 1 reactivity decreases down the group</li>
            <li>e) Group 7 reactivity increases down the group</li>
        </ul>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-7">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-none pl-0 text-sm">
                    <li>🟢 a) True</li>
                    <li>🔴 b) False (Correction: draw two separate substances in a box, not bonded)</li>
                    <li>🟢 c) True</li>
                    <li>🔴 d) False (Correction: draw arrow pointing down next to Group 1)</li>
                    <li>🔴 e) False (Correction: draw arrow pointing up next to Group 7)</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><TestTube className="text-accent" />SECTION 8: DISPLACEMENT VISUAL</h3>
        <p><strong>🔟 Displacement sketch</strong></p>
        <p>Draw a beaker with a halogen solution, showing a more reactive halogen displacing a less reactive one with arrows.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-8">
            <AccordionTrigger>Check Answer</AccordionTrigger>
            <AccordionContent>
                <p className="text-sm">Example: An arrow from 'Chlorine' points to a beaker of 'Potassium Bromide solution', with an arrow pointing out labelled 'Bromine'. Chlorine should be labelled 'more reactive'.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />
        
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />FINAL VISUAL CHECK (MOST IMPORTANT)</h3>
        <p><strong>1️⃣1️⃣ One-page redraw</strong>: Without notes, redraw the entire topic using diagrams, tables, and arrows. Then compare with your notes and add missing parts in a different colour.</p>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can draw it from memory, you understand the connections. This is the best way to revise for a visual learner.</p>
        </div>
    </>
);

const Deck2Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: BIG-PICTURE DIAGRAMS</h3>
        <p><strong>1️⃣ Concept map (draw, don’t write paragraphs)</strong></p>
        <p>Draw a concept map starting with ‘Bonding & Structure’ in the centre. Add branches to: Ionic, Covalent, Metallic, Polymers, Nanoparticles. On each branch, add one key visual fact.</p>
        <p className="mt-4"><strong>2️⃣ Comparison boxes (before vs after)</strong></p>
        <p>Draw two pairs of boxes: Pair A (Ionic bonding) and Pair B (Covalent bonding). Label 'Atoms before' and 'Atoms after'. Show electron transfer or sharing visually using dots and crosses.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-1">
                <AccordionTrigger>Check Diagrams</AccordionTrigger>
                <AccordionContent>
                    <p className="font-semibold">Concept Map Facts:</p>
                    <ul className="text-sm">
                        <li><strong>Ionic:</strong> Arrow showing electron transfer.</li>
                        <li><strong>Covalent:</strong> Overlapping circles for shared electrons.</li>
                        <li><strong>Metallic:</strong> Grid of '+' ions with 'e⁻' moving between.</li>
                    </ul>
                     <p className="font-semibold mt-2">Comparison Boxes:</p>
                     <ul className="text-sm">
                        <li><strong>Ionic:</strong> Electron moves from metal to non-metal, forming ions.</li>
                        <li><strong>Covalent:</strong> Electron pair shown between two non-metals.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><LinkIcon className="text-accent" />SECTION 2: BONDING MODELS</h3>
        <p><strong>3️⃣ Dot-and-cross diagrams:</strong> Draw diagrams for H₂O, CH₄, and NH₃. Circle the shared electron pairs.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-2">
                <AccordionTrigger>Check Diagrams</AccordionTrigger>
                <AccordionContent>
                    <ul className="text-sm">
                        <li><strong>H₂O:</strong> Oxygen sharing one electron with each of two hydrogens. Two non-bonding pairs on oxygen.</li>
                        <li><strong>CH₄:</strong> Carbon sharing one electron with each of four hydrogens.</li>
                        <li><strong>NH₃:</strong> Nitrogen sharing one electron with each of three hydrogens. One non-bonding pair on nitrogen.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Rows className="text-accent" />SECTION 3: PROPERTIES TABLE</h3>
        <p><strong>4️⃣ Complete the table:</strong> Fill in the properties for each substance type.</p>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Ionic (NaCl)</TableHead>
                    <TableHead>Covalent (H₂O)</TableHead>
                    <TableHead>Metallic (Fe)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow><TableCell>Conducts when molten?</TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Melting point</TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
            </TableBody>
        </Table>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-3">
                <AccordionTrigger>Check Table</AccordionTrigger>
                <AccordionContent>
                     <Table>
                        <TableBody>
                            <TableRow><TableCell>Conducts when molten?</TableCell><TableCell>Yes</TableCell><TableCell>No</TableCell><TableCell>Yes</TableCell></TableRow>
                            <TableRow><TableCell>Melting point</TableCell><TableCell>High</TableCell><TableCell>Low</TableCell><TableCell>High</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><CircleDashed className="text-accent" />SECTION 4: PARTICLE DIAGRAMS</h3>
        <p><strong>5️⃣ Draw the NaCl lattice:</strong> Use circles for ions, labeling Na⁺ and Cl⁻. Add arrows to show electrostatic forces.</p>
        <p className="mt-4"><strong>8️⃣ Draw particle diagrams</strong> for a simple covalent substance as a solid, liquid, and gas.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-4">
                <AccordionTrigger>Check Diagrams</AccordionTrigger>
                <AccordionContent>
                     <ul className="text-sm">
                        <li><strong>NaCl Lattice:</strong> Should show a regular, alternating 3D pattern of positive (Na⁺) and negative (Cl⁻) ions.</li>
                        <li><strong>Particle Diagrams:</strong> Solid = ordered, vibrating particles. Liquid = disordered, close particles. Gas = random, far-apart particles.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <hr />

        <h3 className="flex items-center gap-2"><Disc className="text-accent" />SECTION 5: METALS & ALLOYS</h3>
        <p><strong>7️⃣ Layer sketch:</strong> Draw a diagram of a pure metal lattice with layers. Then, draw an alloy with distorted layers.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-5">
                <AccordionTrigger>Check Sketch</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">The pure metal diagram should show neat rows of identical circles. The alloy diagram should show a mix of different-sized circles, disrupting the regular pattern.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Atom className="text-accent" />SECTION 6: CARBON STRUCTURES</h3>
        <p><strong>9️⃣ Draw and label:</strong> Create simple diagrams for diamond, graphite, graphene, and C₆₀ fullerene. Label key features like bonding and layers.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-6">
                <AccordionTrigger>Check Diagrams</AccordionTrigger>
                <AccordionContent>
                    <ul className="text-sm">
                        <li><strong>Diamond:</strong> Tetrahedral network, each carbon bonded to 4 others.</li>
                        <li><strong>Graphite:</strong> Hexagonal layers, each carbon bonded to 3 others.</li>
                        <li><strong>Graphene:</strong> A single one of graphite's layers.</li>
                        <li><strong>C₆₀ fullerene:</strong> A spherical shape made of hexagons and pentagons.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />FINAL VISUAL CHECK</h3>
        <p><strong>1️⃣1️⃣ One-page redraw:</strong> Without notes, visually summarize the entire topic using diagrams, tables, and arrows. Compare with your notes and fill in gaps with a different color.</p>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can draw the connections and structures from memory, you've visually mastered the topic.</p>
        </div>
    </>
);

const Deck3Quiz = () => (
    <>
      <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: DIAGRAMMING EQUATIONS & FORMULAS</h3>
      <p><strong>1️⃣ Balance & Conservation of Mass:</strong> Draw the reaction `Mg + 2HCl → MgCl₂ + H₂` using color-coded circles for each atom. Show that the number and type of atoms are equal on both sides.</p>
      <p className="mt-4"><strong>2️⃣ Relative Formula Mass:</strong> For `CaCO₃`, draw a diagram breaking it down into its atoms (Ca, C, O, O, O). Assign the correct relative atomic mass to each and show how they sum to 100.</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Check Understanding</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-sm">
                <li>Your diagram for Mg + 2HCl should show 1 Mg, 2 H, and 2 Cl atoms on both the left and right sides, just rearranged.</li>
                <li>Your CaCO₃ breakdown should visually add 40 + 12 + (3 x 16) to equal 100.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <hr />

      <h3 className="flex items-center gap-2"><Sigma className="text-accent" />SECTION 2: VISUALIZING MOLES & LIMITS</h3>
      <p><strong>3️⃣ Moles as a "Box":</strong> Draw a large box labeled "1 Mole". Inside, write the Avogadro constant (6.02 x 10²³). This helps visualize the mole as a specific quantity.</p>
      <p className="mt-4"><strong>4️⃣ Limiting Reactants:</strong> Draw a beaker with particles for two reactants before a reaction. Draw a second beaker "after" showing the new product, the leftover excess reactant, and clearly cross out the reactant that was completely used up.</p>
       <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>Check Understanding</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-sm">
                <li>The mole box is a conceptual tool to visualize a large, specific number.</li>
                <li>The "after" beaker should clearly distinguish between product, leftover reactant, and the completely consumed limiting reactant.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <hr />

      <h3 className="flex items-center gap-2"><Thermometer className="text-accent" />SECTION 3: YIELD & CONCENTRATION DIAGRAMS</h3>
      <p><strong>5️⃣ Percentage Yield Flowchart:</strong> Draw a flowchart. Start with "Maximum Theoretical Mass" in a large beaker. Add arrows pointing away labeled "Lost Product" and "By-Products". The remaining amount should be labeled "Actual Product".</p>
      <p className="mt-4"><strong>6️⃣ Concentration Flasks:</strong> Draw two flasks of the same volume. In one, draw a few colored dots (low concentration). In the other, draw many colored dots (high concentration). Label them "Low c" and "High c".</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-3">
          <AccordionTrigger>Check Understanding</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 text-sm">
                <li>The yield diagram visually explains why actual yield is always less than theoretical.</li>
                <li>The flask diagrams provide a quick visual reference for what concentration means at a particle level.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
);


const VisualQuizView = ({ title, onBack, deckId, isEmbedded = false }: VisualQuizViewProps) => {
    const [isDiagramsOpen, setIsDiagramsOpen] = React.useState(false);

    const diagrams = deckId === 'deck1' ? deck1Diagrams : deckId === 'deck2' ? deck2Diagrams : deck3Diagrams;
    
    const renderQuizContent = () => {
        if (deckId === 'deck1') {
            return <Deck1Quiz />;
        }
        if (deckId === 'deck2') {
            return <Deck2Quiz />;
        }
        if (deckId === 'deck3') {
            return <Deck3Quiz />;
        }
        return <p>No visual quiz available for this topic yet.</p>;
    }
    
    const quizSection = (
      <>
        <div className="p-4 bg-primary/10 rounded-lg text-center">
            <h3 className="font-bold text-primary">How to use this quiz</h3>
            <p className="text-sm">Draw, connect, and organize the information visually. Use pen and paper.</p>
             <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsDiagramsOpen(true)}>
                <BookImage className="mr-2 h-4 w-4" />
                View Diagrams
            </Button>
        </div>
        <hr />
        {renderQuizContent()}
      </>
    );

    if (isEmbedded) {
        return (
            <div className="prose prose-sm dark:prose-invert max-w-none">
                {quizSection}
                <DiagramsDialog 
                    isOpen={isDiagramsOpen} 
                    onClose={() => setIsDiagramsOpen(false)} 
                    diagrams={diagrams}
                    title={`Diagrams for ${title}`}
                />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
                </Button>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader className="text-center">
                        <Eye className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle className="text-3xl font-bold mt-2">VISUAL QUIZ</CardTitle>
                        <CardDescription>{title}</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        {quizSection}
                    </CardContent>
                </Card>
            </ScrollArea>
             <DiagramsDialog 
                isOpen={isDiagramsOpen} 
                onClose={() => setIsDiagramsOpen(false)} 
                diagrams={diagrams}
                title={`Diagrams for ${title}`}
            />
        </div>
    );
};

export default VisualQuizView;

    