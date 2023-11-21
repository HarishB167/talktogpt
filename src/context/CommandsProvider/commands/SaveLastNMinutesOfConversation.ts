import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';

export class SaveLastNMinutesOfConversation extends BaseCommand {
  COMMAND = {
    command: 'save-conversation-n-mins',
    matcher: /.*save.*minute.*conversation.*/i,
    successMessage: 'Saving conversation...',
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
    console.log('In SAVE_CONVERSATION_N_MINS 2');
    window.dispatchEvent(
      new CustomEvent('save-conversation', {
        detail: {
          value: this.getMinutes(text),
          successMessage: this.COMMAND.successMessage,
        },
      })
    );
  }
}
