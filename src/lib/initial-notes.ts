
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
        // For decks with multiple small notes, treat each note as a top-level section.
        if (note.title && notes.length > 1) {
            currentSection = {
                title: note.title,
                content: note.body,
                subsections: [],
            };
            sections.push(currentSection);
        } else { // For decks with one large note, parse its body for sections.
            const lines = note.body.split('\n');
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.match(/^\d+\.\d+\.\d+\s/)) { // Matches 4.2.1
                     currentSubSubSection = {
                        title: trimmedLine,
                        content: '',
                        subsections: [],
                    };
                    if (currentSubsection) {
                        currentSubsection.subsections.push(currentSubSubSection);
                    }
                } else if (trimmedLine.match(/^\d+\.\d+\s/)) { // Matches 4.2
                    currentSubsection = {
                        title: trimmedLine,
                        content: '',
                        subsections: [],
                    };
                    // The first 4.x section creates the main section
                    if (trimmedLine.startsWith('4.2 ')) {
                        currentSection = {
                            title: 'Bonding, structure, and the properties of matter', // Main title
                            content: '',
                            subsections: [currentSubsection],
                        }
                        sections.push(currentSection);
                    } else if (currentSection) {
                        currentSection.subsections.push(currentSubsection);
                    }
                    currentSubSubSection = null;
                } else if (trimmedLine.length > 0) {
                     const target = currentSubSubSection || currentSubsection;
                     if (target) {
                         target.content = target.content ? `${target.content}\n${trimmedLine}` : trimmedLine;
                     }
                }
            });
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
        examSkills: `Students will be supplied with a periodic table for the exam and should be able to:
- use the names and symbols of the first 20 elements in the periodic table, the elements in Groups 1 and 7, and other elements in this specification
- name compounds of these elements from given formulae or symbol equations
- write word equations for the reactions in this specification
- write formulae and balanced chemical equations for the reactions in this specification
- (HT only) write balanced half equations and ionic equations where appropriate.`,
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
      title: 'Chemical bonds: ionic, covalent and metallic',
      body: `There are three types of strong chemical bonds: ionic, covalent and metallic.
Ionic bonding occurs in compounds formed from metals and non-metals.
Covalent bonding occurs in non-metallic elements and compounds of non-metals.
Metallic bonding occurs in metals and alloys.
Ionic bonding involves the transfer of electrons from metal atoms to non-metal atoms to form oppositely charged ions with the electronic structure of a noble gas.
Covalent bonding involves the sharing of electron pairs between atoms.
Metallic bonding involves giant structures of atoms with delocalised electrons.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'How bonding and structure are related to the properties of substances',
      body: `The three states of matter are solid, liquid and gas. The strength of forces between particles determines melting and boiling points.
Ionic compounds have giant ionic lattices with strong electrostatic forces, giving them high melting points and conductivity only when molten or dissolved.
Small molecules have low melting points due to weak intermolecular forces and do not conduct electricity.
Polymers are very large molecules with strong covalent bonds and strong intermolecular forces, making them solids.
Giant covalent structures have very high melting points as all atoms are linked by strong covalent bonds.
Metals have giant structures with delocalised electrons, allowing them to conduct electricity and heat. Alloys are harder than pure metals because their layers are distorted.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Structure and bonding of carbon',
      body: `Diamond is very hard, has a very high melting point, and does not conduct electricity because each carbon atom forms four strong covalent bonds.
Graphite is soft and slippery because it has a layered structure with weak forces between layers. It conducts electricity due to delocalised electrons.
Graphene is a single layer of graphite and is used in electronics and materials.
Fullerenes are hollow molecules of carbon atoms, like C₆₀, used in nanotechnology.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Nanoparticles',
      body: `Nanoparticles are 1–100 nm in size and have a very high surface area to volume ratio.
This gives them different properties from bulk materials.
They are used in medicine, electronics, sun creams, and catalysts.
The long-term effects and potential risks of nanoparticles are not fully understood.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  'deck3': [
    {
      title: 'Chemical measurements, conservation of mass and quantitative interpretation',
      body: `The law of conservation of mass states that no atoms are lost or made during a chemical reaction.
The relative formula mass (Mr) of a compound is the sum of the relative atomic masses of the atoms in the chemical formula.
In a balanced chemical equation, the sum of the Mr of the reactants equals the sum of the Mr of the products.
Apparent mass changes can occur in reactions involving gases if the container is not sealed.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Use of amount of substance in relation to masses of pure substances',
      body: `The amount of a substance is measured in moles (mol).
The mass of one mole of a substance in grams is numerically equal to its relative formula mass.
One mole of any substance contains the Avogadro constant number of particles (6.02 x 10²³).
The limiting reactant is the reactant that is completely used up in a reaction and determines the amount of product formed.
The concentration of a solution can be measured in g/dm³.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Yield and atom economy of chemical reactions',
      body: `The percentage yield of a reaction is calculated by: (Actual yield / Theoretical yield) x 100.
Yield is always less than 100% due to factors like incomplete reactions, loss of product during separation, or side reactions.
Atom economy is a measure of the amount of starting materials that end up as useful products. It is calculated by: (Mr of desired product / Sum of Mr of all reactants) x 100.
High atom economy is important for sustainable development and economic reasons.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
     {
      title: 'Using concentrations of solutions and amount of substance in relation to volumes of gases',
      body: `Concentration can also be measured in mol/dm³.
Equal amounts in moles of gases occupy the same volume at the same temperature and pressure.
The volume of one mole of any gas at room temperature and pressure (r.t.p.) is 24 dm³.
The volumes of gaseous reactants and products can be calculated from the balanced equation for the reaction.`,
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
};

    