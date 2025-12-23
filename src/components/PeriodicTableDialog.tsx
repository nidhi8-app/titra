
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { elements, type ElementData } from '@/lib/periodic-table-data';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

type PeriodicTableDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categoryColors: { [key: string]: string } = {
    'alkali-metal': 'bg-red-500/80',
    'alkaline-earth-metal': 'bg-orange-500/80',
    'transition-metal': 'bg-yellow-500/80',
    'lanthanide': 'bg-yellow-400/80',
    'actinide': 'bg-yellow-300/80',
    'post-transition-metal': 'bg-green-500/80',
    'metalloid': 'bg-teal-500/80',
    'reactive-nonmetal': 'bg-sky-500/80',
    'noble-gas': 'bg-blue-500/80',
    'unknown': 'bg-gray-500/80',
};

const ElementTile = ({ element }: { element: ElementData }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center p-1 rounded-md text-white text-xs aspect-square",
      categoryColors[element.category]
    )}
    style={{
      gridColumnStart: element.group,
      gridRowStart: element.period, 
    }}
  >
    <div className="font-bold text-sm sm:text-lg">{element.symbol}</div>
    <div className="text-xs">{element.atomicNumber}</div>
  </div>
);


const Legend = () => (
    <div className="p-4 border-t">
        <h4 className="font-bold mb-2 text-center">Legend</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {Object.entries(categoryColors).map(([category, colorClass]) => (
                <div key={category} className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded-sm", colorClass)}></div>
                    <span className="capitalize">{category.replace(/-/g, ' ')}</span>
                </div>
            ))}
        </div>
    </div>
)

export const PeriodicTableDialog = ({ isOpen, onClose }: PeriodicTableDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Periodic Table of Elements</DialogTitle>
          <DialogDescription>
            An interactive periodic table to help you with your studies.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div 
                className="grid gap-1 py-2 pr-2"
                style={{
                    gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(9, minmax(0, 1fr))',
                }}
            >
                {elements.map(el => (
                    <ElementTile key={el.atomicNumber} element={el} />
                ))}
            </div>
        </ScrollArea>
        <Legend />
        <DialogFooter className="pt-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

    