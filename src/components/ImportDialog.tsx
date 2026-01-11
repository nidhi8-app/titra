
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

const ImportActionDialog = ({ source, onClose }: { source: ImportSource; onClose: () => void; }) => {
    const { toast } = useToast();
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isUrlBased = source === 'YouTube' || source === 'Quizlet';

    const handleGenerate = () => {
        setIsLoading(true);
        // In a real app, you would call an AI flow here.
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Quiz Generation Started",
                description: `We're creating a quiz from your ${source}. This feature is coming soon!`,
            });
            onClose();
        }, 1500);
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
                     <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-5 w-5" />
                        Select File
                     </Button>
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


export const ImportDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
                    Add information to your deck from various sources.
                </DialogDescription>
            </DialogHeader>
            <ImportSourceDialog onSelect={handleSelect} />
            </>
        )}
      </DialogContent>
    </Dialog>
  );
};
