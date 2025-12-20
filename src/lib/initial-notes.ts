
import type { Note } from './types';

// Omit 'id' and 'deckId' as they will be assigned dynamically
export type InitialNoteSeed = Omit<Note, 'id' | 'deckId'>;

export const initialNotesData: { [deckId: string]: InitialNoteSeed[] } = {
  '1': [
    {
      title: 'Atoms & Elements',
      body: 'All substances are made from tiny particles called atoms. An atom is the smallest part of an element that can exist.\n\nAtoms of each element are represented by their own chemical symbol, which consists of one or two letters and always starts with a capital letter (e.g., O for oxygen, Na for sodium).\n\nThere are over 100 different elements, arranged in the periodic table into groups with similar properties. Metals are on the left of the stepped line, and non-metals are on the right.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Chemical Formulae of Elements',
      body: 'A chemical formula represents an element or compound. For most elements, the formula is just its symbol (e.g., He, C, Mg).\n\nSome non-metal elements exist as diatomic molecules (two atoms joined together). Their formulae include a subscripted \'2\'. Examples: Iodine (I₂), Bromine (Br₂), Chlorine (Cl₂), Fluorine (F₂), Oxygen (O₂), Nitrogen (N₂), Hydrogen (H₂).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
     {
      title: 'Chemical Formulae of Compounds',
      body: 'A compound contains two or more elements chemically combined in fixed proportions. A chemical formula shows the symbols for each element and the number of atoms of each.\n\nExamples:\n- Magnesium oxide: MgO (one Mg, one O)\n- Water: H₂O (two H, one O)\n- Carbon dioxide: CO₂ (one C, two O)\n\nIn compounds with only non-metals, prefixes like "di-" or "tri-" indicate the number of atoms (e.g., carbon dioxide has two oxygen atoms).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
     {
      title: 'Word Equations',
      body: 'A word equation represents a chemical reaction using the names of the substances.\n\n- Reactants: Substances that react together.\n- Products: Substances that are formed.\n\nThe general form is: reactants → products.\n\nAn arrow (→) means "reacts to make".\nExample: sodium + chlorine → sodium chloride',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Balanced Chemical Equations & State Symbols',
      body: 'A balanced chemical equation uses formulae to represent a reaction and shows the number of units of each substance. It obeys the Law of Conservation of Mass: no atoms are lost or made. There must be the same number of atoms of each element on both sides.\n\nTo balance, you add numbers (coefficients) in front of the formulae.\nExample: N₂(g) + 3H₂(g) → 2NH₃(g)\n\nState Symbols:\n- (s) for solid\n- (l) for liquid\n- (g) for gas\n- (aq) for aqueous solution (dissolved in water)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  '2': [
    {
      title: 'Ionic Bonding Fundamentals',
      body: 'Ionic bonding takes place when metals and non-metals react by transferring electrons. It is the strong electrostatic force of attraction between oppositely charged ions.\n\n- Metal atoms lose electrons to form positive ions (cations).\n- Non-metal atoms gain electrons to form negative ions (anions).\n- The goal is to achieve a full, stable outer shell of electrons, like a noble gas.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'How Ions Form',
      body: 'An ion is a charged particle formed by the loss or gain of electrons.\n\n- Anions (negative ions) form when atoms gain electrons. They have more electrons than protons.\n- Cations (positive ions) form when atoms lose electrons. They have more protons than electrons.\n\nAll metals lose electrons to become positive ions. All non-metals gain electrons to become negative ions.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        title: 'Giant Ionic Lattice',
        body: 'Ionic compounds form a giant ionic lattice, which is a regular, repeating arrangement of alternating positive and negative ions.\n\nStrong electrostatic forces of attraction exist between these ions, acting in all directions. A huge amount of energy is needed to overcome these forces, which is why ionic compounds have very high melting and boiling points.',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      title: 'Representing Ionic Bonding',
      body: 'Dot and cross diagrams are used to show the transfer of electrons in ionic bonding. \n\nRules:\n- Use dots and crosses to show electrons from different atoms.\n- Draw only the outer shell for larger atoms.\n- Put the final ions in square brackets with the charge shown in the top right corner.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Covalent Bonding Fundamentals',
      body: 'Covalent bonding occurs when non-metal atoms share one or more pairs of electrons to get a full outer shell. A molecule is formed when two or more atoms are held together by covalent bonds.\n\n- Shared electrons are called bonding electrons.\n- Outer shell electrons not involved in bonding are non-bonding electrons (lone pairs).\n- Covalently bonded substances can be small molecules (like H₂O) or giant structures (like diamond).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
     {
      title: 'Simple Covalent Molecules',
      body: 'Simple covalent molecules (like water, methane, chlorine) have weak intermolecular forces between the molecules. These forces are easy to overcome, so these substances have low melting and boiling points.\n\nThey do not conduct electricity because there are no free-moving charged particles (no ions or delocalised electrons).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        title: 'Polymers and Giant Covalent Structures',
        body: 'Not all covalent molecules are small. \n\n- Polymers are very large molecules made of many repeating units (monomers) joined by covalent bonds. Examples: polythene, PVC.\n\n- Giant covalent structures (macromolecules) have billions of atoms joined by a network of covalent bonds. Examples: Diamond, Graphite, Silicon Dioxide. These have very high melting points because strong covalent bonds must be broken.',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      title: 'Metallic Bonding',
      body: 'Metallic bonding is found in metals and alloys. It consists of a giant structure of positive metal ions surrounded by a "sea" of delocalised electrons.\n\nThere is a strong electrostatic attraction between the positive ions and the shared negative electrons. This is why metals have high melting points and are good conductors of electricity (the delocalised electrons are free to move and carry charge).',
      createdAt: new
Date(),
      updatedAt: new
Date(),
    },
    {
      title: 'Limitations of Bonding Models',
      body: 'Models help us visualise bonding, but they have limitations.\n\n- Dot and Cross Diagrams: Don\'t show the 3D shape or relative sizes of atoms.\n- 2D Displayed Formulae: Don\'t show the 3D shape.\n- Ball and Stick Models: Clearly show 3D shape, but the "sticks" misrepresent the nature of bonds (forces), and the gaps between atoms are exaggerated.\n- Space-filling Models: More realistic about the space atoms occupy but can obscure the internal structure.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
