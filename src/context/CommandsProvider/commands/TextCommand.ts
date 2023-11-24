import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';
import { processTextForTextCommand } from './common';

export class TextCommand extends BaseCommand {
  COMMAND = {
    command: 'text-command',
    matcher: /.*(((message|text).*twilio)|(twilio.*(message|text))).*/i,
    successMessage: 'Message sent.',
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

  async run(text: string, data: any) {
    console.log('Text command');
    const resText = await processTextForTextCommand(text, data.userId);
    console.log(`resText : >> '${resText}'`);
    try {
      const msg = JSON.parse(resText);
      console.log('msg :>> ', msg);
    } catch (e) {
      console.log('Error in text cmd e :>> ', e);
    }
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
