import React from "react";
import { isNil } from "ramda";
import { container } from "tsyringe";

import { UsersTableModule } from "./model";

const Context: React.Context<UsersTableModule | null> = React.createContext<UsersTableModule | null>(null);

export const UsersTableModuleProvider = React.memo(function UsersTableModuleProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const usersTableModule: UsersTableModule = React.useMemo(() => container.resolve(UsersTableModule), []);

  return <Context.Provider value={usersTableModule}>{children}</Context.Provider>;
});

export function useUsersTableModule(): UsersTableModule {
  const usersTableModule: UsersTableModule | null = React.useContext(Context);

  if (isNil(usersTableModule)) {
    throw new Error("UsersTableModule not found");
  }

  return usersTableModule;
}
