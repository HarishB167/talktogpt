import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';
import { extractConversationOfLastNMinutes, getConversationWithBetterNVC } from './common';

export class BetterNVC extends BaseCommand {
  COMMAND = {
    command: 'better-nvc',
    matcher: /.*communic.*(nvc|.*non.*violent.*communic.*).*minute.*/i,
    successMessage: 'Better nvc response is as.',
  };

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

  // async handleEvent(event, data) {
  //   console.log('In handleEvent of better nvc');
  //   console.log('data :>> ', data);
  //   if (!('messages' in data && 'userId' in data && 'setMessages' in data))
  //     throw new Error('Invalid data passed to handler of BetterNVC command.');

  //   const { userId, messages, setMessages } = data;
  //   const durationInMinutes = event.detail.value;
  //   let text = extractConversationOfLastNMinutes(messages, durationInMinutes);
  //   console.log('handleBetterNVCCommand text :>> ', text);

  //   text = await getConversationWithBetterNVC(text, userId);
  //   console.log('Better nvc text :>> ', text);
  //   setMessages([
  //     ...messages,
  //     {
  //       content: `Conversation with better NVC of last ${durationInMinutes} minutes of conversation`,
  //       role: 'user',
  //       id: String(Date.now()),
  //       createdAt: new Date(),
  //     },
  //     { content: text, role: 'assistant', id: String(Date.now()), createdAt: new Date() },
  //   ]);
  // }

  run(text: string) {
    console.log('Sending event NVC');
    window.dispatchEvent(
      new CustomEvent(this.COMMAND.command, {
        detail: {
          value: this.getMinutes(text),
          successMessage: this.COMMAND.successMessage,
        },
      })
    );
  }
}
