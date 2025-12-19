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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { FlaskConical, Sparkles } from "lucide-react";
import DeckList from "@/components/DeckList";
import ProgressTracker from "@/components/ProgressTracker";
import type { Deck } from "@/lib/types";
import { initialDecks } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import DeckView from "@/components/DeckView";
import StreakTracker from "@/components/StreakTracker";
import MotivationalMessage from "@/components/MotivationalMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavMenu from "@/components/NavMenu";
import LearningStyle from "@/components/LearningStyle";
import QuizView from "@/components/QuizView";
import FriendsView from "@/components/FriendsView";
import Onboarding from "@/components/Onboarding";

type ActiveView = "dashboard" | "learning-style" | "quizzes" | "friends";

export default function Home() {
  const [decks, setDecks] = React.useState<Deck[]>(initialDecks);
  const [selectedDeckId, setSelectedDeckId] = React.useState<string | null>(
    null
  );
  const [activeView, setActiveView] = React.useState<ActiveView>("dashboard");
  const [learnerType, setLearnerType] = React.useState("Visual");
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState(false);
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
    setActiveView("dashboard");
  };

  const handleGoHome = () => {
    setSelectedDeckId(null);
    setActiveView("dashboard");
  };
  
  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    setSelectedDeckId(null);
  };

  const handleRenameDeck = (deckId: string, newTitle: string) => {
    setDecks(decks.map(d => d.id === deckId ? {...d, title: newTitle} : d));
    toast({
      title: "Deck Renamed",
      description: `The deck has been renamed to "${newTitle}".`,
    });
  };

  const handleDeleteDeck = (deckId: string) => {
    const deletedDeck = decks.find(d => d.id === deckId);
    if (!deletedDeck) return;

    setDecks(decks.filter(d => d.id !== deckId));
    if (selectedDeckId === deckId) {
      setSelectedDeckId(null);
    }
    toast({
      title: "Deck Deleted",
      description: `The deck "${deletedDeck.title}" has been deleted.`,
      variant: 'destructive',
    });
  };

  const selectedDeck = React.useMemo(() => {
    return decks.find((deck) => deck.id === selectedDeckId);
  }, [decks, selectedDeckId]);
  
  React.useEffect(() => {
    document.body.classList.remove("theme-visual", "theme-auditory", "theme-kinesthetic");
    switch (learnerType) {
      case 'Auditory':
        document.body.classList.add('theme-auditory');
        break;
      case 'Kinesthetic':
        document.body.classList.add('theme-kinesthetic');
        break;
      // Add cases for other learner types here
      default:
        document.body.classList.add('theme-visual');
        break;
    }
  }, [learnerType]);
  
  const renderContent = () => {
    if (selectedDeck) {
      return <DeckView deck={selectedDeck} />;
    }

    switch (activeView) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 h-full">
            <div className="lg:col-span-2">
              <StreakTracker />
            </div>
            <div className="lg:col-span-1 h-full">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="pr-4">
                  <ProgressTracker mainView={true} />
                  <MotivationalMessage />
                </div>
              </ScrollArea>
            </div>
          </div>
        );
      case "learning-style":
        return <LearningStyle learnerType={learnerType} setLearnerType={setLearnerType} />;
      case "quizzes":
        return <QuizView />;
      case "friends":
        return <FriendsView />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (selectedDeck) return selectedDeck.title;
    switch (activeView) {
      case 'dashboard': return 'Titra';
      case 'learning-style': return 'Learning Style';
      case 'quizzes': return 'Quizzes';
      case 'friends': return 'Friends';
      default: return 'Titra';
    }
  }

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={() => setIsOnboardingComplete(true)} />;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 items-center">
          <button onClick={handleGoHome} className="flex items-center gap-2 text-left">
            <div className="relative">
              <FlaskConical className="w-8 h-8 text-primary" />
              <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-yellow-300" />
            </div>
            <h1 className="font-headline text-2xl font-bold text-primary">
              Titra
            </h1>
          </button>
        </SidebarHeader>
        <SidebarContent>
          <div className="p-2">
            <NavMenu activeView={activeView} onNavigate={handleNavigate} />
          </div>
          <SidebarSeparator />
          <DeckList
            decks={decks}
            selectedDeckId={selectedDeckId}
            onSelectDeck={handleSelectDeck}
            onCreateDeck={handleCreateDeck}
            onRenameDeck={handleRenameDeck}
            onDeleteDeck={handleDeleteDeck}
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
                  {getTitle()}
                </h2>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
