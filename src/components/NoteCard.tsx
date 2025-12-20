
"use client";

import type { Note } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatDistanceToNow } from 'date-fns';

type NoteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-4 text-sm text-muted-foreground">{note.body}</p>
      </CardContent>
      <div className="p-6 pt-0 text-xs text-muted-foreground">
        Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
      </div>
    </Card>
  );
};

export default NoteCard;
