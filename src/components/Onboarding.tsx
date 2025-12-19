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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FlaskConical, Sparkles } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  yearGroup: z.string().min(1, { message: 'Year group is required.' }),
  emailOrPhone: z.string().min(1, { message: 'Email or phone number is required.' }),
  schoolName: z.string().min(1, { message: 'School name is required.' }),
  curriculum: z.string().min(1, { message: 'Curriculum is required.' }),
});

type UserDetailsFormProps = {
  onNext: () => void;
};

const UserDetailsForm = ({ onNext }: UserDetailsFormProps) => {
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
    console.log(values);
    onNext();
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
    </Card>
  );
};

// Placeholder for Learning Style Quiz
const LearningStyleQuiz = ({ onComplete }: { onComplete: () => void }) => (
  <div>
    <h2>Learning Style Quiz</h2>
    <p>This is where the learning style quiz will go.</p>
    <Button onClick={onComplete}>Finish Onboarding</Button>
  </div>
);

type OnboardingProps = {
  onComplete: () => void;
};

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);

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
      {step === 1 && <UserDetailsForm onNext={() => setStep(2)} />}
      {step === 2 && <LearningStyleQuiz onComplete={onComplete} />}
    </div>
  );
};

export default Onboarding;
