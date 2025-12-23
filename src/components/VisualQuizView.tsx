
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, Eye, CheckCircle, Pencil, Rows, ChevronsRightLeft, Key, Atom, TestTube, Thermometer, Sigma } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type VisualQuizViewProps = {
    title: string;
    onBack: () => void;
};

const VisualQuizView = ({ title, onBack }: VisualQuizViewProps) => {
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
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                            <h3 className="font-bold text-primary">How to use this quiz</h3>
                            <p className="text-sm">Draw, connect, and organize the information visually. Use pen and paper.</p>
                        </div>

                        <hr />
                        
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
                                    <li><strong>Group 7:</strong> 7 outer electrons, reactivity decreases down group, can do displacement reactions.</li>
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
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default VisualQuizView;

    