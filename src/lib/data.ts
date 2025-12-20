
import type { Card, Deck, Note, Friend, QuizQuestion } from './types';
import { Beaker, Atom, FlaskConical, BookText, Network, Scale, Microscope, TestTube, ChevronsRightLeft, Rows, Link, CircleDashed } from 'lucide-react';


export const initialDecks: Deck[] = [
  {
    id: '1',
    title: 'Chemical Symbols, Formulae & Equations',
    cards: [
        { id: 'q1', title: 'Chemical symbols and formulae', color: 'bg-yellow-400', cardCount: 10, progress: -1, imageId: 'c1', emoji: BookText },
        { id: 'q2', title: 'Word and balanced chemical equations', color: 'bg-pink-400', cardCount: 10, progress: -1, imageId: 'c2', emoji: ChevronsRightLeft },
    ]
  },
  {
    id: '2',
    title: 'Chemical Bonding and Structure',
    cards: [
        { id: 'q3', title: 'Ionic Bonding', color: 'bg-green-400', cardCount: 10, progress: -1, imageId: 'c8', emoji: Atom },
        { id: 'q4', title: 'Covalent Bonding', color: 'bg-sky-400', cardCount: 10, progress: -1, imageId: 'c9', emoji: Link },
        { id: 'q5', title: 'Metallic Bonding', color: 'bg-amber-400', cardCount: 5, progress: -1, imageId: 'c12', emoji: CircleDashed },
        { id: 'q6', title: 'Limitations of Models', color: 'bg-rose-400', cardCount: 5, progress: -1, imageId: 'c10', emoji: Network },
    ]
  },
  {
    id: '3',
    title: 'Stoichiometric relationships',
    cards: [
        { id: 'c1', title: 'Introduction to the particulate nature of matter and chemical change', color: 'bg-yellow-400', cardCount: 0, progress: 0, imageId: 'c1', emoji: Microscope },
        { id: 'c2', title: 'The mole concept', color: 'bg-pink-400', cardCount: 0, progress: 0, imageId: 'c2', emoji: Scale },
        { id: 'c3', title: 'Reacting masses and volumes', color: 'bg-blue-400', cardCount: 0, progress: 0, imageId: 'c3', emoji: Beaker },
    ]
  },
  {
    id: '4',
    title: 'Atomic structure',
    cards: [
        { id: 'c4', title: 'The nuclear atom', color: 'bg-green-400', cardCount: 0, progress: 0, imageId: 'c4', emoji: Atom },
        { id: 'c5', title: 'Electron configuration', color: 'bg-sky-400', cardCount: 0, progress: 0, imageId: 'c5', emoji: TestTube },
    ]
  },
  {
    id: '5',
    title: 'Periodicity',
    cards: [
      { id: 'c6', title: 'Periodic table', color: 'bg-red-400', cardCount: 0, progress: 0, imageId: 'c6', emoji: Rows },
      { id: 'c7', title: 'Periodic trends', color: 'bg-fuchsia-400', cardCount: 0, progress: 0, imageId: 'c7', emoji: FlaskConical },
    ]
  },
];

export const initialQuizTopics: Omit<Card, 'color' | 'emoji' | 'imageId'>[] = [
    { id: 'q1', title: 'Chemical symbols and formulae', cardCount: 10, progress: -1 },
    { id: 'q2', title: 'Word and balanced chemical equations', cardCount: 10, progress: -1 },
    { id: 'q3', title: 'Ionic Bonding', cardCount: 10, progress: -1 },
    { id: 'q4', title: 'Covalent Bonding', cardCount: 10, progress: -1 },
    { id: 'q5', title: 'Metallic Bonding', cardCount: 5, progress: -1 },
    { id: 'q6', title: 'Limitations of Models', cardCount: 5, progress: -1 },
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
      question: 'What is the smallest part of an element that can exist?',
      options: ['Molecule', 'Compound', 'Atom', 'Ion'],
      correctAnswer: 'Atom'
    },
    {
      id: 'q1-2',
      question: 'Which of the following is the correct chemical symbol for Sodium?',
      options: ['S', 'So', 'NA', 'Na'],
      correctAnswer: 'Na'
    },
    {
      id: 'q1-3',
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
      id: 'q1-4',
      question: 'What is the chemical formula for Nitrogen gas?',
      options: ['N', 'N2', 'Ni', 'Nt'],
      correctAnswer: 'N2'
    },
    {
      id: 'q1-5',
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
      id: 'q1-6',
      question: 'What does the formula H₂O tell us?',
      options: [
        'There is one Hydrogen atom and two Oxygen atoms',
        'There are two Hydrogen atoms and one Oxygen atom',
        'It is a mixture of Hydrogen and Oxygen',
        'It is an element'
      ],
      correctAnswer: 'There are two Hydrogen atoms and one Oxygen atom'
    },
    {
      id: 'q1-7',
      question: 'What is an ion?',
      options: [
        'An atom with a full outer shell',
        'A substance made of only one type of atom',
        'A charged particle formed when an atom loses or gains electrons',
        'The smallest part of a compound'
      ],
      correctAnswer: 'A charged particle formed when an atom loses or gains electrons'
    },
    {
      id: 'q1-8',
      question: 'The formula for Magnesium Oxide is MgO. What charges do the Magnesium and Oxide ions have?',
      options: ['Mg+ and O-', 'Mg2+ and O2-', 'Mg+ and O2-', 'Mg2+ and O-'],
      correctAnswer: 'Mg2+ and O2-'
    },
    {
      id: 'q1-9',
      question: 'What is the correct formula for Magnesium Chloride, which contains Mg²⁺ and Cl⁻ ions?',
      options: ['MgCl', 'Mg2Cl', 'MgCl2', 'Mg2Cl2'],
      correctAnswer: 'MgCl2'
    },
    {
      id: 'q1-10',
      question: 'What does the prefix "di-" in "carbon dioxide" signify?',
      options: [
        'There is one oxygen atom',
        'There are two oxygen atoms',
        'There are three oxygen atoms',
        'It is a gas'
      ],
      correctAnswer: 'There are two oxygen atoms'
    }
  ],
  'q2': [
    {
      id: 'q2-1',
      question: 'What does a word equation show?',
      options: [
        'The chemical symbols of reactants and products',
        'The names of the reactants and products',
        'The number of atoms on each side',
        'The states of matter of the substances'
      ],
      correctAnswer: 'The names of the reactants and products'
    },
    {
      id: 'q2-2',
      question: 'In the equation: reactants → products, what are the reactants?',
      options: [
        'Substances that are formed in the reaction',
        'Substances that react together',
        'The arrow in the middle',
        'The substances on the right side of the arrow'
      ],
      correctAnswer: 'Substances that react together'
    },
    {
      id: 'q2-3',
      question: 'What does the arrow (→) in a chemical equation mean?',
      options: ['Equals', 'Is the same as', 'Reacts to make', 'And'],
      correctAnswer: 'Reacts to make'
    },
    {
      id: 'q2-4',
      question: 'What does the state symbol (aq) mean?',
      options: ['Solid', 'Liquid', 'Gas', 'Aqueous solution (dissolved in water)'],
      correctAnswer: 'Aqueous solution (dissolved in water)'
    },
    {
      id: 'q2-5',
      question: 'What is the meaning of H₂O(l)?',
      options: ['Water vapour', 'Ice', 'Liquid water', 'A solution of water'],
      correctAnswer: 'Liquid water'
    },
    {
      id: 'q2-6',
      question: 'What does the Law of Conservation of Mass state?',
      options: [
        'Mass is always lost in a reaction',
        'No atoms are lost or made during a chemical reaction',
        'The mass of reactants is always greater than the mass of products',
        'Energy is conserved, but mass is not'
      ],
      correctAnswer: 'No atoms are lost or made during a chemical reaction'
    },
    {
      id: 'q2-7',
      question: 'Why must chemical equations be balanced?',
      options: [
        'To make them look neat',
        'To satisfy the Law of Conservation of Mass',
        'To show the state symbols',
        'To make the reactants equal the products'
      ],
      correctAnswer: 'To satisfy the Law of Conservation of Mass'
    },
    {
      id: 'q2-8',
      question: 'Which of these equations is balanced?',
      options: [
        'H₂ + O₂ → H₂O',
        '2H₂ + O₂ → 2H₂O',
        'H₂ + O → H₂O',
        'H₂ + 2O₂ → 2H₂O'
      ],
      correctAnswer: '2H₂ + O₂ → 2H₂O'
    },
    {
      id: 'q2-9',
      question: 'When balancing an equation, what can you change?',
      options: [
        'The chemical formulae of the substances (e.g., change H₂O to H₃O)',
        'The numbers to the left of the formulae (coefficients)',
        'The subscript numbers within a formula (e.g., change H₂O to H₂O₂)',
        'The elements involved'
      ],
      correctAnswer: 'The numbers to the left of the formulae (coefficients)'
    },
    {
      id: 'q2-10',
      question: 'What is the balanced equation for the reaction between Nitrogen (N₂) and Hydrogen (H₂) to form Ammonia (NH₃)?',
      options: [
        'N + H → NH',
        'N₂ + H₂ → NH₃',
        'N₂ + 2H₂ → 2NH₃',
        'N₂ + 3H₂ → 2NH₃'
      ],
      correctAnswer: 'N₂ + 3H₂ → 2NH₃'
    }
  ],
  'q3': [
    {
      id: 'q3-1',
      question: 'Why do atoms combine with other atoms?',
      options: [
        'To become less stable',
        'To gain a full outer shell of electrons and achieve greater stability',
        'To share protons',
        'To become larger'
      ],
      correctAnswer: 'To gain a full outer shell of electrons and achieve greater stability'
    },
    {
      id: 'q3-2',
      question: 'What is ionic bonding?',
      options: [
        'The sharing of electrons between non-metal atoms',
        'The electrostatic force of attraction between oppositely charged ions',
        'The force of attraction between positive ions and delocalized electrons',
        'The weak forces between molecules'
      ],
      correctAnswer: 'The electrostatic force of attraction between oppositely charged ions'
    },
    {
      id: 'q3-3',
      question: 'Ionic bonding typically occurs between...',
      options: [
        'A metal and another metal',
        'A non-metal and another non-metal',
        'A metal and a non-metal',
        'A noble gas and a halogen'
      ],
      correctAnswer: 'A metal and a non-metal'
    },
    {
      id: 'q3-4',
      question: 'How do metal atoms form ions?',
      options: [
        'They gain electrons to become negatively charged anions',
        'They lose electrons to become positively charged cations',
        'They share electrons',
        'They gain protons'
      ],
      correctAnswer: 'They lose electrons to become positively charged cations'
    },
    {
      id: 'q3-5',
      question: 'What is an anion?',
      options: [
        'A positively charged ion formed by losing electrons',
        'A neutral atom',
        'A negatively charged ion formed by gaining electrons',
        'A type of covalent bond'
      ],
      correctAnswer: 'A negatively charged ion formed by gaining electrons'
    },
    {
      id: 'q3-6',
      question: 'What is the main purpose of a dot and cross diagram in ionic bonding?',
      options: [
        'To show the 3D shape of the compound',
        'To show the movement (transfer) of electrons',
        'To show the relative sizes of the atoms',
        'To show the melting point'
      ],
      correctAnswer: 'To show the movement (transfer) of electrons'
    },
    {
      id: 'q3-7',
      question: 'What is a giant ionic lattice?',
      options: [
        'A single molecule of an ionic compound',
        'A small group of ions bonded together',
        'A regular arrangement of alternating positive and negative ions',
        'A type of covalent structure'
      ],
      correctAnswer: 'A regular arrangement of alternating positive and negative ions'
    },
    {
      id: 'q3-8',
      question: 'Why do ionic compounds have high melting and boiling points?',
      options: [
        'Because of weak intermolecular forces',
        'Because the covalent bonds are very strong',
        'Because of the strong electrostatic forces of attraction between ions that require a lot of energy to overcome',
        'Because they are made of metal atoms'
      ],
      correctAnswer: 'Because of the strong electrostatic forces of attraction between ions that require a lot of energy to overcome'
    },
    {
      id: 'q3-9',
      question: 'What is a major limitation of the 3D ball and stick model for ionic lattices?',
      options: [
        'It doesn\'t show the 3D arrangement',
        'It represents the strong electrostatic forces as "sticks" and incorrectly shows large gaps between ions',
        'It doesn\'t show which atoms are which',
        'It is too realistic and complicated'
      ],
      correctAnswer: 'It represents the strong electrostatic forces as "sticks" and incorrectly shows large gaps between ions'
    },
    {
      id: 'q3-10',
      question: 'Ions of elements in Groups 1, 2, 6, and 7 have the same electronic structure as which type of element?',
      options: ['Halogens', 'Transition metals', 'Alkali metals', 'Noble gases'],
      correctAnswer: 'Noble gases'
    }
  ],
  'q4': [
    {
      id: 'q4-1',
      question: 'What is a covalent bond?',
      options: [
        'The transfer of electrons from a metal to a non-metal',
        'The electrostatic attraction between oppositely charged ions',
        'The sharing of one or more pairs of electrons between non-metal atoms',
        'The attraction between positive ions and a sea of electrons'
      ],
      correctAnswer: 'The sharing of one or more pairs of electrons between non-metal atoms'
    },
    {
      id: 'q4-2',
      question: 'What is a substance made of atoms joined by covalent bonds called?',
      options: ['An ion', 'A lattice', 'A molecule', 'A metal'],
      correctAnswer: 'A molecule'
    },
    {
      id: 'q4-3',
      question: 'Why do simple covalent molecules typically have low melting and boiling points?',
      options: [
        'The covalent bonds are weak',
        'They have strong electrostatic forces',
        'Only weak intermolecular forces need to be overcome',
        'They contain free electrons'
      ],
      correctAnswer: 'Only weak intermolecular forces need to be overcome'
    },
    {
      id: 'q4-4',
      question: 'Why do simple covalent molecules not conduct electricity?',
      options: [
        'They have no overall charge and no free electrons or ions to move',
        'They are always gases',
        'The intermolecular forces are too strong',
        'The covalent bonds are too weak'
      ],
      correctAnswer: 'They have no overall charge and no free electrons or ions to move'
    },
    {
      id: 'q4-5',
      question: 'What are the electrons on the outer shell that are NOT involved in bonding called?',
      options: ['Bonding electrons', 'Inner electrons', 'Shared electrons', 'Non-bonding electrons'],
      correctAnswer: 'Non-bonding electrons'
    },
    {
      id: 'q4-6',
      question: 'Which of the following is an example of a simple covalent molecule?',
      options: ['Sodium chloride (NaCl)', 'Diamond (C)', 'Water (H₂O)', 'Iron (Fe)'],
      correctAnswer: 'Water (H₂O)'
    },
    {
      id: 'q4-7',
      question: 'What is a polymer?',
      options: [
        'A type of ionic compound',
        'A very large molecule made of many repeating units joined by covalent bonds',
        'A small molecule like water',
        'A structure with delocalised electrons'
      ],
      correctAnswer: 'A very large molecule made of many repeating units joined by covalent bonds'
    },
    {
      id: 'q4-8',
      question: 'Which of the following is a giant covalent structure?',
      options: ['Methane (CH₄)', 'Ammonia (NH₃)', 'Graphite', 'Polythene'],
      correctAnswer: 'Graphite'
    },
    {
      id: 'q4-9',
      question: 'How many covalent bonds does each carbon atom form in methane (CH₄)?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '4'
    },
    {
      id: 'q4-10',
      question: 'In a dot and cross diagram for a covalent molecule, what does a pair of a dot and a cross between two atoms represent?',
      options: [
        'A lone pair of electrons',
        'A transferred electron',
        'A shared pair of electrons forming a covalent bond',
        'An intermolecular force'
      ],
      correctAnswer: 'A shared pair of electrons forming a covalent bond'
    }
  ],
  'q5': [
    {
      id: 'q5-1',
      question: 'Metallic bonding occurs in...',
      options: [
        'Non-metals only',
        'Metals and metal alloys',
        'Ionic compounds',
        'Covalent molecules'
      ],
      correctAnswer: 'Metals and metal alloys'
    },
    {
      id: 'q5-2',
      question: 'What does a metallic bond consist of?',
      options: [
        'The sharing of electrons between two atoms',
        'The transfer of electrons between atoms',
        'The electrostatic attraction between positive metal ions and delocalized electrons',
        'The attraction between oppositely charged ions'
      ],
      correctAnswer: 'The electrostatic attraction between positive metal ions and delocalized electrons'
    },
    {
      id: 'q5-3',
      question: 'Why are metals good conductors of electricity?',
      options: [
        'Because they have high melting points',
        'Because the ions can move',
        'Because the delocalized electrons are free to move and carry charge',
        'Because they are shiny'
      ],
      correctAnswer: 'Because the delocalized electrons are free to move and carry charge'
    },
    {
      id: 'q5-4',
      question: 'The term "sea of electrons" is used to describe the electrons in which type of bonding?',
      options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
      correctAnswer: 'Metallic'
    },
    {
      id: 'q5-5',
      question: 'What is a mixture of metals called?',
      options: ['A compound', 'An isotope', 'An allotrope', 'An alloy'],
      correctAnswer: 'An alloy'
    }
  ],
    'q6': [
    {
      id: 'q6-1',
      question: 'What is a disadvantage of using dot and cross diagrams?',
      options: [
        'They don\'t show which atom the electrons come from',
        'They don\'t show the transfer of electrons',
        'They fail to illustrate the 3D arrangement of atoms',
        'They are too complex to draw'
      ],
      correctAnswer: 'They fail to illustrate the 3D arrangement of atoms'
    },
    {
      id: 'q6-2',
      question: 'What is an advantage of a ball and stick model?',
      options: [
        'It accurately shows the space between atoms',
        'It shows the movement of electrons',
        'It is useful for visualizing the 3D shape of a molecule',
        'It shows the relative sizes of atoms perfectly'
      ],
      correctAnswer: 'It is useful for visualizing the 3D shape of a molecule'
    },
    {
      id: 'q6-3',
      question: 'Which model incorrectly represents ionic bonds as "sticks" between ions?',
      options: ['Dot and cross diagram', '2D representation', '3D ball and stick model', '3D space-filling model'],
      correctAnswer: '3D ball and stick model'
    },
    {
      id: 'q6-4',
      question: 'What is a disadvantage of 2D displayed formulae?',
      options: [
        'They don\'t show which atoms are connected',
        'They are too complicated',
        'They cannot give you an idea of the 3D shape of a molecule',
        'They show the electrons'
      ],
      correctAnswer: 'They cannot give you an idea of the 3D shape of a molecule'
    },
    {
      id: 'q6-5',
      question: 'Which model gives a more accurate representation of the space between ions in a lattice?',
      options: ['3D ball and stick model', 'Dot and cross diagram', '2D displayed formula', '3D space-filling model'],
      correctAnswer: '3D space-filling model'
    }
  ]
};
