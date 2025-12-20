
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';

type NoteEditorProps = {
  onSave: (title: string, body: string) => void;
  onCancel: () => void;
  note?: { title: string; body: string };
};

const NoteEditor = ({ onSave, onCancel, note }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  const handleSave = () => {
    if (title && body) {
      onSave(title, body);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{note ? 'Edit Note' : 'Create Note'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your note title"
            />
          </div>
          <div>
            <Label htmlFor="note-body">Body</Label>
            <Textarea
              id="note-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Start writing your note..."
              className="min-h-[300px]"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteEditor;
