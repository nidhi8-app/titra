
"use client";

import React from 'react';
import { parseNotes, type NoteSection } from '@/lib/initial-notes';
import type { Note } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TopicItem = ({ topic, level = 0 }: { topic: NoteSection, level?: number }) => {
    return (
        <div>
            <div className={cn(
                "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 rounded-lg",
                level > 0 && `pl-${4 + level * 4}`
            )}>
                <div className="flex-1">
                    <p className={cn(
                        "font-bold",
                        level === 0 && "text-xl",
                        level === 1 && "text-lg",
                        level > 1 && "text-base"
                    )}>
                        {topic.title}
                    </p>
                    {level === 0 && topic.content && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: topic.content.replace(/\n/g, '<br />') }} />
                    )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            {topic.subsections && topic.subsections.length > 0 && (
                <div className="border-l-2 ml-6">
                    {topic.subsections.map((sub, index) => (
                        <TopicItem key={index} topic={sub} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const TopicList = ({ notes }: { notes: Note[] }) => {
    const parsed = React.useMemo(() => parseNotes(notes), [notes]);
    const mainTopic = parsed[0];

    if (!mainTopic) return null;

    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-2">
                <CardTitle className="text-3xl font-bold font-headline">
                    {mainTopic.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-1">
                    {mainTopic.subsections.map((topic, index) => (
                        <TopicItem key={index} topic={topic} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
