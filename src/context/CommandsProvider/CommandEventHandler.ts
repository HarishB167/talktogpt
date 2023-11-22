import BaseCommand from './commands/BaseCommand';

export function addCommandListeners(commands: BaseCommand[], data) {
  Object.keys(commands).forEach((c) => {
    const cmd = commands[c];
    window.addEventListener(cmd.getCommandData().command, (event) => cmd.handleEvent(event, data));
  });
}

export function removeCommandListeners(commands: BaseCommand[], data) {
  Object.keys(commands).forEach((c) => {
    const cmd = commands[c];
    window.removeEventListener(cmd.getCommandData().command, (event) => cmd.handleEvent(event, data));
  });
}
