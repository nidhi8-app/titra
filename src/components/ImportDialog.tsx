
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
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';


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
};

const ImportActionDialog = ({ source, onClose }: ImportActionDialogProps) => {
    const { toast } = useToast();
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pastedNotes, setPastedNotes] = useState('');

    const isUrlBased = source === 'YouTube' || source === 'Quizlet';
    const isFileBased = source === 'PDF' || source === 'PowerPoint' || source === 'Record lecture';

    const handleGenerate = async () => {
        if (isUrlBased && !url) {
            toast({ variant: 'destructive', title: 'Please enter a URL.' });
            return;
        }

        if (source === 'Notes' && !pastedNotes) {
             toast({ variant: 'destructive', title: 'Please paste your notes.' });
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
            // This part needs a generic content-to-quiz flow.
            // For now, we use the URL flow as a stand-in for demonstration.
            const contentToProcess = isUrlBased ? url : pastedNotes;
            if (!contentToProcess) {
                throw new Error("No content to process.");
            }

            const { title, questions } = await generateQuizFromUrl({ url: contentToProcess });
            if (!title || !questions || questions.length === 0) {
                 throw new Error("The AI could not generate a quiz from this content. Please try different content.");
            }
            // In a real app, we'd add this to a new deck or the current one.
            // For this prototype, we'll just show a success toast.
            toast({
                title: "Quiz Generated!",
                description: `Your quiz "${title}" would be ready here.`,
            });
            onClose();
        } catch (error: any) {
            console.error("Error generating quiz:", error);
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
            toast({
                title: "File Uploaded",
                description: `Generating a quiz from "${file.name}"...`,
            });
            // Here you would process the file and call handleGenerate with its content
            onClose();
        }
    };

    const triggerFileUpload = () => {
        document.getElementById('file-upload-input')?.click();
    }
    
    const renderContent = () => {
        if (isUrlBased) {
            return (
                <div className="flex items-center gap-2">
                    <Link className="h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="url"
                        placeholder={`https://www.${source.toLowerCase()}.com/...`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
            );
        }
        if (isFileBased) {
             return (
                 <>
                    <Button variant="outline" className="w-full" onClick={triggerFileUpload}>
                        <Upload className="mr-2 h-5 w-5" />
                        Select File
                    </Button>
                    <input type="file" id="file-upload-input" className="hidden" onChange={handleFileUpload} />
                 </>
             )
        }
        if (source === 'Notes') {
            return (
                 <div className="space-y-4">
                    <Button variant="outline" className="w-full" onClick={triggerFileUpload}>
                        <Upload className="mr-2 h-5 w-5" />
                        Select File
                    </Button>
                    <input type="file" id="file-upload-input" className="hidden" onChange={handleFileUpload} />
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or
                            </span>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="note-paste">Copy & Paste Notes</Label>
                        <Textarea 
                            id="note-paste"
                            placeholder="Paste your notes here..."
                            className="mt-1 h-32"
                            value={pastedNotes}
                            onChange={(e) => setPastedNotes(e.target.value)}
                        />
                     </div>
                 </div>
            )
        }
        return null;
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Import from {source}</DialogTitle>
                <DialogDescription>
                   {isUrlBased
                    ? `Paste the URL below to generate a quiz from your ${source}.`
                    : `Upload your ${source} to generate a quiz.`
                   }
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {renderContent()}
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
};


export const ImportDialog = ({ isOpen, onClose }: ImportDialogProps) => {
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
            <ImportActionDialog source={selectedSource} onClose={handleClose} />
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
