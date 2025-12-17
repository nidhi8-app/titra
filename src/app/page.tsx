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
import { FlaskConical, Sparkles } from "lucide-react";
import DeckList from "@/components/DeckList";
import ProgressTracker from "@/components/ProgressTracker";
import type { Deck } from "@/lib/types";
import { initialDecks } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import DeckView from "@/components/DeckView";

export default function Home() {
  const [decks, setDecks] = React.useState<Deck[]>(initialDecks);
  const [selectedDeckId, setSelectedDeckId] = React.useState<string | null>(
    null
  );
  const { toast } = useToast();

  const handleCreateDeck = () => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      title: "New Deck",
      cards: [],
    };
    setDecks((prev) => [newDeck, ...prev]);
    setSelectedDeckId(newDeck.id);
    toast({
      title: "Deck Created",
      description: "A new deck has been added.",
    });
  };

  const handleSelectDeck = (id: string) => {
    setSelectedDeckId(id);
  };

  const selectedDeck = React.useMemo(() => {
    return decks.find((deck) => deck.id === selectedDeckId);
  }, [decks, selectedDeckId]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <FlaskConical className="w-8 h-8 text-primary" />
              <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-yellow-300" />
            </div>
            <h1 className="font-headline text-2xl font-bold text-primary">
              Titra
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DeckList
            decks={decks}
            selectedDeckId={selectedDeckId}
            onSelectDeck={handleSelectDeck}
            onCreateDeck={handleCreateDeck}
          />
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b p-2 lg:p-4">
             <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-xl font-semibold truncate">
                  {selectedDeck ? selectedDeck.title : "Titra"}
                </h2>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {selectedDeck ? (
              <DeckView deck={selectedDeck} />
            ) : (
              <ProgressTracker mainView={true} />
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
