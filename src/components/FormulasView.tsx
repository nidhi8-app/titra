
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Mic, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { generatePodcast } from '@/ai/flows/generate-podcast-flow';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type LearningStyle = 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';

type FormulasViewProps = {
    learningStyle: LearningStyle;
};

const formulaCategories = {
    'Key Concepts & Calculations': [
        { text: "Avogadro’s number (HT): There are 6.02 x 10²³ particles of a substance in 1 mole.", html: "Avogadro’s number (HT): 6.02 x 10²³ particles/mol" },
        { text: "Concentration in grams per decimeter cubed equals mass in grams divided by volume in decimeters cubed.", html: "Concentration (g/dm³) = <frac>mass (g) / volume (dm³)</frac>" },
        { text: "Concentration in moles per decimeter cubed equals moles divided by volume in decimeters cubed.", html: "Concentration (mol/dm³) = <frac>moles (mol) / volume (dm³)</frac>" },
        { text: "Gas Volume (HT): 1 mole of any gas has a volume of 24 decimeters cubed.", html: "Volume (dm³) = moles × 24 dm³" },
        { text: "To convert from centimeters cubed to decimeters cubed, divide by one thousand.", html: "1 dm³ = 1000 cm³" },
        { text: "Rate of reaction equals quantity of reactant used divided by time taken.", html: "Mean rate = <frac>quantity of reactant used / time taken</frac>" },
        { text: "Chromatography Rf value equals distance moved by substance divided by distance moved by solvent.", html: "R<sub>f</sub> = <frac>distance moved by substance / distance moved by solvent</frac>" },
    ],
    'Yield & Economy (HT)': [
        { text: "Percentage Yield equals mass of product actually made, divided by maximum theoretical mass of product, times one hundred.", html: "% Yield = <frac>Mass of product actually made / Maximum theoretical mass</frac> × 100" },
        { text: "Atom Economy equals the relative formula mass of the desired product, divided by the sum of the relative formula masses of all reactants, times one hundred.", html: "Atom Economy = <frac>RFM of desired product / Sum of RFMs of all reactants</frac> × 100" },
    ],
    'Energy Changes (HT)': [
        { text: "Energy change in a reaction equals the total energy needed to break bonds in reactants minus the total energy released when bonds in the products are formed.", html: "Energy change = Energy to break bonds - Energy released forming bonds" },
    ],
    'Combustion Reactions': [
        { text: "Combustion of carbon: Carbon plus Oxygen gives Carbon dioxide.", html: "C(s) + O₂(g) → CO₂(g)" },
        { text: "Combustion of hydrogen: Hydrogen plus Oxygen gives Water.", html: "2H₂(g) + O₂(g) → 2H₂O(g)" },
        { text: "Combustion of methane: Methane plus Oxygen gives Carbon dioxide plus Water.", html: "CH₄ + 2O₂ → CO₂ + 2H₂O" },
    ],
    'Reactions of Metals': [
        { text: "Oxidation of copper: Copper plus Oxygen gives Copper (II) oxide.", html: "2Cu(s) + O₂(g) → 2CuO(s)" },
        { text: "Reaction of sodium with water: Sodium plus Water gives Sodium hydroxide plus Hydrogen.", html: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)" },
        { text: "Displacement of metals: Copper (II) sulfate plus Magnesium gives Magnesium sulfate plus Copper.", html: "CuSO₄(aq) + Mg(s) → MgSO₄(aq) + Cu(s)" },
    ],
    'Acid Reactions': [
        { text: "Reaction of metal with acid: Magnesium plus Hydrochloric acid gives Magnesium chloride plus Hydrogen.", html: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)" },
        { text: "Reaction of metal oxide with acid: Copper (II) oxide plus Hydrochloric acid gives Copper (II) chloride plus Water.", html: "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)" },
        { text: "Neutralisation: Sodium hydroxide plus Hydrochloric acid gives Sodium chloride plus Water.", html: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)" },
        { text: "Ionic equation for neutralisation (HT): H plus plus OH minus gives H2O.", html: "H⁺(aq) + OH⁻(aq) → H₂O(l)" },
        { text: "Marble chips and acid: Calcium carbonate plus Hydrochloric acid gives Calcium chloride plus Water plus Carbon dioxide.", html: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)" },
    ],
    'Other Key Reactions': [
        { text: "Displacement of halogens: Sodium bromide plus Chlorine gives Bromine plus Sodium chloride.", html: "2NaBr(aq) + Cl₂(aq) → Br₂(aq) + 2NaCl(aq)" },
        { text: "Electrolysis of molten lead bromide: Lead bromide gives lead plus Bromine.", html: "PbBr₂(l) → Pb(l) + Br₂(g)" },
        { text: "Cracking of decane: Decane gives Pentene plus Pentane.", html: "C₁₀H₂₂ → C₅H₁₀ + C₅H₁₂" },
        { text: "Electrolysis of aqueous sodium chloride: Sodium chloride plus Water gives Sodium hydroxide plus Hydrogen plus Chlorine.", html: "2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + H₂(g) + Cl₂(g)" },
        { text: "The Haber process: Nitrogen plus Hydrogen gives Ammonia.", html: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)" },
        { text: "Bromine test for alkenes: Ethene plus Bromine gives Dibromoethane.", html: "C₂H₄ + Br₂ → C₂H₄Br₂" },
    ],
     'Half Equations (HT)': [
        { text: "Cathode half equation for electrolysis: two H plus plus two e minus gives H two.", html: "2H⁺(aq) + 2e⁻ → H₂(g)"},
        { text: "Anode half equation for electrolysis: two C L minus gives C L two plus two e minus.", html: "2Cl⁻(aq) → Cl₂(g) + 2e⁻"},
    ]
};

const allFormulas = Object.values(formulaCategories).flat();

const FormulaAudioButton = ({ text }: { text: string }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const { toast } = useToast();

    const handlePlay = async () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            return;
        }

        setIsLoading(true);
        try {
            const result = await generatePodcast(text);
            const audio = new Audio(result.media);
            audioRef.current = audio;
            audio.play();
            setIsPlaying(true);
            audio.onended = () => setIsPlaying(false);
        } catch (error: any) {
            console.error("Error generating audio:", error);
            toast({
                variant: "destructive",
                title: "Audio Error",
                description: error.message || "Could not play audio.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={handlePlay} disabled={isLoading || isPlaying}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Mic />}
        </Button>
    );
};

const VisualFormulas = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formulaCategories).map(([category, formulas], catIndex) => (
             <Card key={category} className={cn(
                catIndex % 4 === 0 && "bg-sky-500/10 border-sky-500/30",
                catIndex % 4 === 1 && "bg-green-500/10 border-green-500/30",
                catIndex % 4 === 2 && "bg-purple-500/10 border-purple-500/30",
                catIndex % 4 === 3 && "bg-orange-500/10 border-orange-500/30",
                (category === 'Yield & Economy (HT)' || category === 'Energy Changes (HT)') && "md:col-span-2",
             )}>
                <CardHeader>
                    <CardTitle className={cn(
                         "text-lg",
                        catIndex % 4 === 0 && "text-sky-800 dark:text-sky-300",
                        catIndex % 4 === 1 && "text-green-800 dark:text-green-300",
                        catIndex % 4 === 2 && "text-purple-800 dark:text-purple-300",
                        catIndex % 4 === 3 && "text-orange-800 dark:text-orange-300",
                    )}>{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formulas.map((formula, index) => (
                        <p key={index} className="text-base" dangerouslySetInnerHTML={{ __html: formula.html }} />
                    ))}
                </CardContent>
            </Card>
        ))}
    </div>
);

const AuditoryFormulas = () => (
    <div className="space-y-4">
        {allFormulas.map((formula, index) => (
            <Card key={index} className="p-4 flex items-center justify-between">
                <p className="flex-1 text-base md:text-lg">{formula.text}</p>
                <FormulaAudioButton text={formula.text} />
            </Card>
        ))}
    </div>
);

const ReadingWritingFormulas = () => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
        <h4>AQA Chemistry Equation Sheet</h4>
        <Accordion type="multiple" className="w-full">
        {Object.entries(formulaCategories).map(([category, formulas]) => (
            <AccordionItem value={category} key={category}>
                <AccordionTrigger className="text-base font-medium">{category}</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                        {formulas.map((formula, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: formula.html.replace(/<frac>/g, '<div class="flex items-center"><span>').replace(/\//g, '</span><span class="text-xl mx-2">/</span><span>').replace(/<\/frac>/g, '</div>') }} />
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
    </div>
);

const KinestheticFormulas = () => (
    <div className="space-y-6">
        {allFormulas.map((formula, index) => (
            <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-2xl font-semibold mb-2 text-primary">Step {index + 1}:</p>
                <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: formula.html.replace(/→/g, '→<br/>').replace('⇌', '⇌<br/>') }} />
            </Card>
        ))}
    </div>
);

const FormulasView = ({ learningStyle }: FormulasViewProps) => {
    const renderContent = () => {
        switch (learningStyle) {
            case 'Visual': return <VisualFormulas />;
            case 'Auditory': return <AuditoryFormulas />;
            case 'Reading/Writing': return <ReadingWritingFormulas />;
            case 'Kinesthetic': return <KinestheticFormulas />;
            default: return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chemistry Formulas</CardTitle>
                <CardDescription>Key equations for your AQA GCSE Chemistry exam.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] p-1">
                    <div className="pr-4">
                        {renderContent()}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default FormulasView;
