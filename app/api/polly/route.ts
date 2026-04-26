import { NextRequest, NextResponse } from 'next/server';
import { PollyClient, SynthesizeSpeechCommand, VoiceId } from '@aws-sdk/client-polly';

// Initialize Polly client lazily
let pollyClient: PollyClient | null = null;

function getPollyClient() {
  if (!pollyClient) {
    pollyClient = new PollyClient({
      region: process.env.MY_AWS_REGION || 'ap-southeast-5',
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return pollyClient;
}

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    console.log('Polly request:', { text, language, region: process.env.MY_AWS_REGION });

    // Determine voice and lexicon based on language
    let voiceId: VoiceId = VoiceId.Joanna; // Default English
    let lexiconNames: string[] | undefined = undefined;

    if (language === 'malay') {
      voiceId = VoiceId.Rizwan;
    } else if (language === 'iban') {
      voiceId = VoiceId.Joanna; // Use English voice with Iban lexicon
      lexiconNames = [process.env.POLLY_LEXICON_IBAN || 'IbanLexicon'];
      console.log('Using Iban lexicon:', lexiconNames);
    } else if (language === 'kadazan') {
      voiceId = VoiceId.Joanna;
      lexiconNames = [process.env.POLLY_LEXICON_KADAZAN || 'KadazanLexicon'];
      console.log('Using Kadazan lexicon:', lexiconNames);
    } else if (language === 'dusun') {
      voiceId = VoiceId.Joanna;
      lexiconNames = [process.env.POLLY_LEXICON_KADAZAN || 'KadazanLexicon'];
      console.log('Using Kadazan lexicon for Dusun:', lexiconNames);
    }

    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: process.env.POLLY_VOICE_ID_EN as VoiceId,
      Engine: 'neural',
      LexiconNames: lexiconNames,
    });

    const polly = getPollyClient();
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to synthesize speech: ${errorMessage}` },
      { status: 500 }
    );
  }
}
