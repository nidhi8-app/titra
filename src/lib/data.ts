
import type { Card, Deck, Note, Friend, QuizQuestion } from './types';

export const initialDecks: Deck[] = [
  {
    id: '1',
    title: 'Stoichiometry',
    cards: [
        { id: 'c1', title: 'Introduction to the particulate nature of matter', color: 'bg-yellow-400', cardCount: 12, progress: 0 },
        { id: 'c2', title: 'The mole concept', color: 'bg-pink-400', cardCount: 25, progress: 0 },
        { id: 'c3', title: 'Reacting masses and volumes', color: 'bg-blue-400', cardCount: 30, progress: 0 },
    ]
  },
  {
    id: '2',
    title: 'Atomic Structure',
    cards: [
        { id: 'c4', title: 'The nuclear atom', color: 'bg-green-400', cardCount: 18, progress: 0 },
        { id: 'c5', title: 'Electron configuration', color: 'bg-sky-400', cardCount: 22, progress: 0 },
    ]
  },
  {
    id: '3',
    title: 'Periodicity',
    cards: [
      { id: 'c6', title: 'Periodic table', color: 'bg-red-400', cardCount: 15, progress: 0 },
      { id: 'c7', title: 'Periodic trends', color: 'bg-fuchsia-400', cardCount: 28, progress: 0 },
    ]
  },
  {
    id: '4',
    title: 'Chemical Bonding',
    cards: [
      { id: 'c8', title: 'Ionic bonding and structure', color: 'bg-amber-400', cardCount: 19, progress: 0 },
      { id: 'c9', title: 'Covalent bonding', color: 'bg-emerald-400', cardCount: 35, progress: 0 },
      { id: 'c10', title: 'Covalent structures', color: 'bg-violet-400', cardCount: 40, progress: 0 },
      { id: 'c11', title: 'Intermolecular forces', color: 'bg-rose-400', cardCount: 24, progress: 0 },
      { id: 'c12', title: 'Metallic bonding', color: 'bg-cyan-400', cardCount: 10, progress: 0 },
    ]
  },
  {
    id: '5',
    title: 'Energetics',
    cards: []
  },
  {
    id: '6',
    title: 'Kinetics',
    cards: []
  },
  {
    id: '7',
    title: 'Equilibrium',
    cards: []
  },
  {
    id: '8',
    title: 'Acids and Bases',
    cards: []
  }
];

export const initialQuizTopics: Omit<Card, 'color'>[] = [
    { id: 'q1', title: 'Stoichiometric relationships', cardCount: 2, progress: 0 },
    { id: 'q2', title: 'Atomic structure', cardCount: 0, progress: 0 },
    { id: 'q3', title: 'Periodicity', cardCount: 0, progress: 0 },
    { id: 'q4', title: 'Chemical bonding and structure', cardCount: 0, progress: 0 },
    { id: 'q5', title: 'Energetics/thermochemistry', cardCount: 0, progress: 0 },
    { id: 'q6', title: 'Chemical kinetics', cardCount: 0, progress: 0 },
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

export const initialFriends: Friend[] = [
  { id: 'f1', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/f1/200/200' },
  { id: 'f2', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/f2/200/200' },
  { id: 'f3', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/f3/200/200' },
  { id: 'f4', name: 'Diana', avatarUrl: 'https://picsum.photos/seed/f4/200/200' },
  { id: 'f5', name: 'Eve', avatarUrl: 'https://picsum.photos/seed/f5/200/200' },
  { id: 'f6', name: 'Frank', avatarUrl: 'https://picsum.photos/seed/f6/200/200' },
];

export const quizQuestions: { [key: string]: QuizQuestion[] } = {
  'q1': [
    {
      id: 'q1-1',
      question: 'What is the relative atomic mass of an element?',
      options: [
        'The mass of an atom compared to the mass of a carbon-12 atom.',
        'The total number of protons and neutrons in an atom.',
        'The average mass of an element\'s isotopes.',
        'The weighted average mass of an atom of an element, taking into account its naturally occurring isotopes, relative to 1/12th the mass of a carbon-12 atom.'
      ],
      correctAnswer: 'The weighted average mass of an atom of an element, taking into account its naturally occurring isotopes, relative to 1/12th the mass of a carbon-12 atom.'
    },
    {
      id: 'q1-2',
      question: 'What is Avogadro\'s constant?',
      options: [
        '6.02 x 10^23',
        'The number of atoms in 12g of carbon-12.',
        'The number of particles in one mole of a substance.',
        'All of the above.'
      ],
      correctAnswer: 'All of the above.'
    }
  ],
  // Add more questions for other topics here
};
