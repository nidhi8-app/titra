
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
        <Accordion type="multiple" className="w-full space-y-2">
            {sections.map((section, index) => (
                <AccordionItem 
                    value={`${level}-${index}`} 
                    key={`${level}-${index}`}
                    className={cn(
                        'border-none',
                        level === 0 && 'p-4 border rounded-md bg-card'
                    )}
                >
                    <AccordionTrigger 
                        className={cn(
                            'font-semibold text-left p-0 hover:no-underline',
                            level === 0 && 'text-2xl font-headline',
                            level === 1 && 'pl-4 text-lg', 
                            level > 1 && 'pl-8 text-base'
                        )}
                    >
                        {section.title}
                    </AccordionTrigger>
                    <AccordionContent className={cn('pb-0 pt-2', level === 0 ? 'pl-4' : 'pl-8')}>
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                        {section.subsections && section.subsections.length > 0 && (
                            <NestedAccordion sections={section.subsections} level={level + 1} />
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

    