
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, Eye, CheckCircle, Pencil, Rows, ChevronsRightLeft, Key } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';

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
                        
                        <h3 className="flex items-center gap-2"><Pencil className="text-accent" />SECTION 1: CONCEPT MAP</h3>
                        <p><strong>1. Flow diagram</strong>: Draw a flow diagram showing how elements form compounds. Include the words 'chemical reaction', 'new substances', and 'energy change'.</p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Check Answer</AccordionTrigger>
                            <AccordionContent>
                                <p className="font-semibold">Example flow diagram:</p>
                                <div className="text-center border p-4 rounded-md">
                                    <p>Elements</p>
                                    <p>↓ <span className="italic text-sm">(chemical reaction)</span></p>
                                    <p>Compound formed</p>
                                    <p>↓ <span className="italic text-sm">(energy change)</span></p>
                                    <p>New substance</p>
                                </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <hr />

                        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 2: SYMBOLS & REPRESENTATION</h3>
                        <p><strong>2. Matching</strong>: Draw lines to match each symbol to the correct word.</p>
                        <div className="flex justify-around text-2xl font-bold p-4">
                            <div>O</div>
                            <div>Na</div>
                        </div>
                        <div className="flex justify-around text-2xl p-4">
                            <div>oxygen</div>
                            <div>sodium</div>
                        </div>
                        <p><strong>3. Triangle link</strong>: Draw a triangle and label the corners: chemical symbol, element name, atom. Fill it in for Oxygen.</p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-2">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <p><strong>Matching:</strong> O should be connected to oxygen, and Na to sodium.</p>
                                <p><strong>Triangle:</strong> The corners should be 'O', 'oxygen', and 'atom'.</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><Rows className="text-accent" />SECTION 3: SPOT THE DIFFERENCE (TABLE)</h3>
                        <p><strong>4. Complete the table</strong>: Use short phrases, not sentences.</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Feature</TableHead>
                                    <TableHead>Element</TableHead>
                                    <TableHead>Compound</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Number of elements</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>How it is formed</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell>How it can be separated</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Representation</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                               <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Feature</TableHead>
                                            <TableHead>Element</TableHead>
                                            <TableHead>Compound</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Number of elements</TableCell>
                                            <TableCell>One</TableCell>
                                            <TableCell>Two or more</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>How it is formed</TableCell>
                                            <TableCell>N/A</TableCell>
                                            <TableCell>Chemical reaction</TableCell>
                                        </TableRow>
                                         <TableRow>
                                            <TableCell>How it can be separated</TableCell>
                                            <TableCell>Cannot be simplified</TableCell>
                                            <TableCell>Only by chemical reaction</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Representation</TableCell>
                                            <TableCell>Symbol</TableCell>
                                            <TableCell>Formula</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <hr />

                        <h3 className="flex items-center gap-2"><CheckCircle className="text-accent" />SECTION 4: TRUE / FALSE (VISUAL MARKING)</h3>
                        <p><strong>5. Colour code</strong>: Green ✔️ = true, Red ✖️ = false. Then correct the false ones underneath.</p>
                        <ul>
                            <li>All substances are made of atoms</li>
                            <li>Compounds contain one element</li>
                            <li>Chemical reactions form new substances</li>
                            <li>Compounds can be separated by physical processes</li>
                        </ul>
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-4">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul>
                                    <li><span className="text-green-500">✔️ True</span>: All substances are made of atoms</li>
                                    <li><span className="text-red-500">✖️ False</span>: Compounds contain **two or more** elements chemically combined.</li>
                                    <li><span className="text-green-500">✔️ True</span>: Chemical reactions form new substances</li>
                                    <li><span className="text-red-500">✖️ False</span>: Compounds can only be separated by **chemical reactions**.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />
                        
                        <h3 className="flex items-center gap-2"><Key className="text-accent" />SECTION 5: EXAM SKILLS CHECKLIST</h3>
                        <p><strong>6. Tick the boxes</strong>: Draw a checklist and tick what students should be able to do.</p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2"><Checkbox id="es1" /> <label htmlFor="es1">use names and symbols of elements</label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="es2" /> <label htmlFor="es2">name compounds from formulae</label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="es3" /> <label htmlFor="es3">write word equations</label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="es4" /> <label htmlFor="es4">write formulae and balanced chemical equations</label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="es5" /> <label htmlFor="es5">(HT only) write half equations and ionic equations</label></div>
                        </div>

                         <hr />

                        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 6: REDRAW FROM MEMORY (MOST IMPORTANT)</h3>
                        <p><strong>7. Memory diagram</strong>: Without looking at notes, draw the entire topic as one diagram. Use arrows, boxes, and colour. Then compare with notes and add missing parts in a different colour.</p>

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

