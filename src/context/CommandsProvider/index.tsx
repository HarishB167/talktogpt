import React, { useContext, useEffect, useState } from 'react';
import BaseCommand from './commands/BaseCommand';
import { BetterNVC, SaveLastNMinutesOfConversation } from './commands';
import { addCommandListeners, removeCommandListeners } from './CommandEventHandler';
import { TextCommand } from './commands/TextCommand';

type CommandsContextType = {
  commands: BaseCommand[];
  useCommand: (command: BaseCommand) => void;
  handleCommandIfExists: (text: string, data: object) => boolean;
  lastRunCommand: BaseCommand;
  addCommandListeners: (data: any) => void;
  removeCommandListeners: (data: any) => void;
};

const CommandsContext = React.createContext<CommandsContextType>(null);

export const useCommandContext = (): CommandsContextType => {
  return useContext(CommandsContext);
};

export function CommandsProvider({ children }) {
  const [commands, setCommands] = useState<BaseCommand[]>([
    new SaveLastNMinutesOfConversation(),
    new BetterNVC(),
    new TextCommand(),
  ]);
  const [element, setElement] = useState(null);
  const [lastRunCommand, setLastRunCommand] = useState<BaseCommand>(null);

  function useCommand(command: BaseCommand | BaseCommand[]) {
    if (Array.isArray(command)) setCommands([...commands, ...command]);
    else setCommands([...commands, command]);
  }

  function handleCommandIfExists(text: string, data: object): boolean {
    const command = commands.find((cmd) => cmd.isVoiceCommand(text));
    setLastRunCommand(command);
    console.log('command :>> ', command);
    if (command) {
      console.log('Running command : ', text);
      command.run(text, data);
      return true;
    }
    return false;
  }

  // useEffect(() => {
  //   setElement(lastRunCommand?.element);
  //   console.log('changing element');
  // }, [lastRunCommand, lastRunCommand?.element]);

  useEffect(() => {
    console.log('Commands used are : ' + commands.map((item) => item.COMMAND.command).join(', '));
  }, []);

  const value = {
    commands,
    useCommand,
    handleCommandIfExists,
    lastRunCommand,
    addCommandListeners: (data) => addCommandListeners(commands, data),
    removeCommandListeners: (data) => removeCommandListeners(commands, data),
  };

  return (
    <CommandsContext.Provider value={value}>
      {/* {element && element} */}
      {children}
    </CommandsContext.Provider>
  );
}
