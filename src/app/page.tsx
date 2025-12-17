"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Leaf } from "lucide-react";
import NoteList from "@/components/NoteList";
import NoteEditor from "@/components/NoteEditor";
import ProgressTracker from "@/components/ProgressTracker";
import type { Note } from "@/lib/types";
import { initialNotes } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(
    notes[0]?.id || null
  );
  const { toast } = useToast();
  const [deleteCandidate, setDeleteCandidate] = React.useState<string | null>(null);

  const sortedNotes = React.useMemo(() => {
    return [...notes].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }, [notes]);

  const selectedNote = React.useMemo(() => {
    return notes.find((note) => note.id === selectedNoteId);
  }, [notes, selectedNoteId]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      body: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    toast({
      title: "Note Created",
      description: "A new note has been added to your collection.",
    });
  };

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleUpdateNote = (id: string, title: string, body: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title, body, updatedAt: new Date() } : note
      )
    );
    toast({
      title: "Note Saved!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      const newSortedNotes = sortedNotes.filter(note => note.id !== id);
      setSelectedNoteId(newSortedNotes[0]?.id || null);
    }
    toast({
      title: "Note Deleted",
      variant: "destructive",
      description: "The note has been permanently removed.",
    });
    setDeleteCandidate(null);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-transparent">
              <Leaf />
            </Button>
            <h1 className="font-headline text-2xl font-bold text-primary">
              Evergreen Notes
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NoteList
            notes={sortedNotes}
            selectedNoteId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onCreateNote={handleCreateNote}
          />
        </SidebarContent>
        <SidebarFooter>
          <ProgressTracker />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b p-2 lg:p-4">
             <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-xl font-semibold truncate">
                  {selectedNote ? selectedNote.title : "Welcome"}
                </h2>
             </div>
          </header>
          <NoteEditor
            key={selectedNote?.id || "welcome"}
            note={selectedNote}
            onSave={handleUpdateNote}
            onDeleteRequest={setDeleteCandidate}
          />
        </div>
      </SidebarInset>

      <AlertDialog open={!!deleteCandidate} onOpenChange={(open) => !open && setDeleteCandidate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCandidate && handleDeleteNote(deleteCandidate)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
