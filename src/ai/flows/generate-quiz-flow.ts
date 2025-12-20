
'use server';

/**
 * @fileOverview An AI flow to generate a quiz from a set of notes, tailored to a learning style.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuizQuestionSchema = z.object({
  id: z.string().describe('A unique ID for the question (e.g., q1, q2).'),
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});

const GenerateQuizInputSchema = z.object({
  notes: z.string().describe('A string containing all the notes for the quiz content.'),
  learningStyle: z
    .string()
    .describe(
      'The user\'s learning style (e.g., Visual, Auditory, Kinesthetic, Reading/Writing).'
    ),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;


export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
    return generateQuizFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateQuizPrompt',
    input: { schema: GenerateQuizInputSchema },
    output: { schema: GenerateQuizOutputSchema },
    prompt: `You are an expert in creating educational quizzes based on provided notes. Your task is to generate a 5-question multiple-choice quiz from the notes provided. The questions should be tailored to the user's learning style.

User's learning style: {{{learningStyle}}}
Notes content:
---
{{{notes}}}
---

Generate 5 multiple-choice questions. Each question must have 4 options.

- If the learning style is "Visual", create questions that require interpreting relationships, patterns, or spatial information that could be visualized from the notes.
- If the learning style is "Auditory", frame questions in a conversational or scenario-based way, as if asking them in a discussion.
- If the learning style is "Reading/Writing", create detail-oriented questions that focus on definitions, lists, and specific facts from the text.
- If the learning style is "Kinesthetic", create questions based on processes, applications, or cause-and-effect sequences described in the notes.

For each question, provide a unique ID, the question text, an array of 4 string options, and the exact string of the correct answer. Ensure the correct answer is one of the provided options.`,
});

const generateQuizFlow = ai.defineFlow(
    {
        name: 'generateQuizFlow',
        inputSchema: GenerateQuizInputSchema,
        outputSchema: GenerateQuizOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
)
