
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
import { FlaskConical, Sparkles, LogOut, Clock, BookOpen } from "lucide-react";
import DeckList from "@/components/DeckList";
import ProgressTracker from "@/components/ProgressTracker";
import type { Deck, UserDetails, Card as TopicCard, QuizQuestion, Note, DailyActivity } from "@/lib/types";
import { initialDecks, initialQuizTopics } from "@/lib/data";
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
import { useUser, useAuth, useFirestore, setDocumentNonBlocking, useCollection, useMemoFirebase } from "@/firebase";
import { signOut } from "firebase/auth";
import { collection, doc } from 'firebase/firestore';
import { QuizSelectionDialog } from "@/components/QuizSelectionDialog";
import { format, isSameDay, parseISO, subDays, differenceInCalendarDays } from "date-fns";


type ActiveView = "dashboard" | "learning-style" | "quizzes" | "friends" | "account";
type AuthView = 'login' | 'signup';
type QuizSource = {
  type: 'pre-made',
  topic: TopicCard,
  style: string
} | {
  type: 'generated',
  deckTitle: string,
  questions: QuizQuestion[]
} | {
    type: 'fill-in-the-gap',
    topic: TopicCard,
    questions: QuizQuestion[],
    style: 'MCQ' | 'Writing'
} | null;

const LiveClock = () => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        </div>
    );
};

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
  const [isQuizDialogVisible, setIsQuizDialogVisible] = React.useState(false);
  const [quizSource, setQuizSource] = React.useState<QuizSource | null>(null);
  const { toast } = useToast();
  const [dailyActivity, setDailyActivity] = React.useState<Record<string, DailyActivity>>({});
  const [quizScores, setQuizScores] = React.useState<Record<string, number>>({});


  const notesCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/notes`);
  }, [user, firestore]);

  const { data: notes, isLoading: isNotesLoading } = useCollection<Note>(notesCollectionRef);
  
  // Load quiz scores from local storage
    React.useEffect(() => {
        if (user) {
            const scoresKey = `quizScores-${user.uid}`;
            const scores = JSON.parse(localStorage.getItem(scoresKey) || '{}');
            setQuizScores(scores);
        }
    }, [user]);
  
  // Activity tracking
    React.useEffect(() => {
        if (!user) return;

        const today = format(new Date(), 'yyyy-MM-dd');
        const activityKey = `dailyActivity-${user.uid}`;
        
        const allActivity: Record<string, DailyActivity> = JSON.parse(localStorage.getItem(activityKey) || '{}');
        setDailyActivity(allActivity);

        let lastActivityTime = Date.now();

        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
        const handleActivity = () => {
            lastActivityTime = Date.now();
        };

        activityEvents.forEach(event => window.addEventListener(event, handleActivity));

        const interval = setInterval(() => {
            // Only update duration if user has been active in the last minute
            if (Date.now() - lastActivityTime < 60000) {
                 setDailyActivity(prev => {
                    const current = { ...prev };
                    const todayActivity = current[today] || { duration: 0, tasks: {} };
                    todayActivity.duration += 1; // Add 1 minute
                    current[today] = todayActivity;
                    localStorage.setItem(activityKey, JSON.stringify(current));
                    return current;
                });
            }
        }, 60000); // every minute

        return () => {
            clearInterval(interval)
            activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
        };
    }, [user]);

    const markTaskComplete = React.useCallback((taskId: string) => {
        if (!user) return;
        const today = format(new Date(), 'yyyy-MM-dd');
        const activityKey = `dailyActivity-${user.uid}`;
        
        setDailyActivity(prev => {
            const current = { ...prev };
            const todayActivity = current[today] || { duration: 0, tasks: {} };
            if (!todayActivity.tasks[taskId]) {
                todayActivity.tasks[taskId] = true;
                current[today] = todayActivity;
                localStorage.setItem(activityKey, JSON.stringify(current));
            }
            return current;
        });
    }, [user]);

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

  const handleCreateDeck = React.useCallback(() => {
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
     markTaskComplete('createDeck');
  }, [toast, markTaskComplete]);

  const handleSelectDeck = React.useCallback((id: string) => {
    setSelectedDeckId(id);
    setActiveView("dashboard");
  }, []);

  const handleGoHome = React.useCallback(() => {
    setSelectedDeckId(null);
    setActiveView("dashboard");
    setQuizSource(null);
  }, []);
  
  const handleNavigate = React.useCallback((view: ActiveView) => {
    setActiveView(view);
    setSelectedDeckId(null);
    setQuizSource(null);
  }, []);

  const handleRenameDeck = React.useCallback((deckId: string, newTitle: string) => {
    setDecks(decks.map(d => d.id === deckId ? {...d, title: newTitle} : d));
    toast({
      title: "Deck Renamed",
      description: `The deck has been renamed to "${newTitle}".`,
    });
  }, [decks, toast]);

  const handleDeleteDeck = React.useCallback((deckId: string) => {
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
  }, [decks, toast, selectedDeckId]);

  const handleOnboardingComplete = React.useCallback((details: UserDetails) => {
    setUserDetails(details);
    if (details.learningStyle) {
      setLearnerType(details.learningStyle);
    }
    // Save user details against their UID
    localStorage.setItem(`userDetails-${details.id}`, JSON.stringify(details));
  }, []);
  
  const handleLogin = React.useCallback((details: UserDetails) => {
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
  }, [toast]);

  const handleLogout = React.useCallback(() => {
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
  }, [auth, userDetails, toast]);
  
  const handleUpdateUserDetails = React.useCallback((updatedDetails: UserDetails | null) => {
    setUserDetails(updatedDetails);
    if(updatedDetails && updatedDetails.id) {
        localStorage.setItem(`userDetails-${updatedDetails.id}`, JSON.stringify(updatedDetails));
        if(updatedDetails.learningStyle) {
          setLearnerType(updatedDetails.learningStyle);
        }
        if (firestore) {
            const userDocRef = doc(firestore, "users", updatedDetails.id);
            setDocumentNonBlocking(userDocRef, updatedDetails, { merge: true });
        }
    }
  }, [firestore]);

  const handleStartQuizFromDashboard = React.useCallback((topic: TopicCard, style: string = 'MCQ') => {
    setQuizSource({ type: 'pre-made', topic, style });
    setActiveView('quizzes');
    setIsQuizDialogVisible(false);
    markTaskComplete('startQuiz');
  }, [markTaskComplete]);
  
  const handleStartQuizzing = React.useCallback((topic?: TopicCard) => {
    if (topic) {
        handleStartQuizFromDashboard(topic);
    } else {
        setIsQuizDialogVisible(true);
    }
  }, [handleStartQuizFromDashboard]);
  
  const handleGeneratedQuiz = React.useCallback((questions: QuizQuestion[], deckTitle: string) => {
    setQuizSource({ type: 'generated', questions, deckTitle });
    setActiveView('quizzes');
    setSelectedDeckId(null);
    markTaskComplete('startQuiz');
  }, [markTaskComplete]);

  const handleQuizCompleted = React.useCallback((score: number, total: number, topicId?: string) => {
      if (score / total >= 0.8) {
          markTaskComplete('aceQuiz');
      }
       if (user && topicId) {
          const percentage = (score / total) * 100;
          const scoresKey = `quizScores-${user.uid}`;
          const existingScores = JSON.parse(localStorage.getItem(scoresKey) || '{}');
          const updatedScores = {
              ...existingScores,
              [topicId]: percentage
          };
          localStorage.setItem(scoresKey, JSON.stringify(updatedScores));
          setQuizScores(updatedScores);
      }
  }, [user, markTaskComplete]);


  const selectedDeck = React.useMemo(() => {
    return decks.find((deck) => deck.id === selectedDeckId);
  }, [decks, selectedDeckId]);
  
  const currentStreak = React.useMemo(() => {
    const activityDates = Object.keys(dailyActivity)
      .map(dateStr => parseISO(dateStr))
      .filter(date => {
          const activity = dailyActivity[format(date, 'yyyy-MM-dd')];
          return activity && (activity.duration > 0 || Object.keys(activity.tasks).length > 0);
      })
      .sort((a, b) => b.getTime() - a.getTime());

    if (activityDates.length === 0) return 0;
    
    const today = new Date();
    const lastActivityDate = activityDates[0];

    // If there was no activity today or yesterday, streak is broken.
    if (differenceInCalendarDays(today, lastActivityDate) > 1) {
      return 0;
    }

    let streak = isSameDay(lastActivityDate, today) || isSameDay(lastActivityDate, subDays(today, 1)) ? 1 : 0;
    if (streak === 0) return 0;

    // Go through the rest of the activity dates
    for (let i = 0; i < activityDates.length - 1; i++) {
        const currentDay = activityDates[i];
        const nextDay = activityDates[i+1];
        
        if (differenceInCalendarDays(currentDay, nextDay) === 1) {
            streak++;
        } else {
            // If there's a gap bigger than 1 day, the streak is broken.
            break;
        }
    }
    
    return streak;
  }, [dailyActivity]);

  const decksCompleted = React.useMemo(() => {
    return initialDecks.filter(deck => {
        const deckTopicIds = deck.cards.map(c => c.id);
        if (deckTopicIds.length === 0) return false;
        return deckTopicIds.every(id => quizScores[id] >= 80);
    }).length;
  }, [quizScores]);

  const topicsMastered = React.useMemo(() => {
    return Object.values(quizScores).filter(score => score >= 80).length;
  }, [quizScores]);

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
    if (selectedDeck && activeView === 'dashboard') {
      return <DeckView deck={selectedDeck} onQuiz={handleGeneratedQuiz} userDetails={userDetails} onNoteAdded={() => markTaskComplete('addNote')} />;
    }

    switch (activeView) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 h-full">
            <div className="lg:col-span-2">
              <StreakTracker onStartQuizzing={handleStartQuizzing} dailyActivity={dailyActivity} streak={currentStreak} />
            </div>
            <div className="lg:col-span-1 h-full">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="pr-4">
                  <ProgressTracker 
                    mainView={true} 
                    streak={currentStreak}
                    decksCompleted={decksCompleted}
                    topicsMastered={topicsMastered}
                  />
                  <MotivationalMessage />
                </div>
              </ScrollArea>
            </div>
          </div>
        );
      case "learning-style":
        return <LearningStyle learnerType={learnerType} setLearnerType={setLearnerType} />;
      case "quizzes":
        return <QuizView 
            quizSource={quizSource}
            setQuizSource={setQuizSource}
            userDetails={userDetails} 
            quizScores={quizScores}
            onBack={() => {
              setQuizSource(null);
              setActiveView('dashboard');
            }} 
            onQuizCompleted={handleQuizCompleted}
            onSelectTopic={handleStartQuizFromDashboard}
        />;
      case "friends":
        return <FriendsView />;
      case "account":
        return <MyAccountView userDetails={userDetails} setUserDetails={handleUpdateUserDetails} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (selectedDeck && activeView === 'dashboard') return selectedDeck.title;
    if (activeView === 'quizzes') {
        if (quizSource?.type === 'pre-made') return quizSource.topic.title;
        if (quizSource?.type === 'generated') return `Quiz: ${quizSource.deckTitle}`;
        if (quizSource?.type === 'fill-in-the-gap') return `Fill in the Gap: ${quizSource.topic.title}`;
        return 'Quizzes';
    }
    switch (activeView) {
      case 'dashboard': return 'Titra';
      case 'learning-style': return 'Learning Style';
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
          {/* ProgressTracker removed from here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b p-2 lg:p-4">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-xl font-semibold truncate">
                  {getTitle()}
                </h2>
             </div>
             <div className="flex items-center gap-4">
                <LiveClock />
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </SidebarInset>
      <QuizSelectionDialog 
        isOpen={isQuizDialogVisible}
        onClose={() => setIsQuizDialogVisible(false)}
        onSelectTopic={handleStartQuizFromDashboard}
      />
    </SidebarProvider>
  );
}
