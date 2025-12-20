
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
    { id: 'q1', title: 'Stoichiometric relationships', cardCount: 10, progress: 0 },
    { id: 'q2', title: 'Atomic structure', cardCount: 10, progress: 0 },
    { id: 'q3', title: 'Periodicity', cardCount: 10, progress: 0 },
    { id: 'q4', title: 'Chemical bonding and structure', cardCount: 10, progress: 0 },
    { id: 'q5', title: 'Energetics/thermochemistry', cardCount: 10, progress: 0 },
    { id: 'q6', title: 'Chemical kinetics', cardCount: 10, progress: 0 },
    { id: 'q7', title: 'Equilibrium', cardCount: 10, progress: 0 },
    { id: 'q8', title: 'Acids and bases', cardCount: 10, progress: 0 },
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
    },
    { id: 'q1-3', question: 'How many moles are in 40g of NaOH? (Ar: Na=23, O=16, H=1)', options: ['1 mole', '2 moles', '0.5 moles', '40 moles'], correctAnswer: '1 mole' },
    { id: 'q1-4', question: 'What is the empirical formula of a compound containing 40% Carbon, 6.7% Hydrogen, and 53.3% Oxygen by mass?', options: ['CH2O', 'C2H4O2', 'CHO', 'CH3O'], correctAnswer: 'CH2O' },
    { id: 'q1-5', question: 'Which of the following is NOT a state of matter?', options: ['Solid', 'Liquid', 'Gas', 'Molecule'], correctAnswer: 'Molecule' },
    { id: 'q1-6', question: 'What volume does one mole of any gas occupy at room temperature and pressure (RTP)?', options: ['22.4 dm^3', '24.0 dm^3', '1.0 dm^3', 'Depends on the gas'], correctAnswer: '24.0 dm^3' },
    { id: 'q1-7', question: 'In the reaction 2H₂ + O₂ → 2H₂O, what is the mole ratio of hydrogen to oxygen?', options: ['1:1', '2:1', '1:2', '2:2'], correctAnswer: '2:1' },
    { id: 'q1-8', question: 'The molecular formula C₄H₈O₂ is consistent with which empirical formula?', options: ['C₂H₄O', 'CHO', 'C₄H₈O₂', 'CH₂O'], correctAnswer: 'C₂H₄O' },
    { id: 'q1-9', question: 'What is the concentration of a solution with 0.5 moles of NaCl dissolved in 2 dm³ of water?', options: ['0.25 mol/dm³', '0.5 mol/dm³', '1.0 mol/dm³', '2.0 mol/dm³'], correctAnswer: '0.25 mol/dm³' },
    { id: 'q1-10', question: 'In a chemical reaction, the substance that is completely consumed is called the...?', options: ['Excess reactant', 'Limiting reactant', 'Product', 'Catalyst'], correctAnswer: 'Limiting reactant' }
  ],
  'q2': [
    { id: 'q2-1', question: 'Which subatomic particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correctAnswer: 'Electron' },
    { id: 'q2-2', question: 'The nucleus of an atom contains...', options: ['Protons only', 'Neutrons only', 'Protons and neutrons', 'Protons, neutrons, and electrons'], correctAnswer: 'Protons and neutrons' },
    { id: 'q2-3', question: 'Isotopes of an element have the same number of protons but a different number of...', options: ['Electrons', 'Neutrons', 'Nuclei', 'Orbitals'], correctAnswer: 'Neutrons' },
    { id: 'q2-4', question: 'What is the electron configuration of a neutral Sodium atom (Na, atomic number 11)?', options: ['2, 8, 1', '2, 8, 8', '2, 1, 8', '1s²2s²2p⁶3s²'], correctAnswer: '2, 8, 1' },
    { id: 'q2-5', question: 'The mass number of an atom is the total number of...', options: ['Protons', 'Electrons', 'Protons and neutrons', 'Protons and electrons'], correctAnswer: 'Protons and neutrons' },
    { id: 'q2-6', question: 'Which scientist discovered the nucleus with the gold foil experiment?', options: ['J.J. Thomson', 'John Dalton', 'Ernest Rutherford', 'Niels Bohr'], correctAnswer: 'Ernest Rutherford' },
    { id: 'q2-7', question: 'The first shell in an atom can hold a maximum of how many electrons?', options: ['1', '2', '8', '18'], correctAnswer: '2' },
    { id: 'q2-8', question: 'What does the atomic number of an element represent?', options: ['Number of neutrons', 'Number of protons', 'Number of protons and neutrons', 'Number of electrons in a neutral atom'], correctAnswer: 'Number of protons' },
    { id: 'q2-9', question: 'Which type of radiation is a high-energy electron emitted from the nucleus?', options: ['Alpha particle', 'Beta particle', 'Gamma ray', 'Neutron'], correctAnswer: 'Beta particle' },
    { id: 'q2-10', question: 'What is the name for the region of space where an electron is most likely to be found?', options: ['Nucleus', 'Shell', 'Orbital', 'Level'], correctAnswer: 'Orbital' }
  ],
  'q3': [
    { id: 'q3-1', question: 'Elements in the same group of the periodic table have the same number of...', options: ['Valence electrons', 'Protons', 'Neutrons', 'Energy shells'], correctAnswer: 'Valence electrons' },
    { id: 'q3-2', question: 'Which of the following elements is a halogen?', options: ['Sodium (Na)', 'Chlorine (Cl)', 'Helium (He)', 'Iron (Fe)'], correctAnswer: 'Chlorine (Cl)' },
    { id: 'q3-3', question: 'Which trend decreases as you go from left to right across a period in the periodic table?', options: ['Atomic radius', 'Ionization energy', 'Electronegativity', 'Electron affinity'], correctAnswer: 'Atomic radius' },
    { id: 'q3-4', question: 'Which group of elements is known as the alkali metals?', options: ['Group 1', 'Group 2', 'Group 17', 'Group 18'], correctAnswer: 'Group 1' },
    { id: 'q3-5', question: 'What is the name for the elements in Group 18?', options: ['Halogens', 'Alkaline earth metals', 'Noble gases', 'Transition metals'], correctAnswer: 'Noble gases' },
    { id: 'q3-6', question: 'Electronegativity is a measure of an atom\'s ability to...', options: ['Lose electrons', 'Gain electrons', 'Attract electrons in a chemical bond', 'Form positive ions'], correctAnswer: 'Attract electrons in a chemical bond' },
    { id: 'q3-7', question: 'Which element has the highest first ionization energy?', options: ['Helium (He)', 'Hydrogen (H)', 'Lithium (Li)', 'Francium (Fr)'], correctAnswer: 'Helium (He)' },
    { id: 'q3-8', question: 'The elements in the d-block of the periodic table are known as...', options: ['Actinides', 'Lanthanides', 'Main group elements', 'Transition metals'], correctAnswer: 'Transition metals' },
    { id: 'q3-9', question: 'As you go down a group, the atomic radius...', options: ['Increases', 'Decreases', 'Stays the same', 'Varies unpredictably'], correctAnswer: 'Increases' },
    { id: 'q3-10', question: 'The ability of metallic oxides to act as bases and non-metallic oxides to act as acids demonstrates which trend?', options: ['Atomic radius', 'Ionization energy', 'Metallic character', 'Acid-base character of oxides'], correctAnswer: 'Acid-base character of oxides' }
  ],
  'q4': [
    { id: 'q4-1', question: 'What type of bond is formed by the transfer of electrons between atoms?', options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'], correctAnswer: 'Ionic bond' },
    { id: 'q4-2', question: 'Which of the following is a property of ionic compounds?', options: ['Low melting point', 'Insoluble in water', 'Conducts electricity when molten or dissolved', 'Forms discrete molecules'], correctAnswer: 'Conducts electricity when molten or dissolved' },
    { id: 'q4-3', question: 'A covalent bond is formed by the...', options: ['Transfer of electrons', 'Sharing of electrons', 'Sea of delocalized electrons', 'Attraction between ions'], correctAnswer: 'Sharing of electrons' },
    { id: 'q4-4', question: 'Which of the following molecules has a double bond?', options: ['H₂', 'O₂', 'N₂', 'Cl₂'], correctAnswer: 'O₂' },
    { id: 'q4-5', question: 'What is the shape of a methane (CH₄) molecule?', options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Pyramidal'], correctAnswer: 'Tetrahedral' },
    { id: 'q4-6', question: 'Which type of intermolecular force is the strongest?', options: ['Van der Waals forces', 'Dipole-dipole forces', 'Hydrogen bonding', 'Ionic bonding'], correctAnswer: 'Hydrogen bonding' },
    { id: 'q4-7', question: 'Diamond and graphite are both allotropes of which element?', options: ['Silicon', 'Carbon', 'Oxygen', 'Sulfur'], correctAnswer: 'Carbon' },
    { id: 'q4-8', question: 'What holds metal atoms together in a metallic bond?', options: ['Shared electrons between two atoms', 'Electrostatic attraction between positive and negative ions', 'Electrostatic attraction between positive metal ions and delocalized electrons', 'Intermolecular forces'], correctAnswer: 'Electrostatic attraction between positive metal ions and delocalized electrons' },
    { id: 'q4-9', question: 'A molecule that has a slight positive charge on one side and a slight negative charge on the other is called a...', options: ['Nonpolar molecule', 'Polar molecule', 'Ion', 'Isotope'], correctAnswer: 'Polar molecule' },
    { id: 'q4-10', question: 'VSEPR theory is used to predict the...', options: ['Boiling point of a substance', 'Shape of a molecule', 'Type of bond', 'Number of isotopes'], correctAnswer: 'Shape of a molecule' }
  ],
  'q5': [
    { id: 'q5-1', question: 'A reaction that releases heat into the surroundings is called...', options: ['Endothermic', 'Exothermic', 'Exergonic', 'Endergonic'], correctAnswer: 'Exothermic' },
    { id: 'q5-2', question: 'Enthalpy change (ΔH) for an exothermic reaction is...', options: ['Positive', 'Negative', 'Zero', 'Variable'], correctAnswer: 'Negative' },
    { id: 'q5-3', question: 'Hess\'s Law states that the total enthalpy change for a reaction is...', options: ['Dependent on the path taken', 'Independent of the path taken', 'Always zero', 'Equal to the activation energy'], correctAnswer: 'Independent of the path taken' },
    { id: 'q5-4', question: 'The energy required to break one mole of a specific type of bond in a gaseous state is called...', options: ['Enthalpy of formation', 'Enthalpy of combustion', 'Lattice enthalpy', 'Bond enthalpy'], correctAnswer: 'Bond enthalpy' },
    { id: 'q5-5', question: 'In calorimetry, the heat change of a reaction is calculated using the formula...', options: ['q = m / cΔT', 'q = mc / ΔT', 'q = mΔT / c', 'q = mcΔT'], correctAnswer: 'q = mcΔT' },
    { id: 'q5-6', question: 'What is the standard enthalpy of formation (ΔH°f) of an element in its standard state?', options: ['Positive', 'Negative', 'Zero', 'Depends on the element'], correctAnswer: 'Zero' },
    { id: 'q5-7', question: 'Breaking bonds is an __________ process.', options: ['Exothermic', 'Endothermic', 'Spontaneous', 'Non-spontaneous'], correctAnswer: 'Endothermic' },
    { id: 'q5-8', question: 'A measure of the disorder or randomness of a system is called...', options: ['Enthalpy', 'Entropy', 'Gibbs free energy', 'Internal energy'], correctAnswer: 'Entropy' },
    { id: 'q5-9', question: 'Which of the following processes would have a positive entropy change (ΔS)?', options: ['Freezing water', 'Condensing steam', 'Sublimation of dry ice', 'Crystallizing salt from a solution'], correctAnswer: 'Sublimation of dry ice' },
    { id: 'q5-10', question: 'The overall energy change in a chemical reaction is the difference between the energy required to break bonds and the energy...', options: ['Absorbed when new bonds are formed', 'Released when new bonds are formed', 'Used to start the reaction', 'Lost to the surroundings'], correctAnswer: 'Released when new bonds are formed' }
  ],
  'q6': [
    { id: 'q6-1', question: 'According to collision theory, for a reaction to occur, particles must collide with...', options: ['Any orientation and any energy', 'The correct orientation and sufficient energy', 'Low energy', 'High pressure'], correctAnswer: 'The correct orientation and sufficient energy' },
    { id: 'q6-2', question: 'The minimum energy required for a reaction to occur is called the...', options: ['Enthalpy change', 'Activation energy', 'Kinetic energy', 'Potential energy'], correctAnswer: 'Activation energy' },
    { id: 'q6-3', question: 'Which of the following factors will increase the rate of a reaction?', options: ['Decreasing the temperature', 'Decreasing the concentration', 'Adding a catalyst', 'Using larger reactant particles'], correctAnswer: 'Adding a catalyst' },
    { id: 'q6-4', question: 'A substance that increases the rate of a reaction without being consumed is called a...', options: ['Reactant', 'Product', 'Inhibitor', 'Catalyst'], correctAnswer: 'Catalyst' },
    { id: 'q6-5', question: 'How does increasing the temperature increase the rate of reaction?', options: ['It decreases the activation energy', 'It increases the frequency of collisions and the energy of collisions', 'It increases the concentration of reactants', 'It changes the reaction pathway'], correctAnswer: 'It increases the frequency of collisions and the energy of collisions' },
    { id: 'q6-6', question: 'The rate of reaction is often measured as the change in...', options: ['Temperature over time', 'Pressure over time', 'Concentration of a reactant or product over time', 'Volume over time'], correctAnswer: 'Concentration of a reactant or product over time' },
    { id: 'q6-7', question: 'A Maxwell-Boltzmann distribution curve shows the distribution of...', options: ['Activation energies', 'Kinetic energies of particles', 'Reaction rates', 'Enthalpy changes'], correctAnswer: 'Kinetic energies of particles' },
    { id: 'q6-8', question: 'How does a catalyst increase the rate of reaction?', options: ['It increases the kinetic energy of particles', 'It provides an alternative reaction pathway with a lower activation energy', 'It increases the number of collisions', 'It shifts the equilibrium to the right'], correctAnswer: 'It provides an alternative reaction pathway with a lower activation energy' },
    { id: 'q6-9', question: 'Increasing the surface area of a solid reactant will...', options: ['Decrease the reaction rate', 'Increase the reaction rate', 'Have no effect on the reaction rate', 'Increase the activation energy'], correctAnswer: 'Increase the reaction rate' },
    { id: 'q6-10', question: 'The exponents in a rate law (rate equation) are determined by...', options: ['The balanced chemical equation', 'The temperature', 'Experimental data', 'The pressure'], correctAnswer: 'Experimental data' }
  ],
  'q7': [
    { id: 'q7-1', question: 'Chemical equilibrium is reached when...', options: ['The concentrations of reactants and products are equal', 'The forward and reverse reaction rates are equal', 'The reaction stops', 'All reactants have been converted to products'], correctAnswer: 'The forward and reverse reaction rates are equal' },
    { id: 'q7-2', question: 'Le Chatelier\'s principle states that if a change is made to a system at equilibrium...', options: ['The system will stop reacting', 'The equilibrium constant will change', 'The system will shift to counteract the change', 'The reaction will become non-spontaneous'], correctAnswer: 'The system will shift to counteract the change' },
    { id: 'q7-3', question: 'For the reaction N₂ (g) + 3H₂ (g) ⇌ 2NH₃ (g) (ΔH is negative), increasing the pressure will...', options: ['Shift the equilibrium to the left', 'Shift the equilibrium to the right', 'Have no effect', 'Decrease the reaction rate'], correctAnswer: 'Shift the equilibrium to the right' },
    { id: 'q7-4', question: 'For the same reaction (N₂ + 3H₂ ⇌ 2NH₃), increasing the temperature will...', options: ['Shift the equilibrium to the left', 'Shift the equilibrium to the right', 'Have no effect', 'Increase the equilibrium constant'], correctAnswer: 'Shift the equilibrium to the left' },
    { id: 'q7-5', question: 'What is the only factor that can change the value of the equilibrium constant (Kc)?', options: ['Pressure', 'Concentration', 'Temperature', 'Catalyst'], correctAnswer: 'Temperature' },
    { id: 'q7-6', question: 'What is the expression for the equilibrium constant (Kc) for the reaction aA + bB ⇌ cC + dD?', options: ['[A]ª[B]ᵇ / [C]ᶜ[D]ᵈ', '[C]ᶜ[D]ᵈ / [A]ª[B]ᵇ', '[A][B] / [C][D]', '[C][D] / [A][B]'], correctAnswer: '[C]ᶜ[D]ᵈ / [A]ª[B]ᵇ' },
    { id: 'q7-7', question: 'A large value for Kc (e.g., Kc > 1) indicates that at equilibrium...', options: ['The concentration of reactants is high', 'The concentration of products is high', 'The reaction is slow', 'The reaction is endothermic'], correctAnswer: 'The concentration of products is high' },
    { id: 'q7-8', question: 'How does a catalyst affect a system at equilibrium?', options: ['It shifts the equilibrium to the right', 'It shifts the equilibrium to the left', 'It increases the rate of the forward and reverse reactions equally', 'It increases the equilibrium constant'], correctAnswer: 'It increases the rate of the forward and reverse reactions equally' },
    { id: 'q7-9', question: 'If you remove a product from a system at equilibrium, the equilibrium will...', options: ['Shift to the left to produce more reactant', 'Shift to the right to produce more product', 'Not change', 'Stop'], correctAnswer: 'Shift to the right to produce more product' },
    { id: 'q7-10', question: 'Which states of matter are typically included in the equilibrium constant expression?', options: ['Solids and liquids', 'Liquids and gases', 'Gases and aqueous solutions', 'Solids and gases'], correctAnswer: 'Gases and aqueous solutions' }
  ],
  'q8': [
    { id: 'q8-1', question: 'According to the Brønsted-Lowry theory, an acid is a...', options: ['Proton donor', 'Proton acceptor', 'Electron donor', 'Electron acceptor'], correctAnswer: 'Proton donor' },
    { id: 'q8-2', question: 'A substance that can act as both an acid and a base is called...', options: ['Neutral', 'Isotopic', 'Amphiprotic', 'Aprotic'], correctAnswer: 'Amphiprotic' },
    { id: 'q8-3', question: 'A solution with a pH of 3 is...', options: ['Acidic', 'Basic', 'Neutral', 'Salty'], correctAnswer: 'Acidic' },
    { id: 'q8-4', question: 'Which of the following is a strong acid?', options: ['Acetic acid (CH₃COOH)', 'Carbonic acid (H₂CO₃)', 'Hydrochloric acid (HCl)', 'Phosphoric acid (H₃PO₄)'], correctAnswer: 'Hydrochloric acid (HCl)' },
    { id: 'q8-5', question: 'The reaction between an acid and a base is called...', options: ['Combustion', 'Decomposition', 'Oxidation', 'Neutralization'], correctAnswer: 'Neutralization' },
    { id: 'q8-6', question: 'What are the products of the reaction between hydrochloric acid (HCl) and sodium hydroxide (NaOH)?', options: ['Sodium chloride and water', 'Sodium hydride and chlorine oxide', 'Sodium and chloric acid', 'No reaction occurs'], correctAnswer: 'Sodium chloride and water' },
    { id: 'q8-7', question: 'A strong acid in solution is...', options: ['Partially ionized', 'Fully ionized', 'Not ionized', 'Concentrated'], correctAnswer: 'Fully ionized' },
    { id: 'q8-8', question: 'What is the pH of pure water at 25°C?', options: ['0', '7', '14', '1'], correctAnswer: '7' },
    { id: 'q8-9', question: 'Acid rain is mainly caused by the dissolution of which gases in the atmosphere?', options: ['Oxygen and nitrogen', 'Carbon dioxide and methane', 'Sulfur dioxide and nitrogen oxides', 'Helium and argon'], correctAnswer: 'Sulfur dioxide and nitrogen oxides' },
    { id: 'q8-10', question: 'A buffer solution is a solution that...', options: ['Resists changes in pH', 'Has a pH of 7', 'Is highly acidic', 'Is highly basic'], correctAnswer: 'Resists changes in pH' }
  ]
};
