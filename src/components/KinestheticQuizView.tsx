
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Footprints, Brain, Hand, Move, PersonStanding, CheckCircle, Fingerprint, Map, ChevronsDown, Handshake, Link as LinkIcon, Disc, Scale, Sigma, TestTube, Recycle, Award, BrainCircuit, Thermometer, Zap } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type KinestheticQuizViewProps = {
    title: string;
    onBack: () => void;
    deckId: string;
    isEmbedded?: boolean;
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

const Deck3Quiz = () => (
    <>
        <h3 className="flex items-center gap-2"><BrainCircuit className="text-accent" />SECTION 1: BALANCING & CONSERVATION OF MASS</h3>
        <p><strong>1️⃣ Atom Movement Exercise:</strong> Use beads, coins, or LEGO pieces to represent atoms. Build reactants of a simple reaction like: Mg + 2HCl → MgCl₂ + H₂. Rearrange physically to make products, ensuring all atoms are accounted for.</p>
        <p>Question: Which “atoms” move to make the products? Explain why mass is conserved.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-1">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">The atoms from the reactants rearrange to form the products. No atoms are created or destroyed, which is why mass is conserved.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <p className="mt-4"><strong>2️⃣ Equation Sticky Note Challenge:</strong> Write each element in a reaction on a sticky note. Move notes around on a table to balance: Al + O₂ → Al₂O₃.</p>
        <p>Question: How many O₂ molecules are needed to balance Al₂O₃?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-2">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">You need 3 molecules of O₂ (and 4 atoms of Al) to make 2 molecules of Al₂O₃. The balanced equation is 4Al + 3O₂ → 2Al₂O₃.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Scale className="text-accent" />SECTION 2: RELATIVE FORMULA MASS & PERCENTAGE BY MASS</h3>
        <p><strong>3️⃣ Build-a-Molecule Activity:</strong> Use beads to represent atoms. Build H₂O and CO₂ molecules.</p>
        <p>Question: Calculate the relative formula mass using your beads as atomic masses.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-3">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li>H₂O: (2 x 1) + 16 = 18</li>
                        <li>CO₂: 12 + (2 x 16) = 44</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <p className="mt-4"><strong>4️⃣ Mass Split Simulation:</strong> Use tokens to represent grams of a compound. Physically divide tokens into the proportion of each element.</p>
        <p>Question: What is the percentage by mass of oxygen in H₂O?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-4">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">Percentage by mass of oxygen in H₂O = (16 / 18) x 100% = 88.9%</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Sigma className="text-accent" />SECTION 3: MOLES AND AVOGADRO’S CONSTANT</h3>
        <p><strong>5️⃣ Mole Line-up Activity:</strong> Assign 1 token = 1 particle, line up multiple tokens to represent moles.</p>
        <p>Question: Using your line, how many tokens would represent 1 mole?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-5">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">6.02 x 10²³ tokens (Avogadro's constant).</p></AccordionContent>
            </AccordionItem>
        </Accordion>
        <p className="mt-4"><strong>6️⃣ Moles Matching Game:</strong> Give physical cards: some showing mass of substance, some number of moles. Match mass ↔ moles using M = n × Mr.</p>
        <p>Question: How many grams of NaCl are in 2 moles?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-6">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">Mr of NaCl = 23 + 35.5 = 58.5. Mass = 2 moles × 58.5 g/mol = 117 g.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><TestTube className="text-accent" />SECTION 4: LIMITING REACTANTS</h3>
        <p><strong>7️⃣ Token Reaction Simulation:</strong> Use two sets of tokens for reactants (e.g., 5 Mg tokens, 12 HCl tokens). Combine physically to make products.</p>
        <p>Question: Which reactant runs out first? Identify the limiting reactant and how much product is made.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-7">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">For Mg + 2HCl, you need twice as many HCl tokens as Mg. With 5 Mg, you'd need 10 HCl. Since you have 12 HCl, Mg is the limiting reactant. You can make 5 units of product.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Recycle className="text-accent" />SECTION 5: PERCENTAGE YIELD</h3>
        <p><strong>8️⃣ Product Collection Game:</strong> Start with 10 beads representing maximum product. Remove some beads to represent loss during reaction.</p>
        <p>Question: Calculate the percentage yield using your collected beads.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-8">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">If you collected 8 beads, the yield is (8 / 10) x 100% = 80%.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><Award className="text-accent" />SECTION 6: ATOM ECONOMY</h3>
        <p><strong>9️⃣ Atom Sorting Activity:</strong> Use a mix of tokens representing all reactants and products. Physically separate desired products vs by-products.</p>
        <p>Question: Count tokens to calculate atom economy.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-9">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">Atom Economy = (Total mass of desired products / Total mass of all reactants) x 100%.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3 className="flex items-center gap-2"><TestTube className="text-accent" />SECTION 7: CONCENTRATION AND VOLUMES</h3>
        <p><strong>🔟 Liquid Measurement Simulation:</strong> Use colored water or sand to represent solute. Pour into different volumes to create solutions of different concentrations.</p>
        <p>Question: How much solute is needed to make 250 cm³ of 2 g/dm³ solution?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-10">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">Volume = 250 cm³ = 0.25 dm³. Mass = Concentration x Volume = 2 g/dm³ x 0.25 dm³ = 0.5 g.</p></AccordionContent>
            </AccordionItem>
        </Accordion>
        <p className="mt-4"><strong>Bonus:</strong> Use balloons or boxes to represent gas volumes: 1 mole of gas = 24 dm³.</p>
        <p>Question: How many dm³ of H₂ are produced when 1 mole of Mg reacts with excess HCl?</p>
         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d3-item-11">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">From Mg + 2HCl → MgCl₂ + H₂, 1 mole of Mg produces 1 mole of H₂ gas. Therefore, 24 dm³ of H₂ is produced.</p></AccordionContent>
            </AccordionItem>
        </Accordion>
    </>
);

const Deck4Quiz = () => (
    <>
        <h3>🟩 ROUND 1: REACTIVITY SERIES (MOVE TO ANSWER)</h3>
        <p className="text-sm italic">Stand up. If the statement is TRUE, step forward. If FALSE, step back.</p>
        <ul>
            <li>Copper reacts vigorously with cold water.</li>
            <li>Magnesium is more reactive than zinc.</li>
            <li>A more reactive metal can displace a less reactive metal.</li>
            <li>Gold is found naturally as a compound.</li>
            <li>Metals form positive ions when they react.</li>
        </ul>
        <p>👉 Say WHY out loud after each move.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-item-1">
                <AccordionTrigger>Check Answers</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>False:</strong> Copper is unreactive with water.</li>
                        <li><strong>True:</strong> Magnesium is higher in the reactivity series.</li>
                        <li><strong>True:</strong> This is the definition of a displacement reaction.</li>
                        <li><strong>False:</strong> Gold is very unreactive and found native (as the element).</li>
                        <li><strong>True:</strong> They lose electrons to become positive ions.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>🟦 ROUND 2: OXIDATION & REDUCTION (HAND ACTIONS)</h3>
        <p className="text-sm italic">Hold an imaginary ball = oxygen. Hold imaginary coins = electrons.</p>
        <p>A metal gains oxygen → 👉 Move the ball towards your chest. Say: “This is <strong>Oxidation</strong>”</p>
        <p>A species loses electrons → 👉 Drop coins to the floor. Say: “This is <strong>Oxidation</strong>”</p>
        <p>In a displacement reaction, the more reactive metal is: 👉 Give away coins. It is <strong>oxidised</strong> (loses electrons).</p>
        
        <hr />

        <h3>🟨 ROUND 3: EXTRACTION DECISION GAME (STEP LEFT / RIGHT)</h3>
        <p className="text-sm italic">Step LEFT for carbon reduction. Step RIGHT for electrolysis.</p>
        <ul>
            <li>Iron</li>
            <li>Aluminium</li>
            <li>Zinc</li>
            <li>Potassium</li>
        </ul>
        <p>After each step, say: “This metal is extracted by ______ because ______”</p>
         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d4-item-3">
                <AccordionTrigger>Check Answers</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li><strong>Iron:</strong> Step LEFT. Extracted by carbon reduction because it is less reactive than carbon.</li>
                        <li><strong>Aluminium:</strong> Step RIGHT. Extracted by electrolysis because it is more reactive than carbon.</li>
                        <li><strong>Zinc:</strong> Step LEFT. Extracted by carbon reduction because it is less reactive than carbon.</li>
                        <li><strong>Potassium:</strong> Step RIGHT. Extracted by electrolysis because it is more reactive than carbon.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />
        
        <h3>🟥 ROUND 4: ACIDS & METALS (ACT IT OUT)</h3>
        <p className="text-sm italic">One hand = acid, other hand = metal.</p>
        <p>Clap your hands together → 👉 Blow air out of your mouth. The gas released is <strong>Hydrogen</strong>.</p>
        <p>Shout the word equation while clapping: Acid + metal → <strong>Salt</strong> + <strong>Hydrogen</strong></p>
        <p>If the metal is copper, do you: 👉 Stop. Explain why: Copper is less reactive than hydrogen and does not react with acids.</p>
        
        <hr />
        
        <h3>🟪 ROUND 5: NEUTRALISATION BUILD (USE OBJECTS)</h3>
        <p className="text-sm italic">Use pens, coins, or paper to represent ions.</p>
        <p>Build sodium chloride using ions. 👉 Say which acid made it: <strong>Hydrochloric acid</strong>.</p>
        <p>Build calcium sulfate. 👉 Say the acid and the metal/base used: <strong>Sulfuric acid</strong> and <strong>Calcium</strong> (or calcium oxide/hydroxide/carbonate).</p>
        <p>Acid + carbonate → 👉 Clap → stomp → blow air. Name the three products: <strong>Salt, Water, Carbon Dioxide</strong>.</p>
        
        <hr />

        <h3>🟧 ROUND 6: pH SCALE WALK</h3>
        <p className="text-sm italic">Imagine a line from 0 to 14.</p>
        <p>Walk LEFT and crouch = strong acid</p>
        <p>Stand in the MIDDLE = neutral</p>
        <p>Walk RIGHT and stretch tall = strong alkali</p>
        <p>Which side has more H⁺ ions? The <strong>left</strong> (acidic) side.</p>
        <p>What happens to H⁺ when pH drops by 1? It <strong>increases by 10 times</strong>.</p>

        <hr />
        
        <h3>🟫 ROUND 7: ELECTROLYSIS – BE THE ION</h3>
        <p className="text-sm italic">Write + on one hand, – on the other.</p>
        <p>Positive ion → walk to which electrode? The <strong>cathode</strong> (which is <strong>negative</strong>).</p>
        <p>Negative ion → walk to which electrode? The <strong>anode</strong> (which is <strong>positive</strong>).</p>
        <p>At the cathode, do ions: 👉 GAIN or LOSE electrons? <strong>Gain</strong> (take coins). This is reduction.</p>

        <hr />
        
        <h3>🟨 ROUND 8: PRODUCTS CHALLENGE (POINT FAST)</h3>
        <p className="text-sm italic">Point DOWN for cathode. Point UP for anode.</p>
        <ul>
            <li>Hydrogen in aqueous electrolysis (Point DOWN)</li>
            <li>Oxygen in aqueous electrolysis (Point UP)</li>
            <li>Bromine from molten lead bromide (Point UP)</li>
        </ul>
        <p>Say the half-equation while pointing (HT).</p>
        
        <hr />
        
        <h3>🟥 ROUND 9: QUICK-FIRE BODY SIGNALS</h3>
        <p className="text-sm italic">Thumbs 👍 = TRUE, Thumbs 👎 = FALSE</p>
        <ul>
            <li>Reduction is loss of oxygen (👍)</li>
            <li>Electrolysis uses electricity to break compounds (👍)</li>
            <li>Strong acids partially ionise (👎)</li>
            <li>pH 7 is alkaline (👎)</li>
            <li>Aluminium oxide is molten during electrolysis (👍)</li>
        </ul>

        <hr />
        
        <h3>🏁 FINAL CHALLENGE: TEACH THE WALL</h3>
        <p>Walk to a wall and teach it (out loud): One reaction, One equation, One electrolysis rule. If you can teach it without notes → you know it.</p>
    </>
);

const Deck5Quiz = () => (
    <>
        <h3>🔥 ROUND 1: EXOTHERMIC VS ENDOTHERMIC (MOVE & FEEL)</h3>
        <p className="text-sm italic">Use your body to show temperature changes. Step forward for exothermic, backward for endothermic.</p>
        <ul>
            <li>Neutralisation of acid + alkali</li>
            <li>Combustion of methane</li>
            <li>Thermal decomposition of calcium carbonate</li>
            <li>Citric acid + sodium hydrogencarbonate</li>
            <li>Hand warmers</li>
        </ul>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-q1">
                <AccordionTrigger>Check Answers</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 text-sm">
                        <li>Exothermic (Forward)</li>
                        <li>Exothermic (Forward)</li>
                        <li>Endothermic (Backward)</li>
                        <li>Endothermic (Backward)</li>
                        <li>Exothermic (Forward)</li>
                    </ul>
                    <p className="text-xs italic mt-2">Bonus: Clap hands each time you step forward (energy released) or hug yourself when stepping back (energy absorbed).</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />
        
        <h3>📈 ROUND 2: REACTION PROFILES (ACT THE GRAPH)</h3>
        <p className="text-sm italic">Floor = energy axis. Start low = reactants. Step up = activation energy. Step down = products.</p>
        <ul>
            <li>Act out an exothermic reaction: step up, then end lower</li>
            <li>Act out an endothermic reaction: step up, then end higher</li>
        </ul>
        <p className="text-xs italic mt-2">Extra: Stretch arms up at the peak to represent activation energy.</p>
        
        <hr />

        <h3>🧱 ROUND 3: BOND ENERGY (BUILD & BREAK)</h3>
        <p className="text-sm italic">Use LEGO, paper clips, or pens.</p>
        <ul>
            <li>Snap pieces apart → bond breaking (energy in)</li>
            <li>Snap pieces together → bond forming (energy out)</li>
        </ul>
        <p className="mt-2">Challenge: Act out a reaction where more energy is released than absorbed. Is it exothermic or endothermic?</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d5-q3">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent><p className="text-sm">Exothermic. More red than blue.</p></AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>⚡ ROUND 4: CELLS & BATTERIES (BUILD & FLOW)</h3>
        <p className="text-sm italic">Use two different coins, a wet paper towel, and a wire/clip.</p>
        <ul>
            <li>Build a simple cell and pass a ball representing electrons from metal A → metal B.</li>
            <li>Combine 2–3 cells in series to feel larger voltage.</li>
            <li>Act out non-rechargeable: walk until reactants are “used up.”</li>
            <li>Act out rechargeable: reverse direction of walk to recharge.</li>
        </ul>

        <hr />

        <h3>💨 ROUND 5: FUEL CELLS (CONTINUOUS MOVEMENT)</h3>
        <p className="text-sm italic">One person = hydrogen, one person = oxygen. Walk continuously into a “cell” area.</p>
        <ul>
            <li>Clap when water is produced.</li>
            <li>Act out continuous fuel supply → electricity flows.</li>
            <li>Explain half-reactions while moving.</li>
            <li>Compare motion of rechargeable cell vs hydrogen fuel cell.</li>
        </ul>

        <hr />
        
        <h3>🌡️ ROUND 6: TEMPERATURE PRACTICAL (MINI EXPERIMENT)</h3>
        <p className="text-sm italic">Mix small safe chemicals (e.g., vinegar + baking soda, or neutralisation).</p>
        <ul>
            <li>Measure temperature change.</li>
            <li>Step forward if exothermic, step back if endothermic.</li>
            <li>Predict before measuring.</li>
            <li>Record your movement with hands to show energy transfer.</li>
        </ul>
        
        <hr />
        
        <h3>🏁 ROUND 7: EXAM SIMULATION</h3>
        <p className="text-sm italic">Walk and teach a topic to a “wall” or an imaginary class. Move or gesture for each concept.</p>
        <ul>
            <li>🔥 Exothermic (arms out, energy released)</li>
            <li>❄️ Endothermic (hug yourself, energy absorbed)</li>
            <li>⛰️ Activation energy (hands high peak)</li>
            <li>🔋 Cell flow (ball / coin movement for electrons)</li>
            <li>🔄 Rechargeable vs continuous flow</li>
        </ul>
        <p className="mt-2">Teach one full reaction profile and one cell + fuel cell comparison.</p>
    </>
);

const Deck6Quiz = () => (
    <>
        <h3>⏱️ ROUND 1: RATE OF REACTION (MOVE & TIME)</h3>
        <p className="text-sm italic">Use a stopwatch (your phone is fine).</p>
        <p>Time how long it takes to do 10 star jumps. That's your "reaction time." Now, do 10 star jumps as fast as you can. Did the "rate" increase? Explain why.</p>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d6-q1">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">Yes, the rate increased because you completed the same "quantity" of work (10 jumps) in less time.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>💥 ROUND 2: COLLISION THEORY (BE THE PARTICLE)</h3>
        <p className="text-sm italic">Walk around your room.</p>
        <ul>
            <li><strong>Temperature:</strong> Walk slowly (low temp), then walk quickly (high temp). You should collide with things more often and with more energy.</li>
            <li><strong>Concentration:</strong> Walk alone. Now, have a friend or family member walk in the same space. You will collide more frequently.</li>
        </ul>
        
        <hr />
        
        <h3>🧊 ROUND 3: SURFACE AREA (CRUMBLE IT)</h3>
        <p className="text-sm italic">You need a biscuit or a sugar cube.</p>
        <p>Imagine dropping the whole biscuit in water. Now, crush it into crumbs and imagine dropping that in. Which one dissolves faster? Physically crumble it and explain why.</p>
         <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="d6-q3">
                <AccordionTrigger>Check Answer</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm">The crumbs dissolve faster because there is a larger surface area exposed to the water, leading to more frequent collisions.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <hr />

        <h3>⛰️ ROUND 4: CATALYSTS (FIND A SHORTCUT)</h3>
        <p className="text-sm italic">Find an obstacle in your room (like a chair).</p>
        <p>Walk over the chair (high activation energy). Now, walk around it (the catalyst pathway). Which was faster and required less energy? Act it out and say "A catalyst provides an alternative reaction pathway with lower activation energy."</p>
        
        <hr />

        <h3>🔄 ROUND 5: REVERSIBLE REACTIONS & EQUILIBRIUM (BALANCE BEAM)</h3>
        <p className="text-sm italic">Stand on one leg.</p>
        <p>Lean slightly to the left (favoring reactants). Now lean to the right (favoring products). Find your balance point in the middle – this is <strong>equilibrium</strong>, where the forward and reverse "wobbles" are equal.</p>
        
        <hr />
        
        <h3>✋ ROUND 6: LE CHATELIER'S PRINCIPLE (PUSH & PULL - HT)</h3>
        <p className="text-sm italic">Stand up and use your hands.</p>
        <ul>
            <li><strong>Concentration:</strong> Push your right hand with your left. Your right hand automatically pushes back to resist the change. This is the equilibrium shifting.</li>
            <li><strong>Temperature:</strong> Rub your hands together (exothermic). To "oppose" this, the equilibrium would shift to the endothermic side (cool down). Mime getting cold.</li>
            <li><strong>Pressure:</strong> Squeeze your hands together tightly (increase pressure). The system shifts to the side with fewer "moles" (less space). Unclench your fists to show this.</li>
        </ul>
    </>
);


const KinestheticQuizView = ({ title, onBack, deckId, isEmbedded = false }: KinestheticQuizViewProps) => {
    
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
        if (deckId === 'deck4') {
            return <Deck4Quiz />;
        }
        if (deckId === 'deck5') {
            return <Deck5Quiz />;
        }
        if (deckId === 'deck6') {
            return <Deck6Quiz />;
        }
        return <p>No kinesthetic quiz available for this topic yet.</p>;
    }
    
    if (isEmbedded) {
        return (
            <div className="prose prose-sm dark:prose-invert max-w-none">
                {renderQuizContent()}
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

    