type COMMAND = {
  command: string;
  matcher: RegExp;
  successMessage: string;
};

class BaseCommand {
  COMMAND: COMMAND = null;
  element = null;
  isVoiceCommand(text: string): boolean {
    return false;
  }

  handleEvent(event: CustomEvent, data: any) {
    //
  }

  run(text: string, data: object) {
    //
  }

  getCommandData() {
    return this.COMMAND;
  }
}

export default BaseCommand;
