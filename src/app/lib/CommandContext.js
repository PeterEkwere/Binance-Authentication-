import { createContext, useContext, useState } from 'react';

const CommandContext = createContext();

export function CommandProvider({ children }) {
    const [command, setCommand] = useState(null);

    const resetCommand = () => {
        setCommand(null);
    };

    return (
        <CommandContext.Provider value={{ command, setCommand, resetCommand }}>
            {children}
        </CommandContext.Provider>
    );
}

export function useCommand() {
    return useContext(CommandContext);
}