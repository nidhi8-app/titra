
"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { NoteSection } from '@/lib/initial-notes';
import { cn } from '@/lib/utils';

type NestedAccordionProps = {
    sections: NoteSection[];
    level?: number;
};

export const NestedAccordion = ({ sections, level = 0 }: NestedAccordionProps) => {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <Accordion type="multiple" className="w-full">
            {sections.map((section, index) => (
                <AccordionItem 
                    value={`${level}-${index}`} 
                    key={`${level}-${index}`}
                >
                    <AccordionTrigger 
                        className={cn(
                            'font-semibold text-left',
                            level === 0 && 'p-4 border rounded-md bg-card text-lg',
                            level === 1 && 'pl-4 text-base', 
                            level > 1 && 'pl-8 text-sm'
                        )}
                    >
                        {section.title}
                    </AccordionTrigger>
                    <AccordionContent className={cn('pb-4', level === 0 ? 'pl-4' : 'pl-8')}>
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            {section.content}
                        </div>
                        {section.subsections && section.subsections.length > 0 && (
                            <NestedAccordion sections={section.subsections} level={level + 1} />
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
