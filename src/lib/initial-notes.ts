
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

    notes.forEach(note => {
        const title = note.title.replace(/^(\d+\.)+\d*\s*/, '');
        const content = note.body;
        
        currentSection = {
            title: title,
            content: content,
            subsections: [],
        };
        sections.push(currentSection);
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
      title: 'Chemical bonds',
      body: `There are three types of strong chemical bonds: ionic, covalent and metallic.
Ionic bonding: oppositely charged ions.
Covalent bonding: atoms share pairs of electrons.
Metallic bonding: atoms share delocalised electrons.
Ionic bonding occurs in compounds formed from metals and non-metals.
Covalent bonding occurs in non-metallic elements and compounds of non-metals.
Metallic bonding occurs in metals and alloys.
Chemical bonding is explained in terms of electrostatic forces and the transfer or sharing of electrons.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Ionic bonding',
      body: `Electrons are transferred from metal atoms to non-metal atoms.
Metal atoms lose electrons to form positive ions.
Non-metal atoms gain electrons to form negative ions.
Ions formed have the electronic structure of a noble gas.
Electron transfer can be shown using dot and cross diagrams.
The charge on ions relates to the group number (Groups 1, 2, 6 and 7).`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Ionic compounds',
      body: `Ionic compounds are giant structures of ions.
They are held together by strong electrostatic forces in all directions (ionic bonding).
Students should be able to:
deduce that a compound is ionic from a diagram
describe limitations of diagrams
work out the empirical formula from a model
Sodium chloride is the required example.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        title: 'Covalent bonding',
        body: `Covalent bonds form when atoms share pairs of electrons.
Covalent bonds are strong.
Covalently bonded substances may be:
small molecules
very large molecules (polymers)
giant covalent structures (diamond, silicon dioxide)
Bonds can be shown using dot and cross, line diagrams, ball-and-stick and 3D diagrams.
Students should be able to draw diagrams for hydrogen, chlorine, oxygen, nitrogen, hydrogen chloride, water, ammonia and methane.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      title: 'Metallic bonding',
      body: `Metals consist of giant structures of atoms arranged in a regular pattern.
Delocalised electrons move through the structure.
Strong metallic bonds arise from sharing delocalised electrons.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        title: 'States of matter',
        body: `The three states are solid, liquid and gas.
Changes of state occur at melting point and boiling point.
Particle theory explains changes of state.
The strength of forces between particles determines melting and boiling points.
Stronger forces → higher melting and boiling points.
(HT) Particle model limitations:
no forces
particles are solid spheres`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'State symbols',
        body: `State symbols are: (s), (l), (g), (aq).
Used in chemical equations.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Properties of ionic compounds',
        body: `Ionic compounds have giant ionic lattices.
Strong electrostatic forces give high melting and boiling points.
Conduct electricity when molten or dissolved because ions can move.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Properties of small molecules',
        body: `Usually gases or liquids with low melting and boiling points.
Have weak intermolecular forces.
Do not conduct electricity.
Intermolecular forces increase with molecule size.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Polymers',
        body: `Polymers have very large molecules.
Atoms are linked by strong covalent bonds.
Strong intermolecular forces make polymers solids at room temperature.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Giant covalent structures',
        body: `Giant covalent structures are solids with very high melting points.
All atoms are linked by strong covalent bonds.
Examples: diamond, graphite, silicon dioxide.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Properties of metals and alloys',
        body: `Metals have giant structures with metallic bonding.
High melting and boiling points.
Pure metals are malleable due to layers of atoms.
Alloys are harder because layers are distorted.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Metals as conductors',
        body: `Metals conduct electricity due to delocalised electrons.
Thermal conductivity is also due to delocalised electrons.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Diamond',
        body: `Each carbon forms four covalent bonds.
Very hard, very high melting point, does not conduct electricity.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Graphite',
        body: `Each carbon forms three covalent bonds in layers.
Delocalised electrons allow electrical conductivity.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Graphene and fullerenes',
        body: `Graphene is a single layer of graphite.
Fullerenes are hollow carbon molecules (e.g. C₆₀).
Carbon nanotubes are cylindrical fullerenes.
Used in electronics, materials and nanotechnology.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Nanoparticles',
        body: `Nanoparticles are 1–100 nm in size.
High surface area to volume ratio.
Can have different properties from bulk materials.
Used in medicine, electronics, cosmetics, sun creams, deodorants and catalysts.
Smaller quantities may be needed due to effectiveness.
There are possible risks associated with their use.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  ],
  'deck3': [
    {
        title: 'Conservation of mass and balanced chemical equations',
        body: `The law of conservation of mass states that no atoms are lost or made during a chemical reaction so the mass of the products equals the mass of the reactants.
This means that chemical reactions can be represented by symbol equations which must be balanced in terms of the numbers of atoms of each element involved on both sides of the equation.`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Relative formula mass',
        body: `The relative formula mass (Mr) of a compound is the sum of the relative atomic masses of the atoms in the numbers shown in the formula.
In a balanced chemical equation, the sum of the relative formula masses of the reactants in the quantities shown equals the sum of the relative formula masses of the products in the quantities shown.`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Mass changes when a reactant or product is a gas',
        body: `Some reactions may appear to involve a change in mass but this can usually be explained because a reactant or product is a gas and its mass has not been taken into account.
For example: when a metal reacts with oxygen the mass of the oxide produced is greater than the mass of the metal or in thermal decompositions of metal carbonates carbon dioxide is produced and escapes into the atmosphere leaving the metal oxide as the only solid product.`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Chemical measurements',
        body: 'Whenever a measurement is made there is always some uncertainty about the result obtained.',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Moles (HT only)',
        body: `Chemical amounts are measured in moles. The symbol for the unit mole is mol.
The mass of one mole of a substance in grams is numerically equal to its relative formula mass.
One mole of a substance contains the Avogadro constant number of particles (atoms, molecules or ions). The Avogadro constant is 6.02 × 10²³ per mole.
The amount in moles = mass (g) / relative formula mass (Mr)`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Amounts of substances in equations (HT only)',
        body: `The masses of reactants and products can be calculated from balanced symbol equations.
Chemical equations can be interpreted in terms of moles. For example:
Mg + 2HCl → MgCl₂ + H₂
shows that one mole of magnesium reacts with two moles of hydrochloric acid to produce one mole of magnesium chloride and one mole of hydrogen gas.`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Using moles to balance equations (HT only)',
        body: 'The balancing numbers in a symbol equation can be calculated from the masses of reactants and products by converting the masses in grams to amounts in moles and converting the number of moles to simple whole number ratios.',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Limiting reactants (HT only)',
        body: `In a chemical reaction involving two reactants, it is common to use an excess of one of the reactants to ensure that all of the other reactant is used.
The reactant that is completely used up is called the limiting reactant because it limits the amount of products.`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Concentration of solutions',
        body: 'The concentration of a solution can be measured in mass per given volume of solution, eg grams per dm³ (g/dm³).',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Percentage yield',
        body: `Even though no atoms are gained or lost in a chemical reaction, it is not always possible to obtain the calculated amount of a product because:
- the reaction may not go to completion because it is reversible
- some of the product may be lost when it is separated from the reaction mixture
- some of the reactants may react in ways different to the expected reaction.
The amount of a product obtained is known as the yield.
Percentage yield = (Mass of product actually made / Maximum theoretical mass of product) × 100`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Atom economy',
        body: `The atom economy (atom utilisation) is a measure of the amount of starting materials that end up as useful products.
It is a theoretical measure of the percentage of reactants that form useful products.
Atom economy = (Relative formula mass of desired product / Sum of relative formula masses of all reactants) × 100`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Using concentrations of solutions in mol/dm³ (chemistry only) (HT only)',
        body: `The concentration of a solution is the amount of solute in a given volume of solution.
Concentration = amount of substance (mol) / volume (dm³)`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Use of amount of substance in relation to volumes of gases (chemistry only) (HT only)',
        body: `Equal amounts in moles of gases occupy the same volume at the same temperature and pressure.
The volume of one mole of any gas at room temperature and pressure (r.t.p.) is 24 dm³.
The volumes of gaseous reactants and products can be calculated from the balanced equation for the reaction.`,
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ],
  'deck4': [
    {
      title: 'Reactivity of metals',
      body: `Metals react with oxygen to form metal oxides.
These are oxidation reactions (gain of oxygen).
Reduction = loss of oxygen
Oxidation = gain of oxygen
Metals form positive ions when they react.
More reactive metals form positive ions more easily.
Reactivity order (most → least):
Potassium → Sodium → Lithium → Calcium → Magnesium → Zinc → Iron → Copper
Hydrogen and carbon are often included for comparison.
A more reactive metal displaces a less reactive metal from its compound.
Reactivity is tested using water and dilute acids (room temperature only).`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Extraction of metals',
      body: `Unreactive metals (e.g. gold) are found native.
Most metals are found as compounds and must be extracted.
Metals less reactive than carbon are extracted by reduction with carbon.
Reduction = loss of oxygen.
Students must identify which substances are oxidised or reduced.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Oxidation and reduction (electrons – HT)',
      body: `Oxidation = loss of electrons
Reduction = gain of electrons
Displacement reactions can be written as ionic equations.
Species oxidised/reduced must be identified.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Reactions of acids',
      body: `Acid + metal → salt + hydrogen
Limited to Mg, Zn, Fe with HCl or H₂SO₄.
(HT) These are redox reactions involving electron transfer.
Acid + alkali/base → salt + water
Acid + carbonate → salt + water + CO₂
Salt formed depends on:
The acid (chlorides, nitrates, sulfates)
The metal ion
Students must predict products and write correct formulae.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Making soluble salts',
      body: `React acid with insoluble metal / oxide / hydroxide / carbonate.
Add excess solid → filter → evaporate → crystallise.
Required practical: making a pure, dry soluble salt.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'pH scale and neutralisation',
      body: `Acids produce H⁺ ions, alkalis produce OH⁻ ions.
pH scale: 0–14
pH < 7 = acidic
pH = 7 = neutral
pH > 7 = alkaline
Neutralisation:
H⁺ + OH⁻ → H₂O
Measured using universal indicator or pH probe.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Titrations (Chemistry only)',
      body: `Used to find exact reacting volumes of strong acids and alkalis.
Uses an indicator.
(HT) Calculate concentrations in mol/dm³ and g/dm³.
Required practical: acid–alkali titration.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Strong and weak acids (HT)',
      body: `Strong acids fully ionise (HCl, HNO₃, H₂SO₄).
Weak acids partially ionise (ethanoic, citric).
Lower pH = higher H⁺ concentration.
Each pH unit = ×10 change in H⁺ concentration.
Strong vs weak ≠ concentrated vs dilute.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Process of electrolysis',
      body: `Ionic compounds must be molten or dissolved to conduct electricity.
Cathode (−): positive ions move here
Anode (+): negative ions move here
Electrolysis decomposes compounds into elements.
(HT) Half equations must be written and balanced.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Molten ionic compounds',
      body: `Metal forms at the cathode, non-metal at the anode.
Example: molten lead bromide → lead + bromine.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Electrolysis to extract metals',
      body: `Used for very reactive metals (e.g. aluminium).
Aluminium extracted from molten aluminium oxide + cryolite.
Cryolite lowers melting point.
Carbon anodes wear away and must be replaced.
Process uses large amounts of energy.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Electrolysis of aqueous solutions',
      body: `Products depend on reactivity.
Cathode:
Hydrogen produced if metal is more reactive than hydrogen.
Anode:
Oxygen produced unless halide ions present (then halogen forms).
Water provides H⁺ and OH⁻ ions.
Required practical: electrolysis of aqueous solutions.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Half equations at electrodes (HT)',
      body: `Cathode (reduction):
2H⁺ + 2e⁻ → H₂
Missing equation (aqueous solutions):
2H₂O + 2e⁻ → H₂ + 2OH⁻

Anode (oxidation):
4OH⁻ → O₂ + 2H₂O + 4e⁻`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  'deck5': [
    {
      title: 'Exothermic and Endothermic Reactions',
      body: `Energy is conserved in chemical reactions.
If energy is transferred to the surroundings, the products have less energy than the reactants.
Temperature change of the surroundings shows energy transfer.
Exothermic reactions
Transfer energy to surroundings → temperature increases.
Products have less energy than reactants.
Examples:
Combustion
Many oxidation reactions
Neutralisation
Uses:
Hand warmers
Self-heating cans
Endothermic reactions
Take in energy from surroundings → temperature decreases.
Products have more energy than reactants.
Examples:
Thermal decomposition
Citric acid + sodium hydrogencarbonate
Uses:
Sports injury cold packs
📌 Calculations of ΔH are not required (temperature change only).`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Reaction profiles',
      body: `Reactions only occur when particles collide with enough energy.
Activation energy = minimum energy needed for a reaction to start.
Reaction profiles show:
- Energy of reactants
- Energy of products
- Activation energy
- Overall energy change
Exothermic: products lower than reactants.
Endothermic: products higher than reactants.
Students must be able to draw and interpret simple energy level diagrams.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Energy change of reactions (HT only)',
      body: `Energy is needed to break bonds.
Energy is released when new bonds form.
Overall energy change =
Energy to break bonds − energy released forming bonds
Exothermic:
More energy released than absorbed
Endothermic:
More energy absorbed than released
Students can calculate energy changes using bond energies.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Cells and batteries',
      body: `Cells produce electricity from chemical reactions.
Voltage depends on:
- Metals used
- Electrolyte
Simple cell:
Two different metals + electrolyte
Batteries:
Two or more cells in series
Non-rechargeable cells:
Reactions stop when reactants run out
Example: alkaline batteries
Rechargeable cells:
Reactions can be reversed by supplying electrical energy`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Fuel cells',
      body: `Fuel cells use a continuous supply of fuel (e.g. hydrogen) and oxygen.
Hydrogen fuel cell overall reaction:
Hydrogen + oxygen → water
Fuel cells produce electricity without running out as long as fuel is supplied.
Hydrogen fuel cells are an alternative to batteries.
(HT only) Students must write half equations for hydrogen fuel cells.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  'deck6': [
    {
        title: 'Calculating rates of reactions',
        body: `Rate of reaction = how fast reactants are used up or products are formed.
Mean rate of reaction:
= quantity of reactant used ÷ time taken
= quantity of product formed ÷ time taken
Quantity can be measured by:
mass (g) or volume (cm³)
Units of rate:
g/s, cm³/s
Higher Tier: mol/s`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Factors affecting rate of reaction',
        body: `Factors that increase rate:
Higher concentration (solutions)
Higher pressure (gases)
Larger surface area (smaller pieces of solid)
Higher temperature
Presence of a catalyst`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Collision theory and activation energy',
        body: `Reactions occur when particles:
Collide
With enough energy
Activation energy = minimum energy needed for a reaction
Increasing concentration, pressure, or surface area:
Increases collision frequency
Increasing temperature:
Increences collision frequency and energy`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Catalysts',
        body: `Catalysts:
Increase reaction rate
Are not used up
Are not included in chemical equations
They work by:
Providing a pathway with lower activation energy
Enzymes are biological catalysts`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Reversible reactions',
        body: `Reversible reactions can go forwards and backwards
Represented by: ⇌
General equation:
A + B ⇌ C + D
Changing conditions changes the direction of reaction
Example (word equation):
Hydrated copper sulfate ⇌ anhydrous copper sulfate + water`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Energy changes and reversible reactions',
        body: `If one direction is exothermic, the reverse is endothermic
Same amount of energy is transferred in both directions
Example (word equation):
Nitrogen dioxide ⇌ dinitrogen tetroxide
Formation of dinitrogen tetroxide is exothermic
Breakdown is endothermic`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Equilibrium',
        body: `Occurs in a closed system
At equilibrium:
Forward rate = reverse rate
Amounts of reactants and products stay constant (not equal)`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Effect of changing conditions (HT only)',
        body: `Systems at equilibrium respond to oppose changes
This is called Le Chatelier’s Principle`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Effect of concentration changes (HT only)',
        body: `Increasing reactant concentration:
Shifts equilibrium to form more products
Decreasing product concentration:
More reactants react to replace products
Example (word equation):
Hydrogen + iodine ⇌ hydrogen iodide`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Effect of temperature changes (HT only)',
        body: `Increasing temperature:
Favours endothermic direction
Decreasing temperature:
Favours exothermic direction
Example (word equation):
Nitrogen + hydrogen ⇌ ammonia (exothermic forward reaction)`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Effect of pressure changes (HT only)',
        body: `Applies only to gases
Increasing pressure:
Shifts equilibrium to side with fewer gas molecules
Decreasing pressure:
Shifts to side with more gas molecules
Example (word equation):
Nitrogen + hydrogen ⇌ ammonia`,
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ],
  'deck7': [
    {
      title: 'Crude oil, hydrocarbons & alkanes',
      body: `Crude oil is a finite resource formed from ancient plankton.
It is a mixture of hydrocarbons (made of carbon and hydrogen only).
Most hydrocarbons in crude oil are alkanes with formula CnH₂n+₂.
First four alkanes: methane, ethane, propane, butane.
You must be able to recognise alkanes from their formulae.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Fractional distillation & petrochemicals',
      body: `Crude oil is separated into fractions by fractional distillation.
Fractions have similar-sized molecules.
Used to make fuels (petrol, diesel, kerosene, LPG) and feedstock.
Petrochemicals make polymers, solvents, detergents, lubricants.
Fractional distillation works by evaporation and condensation.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Properties of hydrocarbons',
      body: `As molecule size increases:
Boiling point ↑
Viscosity ↑
Flammability ↓
Complete combustion produces carbon dioxide and water.
You must be able to write balanced combustion equations.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Cracking & alkenes',
      body: `Cracking breaks large hydrocarbons into smaller ones.
Produces alkanes and alkenes.
Methods: catalytic cracking and steam cracking.
Alkenes are more reactive and decolourise bromine water (orange → colourless).
Alkenes are used to make polymers and other chemicals.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Alkenes',
      body: `Contain a C=C double bond.
General formula: CnH₂n (unsaturated).
First four: ethene, propene, butene, pentene.
React by addition reactions with:
Hydrogen
Water
Halogens
Burn with smoky flames due to incomplete combustion.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Alcohols',
      body: `Contain the functional group –OH.
First four: methanol, ethanol, propanol, butanol.
Reactions:
Burn in air
React with sodium
Mix with water
Oxidation
Ethanol is made by fermentation using yeast.
Know uses and recognise from names/formulae.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Carboxylic acids',
      body: `Functional group: –COOH.
First four: methanoic, ethanoic, propanoic, butanoic acid.
React with:
Carbonates
Alcohols (to form esters)
HT only: weak acids due to partial ionisation.
Recognise from names and formulae.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Addition polymerisation',
      body: `Uses alkenes as monomers.
Many monomers join to form a polymer.
No by-products formed.
Examples: poly(ethene), poly(propene).
Repeating unit contains the same atoms as the monomer.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Condensation polymerisation (HT only)',
      body: `Monomers have two functional groups.
A small molecule (e.g. water) is lost.
Produces polyesters and polyamides.
You must relate functional groups → repeating units.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Amino acids & natural polymers (HT only)',
      body: `Amino acids have –NH₂ and –COOH groups.
Join by condensation polymerisation to form polypeptides (proteins).
DNA is a natural polymer:
Made of nucleotides
Has a double helix structure
Other natural polymers: proteins, starch, cellulose.`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  'deck8': [
    {
        title: 'Purity, Formulations, and Chromatography',
        body: `A pure substance is a single element or compound, not mixed with anything else.
Pure substances have specific melting and boiling points, which can distinguish them from mixtures.
A formulation is a carefully designed mixture with useful properties. Each component has a specific purpose (examples: fuels, medicines, paints).
Chromatography is used to separate mixtures. It involves a stationary phase and a mobile phase.
Separation depends on distribution between phases.
Rf value = (distance moved by substance) / (distance moved by solvent). A pure compound gives a single spot.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Identification of Common Gases',
        body: `Hydrogen: Burns with a pop using a burning splint.
Oxygen: Relights a glowing splint.
Carbon dioxide: Turns limewater milky when bubbled through.
Chlorine: Bleaches damp litmus paper (turns it white).`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Identification of Ions',
        body: `Flame Tests for metal cations:
- Lithium (Li⁺): Crimson
- Sodium (Na⁺): Yellow
- Potassium (K⁺): Lilac
- Calcium (Ca²⁺): Orange-red
- Copper (Cu²⁺): Green

Metal Hydroxides (with NaOH solution):
- Al³⁺: White precipitate, dissolves in excess NaOH.
- Ca²⁺, Mg²⁺: White precipitate, insoluble in excess.
- Cu²⁺: Blue precipitate.
- Fe²⁺: Green precipitate.
- Fe³⁺: Brown precipitate.

Anion Tests:
- Carbonates (CO₃²⁻): React with dilute acids to produce CO₂, which turns limewater milky.
- Halides (Cl⁻, Br⁻, I⁻): Add dilute nitric acid, then silver nitrate solution. Precipitates form: White (Cl⁻), Cream (Br⁻), Yellow (I⁻).
- Sulfates (SO₄²⁻): Add dilute hydrochloric acid, then barium chloride solution, which forms a white precipitate.

Instrumental Methods:
- More accurate, sensitive, and faster.
- Flame emission spectroscopy: Metal ions produce a line spectrum. Used to identify ions and measure concentrations.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  ],
  'deck9': [
    {
      title: 'Composition and evolution of the Earth\'s atmosphere',
      body: `Proportions of gases today:
~80% nitrogen
~20% oxygen
Small amounts of carbon dioxide, water vapour, noble gases

Early atmosphere:
Formed ~4.6 billion years ago, initially mostly carbon dioxide, little/no oxygen
Volcanic activity released gases including nitrogen, small amounts of methane & ammonia

Formation of oceans dissolved CO₂ → reduced atmospheric CO₂; carbonates formed sediments

Rise of oxygen:
Algae began producing oxygen via photosynthesis ~2.7 billion years ago
Over time, plants increased oxygen levels → animals could evolve

Decrease in carbon dioxide:
Photosynthesis by algae and plants removed CO₂
Formation of sedimentary rocks (limestone) and fossil fuels (coal, oil, gas) also reduced CO₂`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Greenhouse gases and climate change',
      body: `Greenhouse gases:
Water vapour, carbon dioxide, methane
Maintain Earth’s temperature suitable for life

Human contributions:
Activities increase CO₂ (e.g., burning fossil fuels) and methane (e.g., agriculture)
Leads to potential global warming and climate change
Evidence can be uncertain, models simplified; peer-reviewed research is more reliable

Effects of global climate change:
Rise in average global temperature
Impacts include: rising sea levels, extreme weather, habitat loss, changes in agriculture

Carbon footprint:
Total greenhouse gases emitted from product/service life cycle
Can be reduced by lowering CO₂ and methane emissions, though there are limits`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Atmospheric pollutants',
      body: `Pollutants from fuels:
Burning fuels releases: CO₂, H₂O, CO, SO₂, NOx, particulates
Soot (carbon particles) and unburned hydrocarbons contribute to particulates

Effects of pollutants:
Carbon monoxide: toxic, colourless, odourless
SO₂ & NOx: respiratory problems, acid rain
Particulates: global dimming, health issues`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
};

    

    

    

    


