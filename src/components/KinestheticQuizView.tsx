
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Footprints, Brain, Hand, Move, PersonStanding, CheckCircle, Fingerprint, Map, ChevronsDown, Handshake } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type KinestheticQuizViewProps = {
    title: string;
    onBack: () => void;
};

const KinestheticQuizView = ({ title, onBack }: KinestheticQuizViewProps) => {
    
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
                        <Brain className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle className="text-3xl font-bold mt-2">KINESTHETIC QUIZ</CardTitle>
                        <CardDescription>Do this standing up. Say answers out loud and move!</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        
                        <h3 className="flex items-center gap-2"><Footprints className="text-accent" />ROUND 1: MOVE & SAY (Quick recall)</h3>
                        <p className="text-sm italic">Walk one step forward per answer.</p>
                        <ul>
                            <li>What are all substances made of?</li>
                            <li>What is an atom?</li>
                            <li>Where are elements shown?</li>
                            <li>How are compounds formed?</li>
                            <li>What always happens in a chemical reaction?</li>
                        </ul>
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                  <li>Atoms.</li>
                                  <li>The smallest part of an element that can exist.</li>
                                  <li>In the periodic table.</li>
                                  <li>From elements by chemical reactions.</li>
                                  <li>Formation of one or more new substances.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>


                        <hr />

                        <h3 className="flex items-center gap-2"><Hand className="text-accent"/>ROUND 2: BUILD IT</h3>
                        <p className="text-sm italic">Use coins or small objects.</p>
                        <ul>
                            <li>Build: an element, a compound, and a mixture.</li>
                            <li>Say what makes each different.</li>
                        </ul>
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-2">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li><strong>Element:</strong> Same objects (one type of atom).</li>
                                <li><strong>Compound:</strong> Different objects joined together (chemically combined).</li>
                                <li><strong>Mixture:</strong> Different objects in a loose pile (not chemically combined).</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                         <hr />
                        
                        <h3 className="flex items-center gap-2"><Move className="text-accent"/>ROUND 3: TRUE or FALSE (Body Signals)</h3>
                        <p className="text-sm italic">Thumbs 👍 = true | Thumbs 👎 = false. Correct false ones out loud.</p>
                        <ul>
                            <li>Mixtures are chemically combined.</li>
                            <li>Compounds can only be separated by chemical reactions.</li>
                            <li>Atoms have no overall electrical charge.</li>
                            <li>Electrons have a positive charge.</li>
                        </ul>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li>👎 False. Correct: "Mixtures are NOT chemically combined."</li>
                                <li>👍 True.</li>
                                <li>👍 True.</li>
                                <li>👎 False. Correct: "Electrons have a NEGATIVE charge."</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                         <hr />

                        <h3 className="flex items-center gap-2"><PersonStanding className="text-accent"/>ROUND 4: ACT IT OUT</h3>
                        <p className="text-sm italic">Act out each model and say one key feature.</p>
                        <ul>
                            <li>Plum pudding model</li>
                            <li>Nuclear model</li>
                            <li>Bohr model</li>
                        </ul>
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-4">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li><strong>Plum pudding:</strong> Ball of positive charge with negative electrons embedded.</li>
                                <li><strong>Nuclear model:</strong> Mass concentrated at the central, charged nucleus.</li>
                                <li><strong>Bohr model:</strong> Electrons orbit the nucleus at specific distances (shells).</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><Fingerprint className="text-accent"/>ROUND 5: CHARGE & MASS GAME</h3>
                        <p className="text-sm italic">Use your body to show the charge. Point to where most mass is.</p>
                         <ul>
                            <li>Proton charge</li>
                            <li>Neutron charge</li>
                            <li>Electron charge</li>
                            <li>Point to where most of the mass of an atom is.</li>
                        </ul>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-5">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li>Proton: +1 (e.g., right hand up).</li>
                                <li>Neutron: 0 (e.g., arms out).</li>
                                <li>Electron: -1 (e.g., left hand down).</li>
                                <li>Point to your center/core (representing the nucleus).</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                         <h3 className="flex items-center gap-2"><Map className="text-accent"/>ROUND 6: PERIODIC TABLE WALK</h3>
                        <p className="text-sm italic">Move to different areas of your room.</p>
                         <ul>
                            <li>Move to the "Metals area" → say where metals are found.</li>
                            <li>Move to the "Non-metals area" → say where non-metals are found.</li>
                        </ul>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-6">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li>Metals are found to the left and towards the bottom of the periodic table.</li>
                                <li>Non-metals are found towards the right and top of the periodic table.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><ChevronsDown className="text-accent"/>ROUND 7: GROUP ACTIONS</h3>
                        <p className="text-sm italic">Point DOWN and say the trend.</p>
                         <ul>
                            <li>Group 1 reactivity trend</li>
                            <li>Group 7 reactivity trend</li>
                            <li>Group 0 boiling point trend</li>
                        </ul>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-7">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 text-sm">
                                <li>Group 1 reactivity **increases** down the group.</li>
                                <li>Group 7 reactivity **decreases** down the group.</li>
                                <li>Group 0 boiling point **increases** down the group.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                         <h3 className="flex items-center gap-2"><Handshake className="text-accent"/>ROUND 8: DISPLACEMENT ROLE-PLAY</h3>
                        <p className="text-sm italic">Act out a more reactive halogen displacing a less reactive one. Say what happens.</p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-8">
                            <AccordionTrigger>Check Answer</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm">A more reactive halogen will take the place of a less reactive halogen in an aqueous solution of its salt. For example, chlorine will displace bromine from potassium bromide solution.</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><Brain className="text-accent"/>FINAL CHALLENGE: 60-SECOND BLURT</h3>
                        <p className="text-sm italic">Stand still. Without notes, explain everything you remember about the key topics for 60 seconds.</p>


                        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
                            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
                            <p>If you can do it, say it, and act it out from memory, then you've learned it kinesthetically.</p>
                        </div>
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default KinestheticQuizView;

    