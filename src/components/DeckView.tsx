
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Lightbulb, BookOpen, Mic, Footprints, MessageSquare } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { generatePodcast } from '@/ai/flows/generate-podcast-flow';
import type { GeneratePodcastOutput } from '@/ai/flows/generate-podcast-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { initialNotesData, type InitialNoteSeed } from '@/lib/initial-notes';


type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const NotesSummary = ({ notesText }: { notesText: string }) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Topic Notes</CardTitle>
                <CardDescription>A quick overview of the key points in this deck.</CardDescription>
            </CardHeader>
            <CardContent>
                {!notesText && <p className="text-destructive text-sm">There are no notes to display.</p>}
                {notesText && (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {notesText}
                    </div>
                )}
            </CardContent>
        </Card>
    )
};


const PodcastPlayer = ({ title, notesText }: { title: string, notesText: string }) => {
    const [podcast, setPodcast] = useState<GeneratePodcastOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const generateAudio = async () => {
            if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
                setError("The AI podcast feature is disabled. Please add your Gemini API key to the .env file to enable it.");
                setIsLoading(false);
                return;
            }

            if (!notesText) {
                setError("There are no notes to generate a podcast from.");
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            setError(null);

            try {
                const result = await generatePodcast(notesText);
                if (result.media) {
                    setPodcast(result);
                } else {
                    throw new Error("AI did not return any audio.");
                }
            } catch (err: any) {
                console.error("Failed to generate podcast:", err);
                const errorMessage = err.message || "Could not generate audio at this time.";
                setError(errorMessage);
                toast({
                    variant: "destructive",
                    title: "Podcast Generation Failed",
                    description: errorMessage,
                });
            } finally {
                setIsLoading(false);
            }
        };

        generateAudio();
    }, [notesText, toast]);

    return (
        <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <Mic className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-sm text-muted-foreground">Titra Podcasts</p>
                </div>
            </div>
            
            {isLoading && (
                <div className="flex items-center justify-center h-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Generating your podcast...</p>
                </div>
            )}
            
            {error && (
                 <div className="flex items-center justify-center h-24 text-destructive text-sm px-4 text-center">
                    <p>{error}</p>
                 </div>
            )}

            {!isLoading && !error && podcast?.media && (
                <audio controls className="w-full">
                    <source src={podcast.media} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};


const LearningStyleContent = ({ notes, learningStyle, deckTitle }: { notes: (Note | InitialNoteSeed)[], learningStyle: string, deckTitle: string }) => {
  const combinedNotes = useMemo(() => notes.map(n => `### ${n.title}\n\n${n.body}`).join('\n\n---\n\n'), [notes]);

  const styleInfo = {
    "Visual": { icon: Lightbulb, description: "Visual learners prefer using images, diagrams, and spatial understanding. Here are your notes presented as a structured document." },
    "Auditory": { icon: Mic, description: "Auditory learners prefer listening and speaking. Plug in and listen to this podcast episode covering the key concepts." },
    "Kinesthetic": { icon: Footprints, description: "Kinesthetic learners prefer hands-on experience and application. Read through these notes as steps in a process or real-world examples." },
    "Reading/Writing": { icon: BookOpen, description: "Reading/Writing learners prefer text-based information. Here are your notes, organized for clarity and review." },
  };

  const { icon: Icon, description } = styleInfo[learningStyle as keyof typeof styleInfo] || styleInfo["Reading/Writing"];

  const renderLearningContent = () => {
    if (learningStyle === 'Auditory') {
        return <PodcastPlayer title={deckTitle} notesText={combinedNotes} />;
    }

    return (
         <ScrollArea className="h-72 border rounded-md p-4 bg-muted/20">
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {combinedNotes}
              </div>
          </ScrollArea>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Icon className="w-6 h-6" />
            Learn: {learningStyle} Style
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          {renderLearningContent()}
      </CardContent>
    </Card>
  )
}

const DeckView = ({ deck, onQuiz, userDetails }: DeckViewProps) => {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const { toast } = useToast();

  const notesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/notes`),
      where('deckId', '==', deck.id)
    );
  }, [user, firestore, deck.id]);
  
  const { data: userNotes, isLoading } = useCollection<Note>(notesQuery);

  const deckNotes = useMemo(() => {
    const initial = initialNotesData[deck.id] || [];
    if (isLoading) {
      return initial;
    }
    // If firestore has notes, use them. Otherwise, fall back to initial notes.
    // This handles the case where a user has added their own notes.
    if (userNotes && userNotes.length > 0) {
      return userNotes;
    }
    return initial;
  }, [deck.id, userNotes, isLoading]);
  
  const combinedNotesText = useMemo(() => {
    if (!deckNotes) return "";
    return deckNotes.map(n => `### ${n.title}\n\n${n.body}`).join('\n\n---\n\n');
  }, [deckNotes]);


  const handleGenerateQuiz = async () => {
    if (!deckNotes || deckNotes.length === 0) {
      toast({
        variant: "destructive",
        title: "Cannot generate quiz",
        description: "There are no notes in this deck to generate a quiz from.",
      });
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        toast({
            variant: "destructive",
            title: "AI Feature Disabled",
            description: "Please add your Gemini API key to the .env file to generate a quiz.",
        });
        return;
    }
    
    if (!userDetails?.learningStyle) {
      toast({
        variant: "destructive",
        title: "Learning style not set",
        description: "Please set your learning style in the 'Learning Style' tab before generating a quiz.",
      });
      return;
    }

    setIsGeneratingQuiz(true);
    try {
      const notesContent = deckNotes.map(n => `Title: ${n.title}\nBody: ${n.body}`).join('\n\n---\n\n');
      const result = await generateQuiz({
        notes: notesContent,
        learningStyle: userDetails.learningStyle,
      });

      if (result.questions && result.questions.length > 0) {
        onQuiz(result.questions, deck.title);
      } else {
        throw new Error("AI did not return any questions.");
      }
    } catch (error: any) {
      console.error("Failed to generate quiz:", error);
      const errorMessage = error.message || "There was an error generating the quiz. Please try again.";
      toast({
          variant: "destructive",
          title: "Quiz Generation Failed",
          description: errorMessage,
      });
    } finally {
      setIsGeneratingQuiz(false);
    }
  };
  
  const renderContent = () => {
    if (isLoading && !userNotes) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!deckNotes || deckNotes.length === 0) {
      return (
        <div className="text-center col-span-full py-16">
          <h3 className="mt-4 text-lg font-semibold">This deck is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add some notes to get started.</p>
        </div>
      );
    }

    return (
        <div className="space-y-6">
            <NotesSummary notesText={combinedNotesText} />
            <LearningStyleContent notes={deckNotes} learningStyle={userDetails?.learningStyle || 'Reading/Writing'} deckTitle={deck.title} />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="w-6 h-6" />
                        Quiz Me
                    </CardTitle>
                    <CardDescription>Test your knowledge with a quiz tailored to your learning style.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button onClick={handleGenerateQuiz} disabled={isGeneratingQuiz} className="w-full" size="lg">
                        {isGeneratingQuiz ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           <MessageSquare className="mr-2 h-4 w-4" />
                        )}
                        Generate Quiz
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {renderContent()}
    </div>
  );
};

export default DeckView;
