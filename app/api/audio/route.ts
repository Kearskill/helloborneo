import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client lazily
let s3Client: S3Client | null = null;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.MY_AWS_REGION || 'ap-southeast-5',
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3Client;
}

const BUCKET = 'fintech-app-storage-demo';

// Map language + phrase to S3 audio files
const AUDIO_MAP: Record<string, string> = {
  // Iban audio files
  'iban_getting_started': 'iban/iban_getting_started.wav',
  'iban_confirm': 'iban/iban_confirm.wav',
  'iban_full_name': 'iban/iban_full_name.wav',
  'iban_email': 'iban/iban_email.wav',
  'iban_phone': 'iban/iban_phone.wav',
  'iban_amount_next': 'iban2/iban_amount_next.wav',
  'iban_receipt': 'iban2/iban_receipt.wav',
  'iban_summary': 'iban2/iban_summary.wav',
  'iban_transfer': 'iban2/iban_transfer.wav',
  
  // Kadazan audio files
  'kadazan_getting_started': 'kadazan/kadazan_getting_started.wav',
  'kadazan_confirm': 'kadazan/kadazan_confirm.wav',
  'kadazan_full_name': 'kadazan/kadazan_full_name.wav',
  'kadazan_email': 'kadazan/kadazan_email.wav',
  'kadazan_phone': 'kadazan/kadazan_phone.wav',
  'kadazan_amount_next': 'kadazan2/kadazan_amount_next.wav',
  'kadazan_receipt': 'kadazan2/kadazan_recepeint.wav',
  'kadazan_summary': 'kadazan2/kadazan_summary.wav',
  'kadazan_transfer_money': 'kadazan2/kadazan_transfer_money.wav',
};

export async function POST(request: NextRequest) {
  try {
    const { language, phrase } = await request.json();
    
    console.log('Audio request:', { language, phrase, region: process.env.MY_AWS_REGION });
    
    // Build key for audio map
    const key = `${language}_${phrase.replace(/ /g, '_')}`;
    const s3Key = AUDIO_MAP[key];
    
    if (!s3Key) {
      console.error('Audio mapping not found:', key);
      return NextResponse.json(
        { error: `No audio file found for: ${key}` },
        { status: 404 }
      );
    }
    
    console.log('Fetching from S3:', { bucket: BUCKET, key: s3Key });
    
    // Get audio from S3
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    });
    
    const s3 = getS3Client();
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
    
    console.log('Successfully fetched audio, size:', audioBuffer.length);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Audio API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch audio: ${errorMessage}` },
      { status: 500 }
    );
  }
}
