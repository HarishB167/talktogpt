import wordsToNumbers from 'words-to-numbers';
import BaseCommand from './BaseCommand';
import { extractConversationOfLastNMinutes } from './common';
import SaveConversationModalBox from 'components/atoms/SaveMessageModalBox';

export class SaveLastNMinutesOfConversation extends BaseCommand {
  COMMAND = {
    command: 'save-conversation-n-mins',
    matcher: /.*save.*minute.*conversation.*/i,
    successMessage: 'Saving conversation...',
  };
  element = null;

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

  run(text: string, { messages, setSaveConversationModalBox, showSuccessMessage, startUttering }) {
    if (!messages) throw new Error('SaveLastNMinutesOfConversation : messages is required.');
    const durationInMinutes = this.getMinutes(text);

    let newText = extractConversationOfLastNMinutes(messages, durationInMinutes);

    setSaveConversationModalBox(
      <SaveConversationModalBox onClose={() => setSaveConversationModalBox(null)} text={newText} />
    );
    showSuccessMessage(this.COMMAND.successMessage);
    startUttering(this.COMMAND.successMessage);
  }
}
