import React, { useContext, useState } from 'react';
import BaseCommand from './commands/BaseCommand';
import { BetterNVC, SaveLastNMinutesOfConversation } from './commands';

type CommandsContextType = {
  commands: any;
  useCommand: (command: BaseCommand) => void;
  handleCommandIfExists: (text: string) => boolean;
};

const CommandsContext = React.createContext<CommandsContextType>(null);

export const useCommandContext = (): CommandsContextType => {
  return useContext(CommandsContext);
};

export function CommandsProvider({ children }) {
  const [commands, setCommands] = useState<BaseCommand[]>([new SaveLastNMinutesOfConversation(), new BetterNVC()]);

  function useCommand(command: BaseCommand | BaseCommand[]) {
    if (Array.isArray(command)) setCommands([...commands, ...command]);
    else setCommands([...commands, command]);
  }

  function handleCommandIfExists(text: string): boolean {
    const command = commands.find((cmd) => cmd.isVoiceCommand(text));
    if (command) {
      console.log('Running command : ', text);
      command.run(text);
      return true;
    }
    return false;
  }

  const value = {
    commands,
    useCommand,
    handleCommandIfExists,
  };

  return <CommandsContext.Provider value={value}>{children}</CommandsContext.Provider>;
}
