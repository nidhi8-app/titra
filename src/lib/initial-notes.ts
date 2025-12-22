
import type { Note } from './types';

// Omit 'id' and 'deckId' as they will be assigned dynamically
export type InitialNoteSeed = Omit<Note, 'id' | 'deckId'>;

export const initialNotesData: { [deckId: string]: InitialNoteSeed[] } = {
  'deck1': [
    {
        title: 'Atoms, elements and compounds',
        body: `All substances are made of atoms.
An atom is the smallest part of an element that can exist.
Atoms of each element are represented by a chemical symbol, eg O represents an atom of oxygen, Na represents an atom of sodium.
There are about 100 different elements.
Elements are shown in the periodic table.
Compounds are formed from elements by chemical reactions.
Chemical reactions always involve the formation of one or more new substances, and often involve a detectable energy change.
Compounds contain two or more elements chemically combined in fixed proportions and can be represented by formulae using the symbols of the atoms from which they were formed.
Compounds can only be separated into elements by chemical reactions.
Chemical reactions can be represented by word equations or equations using symbols and formulae.`,
        examSkills: `Students will be supplied with a periodic table for the exam and should be able to:
- use the names and symbols of the first 20 elements in the periodic table, the elements in Groups 1 and 7, and other elements in this specification
- name compounds of these elements from given formulae or symbol equations
- write word equations for the reactions in this specification
- write formulae and balanced chemical equations for the reactions in this specification
- (HT only) write balanced half equations and ionic equations where appropriate.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  ],
  'deck2': [
    {
      title: 'Types of Bonding',
      body: 'There are three main types of chemical bonding: ionic, covalent, and metallic. Ionic bonding involves the transfer of electrons between a metal and a non-metal. Covalent bonding involves the sharing of electrons between non-metal atoms. Metallic bonding involves a lattice of positive ions in a sea of delocalised electrons.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Properties of Matter',
      body: 'The type of bonding and structure determines the properties of a substance. For example, giant ionic lattices have high melting points and conduct electricity when molten or dissolved. Simple covalent molecules have low melting points and do not conduct electricity. Giant covalent structures have very high melting points. Metals are malleable and conduct electricity.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck3': [
    {
      title: 'The Mole Concept',
      body: 'A mole is a unit of measurement for the amount of a substance. One mole of any substance contains the same number of particles, known as the Avogadro constant (6.02 x 10^23). The mass of one mole of a substance is its relative formula mass in grams.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck4': [
    {
      title: 'Reactivity of Metals',
      body: 'The reactivity of metals is determined by their tendency to lose electrons and form positive ions. The reactivity series lists metals in order of their reactivity. A more reactive metal can displace a less reactive metal from its compound.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Acids and Bases',
      body: 'Acids are substances that produce H+ ions in aqueous solution. Bases are substances that can neutralise an acid. Alkalis are soluble bases that produce OH- ions in aqueous solution. The reaction between an acid and a base is called neutralisation, which produces a salt and water.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck5': [
    {
      title: 'Exothermic and Endothermic Reactions',
      body: 'An exothermic reaction is one that transfers energy to the surroundings, usually in the form of heat, causing a temperature increase. An endothermic reaction is one that takes in energy from the surroundings, causing a temperature decrease. Bond breaking is an endothermic process, while bond making is an exothermic process.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck6': [
    {
      title: 'Rates of Reaction',
      body: 'The rate of a chemical reaction can be affected by several factors: temperature, concentration (or pressure for gases), surface area, and the presence of a catalyst. The collision theory states that for a reaction to occur, particles must collide with sufficient energy (activation energy).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Reversible Reactions and Equilibrium',
      body: 'Some reactions are reversible, meaning the products can react to re-form the reactants. In a closed system, a reversible reaction can reach a state of dynamic equilibrium, where the forward and reverse reactions occur at the same rate, and the concentrations of reactants and products remain constant.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck7': [
    {
      title: 'Crude Oil and Hydrocarbons',
      body: 'Crude oil is a finite resource and a complex mixture of hydrocarbons. It is separated into fractions with different boiling points by fractional distillation. Many hydrocarbons are alkanes, which are a homologous series of saturated hydrocarbons with the general formula CnH2n+2.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck8': [
    {
      title: 'Purity and Formulations',
      body: 'In chemistry, a pure substance consists of only one element or one compound. Melting and boiling point data can be used to distinguish pure substances from mixtures. A formulation is a mixture that has been designed as a useful product, such as fuels, paints, and medicines.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Identification of Ions',
      body: 'Flame tests are used to identify metal ions (cations) by the colour they produce in a flame. For example, lithium produces a crimson flame. Anions, such as carbonate or sulfate ions, can be identified using specific chemical tests that often produce a precipitate.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck9': [
    {
      title: 'The Earth\'s Atmosphere',
      body: 'The Earth\'s early atmosphere was very different from today. It was likely formed by volcanic activity and consisted mainly of carbon dioxide with little or no oxygen. The evolution of the atmosphere involved processes like the condensation of water vapour to form oceans and the increase of oxygen due to photosynthesis by algae and plants.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Climate Change',
      body: 'Greenhouse gases, such as carbon dioxide, methane, and water vapour, maintain temperatures on Earth high enough to support life. Human activities, particularly burning fossil fuels, are increasing the levels of these gases, leading to an enhanced greenhouse effect and global climate change.',
      createdAt: new Date("2024-10-06T12:00:00.000Z"),
      updatedAt: new Date("2024-10-06T12:00:00.000Z"),
    },
  ],
  'deck10': [
    {
      title: 'Using the Earth\'s Resources',
      body: 'Humans use the Earth\'s resources to provide warmth, shelter, food, and transport. Natural resources, supplemented by agriculture, provide food, timber, clothing, and fuels. Finite resources from the Earth, oceans, and atmosphere are processed to make synthetic products.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Sustainability and Recycling',
      body: 'Sustainable development involves meeting the needs of the present generation without compromising the ability of future generations to meet their own needs. It is important to reduce the use of finite resources, reuse materials, and recycle where possible. This reduces waste, pollution, and the need to extract new raw materials.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck11': [
    {
      title: 'Key Ideas in Chemistry',
      body: 'This section brings together the fundamental principles of chemistry. It includes the idea that matter is made of atoms, which are rearranged during chemical reactions. The periodic table is a key tool for understanding the properties of elements. The energy changes and rates of these reactions are also central concepts.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
