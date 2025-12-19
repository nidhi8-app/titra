
import type { Card, Deck, Note, Friend, QuizQuestion } from './types';

export const initialDecks: Deck[] = [
  {
    id: '1',
    title: 'Stoichiometric relationships',
    cards: [
        { id: 'c1', title: 'Introduction to the particulate nature of matter and chemical change', color: 'bg-yellow-400', cardCount: 0, progress: 0, imageId: 'c1', emoji: '🔬' },
        { id: 'c2', title: 'The mole concept', color: 'bg-pink-400', cardCount: 0, progress: 0, imageId: 'c2', emoji: '⚖️' },
        { id: 'c3', title: 'Reacting masses and volumes', color: 'bg-blue-400', cardCount: 0, progress: 0, imageId: 'c3', emoji: '🧪' },
    ]
  },
  {
    id: '2',
    title: 'Atomic structure',
    cards: [
        { id: 'c4', title: 'The nuclear atom', color: 'bg-green-400', cardCount: 0, progress: 0, imageId: 'c4', emoji: '⚛️' },
        { id: 'c5', title: 'Electron configuration', color: 'bg-sky-400', cardCount: 0, progress: 0, imageId: 'c5', emoji: '⚡️' },
    ]
  },
  {
    id: '3',
    title: 'Periodicity',
    cards: [
      { id: 'c6', title: 'Periodic table', color: 'bg-red-400', cardCount: 0, progress: 0, imageId: 'c6', emoji: '🗓️' },
      { id: 'c7', title: 'Periodic trends', color: 'bg-fuchsia-400', cardCount: 0, progress: 0, imageId: 'c7', emoji: '📈' },
    ]
  },
  {
    id: '4',
    title: 'Chemical bonding and structure',
    cards: [
      { id: 'c8', title: 'Ionic bonding and structure', color: 'bg-amber-400', cardCount: 0, progress: 0, imageId: 'c8', emoji: '💎' },
      { id: 'c9', title: 'Covalent bonding', color: 'bg-emerald-400', cardCount: 0, progress: 0, imageId: 'c9', emoji: '🔗' },
      { id: 'c10', title: 'Covalent structures', color: 'bg-violet-400', cardCount: 0, progress: 0, imageId: 'c10', emoji: '🕸️' },
      { id: 'c11', title: 'Intermolecular forces', color: 'bg-rose-400', cardCount: 0, progress: 0, imageId: 'c11', emoji: '💧' },
      { id: 'c12', title: 'Metallic bonding', color: 'bg-cyan-400', cardCount: 0, progress: 0, imageId: 'c12', emoji: '⛓️' },
    ]
  },
  {
    id: '5',
    title: 'Energetics/thermochemistry',
    cards: [
        { id: 'c13', title: 'Measuring energy changes', color: 'bg-yellow-400', cardCount: 0, progress: 0, imageId: 'c13', emoji: '🌡️' },
        { id: 'c14', title: 'Hess\'s Law', color: 'bg-pink-400', cardCount: 0, progress: 0, imageId: 'c14', emoji: '🔄' },
        { id: 'c15', title: 'Bond enthalpies', color: 'bg-blue-400', cardCount: 0, progress: 0, imageId: 'c15', emoji: '💥' },
    ]
  },
  {
    id: '6',
    title: 'Chemical kinetics',
    cards: [
        { id: 'c16', title: 'Collision theory and rates of reaction', color: 'bg-green-400', cardCount: 0, progress: 0, imageId: 'c16', emoji: '🏃' },
    ]
  },
  {
    id: '7',
    title: 'Equilibrium',
    cards: [
        { id: 'c17', title: 'Equilibrium', color: 'bg-red-400', cardCount: 0, progress: 0, imageId: 'c17', emoji: '⚖️' },
    ]
  },
  {
    id: '8',
    title: 'Acids and bases',
    cards: [
        { id: 'c18', title: 'Theories of acids and bases', color: 'bg-amber-400', cardCount: 0, progress: 0, imageId: 'c18', emoji: '💡' },
        { id: 'c19', title: 'Properties of acids and bases', color: 'bg-emerald-400', cardCount: 0, progress: 0, imageId: 'c19', emoji: '🍋' },
        { id: 'c20', title: 'The pH scale', color: 'bg-violet-400', cardCount: 0, progress: 0, imageId: 'c20', emoji: '📊' },
        { id: 'c21', title: 'Strong and weak acids and bases', color: 'bg-rose-400', cardCount: 0, progress: 0, imageId: 'c21', emoji: '💪' },
        { id: 'c22', title: 'Acid deposition', color: 'bg-cyan-400', cardCount: 0, progress: 0, imageId: 'c22', emoji: '🌧️' },
    ]
  }
];

export const initialQuizTopics: Omit<Card, 'color'>[] = [
    { id: 'q1', title: 'Stoichiometric relationships', cardCount: 2, progress: 0 },
    { id: 'q2', title: 'Atomic structure', cardCount: 0, progress: 0 },
    { id: 'q3', title: 'Periodicity', cardCount: 0, progress: 0 },
    { id: 'q4', title: 'Chemical bonding and structure', cardCount: 0, progress: 0 },
    { id: 'q5', title: 'Energetics/thermochemistry', cardCount: 0, progress: 0 },
    { id: 'q6', title: 'Chemical kinetics', cardCount: 0, progress: 0 },
    { id: 'q7', title: 'Equilibrium', cardCount: 0, progress: 0 },
    { id: 'q8', title: 'Acids and bases', cardCount: 0, progress: 0 },
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

export const initialFriends: Friend[] = [];

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
