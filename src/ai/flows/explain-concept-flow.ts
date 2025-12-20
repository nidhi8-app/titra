
'use server';

/**
 * @fileOverview An AI flow to explain a concept to a user based on their learning style.
 *
 * - explainConcept - A function that handles the explanation process.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainConceptInputSchema = z.object({
  question: z.string().describe('The quiz question the user got wrong.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  learningStyle: z
    .string()
    .describe(
      'The user\'s learning style (e.g., Visual, Auditory, Kinesthetic, Reading/Writing).'
    ),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('The tailored explanation of the concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;


export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
    return explainConceptFlow(input);
}


const prompt = ai.definePrompt({
    name: 'explainConceptPrompt',
    input: { schema: ExplainConceptInputSchema },
    output: { schema: ExplainConceptOutputSchema },
    prompt: `You are an expert teacher specializing in chemistry. A student has answered a quiz question incorrectly. Your task is to explain the underlying concept to them in a way that is best suited for their specific learning style.

The student's learning style is: {{{learningStyle}}}

The question they got wrong was:
"{{{question}}}"

The correct answer is:
"{{{correctAnswer}}}"

Please provide a clear and concise explanation of the concept.

- If the learning style is "Visual", use analogies, metaphors, and describe vivid mental images. Suggest what they could draw or visualize.
- If the learning style is "Auditory", explain it as if you were talking to them. Use a conversational tone, ask rhetorical questions, and suggest saying things out loud.
- If the learning style is "Reading/Writing", provide a structured, text-based explanation. Use bullet points, clear definitions, and well-organized paragraphs.
- If the learning style is "Kinesthetic", use action-oriented language. Suggest a simple physical activity or a real-world example they can interact with to understand the concept.

Generate only the explanation for the "explanation" field.`,
});

const explainConceptFlow = ai.defineFlow(
    {
        name: 'explainConceptFlow',
        inputSchema: ExplainConceptInputSchema,
        outputSchema: ExplainConceptOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
)
