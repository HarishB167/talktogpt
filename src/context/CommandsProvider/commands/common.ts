import { Message } from 'ai';
import { BE_CONCISE } from 'components/chat/constants';

const prepareMessagesForTextExport = (messages: Message[]) => {
  let text = '';

  messages.forEach((item) => {
    text += `${item.role.toUpperCase()}: ${item.content.replace(BE_CONCISE, '')}\n`;
  });

  return text;
};

export const extractConversationOfLastNMinutes = (messages: Message[], minutes: number) => {
  if (messages.length < 1) return null;

  const filteredMessages = messages.filter((item) => {
    const messageTime = item.createdAt.getTime();
    const currentTime = Date.now();
    const duration = Math.abs(currentTime - messageTime) / (60 * 1000);

    console.log('duration :>> ', duration);
    if (duration <= minutes) return true;
    return false;
  });

  console.log('filteredMessages :>> ', filteredMessages);

  return prepareMessagesForTextExport(filteredMessages);
};

const getResponseFromGPT = async (text: string, userId: string) => {
  const res = await fetch(`/api/openai/stream`, {
    method: 'POST',
    body: JSON.stringify({
      messages: [
        {
          content: text,
          role: 'user',
        },
      ],
      userId,
    }),
  });

  const reader = res.body.getReader();
  let stream = new ReadableStream({
    start(controller) {
      return pump();
      function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });

  let newRes = new Response(stream);
  let data = await newRes.text();

  return data;
};

export const getSummaryOfTextFromGPT = async (text: string, userId: string) => {
  const responseText = await getResponseFromGPT(
    `Make summary of following conversation and ${BE_CONCISE} : "${text}"`,
    userId
  );
  return responseText;
};

export const getConversationWithBetterNVC = async (text: string, userId: string) => {
  if (text) text = text.replaceAll('USER', 'ME');
  const responseText = await getResponseFromGPT(
    `Tell me about some points that how I could have communicated with better NVC (non-voilent communication)
     in the following of conversation chat, and ${BE_CONCISE} : "${text}"`,
    userId
  );
  return responseText;
};

export const processTextForTextCommand = async (text: string, userId: string) => {
  const responseText = await getResponseFromGPT(
    `Extract person name and message from following statement in format {"name": "", "message": ""}
     and remove reference of twilio api, and ${BE_CONCISE} : "${text}"`,
    userId
  );
  return responseText.trim();
};
