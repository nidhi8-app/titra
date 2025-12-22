
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Footprints, Flame, Brain, Hand, Pen, List, Check, AlarmClock, Move, PersonStanding } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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
                        <CardDescription>{title}</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                            <h3 className="font-bold text-primary">How to use this quiz</h3>
                            <p className="text-sm">Stand up, say answers out loud, and move/write/build for each question. The instructions are part of the quiz!</p>
                        </div>

                        <hr />

                        <h3 className="flex items-center gap-2"><Footprints className="text-accent" />ROUND 1: MOVE & SAY (Quick Recall)</h3>
                        <p className="text-sm italic">Walk one step forward for each answer.</p>
                        <ul>
                            <li>Say the sentence: “All substances are made of ____.”</li>
                            <li>Say the definition: “An atom is ______________________________.”</li>
                            <li>Point to something in the room and say: “Atoms of each element are represented by a __________ ________.”</li>
                            <li>Say: “There are about ______ different elements.”</li>
                            <li>Say where elements are shown: “Elements are shown in the __________ __________.”</li>
                        </ul>

                        <hr />

                        <h3 className="flex items-center gap-2"><Hand className="text-accent"/>ROUND 2: BUILD IT (Hands-on)</h3>
                        <p className="text-sm italic">Use coins, paper, or small objects.</p>
                        <ul>
                            <li>Use one object and say what it represents.</li>
                            <li>Join two different objects together and say: What is this called? What is it formed from?</li>
                            <li>Pull them apart and say: “Compounds can only be separated into elements by __________ __________.”</li>
                        </ul>

                         <hr />
                        
                        <h3 className="flex items-center gap-2"><Move className="text-accent"/>ROUND 3: TRUE or FALSE (Stand & Gesture)</h3>
                        <p className="text-sm italic">Thumbs 👍 = true | Thumbs 👎 = false. Say the corrected sentence if false.</p>
                        <ul>
                            <li>Chemical reactions always involve the formation of one or more new substances.</li>
                            <li>Compounds contain only one element.</li>
                            <li>Chemical reactions often involve a detectable energy change.</li>
                            <li>Compounds can be separated into elements by physical processes.</li>
                        </ul>

                         <hr />

                        <h3 className="flex items-center gap-2"><Pen className="text-accent"/>ROUND 4: WRITE & ERASE (Active Recall)</h3>
                        <p className="text-sm italic">Write, then cover your work.</p>
                        <ul>
                            <li>Write the chemical symbols for: Oxygen, Sodium</li>
                            <li>Write one sentence explaining what a compound contains.</li>
                            <li>Write two ways chemical reactions can be represented.</li>
                        </ul>
                        
                         <hr />

                        <h3 className="flex items-center gap-2"><PersonStanding className="text-accent"/>ROUND 5: WALK & LIST (Exam Skills)</h3>
                        <p className="text-sm italic">Walk while answering out loud.</p>
                        <ul>
                            <li>List what students will be supplied with in the exam.</li>
                            <li>Say four things students should be able to do in the exam.</li>
                        </ul>

                        <hr />

                        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
                            <h4 className="font-bold flex items-center gap-2"><Check />Self-check rule</h4>
                            <p>If you can: say it without looking, explain it while moving, and write it from memory, then 👉 <strong>you know it.</strong></p>
                        </div>
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default KinestheticQuizView;
