
"use client";

import React from 'react';
import { initialQuizTopics, quizQuestions, quizMotivationalMessages } from '@/lib/data';
import { Button } from './ui/button';
import { Plus, Search, ArrowLeft, ChevronDown, Sparkles, Loader2, FileUp, BookImage } from 'lucide-react';
import { Progress } from './ui/progress';
import type { Card as TopicCard, QuizQuestion, UserDetails } from '@/lib/types';
import QuestionCard from './QuestionCard';
import WritingQuestionCard from './WritingQuestionCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { FillInTheGapDialog } from './FillInTheGapDialog';
import { generateFillInTheGap } from '@/ai/flows/generate-fill-in-the-gap-flow';
import { ImportDialog } from './ImportDialog';
import type { QuizSource } from '@/app/page';
import VisualQuizView from './VisualQuizView';
import KinestheticQuizView from './KinestheticQuizView';
import ReadingWritingQuizView from './ReadingWritingQuizView';
import { PeriodicTableDialog } from './PeriodicTableDialog';

type MixedQuizQuestion = QuizQuestion & { format: 'MCQ' | 'Writing' | 'Fill-in-the-gap' };

const QuizSession = ({ source, onBack, userDetails, onQuizCompleted }: { source: NonNullable<QuizSource>, onBack: () => void, userDetails: UserDetails | null, onQuizCompleted: (score: number, total: number, topicId?: string) => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [quizFinished, setQuizFinished] = React.useState(false);
  const { toast } = useToast();
  const [isPeriodicTableOpen, setIsPeriodicTableOpen] = React.useState(false);
  const [mixedQuestions, setMixedQuestions] = React.useState<MixedQuizQuestion[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const message = quizMotivationalMessages[Math.floor(Math.random() * quizMotivationalMessages.length)];
      toast({
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{message}</span>
          </div>
        ),
        duration: 5000,
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [toast]);
  
   React.useEffect(() => {
    if (source.type === 'pre-made' && source.style === 'Mix') {
      const originalQuestions = quizQuestions[source.topic.id] || [];
      const shuffled = [...originalQuestions].sort(() => 0.5 - Math.random());
      
      const formats: ('MCQ' | 'Writing' | 'Fill-in-the-gap')[] = ['MCQ', 'Writing', 'Fill-in-the-gap'];
      
      const questionsWithFormats = shuffled.map((q, i) => ({
        ...q,
        format: formats[i % formats.length]
      }));

      // Find fill-in-the-gap questions and generate them
      const fillInTheGapQuestions = questionsWithFormats.filter(q => q.format === 'Fill-in-the-gap');
      if (fillInTheGapQuestions.length > 0) {
        generateFillInTheGap({ questions: fillInTheGapQuestions }).then(result => {
           const generatedMap = new Map(result.questions.map(q => [q.id, q]));
           const finalMixed = questionsWithFormats.map(q => {
             if (q.format === 'Fill-in-the-gap' && generatedMap.has(q.id)) {
               return { ...generatedMap.get(q.id)!, format: 'Fill-in-the-gap' };
             }
             return q;
           });
           setMixedQuestions(finalMixed);
        }).catch(err => {
            console.error("Failed to generate fill-in-the-gap questions for mix mode:", err);
            // Fallback: convert fill-in-the-gap to MCQ
            const finalMixed = questionsWithFormats.map(q => q.format === 'Fill-in-the-gap' ? {...q, format: 'MCQ'} : q);
            setMixedQuestions(finalMixed);
        });
      } else {
        setMixedQuestions(questionsWithFormats);
      }
    }
  }, [source]);

  if (source.type === 'style-based') {
    if (!userDetails?.learningStyle) {
       return (
         <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
            <p className="text-xl">Please set your learning style first.</p>
             <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
         </div>
       )
    }

    const quizProps = {
        title: source.deckTitle,
        deckId: source.deckId,
        onBack: onBack
    };

    let QuizComponent;
    switch(userDetails.learningStyle) {
        case 'Visual':
            QuizComponent = VisualQuizView;
            break;
        case 'Kinesthetic':
            QuizComponent = KinestheticQuizView;
            break;
        case 'Reading/Writing':
            QuizComponent = ReadingWritingQuizView;
            break;
        default:
             return (
                 <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-xl">The AI Quiz is not yet available for Auditory learners.</p>
                     <Button onClick={onBack} className="mt-4">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                 </div>
           );
    }
    return <QuizComponent {...quizProps} />
  }
  
  let questions: QuizQuestion[] | MixedQuizQuestion[];
  let title: string;
  let practiceStyle: string;

  if (source.type === 'pre-made') {
    questions = source.style === 'Mix' ? mixedQuestions : (quizQuestions[source.topic.id] || []);
    title = source.topic.title;
    practiceStyle = source.style;
  } else if (source.type === 'generated') {
    questions = source.questions;
    title = source.deckTitle;
    practiceStyle = 'MCQ';
  } else { // fill-in-the-gap
    questions = source.questions;
    title = `Fill in the Gap: ${source.topic.title}`;
    practiceStyle = source.style;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };
  
  const handleNextQuestion = () => {
     const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  }

  React.useEffect(() => {
    if (quizFinished) {
      onQuizCompleted(score, questions.length, source.type !== 'generated' ? source.topic.id : undefined);
    }
  }, [quizFinished, score, questions.length, source, onQuizCompleted]);
  
  
  if (quizFinished) {
    const percentage = questions.length > 0 ? ((score / questions.length) * 100).toFixed(0) : 0;
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">You scored {score} out of {questions.length}</p>
        <p className="text-4xl font-bold text-primary mb-6">{percentage}%</p>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
      </div>
    )
  }

  const renderQuestion = () => {
    if ((practiceStyle === 'Mix' && mixedQuestions.length === 0) || !currentQuestion || !userDetails) {
        return (
            <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-xl">
                    {!userDetails ? "Loading user details..." : practiceStyle === 'Mix' ? "Shuffling questions..." : "Loading..."}
                </p>
            </div>
        );
    }

    const questionFormat = practiceStyle === 'Mix' ? (currentQuestion as MixedQuizQuestion).format : practiceStyle;

    if (questionFormat === 'Writing' || questionFormat === 'Fill-in-the-gap') {
      return (
        <WritingQuestionCard
          question={currentQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          onNextQuestion={handleNextQuestion}
          learningStyle={userDetails.learningStyle || 'Visual'}
        />
      );
    }

    if (questionFormat === 'MCQ') {
      return (
        <QuestionCard
          question={currentQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          onNextQuestion={handleNextQuestion}
          learningStyle={userDetails.learningStyle || 'Visual'}
        />
      );
    }

    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-6">The "{practiceStyle}" practice mode is coming soon!</p>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
      </div>
    );
  };


  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Button variant="outline" onClick={() => setIsPeriodicTableOpen(true)}>
            <BookImage className="mr-2 h-4 w-4" />
            Periodic Table
        </Button>
      </div>
      {renderQuestion()}
      <PeriodicTableDialog isOpen={isPeriodicTableOpen} onClose={() => setIsPeriodicTableOpen(false)} />
    </div>
  );
};

type QuizViewProps = {
    quizSource?: QuizSource | null;
    userDetails: UserDetails | null;
    quizScores: Record<string, number>;
    onBack: () => void;
    onQuizCompleted: (score: number, total: number, topicId?: string) => void;
    onSelectTopic: (topic: TopicCard, style: string) => void;
    setQuizSource: React.Dispatch<React.SetStateAction<QuizSource>>;
}

const QuizView = ({ quizSource, setQuizSource, userDetails, quizScores, onBack, onQuizCompleted, onSelectTopic }: QuizViewProps) => {
  const [topics, setTopics] = React.useState(initialQuizTopics);
  const [isFillInTheGapDialogOpen, setIsFillInTheGapDialogOpen] = React.useState(false);
  const [fillInTheGapTopic, setFillInTheGapTopic] = React.useState<TopicCard | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const updatedTopics = initialQuizTopics.map(topic => ({
        ...topic,
        progress: quizScores[topic.id] !== undefined ? Math.round(quizScores[topic.id]) : -1,
        cardCount: quizQuestions[topic.id]?.length || 0,
    }));
    setTopics(updatedTopics);
  }, [quizScores]);

  const handlePracticeClick = (topic: TopicCard, style: string) => {
    if (style === 'Fill in the Gap') {
        setFillInTheGapTopic(topic);
        setIsFillInTheGapDialogOpen(true);
    } else {
        onSelectTopic(topic, style);
    }
  };

  const handleImportSelect = () => {
    setIsImportDialogOpen(true);
  }

  const handleFillInTheGapFormatSelect = async (format: 'MCQ' | 'Writing') => {
    setIsFillInTheGapDialogOpen(false);
    if (!fillInTheGapTopic) return;

    const originalQuestions = quizQuestions[fillInTheGapTopic.id];
    if (!originalQuestions || originalQuestions.length === 0) {
        toast({ title: "No questions available for this topic.", variant: "destructive"});
        return;
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        toast({
            variant: "destructive",
            title: "AI Feature Disabled",
            description: "Please add your Gemini API key to the .env file to use this feature.",
        });
        return;
    }

    setIsGenerating(true);
    try {
        const result = await generateFillInTheGap({ questions: originalQuestions });
        if (result.questions && result.questions.length > 0) {
            setQuizSource({
                type: 'fill-in-the-gap',
                topic: fillInTheGapTopic,
                questions: result.questions,
                style: format,
            });
        } else {
            throw new Error("AI failed to generate fill-in-the-gap questions.");
        }
    } catch (error: any) {
        console.error("Failed to generate fill-in-the-gap quiz:", error);
        const errorMessage = error.message || "Could not generate quiz. Please try again.";
        toast({ title: "Generation Failed", description: errorMessage, variant: "destructive" });
    } finally {
        setIsGenerating(false);
        setFillInTheGapTopic(null);
    }
  }

  const handleCloseDialog = () => {
    setIsFillInTheGapDialogOpen(false);
    setFillInTheGapTopic(null);
  };
  
  if (isGenerating) {
    return (
        <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-bold">Generating your quiz...</h2>
            <p className="text-muted-foreground">The AI is creating your questions, please wait.</p>
        </div>
    )
  }

  if (quizSource) {
    return <QuizSession source={quizSource} onBack={onBack} userDetails={userDetails} onQuizCompleted={onQuizCompleted} />
  }

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Quizzes</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleImportSelect}>
              <FileUp className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button onClick={() => onSelectTopic(topics[Math.floor(Math.random() * topics.length)], 'MCQ')}>Start Random Quiz</Button>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="flex flex-col text-left transition-colors"
            >
              <CardHeader>
                  <CardTitle className="truncate text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                  <div className="text-sm text-muted-foreground mt-auto">
                      <div className="flex justify-between items-center">
                          <span>{topic.cardCount > 0 ? `${topic.cardCount} questions` : 'No questions'}</span>
                          {topic.progress >= 0 && (
                          <span className="font-semibold">{topic.progress}%</span>
                          )}
                      </div>
                      {topic.progress >= 0 && (
                          <Progress value={topic.progress} className="h-2 mt-2" />
                      )}
                  </div>
              </CardContent>
              <CardFooter>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">
                              Practice
                              <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                          <DropdownMenuItem onClick={() => handlePracticeClick(topic, 'MCQ')}>MCQ</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePracticeClick(topic, 'Writing')}>Writing</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePracticeClick(topic, 'Fill in the Gap')}>Fill in the Gap</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePracticeClick(topic, 'Mix')}>Mix</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePracticeClick(topic, 'Flashcard Form')}>Flashcard Form</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <FillInTheGapDialog 
        isOpen={isFillInTheGapDialogOpen}
        onClose={handleCloseDialog}
        onSelectFormat={handleFillInTheGapFormatSelect}
      />
      <ImportDialog
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
      />
    </>
  );
};

export default QuizView;

    

