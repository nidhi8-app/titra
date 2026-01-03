
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
    'Amount of Substance': [
        { text: "moles equals mass divided by Mr", html: "moles = <frac>mass / Mr</frac>" },
        { text: "mass equals moles times Mr", html: "mass = moles × Mr" },
        { text: "concentration in mass equals mass divided by volume", html: "concentration (mass) = <frac>mass / volume</frac>" },
        { text: "concentration in moles equals moles divided by volume", html: "concentration (moles) = <frac>moles / volume</frac>" },
    ],
    'Percentage Yield & Atom Economy': [
        { text: "percentage yield equals actual yield divided by theoretical yield, times one hundred", html: "% Yield = <frac>actual yield / theoretical yield</frac> × 100" },
        { text: "atom economy equals Mr of desired product divided by Mr of all reactants, times one hundred", html: "Atom Economy = <frac>Mr of desired product / Mr of all reactants</frac> × 100" },
    ],
    'Gas Volumes (HT only)': [
        { text: "volume equals moles times twenty-four", html: "volume = moles × 24" },
    ],
    'Energy Changes': [
        { text: "energy equals mass times specific heat capacity times temperature change", html: "q = mcΔT" },
    ],
    'Rates of Reaction': [
        { text: "mean rate of reaction equals quantity of reactant used divided by time taken", html: "Mean Rate = <frac>quantity of reactant used / time taken</frac>" },
        { text: "mean rate of reaction equals quantity of product formed divided by time taken", html: "Mean Rate = <frac>quantity of product formed / time taken</frac>" },
    ],
    'Electrolysis (HT only)': [
        { text: "charge equals current times time", html: "Q = It" },
    ],
    'Acids, Bases and Salts': [
        { text: "pH equals minus log base ten of the hydrogen ion concentration", html: "pH = -log₁₀[H⁺]" },
    ],
    'Earth & Atmospheric Science': [
        { text: "percentage by mass of an element equals Ar times number of atoms, divided by Mr of compound, times one hundred", html: "% by mass = <frac>(Ar × no. of atoms) / Mr of compound</frac> × 100" },
    ],
    'Organic Chemistry': [
        { text: "Alkanes general formula is C n H two n plus two", html: "Alkanes: CₙH₂ₙ₊₂" },
        { text: "Alkenes general formula is C n H two n", html: "Alkenes: CₙH₂ₙ" },
    ],
    'Chemical Analysis': [
        { text: "concentration one times volume one equals concentration two times volume two", html: "C₁V₁ = C₂V₂" },
    ],
    'Physics–Chemistry Cross-Over': [
        { text: "density equals mass divided by volume", html: "density = <frac>mass / volume</frac>" },
    ],
    'Required Mathematics in Chemistry': [
        { text: "surface area to volume ratio equals surface area divided by volume", html: "SA:V ratio = <frac>surface area / volume</frac>" },
    ],
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
                Object.keys(formulaCategories).length > 8 && (category === 'Energy Changes' || category === 'Rates of Reaction' || category === 'Acids, Bases and Salts' || category === 'Earth & Atmospheric Science') && "md:col-span-1",
                (category === 'Physics–Chemistry Cross-Over' || category === 'Required Mathematics in Chemistry') && "md:col-span-2",
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
                        <p key={index} className="text-base" dangerouslySetInnerHTML={{ __html: formula.html.replace(/<frac>(.*)\/(.*)<\/frac>/g, '<span class="inline-flex flex-col items-center"><span>$1</span><span class="border-t border-current w-full"></span><span>$2</span></span>') }} />
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
                           <li key={index} dangerouslySetInnerHTML={{ __html: formula.html.replace(/<frac>(.*)\/(.*)<\/frac>/g, '<div class="flex items-center"><span>$1</span><span class="text-xl mx-2">/</span><span>$2</span></div>') }} />
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
                <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: formula.html.replace(/<frac>(.*)\/(.*)<\/frac>/g, '<span class="inline-flex flex-col items-center"><span>$1</span><span class="border-t border-current w-full"></span><span>$2</span></span>') }} />
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

    