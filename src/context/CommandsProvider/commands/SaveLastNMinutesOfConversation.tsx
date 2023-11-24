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
  requiredKeys = ['messages', 'setSaveConversationModalBox', 'showSuccessMessage', 'startUttering'];

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

  run(text: string, data) {
    if (!this.isDataValid(data))
      throw new Error(`SaveLastNMinutesOfConversation : ${String(this.requiredKeys)} are required.`);
    const { messages, setSaveConversationModalBox, showSuccessMessage, startUttering } = data;
    const durationInMinutes = this.getMinutes(text);

    let newText = extractConversationOfLastNMinutes(messages, durationInMinutes);

    setSaveConversationModalBox(
      <SaveConversationModalBox onClose={() => setSaveConversationModalBox(null)} text={newText} />
    );
    showSuccessMessage(this.COMMAND.successMessage);
    startUttering(this.COMMAND.successMessage);
  }
}
