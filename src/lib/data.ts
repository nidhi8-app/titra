import type { Deck, Note } from './types';

export const initialDecks: Deck[] = [
  {
    id: '1',
    title: 'Titra',
  },
  {
    id: '2',
    title: 'Titration',
  },
];

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Titra!',
    body: 'This is your first note. Feel free to edit it or create a new one. Use the sidebar to navigate your notes and track your progress.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '2',
    title: 'My Daily Goals',
    body: '1. Meditate for 10 minutes.\n2. Read one chapter of a book.\n3. Write down three things I\'m grateful for.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
    {
    id: '3',
    title: 'Brainstorming Session',
    body: 'Ideas for the new project:\n- A mobile app for gardeners\n- A web platform for local artists\n- A subscription box for coffee lovers',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
];


export const motivationalMessages: string[] = [
    "Every great journey begins with a single step. What will you create today?",
    "Your ideas are seeds. Plant them here and watch them grow.",
    "A blank canvas is an open door to endless possibilities.",
    "Capture the fleeting ideas. They are more valuable than you think.",
    "The secret to getting ahead is getting started. Let's go!",
];
