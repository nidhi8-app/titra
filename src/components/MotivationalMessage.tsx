"use client";

import React, { useState, useEffect } from 'react';
import { motivationalMessages } from '@/lib/data';
import { Sparkles } from 'lucide-react';

const MotivationalMessage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background/50">
        <Sparkles className="w-16 h-16 text-gold mb-4" />
        <p className="text-2xl font-bold italic text-gold font-headline">
            {message}
        </p>
        <p className="mt-4 text-muted-foreground">
            Create a new deck or select an existing one to get started.
        </p>
    </div>
  );
};

export default MotivationalMessage;
