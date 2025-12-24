
import type { Note } from './types';

// Omit 'id' and 'deckId' as they will be assigned dynamically
export type InitialNoteSeed = Omit<Note, 'id' | 'deckId'>;

export type NoteSection = {
    title: string;
    content: string;
    subsections: NoteSection[];
};

export function parseNotes(notes: (Note | InitialNoteSeed)[]): NoteSection[] {
    const sections: NoteSection[] = [];
    let currentSection: NoteSection | null = null;
    let currentSubsection: NoteSection | null = null;
    let currentSubSubSection: NoteSection | null = null;

    notes.forEach(note => {
        // For decks with one large note, parse its body for sections.
        if (notes.length === 1) { 
             const lines = note.body.split('\n');
            let mainSection: NoteSection | null = null;

            lines.forEach(line => {
                const trimmedLine = line.trim();
                
                if (trimmedLine.match(/^(\d+\.){2,}\d*\s/)) { 
                    if (!mainSection) {
                         mainSection = { title: note.title, content: '', subsections: [] };
                         sections.push(mainSection);
                    }
                    // This is a subsection, create a new one
                    currentSubsection = { title: trimmedLine, content: '', subsections: [] };
                    mainSection.subsections.push(currentSubsection);

                } else if (trimmedLine.match(/^(\d+\.)+\d*\s/)) { // Main section title
                     if (!mainSection) {
                         mainSection = { title: note.title, content: '', subsections: [] };
                         sections.push(mainSection);
                    }
                     mainSection.subsections.push({ title: trimmedLine, content: '', subsections: [] });
                     currentSubsection = mainSection.subsections[mainSection.subsections.length - 1];

                }
                else if (trimmedLine.length > 0) {
                     const target = currentSubsection || mainSection;
                     if (target) {
                         target.content = target.content ? `${target.content}\n${trimmedLine}` : trimmedLine;
                     }
                }
            });

        } else { // For decks with multiple small notes, treat each note as a top-level section.
            currentSection = {
                title: note.title,
                content: note.body,
                subsections: [],
            };
            sections.push(currentSection);
        }
    });

    return sections;
}


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
        createdAt: new Date(),
        updatedAt: new Date(),
        examSkills: `Students will be supplied with a periodic table for the exam and should be able to:
- use the names and symbols of the first 20 elements in the periodic table, the elements in Groups 1 and 7, and other elements in this specification
- name compounds of these elements from given formulae or symbol equations
- write word equations for the reactions in this specification
- write formulae and balanced chemical equations for the reactions in this specification
- (HT only) write balanced half equations and ionic equations where appropriate.`
    },
    {
      title: 'Mixtures',
      body: `A mixture consists of two or more elements or compounds not chemically combined together.
The chemical properties of each substance in the mixture are unchanged.
Mixtures can be separated by physical processes such as:
- filtration
- crystallisation
- simple distillation
- fractional distillation
- chromatography
These physical processes do not involve chemical reactions and no new substances are made.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The development of the model of the atom',
      body: `New experimental evidence may lead to a scientific model being changed or replaced.
Before the discovery of the electron, atoms were thought to be tiny spheres that could not be divided.
The discovery of the electron led to the plum pudding model of the atom.
The plum pudding model suggested that the atom is a ball of positive charge with negative electrons embedded in it.
The results from the alpha particle scattering experiment led to the conclusion that:
- the mass of an atom was concentrated at the centre (nucleus)
- the nucleus was charged
This nuclear model replaced the plum pudding model.
Niels Bohr adapted the nuclear model by suggesting that electrons orbit the nucleus at specific distances.
The theoretical calculations of Bohr agreed with experimental observations.
Later experiments led to the idea that the positive charge of any nucleus could be subdivided into a whole number of smaller particles, each particle having the same amount of positive charge.
The name proton was given to these particles.
The experimental work of James Chadwick provided the evidence to show the existence of neutrons within the nucleus.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Relative electrical charges of subatomic particles',
      body: `The relative electrical charges of the particles in atoms are:
- Proton: +1
- Neutron: 0
- Electron: -1
In an atom, the number of electrons is equal to the number of protons in the nucleus. Atoms have no overall electrical charge.
The number of protons in an atom of an element is its atomic number.
All atoms of a particular element have the same number of protons.
Atoms of different elements have different numbers of protons.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        title: 'Size and mass of atoms',
        body: `Atoms are very small, having a radius of about 0.1 nm (1 × 10⁻¹⁰ m).
The radius of a nucleus is less than 1/10 000 of that of the atom (about 1 × 10⁻¹⁴ m).
Almost all of the mass of an atom is in the nucleus.
The relative masses of protons, neutrons and electrons are:
- Proton: 1
- Neutron: 1
- Electron: Very small
The sum of the protons and neutrons in an atom is its mass number.
Atoms of the same element can have different numbers of neutrons; these atoms are called isotopes of that element.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Relative atomic mass',
        body: 'The relative atomic mass of an element is an average value that takes account of the abundance of the isotopes of the element.',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Electronic structure',
        body: `The electrons in an atom occupy the lowest available energy levels (innermost available shells).
The electronic structure of an atom can be represented by numbers or by a diagram.
For example, the electronic structure of sodium is 2,8,1.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'The periodic table',
        body: `The elements in the periodic table are arranged in order of atomic (proton) number and so that elements with similar properties are in columns, known as groups.
The table is called a periodic table because similar properties occur at regular intervals.
Elements in the same group have the same number of electrons in their outer shell (outer electrons) and this gives them similar chemical properties.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Development of the periodic table',
        body: `Before the discovery of protons, neutrons and electrons, scientists attempted to classify the elements by arranging them in order of their atomic weights.
The early periodic tables were incomplete and some elements were placed in inappropriate groups if the strict order of atomic weights was followed.
Mendeleev overcame some of the problems by leaving gaps for elements that he thought had not been discovered and in some places changed the order based on atomic weights.
Elements with properties predicted by Mendeleev were discovered and filled the gaps.
Knowledge of isotopes made it possible to explain why the order based on atomic weights was not always correct.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Metals and non-metals',
        body: `Elements that react to form positive ions are metals.
Elements that do not form positive ions are non-metals.
The majority of elements are metals.
Metals are found to the left and towards the bottom of the periodic table.
Non-metals are found towards the right and top of the periodic table.`,
        createdAt: new Date("2024-01-01T10:00:00.000Z"),
        updatedAt: new Date("2024-01-01T10:00:00.000Z"),
    },
    {
        title: 'Group 0 (Noble Gases)',
        body: `The elements in Group 0 are called the noble gases.
They are unreactive and do not easily form molecules because their atoms have stable arrangements of electrons.
The noble gases have eight electrons in their outer shell, except for helium, which has only two electrons.
The boiling points of the noble gases increase with increasing relative atomic mass (going down the group).`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Group 1 (Alkali Metals)',
        body: `The elements in Group 1 are known as the alkali metals and have characteristic properties because of the single electron in their outer shell.
In Group 1, the reactivity of the elements increases going down the group.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Group 7 (Halogens)',
        body: `The elements in Group 7 are known as the halogens and have similar reactions because they all have seven electrons in their outer shell.
The halogens are non-metals and consist of molecules made of pairs of atoms.
In Group 7, the further down the group an element is the higher its relative molecular mass, melting point and boiling point.
In Group 7, the reactivity of the elements decreases going down the group.
A more reactive halogen can displace a less reactive halogen from an aqueous solution of its salt.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Properties of transition metals (chemistry only)',
        body: `The transition elements are metals with similar properties which are different from those of the elements in Group 1.
Compared to Group 1, transition metals have:
- higher melting points and densities
- greater strength and hardness
- lower reactivity with oxygen, water and halogens
Many transition elements have ions with different charges, form coloured compounds and are useful as catalysts.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  ],
  'deck2': [
    {
      title: 'Bonding, structure, and the properties of matter',
      body: `4.2 Bonding, structure, and the properties of matter
Chemists use theories of structure and bonding to explain the physical and chemical properties of materials.
Atoms can be arranged in molecular structures or giant structures.
Bonding theories explain how atoms are held together.
Knowledge of structure and bonding is used to engineer new materials with desirable properties for different technologies.

4.2.1 Chemical bonds: ionic, covalent and metallic
4.2.1.1 Chemical bonds
There are three types of strong chemical bonds: ionic, covalent and metallic.
Ionic bonding: oppositely charged ions.
Covalent bonding: atoms share pairs of electrons.
Metallic bonding: atoms share delocalised electrons.
Ionic bonding occurs in compounds formed from metals and non-metals.
Covalent bonding occurs in non-metallic elements and compounds of non-metals.
Metallic bonding occurs in metals and alloys.
Chemical bonding is explained in terms of electrostatic forces and the transfer or sharing of electrons.

4.2.1.2 Ionic bonding
Electrons are transferred from metal atoms to non-metal atoms.
Metal atoms lose electrons to form positive ions.
Non-metal atoms gain electrons to form negative ions.
Ions formed have the electronic structure of a noble gas.
Electron transfer can be shown using dot and cross diagrams.
The charge on ions relates to the group number (Groups 1, 2, 6 and 7).

4.2.1.3 Ionic compounds
Ionic compounds are giant structures of ions.
They are held together by strong electrostatic forces in all directions (ionic bonding).
Students should be able to:
deduce that a compound is ionic from a diagram
describe limitations of diagrams
work out the empirical formula from a model
Sodium chloride is the required example.
Covalent bonding
Covalent bonds form when atoms share pairs of electrons.
Covalent bonds are strong.
Covalently bonded substances may be:
small molecules
very large molecules (polymers)
giant covalent structures (diamond, silicon dioxide)
Bonds can be shown using dot and cross, line diagrams, ball-and-stick and 3D diagrams.
Students should be able to draw diagrams for hydrogen, chlorine, oxygen, nitrogen, hydrogen chloride, water, ammonia and methane.

4.2.1.5 Metallic bonding
Metals consist of giant structures of atoms arranged in a regular pattern.
Delocalised electrons move through the structure.
Strong metallic bonds arise from sharing delocalised electrons.

4.2.2 Bonding and structure linked to properties
4.2.2.1 States of matter
The three states are solid, liquid and gas.
Changes of state occur at melting point and boiling point.
Particle theory explains changes of state.
The strength of forces between particles determines melting and boiling points.
Stronger forces → higher melting and boiling points.
(HT) Particle model limitations:
no forces
particles are solid spheres

4.2.2.2 State symbols
State symbols are: (s), (l), (g), (aq).
Used in chemical equations.

4.2.2.3 Properties of ionic compounds
Ionic compounds have giant ionic lattices.
Strong electrostatic forces give high melting and boiling points.
Conduct electricity when molten or dissolved because ions can move.

4.2.2.4 Properties of small molecules
Usually gases or liquids with low melting and boiling points.
Have weak intermolecular forces.
Do not conduct electricity.
Intermolecular forces increase with molecule size.

4.2.2.5 Polymers
Polymers have very large molecules.
Atoms are linked by strong covalent bonds.
Strong intermolecular forces make polymers solids at room temperature.

4.2.2.6 Giant covalent structures
Giant covalent structures are solids with very high melting points.
All atoms are linked by strong covalent bonds.
Examples: diamond, graphite, silicon dioxide.

4.2.2.7 Properties of metals and alloys
Metals have giant structures with metallic bonding.
High melting and boiling points.
Pure metals are malleable due to layers of atoms.
Alloys are harder because layers are distorted.

4.2.2.8 Metals as conductors
Metals conduct electricity due to delocalised electrons.
Thermal conductivity is also due to delocalised electrons.

4.2.3 Structure and bonding of carbon
Diamond
Each carbon forms four covalent bonds.
Very hard, very high melting point, does not conduct electricity.
Graphite
Each carbon forms three covalent bonds in layers.
Delocalised electrons allow electrical conductivity.
Graphene and fullerenes
Graphene is a single layer of graphite.
Fullerenes are hollow carbon molecules (e.g. C₆₀).
Carbon nanotubes are cylindrical fullerenes.
Used in electronics, materials and nanotechnology.

4.2.4 Nanoparticles
Sizes and properties
Nanoparticles are 1–100 nm in size.
High surface area to volume ratio.
Can have different properties from bulk materials.
Uses of nanoparticles
Used in medicine, electronics, cosmetics, sun creams, deodorants and catalysts.
Smaller quantities may be needed due to effectiveness.
There are possible risks associated with their use.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  'deck3': [
    {
      title: 'Quantitative chemistry',
      body: `4.3.1 Chemical measurements, conservation of mass and the quantitative interpretation of chemical equations
4.3.1.1 Conservation of mass and balanced chemical equations
The law of conservation of mass states that no atoms are lost or made during a chemical reaction so the mass of the products equals the mass of the reactants.
This means that chemical reactions can be represented by symbol equations which must be balanced in terms of the numbers of atoms of each element involved on both sides of the equation.
4.3.1.2 Relative formula mass
The relative formula mass (Mr) of a compound is the sum of the relative atomic masses of the atoms in the numbers shown in the formula.
In a balanced chemical equation, the sum of the relative formula masses of the reactants in the quantities shown equals the sum of the relative formula masses of the products in the quantities shown.
4.3.1.3 Mass changes when a reactant or product is a gas
Some reactions may appear to involve a change in mass but this can usually be explained because a reactant or product is a gas and its mass has not been taken into account.
For example: when a metal reacts with oxygen the mass of the oxide produced is greater than the mass of the metal or in thermal decompositions of metal carbonates carbon dioxide is produced and escapes into the atmosphere leaving the metal oxide as the only solid product.
4.3.1.4 Chemical measurements
Whenever a measurement is made there is always some uncertainty about the result obtained.
4.3.2 Use of amount of substance in relation to masses of pure substances
4.3.2.1 Moles (HT only)
Chemical amounts are measured in moles. The symbol for the unit mole is mol.
The mass of one mole of a substance in grams is numerically equal to its relative formula mass.
One mole of a substance contains the Avogadro constant number of particles (atoms, molecules or ions). The Avogadro constant is 6.02 × 10²³ per mole.
The amount in moles = mass (g) / relative formula mass (Mr)
4.3.2.2 Amounts of substances in equations (HT only)
The masses of reactants and products can be calculated from balanced symbol equations.
Chemical equations can be interpreted in terms of moles. For example:
Mg + 2HCl → MgCl₂ + H₂
shows that one mole of magnesium reacts with two moles of hydrochloric acid to produce one mole of magnesium chloride and one mole of hydrogen gas.
4.3.2.3 Using moles to balance equations (HT only)
The balancing numbers in a symbol equation can be calculated from the masses of reactants and products by converting the masses in grams to amounts in moles and converting the number of moles to simple whole number ratios.
4.3.2.4 Limiting reactants (HT only)
In a chemical reaction involving two reactants, it is common to use an excess of one of the reactants to ensure that all of the other reactant is used.
The reactant that is completely used up is called the limiting reactant because it limits the amount of products.
4.3.2.5 Concentration of solutions
The concentration of a solution can be measured in mass per given volume of solution, eg grams per dm³ (g/dm³).
4.3.3 Yield and atom economy of chemical reactions (chemistry only)
4.3.3.1 Percentage yield
Even though no atoms are gained or lost in a chemical reaction, it is not always possible to obtain the calculated amount of a product because:
- the reaction may not go to completion because it is reversible
- some of the product may be lost when it is separated from the reaction mixture
- some of the reactants may react in ways different to the expected reaction.
The amount of a product obtained is known as the yield.
Percentage yield = (Mass of product actually made / Maximum theoretical mass of product) × 100
4.3.3.2 Atom economy
The atom economy (atom utilisation) is a measure of the amount of starting materials that end up as useful products.
It is a theoretical measure of the percentage of reactants that form useful products.
Atom economy = (Relative formula mass of desired product / Sum of relative formula masses of all reactants) × 100
4.3.4 Using concentrations of solutions in mol/dm³ (chemistry only) (HT only)
The concentration of a solution is the amount of solute in a given volume of solution.
Concentration = amount of substance (mol) / volume (dm³)
4.3.5 Use of amount of substance in relation to volumes of gases (chemistry only) (HT only)
Equal amounts in moles of gases occupy the same volume at the same temperature and pressure.
The volume of one mole of any gas at room temperature and pressure (r.t.p.) is 24 dm³.
The volumes of gaseous reactants and products can be calculated from the balanced equation for the reaction.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
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
};
