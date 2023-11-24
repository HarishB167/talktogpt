import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';
import { extractConversationOfLastNMinutes, getConversationWithBetterNVC } from './common';

export class BetterNVC extends BaseCommand {
  COMMAND = {
    command: 'better-nvc',
    matcher: /.*communic.*(nvc|.*non.*violent.*communic.*).*minute.*/i,
    successMessage: 'Better nvc response is as.',
  };
  requiredKeys = ['userId', 'messages', 'setMessages', 'startUttering'];

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
    if (!this.isDataValid(data)) throw new Error(`BetterNVC : ${String(this.requiredKeys)} are required.`);
    const { userId, messages, setMessages, startUttering } = data;
    const durationInMinutes = this.getMinutes(text);

    let newText = extractConversationOfLastNMinutes(messages, durationInMinutes);
    console.log('handleBetterNVCCommand text :>> ', newText);

    newText = await getConversationWithBetterNVC(newText, userId);
    console.log('Better nvc text :>> ', newText);
    setMessages([
      ...messages,
      {
        content: `Conversation with better NVC of last ${durationInMinutes} minutes of conversation`,
        role: 'user',
        id: String(Date.now()),
        createdAt: new Date(),
      },
      { content: newText, role: 'assistant', id: String(Date.now()), createdAt: new Date() },
    ]);
    startUttering('Using new version.' + newText);
  }
}
