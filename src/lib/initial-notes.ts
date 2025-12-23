
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
Chemical reactions can be represented by word equations or equations using symbols and formulae.

---

### 4.1.1.2 Mixtures

A mixture consists of two or more elements or compounds not chemically combined together.

The chemical properties of each substance in the mixture are unchanged.

Mixtures can be separated by physical processes such as:

*   filtration
*   crystallisation
*   simple distillation
*   fractional distillation
*   chromatography

These physical processes do not involve chemical reactions and no new substances are made.

**Students should be able to:**

*   describe, explain and give examples of the specified processes of separation
*   suggest suitable separation and purification techniques for mixtures when given appropriate information

### 4.1.1.3 The development of the model of the atom

(common content with physics)

New experimental evidence may lead to a scientific model being changed or replaced.

Before the discovery of the electron, atoms were thought to be tiny spheres that could not be divided.

The discovery of the electron led to the plum pudding model of the atom.

The plum pudding model suggested that the atom is a ball of positive charge with negative electrons embedded in it.

The results from the alpha particle scattering experiment led to the conclusion that:

*   the mass of an atom was concentrated at the centre (nucleus)
*   the nucleus was charged

This nuclear model replaced the plum pudding model.

Niels Bohr adapted the nuclear model by suggesting that electrons orbit the nucleus at specific distances.

The theoretical calculations of Bohr agreed with experimental observations.

Later experiments led to the idea that the positive charge of any nucleus could be subdivided into a whole number of smaller particles, each particle having the same amount of positive charge.

The name proton was given to these particles.

The experimental work of James Chadwick provided the evidence to show the existence of neutrons within the nucleus.

This was about 20 years after the nucleus became an accepted scientific idea.

### 4.1.1.4 Relative electrical charges of subatomic particles

The relative electrical charges of the particles in atoms are:

| Name | Relative charge |
| :--- | :--- |
| Proton | +1 |
| Neutron | 0 |
| Electron | -1 |

In an atom, the number of electrons is equal to the number of protons in the nucleus.

Atoms have no overall electrical charge.

The number of protons in an atom of an element is its atomic number.

All atoms of a particular element have the same number of protons.

Atoms of different elements have different numbers of protons.

### 4.1.1.5 Size and mass of atoms

Atoms are very small, having a radius of about 0.1 nm (1 × 10⁻¹⁰ m).

The radius of a nucleus is less than 1/10 000 of that of the atom (about 1 × 10⁻¹⁴ m).

Almost all of the mass of an atom is in the nucleus.

The relative masses of protons, neutrons and electrons are:

| Name | Relative mass |
| :--- | :--- |
| Proton | 1 |
| Neutron | 1 |
| Electron | Very small |

The sum of the protons and neutrons in an atom is its mass number.

Atoms of the same element can have different numbers of neutrons; these atoms are called isotopes of that element.

### 4.1.1.6 Relative atomic mass

The relative atomic mass of an element is an average value that takes account of the abundance of the isotopes of the element.

### 4.1.1.7 Electronic structure

The electrons in an atom occupy the lowest available energy levels (innermost available shells).

The electronic structure of an atom can be represented by numbers or by a diagram.

For example, the electronic structure of sodium is 2,8,1.

### 4.1.2 The periodic table

The elements in the periodic table are arranged in order of atomic (proton) number and so that elements with similar properties are in columns, known as groups.

The table is called a periodic table because similar properties occur at regular intervals.

Elements in the same group have the same number of electrons in their outer shell and this gives them similar chemical properties.

### 4.1.2.2 Development of the periodic table

Before the discovery of protons, neutrons and electrons, scientists attempted to classify the elements by arranging them in order of their atomic weights.

Mendeleev overcame some of the problems by leaving gaps for elements that he thought had not been discovered and in some places changed the order based on atomic weights.

Knowledge of isotopes made it possible to explain why the order based on atomic weights was not always correct.

### 4.1.2.3 Metals and non-metals

Elements that react to form positive ions are metals. Elements that do not form positive ions are non-metals.

Metals are found to the left and towards the bottom of the periodic table. Non-metals are found towards the right and top.

### 4.1.2.4 Group 0

The elements in Group 0 are called the noble gases. They are unreactive and do not easily form molecules because their atoms have stable arrangements of electrons (a full outer shell).

The boiling points of the noble gases increase with increasing relative atomic mass (going down the group).

### 4.1.2.5 Group 1

The elements in Group 1 are known as the alkali metals and have characteristic properties because of the single electron in their outer shell. Reactivity increases going down the group.

### 4.1.2.6 Group 7

The elements in Group 7 are known as the halogens. They are non-metals and consist of molecules made of pairs of atoms. Reactivity decreases going down the group.

A more reactive halogen can displace a less reactive halogen from an aqueous solution of its salt.
`,
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
