
import type { Card, Deck, Note, Friend, QuizQuestion } from './types';
import { Beaker, Atom, FlaskConical, BookText, Network, Scale, Microscope, TestTube, ChevronsRightLeft, Rows, Link, CircleDashed, Thermometer, Gauge, TestTube2, Cloud, Recycle, BrainCircuit, Key } from 'lucide-react';


export const initialDecks: Deck[] = [
  {
    id: 'deck1',
    title: 'Atomic structure and the periodic table',
    cards: [
        { id: 'topic1', title: 'Atomic structure and the periodic table', color: 'bg-red-400', cardCount: 0, progress: 0, imageId: 'c4', emoji: Atom },
    ]
  },
  {
    id: 'deck2',
    title: 'Bonding, structure, and the properties of matter',
    cards: [
        { id: 'topic2', title: 'Bonding, structure, and properties', color: 'bg-sky-400', cardCount: 0, progress: 0, imageId: 'c9', emoji: Link },
    ]
  },
  {
    id: 'deck3',
    title: 'Quantitative chemistry',
    cards: [
        { id: 'topic3', title: 'Quantitative chemistry', color: 'bg-yellow-400', cardCount: 0, progress: 0, imageId: 'c2', emoji: Scale },
    ]
  },
  {
    id: 'deck4',
    title: 'Chemical changes',
    cards: [
        { id: 'topic4', title: 'Chemical changes', color: 'bg-green-400', cardCount: 0, progress: 0, imageId: 'c3', emoji: Beaker },
    ]
  },
  {
    id: 'deck5',
    title: 'Energy changes',
    cards: [
        { id: 'topic5', title: 'Energy changes', color: 'bg-orange-400', cardCount: 0, progress: 0, imageId: 'c13', emoji: Thermometer },
    ]
  },
  {
    id: 'deck6',
    title: 'The rate and extent of chemical change',
    cards: [
        { id: 'topic6', title: 'Rate and extent of chemical change', color: 'bg-indigo-400', cardCount: 0, progress: 0, imageId: 'c16', emoji: Gauge },
    ]
  },
  {
    id: 'deck7',
    title: 'Organic chemistry',
    cards: [
        { id: 'topic7', title: 'Organic chemistry', color: 'bg-purple-400', cardCount: 0, progress: 0, imageId: 'c10', emoji: TestTube2 },
    ]
  },
  {
    id: 'deck8',
    title: 'Chemical analysis',
    cards: [
        { id: 'topic8', title: 'Chemical analysis', color: 'bg-pink-400', cardCount: 0, progress: 0, imageId: 'c19', emoji: Microscope },
    ]
  },
  {
    id: 'deck9',
    title: 'Chemistry of the atmosphere',
    cards: [
        { id: 'topic9', title: 'Chemistry of the atmosphere', color: 'bg-teal-400', cardCount: 0, progress: 0, imageId: 'c22', emoji: Cloud },
    ]
  },
];

export const initialQuizTopics: Omit<Card, 'color' | 'emoji' | 'imageId'>[] = [
    { id: 'deck1', title: 'Atomic structure and the periodic table', cardCount: 10, progress: -1 },
    { id: 'deck2', title: 'Bonding, structure, and the properties of matter', cardCount: 10, progress: -1 },
    { id: 'deck3', title: 'Quantitative chemistry', cardCount: 10, progress: -1 },
    { id: 'deck4', title: 'Chemical changes', cardCount: 10, progress: -1 },
    { id: 'deck5', title: 'Energy changes', cardCount: 10, progress: -1 },
    { id: 'deck6', title: 'Rate and extent of chemical change', cardCount: 10, progress: -1 },
    { id: 'deck7', title: 'Organic chemistry', cardCount: 10, progress: -1 },
    { id: 'deck8', title: 'Chemical analysis', cardCount: 10, progress: -1 },
    { id: 'deck9', title: 'Chemistry of the atmosphere', cardCount: 10, progress: -1 },
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

export const quizMotivationalMessages: string[] = [
  "Keep going, you're doing great!",
  "Every question is a step forward.",
  "You've got this!",
  "Don't give up, the finish line is near.",
  "Learning is a journey, not a race. Keep up the steady pace!",
  "Mistakes are proof that you are trying.",
  "Believe in yourself and all that you are.",
  "Focus on progress, not perfection."
];


export const initialFriends: Friend[] = [];

export const quizQuestions: { [key: string]: QuizQuestion[] } = {
  'deck1': [
    {
      id: 'd1-q1',
      question: 'What is the smallest part of an element that can exist?',
      options: ['Molecule', 'Compound', 'Atom', 'Ion'],
      correctAnswer: 'Atom'
    },
    {
      id: 'd1-q2',
      question: 'Which of the following is the correct chemical symbol for Sodium?',
      options: ['S', 'So', 'NA', 'Na'],
      correctAnswer: 'Na'
    },
    {
      id: 'd1-q3',
      question: 'How are metals and non-metals generally arranged in the periodic table?',
      options: [
        'Metals on the right, non-metals on the left',
        'Metals on the left, non-metals on the right',
        'Metals at the top, non-metals at the bottom',
        'They are mixed throughout'
      ],
      correctAnswer: 'Metals on the left, non-metals on the right'
    },
    {
      id: 'd1-q4',
      question: 'What is a compound?',
      options: [
        'A substance containing one type of atom',
        'A substance containing two or more elements mixed together',
        'A substance containing two or more elements chemically combined in fixed proportions',
        'A charged particle'
      ],
      correctAnswer: 'A substance containing two or more elements chemically combined in fixed proportions'
    },
    {
      id: 'd1-q5',
      question: 'The experimental work of which scientist provided evidence for neutrons?',
      options: ['Niels Bohr', 'James Chadwick', 'J.J. Thomson', 'Ernest Rutherford'],
      correctAnswer: 'James Chadwick'
    },
    {
      id: 'd1-q6',
      question: 'What is the charge of a proton?',
      options: ['+1', '-1', '0', '+2'],
      correctAnswer: '+1'
    },
    {
      id: 'd1-q7',
      question: 'What are isotopes?',
      options: [
        'Atoms with the same mass number but different atomic number',
        'Atoms of the same element with different numbers of electrons',
        'Atoms of the same element with different numbers of neutrons',
        'Atoms with the same number of neutrons but different number of protons'
      ],
      correctAnswer: 'Atoms of the same element with different numbers of neutrons'
    },
    {
      id: 'd1-q8',
      question: 'Which group are the noble gases in?',
      options: ['Group 1', 'Group 7', 'Group 0', 'Group 2'],
      correctAnswer: 'Group 0'
    },
    {
      id: 'd1-q9',
      question: 'How does reactivity change as you go down Group 1?',
      options: ['Increases', 'Decreases', 'Stays the same', 'Increases then decreases'],
      correctAnswer: 'Increases'
    },
    {
      id: 'd1-q10',
      question: 'A more reactive halogen can displace a...',
      options: [
        'More reactive halogen from its salt solution',
        'Less reactive halogen from its salt solution',
        'Group 1 metal from its salt solution',
        'Noble gas from its compound'
      ],
      correctAnswer: 'Less reactive halogen from its salt solution'
    }
  ],
  'deck2': [
    {
      id: 'd2-q1',
      question: 'What type of bonding occurs between a metal and a non-metal?',
      options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
      correctAnswer: 'Ionic'
    },
    {
      id: 'd2-q2',
      question: 'Which of the following describes covalent bonding?',
      options: ['Transfer of electrons', 'Sea of delocalised electrons', 'Sharing of electron pairs', 'Attraction between oppositely charged ions'],
      correctAnswer: 'Sharing of electron pairs'
    },
    {
      id: 'd2-q3',
      question: 'Why do ionic compounds have high melting points?',
      options: ['Weak intermolecular forces', 'Strong covalent bonds', 'Strong electrostatic forces of attraction', 'Presence of free electrons'],
      correctAnswer: 'Strong electrostatic forces of attraction'
    },
    {
      id: 'd2-q4',
      question: 'Which of the following is a property of simple molecular substances?',
      options: ['High boiling point', 'Good electrical conductivity', 'Low melting point', 'Hard and brittle'],
      correctAnswer: 'Low melting point'
    },
    {
      id: 'd2-q5',
      question: 'What is a polymer?',
      options: ['A small molecule', 'A giant ionic lattice', 'A very large molecule made of repeating units', 'A metal alloy'],
      correctAnswer: 'A very large molecule made of repeating units'
    },
    {
      id: 'd2-q6',
      question: 'In diamond, how many covalent bonds does each carbon atom form?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '4'
    },
    {
      id: 'd2-q7',
      question: 'Why is graphite soft and slippery?',
      options: ['It has a low melting point', 'The layers of atoms can slide over each other', 'It contains delocalised electrons', 'It is a simple molecule'],
      correctAnswer: 'The layers of atoms can slide over each other'
    },
    {
      id: 'd2-q8',
      question: 'What allows metals to conduct electricity?',
      options: ['Mobile ions', 'Strong covalent bonds', 'Delocalised electrons', 'High density'],
      correctAnswer: 'Delocalised electrons'
    },
    {
      id: 'd2-q9',
      question: 'What is a key feature of nanoparticles?',
      options: ['They are larger than 100 nm', 'They have a low surface area to volume ratio', 'They have a high surface area to volume ratio', 'They are all magnetic'],
      correctAnswer: 'They have a high surface area to volume ratio'
    },
    {
      id: 'd2-q10',
      question: 'What is an alloy?',
      options: ['A pure metal', 'A mixture of a metal with another element', 'A giant covalent structure', 'A type of polymer'],
      correctAnswer: 'A mixture of a metal with another element'
    }
  ],
  'deck3': Array.from({ length: 10 }, (_, i) => ({ id: `d3-q${i + 1}`, question: `Quantitative Chemistry Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck4': Array.from({ length: 10 }, (_, i) => ({ id: `d4-q${i + 1}`, question: `Chemical changes Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck5': Array.from({ length: 10 }, (_, i) => ({ id: `d5-q${i + 1}`, question: `Energy changes Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck6': Array.from({ length: 10 }, (_, i) => ({ id: `d6-q${i + 1}`, question: `Rate of change Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck7': Array.from({ length: 10 }, (_, i) => ({ id: `d7-q${i + 1}`, question: `Organic chemistry Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck8': Array.from({ length: 10 }, (_, i) => ({ id: `d8-q${i + 1}`, question: `Chemical analysis Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
  'deck9': Array.from({ length: 10 }, (_, i) => ({ id: `d9-q${i + 1}`, question: `Chemistry of the atmosphere Q${i + 1}`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' })),
};

    