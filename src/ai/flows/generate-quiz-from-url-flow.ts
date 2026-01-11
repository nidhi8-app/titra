
'use server';

/**
 * @fileOverview An AI flow to generate a quiz from a URL.
 *
 * - generateQuizFromUrl - A function that handles the quiz generation from a URL.
 * - GenerateQuizFromUrlInput - The input type for the function.
 * - GenerateQuizFromUrlOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizFromUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the content to generate a quiz from (e.g., YouTube, article).'),
});
export type GenerateQuizFromUrlInput = z.infer<typeof GenerateQuizFromUrlInputSchema>;

const QuizQuestionSchema = z.object({
  id: z.string().describe('A unique ID for the question (e.g., q1, q2).'),
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});

const GenerateQuizFromUrlOutputSchema = z.object({
  title: z.string().describe('A concise and relevant title for the generated quiz, based on the content of the URL.'),
  questions: z.array(QuizQuestionSchema).describe('An array of 5 generated multiple-choice quiz questions.'),
});
export type GenerateQuizFromUrlOutput = z.infer<typeof GenerateQuizFromUrlOutputSchema>;

export async function generateQuizFromUrl(input: GenerateQuizFromUrlInput): Promise<GenerateQuizFromUrlOutput> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("The AI feature is not configured. Please add your GEMINI_API_KEY to the .env file to use this feature.");
  }
  return generateQuizFromUrlFlow(input);
}

const generateQuizFromUrlFlow = ai.defineFlow(
  {
    name: 'generateQuizFromUrlFlow',
    inputSchema: GenerateQuizFromUrlInputSchema,
    outputSchema: GenerateQuizFromUrlOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'generateQuizFromUrlPrompt',
      input: { schema: GenerateQuizFromUrlInputSchema },
      output: { schema: GenerateQuizFromUrlOutputSchema },
      prompt: `You are an expert in creating educational quizzes. Your task is to generate a 5-question multiple-choice quiz and a suitable title based on the content found at the provided URL.

URL: {{{url}}}

Please analyze the content at the URL and generate 5 relevant multiple-choice questions. Each question must have 4 options and a clearly identified correct answer. The questions should cover the key topics and concepts presented in the content.

Also, create a short, descriptive title for the quiz that accurately reflects the content.

Generate the output in the specified JSON format.`,
    });

    const { output } = await prompt(input);
    return output!;
  }
);
