// Set the runtime to edge for best performance
export const runtime = 'edge';

export default async function handler(req: Request, res: Response) {
  console.log('requesting /api/openai/tts');

  const { text } = await req.json();
  console.log({ text });

  if (!text) {
    return new Response('Missing text.', { status: 400 });
  }

  const data = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: 'alloy',
      response_format: 'mp3',
    }),
  });

  const newData = await data.blob();
  return new Response(newData, { status: 200 });
}
