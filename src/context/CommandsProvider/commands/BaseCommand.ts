class BaseCommand {
  isVoiceCommand(text: string): boolean {
    return false;
  }

  run(text: string) {
    //
  }
}

export default BaseCommand;
