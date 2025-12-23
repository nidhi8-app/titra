
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Brain, BookOpen, CheckCircle, FileText, Key, List, Microscope, Pen, TestTube, ChevronsRightLeft, LinkIcon, Thermometer } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type ReadingWritingQuizViewProps = {
    title: string;
    onBack: () => void;
    deckId: string;
};

const Deck1Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 1: DEFINITIONS (1–2 marks each)</h3>
        <p>Define an atom.</p>
        <Textarea placeholder="An atom is..." />
        <p className="mt-4">Define an element.</p>
        <Textarea placeholder="An element is..." />
        <p className="mt-4">Define a compound.</p>
        <Textarea placeholder="A compound is..." />
        <p className="mt-4">Define a mixture.</p>
        <Textarea placeholder="A mixture is..." />
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li><strong>Atom:</strong> The smallest part of an element that can exist.</li>
                    <li><strong>Element:</strong> A substance made of only one type of atom.</li>
                    <li><strong>Compound:</strong> A substance containing two or more elements chemically combined in fixed proportions.</li>
                    <li><strong>Mixture:</strong> Two or more elements or compounds not chemically combined, where chemical properties are unchanged.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />

        <h3 className="flex items-center gap-2"><Pen className="text-accent" />SECTION 2: SHORT ANSWER</h3>
        <p>How are atoms of each element represented?</p>
        <Textarea />
        <p className="mt-4">Approximately how many elements are there?</p>
        <Textarea />
        <p className="mt-4">Where are elements shown?</p>
        <Textarea />
        <p className="mt-4">What always happens during a chemical reaction?</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>By a chemical symbol (e.g., O for Oxygen).</li>
                    <li>About 100.</li>
                    <li>In the periodic table.</li>
                    <li>One or more new substances are formed.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><TestTube className="text-accent" />SECTION 3: COMPOUNDS vs MIXTURES</h3>
        <p>State two differences between a compound and a mixture.</p>
        <Textarea />
        <p className="mt-4">Name three physical processes used to separate mixtures.</p>
        <Textarea />
        <p className="mt-4">Why do physical separation processes not produce new substances?</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>1. In a compound, elements are chemically combined in fixed proportions; in a mixture, they are not. 2. A compound can only be separated by chemical reactions; a mixture can be separated by physical processes.</li>
                    <li>Filtration, crystallisation, distillation, chromatography.</li>
                    <li>Because they do not involve chemical reactions.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />

        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 4: DEVELOPMENT OF THE ATOM (4–6 marks)</h3>
        <p>Describe how the model of the atom changed from the plum pudding model to the nuclear model.</p>
        <Textarea />
        <p className="mt-4">Explain the contribution of Niels Bohr to the nuclear model.</p>
        <Textarea />
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>The plum pudding model suggested a ball of positive charge with electrons embedded in it. The alpha particle scattering experiment showed that the mass was concentrated in a central, charged nucleus, leading to the nuclear model.</li>
                    <li>Niels Bohr adapted the nuclear model by suggesting that electrons orbit the nucleus at specific, fixed distances (energy levels or shells), which agreed with experimental observations.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><Key className="text-accent" />SECTION 5: SUBATOMIC PARTICLES</h3>
        <p>Complete the table:</p>
        <Table>
            <TableHeader><TableRow><TableHead>Particle</TableHead><TableHead>Charge</TableHead><TableHead>Relative mass</TableHead></TableRow></TableHeader>
            <TableBody>
                <TableRow><TableCell>Proton</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Neutron</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Electron</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
            </TableBody>
        </Table>
        <p className="mt-4">Explain why atoms have no overall electrical charge.</p>
        <Textarea />
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-5">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <Table>
                    <TableBody>
                        <TableRow><TableCell>Proton</TableCell><TableCell>+1</TableCell><TableCell>1</TableCell></TableRow>
                        <TableRow><TableCell>Neutron</TableCell><TableCell>0</TableCell><TableCell>1</TableCell></TableRow>
                        <TableRow><TableCell>Electron</TableCell><TableCell>-1</TableCell><TableCell>Very small</TableCell></TableRow>
                    </TableBody>
                </Table>
                <p className="mt-2 text-sm">Atoms have no overall charge because the number of positive protons is equal to the number of negative electrons.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr />
        
        <h3 className="flex items-center gap-2"><Microscope className="text-accent" />SECTION 6: SIZE, MASS & ISOTOPES</h3>
        <p>Where is most of the mass of an atom found?</p>
        <Textarea />
        <p className="mt-4">What is meant by the mass number of an atom?</p>
        <Textarea />
        <p className="mt-4">What are isotopes?</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>In the nucleus.</li>
                    <li>The mass number is the sum of the protons and neutrons in an atom.</li>
                    <li>Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><List className="text-accent" />SECTION 7: ELECTRONIC STRUCTURE</h3>
        <p>What is meant by electronic structure?</p>
        <Textarea />
        <p className="mt-4">Write the electronic structure of sodium.</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-7">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>The arrangement of electrons in energy levels or shells around the nucleus.</li>
                    <li>2,8,1</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
         <hr />
         
         <h3 className="flex items-center gap-2"><FileText className="text-accent" />SECTION 8: THE PERIODIC TABLE</h3>
        <p>Explain how the periodic table is arranged.</p>
        <Textarea />
        <p className="mt-4">Why do elements in the same group have similar chemical properties?</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-8">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>The elements are arranged in order of increasing atomic (proton) number, with elements having similar properties placed in columns (groups).</li>
                    <li>Because they have the same number of electrons in their outer shell.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
         <hr />
         
         <h3 className="flex items-center gap-2"><FileText className="text-accent" />SECTION 9: GROUPS</h3>
        <p>Describe the properties of Group 0 elements.</p>
        <Textarea />
        <p className="mt-4">Explain the trend in reactivity down Group 1.</p>
        <Textarea />
        <p className="mt-4">Explain the trend in reactivity down Group 7.</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-9">
            <AccordionTrigger>Check Answers</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc pl-6 text-sm">
                    <li>Group 0 elements (noble gases) are unreactive because they have a full outer shell of electrons. Their boiling points increase down the group.</li>
                    <li>Reactivity increases down Group 1 because the outer electron is further from the nucleus and more easily lost.</li>
                    <li>Reactivity decreases down Group 7 because the outer shell is further from the nucleus, making it harder to attract an electron.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
        
        <h3 className="flex items-center gap-2"><Brain className="text-accent" />SECTION 10: EXTENDED RESPONSE (6 marks)</h3>
        <p>Describe how the arrangement of electrons in atoms affects the position and reactivity of elements in the periodic table.</p>
        <Textarea className="min-h-[150px]" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-10">
            <AccordionTrigger>Check Answer</AccordionTrigger>
            <AccordionContent>
                <p className="text-sm">
                    An element's position in the periodic table is determined by its atomic number, which corresponds to the number of electrons. The number of electrons in the outermost shell determines the group the element is in. Elements in the same group have similar chemical properties because they have the same number of outer electrons. For example, Group 1 elements are highly reactive because they only have one electron to lose, and this reactivity increases down the group as the outer electron is further from the nucleus and more easily lost. Conversely, Group 7 elements are reactive because they need to gain one electron, and their reactivity decreases down the group as the nucleus is less able to attract an electron into the more distant outer shell.
                </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can write it clearly and accurately from memory, you've mastered the concept. This is the key to success for a reading/writing learner.</p>
        </div>
    </>
);

const Deck2Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><FileText className="text-accent" />SECTION 1: BIG-PICTURE NOTES</h3>
        <p><strong>1️⃣ Concept Map:</strong> Write a concept map starting with ‘Bonding & Structure’ and branching to Ionic, Covalent, Metallic, Polymers, and Nanoparticles, adding a key fact for each.</p>
        <Textarea placeholder="Ionic: [fact]..." />
        <p className="mt-4"><strong>2️⃣ Before vs After Table:</strong> Create a table for Ionic and Covalent bonding, describing the atoms before, after, and how electrons move.</p>
        <Textarea placeholder="| Bond type | Before | After | Electron movement |" />
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-1">
                <AccordionTrigger>Check Answers</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Ionic Bonding:</strong> Involves a transfer of electrons from a metal to a non-metal, forming oppositely charged ions.</li>
                        <li><strong>Covalent Bonding:</strong> Involves the sharing of electron pairs between non-metal atoms.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><ChevronsRightLeft className="text-accent" />SECTION 2: PROPERTIES TABLE</h3>
        <p><strong>4️⃣ Complete the table:</strong> Fill in the properties for each substance type.</p>
        <Table>
            <TableHeader><TableRow><TableHead>Compound type</TableHead><TableHead>Bond type</TableHead><TableHead>Conducts?</TableHead><TableHead>Melting point</TableHead></TableRow></TableHeader>
            <TableBody>
                <TableRow><TableCell>Ionic compound</TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Small molecule</TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell>Metal</TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
            </TableBody>
        </Table>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-2">
                <AccordionTrigger>Check Table</AccordionTrigger>
                <AccordionContent>
                     <Table>
                        <TableBody>
                            <TableRow><TableCell>Ionic compound</TableCell><TableCell>Ionic</TableCell><TableCell>When molten/dissolved</TableCell><TableCell>High</TableCell></TableRow>
                            <TableRow><TableCell>Small molecule</TableCell><TableCell>Covalent</TableCell><TableCell>No</TableCell><TableCell>Low</TableCell></TableRow>
                            <TableRow><TableCell>Metal</TableCell><TableCell>Metallic</TableCell><TableCell>Yes</TableCell><TableCell>High</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Thermometer className="text-accent" />SECTION 3: PARTICLE MOTION & STATES</h3>
        <p><strong>5️⃣ Particle Notes:</strong> Write short descriptions of the arrangement, motion, and forces in solids, liquids, and gases.</p>
        <Textarea />
        <p className="mt-4"><strong>6️⃣ States Summary:</strong> Write bullet points linking bond/force strength to the melting points of ionic compounds, small molecules, and metals.</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-3">
                <AccordionTrigger>Check Answers</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Solids:</strong> Fixed positions, vibrate. Strong forces.</li>
                        <li><strong>Liquids:</strong> Close but random, can move past each other. Weaker forces than solids.</li>
                        <li><strong>Gases:</strong> Far apart, random, fast movement. Very weak forces.</li>
                        <li><strong>High Melting Points (Ionic/Metallic/Giant Covalent):</strong> Strong electrostatic forces/covalent bonds require lots of energy to overcome.</li>
                        <li><strong>Low Melting Points (Simple Molecules):</strong> Weak intermolecular forces require little energy to overcome.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><LinkIcon className="text-accent" />SECTION 4: CARBON STRUCTURES</h3>
        <p><strong>9️⃣ Written Comparison:</strong> Write a paragraph or table comparing diamond and graphite. Include bonds, layers, conductivity, and hardness.</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-4">
                <AccordionTrigger>Check Comparison</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">
                        <strong>Diamond:</strong> Each carbon forms 4 strong covalent bonds. It's very hard, has a very high melting point, and does not conduct electricity as there are no free electrons.
                        <br /><br />
                        <strong>Graphite:</strong> Each carbon forms 3 strong covalent bonds, creating layers. It has a high melting point. It is soft because layers can slide. It conducts electricity due to delocalised electrons between the layers.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Microscope className="text-accent" />SECTION 5: NANOPARTICLES</h3>
        <p><strong>🔟 Summary Bullets:</strong> Write bullet points summarizing the size, key property, uses, and potential risks of nanoparticles.</p>
        <Textarea />
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-5">
                <AccordionTrigger>Check Summary</AccordionTrigger>
                <AccordionContent>
                     <ul className="list-disc pl-6 text-sm">
                        <li><strong>Size:</strong> 1-100 nanometres.</li>
                        <li><strong>Property:</strong> Very high surface area to volume ratio.</li>
                        <li><strong>Uses:</strong> Medicine, electronics, sun cream, catalysts.</li>
                        <li><strong>Risks:</strong> Long-term effects on health and the environment are not fully understood.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Brain className="text-accent" />FINAL READING/WRITING CHECK</h3>
        <p><strong>1️⃣1️⃣ Full Topic Written Summary:</strong> Without notes, write a one-page summary covering all key areas of this topic. Use tables and bullet points for clarity. Then, check against your notes and highlight any gaps in your knowledge.</p>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can write a clear, structured summary from memory, you have successfully revised this topic.</p>
        </div>
    </>
);


const ReadingWritingQuizView = ({ title, onBack, deckId }: ReadingWritingQuizViewProps) => {

    const renderQuizContent = () => {
        if (deckId === 'deck1') {
            return <Deck1Quiz />;
        }
        if (deckId === 'deck2') {
            return <Deck2Quiz />;
        }
        return <p>No reading/writing quiz available for this topic yet.</p>;
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
                        <BookOpen className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle className="text-3xl font-bold mt-2">READING & WRITING QUIZ</CardTitle>
                        <CardDescription>Exam Style: {title}</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                            <h3 className="font-bold text-primary">How to use this quiz</h3>
                            <p className="text-sm">Write your answers in full sentences. Focus on clarity and detail.</p>
                        </div>
                        <hr />
                        {renderQuizContent()}
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default ReadingWritingQuizView;
