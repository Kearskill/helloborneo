import { NextRequest, NextResponse } from 'next/server';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const polly = new PollyClient({
  region: process.env.AWS_REGION || 'ap-southeast-5',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    console.log('Polly request:', { text, language });

    // Determine voice and lexicon based on language
    let voiceId = 'Joanna'; // Default English
    let lexiconNames: string[] | undefined = undefined;

    if (language === 'malay') {
      voiceId = process.env.POLLY_VOICE_ID_MS || 'Rizwan';
    } else if (language === 'iban') {
      voiceId = 'Joanna'; // Use English voice with Iban lexicon
      lexiconNames = [process.env.POLLY_LEXICON_IBAN || 'IbanLexicon'];
      console.log('Using Iban lexicon:', lexiconNames);
    } else if (language === 'dusun') {
      voiceId = 'Joanna';
      lexiconNames = [process.env.POLLY_LEXICON_KADAZAN || 'KadazanLexicon'];
      console.log('Using Kadazan lexicon:', lexiconNames);
    }

    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: voiceId,
      Engine: 'neural',
      LexiconNames: lexiconNames,
    });

    const response = await polly.send(command);

    if (!response.AudioStream) {
      throw new Error('No audio stream received');
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.AudioStream as any) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Polly API error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize speech' },
      { status: 500 }
    );
  }
}
