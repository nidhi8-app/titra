
"use client";

import React from 'react';
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
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Please enter a valid email address.'}),
  password: z.string().min(1, { message: "Password is required."}),
});

type LoginProps = {
  onLogin: (details: UserDetails) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const Login = ({ onLogin, setAuthView }: LoginProps) => {
    const [defaultEmail, setDefaultEmail] = React.useState('');
    const auth = useAuth();
    const { toast } = useToast();

    React.useEffect(() => {
        const lastEmail = localStorage.getItem('lastUserEmail');
        if (lastEmail) {
            setDefaultEmail(lastEmail);
        }
    }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: defaultEmail,
      password: '',
    },
    mode: 'onBlur'
  });

  React.useEffect(() => {
    form.setValue('email', defaultEmail);
  }, [defaultEmail, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // In a real app, you'd fetch the user profile from Firestore here.
      // For the prototype, we rely on localStorage which should have the profile.
      const storedDetails = localStorage.getItem('userDetails');
      if (storedDetails) {
        const user = JSON.parse(storedDetails);
        if (user.email.toLowerCase() === values.email.toLowerCase()) {
          onLogin(user);
        } else {
          // This case happens if a different user logs in on the same browser
          // You'd need to fetch their profile from Firestore.
          // For now, we'll show an error and recommend signing up if it's a new user.
          toast({
            variant: "destructive",
            title: "Login Error",
            description: "Could not find your user details. Please sign up if you are a new user.",
          })
        }
      } else {
         toast({
            variant: "destructive",
            title: "Login Error",
            description: "No user details found in this browser. Please sign up.",
          })
      }
    })
    .catch((error) => {
       toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
       });
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Log in to continue your learning journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-4 text-sm">
        <p>
          Don't have an account?{' '}
          <Button variant="link" className="p-0 h-auto" onClick={() => setAuthView('signup')}>
            Sign up here
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
