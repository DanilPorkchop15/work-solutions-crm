import React from "react";
import { isNil } from "ramda";
import { container } from "tsyringe";

import { UserLogsTableModule } from "./model";

const Context: React.Context<UserLogsTableModule | null> = React.createContext<UserLogsTableModule | null>(null);

export const UserLogsTableModuleProvider = React.memo(function UserLogsTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const userLogsTableModule: UserLogsTableModule = React.useMemo(() => container.resolve(UserLogsTableModule), []);

  return <Context.Provider value={userLogsTableModule}>{children}</Context.Provider>;
});

export function useUserLogsTableModule(): UserLogsTableModule {
  const userLogsTableModule: UserLogsTableModule | null = React.useContext(Context);

  if (isNil(userLogsTableModule)) {
    throw new Error("UserLogsTableModule not found");
  }

  return userLogsTableModule;
}
