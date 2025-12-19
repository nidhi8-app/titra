
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
import { FlaskConical, Sparkles, LogOut } from "lucide-react";
import DeckList from "@/components/DeckList";
import ProgressTracker from "@/components/ProgressTracker";
import type { Deck, UserDetails } from "@/lib/types";
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
import MyAccountView from "@/components/MyAccountView";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { useUser, useAuth, useFirestore, setDocumentNonBlocking } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc } from 'firebase/firestore';


type ActiveView = "dashboard" | "learning-style" | "quizzes" | "friends" | "account";
type AuthView = 'login' | 'signup';

export default function Home() {
  const [decks, setDecks] = React.useState<Deck[]>(initialDecks);
  const [selectedDeckId, setSelectedDeckId] = React.useState<string | null>(
    null
  );
  const [activeView, setActiveView] = React.useState<ActiveView>("dashboard");
  const [learnerType, setLearnerType] = React.useState("Visual");
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const [isAppLoaded, setIsAppLoaded] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
  const [authView, setAuthView] = React.useState<AuthView>('signup');
  const { toast } = useToast();
  
  React.useEffect(() => {
    // We wait for the user state to be determined.
    if (!isUserLoading) {
      if (user) {
        // User is authenticated
        const savedDetails = localStorage.getItem(`userDetails-${user.uid}`);
        if (savedDetails) {
          const userDetails = JSON.parse(savedDetails);
          setUserDetails(userDetails);
          if (userDetails.learningStyle) {
            setLearnerType(userDetails.learningStyle);
          }
        }
      }
      setIsAppLoaded(true);
    }
  }, [user, isUserLoading]);

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

  const handleOnboardingComplete = (details: UserDetails) => {
    setUserDetails(details);
    if (details.learningStyle) {
      setLearnerType(details.learningStyle);
    }
    // Save user details against their UID
    localStorage.setItem(`userDetails-${details.id}`, JSON.stringify(details));
  };
  
  const handleLogin = (details: UserDetails) => {
    setUserDetails(details);
    if (details.learningStyle) {
      setLearnerType(details.learningStyle);
    }
    // onboardingComplete is likely already true, but we set it just in case
    localStorage.setItem(`userDetails-${details.id}`, JSON.stringify(details));
    toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
    });
  }

  const handleLogout = () => {
    if (userDetails?.email) {
      localStorage.setItem('lastUserEmail', userDetails.email);
    }
    signOut(auth).then(() => {
        setUserDetails(null);
        setAuthView('login');
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    });
  };
  
  const handleUpdateUserDetails = (updatedDetails: UserDetails | null) => {
    setUserDetails(updatedDetails);
    if(updatedDetails && updatedDetails.id) {
        localStorage.setItem(`userDetails-${updatedDetails.id}`, JSON.stringify(updatedDetails));
        if(updatedDetails.learningStyle) {
          setLearnerType(updatedDetails.learningStyle);
        }
        const userDocRef = doc(firestore, "users", updatedDetails.id);
        setDocumentNonBlocking(userDocRef, updatedDetails, { merge: true });
    }
  }


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
      case 'Reading/Writing':
      case 'Visual':
      default:
        document.body.classList.add('theme-visual');
        break;
    }
  }, [learnerType]);

  if (!isAppLoaded) {
    return null; // or a loading spinner
  }
  
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
      case "account":
        return <MyAccountView userDetails={userDetails} setUserDetails={handleUpdateUserDetails} />;
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
      case 'account': return 'My Account';
      default: return 'Titra';
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="relative">
            <FlaskConical className="w-12 h-12 text-primary" />
            <Sparkles className="absolute -top-1 -right-2 w-7 h-7 text-yellow-300" />
          </div>
          <h1 className="font-headline text-5xl font-bold text-primary">
            Titra
          </h1>
        </div>
        {authView === 'signup' ? (
          <Onboarding onComplete={handleOnboardingComplete} setAuthView={setAuthView} />
        ) : (
          <Login onLogin={handleLogin} setAuthView={setAuthView} />
        )}
      </div>
    );
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
             <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
             </Button>
          </header>
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
