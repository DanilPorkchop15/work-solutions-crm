import React from "react";
import { isNil } from "ramda";
import { container } from "tsyringe";

import { LoggerTableModule } from "./model";

const Context: React.Context<LoggerTableModule | null> = React.createContext<LoggerTableModule | null>(null);

export const LoggerTableModuleProvider = React.memo(function LoggerTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const loggerTableModule: LoggerTableModule = React.useMemo(() => container.resolve(LoggerTableModule), []);

  return <Context.Provider value={loggerTableModule}>{children}</Context.Provider>;
});

export function useLoggerTableModule(): LoggerTableModule {
  const loggerTableModule: LoggerTableModule | null = React.useContext(Context);

  if (isNil(loggerTableModule)) {
    throw new Error("LoggerTableModule not found");
  }

  return loggerTableModule;
}
