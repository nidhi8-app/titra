
"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { NoteSection } from '@/lib/initial-notes';

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
                <AccordionItem value={`${level}-${index}`} key={`${level}-${index}`} className={level > 0 ? "border-none" : ""}>
                    <AccordionTrigger 
                        className={`font-semibold ${level === 1 ? 'pl-4' : ''} ${level > 1 ? 'pl-8' : ''}`}
                    >
                        {section.title}
                    </AccordionTrigger>
                    <AccordionContent className={`${level === 0 ? 'pl-4' : ''} ${level > 0 ? 'pl-8' : ''}`}>
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

    