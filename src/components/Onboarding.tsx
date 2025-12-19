
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import type { UserDetails } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { learningStyleQuestions } from '@/lib/quiz-data';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  yearGroup: z.string().min(1, { message: 'Year group is required.' }),
  email: z.string().email({ message: "Please enter a valid email."}),
  password: z.string().min(6, { message: "Password must be at least 6 characters."}),
  schoolName: z.string().min(1, { message: 'School name is required.' }),
  curriculum: z.string().min(1, { message: 'Curriculum is required.' }),
});

type UserDetailsFormProps = {
  onNext: (data: Omit<UserDetails, 'id' | 'learningStyle' | 'avatarUrl' | 'friends'>, password: string) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const UserDetailsForm = ({ onNext, setAuthView }: UserDetailsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      yearGroup: '',
      email: '',
      password: '',
      schoolName: '',
      curriculum: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, ...userDetails } = values;
    onNext(userDetails, password);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Titra!</CardTitle>
        <CardDescription>First, let's get to know you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="16" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Group</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Year 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., North London Collegiate School" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="curriculum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curriculum</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., IB Diploma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Next</Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex-col gap-4 text-sm">
        <p>
          Already have an account?{' '}
          <Button variant="link" className="p-0 h-auto" onClick={() => setAuthView('login')}>
            Log in here
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

const LearningStyleQuiz = ({ onComplete }: { onComplete: (style: string) => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const currentQuestion = learningStyleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / learningStyleQuestions.length) * 100;

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = {...answers, [currentQuestionIndex]: selectedOption};
      setAnswers(newAnswers);
      setSelectedOption(undefined);

      if (currentQuestionIndex < learningStyleQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResult(newAnswers);
      }
    }
  };

  const calculateResult = (finalAnswers: {[key: number]: string}) => {
    const counts = { V: 0, A: 0, R: 0, K: 0 };
    Object.values(finalAnswers).forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    const dominantStyle = Object.keys(counts).reduce((a, b) => 
      counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
    );
    
    const mapVarkToStyle: { [key: string]: string } = {
        V: "Visual",
        A: "Auditory",
        R: "Reading/Writing",
        K: "Kinesthetic",
    };

    onComplete(mapVarkToStyle[dominantStyle]);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
           <CardTitle>What's your learning style?</CardTitle>
           <span className="text-sm text-muted-foreground">{currentQuestionIndex + 1} / {learningStyleQuestions.length}</span>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
        <RadioGroup onValueChange={setSelectedOption} value={selectedOption}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
              <RadioGroupItem value={option.type} id={`q${currentQuestionIndex}-o${index}`} />
              <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 text-base">{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col items-end gap-4">
        <Button onClick={handleNext} disabled={!selectedOption}>
            {currentQuestionIndex < learningStyleQuestions.length - 1 ? 'Next' : 'Finish'}
        </Button>
        <p className="text-xs text-muted-foreground self-center">
            This quiz is based on the VARK model.
        </p>
      </CardFooter>
  </Card>
  );
};


type OnboardingProps = {
  onComplete: (details: UserDetails) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const Onboarding = ({ onComplete, setAuthView }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState<Omit<UserDetails, 'id' | 'learningStyle' | 'avatarUrl' | 'friends'> | null>(null);
  const [userPassword, setUserPassword] = useState('');
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleUserDetailsNext = (data: Omit<UserDetails, 'id'| 'learningStyle' | 'avatarUrl' | 'friends'>, password: string) => {
    setUserDetails(data);
    setUserPassword(password);
    setStep(2);
  };

  const handleQuizComplete = (learningStyle: string) => {
    if (userDetails && userPassword) {
      createUserWithEmailAndPassword(auth, userDetails.email, userPassword)
      .then(userCredential => {
        const user = userCredential.user;
        const finalDetails: UserDetails = { 
          ...userDetails, 
          id: user.uid, 
          learningStyle,
          avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${userDetails.name}`,
          friends: [],
        };

        const userDocRef = doc(firestore, "users", user.uid);
        setDocumentNonBlocking(userDocRef, finalDetails, { merge: true });

        onComplete(finalDetails);
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message,
        });
        setStep(1); // Go back to details form on error
      });
    }
  };

  return (
    <>
      {step === 1 && <UserDetailsForm onNext={handleUserDetailsNext} setAuthView={setAuthView} />}
      {step === 2 && <LearningStyleQuiz onComplete={handleQuizComplete} />}
    </>
  );
};

export default Onboarding;
