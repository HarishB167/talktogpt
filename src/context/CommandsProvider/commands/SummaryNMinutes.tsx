import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';
import { extractConversationOfLastNMinutes, getSummaryOfTextFromGPT } from './common';

export class SummaryNMinutes extends BaseCommand {
  COMMAND = {
    command: 'summary-conversation-n-mins',
    matcher: /.*(summary|summarize).*minute.*conversation.*/i,
    successMessage: 'Conversation summarized.',
  };
  requiredKeys = ['userId', 'messages', 'setMessages', 'showErrorMessage', 'startUttering'];

  isVoiceCommand(text: string): boolean {
    return text.match(this.COMMAND.matcher) ? true : false;
  }

  getMinutes(text: string) {
    let args = wordsToNumbers(text);
    if (typeof args === 'string') {
      const match = /\d+/.exec(args);
      args = match ? parseInt(match[0], 10) : 0;
    }
    return args;
  }

  isDataValid(data) {
    return this.requiredKeys.every((item) => item in data);
  }

  async run(text: string, data) {
    if (!this.isDataValid(data)) throw new Error(`SummaryNMinutes : ${String(this.requiredKeys)} are required.`);
    const { userId, messages, setMessages, showErrorMessage, startUttering } = data;
    const durationInMinutes = this.getMinutes(text);

    if (!(durationInMinutes && typeof durationInMinutes === 'number')) {
      showErrorMessage('Incorrect voice command. The value must be a number.');
      return;
    }

    let newText = extractConversationOfLastNMinutes(messages, durationInMinutes);

    newText = await getSummaryOfTextFromGPT(newText, userId);
    newText = newText.replace(/(\r\n|\n|\r)/gm, '');
    setMessages([
      ...messages,
      {
        content: `Make summary of last ${durationInMinutes} minutes conversation`,
        role: 'user',
        id: String(Date.now()),
        createdAt: new Date(),
      },
      { content: newText, role: 'assistant', id: String(Date.now()), createdAt: new Date() },
    ]);
    startUttering(newText);
  }
}
