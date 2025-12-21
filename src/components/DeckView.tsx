
"use client";

import React, { useState, useMemo } from 'react';
import type { Deck, Note, QuizQuestion, UserDetails } from '@/lib/types';
import { Button } from './ui/button';
import { BrainCircuit, Loader2, Lightbulb, BookOpen, Mic, Footprints, MessageSquare, Play, Pause, RotateCcw } from 'lucide-react';
import NoteCard from './NoteCard';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Slider } from './ui/slider';

type DeckViewProps = {
  deck: Deck;
  onQuiz: (questions: QuizQuestion[], deckTitle: string) => void;
  userDetails: UserDetails | null;
  onNoteAdded: () => void;
};

const PodcastPlayer = ({ title }: { title: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(30);

    return (
        <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <Mic className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-sm text-muted-foreground">Titra Podcasts</p>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-mono">1:24</span>
                <Slider 
                    value={[progress]} 
                    onValueChange={(value) => setProgress(value[0])} 
                    max={100} 
                    step={1} 
                />
                <span className="text-xs font-mono">4:10</span>
            </div>
            <div className="mt-4 flex justify-center items-center gap-4">
                <Button variant="ghost" size="icon">
                    <RotateCcw className="w-5 h-5" />
                </Button>
                <Button size="lg" className="rounded-full w-16 h-16" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                 <Button variant="ghost" size="icon">
                    <RotateCcw className="w-5 h-5 scale-x-[-1]" />
                </Button>
            </div>
        </div>
    );
};


const LearningStyleContent = ({ notes, learningStyle, deckTitle }: { notes: Note[], learningStyle: string, deckTitle: string }) => {
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
        return <PodcastPlayer title={deckTitle} />;
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
  
  const { data: deckNotes, isLoading } = useCollection<Note>(notesQuery);

  const handleGenerateQuiz = async () => {
    if (!deckNotes || deckNotes.length === 0) {
      toast({
        variant: "destructive",
        title: "Cannot generate quiz",
        description: "There are no notes in this deck to generate a quiz from.",
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
      if (error.message.includes('API key not valid')) {
        toast({
            variant: "destructive",
            title: "Google AI API Key is Not Set",
            description: "Please set your GEMINI_API_KEY in the .env file to use this feature.",
        });
      } else {
        toast({
            variant: "destructive",
            title: "Quiz Generation Failed",
            description: "There was an error generating the quiz. Please try again.",
        });
      }
    } finally {
      setIsGeneratingQuiz(false);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
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
