
"use client";

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type DiagramsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  diagrams: ImagePlaceholder[];
  title: string;
};

export const DiagramsDialog = ({ isOpen, onClose, diagrams, title }: DiagramsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Reference these diagrams to help you with the visual quiz activities.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pr-1">
                {diagrams.map(diagram => (
                    <Card key={diagram.id}>
                        <CardHeader>
                            <CardTitle className="text-base">{diagram.description}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                                <Image 
                                    src={diagram.imageUrl}
                                    alt={diagram.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={diagram.imageHint}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
        <DialogFooter className="mt-auto pt-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

    