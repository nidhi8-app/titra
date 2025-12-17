"use client";

import React, { useState, useEffect } from 'react';
import type { Note } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import MotivationalMessage from './MotivationalMessage';

type NoteEditorProps = {
  note: Note | undefined;
  onSave: (id: string, title: string, body: string) => void;
  onDeleteRequest: (id: string) => void;
};

const NoteEditor = ({ note, onSave, onDeleteRequest }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setBody(note?.body || '');
  }, [note]);

  if (!note) {
    return <MotivationalMessage />;
  }
  
  const handleSave = () => {
    onSave(note.id, title, body);
  };

  const isChanged = note.title !== title || note.body !== body;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 bg-background/50 animate-in fade-in duration-300">
      <div className="flex-shrink-0 flex items-center justify-between mb-4">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
          />
        </div>
        <div className="flex items-center gap-2">
            <Button 
                onClick={handleSave} 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={!isChanged}
            >
                <Save className="mr-2" /> Save
            </Button>
            <Button
                variant="destructive"
                size="icon"
                onClick={() => onDeleteRequest(note.id)}
            >
                <Trash2 />
                <span className="sr-only">Delete Note</span>
            </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing your note here..."
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 text-base p-0"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
