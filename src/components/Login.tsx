
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

// Mock function to "find" a user. In a real app, this would be an API call.
const findUserByEmail = (email: string): UserDetails | null => {
    // In our prototype, userDetails are persisted in localStorage.
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
        const user = JSON.parse(storedDetails);
        if (user.emailOrPhone.toLowerCase() === email.toLowerCase()) {
            return user;
        }
    }
    
    // As a fallback for development, check if there's an email but no user details yet.
    const lastUserEmail = localStorage.getItem('lastUserEmail');
    if (lastUserEmail?.toLowerCase() === email.toLowerCase() && !storedDetails) {
        // This case shouldn't happen in normal flow, but as a recovery.
        // We can't return user details, so we let the error message guide the user.
    }
    return null;
}

const formSchema = z.object({
  emailOrPhone: z.string().min(1, { message: 'Email or phone number is required.' }).email({ message: 'Please enter a valid email address.'}),
});

type LoginProps = {
  onLogin: (details: UserDetails) => void;
  setAuthView: (view: 'login' | 'signup') => void;
};

const Login = ({ onLogin, setAuthView }: LoginProps) => {
    const [defaultEmail, setDefaultEmail] = React.useState('');

    React.useEffect(() => {
        const lastEmail = localStorage.getItem('lastUserEmail');
        if (lastEmail) {
            setDefaultEmail(lastEmail);
        }
    }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      emailOrPhone: defaultEmail,
    },
    mode: 'onBlur'
  });

  React.useEffect(() => {
    form.setValue('emailOrPhone', defaultEmail);
  }, [defaultEmail, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = findUserByEmail(values.emailOrPhone);
    if (user) {
        onLogin(user);
    } else {
        form.setError("emailOrPhone", {
            type: "manual",
            message: "No account found with this email. Please sign up.",
        });
    }
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
              name="emailOrPhone"
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
