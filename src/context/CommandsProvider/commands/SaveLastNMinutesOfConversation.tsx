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

  // handleEvent(event, { messages }) {
  //   const durationInMinutes = event.detail.value;
  //   const text = extractConversationOfLastNMinutes(messages, durationInMinutes);
  //   console.log('Element set');
  //   const self = this;
  //   this.element = (
  //     <SaveConversationModalBox
  //       onClose={() => {
  //         self.element = null;
  //         console.log('self :>> ', self);
  //       }}
  //       text={text}
  //     />
  //   );
  // }

  run(text: string) {
    console.log('In SAVE_CONVERSATION_N_MINS 2');
    window.dispatchEvent(
      new CustomEvent('save-conversation-n-mins', {
        detail: {
          value: this.getMinutes(text),
          successMessage: this.COMMAND.successMessage,
        },
      })
    );
  }
}
