

export type Card = {
  id: string;
  title: string;
  color: string;
  cardCount: number;
  progress: number;
  imageId?: string;
  emoji?: string;
};

export type Deck = {
  id: string;
  title: string;
  cards: Card[];
};

export type Note = {
  id:string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Friend = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type UserDetails = {
  id: string;
  name: string;
  age: number;
  yearGroup: string;
  email: string;
  schoolName: string;
  curriculum: string;
  country: string;
  scienceSet: 'separate' | 'combined';
  friends?: string[];
  avatarUrl?: string;
  learningStyle?: string;
};
