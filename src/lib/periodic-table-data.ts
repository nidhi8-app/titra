
export type ElementData = {
  name: string;
  atomicNumber: number;
  symbol: string;
  group: number;
  period: number;
  category: 'alkali-metal' | 'alkaline-earth-metal' | 'lanthanide' | 'actinide' | 'transition-metal' | 'post-transition-metal' | 'metalloid' | 'reactive-nonmetal' | 'noble-gas';
};

export const elements: ElementData[] = [
  { name: 'Hydrogen', atomicNumber: 1, symbol: 'H', group: 1, period: 1, category: 'reactive-nonmetal' },
  { name: 'Helium', atomicNumber: 2, symbol: 'He', group: 18, period: 1, category: 'noble-gas' },
  { name: 'Lithium', atomicNumber: 3, symbol: 'Li', group: 1, period: 2, category: 'alkali-metal' },
  { name: 'Beryllium', atomicNumber: 4, symbol: 'Be', group: 2, period: 2, category: 'alkaline-earth-metal' },
  { name: 'Boron', atomicNumber: 5, symbol: 'B', group: 13, period: 2, category: 'metalloid' },
  { name: 'Carbon', atomicNumber: 6, symbol: 'C', group: 14, period: 2, category: 'reactive-nonmetal' },
  { name: 'Nitrogen', atomicNumber: 7, symbol: 'N', group: 15, period: 2, category: 'reactive-nonmetal' },
  { name: 'Oxygen', atomicNumber: 8, symbol: 'O', group: 16, period: 2, category: 'reactive-nonmetal' },
  { name: 'Fluorine', atomicNumber: 9, symbol: 'F', group: 17, period: 2, category: 'reactive-nonmetal' },
  { name: 'Neon', atomicNumber: 10, symbol: 'Ne', group: 18, period: 2, category: 'noble-gas' },
  { name: 'Sodium', atomicNumber: 11, symbol: 'Na', group: 1, period: 3, category: 'alkali-metal' },
  { name: 'Magnesium', atomicNumber: 12, symbol: 'Mg', group: 2, period: 3, category: 'alkaline-earth-metal' },
  { name: 'Aluminium', atomicNumber: 13, symbol: 'Al', group: 13, period: 3, category: 'post-transition-metal' },
  { name: 'Silicon', atomicNumber: 14, symbol: 'Si', group: 14, period: 3, category: 'metalloid' },
  { name: 'Phosphorus', atomicNumber: 15, symbol: 'P', group: 15, period: 3, category: 'reactive-nonmetal' },
  { name: 'Sulfur', atomicNumber: 16, symbol: 'S', group: 16, period: 3, category: 'reactive-nonmetal' },
  { name: 'Chlorine', atomicNumber: 17, symbol: 'Cl', group: 17, period: 3, category: 'reactive-nonmetal' },
  { name: 'Argon', atomicNumber: 18, symbol: 'Ar', group: 18, period: 3, category: 'noble-gas' },
  { name: 'Potassium', atomicNumber: 19, symbol: 'K', group: 1, period: 4, category: 'alkali-metal' },
  { name: 'Calcium', atomicNumber: 20, symbol: 'Ca', group: 2, period: 4, category: 'alkaline-earth-metal' },
  { name: 'Scandium', atomicNumber: 21, symbol: 'Sc', group: 3, period: 4, category: 'transition-metal' },
  { name: 'Titanium', atomicNumber: 22, symbol: 'Ti', group: 4, period: 4, category: 'transition-metal' },
  { name: 'Vanadium', atomicNumber: 23, symbol: 'V', group: 5, period: 4, category: 'transition-metal' },
  { name: 'Chromium', atomicNumber: 24, symbol: 'Cr', group: 6, period: 4, category: 'transition-metal' },
  { name: 'Manganese', atomicNumber: 25, symbol: 'Mn', group: 7, period: 4, category: 'transition-metal' },
  { name: 'Iron', atomicNumber: 26, symbol: 'Fe', group: 8, period: 4, category: 'transition-metal' },
  { name: 'Cobalt', atomicNumber: 27, symbol: 'Co', group: 9, period: 4, category: 'transition-metal' },
  { name: 'Nickel', atomicNumber: 28, symbol: 'Ni', group: 10, period: 4, category: 'transition-metal' },
  { name: 'Copper', atomicNumber: 29, symbol: 'Cu', group: 11, period: 4, category: 'transition-metal' },
  { name: 'Zinc', atomicNumber: 30, symbol: 'Zn', group: 12, period: 4, category: 'transition-metal' },
  { name: 'Gallium', atomicNumber: 31, symbol: 'Ga', group: 13, period: 4, category: 'post-transition-metal' },
  { name: 'Germanium', atomicNumber: 32, symbol: 'Ge', group: 14, period: 4, category: 'metalloid' },
  { name: 'Arsenic', atomicNumber: 33, symbol: 'As', group: 15, period: 4, category: 'metalloid' },
  { name: 'Selenium', atomicNumber: 34, symbol: 'Se', group: 16, period: 4, category: 'reactive-nonmetal' },
  { name: 'Bromine', atomicNumber: 35, symbol: 'Br', group: 17, period: 4, category: 'reactive-nonmetal' },
  { name: 'Krypton', atomicNumber: 36, symbol: 'Kr', group: 18, period: 4, category: 'noble-gas' },
  // Add more elements as needed
];
