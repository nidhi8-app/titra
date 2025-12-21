
import { LucideIcon } from "lucide-react";
import type { Timestamp } from 'firebase/firestore';

export type Card = {
  id: string;
  title: string;
  color: string;
  cardCount: number;
  progress: number;
  imageId?: string;
  emoji?: LucideIcon | string;
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
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  deckId?: string;
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

export type DailyActivity = {
  duration: number; // in minutes
  tasks: Record<string, boolean>; // e.g., { 'startQuiz': true, 'aceQuiz': true }
};
