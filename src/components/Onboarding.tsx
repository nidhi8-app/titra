
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
import LearningStyleQuiz from './LearningStyleQuiz';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  yearGroup: z.string().min(1, { message: 'Year group is required.' }),
  email: z.string().email({ message: "Please enter a valid email."}),
  password: z.string().min(6, { message: "Password must be at least 6 characters."}),
  schoolName: z.string().min(1, { message: 'School name is required.' }),
  curriculum: z.string().min(1, { message: 'Curriculum is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
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
      age: '',
      yearGroup: '',
      email: '',
      password: '',
      schoolName: '',
      curriculum: '',
      country: '',
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
                      <Input type="number" placeholder="16" {...field} value={field.value ?? ''} />
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
             <div className="grid grid-cols-2 gap-4">
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
                <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., UAE" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
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

  const handleQuizBack = () => {
    setStep(1);
  }

  return (
    <>
      {step === 1 && <UserDetailsForm onNext={handleUserDetailsNext} setAuthView={setAuthView} />}
      {step === 2 && <LearningStyleQuiz onComplete={handleQuizComplete} onBack={handleQuizBack} />}
    </>
  );
};

export default Onboarding;
