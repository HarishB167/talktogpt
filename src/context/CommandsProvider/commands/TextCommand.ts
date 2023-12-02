import BaseCommand from './BaseCommand';
import { processTextForTextCommand } from './common';

export class TextCommand extends BaseCommand {
  COMMAND = {
    command: 'text-command',
    matcher: /.*(((message|text).*twilio)|(twilio.*(message|text))).*/i,
    successMessage: 'Message sent.',
  };
  requiredKeys = ['userId', 'messages', 'setMessages', 'startUttering', 'setActiveCommand'];

  isVoiceCommand(text: string): boolean {
    return text.match(this.COMMAND.matcher) ? true : false;
  }

  isDataValid(data) {
    return this.requiredKeys.every((item) => item in data);
  }

  async run(text: string, data: any) {
    if (!this.isDataValid(data)) throw new Error(`TextCommand : ${String(this.requiredKeys)} are required.`);
    const { userId, messages, setMessages, startUttering, setActiveCommand } = data;

    console.log('Text command');
    const resText = await processTextForTextCommand(text, data.userId);
    console.log(`resText : >> '${resText}'`);
    try {
      const msg = JSON.parse(resText);
      console.log('msg :>> ', msg);
      setActiveCommand(this);
    } catch (e) {
      console.log('Error in text cmd e :>> ', e);
    }
  }
}
