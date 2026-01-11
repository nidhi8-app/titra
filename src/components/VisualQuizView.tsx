
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, Eye, CheckCircle, Pencil, Rows, ChevronsRightLeft, Key, Atom, TestTube, Thermometer, Sigma, Link as LinkIcon, CircleDashed, Disc, BookImage, Zap } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { DiagramsDialog } from './DiagramsDialog';
import { Input } from './ui/input';
import { PeriodicTableDialog } from './PeriodicTableDialog';

type VisualQuizViewProps = {
    title: string;
    onBack: () => void;
    deckId: string;
    difficulty: 'easy' | 'hard';
    isEmbedded?: boolean;
};

const deck1Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c4', 'c5', 'c6', 'c7'].includes(img.id));
const deck2Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c8', 'c9', 'c10', 'c11', 'c12'].includes(img.id));
const deck3Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c1', 'c2', 'c13', 'c16'].includes(img.id));
const deck4Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c3', 'c6', 'c7', 'c18', 'c20'].includes(img.id));
const deck5Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c13', 'c14', 'c15'].includes(img.id));
const deck6Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c7', 'c14', 'c16', 'c23'].includes(img.id));
const deck7Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c9', 'c10', 'c11'].includes(img.id));
const deck8Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c3', 'c18', 'c19', 'c20'].includes(img.id));
const deck9Diagrams: ImagePlaceholder[] = PlaceHolderImages.filter(img => ['c22'].includes(img.id));


const Deck1EasyQuiz = () => (
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
                <TableRow><TableCell>Proton</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Neutron</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Electron</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
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

const Deck1HardQuiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: BIG-PICTURE DIAGRAMS (ANALYSIS)</h3>
        <p><strong>1️⃣ Concept map challenge:</strong> Draw a concept map starting with 'Atoms'. Add branches for Elements, Compounds, Mixtures, and Chemical reactions. For each, include examples and key properties (e.g., ionic vs. covalent, homogeneous vs. heterogeneous, exothermic vs. endothermic).</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hard-1-1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent>
              <ul className="list-disc pl-6 text-sm">
                  <li><strong>Elements:</strong> Should show examples like 'Na (metal)' and 'O (non-metal)'.</li>
                  <li><strong>Compounds:</strong> Should branch into 'Ionic' (e.g., NaCl diagram) and 'Covalent' (e.g., H₂O diagram).</li>
                  <li><strong>Mixtures:</strong> Should branch into 'Homogeneous' (e.g., salt water) and 'Heterogeneous' (e.g., sand and water).</li>
                  <li><strong>Reactions:</strong> Should indicate energy change, e.g., 'Combustion (exothermic)'.</li>
                  <li><strong>Extra:</strong> Arrows should show physical separation for mixtures and chemical reaction for compound formation.</li>
              </ul>
          </AccordionContent></AccordionItem>
        </Accordion>
        <p className="mt-4"><strong>2️⃣ Compare & explain:</strong> Draw three sets of "Before" and "After" boxes for a Mixture, a Chemical Reaction, and a Physical Change. Show particle arrangement and note energy/bonding changes.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hard-1-2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent>
             <ul className="list-disc pl-6 text-sm">
                  <li><strong>Mixture:</strong> Particles are just mixed, no rearrangement of atoms, no significant energy change.</li>
                  <li><strong>Chemical Reaction:</strong> Atoms are rearranged to form new substances, significant energy change (exo/endo).</li>
                  <li><strong>Physical Change:</strong> State of matter changes (e.g., solid to liquid), but chemical identity doesn't. Energy change relates to intermolecular forces.</li>
              </ul>
          </AccordionContent></AccordionItem>
        </Accordion>
        <hr />
        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 2: ATOMIC MODELS (TIMELINE & ANALYSIS)</h3>
        <p><strong>3️⃣ Timeline + critique:</strong> Draw a timeline for atomic models (Dalton, Thomson, Rutherford, Bohr, Quantum). For each, add one limitation or one key piece of experimental evidence.</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hard-2-3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent>
              <ul className="list-disc pl-6 text-sm">
                  <li><strong>Dalton:</strong> Limitation - Didn't know about subatomic particles.</li>
                  <li><strong>Thomson:</strong> Evidence - Cathode ray experiments. Limitation - Didn't explain scattering results.</li>
                  <li><strong>Rutherford:</strong> Evidence - Gold foil experiment. Limitation - Didn't explain why electrons don't spiral into the nucleus.</li>
                  <li><strong>Bohr:</strong> Evidence - Explained atomic emission spectra. Limitation - Only worked well for hydrogen.</li>
                  <li><strong>Quantum:</strong> Describes electrons in probability clouds (orbitals).</li>
              </ul>
          </AccordionContent></AccordionItem>
        </Accordion>
        <hr />
        <h3 className="flex items-center gap-2"><Rows className="text-accent" />SECTION 3: SUBATOMIC PARTICLES (DEEP DIVE)</h3>
        <p><strong>4️⃣ Advanced table completion:</strong> Complete the table including location and role in bonding.</p>
        <Table><TableHeader><TableRow><TableHead>Particle</TableHead><TableHead>Charge</TableHead><TableHead>Mass</TableHead><TableHead>Location</TableHead><TableHead>Role in Bonding</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Proton</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow><TableRow><TableCell>Neutron</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow><TableRow><TableCell>Electron</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow></TableBody></Table>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hard-3-4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent>
              <Table><TableBody>
                  <TableRow><TableCell>Proton</TableCell><TableCell>+1</TableCell><TableCell>1</TableCell><TableCell>Nucleus</TableCell><TableCell>None</TableCell></TableRow>
                  <TableRow><TableCell>Neutron</TableCell><TableCell>0</TableCell><TableCell>1</TableCell><TableCell>Nucleus</TableCell><TableCell>None</TableCell></TableRow>
                  <TableRow><TableCell>Electron</TableCell><TableCell>-1</TableCell><TableCell>~0</TableCell><TableCell>Shells/Orbitals</TableCell><TableCell>Transferred/Shared</TableCell></TableRow>
              </TableBody></Table>
          </AccordionContent></AccordionItem>
        </Accordion>
        <hr />
        <h3 className="flex items-center gap-2"><Atom className="text-accent" />SECTION 5: ELECTRONIC STRUCTURE (APPLIED)</h3>
        <p><strong>6️⃣ Shell diagrams for bonding:</strong> Draw shell diagrams for Mg and Cl. Use an arrow to show the transfer of electrons to form MgCl₂.</p>
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hard-5-6"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent>
              <p className="text-sm">Your diagram should show the Mg atom giving away its 2 outer electrons, one to each of two Cl atoms. The result should be an Mg²⁺ ion and two Cl⁻ ions, all with full outer shells.</p>
          </AccordionContent></AccordionItem>
        </Accordion>
    </>
);

const Deck2EasyQuiz = () => (
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
                <TableRow><TableCell>Conducts when molten?</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Melting point</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
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
        <p className="mt-4"><strong>6️⃣ Draw particle diagrams</strong> for a simple covalent substance as a solid, liquid, and gas.</p>
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
        <p><strong>8️⃣ Draw and label:</strong> Create simple diagrams for diamond, graphite, graphene, and C₆₀ fullerene. Label key features like bonding and layers.</p>
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
        <p><strong>9️⃣ One-page redraw:</strong> Without notes, visually summarize the entire topic using diagrams, tables, and arrows. Compare with your notes and fill in gaps with a different color.</p>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can draw the connections and structures from memory, you've visually mastered the topic.</p>
        </div>
    </>
);

const Deck2HardQuiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: BIG-PICTURE DIAGRAMS</h3>
        <p><strong>1️⃣ Concept map challenge:</strong> Draw a concept map with ‘Bonding & Structure’ at the centre. Add branches to: Ionic, Covalent, Metallic, Polymers, Nanoparticles. On each branch, add one visual key fact (like lattice arrangement, delocalised electrons, chain structure, or size scale for nanoparticles). Extra challenge: Add arrows showing connections between bonding types and physical properties (e.g., melting point, conductivity).</p>
        <p className="mt-4"><strong>2️⃣ Comparison boxes (before vs after):</strong> Draw two pairs of boxes: Pair A (Ionic bonding) and Pair B (Covalent bonding). Label ‘Atoms before’ and ‘Atoms after’. Show electron transfer (dots and crosses) for ionic, electron sharing for covalent. Extra challenge: Indicate overall charge on ions for ionic bonding.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><LinkIcon className="text-accent" />SECTION 2: BONDING MODELS (advanced)</h3>
        <p><strong>3️⃣ Dot-and-cross diagrams:</strong> Draw diagrams for: H₂O, CH₄, NH₃, CO₂. Circle shared electron pairs. Add arrows showing lone pairs and bond angles (approximate values, e.g., H₂O 104.5°).</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Rows className="text-accent" />SECTION 3: PROPERTIES TABLE (ANALYSIS)</h3>
        <p><strong>4️⃣ Complete the table:</strong></p>
        <Table>
            <TableHeader><TableRow><TableHead>Property</TableHead><TableHead>Ionic (NaCl)</TableHead><TableHead>Covalent (H₂O)</TableHead><TableHead>Metallic (Fe)</TableHead><TableHead>Polymer (PVC)</TableHead><TableHead>Giant covalent (Diamond)</TableHead></TableRow></TableHeader>
            <TableBody>
                <TableRow><TableCell>Conducts electricity?</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Melting/boiling point</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Strength / hardness</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
                <TableRow><TableCell>Solubility in water</TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell><TableCell><Input /></TableCell></TableRow>
            </TableBody>
        </Table>
        <p>Extra challenge: Add arrows linking structure → property visually using sketches.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><CircleDashed className="text-accent" />SECTION 4: PARTICLE DIAGRAMS</h3>
        <p><strong>5️⃣ NaCl lattice diagram:</strong> Draw ions as circles, label Na⁺ and Cl⁻. Add arrows showing electrostatic forces. Extra challenge: Indicate 3D lattice layers with shading.</p>
        <p className="mt-4"><strong>6️⃣ Covalent substance diagrams (solid, liquid, gas):</strong> Draw particle diagrams showing: Strong covalent bonds inside molecules, Weak intermolecular forces between molecules. Add motion arrows for liquids and gases.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Disc className="text-accent" />SECTION 5: METALS & ALLOYS</h3>
        <p><strong>7️⃣ Metal vs alloy lattice:</strong> Draw pure metal layers (regular, neat). Draw alloy layers (distorted). Extra challenge: Add arrows to indicate how distorted layers prevent sliding → harder metal.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Atom className="text-accent" />SECTION 6: CARBON STRUCTURES</h3>
        <p><strong>8️⃣ Carbon allotropes diagrams:</strong> Draw diamond, graphite, graphene, C₆₀ fullerene. Label: bonding type, layers, electron delocalisation, strength, conductivity. Extra challenge: Add arrow showing use/application based on properties (e.g., diamond → cutting tools, graphite → electrodes).</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 7: SYNTHESIS & COMPARISON</h3>
        <p><strong>9️⃣ Compare bonding types visually:</strong> Draw a summary diagram/table showing: Ionic vs covalent vs metallic vs polymers. Include structure, bonding, electrons, key property. Use colour coding or symbols for easy visual comparison.</p>
        
        <hr/>
        <h3>FINAL VISUAL CHECK</h3>
        <p><strong>🔟 One-page redraw:</strong> Without notes, visually summarise the entire topic. Compare with notes and highlight missing info in a different colour.</p>
    </>
);

const Deck3EasyQuiz = () => (
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

const Deck3HardQuiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: DIAGRAMMING EQUATIONS & FORMULAS</h3>
        <p><strong>1️⃣ Balance & Conservation of Mass (visual check):</strong> Draw the reaction `Mg + 2HCl → MgCl₂ + H₂`. Use color-coded circles for Mg, H, Cl. Show clearly that each type of atom is equal on both sides. Extra challenge: Draw two molecules of HCl reacting separately and then combine the H₂ molecules visually.</p>
        <p className="mt-4"><strong>2️⃣ Relative Formula Mass (RFM):</strong> Draw CaCO₃ broken into atoms: Ca, C, O, O, O. Assign relative atomic mass (Ca = 40, C = 12, O = 16). Show step-by-step sum → RFM = 100. Extra challenge: Add visual fraction bars showing percentage contribution of each element to the total mass.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Sigma className="text-accent" />SECTION 2: VISUALIZING MOLES & LIMITING REACTANTS</h3>
        <p><strong>3️⃣ Moles as a "Box":</strong> Draw a large box labeled “1 mole”. Inside: 6.02 × 10²³ small circles. Extra challenge: Draw smaller boxes for 0.5 mole and 2 moles for comparison.</p>
        <p className="mt-4"><strong>4️⃣ Limiting Reactants (beaker diagrams):</strong> Draw "before" and "after" beakers for a reaction. Show product molecules, leftover excess reactant, and cross out the fully used limiting reactant. Extra challenge: Include particle ratios that match the balanced equation.</p>
        
        <hr/>
        <h3 className="flex items-center gap-2"><Thermometer className="text-accent" />SECTION 3: YIELD & CONCENTRATION VISUALS</h3>
        <p><strong>5️⃣ Percentage Yield Flowchart (advanced):</strong> Start with “Maximum/Theoretical Mass”. Add arrows pointing away labeled “Lost Product”, “By-products”. Remaining is “Actual Product”. Extra challenge: Include a calculation box: % Yield = (Actual / Theoretical) × 100.</p>
        <p className="mt-4"><strong>6️⃣ Concentration Flasks (comparison visual):</strong> Draw two identical flasks: one with few colored dots (low concentration), one with many (high concentration). Extra challenge: Add a label showing moles/volume numerically.</p>

        <hr/>
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 4: SYNTHESIS & CHECK</h3>
        <p><strong>7️⃣ One-page redraw challenge:</strong> Without notes, draw all the topics together visually: Balanced equations, RFM calculations, Mole visualizations, Limiting reactants, Percentage yield, Concentration. Use arrows, color coding, sketches. Compare with notes and highlight missing info in a different color.</p>
    </>
);


const Deck4EasyQuiz = () => (
    <>
        <h3>🟦 ROUND 1: REACTIVITY SERIES (DRAW & LABEL)</h3>
        <p>Draw a vertical ladder. Place these metals in the correct order (top → bottom): Copper, Magnesium, Potassium, Iron. Shade: 🔴 metals that react with water, 🟠 metals that react with acid only.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Order: Potassium (🔴), Magnesium (🟠), Iron (🟠), Copper (no shade). Potassium and Magnesium should be shaded for reacting with water (though Mg is slow), Iron with acid, and Copper with neither.</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟩 ROUND 2: DISPLACEMENT (ARROWS QUIZ)</h3>
        <p>Draw arrows to show what happens when: Zinc + Copper sulfate. Circle the metal that moves, cross out the metal that is displaced. Next to the diagram, write: “More reactive → ______ reactive”</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">An arrow should show Zinc going into the solution, and another arrow showing Copper coming out. Zinc is circled, Copper is crossed out. The phrase is "More reactive → less reactive".</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟨 ROUND 3: OXIDATION & REDUCTION (COLOUR CODE)</h3>
        <p>Draw two boxes: Box A: Metal + oxygen, Box B: Metal oxide. Use: 🔴 arrows for oxygen, 🔵 arrows for electrons. Label: Oxidation, Reduction.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">For oxidation: A red arrow (oxygen) points to the metal. A blue arrow (electrons) points away from the metal. For reduction: A red arrow points away from the metal oxide. A blue arrow points towards the metal ion.</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟥 ROUND 4: EXTRACTION FLOWCHART</h3>
        <p>Complete this flowchart in your book: Is the metal more reactive than carbon? YES → _________, NO → _________. Add: Aluminium → (which path?), Iron → (which path?)</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">YES → Electrolysis, NO → Reduction with carbon. Aluminium → Electrolysis. Iron → Reduction with carbon.</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟪 ROUND 5: ACIDS & SALTS (PICTURE EQUATIONS)</h3>
        <p>Draw three reaction maps using arrows and symbols: Acid + Metal → ?, Acid + Alkali → ?, Acid + Carbonate → ?. 👉 Draw bubbles for gases.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q5"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">1. → salt + hydrogen (H₂ bubble). 2. → salt + water. 3. → salt + water + carbon dioxide (CO₂ bubble).</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟧 ROUND 6: pH SCALE (COLOUR BAR)</h3>
        <p>Draw a long bar from 0 → 14. Colour: Red = acid, Green = neutral, Purple = alkali. Place: Stomach acid, Water, Sodium hydroxide.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q6"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Stomach acid should be in the red section (pH 1-2). Water in the green (pH 7). Sodium hydroxide in the purple (pH 13-14).</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟫 ROUND 7: ELECTROLYSIS DIRECTION TEST</h3>
        <p>Draw a cell with: Anode (+), Cathode (−). Draw arrows showing: Positive ions movement, Negative ions movement. Label: Reduction, Oxidation.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q7"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Positive ions move to the cathode (Reduction happens here). Negative ions move to the anode (Oxidation happens here).</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟨 ROUND 8: PRODUCTS AT ELECTRODES (MATCHING)</h3>
        <p>Draw two columns: Cathode (−) | Anode (+). Place: Hydrogen, Oxygen, Chlorine (Assume aqueous solution with halides).</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-q8"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Cathode (−): Hydrogen. Anode (+): Oxygen, Chlorine.</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🟥 ROUND 9: HALF-EQUATION BOXES (HT)</h3>
        <p>Draw two large boxes: Cathode, Anode. Fill in missing products and electrons for: 2H⁺ + 2e⁻ → ?, and 4OH⁻ → ?.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-h1"><AccordionTrigger>Check Answers</AccordionTrigger><AccordionContent><p className="text-sm">a) 2H⁺ + 2e⁻ → H₂<br />b) 4OH⁻ → O₂ + 2H₂O + 4e⁻</p></AccordionContent></AccordionItem>
        </Accordion>

        <hr />

        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close your notes. From memory, redraw ONE full page showing: Reactivity ladder, Extraction decision, Electrolysis diagram. If you can see the page in your head, you’re exam-ready.</p>
    </>
);

const Deck4HardQuiz = () => (
    <>
        <h3>🟦 ROUND 1: REACTIVITY SERIES (DRAW & LABEL)</h3>
        <p>Draw a vertical ladder. Place these metals top → bottom: Potassium, Magnesium, Iron, Copper. Shade: 🔴 metals that react with water, 🟠 metals that react with acids only, ⚪ metals that are unreactive. Extra challenge: Add arrows showing which metal displaces which from solutions. Include half-equations for the most reactive metal reacting with water.</p>
        <hr />
        <h3>🟩 ROUND 2: DISPLACEMENT (ARROWS QUIZ)</h3>
        <p>Draw Zinc + Copper sulfate reaction: Circle the metal that moves. Cross out the metal displaced. Write: “More reactive → _____ less reactive”. Extra challenge: Add electron transfer arrows for the displacement. Include products using color-coded ions.</p>
        <hr />
        <h3>🟨 ROUND 3: OXIDATION & REDUCTION (COLOUR CODE)</h3>
        <p>Draw Box A: Metal + Oxygen and Box B: Metal Oxide. Use: 🔴 arrows for oxygen, 🔵 arrows for electrons. Label: Oxidation, Reduction. Extra challenge: Include electron loss/gain numbers. Show which species is oxidised and which is reduced.</p>
        <hr />
        <h3>🟥 ROUND 4: EXTRACTION FLOWCHART (DECISION MAP)</h3>
        <p>Complete flowchart: Is the metal more reactive than carbon? YES → _________, NO → _________. Include Aluminium → which path?, Iron → which path?, Zinc → which path? Extra challenge: Add temperature/energy considerations. Include electrolytic vs carbon reduction visually.</p>
        <hr />
        <h3>🟪 ROUND 5: ACIDS & SALTS (PICTURE EQUATIONS)</h3>
        <p>Draw three reaction maps using arrows and symbols: Acid + Metal → ?, Acid + Alkali → ?, Acid + Carbonate → ?. Use bubbles for gases. Extra challenge: Include ionic species in solution (H⁺, OH⁻, CO₃²⁻). Add water molecule sketches for neutralisation.</p>
        <hr />
        <h3>🟧 ROUND 6: pH SCALE (COLOUR BAR)</h3>
        <p>Draw a long bar 0 → 14. Colour: Red = acid, Green = neutral, Purple = alkali. Place: Stomach acid, Water, Sodium hydroxide, Lemon juice, Ammonia. Extra challenge: Add small arrows showing H⁺/OH⁻ concentration trend. Include numbers for strong vs weak acids.</p>
        <hr />
        <h3>🟫 ROUND 7: ELECTROLYSIS DIRECTION TEST</h3>
        <p>Draw a cell with Anode (+) and Cathode (−). Draw arrows showing: positive ions → cathode, negative ions → anode. Label: Reduction at cathode, Oxidation at anode. Extra challenge: Include aqueous solution with halides. Show electron flow in external circuit.</p>
        <hr />
        <h3>🟨 ROUND 8: PRODUCTS AT ELECTRODES (MATCHING)</h3>
        <p>Draw two columns: Cathode (−) | Anode (+). Place: Hydrogen, Oxygen, Chlorine (aqueous solution with halides). Extra challenge: Include ionic formulas in solution. Add arrows showing which ions are discharged first.</p>
        <hr />
        <h3>🟥 ROUND 9: HALF-EQUATION BOXES (HIGHER TIER)</h3>
        <p>Draw two large boxes: Cathode, Anode. Fill in missing products and electrons for: 2H⁺ + 2e⁻ → ?, and 4OH⁻ → ?. Extra challenge: Include electron count and oxidation numbers. Add label: oxidation vs reduction.</p>
        <hr />
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close your notes. From memory, redraw ONE full page showing: Reactivity ladder, Extraction decision flowchart, Electrolysis cell & products. Extra challenge: Include oxidation numbers, electron movement, and pH markers. Colour code all processes for maximum recall.</p>
    </>
);

const Deck5EasyQuiz = () => (
    <>
        <h3>🟦 ROUND 1: EXOTHERMIC VS ENDOTHERMIC</h3>
        <p><strong>Task:</strong> Draw two boxes side by side.</p>
        <ul>
            <li><strong>Left box = Exothermic:</strong> Draw arrows going out (red) to surroundings, thermometer showing temperature ↑, and 1–2 examples inside.</li>
            <li><strong>Right box = Endothermic:</strong> Draw arrows going in (blue) from surroundings, thermometer showing temperature ↓, and 1–2 examples inside.</li>
        </ul>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-a1">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Exothermic Examples:</strong> Combustion, neutralisation.</li>
                        <li><strong>Endothermic Examples:</strong> Thermal decomposition, sports injury packs.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>🟩 ROUND 2: REACTION PROFILES</h3>
        <p><strong>Task:</strong> Draw two energy level diagrams.</p>
        <ul>
            <li><strong>Exothermic reaction:</strong> Reactants → peak → products (products lower). Colour the peak for activation energy.</li>
            <li><strong>Endothermic reaction:</strong> Same diagram but products higher than reactants.</li>
        </ul>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-a2">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                   <p className="text-sm">Ensure your diagrams correctly label reactants, products, activation energy, and show the overall energy change (ΔH) with an arrow pointing down for exothermic and up for endothermic.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>🟨 ROUND 3: BOND ENERGY (HT)</h3>
        <p><strong>Task:</strong> Make a simple diagram.</p>
        <ul>
            <li>Show bonds breaking → arrows in (blue, energy absorbed).</li>
            <li>Show bonds forming → arrows out (red, energy released).</li>
        </ul>
        <p className="mt-2">Use different arrow lengths to indicate exothermic vs endothermic reactions.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-a3">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                   <p className="text-sm">For an exothermic reaction, the red 'energy out' arrow should be longer than the blue 'energy in' arrow. For endothermic, the blue arrow should be longer.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <hr />

        <h3>🟥 ROUND 4: CELLS & BATTERIES</h3>
        <p><strong>Task:</strong> Draw labelled diagrams.</p>
        <ul>
            <li><strong>Simple cell:</strong> Two metals + electrolyte, arrow for electron flow.</li>
            <li><strong>Battery:</strong> 2–3 cells in series, show larger voltage.</li>
            <li><strong>Rechargeable vs non-rechargeable:</strong> Single direction arrow for non-rechargeable (➡️), circular arrows for rechargeable (🔄).</li>
        </ul>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-a4">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                   <p className="text-sm">Check that your simple cell shows electrons flowing from the more reactive to the less reactive metal. The battery diagram should show cells connected in a chain (+ to -).</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />
        
        <h3>🟪 ROUND 5: FUEL CELLS</h3>
        <p><strong>Task:</strong> Draw hydrogen fuel cell diagram.</p>
        <ul>
            <li>Show: Hydrogen enters → electrons flow → oxygen enters → water leaves.</li>
            <li>Use colours for hydrogen, oxygen, water.</li>
            <li>(HT only) Add half-equations in boxes at electrodes.</li>
        </ul>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-a5">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                   <p className="text-sm">Anode (HT): H₂ → 2H⁺ + 2e⁻. Cathode (HT): O₂ + 4H⁺ + 4e⁻ → 2H₂O. The overall reaction is 2H₂ + O₂ → 2H₂O.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </>
);

const Deck5HardQuiz = () => (
    <>
        <h3>🟦 ROUND 1: EXOTHERMIC VS ENDOTHERMIC (ANALYSIS)</h3>
        <p>Task: Draw two boxes. Left = Exothermic: Draw red arrows out, thermometer ↑, include examples. Extra challenge: Add energy released in kJ/mol numerically. Right = Endothermic: Draw blue arrows in, thermometer ↓, include examples. Extra challenge: Indicate energy absorbed numerically.</p>
        <hr/>
        <h3>🟩 ROUND 2: REACTION PROFILES (VISUAL COMPARISON)</h3>
        <p>Task: Draw two energy diagrams. Exothermic: products lower. Endothermic: products higher. Colour activation energy peak. Extra challenge: Label ΔH, add transition state notation, and indicate energy absorbed vs released with arrows.</p>
        <hr/>
        <h3>🟨 ROUND 3: BOND ENERGY (HIGHER TIER)</h3>
        <p>Task: Make a simple diagram. Show bonds breaking → blue arrows in. Show bonds forming → red arrows out. Use different arrow lengths. Extra challenge: Include ΔH calculation: Σ(bonds broken) − Σ(bonds formed). Draw a small energy bar chart.</p>
        <hr/>
        <h3>🟥 ROUND 4: CELLS & BATTERIES (ANALYSIS & SYNTHESIS)</h3>
        <p>Task: Draw labelled diagrams. Simple cell, Battery, Rechargeable vs non-rechargeable. Extra challenge: Add electrode reactions in boxes, label oxidation/reduction, show electron flow vs ion movement.</p>
        <hr/>
        <h3>🟪 ROUND 5: FUEL CELLS (HT / SYNTHESIS)</h3>
        <p>Task: Draw a hydrogen fuel cell. Show flows, use colours. Extra challenge (HT only): Include half-equations at electrodes (Anode: 2H₂ → 4H⁺ + 4e⁻, Cathode: O₂ + 4e⁻ + 4H⁺ → 2H₂O), draw electron and ion flow separately, add overall cell reaction arrow.</p>
        <hr/>
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close notes. Redraw ONE full page with: Exo/endo boxes, Reaction profiles, Bond energy arrows, Simple cell + battery, Hydrogen fuel cell. Extra challenge: Include ΔH, activation energy, electron flow, and half-equations. Use colour coding.</p>
    </>
);

const Deck6EasyQuiz = () => (
    <>
        <h3>🧪 SECTION 1: RATE OF REACTION (SEE IT)</h3>
        <p>Q1 📊 You see two curves on a graph (product formed vs time): Curve A is very steep at the start, Curve B has a gentle slope. Which reaction has the greater rate at the start?</p>
        <Accordion type="single" collapsible><AccordionItem value="q1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">A (Steeper gradient means a faster rate)</p></AccordionContent></AccordionItem></Accordion>

        <p className="mt-4">Q2 📈 A tangent is drawn to a curve at 5 seconds. What does the slope of this tangent represent?</p>
        <Accordion type="single" collapsible><AccordionItem value="q2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Rate of reaction at that moment</p></AccordionContent></AccordionItem></Accordion>
        
        <p className="mt-4">Q3 ⚖️ You see this formula in a box: RATE = QUANTITY ÷ TIME. Which unit matches a rate calculated using volume?</p>
        <Accordion type="single" collapsible><AccordionItem value="q3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">cm³/s</p></AccordionContent></AccordionItem></Accordion>

        <hr />

        <h3>💥 SECTION 2: COLLISION THEORY (PICTURE IT)</h3>
        <p>Q4 🔴 Picture particles: Spread far apart, small arrows, few collisions. Which condition is shown?</p>
        <Accordion type="single" collapsible><AccordionItem value="q4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Low temperature</p></AccordionContent></AccordionItem></Accordion>

        <p className="mt-4">Q5 🔵 You see two diagrams of solids: One big block vs. many small blocks. Which diagram shows a faster reaction?</p>
        <Accordion type="single" collapsible><AccordionItem value="q5"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Small blocks (larger surface area)</p></AccordionContent></AccordionItem></Accordion>

        <p className="mt-4">Q6 🔥 You see particles with: More arrows, faster movement, harder collisions. Which TWO things increase?</p>
        <Accordion type="single" collapsible><AccordionItem value="q6"><AccordionTrigger>Check Answers</AccordionTrigger><AccordionContent><p className="text-sm">Collision frequency & Collision energy</p></AccordionContent></AccordionItem></Accordion>

        <hr />

        <h3>✂️ SECTION 3: CATALYSTS (COMPARE THE PICTURES)</h3>
        <p>Q7 ⛰️ Two energy profile diagrams are shown: Diagram 1 has a tall peak, Diagram 2 has a shorter peak. Which shows a catalysed reaction?</p>
        <Accordion type="single" collapsible><AccordionItem value="q7"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Diagram 2 (lower activation energy)</p></AccordionContent></AccordionItem></Accordion>

        <p className="mt-4">Q8 🧠 Looking at the diagrams again, what stays the same in both reactions?</p>
        <Accordion type="single" collapsible><AccordionItem value="q8"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Energy change overall</p></AccordionContent></AccordionItem></Accordion>

        <hr />

        <h3>🔁 SECTION 4: REVERSIBLE REACTIONS & EQUILIBRIUM</h3>
        <p>Q9 🔄 You see this symbol: ⇌. What does it mean?</p>
        <Accordion type="single" collapsible><AccordionItem value="q9"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Reaction goes both ways</p></AccordionContent></AccordionItem></Accordion>

        <p className="mt-4">Q10 ⚖️ A balance diagram shows: Reactants ⚖️ Products (equal level). Which statement is correct?</p>
        <Accordion type="single" collapsible><AccordionItem value="q10"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Rates are equal</p></AccordionContent></AccordionItem></Accordion>
        
        <hr />

        <h3>🔥 SECTION 5: LE CHATELIER (FOLLOW THE ARROWS – HT)</h3>
        <p>Q11 🔥 You see this flow: Temperature ↑  ➡️  Endothermic direction. What happens to the amount of products at equilibrium?</p>
        <Accordion type="single" collapsible><AccordionItem value="q11"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The answer depends on which direction is endothermic. If the forward reaction is endothermic, the yield of products increases. If the reverse is endothermic, the yield of products decreases.</p></AccordionContent></AccordionItem></Accordion>
        
        <p className="mt-4">Q12 💨 You see a gaseous reaction: Left side (4 molecules), Right side (2 molecules). Pressure is increased ⬆️. Which side is favoured?</p>
        <Accordion type="single" collapsible><AccordionItem value="q12"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Right (fewer molecules)</p></AccordionContent></AccordionItem></Accordion>
        
        <p className="mt-4">Q13 🧪 You see extra reactant added to a system at equilibrium. Arrow points ➡️ towards products. Why?</p>
        <Accordion type="single" collapsible><AccordionItem value="q13"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">To use up added reactant (oppose the change)</p></AccordionContent></AccordionItem></Accordion>
    </>
);

const Deck6HardQuiz = () => (
    <>
        <h3>🧪 SECTION 1: RATE OF REACTION (SEE IT & THINK IT)</h3>
        <p><strong>Q1 📊 Graph analysis:</strong> You see two curves (product vs time): Curve A steep, Curve B gentle. Which reaction has the greater rate at the start? Extra challenge: Draw tangent lines at different times and compare instantaneous rates.</p>
        <p className="mt-4"><strong>Q2 📈 Tangent slope:</strong> A tangent is drawn at 5 s on a curve. What does the slope of this tangent represent? Extra challenge: Include units (e.g., cm³/s or mol/s) and draw arrows showing rate visually.</p>
        <p className="mt-4"><strong>Q3 ⚖️ Rate units:</strong> RATE = QUANTITY ÷ TIME. You measure volume in cm³. Which unit matches the rate? Extra challenge: Add a mini box showing conversions (cm³ → dm³) for thinking about units.</p>
        <hr />
        <h3>💥 SECTION 2: COLLISION THEORY (PICTURE IT & COMPARE)</h3>
        <p><strong>Q4 🔴 Particle spacing:</strong> Particles far apart, small arrows, few collisions. Which condition is shown? Extra challenge: Draw temperature or concentration labels and link to rate.</p>
        <p className="mt-4"><strong>Q5 🔵 Surface area:</strong> Two solids: 1 large block vs many small blocks. Which diagram shows a faster reaction? Extra challenge: Draw extra collisions arrows for small blocks.</p>
        <p className="mt-4"><strong>Q6 🔥 Particle movement:</strong> Particles: more arrows, faster movement, harder collisions. Which TWO things increase? (Collision frequency, Collision energy). Extra challenge: Draw activation energy diagram to link movement → successful collisions.</p>
        <hr />
        <h3>✂️ SECTION 3: CATALYSTS (COMPARE ENERGY PROFILES)</h3>
        <p><strong>Q7 ⛰️ Energy peaks:</strong> Diagram 1: tall peak, Diagram 2: shorter peak. Which shows a catalysed reaction? Extra challenge: Draw labelled Ea arrows for both diagrams.</p>
        <p className="mt-4"><strong>Q8 🧠 Constant factors:</strong> Looking at the diagrams again, what stays the same? (Reactants → products energy change, ΔH). Extra challenge: Add color-coded arrows for energy in/out.</p>
        <hr />
        <h3>🔁 SECTION 4: REVERSIBLE REACTIONS & EQUILIBRIUM</h3>
        <p><strong>Q9 🔄 Equilibrium symbol:</strong> What does ⇌ mean? Extra challenge: Draw double arrows with rates (forward = backward) showing dynamic equilibrium.</p>
        <p className="mt-4"><strong>Q10 ⚖️ Balance diagram:</strong> Reactants ⚖️ Products (equal level). Which statement is correct? Extra challenge: Draw tangible particle diagram with equal numbers on both sides.</p>
        <hr />
        <h3>🔥 SECTION 5: LE CHATELIER (FOLLOW THE ARROWS — HT)</h3>
        <p><strong>Q11 🔥 Temperature change:</strong> Temperature ↑ ➡️ Endothermic direction. What happens to product amount at equilibrium? Extra challenge: Draw ΔH arrows, colour-coded, showing energy absorbed vs released.</p>
        <p className="mt-4"><strong>Q12 💨 Pressure change:</strong> Reaction: Left = 4 molecules, Right = 2 molecules. Pressure ↑. Which side is favoured? Extra challenge: Draw molecule arrows shrinking volume, link to Le Chatelier.</p>
        <p className="mt-4"><strong>Q13 🧪 Concentration change:</strong> Extra reactant added → arrow points ➡️ products. Why? Extra challenge: Include particle diagrams showing shift in equilibrium visually.</p>
        <hr />
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close notes. From memory, redraw ONE full page: Graphs with tangent slopes, Particle diagrams, Catalysed vs uncatalysed energy profiles, Equilibrium particle diagrams, Le Chatelier’s shifts. Extra challenge: Add color-coded arrows for energy, collision frequency, direction of shift.</p>
    </>
);

const Deck7EasyQuiz = () => (
    <>
        <h3>🛢️ ROUND 1: ALKANES</h3>
        <p>Q1: Draw four boxes in a row. In each box, write: CH₄, C₂H₆, C₃H₈, C₄H₁₀. 👉 Circle the pattern you see in the formulae.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The pattern is CnH₂n+₂. Each step adds CH₂.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q2: Under your boxes, draw arrows: ↑ under boiling point, ↓ under flammability. 👉 Which direction do the arrows go as the chain gets longer?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Boiling point arrow goes UP (↑). Flammability arrow goes DOWN (↓).</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🧪 ROUND 2: FRACTIONAL DISTILLATION</h3>
        <p>Q3: Draw a tall rectangle. Colour-code or label: Bottom = HOT, Top = COOL. 👉 Draw small circles at the top and large circles at the bottom. What do the circles represent?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The circles represent hydrocarbon molecules. Small circles = small molecules, Large circles = large molecules.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q4: Next to the bottom circles write: High BP or Low BP? (Circle one)</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">High BP should be circled.</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🔥 ROUND 3: COMBUSTION</h3>
        <p>Q5: Draw: Hydrocarbon + O₂ → ? 👉 Add two product boxes only.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q5"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The two product boxes should be CO₂ (Carbon Dioxide) and H₂O (Water).</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q6: Draw two flames: One clean, One smoky. 👉 Label which one is complete combustion.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q6"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The clean flame should be labeled "complete combustion."</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🪓 ROUND 4: CRACKING</h3>
        <p>Q7: Draw a long zig-zag chain. Now split it into two shorter chains. 👉 Add one double line (=) to one chain. What type of hydrocarbon is this?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q7"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">An alkene.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q8: Draw a box labelled Br₂ (orange). Draw an arrow to a clear box. 👉 What test is this showing?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q8"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The test for an alkene (unsaturated hydrocarbon) using bromine water.</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>➕ ROUND 5: ALKENES</h3>
        <p>Q9: Draw: C = C. Then draw arrows across the bond and add atoms. 👉 What type of reaction is this?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q9"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">An addition reaction.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q10: Write: CnH₂n. 👉 Circle the letter that shows alkenes are unsaturated.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q10"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The general formula itself (CnH₂n vs CnH₂n+₂) indicates it is unsaturated, but the double bond is the key feature. Visually, you'd circle the C=C in a structural formula.</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🍺 ROUND 6: ALCOHOLS</h3>
        <p>Q11: Draw: —OH. 👉 Circle the functional group.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q11"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The —OH group should be circled. It is the hydroxyl group.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q12: Draw four small boxes: Burn 🔥, Sodium ⚡, Water 💧, Oxidation 🧪. 👉 These boxes represent what?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q12"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The main reactions of alcohols.</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🍋 ROUND 7: CARBOXYLIC ACIDS</h3>
        <p>Q13: Draw: —COOH. 👉 Label it.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q13"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">This is the carboxyl functional group.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q14: Draw: Acid + Carbonate → Salt + ? + ?. 👉 Fill in the two missing products.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q14"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Water (H₂O) and Carbon Dioxide (CO₂).</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🧵 ROUND 8: POLYMERS</h3>
        <p>Q15: Draw repeating boxes linked together. Do NOT cross anything out. 👉 Name the polymerisation type.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q15"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Addition polymerisation.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q16 (HT): Draw repeating boxes again. This time cross out H₂O. 👉 Name this polymerisation.</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q16"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Condensation polymerisation.</p></AccordionContent></AccordionItem></Accordion>
        <hr/>
        <h3>🧬 ROUND 9: DNA & PROTEINS</h3>
        <p>Q17: Draw a twisted ladder. 👉 What molecule does this represent?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q17"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">DNA (Deoxyribonucleic acid).</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4">Q18: Draw small circles linked in a chain. Label one circle. 👉 What is the monomer called?</p>
        <Accordion type="single" collapsible><AccordionItem value="d7-q18"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Amino acid (for proteins) or nucleotide (for DNA).</p></AccordionContent></AccordionItem></Accordion>
    </>
);

const Deck7HardQuiz = () => (
    <>
        <h3>🛢️ ROUND 1: ALKANES (SEE THE PATTERNS)</h3>
        <p><strong>Q1: Formula patterns:</strong> Draw four boxes in a row: CH₄, C₂H₆, C₃H₈, C₄H₁₀. Circle pattern in number of C and H atoms. Extra challenge: Add general formula CₙH₂ₙ₊₂ below boxes.</p>
        <p className="mt-4"><strong>Q2: Property arrows:</strong> Draw arrows under boxes: ↑ under boiling point, ↓ under flammability. Extra challenge: Add small molecule sketches showing how intermolecular forces increase with chain length.</p>
        <hr/>
        <h3>🧪 ROUND 2: FRACTIONAL DISTILLATION</h3>
        <p><strong>Q3: Fractional column:</strong> Draw tall rectangle. Label: Bottom = HOT, Top = COOL. Draw small circles at top, large circles at bottom. Extra challenge: Label which fractions are gases, petrol, diesel, bitumen.</p>
        <p className="mt-4"><strong>Q4: Boiling points:</strong> Bottom circles: High BP or Low BP? (Circle one). Extra challenge: Draw arrows showing trend in chain length vs BP.</p>
        <hr/>
        <h3>🔥 ROUND 3: COMBUSTION</h3>
        <p><strong>Q5: Combustion products:</strong> Hydrocarbon + O₂ → ?. Draw two product boxes only (CO₂, H₂O). Extra challenge: Draw flames and heat release arrows.</p>
        <p className="mt-4"><strong>Q6: Flame types:</strong> Draw clean flame vs smoky flame. Label which is complete combustion. Extra challenge: Draw CO vs soot particles for incomplete combustion.</p>
        <hr/>
        <h3>🪓 ROUND 4: CRACKING</h3>
        <p><strong>Q7: Chain splitting:</strong> Draw long zig-zag chain → two shorter chains. Add double bond (=) to one chain. Label alkene and alkane. Extra challenge: Add reaction condition (catalyst, heat).</p>
        <p className="mt-4"><strong>Q8: Bromine test:</strong> Draw box Br₂ (orange) → arrow → clear solution. Label unsaturated test. Extra challenge: Draw reaction across C=C.</p>
        <hr/>
        <h3>➕ ROUND 5: ALKENES</h3>
        <p><strong>Q9: Addition reaction:</strong> Draw C=C, arrows across bond, add atoms. Label type of reaction. Extra challenge: Include halogenation, hydrogenation, hydration examples.</p>
        <p className="mt-4"><strong>Q10: General formula:</strong> Write CₙH₂ₙ. Circle letter showing unsaturation. Extra challenge: Draw small molecule showing double bond → saturated product.</p>
        <hr/>
        <h3>🍺 ROUND 6: ALCOHOLS</h3>
        <p><strong>Q11: Functional group:</strong> Draw —OH, circle it. Extra challenge: Draw methanol vs ethanol structure.</p>
        <p className="mt-4"><strong>Q12: Properties boxes:</strong> Draw four boxes: Burn 🔥, Sodium ⚡, Water 💧, Oxidation 🧪. Label physical & chemical properties of alcohols. Extra challenge: Draw reaction arrows for each property.</p>
        <hr/>
        <h3>🍋 ROUND 7: CARBOXYLIC ACIDS</h3>
        <p><strong>Q13: Functional group:</strong> Draw —COOH, label it. Extra challenge: Include hydrogen bonding arrow to water.</p>
        <p className="mt-4"><strong>Q14: Acid + carbonate:</strong> Draw: Acid + Carbonate → Salt + ? + ?. Fill in CO₂ + H₂O. Extra challenge: Draw bubbling gas arrows.</p>
        <hr/>
        <h3>🧵 ROUND 8: POLYMERS</h3>
        <p><strong>Q15: Addition polymerisation:</strong> Draw repeating boxes linked together. Name polymerisation type. Extra challenge: Draw monomer structure and reaction arrows.</p>
        <p className="mt-4"><strong>Q16 (HT): Condensation polymerisation:</strong> Draw repeating boxes, cross out H₂O. Name polymerisation type. Extra challenge: Label functional groups lost.</p>
        <hr/>
        <h3>🧬 ROUND 9: DNA & PROTEINS</h3>
        <p><strong>Q17: DNA structure:</strong> Draw twisted ladder. Label molecule (DNA). Extra challenge: Add base pairs with hydrogen bonds.</p>
        <p className="mt-4"><strong>Q18: Protein monomer:</strong> Draw small circles linked in a chain, label one. Name amino acid. Extra challenge: Draw peptide bond and R group.</p>
        <hr/>
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close notes. From memory, redraw ONE full page including: Alkanes + boiling point trends, Fractional distillation column, Combustion and flame types, Cracking + bromine test, Alkenes, alcohols, carboxylic acids, Polymers (addition & condensation), DNA & protein sketches. Extra challenge: Colour-code functional groups, bonds, reactions, and energy arrows.</p>
    </>
);

const Deck8EasyQuiz = () => (
    <>
        <h3>ROUND 1: PURE OR MIXTURE?</h3>
        <p className="mt-2"><strong>Q1:</strong> Which is pure: Ice (❄️💧) or Chocolate with nuts (🍫🥜)?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Ice (Pure)</p></AccordionContent></AccordionItem></Accordion>
        <h3>ROUND 2: FORMULATIONS</h3>
        <p className="mt-4"><strong>Q2:</strong> A medicine pill (💊) contains an active ingredient, a filler, and a flavour. Is it a formulation or a pure substance?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Formulation</p></AccordionContent></AccordionItem></Accordion>
        <h3>ROUND 3: CHROMATOGRAPHY</h3>
        <p className="mt-4"><strong>Q3:</strong> Which represents a pure substance on a chromatogram: a single spot or multiple spots?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">A single spot</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>Q4:</strong> If a substance moves 4 cm and the solvent moves 8 cm, what is the Rf value?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Rf = 4 cm / 8 cm = 0.5</p></AccordionContent></AccordionItem></Accordion>
        <h3>ROUND 4: GAS TESTS</h3>
        <p className="mt-4"><strong>Q5:</strong> A burning splint makes a 'pop' sound. Which gas is it?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q5"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Hydrogen (H₂)</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>Q6:</strong> A glowing splint relights. Which gas is it?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q6"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Oxygen (O₂)</p></AccordionContent></AccordionItem></Accordion>
        <h3>ROUND 5: ION TESTS</h3>
        <p className="mt-4"><strong>Q7:</strong> Match the flame colour to the metal: Crimson, Yellow, Lilac, Green.</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q7"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Crimson → Lithium (Li⁺), Yellow → Sodium (Na⁺), Lilac → Potassium (K⁺), Green → Copper (Cu²⁺)</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>Q8:</strong> Match the precipitate colour to the metal ion: White, Blue, Green, Brown.</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q8"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">White → Al³⁺, Ca²⁺, or Mg²⁺; Blue → Cu²⁺; Green → Fe²⁺; Brown → Fe³⁺</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>Q9:</strong> Bubbles form when acid is added. Which ion is likely present?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q9"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Carbonate (CO₃²⁻)</p></AccordionContent></AccordionItem></Accordion>
        <h3>ROUND 6: SPECTROSCOPY</h3>
        <p className="mt-4"><strong>Q10:</strong> A flame emission spectrum shows a strong yellow line. Which metal is present?</p>
        <Accordion type="single" collapsible><AccordionItem value="d8-q10"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Sodium (Na⁺)</p></AccordionContent></AccordionItem></Accordion>
    </>
);

const Deck8HardQuiz = () => (
    <>
        <h3>🧊 ROUND 1: PURE OR MIXTURE? (SEE & THINK)</h3>
        <p><strong>Q1:</strong> Draw Ice (❄️💧) and Chocolate with nuts (🍫🥜). Label pure substance vs mixture. Extra challenge: Show particle diagram: Ice: identical water molecules, Chocolate with nuts: different molecules.</p>
        <h3>💊 ROUND 2: FORMULATIONS</h3>
        <p><strong>Q2:</strong> Draw pill with active ingredient, filler, flavour. Label: formulation or pure substance. Extra challenge: Draw small arrows showing each component contributing to function.</p>
        <h3>🖊️ ROUND 3: CHROMATOGRAPHY</h3>
        <p><strong>Q3:</strong> Draw chromatogram with one spot vs multiple spots. Which shows a pure substance?</p>
        <p className="mt-2"><strong>Q4:</strong> Draw substance travel = 4 cm, solvent travel = 8 cm. Show Rf calculation. Extra challenge: Label Rf range and interpretation.</p>
        <h3>🔥 ROUND 4: GAS TESTS</h3>
        <p><strong>Q5:</strong> Draw burning splint → pop. Label hydrogen gas.</p>
        <p className="mt-2"><strong>Q6:</strong> Draw glowing splint → relights. Label oxygen gas. Extra challenge: Add small diagram showing gas bubbles in test tube.</p>
        <h3>🧪 ROUND 5: ION TESTS</h3>
        <p><strong>Q7: Flame test:</strong> Draw flame + sample. Match Crimson → Li⁺, Yellow → Na⁺, Lilac → K⁺, Green → Cu²⁺.</p>
        <p className="mt-2"><strong>Q8: Precipitate colours:</strong> Draw test tube + solution. Match White → Ag⁺, Blue → Cu²⁺, Green → Fe²⁺, Brown → Fe³⁺.</p>
        <p className="mt-2"><strong>Q9: Carbonate test:</strong> Draw acid + solution → bubbles. Label CO₃²⁻ ion. Extra challenge: Add visual arrow showing CO₂ escape.</p>
        <h3>📊 ROUND 6: SPECTROSCOPY</h3>
        <p><strong>Q10:</strong> Draw flame emission spectrum with strong yellow line. Label metal present: Sodium. Extra challenge: Add mini comparison spectra (Na⁺ vs K⁺) to show how lines differ.</p>
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close notes. From memory, redraw ONE full page including: Pure vs mixture particle diagrams, Formulation pill diagram, Chromatogram with Rf calculation, Gas test setups, Flame and precipitate tests, Flame emission spectrum. Extra challenge: Use arrows, colours, and labels to link observations → conclusions.</p>
    </>
);

const Deck9EasyQuiz = () => (
    <>
        <h3>🌍 ROUND 1: ATMOSPHERE COMPOSITION & EVOLUTION</h3>
        <p><strong>1️⃣ Gas Proportions:</strong> Draw a pie chart of the Earth’s current atmosphere. Question: Label nitrogen, oxygen, and other gases in the correct proportions.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q1"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The chart should show ~80% Nitrogen, ~20% Oxygen, and a small slice for other gases.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>2️⃣ Early Atmosphere:</strong> Draw a timeline from 4.6 billion years ago to the formation of oceans. Question: Include volcanoes, CO₂, N₂, CH₄, NH₃, and the oceans.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q2"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Timeline should show early volcanic eruptions releasing gases, leading to a CO₂-rich atmosphere, followed by oceans forming and dissolving CO₂.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>3️⃣ Oxygen Rise:</strong> Make a flow diagram of photosynthesis. Question: Show how algae and plants increased O₂ in the atmosphere over time.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q3"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Diagram should show Algae/Plants taking in CO₂ and H₂O with sunlight, and releasing O₂.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>4️⃣ Carbon Dioxide Reduction:</strong> Draw a diagram of carbon sinks. Question: Include CO₂ moving from air → plants → limestone, coal, oil, natural gas.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q4"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Your diagram should visually represent the trapping of atmospheric CO₂ in various long-term stores.</p></AccordionContent></AccordionItem></Accordion>
        <hr />
        <h3>🌡️ ROUND 2: CLIMATE CHANGE & POLLUTANTS</h3>
        <p><strong>5️⃣ Greenhouse Effect:</strong> Draw a schematic showing the Earth, Sun, and greenhouse gases. Question: Show which gases trap heat and which radiation escapes.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q5"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The diagram should show incoming solar radiation and outgoing infrared radiation, with gases like CO₂, CH₄, and H₂O trapping some of the outgoing heat.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>6️⃣ Human Contributions:</strong> Draw arrows from human activities to greenhouse gases. Question: Include cars, industry, agriculture, and the gases they produce (CO₂, CH₄).</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q6"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Ensure arrows correctly link sources to their primary emissions (e.g., Cars → CO₂, Agriculture → CH₄).</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>7️⃣ Climate Change Effects:</strong> Create a cause-effect diagram. Question: Include rising temperature → sea levels, extreme weather, habitat loss, crop failure.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q7"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">The diagram should clearly link the central cause (rising temp) to multiple distinct effects.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>8️⃣ Carbon Footprint:</strong> Draw a bar graph or icon chart comparing emissions of different activities. Question: Rank actions from highest to lowest carbon footprint.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q8"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">A correct ranking would generally show activities like flying and driving as high, and walking/cycling as very low.</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>9️⃣ Pollutants from Fuels:</strong> Make a table with icons for fuel → pollutants → effects. Question: Include coal, oil, and gas. Show which pollutants are produced and their impacts.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q9"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Coal: SO₂, Particulates. Oil: NOx, CO. Gas: CO₂. Effects should match (e.g., SO₂ → Acid Rain).</p></AccordionContent></AccordionItem></Accordion>
        <p className="mt-4"><strong>🔟 Effects of Pollutants:</strong> Draw a concept map connecting pollutants → affected systems → outcomes. Question: Include CO, SO₂, NOx, particulates, and their effects on humans, plants, water, and climate.</p>
        <Accordion type="single" collapsible><AccordionItem value="d9-q10"><AccordionTrigger>Check Answer</AccordionTrigger><AccordionContent><p className="text-sm">Map should link CO to poisoning, SO₂/NOx to acid rain, and particulates to global dimming/health issues.</p></AccordionContent></AccordionItem></Accordion>
    </>
);

const Deck9HardQuiz = () => (
    <>
        <h3>🌍 ROUND 1: ATMOSPHERE COMPOSITION & EVOLUTION</h3>
        <p><strong>1️⃣ Gas Proportions (Pie Chart):</strong> Draw a pie chart of modern atmosphere. Label N₂, O₂, Other gases, CO₂ with percentages. Extra challenge: Include CO₂ ~0.04% separately.</p>
        <p className="mt-2"><strong>2️⃣ Early Atmosphere (Timeline):</strong> Draw a timeline from 4.6B years ago. Include volcanoes → gases → oceans. Extra challenge: Draw arrows showing gas decrease and ocean formation.</p>
        <p className="mt-2"><strong>3️⃣ Oxygen Rise (Flow Diagram):</strong> Draw photosynthesis process. Show algae & plants → gradual O₂ increase. Extra challenge: Add arrows linking rising O₂ → ozone formation.</p>
        <p className="mt-2"><strong>4️⃣ Carbon Dioxide Reduction (Carbon Sinks):</strong> Draw CO₂ from air → plants → rocks, coal, oil, gas. Extra challenge: Include fossil fuel formation timeline.</p>
        <hr />
        <h3>🌡️ ROUND 2: CLIMATE CHANGE & POLLUTANTS</h3>
        <p><strong>5️⃣ Greenhouse Effect (Schematic):</strong> Draw Earth, Sun, atmosphere. Show radiation flows, trapped heat. Extra challenge: Colour-code CO₂, CH₄, N₂O, H₂O vapour.</p>
        <p className="mt-2"><strong>6️⃣ Human Contributions (Arrow Map):</strong> Draw cars, industry, agriculture → arrows → CO₂, CH₄, N₂O. Extra challenge: Add feedback loops like deforestation → more CO₂.</p>
        <p className="mt-2"><strong>7️⃣ Climate Change Effects (Cause-Effect Diagram):</strong> Draw rising temp → sea levels ↑, extreme weather, habitat loss, crop failure. Extra challenge: Include links between events.</p>
        <p className="mt-2"><strong>8️⃣ Carbon Footprint (Bar/Icons):</strong> Draw icons for activities, rank high → low footprint. Extra challenge: Use coloured bars or scale for quantitative comparison.</p>
        <p className="mt-2"><strong>9️⃣ Pollutants from Fuels (Table/Icons):</strong> Columns: Fuel → Pollutants → Effects. Include coal, oil, gas. Extra challenge: Include relative quantities of emissions visually.</p>
        <p className="mt-2"><strong>🔟 Effects of Pollutants (Concept Map):</strong> Draw pollutants → systems → outcomes. Include CO, SO₂, NOx, particulates. Extra challenge: Use colour-coded arrows for each system.</p>
        <hr />
        <h3>🏁 FINAL VISUAL MEMORY CHALLENGE</h3>
        <p>Close notes. Redraw ONE full page with: Atmospheres (pie+timeline), Oxygen rise + carbon sinks, Greenhouse effect + human contributions, Climate change effects, Pollutants concept map. Extra challenge: Colour-code everything for maximum recall.</p>
    </>
);




const VisualQuizView = ({ title, onBack, deckId, difficulty, isEmbedded = false }: VisualQuizViewProps) => {
    const [isDiagramsOpen, setIsDiagramsOpen] = React.useState(false);
    const [isPeriodicTableOpen, setIsPeriodicTableOpen] = React.useState(false);

    const diagrams = deckId === 'deck1' ? deck1Diagrams :
                     deckId === 'deck2' ? deck2Diagrams :
                     deckId === 'deck3' ? deck3Diagrams :
                     deckId === 'deck4' ? deck4Diagrams :
                     deckId === 'deck5' ? deck5Diagrams :
                     deckId === 'deck6' ? deck6Diagrams : 
                     deckId === 'deck7' ? deck7Diagrams : 
                     deckId === 'deck8' ? deck8Diagrams : 
                     deckId === 'deck9' ? deck9Diagrams : [];
    
    const renderQuizContent = () => {
        if (deckId === 'deck1') {
            return difficulty === 'hard' ? <Deck1HardQuiz /> : <Deck1EasyQuiz />;
        }
        if (deckId === 'deck2') {
            return difficulty === 'hard' ? <Deck2HardQuiz /> : <Deck2EasyQuiz />;
        }
        if (deckId === 'deck3') {
            return difficulty === 'hard' ? <Deck3HardQuiz /> : <Deck3EasyQuiz />;
        }
        if (deckId === 'deck4') {
            return difficulty === 'hard' ? <Deck4HardQuiz /> : <Deck4EasyQuiz />;
        }
        if (deckId === 'deck5') {
            return difficulty === 'hard' ? <Deck5HardQuiz /> : <Deck5EasyQuiz />;
        }
        if (deckId === 'deck6') {
            return difficulty === 'hard' ? <Deck6HardQuiz /> : <Deck6EasyQuiz />;
        }
        if (deckId === 'deck7') {
            return difficulty === 'hard' ? <Deck7HardQuiz /> : <Deck7EasyQuiz />;
        }
        if (deckId === 'deck8') {
            return difficulty === 'hard' ? <Deck8HardQuiz /> : <Deck8EasyQuiz />;
        }
        if (deckId === 'deck9') {
            return difficulty === 'hard' ? <Deck9HardQuiz /> : <Deck9EasyQuiz />;
        }
        return <p>No visual quiz available for this topic yet.</p>;
    }
    
    const quizSection = (
      <>
        <div className="p-4 bg-primary/10 rounded-lg text-center">
            <h3 className="font-bold text-primary">How to use this quiz</h3>
            <p className="text-sm">Draw, connect, and organize the information visually. Use pen and paper.</p>
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
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <Button variant="outline" onClick={() => setIsPeriodicTableOpen(true)}>
                    <BookImage className="mr-2 h-4 w-4" />
                    Periodic Table
                </Button>
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
            <PeriodicTableDialog
                isOpen={isPeriodicTableOpen}
                onClose={() => setIsPeriodicTableOpen(false)}
            />
        </div>
    );
};

export default VisualQuizView;



    

    