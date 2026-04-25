import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-5',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = 'fintech-app-storage-demo';

// Map language + phrase to S3 audio files
const AUDIO_MAP: Record<string, string> = {
  // Iban audio files
  'iban_getting_started': 'iban/iban_getting_started.wav',
  'iban_confirm': 'iban/iban_confirm.wav',
  'iban_full_name': 'iban/iban_full_name.wav',
  'iban_email': 'iban/iban_email.wav',
  'iban_phone': 'iban/iban_phone.wav',
  
  // Kadazan audio files
  'kadazan_getting_started': 'kadazan/kadazan_getting_started.wav',
  'kadazan_confirm': 'kadazan/kadazan_confirm.wav',
  'kadazan_full_name': 'kadazan/kadazan_full_name.wav',
  'kadazan_email': 'kadazan/kadazan_email.wav',
  'kadazan_phone': 'kadazan/kadazan_phone.wav',
};

export async function POST(request: NextRequest) {
  try {
    const { language, phrase } = await request.json();
    
    console.log('Audio request:', { language, phrase });
    
    // Build key for audio map
    const key = `${language}_${phrase.replace(/ /g, '_')}`;
    const s3Key = AUDIO_MAP[key];
    
    if (!s3Key) {
      return NextResponse.json(
        { error: `No audio file found for: ${key}` },
        { status: 404 }
      );
    }
    
    console.log('Fetching from S3:', s3Key);
    
    // Get audio from S3
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    });
    
    const response = await s3.send(command);
    
    if (!response.Body) {
      throw new Error('No audio data received from S3');
    }
    
    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Audio API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audio' },
      { status: 500 }
    );
  }
}
