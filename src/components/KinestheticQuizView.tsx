
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Footprints, Brain, Hand, Move, PersonStanding, CheckCircle, Fingerprint, Map, ChevronsDown, Handshake, Link as LinkIcon, Disc } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type KinestheticQuizViewProps = {
    title: string;
    onBack: () => void;
    deckId: string;
};

const Deck1Quiz = () => (
    <>
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
    </>
);

const Deck2Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><PersonStanding className="text-accent" />SECTION 1: BIG-PICTURE ROLE-PLAY</h3>
        <p className="text-sm italic">Use other people or objects to act this out.</p>
        <p><strong>1️⃣ Bonding role-play:</strong> Act out Ionic, Covalent, and Metallic bonding using people as atoms and balls as electrons.</p>
        <p className="mt-4"><strong>2️⃣ Polymer chain activity:</strong> Use paper clips or beads to build a polymer chain.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-1">
                <AccordionTrigger>Check Understanding</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Ionic:</strong> One person (metal) gives a ball (electron) to another (non-metal).</li>
                        <li><strong>Covalent:</strong> Two people (non-metals) hold onto the same ball (shared electron pair).</li>
                        <li><strong>Metallic:</strong> A group stands in a grid, and balls (delocalised electrons) are passed around between them.</li>
                        <li><strong>Polymer:</strong> The chain should be long, representing many repeating units (monomers) joined by strong covalent bonds.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Hand className="text-accent" />SECTION 2: BUILDING MODELS</h3>
        <p className="text-sm italic">Use LEGO, clay, or modeling kits.</p>
        <p><strong>3️⃣ Ionic lattice construction:</strong> Build a 3D model of a NaCl lattice.</p>
        <p className="mt-4"><strong>4️⃣ Covalent molecule building:</strong> Create models of H₂O, CH₄, and NH₃.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-2">
                <AccordionTrigger>Check Models</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>NaCl Lattice:</strong> Should be a regular, alternating pattern of two different colored objects (Na+ and Cl- ions).</li>
                        <li><strong>H₂O:</strong> Should be a 'V' shape.</li>
                        <li><strong>CH₄:</strong> Should be a tetrahedral shape.</li>
                        <li><strong>NH₃:</strong> Should be a trigonal pyramidal shape.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Move className="text-accent" />SECTION 3: PARTICLE MOTION</h3>
        <p className="text-sm italic">You are a particle. Act it out.</p>
        <p><strong>5️⃣ Act as particles:</strong> Show the movement for a solid, a liquid, and a gas.</p>
        <p className="mt-4"><strong>6️⃣ Melting simulation:</strong> Start as a solid (vibrating) and transition to a liquid (moving around) as you imagine heat being added.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-3">
                <AccordionTrigger>Check Movements</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Solid:</strong> Stand still but shake/vibrate on the spot. Tightly packed.</li>
                        <li><strong>Liquid:</strong> Move slowly around each other, staying close.</li>
                        <li><strong>Gas:</strong> Move quickly and randomly, far apart.</li>
                        <li><strong>Melting:</strong> Your movement should go from vibrating to sliding past others, showing you've overcome the forces holding you in place.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Disc className="text-accent" />SECTION 4: METALS & ALLOYS</h3>
        <p className="text-sm italic">Use coins or flat discs.</p>
        <p><strong>7️⃣ Layer activity:</strong> Stack coins to represent a pure metal. Slide the layers. Then, insert different sized coins (alloy) and try to slide them.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-4">
                <AccordionTrigger>Check Observation</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">The pure metal (same coins) layers should slide easily, showing malleability. The alloy (mixed coins) layers should be difficult to slide, showing why alloys are harder.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><LinkIcon className="text-accent" />SECTION 5: CARBON STRUCTURES</h3>
        <p className="text-sm italic">Use your hands or a model.</p>
        <p><strong>9️⃣ Graphite vs Diamond hands-on:</strong> With a graphite model (or stacked books), slide the layers. With a diamond model (or a rigid object), try to slide it.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d2-item-5">
                <AccordionTrigger>Check Feeling</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">You should feel the layers slide in graphite (slippery) but find the diamond structure is rigid and fixed (hard).</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Brain className="text-accent" />FINAL KINESTHETIC CHECK: FULL TOPIC BUILD</h3>
        <p><strong>1️⃣1️⃣ Build a “bonding & structures museum”</strong> on a table or floor. Create sections for each bonding type, polymers, and carbon structures using your models. Explain each section to a partner while pointing and moving through your creations.</p>

        <div className="p-4 mt-6 bg-green-500/10 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-lg">
            <h4 className="font-bold flex items-center gap-2"><CheckCircle />Self-check rule</h4>
            <p>If you can build it, act it out, and explain it while moving, you have mastered the topic kinesthetically.</p>
        </div>
    </>
);


const KinestheticQuizView = ({ title, onBack, deckId }: KinestheticQuizViewProps) => {
    
    const renderQuizContent = () => {
        if (deckId === 'deck1') {
            return <Deck1Quiz />;
        }
        if (deckId === 'deck2') {
            return <Deck2Quiz />;
        }
        return <p>No kinesthetic quiz available for this topic yet.</p>;
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
                        <Brain className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle className="text-3xl font-bold mt-2">KINESTHETIC QUIZ</CardTitle>
                        <CardDescription>Do this standing up. Say answers out loud and move!</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        {renderQuizContent()}
                    </CardContent>
                </Card>
            </ScrollArea>
        </div>
    );
};

export default KinestheticQuizView;
