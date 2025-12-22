
'use server';

/**
 * @fileOverview An AI flow to summarize notes into bullet points with bolded keywords.
 *
 * - summarizeNotes - A function that handles the summarization process.
 * - SummarizeNotesInput - The input type for the summarizeNotes function.
 * - SummarizeNotesOutput - The return type for the summarizeNotes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeNotesInputSchema = z.object({
  notes: z.string().describe('A string containing all the notes to be summarized.'),
});
export type SummarizeNotesInput = z.infer<typeof SummarizeNotesInputSchema>;

const SummarizeNotesOutputSchema = z.object({
  summary: z.string().describe('A summary of the notes in markdown bullet points with key terms in bold.'),
});
export type SummarizeNotesOutput = z.infer<typeof SummarizeNotesOutputSchema>;


export async function summarizeNotes(input: SummarizeNotesInput): Promise<SummarizeNotesOutput> {
    return summarizeNotesFlow(input);
}


const prompt = ai.definePrompt({
    name: 'summarizeNotesPrompt',
    input: { schema: SummarizeNotesInputSchema },
    output: { schema: SummarizeNotesOutputSchema },
    prompt: `You are an expert at summarizing educational content. Your task is to create a concise summary of the provided notes.

The summary must be in markdown format, using bullet points for each key concept.

Within each bullet point, identify the most important keywords or phrases and make them **bold** using markdown's double-asterisk syntax.

Notes content:
---
{{{notes}}}
---

Generate only the summary for the "summary" field.`,
});

const summarizeNotesFlow = ai.defineFlow(
    {
        name: 'summarizeNotesFlow',
        inputSchema: SummarizeNotesInputSchema,
        outputSchema: SummarizeNotesOutputSchema,
    },
    async (input) => {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new Error("The AI feature is not configured. Please add your GEMINI_API_KEY to the .env file to use this feature.");
        }
        const { output } = await prompt(input);
        return output!;
    }
)
