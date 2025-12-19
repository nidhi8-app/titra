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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  yearGroup: z.string().min(1, { message: 'Year group is required.' }),
  emailOrPhone: z.string().min(1, { message: 'Email or phone number is required.' }),
  schoolName: z.string().min(1, { message: 'School name is required.' }),
  curriculum: z.string().min(1, { message: 'Curriculum is required.' }),
});

type UserDetailsFormProps = {
  onNext: (data: UserDetails) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const UserDetailsForm = ({ onNext, setAuthView }: UserDetailsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      yearGroup: '',
      emailOrPhone: '',
      schoolName: '',
      curriculum: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values);
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
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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

// Placeholder for Learning Style Quiz
const LearningStyleQuiz = ({ onComplete }: { onComplete: () => void }) => (
  <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>What's your learning style?</CardTitle>
        <CardDescription>This will help us personalize your content.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p>The learning style quiz will go here.</p>
        <p className="mt-4 text-muted-foreground">For now, let's skip this step.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onComplete} className="w-full">Finish Onboarding</Button>
      </CardFooter>
  </Card>
);

type OnboardingProps = {
  onComplete: (details: UserDetails) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const Onboarding = ({ onComplete, setAuthView }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const handleUserDetailsNext = (data: UserDetails) => {
    setUserDetails(data);
    setStep(2);
  };

  const handleQuizComplete = () => {
    if (userDetails) {
      onComplete(userDetails);
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
