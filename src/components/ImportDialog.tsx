
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ChevronRight, FileText, Mic, Layers, Baseline, Presentation, Youtube, Upload, Link, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateQuizFromUrl } from '@/ai/flows/generate-quiz-from-url-flow';
import type { QuizQuestion } from '@/lib/types';


type ImportSource = 'PDF' | 'Record lecture' | 'Quizlet' | 'Notes' | 'PowerPoint' | 'YouTube';

const importOptions: { name: ImportSource; icon: React.ElementType }[] = [
  { name: 'PDF', icon: FileText },
  { name: 'Record lecture', icon: Mic },
  { name: 'Quizlet', icon: Layers },
  { name: 'Notes', icon: Baseline },
  { name: 'PowerPoint', icon: Presentation },
  { name: 'YouTube', icon: Youtube },
];

const ImportSourceDialog = ({ onSelect }: { onSelect: (source: ImportSource) => void }) => (
    <div className="py-4 space-y-2">
        {importOptions.map(option => (
        <Button
            key={option.name}
            variant="outline"
            className="w-full justify-start text-left h-14"
            onClick={() => onSelect(option.name)}
        >
            <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <option.icon className="h-6 w-6 text-muted-foreground" />
                <span className="font-semibold">{option.name}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
        </Button>
        ))}
    </div>
);

type ImportActionDialogProps = {
    source: ImportSource;
    onClose: () => void;
    onQuizGenerated: (title: string, questions: QuizQuestion[]) => void;
};

const ImportActionDialog = ({ source, onClose, onQuizGenerated }: ImportActionDialogProps) => {
    const { toast } = useToast();
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isUrlBased = source === 'YouTube' || source === 'Quizlet' || source === 'PDF';

    const handleGenerate = async () => {
        if (isUrlBased && !url) {
            toast({ variant: 'destructive', title: 'Please enter a URL.' });
            return;
        }

        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            toast({
                variant: "destructive",
                title: "AI Feature Disabled",
                description: "Please add your Gemini API key to the .env file to use this feature.",
            });
            return;
        }

        setIsLoading(true);
        try {
            const { title, questions } = await generateQuizFromUrl({ url });
            if (!title || !questions || questions.length === 0) {
                 throw new Error("The AI could not generate a quiz from this URL. Please try a different one.");
            }
            onQuizGenerated(title, questions);
            toast({
                title: "Quiz Generated!",
                description: `Your quiz "${title}" is ready.`,
            });
            onClose();
        } catch (error: any) {
            console.error("Error generating quiz from URL:", error);
            toast({
                variant: 'destructive',
                title: 'Quiz Generation Failed',
                description: error.message || 'An unknown error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // For now, we just show a toast. Real implementation would require file processing.
            toast({
                title: "File Uploaded",
                description: `Processing for "${file.name}" is coming soon!`,
            });
             onClose();
        }
    };

    const triggerFileUpload = () => {
        document.getElementById('file-upload-input')?.click();
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Import from {source}</DialogTitle>
                <DialogDescription>
                   {isUrlBased
                    ? `Paste the URL below to generate a quiz from your ${source}.`
                    : `Upload your ${source} file to generate a quiz.`
                   }
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {isUrlBased ? (
                     <div className="flex items-center gap-2">
                        <Link className="h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="url"
                            placeholder={`https://www.${source.toLowerCase()}.com/...`}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                     </div>
                ) : (
                    <>
                     <Button variant="outline" className="w-full" onClick={triggerFileUpload}>
                        <Upload className="mr-2 h-5 w-5" />
                        Select File
                     </Button>
                     <input type="file" id="file-upload-input" className="hidden" onChange={handleFileUpload} />
                    </>
                )}
            </div>
            <DialogFooter>
                 <Button variant="ghost" onClick={onClose}>Cancel</Button>
                 <Button onClick={handleGenerate} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Quiz
                 </Button>
            </DialogFooter>
        </>
    )
}


type ImportDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onQuizGenerated: (title: string, questions: QuizQuestion[]) => void;
};


export const ImportDialog = ({ isOpen, onClose, onQuizGenerated }: ImportDialogProps) => {
  const [selectedSource, setSelectedSource] = useState<ImportSource | null>(null);

  const handleSelect = (source: ImportSource) => {
    setSelectedSource(source);
  };
  
  const handleClose = () => {
      setSelectedSource(null);
      onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {selectedSource ? (
            <ImportActionDialog source={selectedSource} onClose={handleClose} onQuizGenerated={onQuizGenerated} />
        ) : (
            <>
            <DialogHeader>
                <DialogTitle>Import</DialogTitle>
                <DialogDescription>
                    Generate a quiz from various sources using AI.
                </DialogDescription>
            </DialogHeader>
            <ImportSourceDialog onSelect={handleSelect} />
            </>
        )}
      </DialogContent>
    </Dialog>
  );
};
