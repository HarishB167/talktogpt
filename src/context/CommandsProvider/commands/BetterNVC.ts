import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';

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

  run(text: string) {
    window.dispatchEvent(
      new CustomEvent('better-nvc', {
        detail: {
          value: this.getMinutes(text),
          successMessage: this.COMMAND.successMessage,
        },
      })
    );
  }
}
