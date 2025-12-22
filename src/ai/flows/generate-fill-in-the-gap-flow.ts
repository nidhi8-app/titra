
'use server';

/**
 * @fileOverview An AI flow to convert a standard question into a fill-in-the-gap statement.
 *
 * - generateFillInTheGap - A function that handles the conversion.
 * - GenerateFillInTheGapInput - The input type for the function.
 * - GenerateFillInTheGapOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionAnswerPairSchema = z.object({
    id: z.string(),
    question: z.string().describe("The original question."),
    correctAnswer: z.string().describe("The correct answer to the question."),
    options: z.array(z.string()).describe("The multiple choice options for the original question.")
});

const GenerateFillInTheGapInputSchema = z.object({
  questions: z.array(QuestionAnswerPairSchema),
});
export type GenerateFillInTheGapInput = z.infer<typeof GenerateFillInTheGapInputSchema>;


const FillInTheGapQuestionSchema = z.object({
    id: z.string().describe("The original ID of the question."),
    question: z.string().describe("The new fill-in-the-gap question text."),
    options: z.array(z.string()).describe("The original multiple choice options."),
    correctAnswer: z.string().describe("The original correct answer.")
});

const GenerateFillInTheGapOutputSchema = z.object({
  questions: z.array(FillInTheGapQuestionSchema),
});
export type GenerateFillInTheGapOutput = z.infer<typeof GenerateFillInTheGapOutputSchema>;


export async function generateFillInTheGap(input: GenerateFillInTheGapInput): Promise<GenerateFillInTheGapOutput> {
    return generateFillInTheGapFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateFillInTheGapPrompt',
    input: { schema: GenerateFillInTheGapInputSchema },
    output: { schema: GenerateFillInTheGapOutputSchema },
    prompt: `You are an expert in creating educational materials. Your task is to convert a list of standard questions into "fill-in-the-gap" style questions.

For each question provided, rephrase it so that the correct answer fills in a blank. The blank should be represented by '_________'.

Example:
Original Question: "What is the chemical symbol for Gold?"
Correct Answer: "Au"
Rephrased Question: "The chemical symbol for Gold is _________."

It is critical that the rephrased question makes sense and that the original correct answer is the word or phrase that logically completes the sentence. Maintain the original 'id', 'options', and 'correctAnswer' for each question in your output.

Here are the questions to convert:
---
{{#each questions}}
{
  "id": "{{id}}",
  "question": "{{question}}",
  "correctAnswer": "{{correctAnswer}}"
}
{{/each}}
---

Generate only the rephrased questions in the correct output format.`,
});

const generateFillInTheGapFlow = ai.defineFlow(
    {
        name: 'generateFillInTheGapFlow',
        inputSchema: GenerateFillInTheGapInputSchema,
        outputSchema: GenerateFillInTheGapOutputSchema,
    },
    async (input) => {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("The AI feature is not configured. Please add your GEMINI_API_KEY to the .env file to use this feature.");
        }
        const { output } = await prompt(input);
        return output!;
    }
)
