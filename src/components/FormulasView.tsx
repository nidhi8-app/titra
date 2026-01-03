
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Mic, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { generatePodcast } from '@/ai/flows/generate-podcast-flow';
import { useToast } from '@/hooks/use-toast';

type LearningStyle = 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';

type FormulasViewProps = {
    learningStyle: LearningStyle;
};

const formulas = [
    { text: "Percentage yield equals actual yield divided by theoretical yield, times one hundred.", html: "% yield = <frac>actual yield/theoretical yield</frac> &times; 100" },
    { text: "Atom economy equals the relative formula mass of the desired product divided by the sum of the relative formula masses of all reactants, times one hundred.", html: "Atom economy = <frac><i>M</i><sub>r</sub> of desired product / sum of <i>M</i><sub>r</sub> of all reactants</frac> &times; 100" },
    { text: "The amount of a substance in moles is equal to its mass in grams divided by its relative formula mass.", html: "Amount of substance (mol) = <frac>mass (g) / relative formula mass (<i>M</i><sub>r</sub>)</frac>" },
    { text: "Concentration in grams per decimeter cubed is equal to the mass of the solute in grams divided by the volume in decimeters cubed.", html: "Concentration (g/dm³) = <frac>mass of solute (g) / volume (dm³)</frac>" },
    { text: "Concentration in moles per decimeter cubed is equal to the amount of solute in moles divided by the volume in decimeters cubed.", html: "Concentration (mol/dm³) = <frac>amount of solute (mol) / volume (dm³)</frac>" },
];

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
        <Card className="bg-sky-500/10 border-sky-500/30">
            <CardHeader><CardTitle className="text-sky-800 dark:text-sky-300">Yield & Economy</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: formulas[0].html }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: formulas[1].html }} />
            </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/30">
            <CardHeader><CardTitle className="text-green-800 dark:text-green-300">Amount of Substance</CardTitle></CardHeader>
            <CardContent><p className="text-lg" dangerouslySetInnerHTML={{ __html: formulas[2].html }} /></CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/30 md:col-span-2">
            <CardHeader><CardTitle className="text-purple-800 dark:text-purple-300">Concentration</CardTitle></CardHeader>
            <CardContent className="flex flex-col md:flex-row md:items-center gap-6">
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: formulas[3].html }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: formulas[4].html }} />
            </CardContent>
        </Card>
    </div>
);

const AuditoryFormulas = () => (
    <div className="space-y-4">
        {formulas.map((formula, index) => (
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
        <table>
            <tbody>
                {formulas.map((formula, index) => (
                    <tr key={index}>
                        <td dangerouslySetInnerHTML={{ __html: formula.html.replace(/<frac>/g, '<div class="flex items-center"><span>').replace(/\//g, '</span><span class="text-2xl mx-2">/</span><span>').replace(/<\/frac>/g, '</div>') }} />
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const KinestheticFormulas = () => (
    <div className="space-y-6">
        {formulas.map((formula, index) => (
            <Card key={index} className="p-6">
                <p className="text-2xl font-semibold mb-2">Step {index + 1}:</p>
                <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: formula.html }} />
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
                <ScrollArea className="h-[400px] p-1">
                    <div className="pr-4">
                        {renderContent()}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default FormulasView;
