
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, BookOpen, CheckCircle, List, Pen, Microscope, TestTube, ChevronsRightLeft, Key, MessageCircle, FileText } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

type ReadingWritingQuizViewProps = {
    title: string;
    onBack: () => void;
};

const ReadingWritingQuizView = ({ title, onBack }: ReadingWritingQuizViewProps) => {
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
                        <BookOpen className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle className="text-3xl font-bold mt-2">READING & WRITING QUIZ</CardTitle>
                        <CardDescription>{title}</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                            <h3 className="font-bold text-primary">How to use this quiz</h3>
                            <p className="text-sm">Write your answers in full sentences. Focus on clarity and detail.</p>
                        </div>

                        <hr />

                        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 1: DEFINITIONS (Written Recall)</h3>
                        <p>Write the definition of an atom.</p>
                        <Textarea placeholder="An atom is..." />
                        <p className="mt-4">Write one sentence explaining what an element is.</p>
                        <Textarea placeholder="An element is..." />
                        <p className="mt-4">Write one sentence explaining what a compound is.</p>
                        <Textarea placeholder="A compound is..." />
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li><strong>Atom:</strong> The smallest part of an element that can exist.</li>
                                    <li><strong>Element:</strong> A substance made of only one type of atom.</li>
                                    <li><strong>Compound:</strong> A substance containing two or more elements chemically combined in fixed proportions.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <hr />

                        <h3 className="flex items-center gap-2"><Pen className="text-accent" />SECTION 2: KEY FACTS (Short Answer)</h3>
                        <p>What are atoms of each element represented by?</p>
                        <Textarea />
                        <p className="mt-4">Give two examples of chemical symbols and name the elements they represent.</p>
                        <Textarea />
                        <p className="mt-4">Approximately how many different elements are there?</p>
                        <Textarea />
                        <p className="mt-4">Where are elements shown?</p>
                        <Textarea />
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-2">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>A chemical symbol.</li>
                                    <li>e.g., O (Oxygen), Na (Sodium).</li>
                                    <li>About 100.</li>
                                    <li>In the periodic table.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><TestTube className="text-accent" />SECTION 3: COMPOUNDS & REACTIONS (Extended Writing)</h3>
                        <p>Describe how compounds are formed. (Write 2–3 sentences.)</p>
                        <Textarea />
                        <p className="mt-4">What always happens during a chemical reaction? Include both what is formed and what often occurs.</p>
                        <Textarea />
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Compounds are formed from elements by chemical reactions. During these reactions, atoms are rearranged to form new substances.</li>
                                    <li>A chemical reaction always involves the formation of one or more new substances. It also often involves a detectable energy change.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <hr />

                        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 4: EXPLAINING PROCESSES</h3>
                        <p>Explain why compounds can only be separated into elements by chemical reactions.</p>
                        <Textarea />
                        <p className="mt-4">Explain the difference between a word equation and an equation using symbols and formulae.</p>
                        <Textarea />
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-4">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>The elements in a compound are chemically combined, meaning strong bonds hold the atoms together. These bonds can only be broken by a chemical reaction, which requires energy.</li>
                                    <li>A word equation shows the names of the reactants and products. A symbol/formula equation uses chemical symbols and formulae to represent the substances and shows the number of atoms of each element.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />
                        
                        <h3 className="flex items-center gap-2"><Key className="text-accent" />SECTION 5: REPRESENTATION & SYMBOLS</h3>
                        <p>Explain how formulae represent compounds.</p>
                        <Textarea />
                        <p className="mt-4">Explain what is meant by 'fixed proportions'.</p>
                        <Textarea />
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-5">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Formulae use the chemical symbols of the elements and subscript numbers to show the ratio of atoms of each element in the compound.</li>
                                    <li>'Fixed proportions' means that the ratio of elements in a specific compound is always the same. For example, water (H₂O) always has two hydrogen atoms for every one oxygen atom.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><List className="text-accent" />SECTION 6: EXAM SKILLS (LIST FORMAT)</h3>
                        <p>List four things students should be able to do in the exam.</p>
                        <Textarea />
                        <p className="mt-4">State what students will be supplied with in the exam.</p>
                        <Textarea />
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-6">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>e.g., Use names and symbols; name compounds from formulae; write word equations; write balanced chemical equations.</li>
                                    <li>A periodic table.</li>
                                </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <hr />

                        <h3 className="flex items-center gap-2"><Microscope className="text-accent" />SECTION 7: HIGHER TIER (If applicable)</h3>
                        <p>State two additional types of equations that HT students should be able to write.</p>
                        <Textarea />
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-7">
                            <AccordionTrigger>Check Answers</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm">Balanced half equations and ionic equations.</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                         <hr />

                        <h3 className="flex items-center gap-2"><FileText className="text-accent" />FINAL WRITTEN CHECK</h3>
                        <p>Write one clear paragraph that includes the following words: atom, element, compound, chemical reaction, formula, periodic table.</p>
                        <Textarea />
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-8">
                            <AccordionTrigger>Check Answer</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm italic">Example answer: "Every **element** in the **periodic table** is made up of a specific type of **atom**. When elements undergo a **chemical reaction**, they can form a new substance called a **compound**. Each **compound** has a unique **formula** that shows the fixed ratio of atoms that have bonded together."</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
                            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
                            <p>If you can write it clearly and accurately from memory, you've mastered the concept. This is the key to success for a reading/writing learner.</p>
                        </div>
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default ReadingWritingQuizView;

    