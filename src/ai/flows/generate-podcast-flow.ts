
'use server';

/**
 * @fileOverview An AI flow to generate a podcast-style audio from text.
 *
 * - generatePodcast - A function that handles the text-to-speech process.
 * - GeneratePodcastOutput - The return type for the generatePodcast function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import wav from 'wav';


const GeneratePodcastOutputSchema = z.object({
  media: z.string().describe("A data URI of the WAV audio file. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GeneratePodcastOutput = z.infer<typeof GeneratePodcastOutputSchema>;

export async function generatePodcast(text: string): Promise<GeneratePodcastOutput> {
  if (!process.env.GEMINI_API_KEY) {
      throw new Error("The AI podcast feature is disabled. Please add your Gemini API key to the .env file to enable it.");
  }
  return generatePodcastFlow(text);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generatePodcastFlow = ai.defineFlow(
  {
    name: 'generatePodcastFlow',
    inputSchema: z.string(),
    outputSchema: GeneratePodcastOutputSchema,
  },
  async (query) => {
    
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media?.url) {
      throw new Error('No media returned from the TTS model.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      media: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

    

    