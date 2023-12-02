import wordsToNumbers from 'words-to-numbers';
import toWav from 'audiobuffer-to-wav';
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
  requiredKeys = [
    'messages',
    'messagesAudio',
    'setSaveConversationModalBox',
    'showSuccessMessage',
    'showErrorMessage',
    'startUttering',
  ];

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

  async joinAudioMessages(messagesAudio: any[]) {
    const audioCtx = new AudioContext();

    const arrayBuffers = await Promise.all(
      messagesAudio.map(async (item) => await audioCtx.decodeAudioData(await item.audioFile.arrayBuffer()))
    );

    const numberOfChannels = arrayBuffers.reduce((pV, cV) =>
      pV.numberOfChannels > cV.numberOfChannels ? cV : pV
    ).numberOfChannels;

    const joinedMsgBufferLength = arrayBuffers
      .map((item) => item.length)
      .reduce((totalLength, length) => totalLength + length, 0);

    const joinedMessage = audioCtx.createBuffer(numberOfChannels, joinedMsgBufferLength, arrayBuffers[0].sampleRate);
    for (let i = 0; i < numberOfChannels; i++) {
      const channel = joinedMessage.getChannelData(i);
      let pointer = 0;
      arrayBuffers.forEach((item) => {
        channel.set(item.getChannelData(i), pointer);
        pointer += item.length;
      });
    }

    const wav = toWav(joinedMessage);
    var blob = new Blob([new DataView(wav)], {
      type: 'audio/wav',
    });

    return blob;
  }

  async run(text: string, data) {
    if (!this.isDataValid(data))
      throw new Error(`SaveLastNMinutesOfConversation : ${String(this.requiredKeys)} are required.`);
    const {
      messages,
      messagesAudio,
      setSaveConversationModalBox,
      showSuccessMessage,
      showErrorMessage,
      startUttering,
    } = data;
    const durationInMinutes = this.getMinutes(text);

    if (messages.length === 0) {
      showErrorMessage('No conversation to save.');
      return;
    }

    if (!(durationInMinutes && typeof durationInMinutes === 'number')) {
      showErrorMessage('Incorrect voice command. The value must be a number.');
      return;
    }

    if (messages.length !== messagesAudio.length) {
      showErrorMessage("All audio messages aren't available due to network lag. Please rerun the command");
      return;
    }

    const filteredAudioMessages = messagesAudio.filter((item) => {
      const messageTime = item.datetime.getTime();
      const currentTime = Date.now();
      const duration = Math.abs(currentTime - messageTime) / (60 * 1000);

      console.log('duration :>> ', duration);
      if (duration <= durationInMinutes) return true;
      return false;
    });

    let joinedAudioMessage = null;
    if (filteredAudioMessages.length > 0) {
      joinedAudioMessage = await this.joinAudioMessages(filteredAudioMessages);
    }

    let newText = extractConversationOfLastNMinutes(messages, durationInMinutes);

    setSaveConversationModalBox(
      <SaveConversationModalBox
        onClose={() => setSaveConversationModalBox(null)}
        text={newText}
        audio={joinedAudioMessage}
      />
    );
    showSuccessMessage(this.COMMAND.successMessage);
    startUttering(this.COMMAND.successMessage);
  }
}
